/*! Built on: Fri Jan 11 2013 12:28:42 */
define('oui.utils/template',['oui.underscore'], function (_) {
    
    return function (str, data) {
        var origSettings = _.clone(_.templateSettings), t;
        _.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

        t = _.template(str, data);

        _.templateSettings = origSettings;

        return t;
    };
});

define('oui.typeAhead/typeAheadView',['oui.jquery', 'oui.underscore', 'oui.spin', 'oui.utils/template'],
    function ($, _, Spinner, creatorFn) {
        

        var $markup = $('<div class="menu"><div class="typeahead-menu"><ul></ul></div></div>');

        var nodeTemplate = creatorFn('<li><%= display %></li>');

        var typeAheadView = function (widget) {
            this.widget = widget;
            this.options = widget.options;
            this.$menu = $(pluckMarkup($markup, '.menu'));
            this.id = _.uniqueId('typeAhead-');
            this.$menu.attr('id', this.id);
            this.spinner = new Spinner({width:2, radius:3, length:4, lines:9, speed:1.3, corners:1});

            var that = this;
            this.$menu.on('mousedown', function (event) {
                event.preventDefault();
                that.widget.cancelBlur = true;
                event.stopPropagation();
            });

            this.$menu.on('click', function (event) {
                if ($(event.target).is('li')) {
                    that.widget._select(that.$menu.find('li').index(event.target));

                } else if ($(event.target).is('strong')) {
                    that.widget._select(that.$menu.find(event.target).parent().index());
                }
            });
            this.$menu.hide();
        };

        function pluckMarkup($markup, clazzName, map) {
            var template = $markup.filter(clazzName).html();
            if (map == null) {
                return template;
            }
            return creatorFn(template, map);
        }

        $.extend(typeAheadView.prototype, {
            remove:function() {
                this.$menu.off('mousedown');
                this.$menu.off('click');
                this.$menu.empty();
                this.$menu.remove();
                delete this.$menu;
                delete this.widget;
                delete this.options;
                delete this.id;
                delete this.spinner;
            },
            show:function () {
                this.$menu.show();
                this.$menu.css('position', 'absolute');
                this.$menu.css('top', this.widget.element.outerHeight() + this.widget.element.offset().top);
                this.$menu.css('left', this.widget.element.offset().left);
                this.$menu.css('width', this.widget.element.outerWidth());

                var parent = $(this.widget.element).parent(), maxZindex = 0;
                while (parent.length > 0 && parent[0] !== document) {
                    if (parent.css('z-index') !== 'auto' && parent.css('z-index') > maxZindex) {
                        maxZindex = parent.css('z-index');
                    }
                    parent = $(parent).parent();
                }
                this.$menu.css('z-index', maxZindex + 1);
            },

            hide:function () {
                this.$menu.hide();
            },

            render:function (results, query) {
                this.$menu.children('ul').empty();
                this.show();

                if (_.isUndefined(results)) {
                    this.$menu.css('height', 24);
                    this.spinner.spin(this.$menu[0]);
                } else {
                    this.spinner.stop();
                    for (var i = 0; i < results.length; i++) {
                        var regex = new RegExp('(' + query + ')', 'ig'),
                            text = this.options.display(results[i]);

                        if (_.isNull(regex.exec(text))) {
                            continue;
                        }
                        text = text.replace(regex, '<strong>$1</strong>');
                        this.$menu.children('ul').append(nodeTemplate({display:text}));
                    }

                    if (results.length > this.options.maxSuggestions && this.options.scroll) {
                        this.$menu.css('height', this.options.maxSuggestions * this.$menu.find('li').outerHeight());
                        this.$menu.css('overflow-y', 'scroll');
                    } else if (results.length > this.options.maxSuggestions) {
                        this.$menu.css('height', this.options.maxSuggestions * this.$menu.find('li').outerHeight());
                        this.$menu.css('overflow-y', '');
                    } else if (results.length > 0) {
                        this.$menu.css('overflow-y', 'hidden');
                        this.$menu.css('height', this.$menu.find('ul').outerHeight());
                    } else {
                        this.$menu.hide();
                    }
                }

                return this;
            },

            updateSelection:function (index) {
                var ul = this.$menu.children('ul');

                if (!_.isUndefined(index)) {
                    ul.children().removeClass('selected');
                    ul.children(':nth-child(' + (index + 1) + ')').addClass('selected');
                }
            }
        });

        return typeAheadView;

    });

define('oui.typeAhead/storeWrapper',['oui.jquery', 'oui.underscore'], function ($, _) {
    

    var StoreWrapper = function (store, widget) {
        this.store = store || {};
        this.options = widget.options;
        this.widget = widget;
        var storeFns = this.options.storeFns;
        this.search = storeFns.search || this.search;
        this.match = storeFns.match || this.match;
        this.filter = storeFns.filter || this.filter;
    };

    StoreWrapper.prototype = {
        constructor:StoreWrapper,

        search:function () {
            throw new Error('No search method specified.');
        },

        filter:function () {
        },

        getResults:function (query) {
            var that = this;

            if (_.isUndefined(this.store[query]) || !this.store[query].loaded || Date.now > this.store[query].expires) {
                that.store[query] = {loaded : false};
                $.when(this.search(query)).done(function (searchResults) {
                    var date = new Date();
                    date.setMinutes(date.getMinutes() + 5);
                    that.store[query].loaded = true;
                    that.store[query].expires = date.getTime();
                    that.store[query].results = searchResults;
                    that.store[query].matches = that.match(query, searchResults);

                    if (_.isEmpty(query)) {
                        that.filter();
                    } else {
                        that.filter(that.store[query].matches);
                    }
                    that.widget.searchCompleted(that.store[query].matches);
                });
            } else {
                if (_.isEmpty(query)) {
                    that.filter();
                } else {
                    that.filter(that.store[query].matches);
                }
                return this.store[query].matches;
            }

            return this.store[query].matches;
        },

        match:function (query, results) {
            var regex, matches = [], modifiers = 'g';

            if (!this.options.sensitive) {
                modifiers = "i" + modifiers;
            }

            if (this.options.beginsWith) {
                query = "^" + query;
            }

            regex = new RegExp('(' + query + ')', modifiers);

            for (var i = 0; i < results.length; i++) {
                if (!_.isNull((results[i][this.options.fields.name]).match(regex))) {
                    matches.push(results[i]);
                }
            }

            return matches;
        },

        selectNext:function (query) {
            if (this.selectedQuery !== query) {
                this.selectedQuery = query;
                this.selected = undefined;
            }

            if (_.isUndefined(this.selected) && this.store[this.selectedQuery].matches.length > 0) {
                this.selected = 0;
            } else {
                this.selected++;

                if (this.selected > this.store[this.selectedQuery].matches.length) {
                    this.selected = 0;
                }
            }
        },

        selectPrevious:function (query) {
            if (this.selectedQuery !== query) {
                this.selectedQuery = query;
                this.selected = undefined;
            }

            if (_.isUndefined(this.selected) && this.store[this.selectedQuery].matches.length > 0) {
                this.selected = this.store[this.selectedQuery].matches.length - 1;
            } else {
                this.selected--;

                if (this.selected < 0) {
                    this.selected = this.store[this.selectedQuery].matches.length;
                }
            }
        },

        getSelectedValue:function (query) {
            return this.store[query].matches[this.selected];
        },

        select:function (query, index) {

            if (this.selectedQuery !== query) {
                this.selectedQuery = query;
            }
            this.selected = index;
        }
    };

    return StoreWrapper;

});

/**
 * A widget that extends the JQuery-UI default widget and provides
 * a ui element that suggests items that match the string input.
 *
 * Example creation useing default options:
 *
 *     $('selector').typeAhead();
 *
 * @class TypeAhead
 */
define('oui.typeAhead/typeAheadWidget',['oui.jquery', 'oui.underscore', 'oui.typeAhead/typeAheadView',
        'oui.typeAhead/storeWrapper', 'oui.jqueryui'],
    function ($, _, TypeAheadView, DefaultStoreWrapper) {
        

        $.widget('orcl.typeAhead', {

            options:{
                /**
                 * The time to wait before it searchs after the user stops typing.
                 *
                 * The time is in milliseconds.
                 *
                 * @property delay
                 * @type Integer
                 * @default 250
                 */
                delay:250, //ms
                /**
                 * Whether or not to let the suggestion view scroll or if it
                 * should just hide the additional suggestions.
                 *
                 * @property scroll
                 * @type Boolean
                 * @default true
                 */
                scroll:true,
                /**
                 * The maximum amount of suggestions to display. This option
                 * is only used as the maximum to display before scrolling if
                 * that option is true. Otherwise, it will hide all other suggestions
                 * if there are more than 10.
                 *
                 * @property maxSuggestions
                 * @type Integer
                 * @default 10
                 */
                maxSuggestions:10,
                /**
                 * Whether or not the matching is case sensitive or not.
                 *
                 * @property caseSensitive
                 * @type Boolean
                 * @default false
                 */
                caseSensitive:false,
                /**
                 * Whether or not to only match if it begins with the search term.
                 *
                 * @property beginsWith
                 * @type Boolean
                 * @default false
                 */
                beginsWith:false,
                /**
                 * Whether or not to allow an empty string as a search term.
                 *
                 * @property allowEmpty
                 * @type Boolean
                 * @default false
                 */
                allowEmpty:false,
                /**
                 * The delimiter to stop the current search and start a new search.
                 * Useful for multiSelect typeAheads.
                 *
                 * @property delimiter
                 * @type String
                 * @default ','
                 */
                delimiter:',',
                /**
                 * The object that contains functions for use in the store.
                 *
                 * @property storeFns
                 * @type Object
                 * @default {}
                 */
                storeFns:{},
                /**
                 * The data store to use.
                 *
                 * Used when sharing stores across typeAheads.
                 *
                 * @property store
                 * @type Object
                 * @default null
                 */
                store: null,
                //TODO: update to use the fields to match on
                /**
                 * Whether or not to support mutli-select. If false it will only allow
                 * one search term.
                 *
                 * @property multiSelect
                 * @type Boolean
                 * @default true
                 */
                multiSelect:true,
                /**
                 * The map to use when the data has separate fields for 'name' and 'id'.
                 *
                 * @property fields
                 * @type Object
                 * @default {
                 *     name:'name',
                 *     id:'id'
                 * }
                 */
                fields:{
                    name:'name',
                    id:'id'
                },
                /**
                 * The function to use to display the results.
                 *
                 * Default is to just use the name.
                 *
                 * @property display
                 * @type Function
                 * @param data The data of that node to print
                 * @return String The string to print on the screen
                 */
                display:function (data) {
                    return data[this.fields.name];
                },
                /**
                 * Selector for appending the dateView to the page
                 *
                 * Default is to just append it to the body
                 *
                 * @property appendTo
                 * @type {string}
                 * @default 'body'
                 */
                appendTo:'body'
            },

            _handleKeyDown:function (event) {
                var keyCode = $.ui.keyCode, widget = event.data;

                function handleUpdate() {
                    var selectedValue, regex;

                    widget.view.updateSelection(widget.store.selected);
                    selectedValue = widget.store.getSelectedValue(widget.query);

                    if (_.isUndefined(selectedValue)) {
                        widget.element.val(widget.val);
                    } else {
                        regex = new RegExp('(\\A|\\s|^|'+ widget.options.delimiter + ')' + widget.query + '\\b', 'i');
                        widget.element.val(widget.val.replace(regex, '$1' + selectedValue[widget.options.fields.name]));
                    }
                }

                switch (event.keyCode) {
                    case keyCode.UP:
                        event.preventDefault();
                        widget.store.selectPrevious(widget.query);
                        handleUpdate();
                        break;
                    case keyCode.DOWN:
                        event.preventDefault();
                        //Navigate the displayed menu suggestions
                        widget.store.selectNext(widget.query);
                        handleUpdate();
                        break;
                }
            },

            getQuery:function (str, indexOfCaret) {
                var indexOfClosestCommaBefore = 0,
                    indexOfClosestCommaAfter = str.length;

                if (!this.options.multiSelect || str.indexOf(this.options.delimiter) === -1) {
                    return str;
                }

                for (var i = 0; i < str.length; i++) {
                    if (str.charAt(i) === this.options.delimiter && i < indexOfCaret) {
                        indexOfClosestCommaBefore = i + 1;
                    }
                }

                for (i = str.length - 1; i > indexOfClosestCommaBefore; i--) {
                    if (str.charAt(i) === this.options.delimiter && i >= indexOfCaret) {
                        indexOfClosestCommaAfter = i;
                    }
                }

                return str.substring(indexOfClosestCommaBefore, indexOfClosestCommaAfter).replace(/^\s+|\s+$/g, "");
            },

            _handleKeyUp:function (event) {
                var keyCode = $.ui.keyCode, widget = event.data;

                if (event.keyCode !== keyCode.UP && event.keyCode !== keyCode.DOWN) {
                    var query = widget.getQuery(widget.element.val(), widget.element[0].selectionStart);
                    widget.val = widget.element.val();
                    widget.query = query;
                    if(!widget.options.allowEmpty && ($.trim(query) === '') ){
                        widget.view.render([], query);
                        widget.store.filter();
                        return;
                    }
                    widget.view.render(widget.store.getResults(query), query);
                }
            },

            _handleFocus:function (event) {
                var widget = event.data;
                if (event.data.element.val().length > 0) {
                    var query = widget.getQuery(widget.element.val(), widget.element[0].selectionStart);
                    widget.val = widget.element.val();
                    if(!widget.options.allowEmpty && ($.trim(query) === '') ){
                        widget.view.render([], query);
                        widget.store.filter();
                        return;
                    }
                    widget.view.render(widget.store.getResults(query), query);
                    widget.view.updateSelection(widget.store.selected);
                }
            },

            _handleBlur:function (event) {
                var widget = event.data;
                //Used when the menu gets clicked on because the input box loses focus so we need to stop that
                if (!this.cancelBlur) {
                    //Hide the menu
                    widget.view.hide();
                }
            },

            searchCompleted:function (results) {
                this.view.render(results, this.query);
                this._trigger('searchcomplete', null, [results]);
            },

            _select:function (index) {
                this.store.select(this.query, index);
                this.view.updateSelection(this.store.selected);
                var selectedValue = this.store.getSelectedValue(this.query);

                if (_.isUndefined(selectedValue)) {
                    this.element.val(this.val);
                } else {
                    this.element.val(this.val.replace(this.query, selectedValue[this.options.fields.name]));
                }
            },

            _createStore:function (store, CustomWrapper) {
                if (_.isUndefined(CustomWrapper)) {
                    this.store = new DefaultStoreWrapper(store, this);
                } else {
                    this.store = new CustomWrapper(store, this);
                }
            },

            _bindKeyEvents:function () {
                this.element.on('keydown', this, this._handleKeyDown);
                this.element.on('keyup', this, _.debounce(this._handleKeyUp, this.options.delay));
                this.element.on('focus', this, this._handleFocus);
                this.element.on('blur', this, this._handleBlur);
            },

            _unbindKeyEvents:function () {
                this.element.off('keydown');
                this.element.off('keyup');
                this.element.off('focus');
                this.element.off('blur');
            },

            _create:function () {
                this._bindKeyEvents();
                if(this.options.store === null){
                    this._createStore();
                }else{
                    this._createStore(this.options.store.store);
                }
                this.view = new TypeAheadView(this);
                this.view.$menu.appendTo(this.options.appendTo);
            },

            getStore:function() {
                return this.store;
            },

            _setOption:function (key, value) {
                //TODO: update options;
                console.log(key + ' ' + value);
            },

            _destroy:function () {
                this._unbindKeyEvents();
                this.view.remove();

                delete this.view;
                delete this.store;
            }

        });
    }
);

/**
 * @class PickerView
 */
define('oui.picker/pickerView',['oui.jquery', 'oui.underscore', 'oui.spin', 'oui.utils/template', 'oui.typeAhead/typeAheadWidget'],
    function ($, _, Spinner, creatorFn) {
        

        var $markup = $('<script type="text/html" class="htm-picklist-dialog">' +
            ' <div class="modal pick-list-modal">' +
            '    <div class="modal-header">' +
            '        <a data-dismiss="modal">' +
            '            <span class="pull-right close modal-close">&times;</span>' +
            '        </a>' +
            '        <h3><%=locale.title%></h3>' +
            '    </div>' +
            '    <div class="modal-body">' +
            '       <div class="tree">' +
            '           <ul class="root"></ul>' +
            '       </div>' +
            '    </div>' +
            '    <div class="modal-footer">' +
            '        <button class="cancel btn btn-blue-light"><%=locale.cancel%></button>' +
            '        <button class="select btn btn-blue-light disabled" disabled="disabled"><%=locale.save%></button>' +
            '    </div>' +
            '</div>' +
            '</script>');

        var nodeTemplate = creatorFn('<li data-id=<%=id%>>'+
            '<div class="item-container">'+
            '    <div class="picker-icon collapse"></div>'+
            '</div>'+
            '<div class="item"><%=text%></div>' +
            '<ul class="children"></ul>'+
            '</li>');
        var flatTemplate = creatorFn('<li data-id=<%=id%>><div class="item"><%=text%></div></li>');
        var iconTemplate = creatorFn('<div class="icon" style="background:<%=icon%>">');

        /**
         * A PickerView is a modal dialog that appears with a search box to filter and a tree view
         * displaying the items to select.
         *
         * Calls the inititialize method.
         *
         * @class PickerView
         * @constructor
         * @param {Object} widget The JQuery UI Widget this view is associated with
         */
        var pickerView = function (widget) {
            /**
             * The widget the view is associated with.
             *
             * @property widget
             * @type {Object}
             */
            this.widget = widget;
            /**
             * The widgets options that get used within the view.
             *
             * @property options
             * @type {Object}
             */
            this.options = widget.options;
            this.init();
        };

        function pluckMarkup($markup, clazzName, map) {
            var template = $markup.filter(clazzName).html();
            if (map == null) {
                return template;
            }
            return creatorFn(template, map);
        }

        $.extend(pickerView.prototype, {
            /**
             * Cleans up the view when it needs to be destroyed.
             *
             * @method remove
             */
            remove:function () {
                if(!_.isEmpty(this.options.typeAhead)){
                    this.$dialog.find('input.task-search').typeAhead('destroy');
                }

                this.$dialog.find().remove();

                this.$dialog.remove();

                delete this.$dialog;
                delete this.$treeDiv;
                delete this.spinner;
            },
            /**
             * The initialization function that sets up all the buttons and key events
             *
             * @method init
             */
            init:function () {
                var that = this;
                this.spinner = new Spinner({width:2, radius:3, length:4, lines:9, speed:1.3, corners:1});

                that.$dialog = $(pluckMarkup($markup, '.htm-picklist-dialog',
                    {locale:that.options.locale}));

                that.$treeDiv = that.$dialog.find('.modal-body > div.tree');

                // select button
                that.$dialog.find('button.select').on('click', function (event) {
                    event.preventDefault();
                    if($(this).is(':disabled')){
                        return false;
                    }
                    that.widget.submit();
                });

                // clicking top right 'x'
                that.$dialog.find('a[data-dismiss=modal]').on('click', function () {
                    that.widget.cancel();
                    return false;
                });
                that.$dialog.find('button.cancel').on('click', function () {
                    that.widget.cancel();
                    return false;
                });

                if (!_.isEmpty(this.options.typeahead)) {
                    this.$dialog.find('.tree').before('<input class="task-search search-background input-medium" name="task-search"' +
                            'placeholder='+this.options.locale.search+' type="search"/>');
                    this.$dialog.find('input.task-search').typeAhead(this.options.typeahead);
                }
            },

            show:function () {
                this.$dialog.modal('show');
            },

            hide:function () {
                this.$dialog.modal('hide');
                this.$dialog.find('input.task-search').val('');
            },

            /**
             * Renders the picklist given the data
             *
             * TODO: should this be chainable
             * @chainable
             * @method render
             * @param {Array} data The data to render
             */
            render:function (data) {
                var that = this,
                    $node = this.$treeDiv.find('ul.root');

                $node.empty();

                _.each(data, function (branch) {
                    $node.append(that.createBranch(branch));
                });
                return this;
            },

            /**
             * Renders the picklist as a flat list as opposed to a tree
             * This is used when filtering the data
             *
             * @method renderFlat
             * @param {Array} data The data to render
             */
            renderFlat:function (data) {
                var that = this,
                    $node = this.$treeDiv.find('ul.root');

                $node.empty();

                _.each(data, function (elem) {
                    $node.append(that.createElement(elem));
                });
            },

            /**
             * Toggles whether the element is selected.
             *
             * If the widget is not multi-select then remove all the previous selected classes.
             *
             * @method select
             * @param {Number} id The id to select
             */
            select:function (id) {
                if (this.options.multiSelect == null || !this.options.multiSelect) {
                    // remove all other selections
                    this.$treeDiv.find('li:not([data-id=' + id + ']) > .item').removeClass('selected');
                }
                this.$treeDiv.find('[data-id=' + id + '] > .item').toggleClass('selected');
                if(this.$treeDiv.find('.selected').length > 0){
                    this.$dialog.find('.select').removeAttr('disabled');
                    this.$dialog.find('.select').removeClass('btn-blue-light');
                    this.$dialog.find('.select').removeClass('disabled');
                    this.$dialog.find('.select').addClass('btn-action');
                }else{
                    this.$dialog.find('.select').attr('disabled', 'disabled');
                    this.$dialog.find('.select').addClass('btn-blue-light');
                    this.$dialog.find('.select').addClass('disabled');
                    this.$dialog.find('.select').removeClass('btn-action');
                }
            },

            /**
             * Toggle the children for a given id given the data.
             *
             * When data is undefined it is assumed that the data is loading
             * and a spinner is appended.
             *
             * @method toggleChildren
             * @param {Number} id The id to add the data to
             * @param {Array} data The children
             */
            toggleChildren:function (id, data) {
                var selector = '[data-id=' + id + ']',
                    $branch = this.$treeDiv.find(selector),
                    children = $branch.children('.children'),
                    collapsed;

                $branch.children('.item-container').children('.picker-icon').toggleClass('collapse');

                collapsed = $branch.children('.item-container').children('.picker-icon').hasClass('collapse');
                if (_.isUndefined(data)) {
                    this.spinner.spin(children[0]);
                } else {
                    if (children.children().length === 0) {
                        this.appendChildren(id, data);
                    }
                }

                if (collapsed) {
                    children.hide();
                } else {
                    children.show();
                }

            },

            /**
             * Appends the children to the element.
             *
             * @method appendChildren
             * @param {Number} id The id to append the children to.
             * @param {Array} data The children
             */
            appendChildren:function (id, data) {
                var selector = '[data-id=' + id + ']',
                    $branch = this.$treeDiv.find(selector), index;

                this.spinner.stop();

                if (data.length === 0) {
                    $branch.find('.picker-icon').css('visibility', 'hidden');
                    $branch.children('.children').empty();
                } else {
                    for (index = 0; index < data.length; index++) {
                        $branch.children('.children').append(this.createBranch(data[index]));
                    }
                }
            },

            /**
             * Used to create an html element that has to ability to hold children
             *
             * @method createBranch
             * @param {Object} branch The data to create the element
             * @return {Object} $branch The JQuery object
             */
            createBranch:function (branch) {
                var that = this,
                    type = branch[that.options.fields.type],
                    iconPath,
                    $icon,
                    $branch;

                $branch = $(nodeTemplate({
                    id:branch[that.options.fields.id],
                    text:that.widget.options.display(branch)
                })).data(branch);

                if (this.options.displayIcons && type != null) {
                    iconPath = this.options.icons[branch[that.options.fields.type]];
                    if (iconPath != null) {
                        $icon = $(iconTemplate({
                            icon:'url(' + iconPath + ')'
                        }));
                        $branch.find('.item-container').append($icon);
                    }
                }

                // selected item
                $branch.on('click', 'div.item', function () {
                    that.widget._trigger('before-select');
                    that.widget.select($branch.data(that.options.fields.id));
                    that.widget._trigger('select');
                    return false;
                });

                // icon selected (expanded)
                $branch.on('click', 'div.picker-icon', function (event) {
                    that.widget._trigger('before-toggle-children');
                    that.widget.expand($branch.data(that.options.fields.id));
                    that.widget._trigger('toggle-children');
                    event.stopPropagation();
                });

                return $branch;
            },

            /**
             * Used to render a flat list.
             *
             * @method createElement
             * @param {Object} elem The object to be appended
             * @return {Object} $elem JQuery element
             */
            createElement:function (elem) {
                var that = this, $elem;

                $elem = $(flatTemplate({
                    id:elem[that.options.fields.id],
                    text:that.widget.options.display(elem)
                })).data(elem);

                // selected item
                $elem.on('click', 'div.item', function () {
                    that.widget._trigger('before-select');
                    that.widget.select($(this).parent().data(that.options.fields.id));
                    that.widget._trigger('select');
                    return false;
                });

                return $elem;
            },

            /**
             * Selects the given ids in the view.
             *
             * @method updateSelected
             * @param {Array} ids The ids to select
             */
            updateSelected:function (ids) {
                this.$treeDiv.find('.item').removeClass('selected');
                for (var i = 0; i < ids.length; i++) {
                    this.$treeDiv.find('[data-id=' + ids[i] + '] > .item').addClass('selected');
                    this.$dialog.find('.select').prop('disabled', false);
                    this.$dialog.find('.select').removeClass('btn-blue-light');
                    this.$dialog.find('.select').removeClass('disabled');
                    this.$dialog.find('.select').addClass('btn-action');
                }
            }

        });

        return pickerView;

    });

define('oui.picker/storeWrapper',['oui.jquery', 'oui.underscore'], function ($, _) {
    

    var StoreWrapper = function (store, widget) {
        this.store = store || {
            data: [],
            loaded: false
        };
        this.options = widget.options;
        this.widget = widget;
        var storeFns = this.options.storeFns;
        this.selectedElems = [];
        this.load = storeFns.load || this.load;
        this.loadChildren = storeFns.loadChildren || this.loadChildren;
        this.getChildren = storeFns.getChildren || this.getChildren;
        this.rootId = storeFns.rootId || this.rootId;
        this.selectElement = storeFns.selectElement || this.selectElement;
        this.deselectElement = storeFns.deselectElement || this.deselectElement;
        this.submit = storeFns.submit || this.submit;
        this.getDataForParentIds = storeFns.getDataForParentIds || this.getDataForParentIds;
        this.getSelected = this.getSelected;
    };

    StoreWrapper.prototype = {
        constructor:StoreWrapper,

        load:function () {
            throw new Error('No load method specified.');
        },

        /*
         * Load children is passed an id of the parent
         */
        loadChildren:function () {
            throw new Error('No load children method specified.');
        },

        rootId:function (id) {
            if (!arguments.length) {
                return this.root;
            }
            this.root = id;
        },

        selectElement:function (elem) {
            this.selectedElems.push(elem);
        },

        deselectElement:function (elem) {
            var index = $.inArray(elem, this.selectedElems);

            if (index !== -1 && index !== 0) {
                this.selectedElems.splice(index, 1);
            } else if (index === 0) {
                this.selectedElems.shift();
            }
        },

        getSelected:function () {
            return this.selectedElems;
        },

        getDataForParentIds:function (ids) {
            var retData = [], data = this.store.data;

            for (var i = 0; i < ids.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (data[j].parentId === ids[i]) {
                        retData.push(data[j]);
                    }
                }
            }

            return retData;
        },

        getDataForSelected:function () {
            var retData = [], data = this.store.data;

            for (var i = 0; i < this.selectedElems.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (data[j][this.options.fields.id] === this.selectedElems[i]) {
                        retData.push(data[j]);
                    }
                }
            }

            return retData;
        },

        //Utility method - no need to allow the user to override
        toggleSelect:function (id) {
            if (_.indexOf(this.selectedElems, id) !== -1) {
                this.deselectElement(id);
            } else {
                this.selectElement(id);
            }
        },

        submit:function () {
            throw new Error("No submit method specified");
        },

        //Assuming non-nested hierarchy
        getChildren:function (parentId) {
            var children = [], index = -1, that = this, data = this.store.data;

            for (var i = 0; i < data.length; i++) {
                if (data[i][this.options.fields.id] === parentId) {
                    index = i;
                    break;
                }
            }

            if (parentId !== this.rootId() &&
                    (_.isUndefined(data[index].loaded) || !data[index].loaded) &&
                    this.options.lazyload) {
                $.when(this.loadChildren(parentId)).done(function (jsonData) {
                    for(var i = 0; i < jsonData.length; i++){
                        data.push(jsonData[i]);
                    }
                    data[index].loaded = true;
                    that.widget.childrenLoaded(parentId, jsonData);
                }).fail(function () {
                        data[index].loaded = true;
                        that.widget.childrenLoaded(parentId, []);
                    });
            } else {
                for (var j = 0; j < data.length; j++) {
                    if (data[j].parentId === parentId) {
                        children.push(data[j]);
                    }
                }
                return children;
            }

            return undefined;
        },

        addResults:function (results) {
            var that = this, data = this.store.data;
            data = _.uniq(_.union(data, results), false, function (item) {
                return item[that.options.fields.id];
            });
        }

    };

    return StoreWrapper;

});

/**
 * A widget that extends the JQuery UI default widget and provides
 * a picker ui element using an input element.
 *
 * Example creation with default options:
 *
 *     $('selector').picker();
 *
 * @class Picker
 */
define('oui.picker/pickerWidget',['oui.jquery', 'oui.underscore', 'oui.picker/pickerView', 'oui.picker/storeWrapper', 'oui.jqueryui', 'oui.bootstrap', 'oui.resize'],
    function ($, _, PickerView, DefaultStoreWrapper) {
        

        $.widget('orcl.picker', {

            options:{
                /**
                 * The functions that can be overriden in the storeWrapper.
                 *
                 * @property storeFns
                 * @type {Object}
                 * @default {}
                 */
                storeFns:{},
                /**
                 * The locale strings to use in the picker.
                 *
                 * @property locale
                 * @type {Object}
                 * @default {
                 *     save:'Save',
                 *     cancel:'Cancel',
                 *     title:'Title',
                 *     search:'Search'
                 * }
                 */
                locale:{
                    save:'Save',
                    cancel:'Cancel',
                    title:'',
                    search:'Search'
                },
                store:null,
                /**
                 * This property maps the fields used to the fields that are in the data.
                 *
                 * @property fields
                 * @type {Object}
                 * @default {
                 *     id:'id',
                 *     name:'name',
                 *     type:'type',
                 *     code:'code'
                 * }
                 */
                fields:{
                    id:'id',
                    name:'name',
                    type:'type',
                    code:'code'
                },
                /**
                 * Whether or not to display icons in the picker
                 *
                 * @property displayIcons
                 * @type {Boolean}
                 * @default false
                 */
                displayIcons:false,
                /**
                 * Whether or not the picker supports multi-select or not.
                 *
                 * @property multiSelect
                 * @type {Boolean}
                 * @default true
                 */
                multiSelect:true,
                /**
                 * The object that maps type to icon paths to load only used when
                 * display icons is `true`.
                 *
                 * @property icons
                 * @type {Object}
                 * @default {}
                 */
                icons:{},
                /**
                 * The options to be passed to the typeahead component contained in
                 * the PickerView.
                 *
                 * @property typeAhead
                 * @type {Object}
                 * @default {}
                 */
                typeahead:{},
                /**
                 * Whether or not to lazyload the data.
                 *
                 * @property lazyload
                 * @type {Boolean}
                 * @default true
                 */
                lazyload:true,
                /**
                 * The location for the picker button.
                 *
                 * Valid options for this are: `'inside', 'outside', 'self'`.
                 *
                 * @property style
                 * @type {String}
                 * @default 'inside'
                 */
                style:'inside',
                /**
                 * Whether or not to hide/show the picker button on focus lost/gained.
                 *
                 * @property showOnFocus
                 * @type {Boolean}
                 * @default false
                 */
                showOnFocus:false,
                /**
                 * The roodId for the data of the picklist
                 *
                 * @property rootId
                 * @type {Number}
                 * @default undefined
                 */
                rootId:undefined,
                /**
                 * This option provides a way to override how the data in the picklist is
                 * displayed.
                 *
                 * The function is passed the branch data.
                 *
                 * @property display
                 * @type {Function}
                 * @default function (branch) { return branch[this.fields.code] + '-' + branch[this.fields.name]; }
                 */
                display:function (branch) {
                    return branch[this.fields.code] + ' - ' + branch[this.fields.name];
                },
                /**
                 * Whether or not the picker is triggered via an icon
                 *
                 * @property iconTrigger
                 * @type {boolean}
                 * @default false
                 */
                iconTrigger:false,
                /**
                 * Whether or not the input should take up all available space
                 *
                 * Default is to be specified width
                 *
                 * @property fluid
                 * @type {boolean}
                 * @default false
                 */
                fluid : false
            },

            _createStore:function (store, CustomWrapper) {
                if (_.isUndefined(CustomWrapper)) {
                    this.store = new DefaultStoreWrapper(store, this);
                } else {
                    this.store = new CustomWrapper(store, this);
                }
            },

            showPicklistButton:function () {
                this.$button.show();
            },

            hidePicklistButton:function () {
                this.$button.hide();
            },

            getStore:function () {
                return this.store;
            },

            disable:function(disabled) {
                if(disabled){
                    //Disable the buttons
                    this.$button.prop('disabled', true);
                    this.$button.addClass('disabled');
                    this.$button.removeAttr('href');
                    this.element.prop('disabled', true);
                }else{
                    this.$button.removeClass('disabled');
                    this.$button.prop('disabled', false);
                    this.$button.prop('href', '#');
                    this.element.prop('disabled', false);
                }
            },

            /**
             * This is the constructor that gets called when initializing a JQuery UI widget.
             *
             * See [JQuery UI Widget Factory _create](http://api.jqueryui.com/jQuery.widget/#method-_create) for more details.
             *
             * @private
             * @method _create
             */
            _create:function () {
                var that = this;

                that.view = new PickerView(that);
                if(this.options.store === null){
                    that._createStore();
                }else{
                    that._createStore(that.options.store.store);
                }
                that.store.rootId(that.options.rootId);

                this.element.data('prev-width', this.element.css('width'));

                function calcWidthPercent(withButton) {

                    var padding = that.element.outerWidth() - that.element.width(), percent;

                    if(withButton) {
                        percent = (1-(that.$button.outerWidth() + padding) / that.element.parent().outerWidth()) * 100 + '%';
                    }else{
                        percent = (1-padding / that.element.parent().outerWidth()) * 100 + '%';
                    }
                    that.element.css('width', percent);
                }

                function clickHandler(event) {
                    event.preventDefault();

                    if(that.$button.hasClass('disabled')){
                        return false;
                    }

                    function dataLoaded(alreadyLoaded) {
                        // append view to body
                        that.view.$dialog.appendTo(document.body);
                        var ids = [that.store.rootId()];
                        if(!alreadyLoaded){
                            that.view.render(that.store.getDataForParentIds(ids));
                        }
                        that.show();
                        that.view.updateSelected(that.store.getSelected());
                    }

                    // get data and show
                    if (that.store.store.loaded) {
                        dataLoaded(true);
                    } else {
                        $.when(that.load()).then(function () {
                            dataLoaded(false);
                        });
                    }
                }

                if (this.options.iconTrigger) {
                    this.$button = $('<a href="#"><i class="icon-list-alt"></i></a>');
                    this.$button.css('display', 'inline-block');

                    if (this.options.style === 'inside') {
                        this.$button.css('height', this.element.outerHeight());
                        this.$button.css('line-height', this.element.outerHeight() + 'px');
                        this.$button.css('vertical-align', 'top');
                    }
                } else {
                    this.$button = $('<a class="btn btn-blue-light" href="#">...</a>');
                }

                if (this.element.is('button') || this.element.is('a')) {
                    //Must want to create a picklist widget with only a button
                    this.element.on('click', clickHandler);
                } else {

                    if (this.options.style === 'inside') {
                        $(this.element).wrap('<div class="picker">');
                        this.element.parent().css('display', 'inline-block');
                        this.element.after(this.$button);
                        this.$button.css('position', 'relative');
                        this.element.css('margin', 0);
                        this.$button.css('margin-left', -1 * (this.$button.outerWidth() + 1));

                        if(this.options.fluid) {
                            this.element.parent().css('display', 'block');
                            this.element.parent().css('position', 'relative');

                            this.$button.css('position', 'absolute');
                            this.$button.css('margin-left', 0);

                            this.$button.css('right', '1px');
                            this.$button.css('top', '1px');
                            this.element.on('resize', function() {
                                calcWidthPercent(false);
                            });

                            calcWidthPercent(false);
                        }
                    } else if (this.options.style === 'outside') {
                        this.$button.addClass('add-on');
                        $(this.element).wrap('<div class="picker input-append">');
                        this.element.parent().css('display', 'inline-block');
                        this.element.after(this.$button);
                        this.element.css('width', this.element.width() - this.$button.outerWidth());

                        if(this.options.fluid) {
                            this.element.parent().css('display', 'block');

                            this.element.on("resize", function() {
                                calcWidthPercent(true);
                            });

                            calcWidthPercent(true);
                        }
                    } else if (this.options.style === 'self') {
                        this.element.after(this.$button);
                    } else {
                        throw new Error('Invalid style sepcified');
                    }

                    if (this.options.showOnFocus) {
                        that.hidePicklistButton();

                        $(this.element).on('focus', function () {
                            that.showPicklistButton();
                        });

                        $(this.element).on('blur', function () {
                            that.hidePicklistButton();
                        });
                    }

                    this.$button.on('click', clickHandler);
                    this.disable(this.element.prop('disabled'));
                }
            },

            _setOption:function (key, value) {
                $.Widget.prototype._setOption.apply(this, arguments);
                console.log(key + ' ' + value);
                // TODO: update picker correctly depending on option that has changed.
            },

            hide:function () {
                this.view.hide();
            },

            show:function () {
                this.view.show();
                this.prevSelected = _.clone(this.store.getSelected());
            },

            _restoreSelected: function () {
                this.store.selectedElems = this.prevSelected;
            },

            /**
             * Cleans up created elements and buttons when called.
             *
             * @private
             * @method _destroy
             */
            _destroy:function () {
                this.element.off('resize');
                this.element.css('width', this.element.data('prev-width'));

                if(this.element.parent().hasClass('picker')){
                    this.element.unwrap();
                }

                delete this.store;
                if(!_.isUndefined(this.$button)){
                    this.$button.remove();
                    this.$button.off('click');
                    delete this.$button;
                }
                this.view.remove();
                delete this.view;
            },

            //Widget events
            /**
             * Specifies what happens when load is called on the store.
             *
             * Tells the store it is loaded so the next time opening the picklist does not try to
             * load again as well as sets the json data on the store.
             *
             * @method load
             * @return {Object} A JQuery deferred object
             */
            //TODO: should this be private?
            load:function () {
                var that = this;
                return $.Deferred(function (deferredObj) {
                    $.when(that.store.load()).then(function (jsonData) {
                        //Set the data on the store (user does not need to specify this)
                        _.each(jsonData, function(value) {
                            that.store.store.data.push(value);
                        });
                        that.store.store.loaded = true;
                        deferredObj.resolve(jsonData);
                    });
                }).promise();

            },

            /**
             * Method to provide a programatic ability to select an item from the picklist.
             *
             * @method select
             * @param {Number} id The id to select
             */
            select:function (id) {
                if(!this.options.multiSelect) {
                    var selected = this.store.getSelected();
                    for(var i = 0; i < selected.length; i++){
                        if(selected[i] !== id){
                            this.store.deselectElement(selected[i]);
                        }
                    }
                }

                this.store.toggleSelect(id);
                this.view.select(id);
            },

            /**
             * Method to provide the ability to programatically expand a node.
             *
             * @method expand
             * @param {Number} id The id to expand
             */
            expand:function (id) {
                //if it needs to load them it will call loadChildren
                this.view.toggleChildren(id, this.store.getChildren(id));
                this.view.updateSelected(this.store.getSelected());
            },

            /**
             * Gets the selected ids. Useful when you need to submit a form
             *
             * @method getSelected
             * @return The selected ids in the picklist
             */
            getSelected:function () {
                return this.store.getSelected();
            },

            /**
             * Submits the selected ids and hides the view
             *
             * @method submit
             */
            submit:function () {
                this.view.hide();
                this.store.submit(this.store.getDataForSelected());
            },

            cancel:function () {
                this.view.hide();
                this._restoreSelected();
            },

            childrenLoaded:function (parentId, data) {
                this.view.appendChildren(parentId, data);
            },

            /**
             * Filters the picklist after a search
             *
             * @method filter
             * @param {Object} The results to be rendered
             */
            filter:function (results) {
                if (_.isEmpty(results)) {
                    this.view.render(this.store.getChildren(this.store.rootId()));
                    this.view.updateSelected(this.store.getSelected());
                } else {
                    this.store.addResults(results);
                    this.view.renderFlat(results);
                    this.view.updateSelected(this.store.getSelected());
                }
            }

        });

    });

define('oui.utils/rotate',['oui.jquery'], function ($) {
    
    $.fn.toggleRotate = function (options) {
        options = options || {initialDegrees: 180};

        if (this.hasClass('rotated')) {
            var unrotated = options.initialDegrees - 180;
            this.removeClass('rotated');
            this.css('-webkit-transform', 'rotate(' + unrotated + 'deg)');
            this.css('-moz-transform', 'rotate(' + unrotated + 'deg)');
            this.css('-o-transform', 'rotate(' + unrotated + 'deg)');
            this.css('-ms-transform', 'rotate(' + unrotated + 'deg)');
            this.css('transform', 'rotate(' + unrotated + 'deg)');
        } else {
            this.addClass('rotated');
            this.css('-webkit-transform', 'rotate(' + options.initialDegrees + 'deg)');
            this.css('-moz-transform', 'rotate(' + options.initialDegrees + 'deg)');
            this.css('-o-transform', 'rotate(' + options.initialDegrees + 'deg)');
            this.css('-ms-transform', 'rotate(' + options.initialDegrees + 'deg)');
            this.css('transform', 'rotate(' + options.initialDegrees + 'deg)');
        }
    };
});

define('oui.splitPane/splitPaneWidget',['oui.jquery', 'oui.jqueryui', 'oui.utils/rotate'],
    function ($) {
        

        $.widget('orcl.splitPane', {
            options:{
                type:'horizontal',
                collapseDir:'none',
                paneSizing:[0.5, 0.5]
            },

            _create:function () {
                this.$el = $(this.element);
                this.containerWidth = this.$el.width();
                this.containerHeight = this.$el.height();
                this.containerOffset = this.$el.offset();

                this.createSplit();

                this.panes = this.$el.children().not('.split');
                this.split = this.$el.children('.split');

                this.prevBorderWidth = parseFloat(this.split.prev().css('borderRightWidth'), 10) + parseFloat(this.split.prev().css('borderLeftWidth'), 10);
                this.nextBorderWidth = parseFloat(this.split.next().css('borderRightWidth'), 10) + parseFloat(this.split.next().css('borderLeftWidth'), 10);
                this.prevBorderHeight = parseFloat(this.split.prev().css('borderTopWidth'), 10) + parseFloat(this.split.prev().css('borderBottomWidth'), 10);
                this.nextBorderHeight = parseFloat(this.split.next().css('borderTopWidth'), 10) + parseFloat(this.split.next().css('borderBottomWidth'), 10);

                this.isVerticalSplit = this.split.hasClass('vertical');
                this.childCount = this.panes.length;
                this.clicking = false;
                this.originalPos = 0;
                this.cancelDock = false;
                this.windowFlag = false;

                this.resizePanes();
                this.setupSplit();

                this.bindEvents();
            },

            createSplit:function () {
                var $split = $('<div class="split"></div>');

                if (this.options.type === 'horizontal') {
                    $split.addClass('horizontal');

                    if (this.options.collapseDir === 'up') {
                        $split.addClass('collapsable').addClass('collapseUp');
                    }
                    else if (this.options.collapseDir === 'down') {
                        $split.addClass('collapsable').addClass('collapseDown');
                    }
                    else if (this.options.collapseDir === "both") {
                        $split.addClass('collapsable').addClass('collapseBoth');
                    }
                }
                else if (this.options.type === 'vertical') {
                    $split.addClass('vertical');

                    if (this.options.collapseDir === 'left') {
                        $split.addClass('collapsable').addClass('collapseLeft');
                    }
                    else if (this.options.collapseDir === 'right') {
                        $split.addClass('collapsable').addClass('collapseRight');
                    }
                    else if (this.options.collapseDir === "both") {
                        $split.addClass('collapsable').addClass('collapseBoth');
                    }
                }

                $split.insertAfter(this.$el.children()[0]);
            },

            resizePanes:function () {
                var that = this,
                    i = 0;

                this.$el.css('overflow', 'hidden');

                this.panes.each(function () {
                    var $this = $(this);

                    if (that.isVerticalSplit) {
                        var newWidth = Math.round(that.containerWidth * that.options.paneSizing[i]);
                        $this.css('float', 'left');
                        $this.css('width', newWidth);
                        $this.css('height', that.containerHeight - parseFloat($this.css('borderBottomWidth'), 10) - parseFloat($this.css('borderTopWidth'), 10) + 'px');
                    }
                    else {
                        $this.css('height', Math.round(that.containerHeight * that.options.paneSizing[i]));
                    }

                    i++;
                });
            },

            setupSplit:function () {
                this.positionSplit();

                if (this.split.hasClass('collapsable')) {
                    this.setupCollapse();
                }
            },

            positionSplit:function () {
                if (this.isVerticalSplit) {
                    var newPrevWidth = this.split.prev().width() - this.prevBorderWidth - this.split.width() / 2,
                        newNextWidth = this.split.next().width() - this.nextBorderWidth - this.split.width() / 2,
                        minPrevWidth = parseFloat(this.split.prev().css('minWidth'), 10),
                        minNextWidth = parseFloat(this.split.next().css('minWidth'), 10);

                    if (newPrevWidth < minPrevWidth) {
                        newPrevWidth = minPrevWidth;
                        newNextWidth = this.containerWidth - newPrevWidth - this.nextBorderWidth - this.prevBorderWidth - this.split.width();
                    } else if (newNextWidth < minNextWidth) {
                        newNextWidth = minNextWidth;
                        newPrevWidth = this.containerWidth - newNextWidth - this.prevBorderWidth - this.nextBorderWidth - this.split.width();
                    }

                    this.split.css('height', this.containerHeight + 'px');
                    this.split.prev().css('width', newPrevWidth + 'px');
                    this.split.css('left', this.split.prev().offset().left + this.split.prev().width() + this.prevBorderWidth + 'px');
                    this.split.next().css('width', newNextWidth + 'px');
                    this.split.next().css('marginLeft', this.split.width() + 'px');
                }
                else {
                    var newPrevHeight = this.split.prev().height() - this.prevBorderHeight - this.split.height() / 2,
                        newNextHeight = this.split.next().height() - this.nextBorderHeight - this.split.height() / 2,
                        minPrevHeight = parseFloat(this.split.prev().css('minHeight'), 10),
                        minNextHeight = parseFloat(this.split.next().css('minHeight'), 10);

                    if (newPrevHeight < minPrevHeight) {
                        newPrevHeight = minPrevHeight;
                        newNextHeight = this.containerHeight - newPrevHeight - this.nextBorderHeigth - this.prevBorderHeight - this.split.height();
                    } else if (newNextHeight < minNextHeight) {
                        newNextHeight = minNextHeight;
                        newPrevHeight = this.containerHeight - newNextHeight - this.nextBorderHeigth - this.prevBorderHeight - this.split.height();
                    }

                    this.split.css('width', this.containerWidth + 'px');
                    this.split.prev().css('height', newPrevHeight + 'px');
                    this.split.next().css('marginTop', this.split.height() + 'px');
                    this.split.next().css('height', newNextHeight + 'px');
                    this.split.css('top', this.split.prev().offset().top + this.split.prev().height() + this.prevBorderHeight + 'px');
                }
            },

            setupCollapse:function () {
                if (this.split.hasClass('collapseBoth')) {
                    this.setupCollapseBoth();
                }
                else {
                    this.setupCollapseOne();
                }

                this.bindCollapseEvents();
            },

            setupCollapseBoth:function () {
                var $collapseDiv2 = $('<div class="collapseHandler"></div>'),
                    $collapseArrow2 = $('<div class="arrow"></div>'),
                    $collapseDiv = $('<div class="collapseHandler"></div>'),
                    $collapseArrow = $('<div class="arrow"></div>');

                if (this.isVerticalSplit) {
                    $collapseDiv.addClass('collapseLeft');
                    $collapseDiv2.addClass('collapseRight');

                    $collapseArrow.toggleRotate();

                    $collapseDiv.append($collapseArrow);
                    $collapseDiv2.append($collapseArrow2);
                    this.split.append($collapseDiv).append($collapseDiv2);

                    $collapseDiv.addClass('vertical');
                    $collapseDiv2.addClass('vertical');

                    var newHeight = $collapseDiv.height() / 2;

                    $collapseDiv.css('height', newHeight);
                    $collapseDiv2.css('height', newHeight);

                    $collapseDiv.css('top', (this.split.height() / 2) - ((newHeight * 2) / 2));
                    $collapseDiv2.css('top', $collapseDiv.css('top'));

                    $collapseArrow.css('marginTop', (newHeight / 2) - ($collapseArrow.height() / 2));
                    $collapseArrow2.css('marginTop', (newHeight / 2) - ($collapseArrow2.height() / 2));
                }
                else {
                    $collapseDiv.addClass('collapseUp');
                    $collapseDiv2.addClass('collapseDown');

                    $collapseArrow.toggleRotate({initialDegrees:270});
                    $collapseArrow2.toggleRotate({initialDegrees:90});

                    $collapseDiv.append($collapseArrow);
                    $collapseDiv2.append($collapseArrow2);
                    this.split.append($collapseDiv).append($collapseDiv2);

                    $collapseDiv.addClass('horizontal');
                    $collapseDiv2.addClass('horizontal');

                    var newWidth = $collapseDiv.width() / 2;

                    $collapseDiv.css('width', newWidth);
                    $collapseDiv2.css('width', newWidth);

                    $collapseDiv.css('left', (this.split.width() / 2) - ((newWidth * 2) / 2));
                    $collapseDiv2.css('left', parseFloat($collapseDiv.css('left'), 10));

                    $collapseArrow.css('marginLeft', (newWidth / 2) - ($collapseArrow.width() / 2));
                    $collapseArrow2.css('marginLeft', (newWidth / 2) - ($collapseArrow2.width() / 2));
                }

                $collapseDiv = this.$el.find('.collapseHandler');
            },

            setupCollapseOne:function () {
                var $collapseDiv = $('<div class="collapseHandler"></div>'),
                    $collapseArrow = $('<div class="arrow"></div>');

                if (this.split.hasClass('collapseLeft')) {
                    $collapseDiv.addClass('collapseLeft');
                    $collapseArrow.toggleRotate();
                }
                else if (this.split.hasClass('collapseRight')) {
                    $collapseDiv.addClass('collapseRight');
                }
                else if (this.split.hasClass('collapseUp')) {
                    $collapseDiv.addClass('collapseUp');
                    $collapseArrow.toggleRotate({initialDegrees:270});
                }
                else if (this.split.hasClass('collapseDown')) {
                    $collapseDiv.addClass('collapseDown');
                    $collapseArrow.toggleRotate({initialDegrees:90});
                }

                $collapseDiv.append($collapseArrow);
                this.split.append($collapseDiv);

                if (this.isVerticalSplit) {
                    $collapseDiv.addClass('vertical');
                    $collapseDiv.css('top', (this.split.height() / 2) - ($collapseDiv.height() / 2));
                    $collapseArrow.css('marginTop', ($collapseDiv.height() / 2) - ($collapseArrow.height() / 2));
                }
                else {
                    $collapseDiv.addClass('horizontal');
                    $collapseDiv.css('left', (this.split.width() / 2) - ($collapseDiv.width() / 2));
                    $collapseArrow.css('marginLeft', ($collapseDiv.width() / 2) - ($collapseArrow.width() / 2));
                }
            },

            bindCollapseEvents:function () {
                var collapses = this.$el.find('.collapseHandler');

                collapses.on('mouseenter', function (e) {
                    $(e.currentTarget).addClass('hover');
                });

                collapses.on('mouseleave', function (e) {
                    $(e.currentTarget).removeClass('hover');
                });

                collapses.on('mouseup', this, this.handleCollapseMouseUp);
            },

            bindEvents:function () {
                this.bindResizeEvents();
                this.bindSplitMouseDown();
                this.bindDocumentMove();
                this.bindDocumentUp();
                this.bindWindow();
            },

            bindResizeEvents:function () {
                var that = this;

                if (this.isVerticalSplit) {
                    this.split.parent().on('heightChange', function (e) {
                        if (e.target !== this) return;

                        if (that.windowFlag) {
                            that.split.css('left', that.split.prev().offset().left + that.split.prev().width() + this.prevBorderWidth + 'px');
                            that.windowFlag = false;
                        }

                        var newHeight = that.split.parent().height() + 'px';
                        that.split.css('height', newHeight);
                        that.split.prev().css('height', newHeight);
                        that.split.next().css('height', newHeight);

                        var $collapse = that.split.children('.collapseHandler');
                        if ($collapse.length === 1) {
                            $collapse.css('top', (that.split.height() / 2) - ($collapse.height() / 2));
                        } else if ($collapse.length === 2) {
                            var $collapse1 = $($collapse[0]),
                                $collapse2 = $($collapse[1]);

                            $collapse1.css('top', (that.split.height() / 2) - (($collapse1.height() * 2) / 2));
                            $collapse2.css('top', $collapse1.css('top'));
                        }
                    });
                } else {
                    this.split.parent().on('widthChange', function (e) {
                        if (e.target !== this) return;

                        if (that.windowFlag) {
                            that.split.css('top', that.split.prev().offset().top + that.split.prev().height() + this.prevBorderHeight + 'px');
                            that.windowFlag = false;
                        }

                        var newWidth = that.split.parent().width() + 'px';
                        that.split.css('width', newWidth);
                        that.split.prev().css('width', newWidth);
                        that.split.next().css('width', newWidth);

                        var $collapse = that.split.children('.collapseHandler');
                        if ($collapse.length === 1) {
                            $collapse.css('left', (that.split.width() / 2) - ($collapse.width() / 2));
                        } else if ($collapse.length === 2) {
                            var $collapse1 = $($collapse[0]),
                                $collapse2 = $($collapse[1]);

                            $collapse1.css('left', (that.split.width() / 2) - (($collapse1.width() * 2) / 2));
                            $collapse2.css('left', parseFloat($collapse1.css('left'), 10));
                        }
                    });
                }
            },

            bindSplitMouseDown:function () {
                var that = this;

                this.split.on('mousedown', function () {
                    var $this = $(this);
                    $('*').disableSelection();

                    if (!$this.hasClass('disabled')) {
                        that.clicking = true;
                        if (that.split.hasClass('vertical')) {
                            that.originalPos = parseFloat(that.split.css('left'), 10);
                        }
                        else if (that.split.hasClass('horizontal')) {
                            that.originalPos = parseFloat(that.split.css('top'), 10);
                        }
                    }
                });
            },

            bindDocumentMove:function () {
                var that = this;
                $(document).on('mousemove', function (e) {
                    if (!that.clicking) return;
                    that.cancelDock = true;

                    if (that.split.hasClass('vertical')) {
                        that.docMoveVertical(e.pageX);
                    }
                    else if (that.split.hasClass('horizontal')) {
                        that.docMoveHorizontal(e.pageY);
                    }

                });
            },

            docMoveVertical:function (newPos) {
                this.containerOffset = this.$el.offset();

                var canMove = true,
                    minPrevWidth = parseFloat(this.split.prev().css('minWidth'), 10) + this.split.width(),
                    minNextWidth = parseFloat(this.split.next().css('minWidth'), 10) + this.split.width(),
                    newPrevWidth = 0,
                    newNextWidth = 0,
                    containerBounds = {left:this.containerOffset.left, right:this.containerOffset.left + this.containerWidth};

                if (newPos < this.originalPos) {
                    newPrevWidth = this.split.prev().width() - (this.originalPos - newPos);
                    newNextWidth = this.split.next().width() + (this.originalPos - newPos);
                }
                else {
                    newPrevWidth = this.split.prev().width() + (newPos - this.originalPos);
                    newNextWidth = this.split.next().width() - (newPos - this.originalPos);
                }


                if (newPrevWidth <= minPrevWidth || newNextWidth <= minNextWidth ||
                    newPos <= containerBounds.left || newPos >= containerBounds.right) {
                    canMove = false;
                }

                if (canMove) {
                    this.moveItVertical(newPos, newPrevWidth, newNextWidth);
                }
            },

            docMoveHorizontal:function (newPos) {
                this.containerOffset = this.$el.offset();

                var canMove = true,
                    minPrevHeight = parseFloat(this.split.prev().css('minHeight'), 10) + this.split.height(),
                    minNextHeight = parseFloat(this.split.next().css('minHeight'), 10) + this.split.height(),
                    newPrevHeight = 0,
                    newNextHeight = 0,
                    containerBounds = {top:this.containerOffset.top, bottom:this.containerOffset.top + this.containerHeight};

                if (newPos < this.originalPos) {
                    newPrevHeight = this.split.prev().height() - (this.originalPos - newPos);
                    newNextHeight = this.split.next().height() + (this.originalPos - newPos);
                }
                else {
                    newPrevHeight = this.split.prev().height() + (newPos - this.originalPos);
                    newNextHeight = this.split.next().height() - (newPos - this.originalPos);
                }

                if (newPrevHeight <= minPrevHeight || newNextHeight <= minNextHeight ||
                    newPos <= containerBounds.top || newPos >= containerBounds.bottom) {
                    canMove = false;
                }

                if (canMove) {
                    this.moveItHorizontal(newPos, newPrevHeight, newNextHeight);
                }
            },

            bindDocumentUp:function () {
                var that = this;

                $(document).on('mouseup', function () {
                    that.disableMoving();
                });
            },

            moveItVertical:function (newPos, newPrevWidth, newNextWidth) {
                this.split.css('left', newPos + 'px');
                this.split.prev().css('width', newPrevWidth);
                this.split.next().css('width', newNextWidth);

                this.fireWidthChange();
                this.originalPos = newPos;
            },

            moveItHorizontal:function (newPos, newPrevHeight, newNextHeight) {
                this.split.css('top', newPos + 'px');
                this.split.prev().css('height', newPrevHeight);
                this.split.next().css('height', newNextHeight);
                this.fireHeightChange();
                this.originalPos = newPos;
            },

            disableMoving:function () {
                this.clicking = false;
                this.cancelDock = false;
                $('*').enableSelection();
            },

            handleCollapseMouseUp:function (e) {
                var widget = e.data,
                    curCollapse = $(e.currentTarget),
                    curSplit = curCollapse.parent();

                if (!curCollapse.hasClass('disabled')) {
                    if (widget.cancelDock) {
                        widget.disableMoving();
                        return false;
                    }

                    widget.containerOffset = widget.$el.offset();

                    if (curCollapse.hasClass('collapseLeft')) {
                        curSplit.prev().toggle();
                        curCollapse.children().toggleRotate();
                        widget.toggleLeft(curCollapse, curSplit);
                        widget.fireWidthChange();
                    }
                    else if (curCollapse.hasClass('collapseRight')) {
                        curSplit.next().toggle();
                        curCollapse.children().toggleRotate();
                        widget.toggleRight(curCollapse, curSplit);
                        widget.fireWidthChange();
                    }
                    else if (curCollapse.hasClass('collapseUp')) {
                        curSplit.prev().toggle();
                        curCollapse.children().toggleRotate({initialDegrees:270});
                        widget.toggleUp(curCollapse, curSplit);
                        widget.fireHeightChange();
                    }
                    else if (curCollapse.hasClass('collapseDown')) {
                        curSplit.next().toggle();
                        curCollapse.children().toggleRotate({initialDegrees:90});
                        widget.toggleDown(curCollapse, curSplit);
                        widget.fireWidthChange();
                    }

                    widget.toggleSplitEvents(curCollapse, curSplit);
                }
            },

            toggleLeft:function (curCollapse, curSplit) {
                var prevWidth = curSplit.prev().width() + this.prevBorderWidth;

                if (curSplit.hasClass('restore')) {
                    curSplit.next().css('width', curSplit.next().width() - prevWidth);
                    curSplit.css('left', curSplit.prev().offset().left + curSplit.prev().width() + this.prevBorderWidth + 'px');
                }
                else {
                    curSplit.css('left', this.containerOffset.left + parseFloat(curSplit.next().css('borderLeftWidth'), 10) + 'px');
                    curSplit.next().css('width', curSplit.next().width() + prevWidth);
                }
            },

            toggleRight:function (curCollapse, curSplit) {
                var nextWidth = curSplit.next().width() + this.nextBorderWidth,
                    prevWidth = curSplit.prev().width() + this.prevBorderWidth;

                if (curSplit.hasClass('restore')) {
                    curSplit.prev().css('width', this.containerWidth - nextWidth - curSplit.width() - this.prevBorderWidth);
                    curSplit.css('left', curSplit.prev().offset().left + curSplit.prev().width() + this.prevBorderWidth + 'px');
                }
                else {
                    curSplit.css('left', this.containerOffset.left + this.containerWidth + parseFloat(curSplit.prev().css('borderRightWidth'), 10) - curSplit.width() + 'px');
                    curSplit.prev().css('width', prevWidth + nextWidth);
                }
            },

            toggleUp:function (curCollapse, curSplit) {
                var prevHeight = curSplit.prev().height() + this.prevBorderHeight;

                if (curSplit.hasClass('restore')) {
                    curSplit.next().css('height', curSplit.next().height() - prevHeight);
                    curSplit.css('top', curSplit.prev().offset().top + curSplit.prev().height() + this.prevBorderHeight);
                }
                else {
                    curSplit.css('top', this.containerOffset.top + parseFloat(curSplit.next().css('borderLeftWidth'), 10) + 'px');
                    curSplit.next().css('height', curSplit.next().height() + prevHeight);
                }
            },

            toggleDown:function (curCollapse, curSplit) {
                var nextHeight = curSplit.next().height() + this.nextBorderHeight,
                    prevHeight = curSplit.prev().height() + this.prevBorderHeight;

                if (curSplit.hasClass('restore')) {
                    curSplit.prev().css('height', this.containerHeight - nextHeight - curSplit.height() - this.prevBorderHeight);
                    curSplit.css('top', curSplit.prev().offset().top + curSplit.prev().height() + this.prevBorderHeight + 'px');
                }
                else {
                    curSplit.css('top', this.containerOffset.top + this.containerHeight + parseFloat(curSplit.prev().css('borderLeftWidth'), 10) - curSplit.height() + 'px');
                    curSplit.prev().css('height', curSplit.next().height() + prevHeight + 'px');
                }
            },

            toggleSplitEvents:function (curCollapse, curSplit) {
                var curCollapseSiblings = curCollapse.siblings();
                if (curSplit.hasClass('restore')) {
                    curSplit.removeClass('restore');
                    curSplit.removeClass('disabled');
                    curCollapseSiblings.removeClass('disabled');
                }
                else {
                    curSplit.addClass('restore');
                    curSplit.addClass('disabled');
                    curCollapseSiblings.addClass('disabled');
                }
            },

            fireWidthChange:function () {
                this.split.prev().trigger('widthChange');
                this.split.next().trigger('widthChange');
            },

            fireHeightChange:function () {
                this.split.prev().trigger('heightChange');
                this.split.next().trigger('heightChange');
            },

            bindWindow:function () {
                var that = this;

                $(window).on('resize', function () {
                    var newTop;
                    if (that.split.is(":visible")) {
                        if (that.isVerticalSplit) {
                            if (that.split.prev().is(":visible")) {
                                that.split.css('left', that.split.prev().offset().left + that.split.prev().width() + that.prevBorderWidth + 'px');
                            }
                            else {
                                that.split.css('left', that.split.next().offset().left - that.split.width() + 'px');
                            }
                        }
                        else if (that.split.hasClass('horizontal')) {
                            if (that.split.prev().is(":visible")) {
                                newTop = that.split.prev().offset().top + that.split.prev().height() + that.prevBorderHeight;
                                that.split.css('top', newTop + 'px');
                            }
                            else {
                                newTop = that.split.next().offset().top;
                                if (that.split.hasClass('disabled')) {
                                    newTop = newTop - that.split.height();
                                }
                                that.split.css('top', newTop + 'px');
                            }
                        }
                    }
                    else {
                        that.windowFlag = true;
                    }
                });
            }
        });
    }
);

define('oui.utils/dateHelper',['oui.jquery', 'oui.underscore'], function($, _) {
    

    var dateHelper = function(){};

    $.extend(dateHelper.prototype, {
        isNextYearAllowed : function(date, str) {
            var maxDate = new Date(str);
            return _.isNull(str) ||
                (date.getMonth() <= maxDate.getMonth() && date.getFullYear() < maxDate.getFullYear());
        },

        isPrevYearAllowed : function(date, str) {
            var minDate = new Date(str);
            return _.isNull(str) ||
                (date.getMonth() >= minDate.getMonth() && date.getFullYear() > minDate.getFullYear());
        },

        isNextMonthAllowed : function(date, str) {
            var maxDate = new Date(str);
            return _.isNull(str) ||
                (date.getFullYear() < maxDate.getFullYear() ||
                 date.getMonth() < maxDate.getMonth() && date.getFullYear() === maxDate.getFullYear());
        },

        isPrevMonthAllowed : function(date, str) {
            var minDate = new Date(str);
            return _.isNull(str) ||
                (date.getFullYear() > minDate.getFullYear() ||
                 date.getMonth() > minDate.getMonth() && date.getFullYear() === minDate.getFullYear());
        },

        isTodayAllowed : function(min, max) {
            var today = new Date(), minDate = new Date(min), maxDate = new Date(max);

            return _.isNull(min) && _.isNull(max) ||
                _.isNull(min) && this.dateComparator(today, maxDate) <= 0 ||
                _.isNull(max) && this.dateComparator(minDate, today) <= 0 ||
                this.dateComparator(minDate, today) <= 0 && this.dateComparator(today, maxDate) <= 0;
        },

        dateComparator : function(date1, date2) {
            if (date1.getFullYear() < date2.getFullYear()) {
                return -1;
            } else if (date1.getFullYear() > date2.getFullYear()) {
                return 1;
            } else {
                if (date1.getMonth() < date2.getMonth()) {
                    return -1;
                } else if (date1.getMonth() > date2.getMonth()) {
                    return 1;
                } else {
                    if (date1.getDate() < date2.getDate()) {
                        return -1;
                    } else if (date1.getDate() > date2.getDate()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        }
    });

    return dateHelper;
});

/**
 * A widget that extends the JQueryUI default widget and provides
 * a spinner ui element using an input html element.
 *
 * Example creation with default options:
 *
 *     $('selector').number();
 * @class Spinner
 */
define('oui.spinner/spinnerWidget',['oui.jquery', 'oui.underscore', 'oui.dateFormat', 'oui.jqueryui', 'oui.resize'],
    function ($, _) {
        

        $.widget('orcl.number', {

            options:{
                /**
                 * The type of spinner widget to create. Can be either:
                 *
                 *       'number',
                 *       'currency',
                 *       'time'
                 *
                 * @property type
                 * @type String
                 * @default 'number'
                 */
                type:'number', //Valid options are number, currency, time
                /**
                 * The object that holds all the time related options.
                 *
                 * Currently only holds a format option. Format is a string
                 * representing how the time should be printed.
                 *
                 * @property time
                 * @type Object
                 * @default {
                 *     format: 'hh:MM TT'
                 * }
                 */
                time:{
                    format:'hh:MM TT'
                },
                /**
                 * When the up/down action is called what to increment/decrement
                 * by.
                 *
                 * @property step
                 * @type Integer
                 * @default 1
                 */
                step:1,
                /**
                 * The object that holds all the currency related options.
                 *
                 * What symbol to display as well as append/prepend
                 *
                 * Default is to prepend unless append is true.
                 *
                 * @property currency
                 * @type Object
                 * @default {
                 *     symbol:'$',
                 *     append:false
                 * }
                 */
                currency:{
                    symbol:'$',
                    append: false
                },
                /**
                 * What to print out as the point separator in the number or
                 * currency.
                 *
                 * Defaults to '.'.
                 *
                 * @property point
                 * @type String
                 * @default '.'
                 */
                point:'.',
                /**
                 * What to print out as the group separator in the number or
                 * currency.
                 *
                 * Defaults to ','.
                 *
                 * @property group
                 * @type String
                 * @default ','
                 */
                group:',',
                /**
                 * The numbers that should be displayed after the decimal.
                 * Useful for currency but a regular number may need to only
                 * need a certain amount of digits after the decimal.
                 *
                 * @property numsAfterDecimal
                 * @type Integer
                 * @default 2
                 */
                numsAfterDecimal:2,
                /**
                 * The max to spin to. It can be either a number, currency or
                 * time depending on the type.
                 *
                 * @property max
                 * @type {Number, Date}
                 * @default null
                 */
                max:null,
                /**
                 * The min to spin to. It can be either a number, currency or
                 * time depending on the type.
                 *
                 * @property min
                 * @type {Number, Date}
                 * @default null
                 */
                min:null,
                /**
                 * Whether or not to hide the controls when the component loses
                 * focus.
                 *
                 * @property hideOnBlur
                 * @type Boolean
                 * @default false
                 */
                hideOnBlur:false,
                /**
                 * Where to put the controls for the widget.
                 *
                 * Valid options are:
                 *     'outside',
                 *     'self'
                 *
                 * @property style
                 * @type String
                 * @default 'outside'
                 */
                style:'outside', //Valid options are outside, self
                /**
                 * Whether or not to fallback to native controls or not.
                 *
                 * Will always fallback on mobile regardless of options.
                 *
                 * @property fallback
                 * @type Boolean
                 * @default false
                 */
                fallback:false,
                /**
                 * Whether or not to support the mousewheel scroll while it
                 * is hovered over the spinner and it has focus.
                 *
                 * @property scroll
                 * @type Boolean
                 * @default true
                 */
                scroll:true,
                /**
                 * Whether or not the input should take up all available space
                 *
                 * Default is to be specified width
                 *
                 * @property fluid
                 * @type {boolean}
                 * @default false
                 */
                fluid: false,
                /**
                 * Whether or not to display spinner controls on the number field
                 *
                 * Default is to not display the buttons
                 *
                 * @property spinner
                 * @type {boolean}
                 * @default false
                 */
                spinner: false
            },

            _handleKeyDown:function (event) {
                var keyCode = $.ui.keyCode, widget = event.data, range;
                this.widgetEventPrefix = this.widgetEventPrefix + '-';

                switch (event.keyCode) {
                    case keyCode.UP:
                        event.preventDefault();
                        widget.increment();
                        widget.element[0].selectionStart = widget.cursorLocation;
                        widget.element[0].selectionEnd = widget.cursorLocation;
                        if (document.selection) {
                            range = widget.element[0].createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', widget.cursorLocation);
                            range.moveStart('character', widget.cursorLocation);
                            range.select();
                        }
                        widget._toggleButtons();
                        break;
                    case keyCode.DOWN:
                        event.preventDefault();
                        widget.decrement();
                        widget.element[0].selectionStart = widget.cursorLocation;
                        widget.element[0].selectionEnd = widget.cursorLocation;
                        if (document.selection) {
                            range = widget.element[0].createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', widget.cursorLocation);
                            range.moveStart('character', widget.cursorLocation);
                            range.select();
                        }
                        widget._toggleButtons();
                        break;
                    case keyCode.LEFT:
                        widget.cursorLocation--;
                        widget._toggleButtons();
                        break;
                    case keyCode.RIGHT:
                        widget.cursorLocation++;
                        widget._toggleButtons();
                        break;
                }
            },

            _handleFocus:function (event) {
                var widget = event.data;

                if (widget.options.hideOnBlur) {
                    widget.group.show();
                }
                widget.oldVal = widget.element.val();
            },

            _handleBlur:function (event) {
                var widget = event.data;

                if (widget.options.hideOnBlur) {
                    widget.group.hide();
                }
            },

            _bindKeyEvents:function () {
                var that = this;
                if(this.options.spinner){
                    this.element.on('keydown', this, this._handleKeyDown);
                }
                this.element.on('focus', this, this._handleFocus);
                this.element.on('blur', this, this._handleBlur);
                this.element.on('change', function () {
                    var newVal = that._parse(that.element.val()),
                        bounds = {
                            min:that.options.min,
                            max:that.options.max
                        };

                    if (that._inBounds(newVal)) {
                        that.setValue(newVal);
                    } else {
                        that._trigger('error', null, {prevValue: that.oldVal, newValue: newVal, bounds: bounds});
                    }
                });
                if(this.options.spinner && this.options.scroll){
                    this.element.on('mousewheel', function(event) {
                        if(event.originalEvent.wheelDelta > 0 && that.element.is(':focus')){
                            that.increment();
                            event.preventDefault();
                        }else if(that.element.is(':focus')){
                            that.decrement();
                            event.preventDefault();
                        }
                        that._toggleButtons();
                    });
                }
            },

            _getTimeField:function () {
                var value = this.element.val(), cursorIndex = this.cursorLocation, indices = [];

                for (var i = 0; i < value.length; i++) {
                    if (value.charAt(i) === ':' || value.charAt(i) === ' ') {
                        indices.push(i);
                    }
                }

                if (indices.length === 3) {
                    if (cursorIndex <= indices[0]) {
                        return 'hours';
                    } else if (cursorIndex <= indices[1]) {
                        return 'minutes';
                    } else if (cursorIndex <= indices[2]) {
                        return 'seconds';
                    } else {
                        return 'TT';
                    }
                } else {
                    if (cursorIndex <= indices[0]) {
                        return 'hours';
                    } else if (cursorIndex <= indices[1]) {
                        return 'minutes';
                    } else {
                        return 'TT';
                    }
                }

            },

            _toggleButtons:function () {
                var value = this._parse(this.element.val()), dateInc, dateDec,
                    disableInc = false, disableDec = false;

                if (this.options.type === 'time') {
                    dateInc = value;
                    dateDec = value;

                    switch (this._getTimeField()) {
                        case 'hours':
                            dateInc.setHours(dateInc.getHours() + this.options.step);
                            dateDec.setHours(dateDec.getHours() - this.options.step);
                            break;
                        case 'minutes':
                            dateInc.setMinutes(dateInc.getMinutes() + this.options.step);
                            dateDec.setMinutes(dateDec.getMinutes() - this.options.step);
                            break;
                        case 'seconds':
                            dateInc.setSeconds(dateInc.getSeconds() + this.options.step);
                            dateDec.setSeconds(dateDec.getSeconds() - this.options.step);
                            break;
                        case 'TT':
                            dateInc.setHours(dateInc.getHours() + 12);
                            dateDec.setHours(dateDec.getHours() - 12);
                            break;
                    }

                    disableInc = !_.isNull(this.options.max) && dateInc > this.options.max;
                    disableDec = !_.isNull(this.options.min) && dateDec < this.options.min;
                } else {
                    disableInc = !_.isNull(this.options.max) && value + this.options.step > this.options.max;
                    disableDec = !_.isNull(this.options.min) && value - this.options.step < this.options.min;
                }

                if (disableInc) {
                    this.group.children().filter('.btn:first-child').addClass('disabled');
                    this.group.children().filter('.btn:first-child').attr('disabled', true);
                } else {
                    this.group.children().filter('.btn:first-child').removeClass('disabled');
                    this.group.children().filter('.btn:first-child').attr('disabled', false);
                }

                if (disableDec) {
                    this.group.children().filter('.btn:nth-child(2)').addClass('disabled');
                    this.group.children().filter('.btn:nth-child(2)').attr('disabled', true);
                } else {
                    this.group.children().filter('.btn:nth-child(2)').removeClass('disabled');
                    this.group.children().filter('.btn:nth-child(2)').attr('disabled', false);
                }
            },

            _unbindKeyEvents:function () {
                if(this.options.spinner){
                    this.element.off('keydown');
                }
                this.element.off('focus');
                this.element.off('blur');
                this.element.off('change');
                if(this.options.scroll && this.options.spinner){
                    this.element.off('mousewheel');
                }
            },

            _borderRadius:function (element, topLeft, topRight, bottomRight, bottomLeft) {
                var str = topLeft + ' ' + topRight + ' ' + bottomRight + ' ' + bottomLeft;
                element.css('-webkit-border-radius', str);
                element.css('-moz-border-radius', str);
                element.css('border-radius', str);
            },

            disable:function(disabled) {
                if(disabled){
                    //Disable the buttons
                    this.element.prop('disabled', true);
                    this.group.find('.btn').prop('disabled', true);
                }else{
                    this.group.find('.btn').prop('disabled', false);
                    this.element.prop('disabled', false);
                }
            },

            _create:function () {
                var that = this,
                    up = $('<button class="btn btn-mini spinner-btn">+</button>'),
                    down = $('<button class="btn btn-mini spinner-btn">-</button>'),
                    group = $('<div class="btn-group btn-group-vertical"></div>'),
                    parent = $('<div class="spinner"></div>'),
                    addOn, currencyGroup = $('<div class="currency-group"></div>');

                this.widgetEventPrefix = this.widgetEventPrefix + '-';

                function clickHandler(callBack) {
                    that.element.focus();
                    if (_.isUndefined(that.cursorLocation)) {
                        that.cursorLocation = 0;
                        if (document.selection) {
                            var range = that.element[0].createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', that.cursorLocation);
                            range.moveStart('character', that.cursorLocation);
                            range.select();
                        }
                    }
                    callBack.call(that);
                    that.element[0].selectionStart = that.cursorLocation;
                    that.element[0].selectionEnd = that.cursorLocation;
                    that._toggleButtons();
                }

                function calcWidthPercent() {

                    var padding = that.element.outerWidth() - that.element.width(), percent;

                    if(_.isUndefined(addOn)){
                        percent = (1-(that.group.outerWidth() - 1 + padding) / that.element.parent().outerWidth()) * 100 + '%';
                    }else{
                        percent = (1-(that.group.outerWidth() + addOn.outerWidth() + padding - 2) / that.element.parent().outerWidth()) * 100 + '%';
                    }


                    that.element.css('width', percent);
                }

                this.element.data('prev-width', this.element.css('width'));

                if ((this.options.fallback || $.browser.mobile) && this.element[0].type !== 'text') {
                    this.element[0].min = that.options.min;
                    this.element[0].max = that.options.max;
                    this.element[0].step = that.options.step;

                    if(this.options.type === 'currency'){
                        this.element[0].pattern = '^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:[.][0-9]{2})?|(?:[.][0-9]{3})*(?:,[0-9]{2})?)$';
                        addOn = $('<div class="add-on">'+this.options.currency.symbol+'</div>');

                        if(this.options.currency.append){
                            this.element.wrap('<div class="input-append" style="display: inline-block; vertical-align:middle;"></div>');
                            this.element.after(addOn);
                            this.element.css('width', this.element.width() - addOn.outerWidth());
                        }else{
                            this.element.wrap('<div class="input-prepend" style="display: inline-block; vertical-align:middle;"></div>');
                            this.element.before(addOn);
                            this.element.css('width', this.element.width() - addOn.outerWidth());
                        }
                    }
                    return false;
                } else if (!this.options.fallback && this.element[0].type !== 'text') {
                    this.element[0].type = 'text';
                }

                this._bindKeyEvents();

                this.group = group;

                group.append(up);
                group.append(down);
                this.element.wrap(parent);
                this.element.parent('.spinner').css('height', this.element.outerHeight());

                up.css('line-height', ((this.element.height() / 2) - 1) + 'px');
                down.css('line-height', ((this.element.height() / 2) - 1) + 'px');

                //Add the currency symbol to the spinner
                if (this.options.type === 'currency' && this.options.style === 'outside') {
                    addOn = $('<div class="add-on">' + this.options.currency.symbol + '</div>');
                    if(this.options.currency.append){
                        this.element.after(addOn);
                    }else{
                        this.element.parent('.spinner').addClass('input-prepend');
                        this.element.before(addOn);
                    }
                } else if (this.options.type === 'currency') {
                    addOn = $('<div>' + this.options.currency.symbol + '</div>');
                    if(this.options.currency.append){
                        this.element.after(currencyGroup);
                        currencyGroup.append(addOn);
                        addOn.addClass('spinner-add-on-append');
                    }else{
                        this.element.before(addOn);
                        addOn.addClass('spinner-add-on');
                        this.element.css('text-indent', addOn.outerWidth());
                    }
                }

                if (this.options.style === 'outside') {
                    if(this.options.spinner || this.options.currency.append){
                        this.element.parent('.spinner').addClass('input-append');
                    }
                    this.element.parent('.spinner').css({
                        'display':  'inline-block',
                        'vertical-align': 'middle',
                        'margin-bottom': 0
                    });
                    group.addClass('add-on');
                    if(this.options.type === 'currency'){
                        if(this.options.spinner){
                            if(this.options.currency.append){
                                addOn.after(group);
                            }else{
                                this.element.after(group);
                            }
                        }
                        this.element.css('width', this.element.width() - addOn.outerWidth(true));
                    }else{
                        if(this.options.spinner){
                            this.element.after(group);
                        }
                    }
                    this._borderRadius(up, 0, group.css('border-top-right-radius'), 0, 0);
                    down.css('margin-right', 0);
                    down.css('margin-left', 0);
                    this._borderRadius(down, 0, 0, group.css('border-bottom-right-radius'), 0);
                    group.css('height', '100%');
                    group.css('padding', 0);
                    group.css('border', 0);
                    this.element.css('width', this.element.width() - group.outerWidth(true));

                    if(this.options.fluid) {
                        this.element.parent().css('display', 'block');

                        this.element.on('resize', function() {
                            calcWidthPercent(true);
                        });

                        calcWidthPercent(true);
                    }
                } else if (this.options.style === 'self') {
                    if(this.options.spinner){
                        this.element.after(group);
                    }
                } else {
                    throw new Error('Invalid style attribute');
                }

                this.element.on('click', function () {
                    that.cursorLocation = that.element[0].selectionStart;
                    that._toggleButtons();
                });

                up.on('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    clickHandler(that.increment);
                });
                down.on('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    clickHandler(that.decrement);
                });

                if (this.options.type === 'time' && _.isEmpty(this.element.val())) {
                    this.element.val(this._format(this.element.val()));
                }

                if (this.options.hideOnBlur) {
                    group.hide();
                }

                this.options.max = this._parse(this.options.max);
                this.options.min = this._parse(this.options.min);

                this.disable(this.element.prop('disabled'));
            },

            _parseTime:function (value) {
                var date = new Date(new Date().toDateString() + ' ' + value);

                if(_.isNaN(date.getTime())){
                    this._trigger('error', null);
                    return;
                }
                date.setMilliseconds(0);

                return date;
            },

            _formatTime:function (value) {
                var date = new Date();
                //Default to NOW
                if (!_.isEmpty(value) && !_.isDate(value)) {
                    date = this._parseTime(value);
                } else if (_.isDate(value)) {
                    date = value;
                }

                return date.format(this.options.time.format);
            },

            _format:function (value) {
                var regex = /(\d+)(\d{3})/;

                if (this.options.type !== 'time') {
                    if (!_.isNull(this.options.numsAfterDecimal) && _.isNumber(value)) {
                        value = value.toFixed(this.options.numsAfterDecimal);
                    }

                    value = value.toString();
                    while (regex.test(value)) {
                        value = value.replace(regex, '$1' + this.options.group + '$2');
                    }

                    value.replace('.', this.options.point);
                    return value;
                } else {
                    return this._formatTime(value);
                }
            },

            _parse:function (value) {
                if (_.isNull(value) || _.isEmpty(value)) {
                    return value;
                }

                if (this.options.type !== 'time') {
                    var regex = new RegExp(this.options.group, "ig");
                    return parseFloat(value.replace(regex, ''));
                } else {
                    return this._parseTime(value);
                }
            },

            setValue:function (value) {
                this._trigger('change', {}, {prevValue: this._parse(this.oldVal), newVal: value});
                this.element.val(this._format(value));
                this._toggleButtons();
            },

            _inBounds:function (val) {
                return ((_.isNull(this.options.max) || val <= this.options.max) &&
                    (_.isNull(this.options.min) || val >= this.options.min));
            },

            update:function (step) {
                var value = this._parse(this.element.val());

                if (this.options.type !== 'time') {
                    if (_.isNaN(value) || (!_.isNumber(value) && _.isEmpty(value))) {
                        value = 0;
                    }

                    value += step;
                    if (this._inBounds(value)) {
                        this.setValue(value);
                    }
                } else {
                    switch (this._getTimeField()) {
                        case 'hours':
                            value.setHours(value.getHours() + step);
                            break;
                        case 'minutes':
                            value.setMinutes(value.getMinutes() + step);
                            break;
                        case 'seconds':
                            value.setSeconds(value.getSeconds() + step);
                            break;
                        case 'TT':
                            value.setHours(value.getHours() + 12);
                            break;
                    }

                    if (this._inBounds(value)) {
                        this.setValue(value);
                    }
                }
            },

            increment:function () {
                this.update(this.options.step);
            },

            decrement:function () {
                this.update(-this.options.step);
            },

            _setOption:function (key, value) {
                //TODO: update options;
                if (key === 'max') {
                    this.options.max = this._parse(value);
                } else if (key === 'min') {
                    this.options.min = this._parse(value);
                }
            },

            _destroy:function () {
                this._unbindKeyEvents();
                this.element.off('click');
                this.element.siblings().remove();

                if(this.element.parent().hasClass('spinner')){
                    this.element.unwrap();
                }

                this.element.off('resize');

                this.element.css('width', this.element.data('prev-width'));
                delete this.group;
            },

            getFormattedValue:function () {
                if (this.options.type === 'time') {
                    return this._parseTime(this.element.val());
                } else {
                    return this._format(parseFloat(this.element.val()));
                }
            }

        });
    }
);

/**
 * @class DateView
 */
define('oui.date/dateView',['oui.jquery', 'oui.underscore', 'oui.utils/template', 'oui.utils/dateHelper', 'oui.spinner/spinnerWidget'],
    function ($, _, creatorFn, DateHelper) {
        

        var $markup = $('<script type="text/html" class="calendar">' +
            ' <div class="calendar" style="display: none;">' +
            '    <span class="button-controls">' +
            '        <div class="prev-buttons">' +
            '            <button class="btn">&laquo;</button>' +
            '            <button class="btn">&lsaquo;</button>' +
            '        </div>' +
            '        <div class="next-buttons">' +
            '            <button class="btn">&rsaquo;</button>' +
            '            <button class="btn">&raquo</button>' +
            '        </div>' +
            '        <div class="title"></div>' +
            '    </span>' +
            '    <div class="month">' +
            '        <table>' +
            '            <thead>' +
            '            <tr>' +
            '                <th><%=locale.day.sunday%></th>' +
            '                <th><%=locale.day.monday%></th>' +
            '                <th><%=locale.day.tuesday%></th>' +
            '                <th><%=locale.day.wednesday%></th>' +
            '                <th><%=locale.day.thursday%></th>' +
            '                <th><%=locale.day.friday%></th>' +
            '                <th><%=locale.day.saturday%></th>' +
            '            </tr>' +
            '            </thead>' +
            '            <tr>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '                <td></td>' +
            '            </tr>' +
            '        </table>' +
            '    </div>' +
            '    <span class="button-controls today-cancel">' +
            '        <div class="group">' +
            '            <button class="btn btn-small today"><%=locale.today%></button>' +
            '            <button class="btn btn-small cancel"><%=locale.cancel%></button>' +
            '        </div>' +
            '    </span>' +
            ' </div>' +
            '               </script>');

        /**
         * A DateView object is the popup that shows when clicking on the calendar button
         * from a DatePicker.
         *
         * Calls the initialize method. This works because require will return the dateView
         * function after it has already applied the prototype extensions.
         *
         * @class DateView
         * @constructor
         * @param Object widget The JQuery widget object this DateView is paired with.
         */
        var dateView = function (widget) {
            this.widget = widget;
            this.options = widget.options;
            this.helper = new DateHelper();
            this.init();
            this.shown = false;
        };

        function pluckMarkup($markup, clazzName, map) {
            var template = $markup.filter(clazzName).html();
            if (map == null) {
                return template;
            }
            return creatorFn(template, map);
        }

        $.extend(dateView.prototype, {
            /**
             * Cleans up the DateView object - similar to a destroy method.
             *
             * @method remove
             */
            remove:function () {
                if (this.options.type === 'datetime' && !_.isUndefined(this.spinnerInit) && this.spinnerInit) {
                    this.spinnerInit = false;
                    this.$time.spinner('destroy');
                }
                this.$calendar.remove();
                delete this.helper;
            },
            /**
             * Initializes a DateView object.
             *
             * Called during construction.
             *
             * @method init
             */
            init:function () {
                var that = this, parent, maxZindex = 0;

                this.spinnerInit = false;

                that.$calendar = $(pluckMarkup($markup, '.calendar',
                    {locale:that.options.locale}));

                parent = $(this.widget.element).parent();
                while (parent.length > 0 && parent[0] !== document) {
                    if (parent.css('z-index') !== 'auto' && parent.css('z-index') > maxZindex) {
                        maxZindex = parent.css('z-index');
                    }
                    parent = $(parent).parent();
                }
                this.$calendar.css('z-index', maxZindex + 1);

                if (this.options.type === 'datetime') {
                    that.$time = $('<input type="text">');
                    that.$calendar.find('.button-controls .group').before(that.$time);
                }

                //Bind all the click events to the buttons
                // select button
                that.$calendar.find('.cancel').on('click', function (event) {
                    event.preventDefault();
                    that.widget.cancel();
                });

                that.$calendar.find('.today').on('click', function (event) {
                    event.preventDefault();
                    that.widget.submit(new Date());
                });

                that.$calendar.find('.next-buttons :nth-child(2)').on('click', function (event) {
                    event.preventDefault();
                    var date = that.curDate;
                    date.setFullYear(date.getFullYear() + 1);
                    that.render(date);
                });

                that.$calendar.find('.next-buttons :nth-child(1)').on('click', function (event) {
                    event.preventDefault();
                    var date = that.curDate;
                    date.setMonth(date.getMonth() + 1);
                    that.render(date);
                });

                that.$calendar.find('.prev-buttons :nth-child(1)').on('click', function (event) {
                    event.preventDefault();
                    var date = that.curDate;
                    date.setFullYear(date.getFullYear() - 1);
                    that.render(date);
                });

                that.$calendar.find('.prev-buttons :nth-child(2)').on('click', function (event) {
                    event.preventDefault();
                    var date = that.curDate;
                    date.setMonth(date.getMonth() - 1);
                    that.render(date);
                });

                that.$calendar.find('tbody td').on('click', function (event) {
                    event.preventDefault();
                    var date, time;
                    if ($(this).hasClass('inactive')) {
                        return false;
                    }
                    date = $(this).data('date');

                    if (that.options.type === 'datetime') {
                        time = that.$time.spinner('getFormattedValue');
                        date.setHours(time.getHours());
                        date.setMinutes(time.getMinutes());
                        date.setSeconds(time.getSeconds());
                    }
                    that.widget.submit(date);
                });

                that.$calendar.on('mouseover', function () {
                    that.widget.cancelBlur = true;
                });

                that.$calendar.on('click', function () {
                    //TODO: determine how the input for the date picker can have focus
                    //that.widget.element.focus();
                });

                that.$calendar.on('mouseout', function () {
                    that.widget.cancelBlur = false;
                });
            },

            show:function () {
                this.$calendar.show();
                this.shown = true;
            },

            hide:function () {
                this.$calendar.hide();
                this.shown = false;
            },

            updateTime:function (dateStr) {
                var date = new Date(dateStr);
                this.$time.val(date.format($.orcl.spinner.prototype.options.time.format));
            },

            _toggleButtons:function (date) {
                this.$calendar.find('.next-buttons :nth-child(2)').prop('disabled',
                        !this.helper.isNextYearAllowed(date, this.options.max));

                this.$calendar.find('.next-buttons :nth-child(1)').prop('disabled',
                        !this.helper.isNextMonthAllowed(date, this.options.max));

                this.$calendar.find('.prev-buttons :nth-child(1)').prop('disabled',
                        !this.helper.isPrevYearAllowed(date, this.options.min));

                this.$calendar.find('.prev-buttons :nth-child(2)').prop('disabled',
                        !this.helper.isPrevMonthAllowed(date, this.options.min));

                this.$calendar.find('.today').prop('disabled',
                        !this.helper.isTodayAllowed(this.options.min, this.options.max));
            },

            select:function (date) {
                this.selected = date;
            },

            /**
             * Renders the month view using the markup given the date.
             *
             * Also applies the selected class on the rendered date.
             *
             * @method render
             * @param {Date} date The date to render the month view for
             */
            render:function (date) {
                var that = this, today = new Date(), startMonth, startDoW, row = 0,
                    $title, $row, $cell, cellDate;

                this.curDate = new Date(date.toDateString());

                this._toggleButtons(date);

                date.setDate(1);
                startMonth = date.getMonth();
                startDoW = date.getDay();

                //if day of week starts on Sunday - then start on second row
                //otherwise start on first row
                row = 0;
                if (startDoW === 0) {
                    row = 1;
                }

                this.$calendar.css('left', $(this.widget.element).offset().left);
                this.$calendar.css('top', $(this.widget.element).offset().top + $(this.widget.element).outerHeight());

                $title = this.$calendar.find('.title');
                $title.text(this.options.locale.months[startMonth] + ' ' + date.getFullYear());
                $title.css('line-height', $title.parent().find('.btn').outerHeight() + 'px');

                //Current month
                while (date.getMonth() === startMonth) {
                    $row = that.$calendar.find('table tbody tr:nth-child(' + (row + 1) + ')');
                    $cell = $row.find('td:nth-child(' + (1 + date.getDay()) + ')');
                    $cell.css('font-weight', 'bold');
                    $cell.data('date', new Date(date.toString()));
                    $cell.text(date.getDate());

                    date.setDate(date.getDate() + 1);
                    if (date.getDay() === 0) {
                        row++;
                    }
                }

                //After current month
                while (row < 6) {
                    $row = that.$calendar.find('table tbody tr:nth-child(' + (row + 1) + ')');
                    $cell = $row.find('td:nth-child(' + (1 + date.getDay()) + ')');
                    $cell.text(date.getDate());
                    $cell.data('date', new Date(date.toString()));
                    $cell.css('font-weight', 'normal');
                    date.setDate(date.getDate() + 1);
                    if (date.getDay() === 0) {
                        row++;
                    }
                }

                //Before current month
                date.setMonth(date.getMonth() - 1);
                date.setDate(1);
                date.setDate(date.getDate() - 1);
                if (startDoW === 0) {
                    do {
                        $row = that.$calendar.find('table tbody tr:nth-child(1)');
                        $cell = $row.find('td:nth-child(' + (1 + date.getDay()) + ')');
                        $cell.css('font-weight', 'normal');
                        $cell.data('date', new Date(date.toString()));
                        $cell.text(date.getDate());
                        date.setDate(date.getDate() - 1);
                    } while (date.getDay() !== 6);
                } else {
                    while (date.getDay() !== 6) {
                        $row = that.$calendar.find('table tbody tr:nth-child(1)');
                        $cell = $row.find('td:nth-child(' + (1 + date.getDay()) + ')');
                        $cell.data('date', new Date(date.toString()));
                        $cell.css('font-weight', 'normal');
                        $cell.text(date.getDate());
                        date.setDate(date.getDate() - 1);
                    }
                }

                $.each(this.$calendar.find('td'), function () {
                    cellDate = $(this).data('date');

                    if ((!_.isNull(that.options.max) && that.helper.dateComparator(cellDate, new Date(that.options.max)) > 0) ||
                        (!_.isNull(that.options.min) && that.helper.dateComparator(cellDate, new Date(that.options.min)) < 0)) {
                        $(this).addClass('inactive');
                    } else {
                        $(this).removeClass('inactive');
                    }

                    if (that.helper.dateComparator(cellDate, today) === 0) {
                        $(this).addClass('today');
                    } else {
                        $(this).removeClass('today');
                        if (that.helper.dateComparator(cellDate, that.selected) === 0) {
                            $(this).addClass('selected');
                        } else {
                            $(this).removeClass('selected');
                        }
                    }

                });

                if (this.options.type === 'datetime') {
                    this.options.spinner = $.extend(this.options.spinner, {type:'time'});
                    that.$time.spinner(this.options.spinner);
                    //Has to be custom done - now due to positioning changes
                    that.$calendar.find('.spinner').css('margin-bottom', '5px');
                    that.spinnerInit = true;
                }

                return this;
            }

        });

        return dateView;

    });

define('oui.utils/detectMobile',['oui.jquery'], function ($) {
    
    $.browser.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
});

/**
 * A widget that extends the JQuery-UI default widget and provides
 * a date picker ui element using an input html element.
 *
 * Example creation with default options:
 *
 *     $('selector').datePicker();
 *
 * @class DatePicker
 **/
define('oui.date/dateWidget',['oui.jquery', 'oui.underscore', 'oui.date/dateView',
        'oui.jqueryui', 'oui.bootstrap',
        'oui.dateFormat', 'oui.utils/detectMobile', 'oui.resize'],
    function ($, _, DateView) {
        

        /*
         * Sets up a new hook for $.val when used on an input[type=text] element
         * This is because no matter how it is displaying in Chrome - the default
         * val returns yyyy-mm-dd.
         */
        var origHook = $.valHooks.text;
        $.valHooks.text = {
            get:function (el) {
                if (!$(el).data('date-value')) {
                    if (origHook) {
                        return origHook.get(el);
                    } else {
                        return undefined;
                    }
                }

                var origValue = $(el)[0].value, date;
                if(_.isEmpty(origValue)){
                    return origValue;
                }

                date = new Date($(el)[0].value);
                //Very rudimentary date regex
                if(_.isNaN(date.getTime()) ||
                    !(origValue.match(/^(?:[0-9]{1,2}|[0-9]{4})\D(?:[0-9]{1,2}|[0-9]{4})\D(?:[0-9]{4}|[0-9]{1,2})(\s\d{1,2}.\d{1,2}(.\d{1,2})?(.[A-Za-z]{1,2})?)?$/) ||
                      origValue.match(/^[A-Za-z]+(\W[A-Za-z]*)?(?:\W\d{1,2})(?:\W(\d{4}|\d{1,2}))(?:\W(\d{1,2}.\d{1,2})(.\d{1,2})?(\W[A-Za-z]{1,2})?)?$/))){
                    return '';
                }

                return date.format($(el).data('date-format'));
            }
        };

        $.widget('orcl.datePicker', {

            options:{
                /**
                 * The localization strings to use in the date picker
                 *
                 * @property locale
                 * @type Object
                 * @default {
                 *     today: 'Today',
                 *     cancel: 'Cancel',
                 *     day: {
                 *         sunday: 'Sun',
                 *         monday: 'Mon',
                 *         tuesday: 'Tues',
                 *         wednesday: 'Wed',
                 *         thursday: 'Thu',
                 *         friday: 'Fri',
                 *         saturday: 'Sat'
                 *     },
                 *     months:[
                 *       'January',
                 *       'February',
                 *       'March',
                 *       'April',
                 *       'May',
                 *       'June',
                 *       'July',
                 *       'August',
                 *       'September',
                 *       'October',
                 *       'November',
                 *       'December'
                 *    ]
                 * }
                 */
                locale:{
                    today:'Today',
                    cancel:'Cancel',
                    day:{
                        sunday:'Sun',
                        monday:'Mon',
                        tuesday:'Tues',
                        wednesday:'Wed',
                        thursday:'Thu',
                        friday:'Fri',
                        saturday:'Sat'
                    },
                    months:[
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ]
                },
                /**
                 * How the button should be displayed.
                 *
                 * Outside: The button is appended to the input using Bootsrap's input-append class.
                 *
                 * Inside: The button is absolutely positioned over the input element (some text may end up
                 *    being overlapped.
                 *
                 * Self: The buttons location is dependent on the stylesheet of the developer
                 *
                 * Valid options are:
                 *
                 *     'outside',
                 *     'inside',
                 *     'self'
                 * @property style
                 * @type String
                 * @default 'outside'
                 */
                style:'outside', //Valid options are inside, outside, or self
                /**
                 * Whether to display the button when the input has focus.
                 *
                 * The button will disappear when the input element loses focus
                 *
                 * @property showOnFocus
                 * @type Boolean
                 * @default false
                 */
                showOnFocus:false,
                /**
                 * The minimum date allowed to be selected
                 *
                 * Any string that can be parse by Date.parse should work.
                 *
                 * @property min
                 * @type String
                 * @default null
                 */
                min:null,
                /**
                 * The maximum date allowed to be selected
                 *
                 * Any string that can be parse by Date.parse should work.
                 *
                 * @property max
                 * @type String
                 * @default null
                 */
                max:null,
                showWeekends:true, //TODO: use this field or get rid of it
                /**
                 * The format to display the date as. It can be either a string or a function.
                 *
                 * When using it as a function the date object is passed in.
                 *
                 * @property dateFormat
                 * @type String|Function
                 * @default 'm/dd/yyyy'
                 */
                dateFormat:'m/dd/yyyy',
                /**
                 * The format the date should be returned in when calling val() on the JQuery element
                 *
                 * @property valFormat
                 * @type String
                 * @default 'yyyy-mm-dd'
                 */
                valFormat:'yyyy-mm-dd',
                /**
                 * The type of date picker to create. Can be either:
                 *
                 *      'date',
                 *      'datetime'
                 *
                 * The DateTime picker includes a spinner for time underneath the calendar
                 *
                 * @property type
                 * @type String
                 * @default 'date'
                 */
                type:'date',
                /**
                 * The function to be called after a date is selected. This is useful for
                 * items that want to deal with the data as they need to.
                 * Like using JQuery's data method to store it or as an HTML data-* attribute.
                 *
                 * @property select
                 * @type Function
                 * @default function () {}
                 */
                select:function () {},
                /**
                 * The spinner options to be used when the type is 'datetime'.
                 *
                 * @property spinner
                 * @type Object
                 * @default {
                 *     type : 'time'
                 * }
                 */
                spinner:{
                    type : 'time'
                },
                /**
                 * Whether or not to use an icon trigger instead of a button.
                 * Currently it uses the Bootstrap Glyphicons icon-calendar icon.
                 *
                 * @property iconTrigger
                 * @type {boolean}
                 * @default false
                 */
                iconTrigger:false,
                /**
                 * Whether or not to fall back to the HTML5 native controls
                 *
                 * This property gets ignored when using the controls on mobile. It will always
                 * fallback for better controls.
                 *
                 * @property fallback
                 * @type {boolean}
                 * @default true
                 */
                fallback:false,
                /**
                 * Selector for appending the dateView to the page
                 *
                 * Default is to just append it to the body
                 *
                 * @property appendTo
                 * @type {string}
                 * @default 'body'
                 */
                appendTo:'body',
                /**
                 * Whether or not the input should take up all available space
                 *
                 * Default is to be specified width
                 *
                 * @property fluid
                 * @type {boolean}
                 * @default false
                 */
                fluid: false
            },

            showCalendarButton:function () {
                this.$button.show();
            },

            hideCalendarButton:function () {
                this.$button.hide();
            },

            /**
             * @private
             * @method _handleBlur
             * @param {Object} event A JQuery event
             * @return {boolean} boolean Whether to cancel the event
             **/
            _handleBlur:function (event) {
                var widget = event.data;
                if (widget.cancelBlur) {
                    event.preventDefault();
                    return false;
                } else {
                    widget.view.hide();
                }
            },

            /**
             * This method handles turning on all the event handlers for the widget.
             *
             * @private
             * @method _bindKeyEvents
             */
            _bindKeyEvents:function () {
                var that = this;
                this.element.on('blur', this, this._handleBlur);

                this.element.on('change', function () {
                    var val = that.element[0].value;
                    that.change(val);
                });

                if (this.options.showOnFocus) {
                    that.hideCalendarButton();

                    this.element.on('focus', function () {
                        that.showCalendarButton();
                    });

                    this.element.on('blur', function () {
                        that.hideCalendarButton();
                    });
                }
            },

            /**
             * This method handles turning off all of the event handlers for the widget.
             *
             * @private
             * @method _unBindKeyEvents
             */
            _unBindKeyEvents:function () {
                this.element.off('blur');

                this.element.off('change');

                if(this.options.showOnFocus){
                    this.element.off('focus');
                }
            },

            disable:function(disabled) {
                if(disabled){
                    //Disable the buttons
                    this.$button.prop('disabled', true);
                    this.$button.addClass('disabled');
                    this.$button.removeAttr('href');
                    this.element.prop('disabled', true);
                }else{
                    this.$button.removeClass('disabled');
                    this.$button.prop('disabled', false);
                    this.$button.prop('href', '#');
                    this.element.prop('disabled', false);
                }
            },

            setDate : function(date) {
                if(!_.isDate(date)){
                    throw new Error('Not a valid date');
                }else{
                    this.change(date.toString());
                }
            },

            getDate : function() {
                return this.element.data('date-value');
            },

            /**
             * This is the constructor that gets called when initializing a JQuery UI widget.
             *
             * See [JQuery UI Widget Factory _create](http://api.jqueryui.com/jQuery.widget/#method-_create) for more details.
             *
             * @private
             * @method _create
             *
             */
            _create:function () {
                var that = this, curValue, prevWidth;
                this.widgetEventPrefix = this.widgetEventPrefix + '-';

                this.element.data('prev-width', this.element.css('width'));

                function calcWidthPercent(withButton) {

                    var padding = that.element.outerWidth() - that.element.width(), percent;

                    if(withButton) {
                        percent = (1-(that.$button.outerWidth() + padding) / that.element.parent().outerWidth()) * 100 + '%';
                    }else{
                        percent = (1-padding / that.element.parent().outerWidth()) * 100 + '%';
                    }
                    that.element.css('width', percent);
                }

                //TODO: stop using the regex for mobile browser
                if ((this.options.fallback || $.browser.mobile) && this.element[0].type !== 'text') {
                    this.element.change(function () {
                        that.options.select(that.element.val());
                    });
                    return false;
                } else if (!this.options.fallback && this.element[0].type !== 'text') {
                    this.element[0].type = 'text';
                }

                this.element.addClass('orcl-datepicker');

                if(!_.isUndefined(this.element.data('min'))){
                    this.options.min = this.element.data('min');
                }

                if(!_.isUndefined(this.element.data('max'))){
                    this.options.max = this.element.data('max');
                }

                this.view = new DateView(that);

                if (this.options.type === 'datetime') {
                    if (!_.isUndefined(this.options.spinner.time) && !_.isUndefined(this.options.spinner.time.format)) {
                        this.options.valFormat += ' ' + this.options.spinner.time.format;
                    } else {
                        this.options.valFormat += ' ' + $.orcl.number.prototype.options.time.format;
                    }
                }
                this.element.data('date-format', this.options.valFormat);

                this._bindKeyEvents();

                if (!this.options.iconTrigger) {
                    this.$button = $('<a href="#" class="btn btn-blue-light">...</a>');
                } else {
                    this.$button = $('<a href="#"><i class="icon-calendar"></i></a>');
                    this.$button.css('display', 'inline-block');

                    if (this.options.style === 'inside') {
                        this.$button.css('height', this.element.outerHeight());
                        this.$button.css('line-height', this.element.outerHeight() + 'px');
                        this.$button.css('vertical-align', 'top');
                    }
                }

                if (this.options.style === 'inside') {
                    //TODO: move to less
                    this.element.wrap('<div class="input-date-container" style="display:inline-block"></div>');
                    this.element.after(this.$button);
                    this.$button.css('position', 'relative');
                    this.$button.css('margin-left', -(parseFloat(this.element.css('margin-right')) + (this.$button.outerWidth() + 1)));
                    this.element.css('margin', 0);
                    //this.$button.css('margin-bottom', this.element.css('margin-bottom'));
                    this.view.$calendar.appendTo(this.options.appendTo);

                    if(this.options.fluid) {
                        this.element.parent().css('display', 'block');
                        this.element.parent().css('position', 'relative');

                        this.$button.css('position', 'absolute');
                        this.$button.css('margin-left', 0);

                        this.$button.css('right', '1px');
                        this.$button.css('top', '1px');
                        this.element.on('resize', function() {
                            calcWidthPercent(false);
                        });

                        calcWidthPercent(false);
                    }
                } else if (this.options.style === 'outside') {
                    this.$button.addClass('add-on');
                    //TODO: move to less
                    prevWidth = this.element.width();
                    this.element.wrap('<div class="input-date-container input-append" style="display:inline-block; vertical-align:middle; margin-bottom:0;">');
                    this.element.after(this.$button);
                    this.element.css('width', prevWidth - this.$button.outerWidth());
                    this.view.$calendar.appendTo(this.options.appendTo);

                    if(this.options.fluid) {
                        this.element.parent().css('display', 'block');

                        this.element.on('resize', function() {
                            calcWidthPercent(true);
                        });

                        calcWidthPercent(true);
                    }
                } else if (this.options.style === 'self') {
                    this.element.after(this.$button);
                    this.$button.addClass('show-calendar-button');
                    this.view.$calendar.appendTo(this.options.appendTo);
                } else {
                    throw new Error('Invalid style specified');
                }

                this.$button.on('click', function (event) {
                    event.preventDefault();

                    if(that.$button.hasClass('disabled')) {
                        return false;
                    }

                    if(that.view.shown){
                        that.view.hide();
                    }else{
                        var date = that.element.data('date-value');
                        that.view.show();

                        if(that.element.val() === '' && that.element[0].value !== ''){
                            date = undefined;
                        }
                        var renderDate = (_.isUndefined(date) || _.isNull(date)) ? new Date() : date;

                        that.view.select(new Date(renderDate.toString()));
                        that.view.render(new Date(renderDate));
                        that.element.focus();
                    }
                });

                this.$button.on('mouseover', function() {
                    that.cancelBlur = true;
                });

                this.$button.on('mouseout', function() {
                    that.cancelBlur = false;
                });

                curValue = this.element[0].value;
                if(!_.isEmpty(curValue)){
                    this.element.trigger('change');
                }
                this.disable(this.element.prop('disabled'));
            },

            /**
             * This method is called when new options are supplied. An example of this can be:
             *
             *      $('.some_class').datePicker({min : newMin});
             *
             * @private
             * @method _setOption
             * @param {String} key The option key to update
             * @param {String} value The value the new key should hold
             */
            _setOption:function (key, value) {
                // TODO: update picker correctly depending on option that has changed.
                if (this.element[0].type === "text") {
                    $.Widget.prototype._setOption.apply(this, arguments);
                } else {
                    if (!_.isUndefined(this.element[0][key]) && _.isDate(value)) {
                        this.element[0][key] = value.format('yyyy-mm-dd');
                    } else if (!_.isUndefined(this.element[0][key])) {
                        this.element[0][key] = value;
                    }
                }
            },

            hide:function () {
                this.view.hide();
            },

            show:function () {
                this.view.show();
            },

            /**
             * Widget specific clean up and removal of element
             *
             * @private
             * @method _destroy
             */
            _destroy:function () {
                this.element.children().each(function () {
                    $(this).remove();
                });

                if(this.element.parent().hasClass('input-date-container')){
                    this.element.unwrap();
                }

                this.element.off('resize');

                this.element.removeClass('orcl-datepicker');
                this.element.empty();
                this.element.removeData('date-value');
                this.element.removeData('date-format');
                this._unBindKeyEvents();
                this.$button.remove();
                this.view.remove();
                this.element.css('width', this.element.data('prev-width'));

                delete this.$button;
                delete this.view;
            },

            //Widget events
            //TODO: is this necessary? - especially public?
            select:function () {
                this.view.select();
            },

            /**
             * This method is fired whenever an input's document changes.
             *
             * @method change
             * @param {String} dateStr A string representing the date to set
             */
            change:function (dateStr) {
                var date = new Date(dateStr);
                if (_.isEmpty(dateStr)) {
                    this.element.attr('value', null);
                    this.options.select(null);
                    this.element.data('date-value', null);
                } else {
                    try {
                        if(_.isNaN(date.getTime())){
                            //Invalid date
                            this._trigger('error', {}, {prevValue : this.element.data('date-value')});
                            return;
                        }
                        if (_.isFunction(this.options.dateFormat)) {
                            this.options.select(date);
                            this.element.val(this.options.dateFormat(date));
                            this.element.data('date-value', date);
                        } else {
                            this.element.val(date.format(this.options.dateFormat));
                            this.options.select(date);
                            this.element.data('date-value', date);
                        }
                    } catch(e) {
                        this._trigger('error', {}, {prevValue : this.element.data('date-value')});
                    }
                }

                if(this.options.type === 'datetime'){
                    this.view.updateTime(dateStr);
                }
            },

            /**
             * This method provides a programatic approach to setting the elements
             * date.
             *
             * @method submit
             * @param {Date} date The date to set on the element
             */
            submit:function (date) {
                this.view.hide();
                if (_.isFunction(this.options.dateFormat)) {
                    this.element.val(this.options.dateFormat(date));
                    this.element.data('date-value', date);
                } else {
                    try {
                        this.element.val(date.format(this.options.dateFormat));
                        this.element.data('date-value', date);
                    } catch(e) {
                        this._trigger('error', {}, {prevValue : this.element.data('date-value')});
                    }
                }
                this.element.trigger('change');
            },

            //TODO: seems like a copy of the hide() method. Is this necessary?
            cancel:function () {
                this.view.hide();
            }

        });

    });

/**
 * A widget that extends the JQuery-UI default widget. This widget provides
 * a slider that is initialized on a div.
 *
 * Does **not** currently fallback to a native slider
 *
 * Example creation using default options:
 *
 *     $('div-selector').slider();
 *
 * @Class Slider
 */
define('oui.slider/sliderWidget',['oui.jquery', 'oui.underscore', 'oui.jqueryui', 'oui.bootstrap'],
    function ($, _) {
        

        $.widget('orcl.slider', {

            options:{
                /**
                 * The maximum value to be used for the slider.
                 *
                 * @property max
                 * @type Integer
                 * @default 100
                 */
                max:100,
                /**
                 * The minimum value to be used for the slider.
                 *
                 * @property min
                 * @type Integer
                 * @default 0
                 */
                min:0,
                /**
                 * When the step option is suppled the slider will snap to the closest
                 * value.
                 *
                 * If step is .5 then dragging will go 1, 1.5, 2.
                 *
                 * @property step
                 * @type Integer
                 * @default null
                 */
                step:null,
                /**
                 * The oritentation of the slider
                 *
                 * Valid values are:
                 *
                 *     'horizontal',
                 *     'vertical'
                 *
                 * @property orientation
                 * @type String
                 * @default 'horizontal'
                 */
                orientation:'horizontal',
                /**
                 * The values to use as the location for the slider handles.
                 *
                 * @property values
                 * @type Array
                 * @default []
                 */
                values:[], //Values for the handles - array length of either 0, 1 or 2
                /**
                 * Whether or not the slider is a range. A range is a slider with two handles.
                 *
                 * @property range
                 * @type Boolean
                 * @default false
                 */
                range:false,
                /**
                 * The type of single handle range this is. When it is a single handle
                 * range the other value is either the minimum or the maximum.
                 *
                 * Valid values are:
                 *
                 *     'max',
                 *     'min'
                 *
                 * When max is selected the maximum handle may be moved and the minimum value
                 * is fixed. Otherwise, the minimum handle may be moved and the maximum value
                 * is fixed.
                 *
                 * @property rangeType
                 * @type String
                 * @default 'max'
                 */
                rangeType:'max', //'min' or 'max' only used when there is one handle
                /**
                 * When a handle has focus the up/right arrows will increment the slider handle
                 * and the down/left arrows will decrement the slider handle.
                 *
                 * This property determines what the handle will snap to next.
                 *
                 * @property keyStep
                 * @type Integer
                 * @default 1
                 */
                keyStep:1,
                /**
                 * When the handle is currently being dragged the slider will call liveUpdate
                 * as soon as it registers the new location.
                 *
                 * @property liveUpdate
                 * @type Function
                 * @param value The new value of the slider currently.
                 * @default function () {}
                 */
                liveUpdate:function () {},
                /**
                 * When the handle is let go the slider will call update.
                 *
                 * @property update
                 * @type Function
                 * @param value The new value of the slider
                 * @default function () {}
                 */
                update:function () {}
            },

            _getClosestValue:function (value) {

                if (_.isNull(this.options.step)) {
                    return value;
                }

                if (value % this.options.step < (this.options.step / 2)) {
                    return parseFloat((value - (value % this.options.step)).toFixed(10));
                } else {
                    if (value === (value % this.options.step)) {
                        return parseFloat((value - (value % this.options.step)).toFixed(10));
                    }
                    return parseFloat(((value + this.options.step) - (value % this.options.step)).toFixed(10));
                }
            },

            _normalize:function (percent) {
                if (this.options.orientation === 'horizontal') {
                    return percent;
                } else {
                    return 1 - percent;
                }
            },

            _dragHandler:function (element, range) {
                var that = this,
                    field, rangeField, pageField, offset, parent, mouseDown = false, show = _.debounce(function(element) {
                        if(element.is(':hover') || mouseDown){
                            element.tooltip('show');
                        }
                    }, 250);
                //TODO: add touch support - mousedown = touchstart, mousemove = touchmove, mouseup = touchend
                element.on('mousedown',function (event) {
                    var min = that.element.find('.slider-handle-min').data('value') || that.options.min,
                        max = that.element.find('.slider-handle-max').data('value') || that.options.max;
                    element.tooltip('destroy');
                    mouseDown = true;

                    if (that.options.orientation === 'horizontal') {
                        field = 'left';
                        rangeField = 'width';
                        pageField = 'pageX';
                        offset = element.parent().offset().left;
                        parent = element.parent().outerWidth();
                    } else {
                        field = 'bottom';
                        rangeField = 'height';
                        pageField = 'pageY';
                        offset = element.parent().offset().top;
                        parent = element.parent().outerHeight();
                    }

                    element.parents().on('mousemove', function (event) {
                        var percent = that._normalize(((event[pageField] - offset) / parent)),
                            value = that._getClosestValue(that.options.min + (that.options.max - that.options.min) * percent);
                        element.tooltip('destroy');

                        //Recalculate the percent based on the closest value;
                        percent = (value - that.options.min) / (that.options.max - that.options.min);

                        if (element.hasClass('slider-handle-min')) {
                            if (value >= that.options.min && value <= max) {
                                element.data('value', value);
                                element.css(field, (percent * 100) + '%');
                                if (range !== null) {
                                    range.css(field, (percent * 100) + '%');
                                    range.css(rangeField, (max - (percent * 100)) + '%');
                                }
                                that.options.liveUpdate({min:value});
                                element.tooltip({title:value.toString()});
                                show(element);
                            }
                        } else if (element.hasClass('slider-handle-max')) {
                            if (value <= that.options.max && value >= min) {
                                element.data('value', value);
                                element.css(field, (percent * 100) + '%');
                                if (range !== null) {
                                    range.css(rangeField, ((percent * 100) - min) + '%');
                                }
                                that.options.liveUpdate({max:element.data('value')});
                                element.tooltip({title:value.toString()});
                                show(element);
                            }
                        } else if (value <= that.options.max && value >= that.options.min) {
                            element.data('value', value);
                            element.css(field, (percent * 100) + '%');

                            if (that.options.range && that.options.rangeType === 'max') {
                                range.css(rangeField, (percent * 100) + '%');
                            } else if (that.options.range) {
                                range.css(rangeField, (100 - (percent * 100)) + '%');
                                range.css(field, (percent * 100) + '%');
                            }
                            that.options.liveUpdate({value:element.data('value')});
                            element.tooltip({title:value.toString()});
                            show(element);
                        }
                    });
                    element.parents().on('mouseup', function () {
                        if (element.hasClass('slider-handle-min')) {
                            that.options.update({min:element.data('value')});
                        } else if (element.hasClass('slider-handle-max')) {
                            that.options.update({max:element.data('value')});
                        } else {
                            that.options.update({value:element.data('value')});
                        }

                        element.tooltip({title: element.data('value').toString()});
                        element.parents().off('mousemove');
                        element.tooltip('hide');
                        mouseDown = false;
                    });
                    event.preventDefault();
                    event.stopPropagation();
                }).on('mouseup', function (event) {
                        if (element.hasClass('slider-handle-min')) {
                            that.options.update({min:element.data('value')});
                        } else if (element.hasClass('slider-handle-max')) {
                            that.options.update({max:element.data('value')});
                        } else {
                            that.options.update({value:element.data('value')});
                        }

                        element.tooltip({title: element.data('value').toString()});
                        $(this).parents().off('mousemove');
                        $(this).parents().off('mouseup');
                        event.stopPropagation();
                        mouseDown = false;
                }).on('mouseout', function() {
                    element.tooltip('hide');
                });
            },

            _findClosestHandle:function(percent) {
                var handles = $(this.element.find('.slider-handle')), closest, difference, tempDiff;
                for(var i = 0; i < handles.length; i++){
                    tempDiff = Math.abs(percent - ($(handles[i]).position().left /this.element.width()));
                    if(_.isUndefined(difference) || tempDiff < difference){
                        difference = tempDiff;
                        closest = handles[i];
                    }
                }

                return closest;
            },

            _snapHandle:function (event) {
                var clickLocation, percent, value, handle;

                if(this.options.orientation === 'vertical'){
                    clickLocation = event.pageY - this.element.offset().top;
                    percent = this._normalize(clickLocation / this.element.height());

                    value = this._getClosestValue(this.options.min + (this.options.max - this.options.min) * percent);
                    percent = (value - this.options.min) / (this.options.max - this.options.min);
                    handle = this._findClosestHandle(percent);
                    this._updateHandle(handle, percent, value);
                    $(handle).trigger('mouseover');
                }else{
                    clickLocation = event.pageX - this.element.offset().left;
                    percent = (clickLocation / this.element.width());

                    value = this._getClosestValue(this.options.min + (this.options.max - this.options.min) * percent);
                    percent = (value - this.options.min) / (this.options.max - this.options.min);
                    handle = this._findClosestHandle(percent);
                    this._updateHandle(handle, percent, value);
                    $(handle).trigger('mouseover');
                }
                return false;
            },


            _updateHandle:function (handle, percent, value) {
                var element = $(handle);
                element.tooltip('destroy');

                if(this.options.orientation === 'horizontal') {
                    element.css('left', (percent * 100) + '%');
                }else{
                    element.css('bottom', (percent * 100) + '%');
                }
                element.tooltip({title: value.toString()});
                element.data('value', value);

                if (element.hasClass('slider-handle-min')) {
                    this.options.update({min:value});
                    this._updateRange('min', percent);
                } else if (element.hasClass('slider-handle-max')) {
                    this.options.update({max:value});
                    this._updateRange('max', percent);
                } else {
                    this.options.update({value:value});
                    this._updateRange(this.options.rangeType, percent);
                }
            },

            _updateRange:function (type, percent) {
                var range = this.element.find('.slider-range'),
                    min = this.element.find('.slider-handle-min').data('value') || this.options.min,
                    max = this.element.find('.slider-handle-max').data('value') || this.options.max,
                    startField, lengthField;

                if(this.options.orientation === 'horizontal'){
                    startField = 'left';
                    lengthField = 'width';
                } else {
                    startField = 'bottom';
                    lengthField = 'height';
                }

                if(type === 'min'){
                    range.css(startField, (percent * 100) + '%');
                    range.css(lengthField, (max - (percent * 100)) + '%');
                }else if(type === 'max'){
                    range.css(lengthField, ((percent * 100) - min) + '%');
                }
            },

            _createHandles:function () {
                var that = this,
                    field, rangeField, height, width, marginTop, marginLeft, maxPercent, minPercent, handle, range,
                    minHandle, maxHandle;

                if (this.options.orientation === 'horizontal') {
                    field = 'left';
                    rangeField = 'width';
                    width = 'width';
                    height = 'height';
                    marginTop = 'margin-top';
                    marginLeft = 'margin-left';
                } else {
                    field = 'bottom';
                    rangeField = 'height';
                    width = 'height';
                    height = 'width';
                    marginTop = 'margin-left';
                    marginLeft = 'margin-bottom';
                }

                this.handleValues = that.options.values;

                if (this.options.values.length === 0 || this.options.values.length === 1) {
                    //Create one handle at minimum or the single value specified
                    handle = $('<a href="#" class="slider-handle"></a>');
                    range = null;

                    if (this.options.range) {
                        range = $('<div class="slider-range"></div>');
                        this.element.append(range);
                        range.css(height, this.element.css(height));
                        range.css(field, 0);
                        range.css(rangeField, 0);
                    }

                    handle.css(height, parseFloat(this.element.css(height)) + 4);
                    handle.css(width, 10);
                    handle.css(marginTop, -3);
                    handle.css(marginLeft, -6);

                    this.element.append(handle);

                    if (this.options.values.length === 1) {
                        handle.data('value', that.options.values[0]);
                        handle.tooltip({title : that.options.values[0].toString()});

                        if (this.options.range && this.options.rangeType === 'max') {
                            maxPercent = (this.options.values[0] - that.options.min) / (that.options.max - that.options.min) * 100;
                            range.css(field, 0);
                            range.css(rangeField, maxPercent + '%');
                        } else if (this.options.range) {
                            minPercent = (this.options.values[0] - that.options.min) / (that.options.max - that.options.min) * 100;
                            maxPercent = 100 - minPercent;
                            range.css(field, minPercent + '%');
                            range.css(rangeField, maxPercent + '%');
                        }
                        handle.css(field,
                            (this.options.values[0] - that.options.min) / (that.options.max - that.options.min) * 100 + '%');
                    } else {
                        handle.tooltip({title : '0'});
                        handle.css(field, '0%');
                    }
                    this._dragHandler(handle, range);
                } else {
                    //Create a handle for each value at that values location
                    minHandle = $('<a href="#" class="slider-handle slider-handle-min"></a>');
                    maxHandle = $('<a href="#" class="slider-handle slider-handle-max"></a>');
                    minPercent = (this.options.values[0] - that.options.min) / (that.options.max - that.options.min) * 100;
                    maxPercent = (this.options.values[1] - that.options.min) / (that.options.max - that.options.min) * 100;

                    //Only can be a boolean value when using two handles
                    if (this.options.range) {
                        range = $('<div class="slider-range"></div>');
                        this.element.append(range);
                        range.css(field, minPercent + '%');
                        range.css(rangeField, (maxPercent - minPercent) + '%');
                        range.css(height, this.element.css(height));
                    }
                    this.element.append(minHandle);
                    minHandle.data('value', this.options.values[0]);
                    this._dragHandler(minHandle, range);
                    minHandle.css(field, minPercent + '%');
                    minHandle.css(height, parseFloat(this.element.css(height)) + 4);
                    minHandle.css(width, 10);
                    minHandle.css(marginTop, -3);
                    minHandle.css(marginLeft, -6);
                    minHandle.tooltip({title: this.options.values[0].toString()});

                    this.element.append(maxHandle);
                    maxHandle.data('value', this.options.values[1]);
                    this._dragHandler(maxHandle, range);
                    maxHandle.css(field, maxPercent + '%');
                    maxHandle.css(height, parseFloat(this.element.css(height)) + 4);
                    maxHandle.css(width, 10);
                    maxHandle.css(marginTop, -3);
                    maxHandle.css(marginLeft, -6);
                    maxHandle.tooltip({title: this.options.values[1].toString()});
                }
            },

            _isValidValue:function(element, value) {
                var min = this.element.find('.slider-handle-min').data('value') || this.options.min,
                    max = this.element.find('.slider-handle-max').data('value') || this.options.max;

                if($(element).hasClass('slider-handle-max')){
                    return value >= min;
                }else if($(element).hasClass('slider-handle-min')){
                    return value <= max;
                }else{
                    return value >= min && value <= max;
                }
            },

            _create:function () {
                var that = this;

                if(this.options.step != null){
                    this.options.keyStep = this.options.step;
                }

                this.element.addClass('slider');
                this._createHandles();
                this.options.update = _.debounce(this.options.update, 10);
                this.options.liveUpdate = _.debounce(this.options.liveUpdate, 10);

                this.element.on('click', function(event) {
                    that._snapHandle.apply(that, [event]);
                }).children().on('click', function(event) {
                    if($(this).hasClass('slider-handle')){
                        event.stopPropagation();
                    }
                });

                this.element.find('a').on('keydown', function(event){
                    var keyCode = $.ui.keyCode, value, percent;

                    switch (event.keyCode) {
                        case keyCode.UP:
                        case keyCode.RIGHT:
                            value = $(this).data('value') || 0;
                            value = value + that.options.keyStep;
                            if(that._isValidValue(this, value)){
                                percent = (value - that.options.min) / (that.options.max - that.options.min);
                                that._updateHandle(this, percent, value);
                            }
                            event.preventDefault();
                            break;
                        case keyCode.DOWN:
                        case keyCode.LEFT:
                            value = $(this).data('value') || 0;
                            value = value - that.options.keyStep;
                            if(that._isValidValue(this, value)){
                                percent = (value - that.options.min) / (that.options.max - that.options.min);
                                that._updateHandle(this, percent, value);
                            }
                            event.preventDefault();
                            break;
                    }
                });
            },

            _setOption:function (key, value) {
                console.log(key + ' ' + value);
                //TODO: update options;
            },

            _destroy:function () {
                this.element.off('mousedown');
                this.element.off('click');
                this.element.empty();
                this.element.removeClass('slider');
            }

        });
    }
);

define('oui.file/fileWidget',['oui.jquery', 'oui.jqueryui', 'oui.bootstrap'],
function ($) {
    

    $.widget('orcl.filePicker', {
        options: {
            display: 'inline' /* valid options are whatever can be put into the display style */
        },

        _create: function() {
            var that = this,
                curWidth = this.element.width(),
                $styledPicker =
                    $('<div class="input-append" aria-hidden="true" style="display: ' +
                            this.options.display + ';">' +
                        '<input class="fileName" type="text" disabled style="cursor: hand; cursor: pointer;" aria-hidden="true"/>' +
                        '<a class="btn btn-blue-light add-on browse" href="#" aria-hidden="true">Browse</a>' +
                    '</div>'),
                $fileNameInput = $styledPicker.find('.fileName'),
                $browseButton = $styledPicker.find('.browse');


            this.element.css('opacity', '0');
            this.element.css('position', 'absolute');
            this.element.css('width', '0px');

            $styledPicker.insertAfter(this.element);
            $styledPicker.css('width', curWidth);

            var buttonWidth = $browseButton.outerWidth();
            $fileNameInput.css('width', curWidth - buttonWidth - parseFloat($fileNameInput.css('paddingLeft')) -
                parseFloat($fileNameInput.css('paddingRight')) - parseFloat($fileNameInput.css('borderLeft')) -
                parseFloat($fileNameInput.css('borderRight')));

            $styledPicker.on('click', function(e) {
                e.preventDefault();
                that.element.click();
            });

            this.element.on('change', function() {
                var fileName = $(this).val().split(/\\/).pop();

                $styledPicker.find('.fileName').val(fileName);
            });
        }
    });
});
//TODO: Put this not in inputs...do we even have a 'utility' repo. Probs should.

define('oui.utils/fadeSwap',['oui.jquery'], function ($) {
    
    $.fn.fadeSwap = function (options, callback) {
        var that = this;

        if (options.swapWith.is(':visible')) {
            options.swapWith.fadeToggle(function() {
                that.fadeToggle(function() {
                    if (typeof callback === 'function') callback.call(this);
                });
            });
        }
        else {
            this.fadeToggle(function() {
                options.swapWith.fadeToggle(function() {
                    if (typeof callback === 'function') callback.call(this);
                });
            });
        }
    };
});
define('oui.utils/formWalker',['oui.jquery'], function ($) {
    
    $.fn.formWalker = function () {
        var that = this;

        this.each(function(index) {
            $(this).on('keydown', function(e) {
                if (e.which === 9) {
                    var nextIdx;

                    e.preventDefault();
                    if (e.shiftKey) {
                        nextIdx = index - 1;
                        if (nextIdx < 0) {
                            nextIdx = that.size() - 1;
                        }
                    } else {
                        nextIdx = index + 1;
                        if (nextIdx > that.size() - 1) {
                            nextIdx = 0;
                        }
                    }

                    $(that[nextIdx]).focus();
                }
                else if (e.which === 13 && !e.shiftKey) {
                    e.preventDefault();

                    that.filter('.save').click();
                }
            });
        });
    };
});
define('oui.utils/subscribable',['oui.underscore'], function(_) {
    

    /**
     * The interface for all objects that can be subscribed to.
     *
     * @class Subscribable
     * @constructor
     */
    function Subscribable () {

        /**
         * The map of event names to their proper functions.
         *
         * @example
         *      var _map = {
         *          select : {
         *              noNamespace : [ 'callBack1', 'callBack2' ],
         *              view : 'callBack',
         *              customNameSpace : 'callBack'
         *          }
         *      };
         *
         * @property _map
         * @type {Object}
         * @private
         * @default {}
         */
        Object.defineProperty(this, '_map', {
            value : {},
            writable : false,
            enumerable : false
        });
    }

    Subscribable.prototype = _.extend({}, {
        constructor : Subscribable,
        /**
         * Calls each function that matches the argument.
         * Argument can either be namespace.event, or just event
         *
         * If argument is just event name than all functions will be called otherwise
         * only the namespaced event will be called.
         *
         * @method trigger
         * @param {String} eventName Either a string in the form of nameSpace.event or event
         */
        trigger : function (eventName) {
            var split = eventName.split('.'), args;

            args = Array.prototype.slice.call(arguments);
            args = _.rest(args, 1);

            if(split[0] === eventName) {
                //No name space given - fire all the 'eventName'
                //events even the non-namespaced ones
                _.each(this._map[eventName], function(e, key) {
                    if(key === 'noNamespace') {
                        _.each(e, function(noNameEvent) {
                            noNameEvent.fn.apply(noNameEvent.context, args);
                        });
                    }else{
                        e.fn.apply(e.context, args);
                    }
                });
            } else {
                if(!_.isUndefined(this._map[split[1]][split[0]])){
                    var ev = this._map[split[1]][split[0]];
                    ev.fn.apply(ev.context, args);
                }
            }
        },
        /**
         * Sets the callback for the event name under the given namespace.
         *
         * If no name space if given then it goes under the array 'noNamespace'.
         *
         * @method on
         * @param {String} eventName Either a string in the form of nameSpace.event or event
         * @param {Function} callBack The function to call when triggered.
         */
        on : function(eventName, callBack, context) {
            var split = eventName.split('.'), nameSpace = split[0], e = split[1];

            if(eventName === split[0]) {
                //No name space was given
                e = split[0];

                if(_.isUndefined(this._map[e])) {
                    this._map[e] = { noNamespace : []};
                }else if(_.isUndefined(this._map[e].noNameSpace)) {
                    this._map[e].noNamespace = [];
                }

                this._map[e].noNamespace.push({ fn : callBack, context : context});
            }else{
                if(_.isUndefined(this._map[e])) {
                    this._map[e] = {};
                    this._map[e][nameSpace] = { fn : callBack, context : context};
                }else{
                    this._map[e][nameSpace] = { fn : callBack, context : context};
                }
            }
        },
        /**
         * Removes the function(s) for the given namespace. If no name space is given then remove
         * all functions.
         *
         * @method off
         * @param {String} eventName Either a string in the form of nameSpace.event or event
         */
        off : function(eventName) {
            var split = eventName.split('.'), nameSpace = split[0], e = split[1];

            if(eventName === split[0]){
                //No namespace given
                e = split[0];

                //Remove all 'e' - including namespaced ones
                delete this._map[e];
            } else {
                if(!_.isUndefined(this._map[e][nameSpace])){
                    delete this._map[e][nameSpace];
                }
            }
        }
    });

    return Subscribable;

});

define('oui.tree/tree',['oui.underscore'], function(_) {
    

    /**
     * A typical tree data structure where each node is itself a tree.
     *
     * @example
     *     var tree = new Tree("1");
     *
     * @example
     *     var tree = new Tree("2", "1", { hasChildren : false, code : 11101 });
     *
     * @class Tree
     * @since 1.2.0
     * @constructor
     * @param {String}  id             The id for this tree
     * @param {String}  [parentId]     The id of the parent tree if it has one
     * @param {Object}  [data]         The object to hold all custom data
     * @param {Array}   [subTreeData]  The data to make up all of the subtrees
     * @param {Integer} [level]        The level in the hierarchy this node appears
     */
    function Tree (id, parentId, data, subTreeData, level) {
        var that = this;

        /**
         * The id of the tree.
         *
         * @property _id
         * @type {String}
         * @readOnly
         * @private
         */
        Object.defineProperty(this, "_id", {
            writable : false,
            enumerable : false,
            value : id
        });

        /**
         * The id of the parent tree.
         *
         * @property _parentId
         * @type {String}
         * @readOnly
         * @private
         */
        Object.defineProperty(this, "_parentId", {
            writable : false,
            enumerable : false,
            value : parentId
        });

        /**
         * The custom data associated with this tree node.
         *
         * Possibly holds whether the tree contains children, codes, names, etc.
         *
         * @property _data
         * @type {Object}
         * @readOnly
         * @private
         */
        Object.defineProperty(this, "_data", {
            writable : false,
            enumerable : false,
            value : data
        });

        /**
         * The trees that are children of this tree
         *
         * @property _children
         * @type {Array}
         * @private
         * @default []
         */
        Object.defineProperty(this, "_children", {
            value : [],
            writable : true,
            enumerable : false
        });

        /**
         * Whether or not this tree has been loaded.
         * Used with lazy loading to determine if we need to get the data from the server.
         *
         * @property _loaded
         * @type {Boolean}
         * @default false
         * @readOnly
         * @private
         */
        Object.defineProperty(this, "_loaded", {
            value : false,
            writable : true,
            enumerable : false
        });

        /**
         * The level in the tree this node appears.
         *
         * @property _level
         * @type {Integer}
         * @private
         */
        Object.defineProperty(this, "_level", {
            writable : true,
            enumerable : false,
            value : level
        });

        if(!_.isNull(subTreeData)) {
            _.each(subTreeData[this.id], function(node) {
                that.addSubTree(new Tree(node.id, node.parentId, node, subTreeData, that.level + 1));
            });
        }

        return this;
    }

    Tree.prototype = {
        constructor : Tree,
        /**
         * The getter for the id property.
         * Uses the ES5 getter syntax.
         *
         * @example
         *     console.log(tree.id);
         *
         * @method id
         * @return {String} id
         */
        get id() {
            return this._id;
        },
        /**
         * The getter for the parentId property.
         * Uses the ES5 getter syntax.
         *
         * @example
         *     console.log(tree.parentId);
         *
         * @method parentId
         * @return {String} parentId
         */
        get parentId() {
            return this._parentId;
        },
        /**
         * The getter for the custom data property.
         * Uses the ES5 getter syntax.
         *
         * @example
         *     console.log(tree.data);
         *
         * @method data
         * @return {Object} data
         */
        get data() {
            return this._data;
        },
        /**
         * The getter for the children property.
         * Uses the ES5 getter syntax.
         *
         * @example
         *     console.log(tree.children);
         *
         * @method children
         * @return {Array} children
         */
        get children() {
            return this._children;
        },
        /**
         * Add a subtree to the this tree.
         * Marks this tree as being loaded as well as having children
         *
         * @method addSubTree
         * @param {Tree} subTree The subtree to add to the children property
         */
        addSubTree : function(subTree) {
            this._children.push(subTree);
            if(!this._loaded) {
                this._loaded = true;
            }
            this._hasChildren = true;
        },
        /**
         * Remove a subtree and all it's children from this tree.
         * Property has children becomes false if children is 0
         *
         * @method removeSubTree
         * @param {Tree} subTree The subtree to remove from children
         */
        removeSubTree : function(subTree) {
            this._children = _.reject(this._children, function(tree) { return tree === subTree; } );
            if(this._children.length === 0){
                this._hasChildren = false;
            }
        },
        /**
         * Get an descendent node by its id.
         *
         * @method getNodeById
         * @param {String} id
         * @return {Tree} node The descendent of the current tree.
         */
        getNodeById : function(id) {
            var node = null, i;
            if ( this.id === id ) {
                node = this;
            } else {
                //Might be one of the children - this is a shortcut
                for(i = 0; i < this._children.length; i++){ //
                    if(this._children[i].id === id) {
                        return this._children[i];
                    }
                }

                for(i = 0; i < this._children.length; i++){
                    node = this._children[i].getNodeById(id);
                    if(!_.isNull(node) && node.id === id) {
                        break;
                    }
                }
            }

            return node;
        },
        /**
         * Whether or not this tree is loaded or not.
         *
         * @method isLoaded
         * @return true if the current tree is loaded or has children
         */
        isLoaded : function() {
            return this._loaded || this._children.length > 0;
        },
        /**
         * Setter to set whether the tree is loaded or not.
         * Uses ES5 setter syntax.
         *
         * @example
         *     tree.loaded = true;
         *
         * @method loaded
         * @param {Boolean} newValue whether or not the tree is loaded
         */
        set loaded(newValue) {
            this._loaded = newValue;
        },
        /**
         * Whether or not this tree is loaded or not.
         * Uses ES5 getter syntax.
         *
         * @method loaded
         * @return true if the current tree is loaded or has children
         */
        get loaded() {
            return this._loaded;
        },
        set level(l) {
            this._level = l;
        },
        get level() {
            return this._level;
        }
    };

    return Tree;

});

define('oui.tree/treeModel',['oui.underscore', 'oui.utils/subscribable', 'oui.tree/tree'], function(_, Subscribable, Tree) {
    

    /**
     * The model used for the tree panel.
     *
     * @class TreeModel
     * @extends Subscribable
     * @since 1.2.0
     * @constructor
     * @param {Boolean} multiSelect Whether or not the tree model supports multiselection.
     * @param {Array}   initData    The initial data before any lazy loading takes place.
     * @param {Boolean} lazyLoad    Whether or not the tree model is lazy loaded.
     */
    function TreeModel (multiSelect, initData, lazyLoad) {
        var groupedData = null;

        if(!_.isNull(initData)){
            groupedData = _.groupBy(initData, function(node) {
                return node.parentId;
            });
        }
        Subscribable.call(this);
        //TODO: look at this property - initially may want it to be null
        var root = new Tree(null, undefined, null, groupedData, 0);
        /**
         * The root node for this model.
         *
         * @property _root
         * @type {Tree}
         * @private
         * @default Tree(null, undefined, null, groupedData);
         */
        Object.defineProperty(this, "_root", {
            writable : false,
            enumerable : false,
            value : root
        });

        /**
         * The list of currently expanded nodes.
         *
         * @property _expandedNodes
         * @type {Array}
         * @private
         * @default []
         */
        Object.defineProperty(this, "_expandedNodes", {
            writable : true,
            enumerable : false,
            value : []
        });

        this._expandedNodes.push(null);

        /**
         * The list of currently selected nodes.
         *
         * @property _selectedNodes
         * @type {Array}
         * @private
         * @default []
         */
        Object.defineProperty(this, "_selectedNodes", {
            writable : true,
            enumerable : false,
            value : []
        });

        /**
         * The currently active node. The active node is a node that is
         * currently highlighted on the UI as the node key actions behave on.
         *
         * @property _activeNode
         * @type {String}
         * @private
         * @default null
         */
        Object.defineProperty(this, "_activeNode", {
            writable : true,
            enumerable : false,
            value : null
        });

        /**
         * The list of unselectable nodes. Currently, if the parent id is included
         * in the list then the children are automatically unselectable as well.
         *
         * @property _unselectableNodes
         * @type {Array}
         * @private
         * @default []
         */
        Object.defineProperty(this, "_unselectableNodes", {
            writable : true,
            enumerable : false,
            value : []
        });

        /**
         * A map of id to Tree.
         *
         * @property _treeHash
         * @private
         * @type {Object}
         * @default []
         */
        Object.defineProperty(this, "_treeHash", {
            writable : true,
            enumerable : false,
            value : _.groupBy(initData, function(node) {
                node.data = node;
                return node.id;
            })
        });

        if(!_.contains(_.keys(this._treeHash), null)){
            this._treeHash[null] = [root];
        }

        /**
         * Whether or not the model allows multiple selections.
         *
         * @property multiSelect
         * @type {Boolean}
         */
        this.multiSelect = multiSelect;
        /**
         * Whether or not the model is lazy loaded.
         *
         * @property lazyLoad
         * @type {Boolean}
         */
        this.lazyLoad = lazyLoad;

        return this;
    }

    TreeModel.prototype = Object.create(Subscribable.prototype);

    _.extend(TreeModel.prototype, {
        constructor : TreeModel,
        /**
         * Adds multiple objects/Trees to their proper parent unless
         * the parent does not exist. If the parent does not exist then
         * the node is added to the root.
         *
         * @method addSubTree
         * @param {Array} data the data to add either objects to be converted to Trees or Trees
         */
        addSubTree : function(data) {
            var that = this;

            function updateTreeHash(node) {
                that._treeHash[node.id] = [node];
                _.each(node.children, function(child) {
                    updateTreeHash(child);
                });
            }

            _.each(data, function(node) {
                var tree;
                that._treeHash[node.id] = [];
                if(!(node instanceof Tree)){
                    tree = new Tree(node.id, node.parentId, node, null);
                }else{
                    tree = node;
                }

                that._treeHash[node.id].push(tree);
                if(_.isNull(node.parentId)){
                    that._root.addSubTree(tree);
                    tree.level = that._root.level + 1;
                }else {
                    var parentNode = that.getNodeByPath(node.parentId);

                    if(_.isNull(parentNode)){
                        that._root.addSubTree(new Tree(node.id, null, node.data, null, that._root.level + 1));
                    }else{
                        parentNode.addSubTree(tree);
                        tree.level = parentNode.level + 1;
                    }
                }

                updateTreeHash(tree);
                /**
                 * Fired when a node is added to the model - does not matter how many.
                 *
                 * @event node-added
                 */
                that.trigger('node-added', tree);
            });
        },
        /**
         * Removes a subtree from the model. Will remove all children associated with it.
         *
         * @method removeSubTree
         * @param {String} id The id to remove.
         */
        removeSubTree : function(id) {
            var node = this.getNodeByPath(id), that = this;

            function updateTreeHash(tree) {
                delete that._treeHash[tree.id];
                if(tree.children.length > 0){
                    _.each(tree.children, function(child) {
                        updateTreeHash(child);
                    });
                }
            }

            if(!_.isNull(node)){
                this._root.removeSubTree(node);

                updateTreeHash(node);
                /**
                 * Fired when a node is removed - does not matter how many.
                 *
                 * @event node-removed
                 */
                this.trigger('node-removed', this);
            }
        },
        /**
         * Getter for the root.
         *
         * @method getTree
         * @return {Tree} root The root node.
         */
        getTree : function() {
            return this._root;
        },
        /**
         * Adds an id to the expanded nodes list.
         *
         * @method expand
         * @param {String} id The id to expand.
         */
        expand : function(id) {
            //Useful to set a tree node as expanded
            this._expandedNodes.push(id);
            /**
             * Fired when the node is added to the expanded nodes list.
             *
             * @event expand
             * @param {String} id The id of the expanded node.
             */
            this.trigger('expand', id);
        },
        /**
         * Removes an id to the expanded nodes list.
         *
         * @method collapse
         * @param {String} id The id to collapse.
         */
        collapse : function(id) {
            this._expandedNodes = _.reject(this._expandedNodes, function(expandedId) { return id === expandedId; });
            /**
             * Fired when the node is removed to the expanded nodes list.
             *
             * @event collapse
             * @param {String} id The id of the collapsed node.
             */
            this.trigger('collapse', id);
        },
        /**
         * Getter for the expanded nodes.
         *
         * @method getExpanded
         * @returns {Array} expandedNodes The list of expanded nodes
         */
        getExpanded : function() {
            return this._expandedNodes;
        },
        /**
         * Adds a node to the selected nodes list. Removes all other nodes if the model is not multiselectable.
         *
         * @method select
         * @param {String} id The id to select
         */
        select : function(id) {
            if(!this.multiSelect) {
                this._selectedNodes.splice(0, this._selectedNodes.length);
            }
            this._selectedNodes.push(id);
            /**
             * Fires the selection event when any node has been selected.
             *
             * @event select
             * @param {Array} selectedNodes The list of selected nodes after a node has been selected.
             */
            this.trigger('select', this._selectedNodes);
        },
        /**
         * Removes a node from the selected nodes list.
         *
         * @method deselect
         * @param {String} id The id to remove from the selected nodes list.
         */
        deselect : function(id) {
            this._selectedNodes = _.reject(this._selectedNodes, function(selectedId) { return id === selectedId; });
            /**
             * Fires the deselection event when any node has been deselected.
             *
             * @event deselect
             * @param {String} id The node that has been deselected.
             */
            this.trigger('deselect', id);
        },
        /**
         * Sets the active node.
         *
         * @method active
         * @param {String} id The currently active node.
         */
        active : function(id) {
            this._activeNode = id;
            /**
             * Fires the active event when the node has been changed.
             *
             * @event active
             * @param {String} id The id of the new active node.
             */
            this.trigger('active', id);
        },
        /**
         * Makes the current active node null.
         *
         * @method deactive
         */
        deactive : function() {
            this._activeNode = null;
            /**
             * Fires the deactive event after it changes the node.
             *
             * @event deactive
             */
            this.trigger('deactive');
        },
        /**
         * Gets the currently selected nodes.
         *
         * @method getSelected
         * @return {Array} selectedNodes The list of selected nodes.
         */
        getSelected : function() {
            return this._selectedNodes;
        },
        /**
         * Determines if a node is currently expanded or not.
         *
         * @method isExpanded
         * @param {String} id The id to check if it is contained in the expanded nodes.
         * @return true if the list of expanded nodes contains the id.
         */
        isExpanded : function(id) {
            return _.contains(this._expandedNodes, id);
        },
        /**
         * Determines if a node is currently selected or not.
         *
         * @method isSelecteded
         * @param {String} id The id to check if it is contained in the selected nodes.
         * @return true if the list of selected nodes contains the id.
         */
        isSelected : function(id) {
            return _.contains(this._selectedNodes, id);
        },
        /**
         * Determines if a node is selectable.
         *
         * @method isSelectable
         * @param {String} id The id to check if it is selectable or not.
         * @return true if there is no intersection between any of its ancestors and the unselectable list.
         */
        isSelectable : function(id) {
            var that = this, parentId;
            function constructPath(curPath, curId) {
                if(curId !== null && _.contains(_.keys(that._treeHash), curId)){
                    curPath.push(curId);
                    parentId = that._treeHash[curId][0].parentId;
                    return constructPath(curPath, parentId);
                }
                return curPath;
            }

            var path = constructPath([], id);
            return  _.intersection(path, this._unselectableNodes).length === 0;
        },
        /**
         * Sets a node to being selectable by removing it from the unselectable list.
         *
         * @method selectable
         * @param {String} id The id to set as selectable.
         */
        selectable : function(id) {
            this._unselectableNodes = _.reject(this._unselectableNodes, function(curId) { return id === curId; });
            /**
             * Fires the selectable event when the list is changed.
             *
             * @event selectable
             * @param {Array} unselectableNodes The list of unselectable nodes.
             */
            this.trigger('selectable', this._unselectableNodes);
        },
        /**
         * Sets a node to being unselectable. Removes all children nodes from the list.
         *
         * @method unselectable
         * @param {String} id The id to add to the unselectable list.
         */
        unselectable : function(id) {
            var that = this, parentId, path;
            function constructPath(curPath, curId) {
                if(curId !== null && _.contains(_.keys(that._treeHash), curId)){
                    curPath.push(curId);
                    parentId = that._treeHash[curId][0].parentId;
                    return constructPath(curPath, parentId);
                }
                return curPath;
            }

            //Remove all the children unselectable nodes - due to regrouping
            _.each(this._unselectableNodes, function(unSelId) {
                path = constructPath([], unSelId);
                if(_.contains(path, id)){
                    that._unselectableNodes = _.reject(that._unselectableNodes, function(curId) { return unSelId === curId; });
                }
            });
            this._unselectableNodes.push(id);
            /**
             * Fires the selectable event when the list has changed.
             *
             * @event selectable
             * @param {Array} unselectableNodes The list of unselectable nodes.
             */
            this.trigger('selectable', this._unselectableNodes);
        },
        //Move all of these functions to controller? - except clears?
        /**
         * Removes all nodes from the selected nodes list.
         *
         * @method clearSelection
         */
        clearSelection : function() {
            this._selectedNodes = [];
            /**
             * Fires the select event.
             *
             * @event select
             */
            this.trigger('select');
        },
        /**
         * Sets the selection to a specific set of nodes.
         *
         * @method setSelection
         * @param {Array} nodes Array of ids to be selected.
         */
        setSelection : function(nodes) {
            if(nodes.length > 1 && !this.multiSelect) {
                throw new Error('Selection contains more than 1 node');
            }

            this._selectedNodes = nodes;
            /**
             * Fires the select event.
             *
             * @event select
             */
            this.trigger('select');
        },
        /**
         * Expands all the nodes until it reaches the selected node.
         *
         * Currently only works with already loaded nodes.
         *
         * @method expandPathTo
         * @param {Array} selectedNodes The nodes to highlight/expand all their ancestors.
         */
        expandPathTo : function(selectedNodes) {
            //FIXME: this will not work with lazyLoading...maybe we want that
            var parentId, that = this;

            //Check if all are loaded
            _.each(selectedNodes, function(id) {
                if(that.getNodeByPath(id) === null) {
                    throw new Error('Node is not loaded yet');
                }
            });

            for(var i = 0; i < selectedNodes.length; i++){
                parentId = that.getNodeByPath(selectedNodes[i]).parentId;
                while(parentId !== undefined) {
                    this._expandedNodes.push(parentId);
                    parentId = that.getNodeByPath(parentId).parentId;
                }
            }
            this._expandedNodes = _.uniq(this._expandedNodes);

            /**
             * Fires the expand event.
             *
             * @event expand
             */
            this.trigger('expand');
        },
        /**
         * Gets a specific node using a more efficient path based get instead of a search.
         *
         * @method getNodeByPath
         * @param {String} id The id of the node to find.
         * @returns {Tree} node The node found.
         */
        getNodeByPath : function(id) {
            var node = this._root, path, that = this, parentId, contained;

            if(_.isNull(id)){
                contained = _.contains(_.keys(this._treeHash), "null");
            }else {
                contained = _.contains(_.keys(this._treeHash), id);
            }

            function constructPath(curPath, curId) {
                if(curId !== null && _.contains(_.keys(that._treeHash), curId)){
                    curPath.push(curId);
                    parentId = that._treeHash[curId][0].parentId;
                    return constructPath(curPath, parentId);
                }
                return curPath;
            }

            if(contained){
                path = constructPath([], id).reverse();

                _.each(path, function(curId) {
                    node = _.find(node.children, function(child) {
                        return curId === child.id;
                    });
                });
                return node;
            }else{
                return this._root.getNodeById(id);
            }

        },
        /**
         * Determines if a node has children or not.
         *
         * @method hasChildren
         * @param {String} id The id of the node to see if it has children.
         * @returns true if the node.children > 0 || node.data.hasChildren is true || model is lazyLoaded and the node is not currently loaded.
         */
        hasChildren : function(id) {
            var node = this.getNodeByPath(id);

            if(node.children.length > 0){
                return true;
            }

            if(node.data.hasChildren !== undefined) {
                return node.data.hasChildren;
            }

            if(this.lazyLoad && node.isLoaded()){
                return node.children.length > 0;
            }

            return this.lazyLoad && !node.isLoaded();
        }
    });

    return TreeModel;

});

define('oui.tree/treeController',['oui.underscore', 'oui.jquery'], function(_, $) {
    

    /**
     * The controller used for the tree panel.
     *
     * @class TreeController
     * @since 1.2.0
     * @constructor
     * @param {TreeModel} model      The model that the controller will act on.
     * @param {Object}    customFns  The functions that need to be specified on the controller.
     * @param {Boolean}   lazyLoad   Whether the controller is lazyily loaded or if everything is already given.
     */
    //Maybe do not need lazyLoad in the controller?
    function TreeController (model, customFns, lazyLoad) {

        /**
         * The model for the tree panel.
         *
         * @property _model
         * @type {TreeModel}
         * @private
         */
        Object.defineProperty(this, "_model", {
            enumerable : false,
            writable : false,
            value : model
        });

        /**
         * The functions used by the controller. Currently, only load is supported.
         *
         * @property _storeFns
         * @type {Object}
         * @private
         */
        Object.defineProperty(this, "_storeFns", {
            enumerable : false,
            writable : false,
            value : customFns
        });

        /**
         * Whether or not the data is lazily loaded.
         *
         * @property lazyLoad
         * @type {Boolean}
         */
        this.lazyLoad = lazyLoad;
        /**
         * Whether or not the data is currently filtered.
         *
         * @property filtered
         * @type {Boolean}
         * @default false
         */
        this.filtered = false;

        return this;
    }

    _.extend(TreeController.prototype, {
        constructor : TreeController,
        /**
         * Determines whether the desired node is expanded or not and expands as necessary.
         *
         * @method toggleExpand
         * @param {String} id The id of the node to be switched.
         */
        toggleExpand : function(id) {
            //TODO: make is a method on the model - isExpanded
            var expandedNodes = this._model.getExpanded();
            if(_.contains(expandedNodes, id)) {
                this._model.collapse(id);
            } else {
                if(this._model.hasChildren(id)){
                    this._model.expand(id);
                    if(!this._model.getTree().getNodeById(id).isLoaded()){
                        this.load(id);
                    }
                }
            }
        },
        /**
         * Takes the id and expands it regardless of if it is already expanded.
         *
         * @method expand
         * @param {String} id The id of the node to be expanded.
         */
        expand : function(id) {
            if(this._model.hasChildren(id)){
                this._model.expand(id);
                if(!this._model.getTree().getNodeById(id).isLoaded()){
                    this.load(id);
                }
            }
        },
        /**
         * Takes the id and collapses it regardless of if it is already collapsed.
         *
         * @method collapse
         * @param {String} id The id of the node to be collapsed.
         */
        collapse : function(id) {
            this._model.collapse(id);
        },
        /**
         * Takes an id and switches whether the node is selected or not.
         *
         * @method toggleSelect
         * @param {String} id The id of the node to change whether it is selected.
         */
        toggleSelect : function(id) {
            var selectedNodes = this._model.getSelected();
            if(_.contains(selectedNodes, id)) {
                this._model.deselect(id);
            } else {
                this._model.select(id);
            }
        },
        /**
         * Takes an id and makes it the only node selected.
         *
         * @method singleSelect
         * @param {String} id The id of the node to select.
         */
        singleSelect : function(id) {
            this.clearSelection();
            this._model.select(id);
        },
        /**
         * Takes an id and will change its selected status. Will keep currently
         * selected nodes intact.
         *
         * @method addSelect
         * @param {String} id The id of the nod eot change.
         */
        addSelect : function(id) {
            var selectedNodes = this._model.getSelected();
            if(_.contains(selectedNodes, id)) {
                this._model.deselect(id);
            } else {
                this._model.select(id);
            }
        },
        /**
         * Takes an array of ids and selects each one.
         *
         * @method selectGroup
         * @param {Array} group The array of ids to be selected.
         */
        selectGroup : function(group) {
            var that = this;

            _.each(group, function(id) {
                that._model.select(id);
            });
        },
        /**
         * Takes an id and marks it as active.
         *
         * @method active
         * @param {String} id The id of the node to mark as active.
         */
        active : function(id) {
            this._model.active(id);
        },
        /**
         * Takes an id and marks it as inactive.
         *
         * @method deactive
         * @param {String id the Id of the node to mark as inactive.
         */
        deactive : function(id) {
            this._model.deactive(id);
        },
        /**
         * Marks the previous node (the node visually above the current active node) as active.
         *
         * If the node has a previous sibling it will mark the deepest descendent of that node as active otherwise it will
         * mark its parent as active.
         *
         * @method activePrevious
         */
        activePrevious : function() {
            var model = this._model, tree = model.getTree(),
                activeNode = tree.getNodeById(this._model._activeNode),
                parentNode, children, sibling;

            function findPrevSibling(node) {
                var prevSibling;
                parentNode = tree.getNodeById(node.parentId);
                children = parentNode.children;

                prevSibling = children[_.indexOf(children, node) - 1] || null;

                return prevSibling;
            }

            function findDeepestVisibleDescendent(node) {
                var descendent = node;

                while(model.isExpanded(descendent.id) && model.hasChildren(descendent.id)){
                    descendent = descendent.children[descendent.children.length - 1];
                }

                return descendent;
            }

            sibling = findPrevSibling(activeNode);

            if(!this.filtered){
                if(_.isNull(activeNode.parentId) && _.isNull(sibling)) {
                    this.active(findDeepestVisibleDescendent(tree).id);
                } else if(!_.isNull(activeNode.parentId) && _.isNull(sibling)){
                    this.active(activeNode.parentId);
                } else {
                    this.active(findDeepestVisibleDescendent(sibling).id);
                }
            } else {
                var index = _.indexOf(this.filterResults, _.find(this.filterResults, function(node){
                    return node.id === activeNode.id;
                }));
                index = index - 1 < 0 ? this.filterResults.length - 1 : index - 1;
                this.active(this.filterResults[index].id);
            }

        },
        /**
         * Marks the next node (the node visually below the current active node) as active.
         *
         * If the active node has a sibling after it then mark that. Otherwise go to the parent's next sibling.
         *
         * @method activeNext
         */
        activeNext : function() {
            var model = this._model, tree = model.getTree(),
                that = this,
                activeNode = tree.getNodeById(this._model._activeNode);

            function findNextSibling(node) {
                var nextSibling, parentNode, children;
                parentNode = tree.getNodeById(node.parentId);
                children = parentNode.children;

                nextSibling = children[_.indexOf(children, node) + 1] || null;

                return nextSibling;
            }

            function recurseActive(node) {
                var sibling = findNextSibling(node);

                if(!_.isNull(sibling)){
                    that.active(sibling.id);
                } else if(_.isNull(node.parentId && _.isNull(sibling))){
                    that.active(tree.children[0].id);
                } else {
                    recurseActive(tree.getNodeById(node.parentId));
                }
            }


            if(!this.filtered){
                if(model.isExpanded(activeNode.id) && model.hasChildren(activeNode.id)){
                    this.active(activeNode.children[0].id);
                } else {
                    recurseActive(activeNode);
                }
            }else{
                var index = _.indexOf(this.filterResults, _.find(this.filterResults, function(node){
                    return node.id === activeNode.id;
                }));
                index = (index + 1) % this.filterResults.length;
                this.active(this.filterResults[index].id);
            }

        },
        /**
         * Loads a node if it is lazily loaded.
         *
         * @method load
         * @param {String} id The id of the node to load it's children of.
         */
        load : function(id) {
            var that = this,
                node = this._model.getTree().getNodeById(id) || this._model.getTree();

            if(!node.isLoaded() && this.lazyLoad) {
                var loadFn = this._storeFns.load;
                $.when(loadFn.call(this, node.id, node.data)).done(function (data) {
                    that._model.addSubTree(data);
                    node.loaded = true;
                    that._model.trigger('node-loaded', node);
                }).fail(function() {
                    node.loaded = true;
                    that._model.trigger('node-loaded', node);
                });
            }
        },
        /**
         * Returns the nodes of the tree that are currently selected.
         *
         * @method getSelected
         * @return {Array} nodes The array of Trees that are currently selected.
         */
        getSelected : function() {
            var that = this, nodes = [];

            _.each(this._model.getSelected(), function(id) {
                nodes.push(that._model.getNodeByPath(id));
            });

            return nodes;
        },
        /**
         * Mark all nodes as unselected.
         *
         * @method clearSelection
         */
        clearSelection : function() {
            this._model.clearSelection();
        },
        /**
         * Collapse all nodes by emptying out the list.
         *
         * @method clearExpansion
         */
        clearExpansion : function() {
            this._model.clearExpansion();
        },
        /**
         * Set the selection to a group of nodes.
         *
         * @method setSelection
         * @param {Array} nodes
         */
        setSelection : function(nodes) {
            this._model.setSelection(nodes);
        },
        /**
         * Given an array of nodes it will expand all the ancestor nodes to make them visible.
         *
         * @method expandPathTo
         * @param {Array} nodes The nodes to expand to.
         */
        expandPathTo : function(nodes) {
            this._model.expandPathTo(nodes);
        },
        /**
         * Takes a query and filters the data based on the fields given.
         * Currently only supports filtering already loaded data.
         *
         * @method filter
         * @param {String} query The string to match against.
         * @param {Array} fields The fields to check.
         */
        filter : function(query, fields) {
            //TODO: get filter to work with a server request instead of only loaded
            var curNode, regex = new RegExp(query, 'g');

            function createFilteredArray(list) {

                return _.flatten(_.filter(list, function(node) {
                    curNode = node[0];
                    return _.some(fields, function(field) {
                        if(!_.isNull(curNode.id) && !_.isNull(curNode[field])){
                            return curNode[field].match(regex);
                        } else {
                            return false;
                        }
                    });
                }));
            }

            if(_.isNull(query)){
                this._model.trigger('filter', null);
                this.filtered = false;
            }else{
                this.filterResults = createFilteredArray(this._model._treeHash);
                this.filtered = true;
                this._model.trigger('filter', this.filterResults);
            }
        },
        /**
         * Takes data and adds it to the proper location in the tree.
         *
         * @method add
         * @param {Array} data The nodes to be added.
         */
        add : function(data) {
            var that = this;
            function removeChildren(node) {
                that._model.removeSubTree(node.id);
                _.each(node.children, function(child) {
                    removeChildren(child);
                });
            }

            _.each(data, function(node) {
                removeChildren(node);
            });
            this._model.addSubTree(data);
        },
        /**
         * Removes the subtree from the model.
         *
         * @method remove
         * @param {String} id The id of the subtree to remove.
         */
        remove : function(id) {
            this._model.removeSubTree(id);
        },
        /**
         * Changes whether a node may be selected or not.
         *
         * @method toggleSelectable
         * @param {Array} nodes The nodes to be changed.
         */
        toggleSelectable : function(nodes) {
            var that = this;
            _.each(nodes, function(node) {
                if(that._model.isSelectable(node.id)){
                    that._model.unselectable(node.id);
                }else{
                    that._model.selectable(node.id);
                }
            });
        }
    });

    return TreeController;

});

define('oui.tree/view',['oui.underscore'], function(_) {
    

    /**
     * Super class view that will subscribe to a subscribable object.
     * Not made to be instantiated by itself.
     *
     * @class View
     * @constructor
     */
    function View () {
        //Set up events

        _.each(this.getEventMap(), function(e) {
            e.subscriber.on(e.eventName, e.fn, e.context);
        });

        return this;
    }

    _.extend(View.prototype, {
        constructor : View,
        /**
         * Abstract method that needs to implemented by a subclass.
         *
         * @method getEventMap
         */
        getEventMap : function () {
            throw new Error('Abstract method');
        }
    });

    return View;

});

/**
 * @license RequireJS text 2.0.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint */
/*global require: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, window: false, process: false, Packages: false,
  java: false, location: false */

define('text',['module'], function (module) {
    

    var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = [],
        masterConfig = module.config(),
        text, fs;

    text = {
        version: '2.0.0',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r");
        },

        createXhr: function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i++) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var strip = false, index = name.indexOf("."),
                modName = name.substring(0, index),
                ext = name.substring(index + 1, name.length);

            index = ext.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = ext.substring(index + 1, ext.length);
                strip = strip === "strip";
                ext = ext.substring(0, index);
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var match = text.xdRegExp.exec(url),
                uProtocol, uHostName, uPort;
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName === hostname) &&
                   ((!uPort && !uHostName) || uPort === port);
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName + '.' + parsed.ext,
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                nonStripName = parsed.moduleName + '.' + parsed.ext,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + '.' +
                                     parsed.ext) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (typeof process !== "undefined" &&
             process.versions &&
             !!process.versions.node) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback) {
            var file = fs.readFileSync(url, 'utf8');
            //Remove BOM (Byte Mark Order) from utf8 files if it is there.
            if (file.indexOf('\uFEFF') === 0) {
                file = file.substring(1);
            }
            callback(file);
        };
    } else if (text.createXhr()) {
        text.get = function (url, callback, errback) {
            var xhr = text.createXhr();
            xhr.open('GET', url, true);

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        errback(err);
                    } else {
                        callback(xhr.responseText);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (typeof Packages !== 'undefined') {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                stringBuffer, line,
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                stringBuffer.append(line);

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    }

    return text;
});

define('text!oui.tree/treeTemplate.htm',[],function () { return '<div class="tree" tabindex=0>\n    <ul class="root"></ul>\n</div>\n';});

define('text!oui.tree/treeNodeTemplates.template',[],function () { return '<div class="node-template">\n    <li data-id="<%=id%>" class="<%=group%>">\n        <div style="margin-left: -<%=margin%>px; padding-left: <%=margin%>px;" class="item <%=selected%> <%=selectable%> <%=active%>">\n            <div class="picker-icon <%=collapsed%> <%=hidden%>"></div>\n            <%=text%>\n        </div>\n        <ul class="children <%=show%>">\n            <%=children%>\n        </ul>\n    </li>\n</div>\n<div class="node-icon-template">\n    <li data-id="<%=id%>" class="<%=group%>">\n        <div style="margin-left: -<%=margin%>px; padding-left: <%=margin%>px;" class="item <%=selected%> <%=selectable%> <%=active%>">\n            <div class="picker-icon <%=collapsed%> <%=hidden%>"></div>\n            <div class="icon" style="background:url(<%=icon%>)"></div>\n            <%=text%>\n        </div>\n        <ul class="children <%=show%>">\n            <%=children%>\n        </ul>\n    </li>\n</div>\n<div class="flat-node-template">\n    <li data-id="<%=id%>">\n        <div class="item <%=selected%> <%=selectable%> <%=active%> flat-item"><%=text%></div>\n    </li>\n</div>\n<div class="flat-node-icon-template">\n    <li data-id="<%=id%>">\n        <div class="tree-icon-container">\n            <div class="icon" style="background:url(<%=icon%>)"></div>\n        </div>\n        <div class="item <%=selected%> <%=selectable%> <%=active%> flat-item"><%=text%></div>\n    </li>\n</div>\n';});

define('oui.tree/treeView',['oui.underscore', 'oui.jquery', 'oui.tree/view', 'oui.utils/template',
        'text!oui.tree/treeTemplate.htm', 'text!oui.tree/treeNodeTemplates.template'],
        function(_, $, View, creatorFn, treeTemplate, nodeMarkup) {
    

    //TODO: move this to a utils folder and allow for markup to be passed in as well.
    function templater(clazz) {
        return creatorFn(_.unescape($(nodeMarkup).filter(clazz).html()));
    }

    /**
     * Template for each of the different node styles.
     *
     * @property nodeTemplate
     * @static
     * @type {String}
     */
    /**
     * Template for each of the different node styles.
     *
     * @property nodeIconTemplate
     * @static
     * @type {String}
     */
    /**
     * Template for each of the different node styles.
     *
     * @property flatTemplate
     * @static
     * @type {String}
     */
    /**
     * Template for each of the different node styles.
     *
     * @property flatIconTemplate
     * @static
     * @type {String}
     */
    var nodeTemplate = templater('.node-template'), nodeIconTemplate = templater('.node-icon-template'),
        flatTemplate = templater('.flat-node-template'), flatIconTemplate = templater('.flat-node-icon-template');

    /**
     * The view that constructs the element and binds all the events for the TreePanel.
     *
     * @class TreeView
     * @extends View
     * @since 1.2.0
     * @constructor
     * @param {TreeModel} model The data for the tree panel.
     * @param {TreeController} controller The object to accept all UI calls.
     * @param {Object} viewFns Object that contains all the functions that can be overrideable.
     * @param {Object} icons Object that holds whether the icons should be displayed and the path to the icons.
     * @param {Boolean} displayRoot Whether or not the root node should be displayed.
     * @param {Boolean} flatList Whether the tree should be displayed as a flat list or a tree.
     * @param {Boolean} multiSelect Whether the tree supports multiple selections.
     */
    function TreeView (model, controller, viewFns, icons, displayRoot, flatList, multiSelect) {
        var that = this;

        /**
         * The HTML element that gets created and returned to be appended to the page.
         *
         * It is a JQuery object.
         *
         * @property _$el
         * @type {Object}
         * @private
         */
        Object.defineProperty(this, "_$el", {
            writable : false,
            enumerable : false,
            value : $(treeTemplate)
        });

        /**
         * The model that gets used for getting updated data to display on the UI.
         *
         * @property _model
         * @type {TreeModel}
         * @private
         */
        Object.defineProperty(this, "_model", {
            writable : false,
            enumerable : false,
            value : model
        });

        View.call(this);

        //TODO: move these to a function for binding events?
        this._$el.on('click', '.picker-icon', function(e) {
            e.preventDefault();
            var id = $(this).parents('li').data('id').toString();

            controller.toggleExpand(id);
        });

        this._$el.on('keydown', function(event) {
                var activeElement;
                switch(event.keyCode) {
                    case 38: //Up
                        event.preventDefault();
                        controller.activePrevious();
                        activeElement = that._$el.find('.active');
                        var parentElem = activeElement.parent(),
                            scroll = that._$el.parent();

                        activeElement = that._$el.find('.active');
                        //Scroll parent container if it has one
                        if(activeElement.position().top < 0) {

                            scroll.scrollTop(scroll.scrollTop() -
                                (activeElement.outerHeight() +
                                 (parentElem.outerHeight() - parentElem.height())));

                        }else if(activeElement.position().top > scroll.height()){
                            scroll.scrollTop(activeElement.position().top);
                        }
                        break;
                    case 40: //Down
                        event.preventDefault();

                        controller.activeNext();
                        activeElement = that._$el.find('.active');

                        //Scroll parent container if it has one
                        if((activeElement.position().top + activeElement.outerHeight() +
                                (activeElement.parent().outerHeight() - activeElement.parent().height())) > (that._$el.parent().height())){
                            that._$el.parent().scrollTop(
                                that._$el.parent().scrollTop() +
                                activeElement.outerHeight() +
                                (activeElement.parent().outerHeight() - activeElement.parent().height()));
                        }else if(activeElement.position().top < 0) {
                            that._$el.parent().scrollTop(0);
                        }
                        break;
                    case 37: //Left
                        controller.collapse(that._$el.find('.active').parents('li').data('id').toString());
                        break;
                    case 39: //Right
                        controller.expand(that._$el.find('.active').parents('li').data('id').toString());
                        break;
                    case 9: //Tab
                        console.log('Tab pressed');
                        break;
                    case 32: //Space
                        var element = that._$el.find('.active'),
                            id = element.parents('li').data('id').toString(), group = [];

                        //TODO: do not need to have conditional in the view
                        if(!element.hasClass('unselectable')){
                            if(event.ctrlKey && multiSelect) {
                                controller.addSelect(id);
                            } else if (event.shiftKey && multiSelect) {
                                var prevSelected = that._$el.find('.selected').parent('li'), clicked = element.parent('li');
                                group.push(id);

                                if(clicked.prevAll(prevSelected).length !== 0){
                                    group.push(prevSelected.data('id').toString());
                                    _.each(prevSelected.nextUntil(clicked), function(elem) {
                                        group.push($(elem).data('id').toString());
                                    });
                                    controller.selectGroup(group);
                                }else if(clicked.nextAll(prevSelected).length !== 0){
                                    group.push(prevSelected.data('id').toString());
                                    _.each(prevSelected.prevUntil(clicked), function(elem) {
                                        group.push($(elem).data('id').toString());
                                    });
                                    controller.selectGroup(group);
                                } else {
                                    controller.singleSelect(id);
                                }

                            } else {
                                controller.singleSelect(id);
                            }
                        }
                        break;
                    default :
                        event.preventDefault();
                }
        });

        this._$el.find('ul.root').on('click', '.item:not(".unselectable")', function(event) {
            event.preventDefault();
            var id = $(this).parent('li').data('id').toString(), group = [];

            if(!$(event.srcElement).hasClass('picker-icon')){
                controller.active(id);

                if(event.ctrlKey && multiSelect) {
                    controller.addSelect(id);
                } else if (event.shiftKey && multiSelect) {
                    var prevSelected = that._$el.find('.selected').parent('li'), clicked = $(this).parent('li');
                    group.push(id);

                    if(clicked.prevAll(prevSelected).length !== 0){
                        group.push(prevSelected.data('id').toString());
                        _.each(prevSelected.nextUntil(clicked), function(elem) {
                            group.push($(elem).data('id').toString());
                        });
                        controller.selectGroup(group);
                    }else if(clicked.nextAll(prevSelected).length !== 0){
                        group.push(prevSelected.data('id').toString());
                        _.each(prevSelected.prevUntil(clicked), function(elem) {
                            group.push($(elem).data('id').toString());
                        });
                        controller.selectGroup(group);
                    } else {
                        controller.singleSelect(id);
                    }

                } else {
                    controller.singleSelect(id);
                }
            }
        });

        /**
         * @property displayRoot
         * @type {Boolean}
         */
        this.displayRoot = displayRoot;
        /**
         * @property flatList
         * @type {Boolean}
         */
        this.flatList = flatList;
        /**
         * @property icons
         * @type {Object}
         */
        this.icons = icons;

        _.extend(this, viewFns);

        return this;
    }

    TreeView.prototype = Object.create(View.prototype);

    _.extend(TreeView.prototype, {
        constructor : TreeView,
        /**
         * Concrete function that returns the array of all the events that the view wants to listen for.
         *
         * @method getEventMap
         * @return {Array} - The array of objects for each event.
         */
        getEventMap : function() {
            return [
                { eventName : 'view.load',         subscriber : this._model, fn : this.render,      context : this },
                { eventName : 'view.collapse',     subscriber : this._model, fn : this.collapse,    context : this },
                { eventName : 'view.node-removed', subscriber : this._model, fn : this.render,      context : this },
                { eventName : 'view.node-added',   subscriber : this._model, fn : this.nodeLoaded,  context : this },
                { eventName : 'view.expand',       subscriber : this._model, fn : this.expand,      context : this },
                { eventName : 'view.selectable',   subscriber : this._model, fn : this.selectable,  context : this },
                { eventName : 'view.select',       subscriber : this._model, fn : this.select,      context : this },
                { eventName : 'view.deselect',     subscriber : this._model, fn : this.deselect,    context : this },
                { eventName : 'view.active',       subscriber : this._model, fn : this.active,      context : this },
                { eventName : 'view.node-loaded',  subscriber : this._model, fn : this.nodeLoaded,  context : this },
                { eventName : 'view.filter',       subscriber : this._model, fn : this.filter,      context : this }
            ];
        },
        /**
         * Method called after the collapse event has fired.
         *
         * Hides the children and changes the icon of to the collapsed icon.
         *
         * @method collapse
         * @param {String} id The id of the node to collapse
         */
        collapse : function(id) {
            var $li = this._$el.find('[data-id=' + id + ']');
            $li.children('.item').children('.picker-icon').addClass('collapsed');
            $li.children('.children').addClass('hide');
            $li.children('.children').removeClass('show');
        },
        /**
         * Method called after the expand event has fired.
         *
         * Changes the icon to the expanded icon as well as creates the children for the node
         * if they have not been already created and then shows them.
         * If there are no children remove the collapse/expand icon.
         *
         * @method expand
         * @param {String} id The id of the node to expand
         */
        expand : function(id) {
            var $li = this._$el.find('[data-id=' + id + ']'),
                markup,
                $children = $li.children('.children'),
                model = this._model;

            $li.children('.item').children('.picker-icon').removeClass('collapsed');

            //TODO: maybe pass the full node through?
            //Add each of its children and display them
            if( model.hasChildren(id) ) {
                if($children.children().length === 0) {
                    markup = this.createTree(model, model.getNodeByPath(id), false);
                    $children.append(markup);
                }
                $children.removeClass('hide');
                $li.children('.children').addClass('show');
            } else {
                $li.find('.picker-icon').css('visibility', 'none');
            }
        },
        /**
         * Called after the selectable event fires.
         *
         * Marks the nodes passed in as unselectable.
         *
         * @method selectable
         * @param {Array} ids The unselectable ids to be marked as unselectable.
         */
        selectable : function(ids) {
            var that = this;
            this._$el.find('.unselectable').removeClass('unselectable');
            _.each(ids, function(id) {
                that._$el.find('[data-id=' + id + ']').find('.item').addClass('unselectable');
            });
        },
        /**
         * Called after the select event fires.
         *
         * Marks each element as selected.
         *
         * @method select
         * @param {Array} selectedIds The ids of the nodes that are selected.
         */
        select : function(selectedIds) {
            var that = this;

            this._$el.find('.selected').removeClass('selected');

            _.each(selectedIds, function(id) {
                that._$el.find('[data-id=' + id + ']').children('.item').addClass('selected');
            });
        },
        /**
         * Called after the deselect event fires.
         *
         * Marks the element as unselected.
         *
         * @method deselect
         * @param {String} id The id of the element to deselect.
         */
        deselect : function(id) {
            this._$el.find('[data-id=' + id + ']').children('.item').removeClass('selected');
        },
        /**
         * Called after the active event fires.
         *
         * Marks the node as active. (The node from where all keyboard interaction takes place)
         * There can only ever be on active element.
         *
         * @method active
         * @param {String} id The id of the element to mark as active.
         */
        active : function(id) {
            this._$el.find('.active').removeClass('active');
            this._$el.find('[data-id=' + id + ']').children('.item').addClass('active');
        },
        /**
         * Called after the node-loaded event fires.
         *
         * Creates the tree representing this subtree and appends it to the parent element.
         *
         * @method nodeLoaded
         * @param {Tree} node The node that was loaded.
         */
        nodeLoaded : function(node) {
            var model = this._model, $li;

            //TODO: take a look at this conditional? - node-added now goes to loaded to not render the entire model
            //given the node that was added still not sure whether the parent was actually rendered
            if(_.isNull(node.id) ||
               _.isNull(model.getNodeByPath(node.parentId)) ||
               _.isNull(node.parentId)) {
                //Loaded the root node
                this.render(model);
            }else{
                $li = this._$el.find('[data-id=' + node.id + ']');
                $li.children('.children').empty();

                $li.children('.children').append(this.createTree(model, node, false));

                if(!model.hasChildren(node.id)){
                    $li.children('.item').children('.picker-icon').css('visibility', 'hidden');
                }
            }
        },
        /**
         * Called after the filter event fires.
         *
         * Renders the results as a flat list.
         *
         * @method filter
         * @param {Array} results The nodes that match the query.
         */
        filter : function(results) {
            var model = this._model;

            if(_.isNull(results)){
                this.render(model);
            }else{
                this.renderFlat(model, results);
            }
        },
        /**
         * Creates the markup that represent the tree (current node) in the current
         * state (expanded/collapsed/selected/active).
         *
         * Recursive if the node is expanded - to render all of its children.
         *
         * @method createTree
         * @param {TreeModel} model The model to get the status of the node from.
         * @param {Tree} node The node to get the data from.
         * @param {Boolean} selfVisible Whether or not the node itself is visible.
         * @return {String} markup The HTML markup representing the tree.
         */
        createTree : function(model, node, selfVisible) {
            var markup = '', children = '', id = node.id, that = this;

            if(model.isExpanded(id) || _.isNull(id)){
                _.each(node.children, function(child) {
                    children += that.createTree(model, child, true);
                });
            }

            if(selfVisible) {
                if(that.icons.display && that.icons.paths[node.data.type] !== undefined){
                    markup = nodeIconTemplate({
                        id : id,
                        text : that.display(node),
                        children : children,
                        collapsed : !model.isExpanded(id) ? 'collapsed' : '',
                        show : !model.isExpanded(id) ? 'hide' : 'show',
                        selectable : model.isSelectable(id) ? '' : 'unselectable',
                        selected : model.isSelected(id) ? 'selected' : '',
                        hidden : model.hasChildren(id) ? '' : 'hidden',
                        icon : that.icons.paths[node.data.type],
                        active : model._activeNode === id ? 'active' : '',
                        margin : 15 * (node.level - 1),
                        group : node.data.group ? 'group' : ''
                    });
                } else {
                    markup = nodeTemplate({
                        id : id,
                        text : that.display(node),
                        children : children,
                        collapsed : !model.isExpanded(id) ? 'collapsed' : '',
                        show : !model.isExpanded(id) ? 'hide' : 'show',
                        selected : model.isSelected(id) ? 'selected' : '',
                        selectable : model.isSelectable(id) ? '' : 'unselectable',
                        hidden : model.hasChildren(id) ? '' : 'hidden',
                        active : model._activeNode === id ? 'active' : '',
                        margin : 15 * (node.level - 1),
                        group : node.data.group ? 'group' : ''
                    });
                }
            } else {
                markup = children;
            }

            return markup;
        },
        /**
         * Creates a flat list of the nodes requested.
         *
         * @method createList
         * @param {TreeModel} model The model to get the status of a node.
         * @param {Array} nodes The list of nodes to be rendered.
         * @return {String} markup The HTML markup representing the nodes.
         */
        createList : function(model, nodes) {
            var markup = '', id, that = this;

            _.each(nodes, function(node) {
                id = node.id;
                if(that.icons.display && that.icons.paths[node.data.type] !== undefined){
                    markup += flatIconTemplate({
                        id : id,
                        text : that.display(node),
                        selected : model.isSelected(id) ? 'selected' : '',
                        selectable : model.isSelectable(id) ? '' : 'unselectable',
                        icon : that.icons.paths[node.data.type],
                        active : model._activeNode === id ? 'active' : ''
                    });
                } else {
                    markup += flatTemplate({
                        id : id,
                        text : that.display(node),
                        selected : model.isSelected(id) ? 'selected' : '',
                        selectable : model.isSelectable(id) ? '' : 'unselectable',
                        active : model._activeNode === id ? 'active' : ''
                    });
                }
            });

            return markup;
        },
        /**
         * Emptys the root node and renders the tree as in its current state.
         *
         * @method render
         * @param {TreeModel} model The tree model to get the root from and pass
         *  to the appropriate markup creation method.
         */
        render : function(model) {
            var $node = this._$el.find('ul.root');

            $node.empty();

            if(this.flatList) {
                $node.append(this.createList(model, model.getTree().children));
            } else {
                $node.append(this.createTree(model, model.getTree(), this.displayRoot));
            }
        },
        /**
         * Emptys the root node and renders the nodes given as a flat list.
         *
         * @method renderFlat
         * @param {TreeModel} model The model to get the status of the nodes.
         * @param {Array} nodes The nodes to render in a list.
         */
        renderFlat : function(model, nodes) {
            var $node = this._$el.find('ul.root');

            $node.empty();

            $node.append(this.createList(model, nodes));
        },
        /**
         * Get the element to append to the DOM that represents the tree.
         *
         * @method getElement
         * @return {Object} _$el The JQuery object.
         */
        getElement : function() {
            return this._$el;
        },
        /**
         * Hides the tree view.
         *
         * @method hide
         */
        hide : function() {
            this._$el.hide();
        },
        /**
         * Shows the tree view.
         *
         * @method show
         */
        show : function() {
            this._$el.show();
        }
    });

    return TreeView;

});

define('oui.tree/treePanel',['oui.underscore', 'oui.tree/treeModel', 'oui.tree/treeController', 'oui.tree/treeView', 'oui.utils/subscribable'],
    function(_, TreeModel, TreeController, TreeView, Subscribable) {
        

        var defaults = {
            lazyLoad : false,
            multiSelect : false,
            icons : {
                display : false,
                paths : {}
            },
            viewFns : {
                display : function() {
                    throw new Error('No display method specified');
                }
            },
            storeFns : {
                load : function() {
                    throw new Error('No load method specified');
                }
            },
            displayRoot : false,
            flat : false,
            defaultFilterFields : [ 'id', 'parentId' ]
        };

        /**
         * The panel element that creates the model, view and controller and delegates calls to them.
         *
         * @example
         *
         *      var treePanel = new TreePanel({
         *          storeFns : {
         *              load : function(id) {
         *                  if(id === null) {
         *                      return $.ajax({
         *                          url: 'mocks/topLevel.json',
         *                          type: 'GET'
         *                      });
         *                  }else{
         *                      return $.ajax({
         *                          url: 'mocks/personel' + id + '.json',
         *                          type: 'GET'
         *                      });
         *                  }
         *              },
         *              filter : function(query) {
         *                  console.log(query);
         *              }
         *          },
         *          viewFns : {
         *              display : function(node) {
         *                  return node.id === null ? 'Root' : node.data.id + ': ' + node.data.code + ' - ' + node.data.name;
         *              }
         *          }
         *          displayRoot : false,
         *          lazyLoad : false,
         *          flat : false,
         *          icons : {
         *              display : true,
         *              paths : {
         *                  'person' : '../img/resource-labor.png',
         *                  'manager' : '../img/yellow_smile.gif'
         *              }
         *          },
         *          multiSelect : true
         *      }, initData);
         *
         * @class TreePanel
         * @since 1.2.0
         * @extends Subscribable
         * @constructor
         * @param {Object} options The options to override the defaults.
         * @param {Array} initData The initial data if it has already been loaded somewhere.
         */
        function TreePanel(options, initData) {
            var that = this, model, view, controller;

            Subscribable.call(this);

            initData = initData || null;

            _.defaults(options.viewFns || {}, defaults.viewFns);
            _.defaults(options.storeFns || {}, defaults.storeFns);
            _.extend(this, options);

            model = new TreeModel(this.multiSelect, initData, this.lazyLoad);
            controller = new TreeController(model, this.storeFns, this.lazyLoad);
            view = new TreeView(model, controller, this.viewFns, this.icons, this.displayRoot, this.flat, this.multiSelect);
            model.trigger('load', model);

            /**
             * The view element that the panel keeps a reference to.
             *
             * @property _view
             * @private
             * @type {TreeView}
             */
            Object.defineProperty(this, '_view', {
                enumerable : false,
                writable : false,
                value : view
            });

            /**
             * The controller object that the panel keeps a reference to.
             *
             * @property _controller
             * @private
             * @type {TreeController}
             */
            Object.defineProperty(this, '_controller', {
                enumerable : false,
                writable : false,
                value : controller
            });

            model.on('select', function(data) {
                /**
                 * Fowards the selection event when received.
                 *
                 * @event select
                 * @param {Array} data The selected nodes.
                 */
                that.trigger('select', data);
            });

        }

        TreePanel.prototype = Object.create(Subscribable.prototype);

        _.extend(TreePanel.prototype, defaults, {
            constructor : TreePanel,
            /**
             * Gets the views element to be placed on the DOM.
             *
             * @method getElement
             * @return {Object} - JQuery object
             */
            getElement : function() {
                return this._view.getElement();
            },
            /**
             * Calls initial load on the controller.
             *
             * @method init
             */
            init : function() {
                //Used for first render after append
                this._controller.load(null);
            },
            /**
             * Gets the selected elements of the tree.
             *
             * @method getSelected
             * @return {Array} - The array of Trees that are currently selected.
             */
            getSelected : function() {
                //To be used when the picker hits submit
                return this._controller.getSelected();
            },
            /**
             * Hides the view and clears the expansion and selections.
             *
             * @method hide
             */
            hide : function() {
                this._view.hide();
                this._controller.clearSelection();
                this._controller.clearExpansion();
            },
            /**
             * Shows the view and selects the nodes given as well as expands to them.
             *
             * @method show
             */
            show : function(selectedNodes) {
                this._view.show();
                this._controller.setSelection(selectedNodes);
                if(!_.isEmpty(selectedNodes)) {
                    this._controller.expandPathTo(selectedNodes);
                }
            },
            /**
             * Filters the treePanel given the query and the array of fields.
             *
             * @method filter
             * @param {String} query The string to match to the fields of the nodes
             * @param {Array} fields The array of strings that match the fields to match on.
             */
            filter : function(query, fields) {
                var filterFields = fields || this.defaultFilterFields;

                if(_.isUndefined(query)) {
                    this._controller.filter(null, filterFields);
                }else{
                    this._controller.filter(query, filterFields);
                }
            },
            /**
             * Adds nodes to the tree panel.
             *
             * @method addData
             * @param {Tree} node The node to add to the tree panel.
             */
            addData : function(node) {
                this._controller.add(node);
            },
            /**
             * Removes elements from the tree panel.
             *
             * @method removeElement
             * @param {String} id The id of the node to remove.
             */
            removeElement : function(id) {
                this._controller.remove(id);
            },
            /**
             * Toggles the selectable status of the nodes given.
             *
             * @method toggleSelectable
             * @param {Array} nodes The nodes to toggle.
             */
            toggleSelectable : function(nodes) {
                this._controller.toggleSelectable(nodes);
            },
            /**
             * Clear the selection on the tree panel.
             *
             * @method clearSelection
             */
            clearSelection : function() {
                this._controller.clearSelection();
            }
        });

        return TreePanel;
    }
);

define('oui.combo/comboBoxView',['oui.jquery', 'oui.underscore', 'oui.bootstrap', 'oui.utils/template'],
    function ($, _, bs, creatorFn) {
        

        var comboBox = '<div class="combo-box" style="display:inline-block;"></div>';
        var button = '<a class="combo-button btn btn-blue-light"><span class="caret"></span></a>';
        var valueList = '<ul class="combo-list hidden"></ul>';
        var listItemTemplate = creatorFn('<li class="combo-item" data-key="<%=key%>" data-value="<%=value%>"><%=display%></li>');

        /**
         * The model used for the tree panel.
         *
         * @class ComboBoxView
         * @since 1.2.0
         * @constructor
         * @param {Object} widget The ComboBox widget that the view is based upon.  Contains options, data values,
         * dataFormat, defaultValue, and width
         */
        var ComboBoxView = function (widget) {
            /**
             * The widget associated with the ComboBoxView
             *
             * @property widget
             * @type {*}
             */
            this.widget = widget;
            /**
             * List of values that populate the combo box
             *
             * @property values
             * @type {Array}
             */
            this.values = this.widget.options.values;
            /**
             * The object that defines the format of the data for the ComboBox
             *
             * @property dataFormat
             */
            this.dataFormat = this.widget.options.dataFormat;
            /**
             * The default value selected in the ComboBox
             *
             * @property defaultValue
             */
            this.defaultValue = findValueByKey(this.widget.options.defaultValue, this.values, this.dataFormat);

            this._init();
        };

        $.extend(ComboBoxView.prototype = {
            /**
             * This is the initialization function that gets called from the constructor
             *
             * @private
             * @method _init
             */
            _init : function () {
                this.$textField = this.widget.element;

                this.$comboBox = $(comboBox);
                this.$textField.wrap(this.$comboBox);

                this.$toggleButton = $(button);
                //add the tooltip if one is supplied
                if(_.isString(this.widget.options.titleText)){
                    this.$toggleButton.attr('title', this.widget.options.titleText);
                }

                this.$textField.after(this.$toggleButton);

                //append the hidden list to the combo box div
                this.$valueList = $(valueList);
                this.$toggleButton.after(this.$valueList);
                this.$toggleButton.height(this.$textField.height() + 1); //need to calc this better
                //this.$valueList = this.$textField.find('ul.combo-list');

                this.$textField.css('margin-bottom', '0px');
                //this.$toggleButton.css('margin-bottom', '0px');

                //position toggle button on top of input field
                this.$toggleButton.position({
                    my : 'right top',
                    at : 'right top',
                    of : this.$textField
                });

                this._initListeners();

                //set default value
                if (this.defaultValue) {
                    //if there is a default value specified, set it here
                    this.setValue(this.defaultValue, true);
                }
                else {
                    //if no default value, just use the first value in the list
                    this.setValue(this.values[0], true);
                }
            },
            /**
             * The function that creates (but does not actually reveal) the contents of the ComboBox dropdown.
             *
             * @private
             * @method _createDropdown
             * @param {Array} values The array of objects that make up the contents of the ComboBox
             */
            _createDropdown : function (values) {
                var that = this;
                var $listItem = $();

                that.$valueList.empty();

                _.each(values, function (value) {
                    $listItem = $(listItemTemplate({
                        key : value[that.dataFormat.key],
                        value : value[that.dataFormat.value],
                        display : value[that.dataFormat.display]
                    }));


                    if ($listItem.attr('data-key') === that.selectedValue[that.dataFormat.key]) {
                        $listItem.addClass('combo-item-selected');
                    }

                    $listItem.width(that.$textField.width() + that.$toggleButton.width());

                    that.$valueList.append($listItem);
                });

                //if this is an autocomplete, give the first item focus
                if (that.autoCompleteActive) {
                    that.$valueList.children('li').first().addClass('combo-item-hovered');
                }

                //set click behavior for list items
                that.$valueList.children('li').on('mousedown', function (event) {
                    event.preventDefault();

                    var value = findValueByKey($(this).attr('data-key'), that.values, that.dataFormat);

                    that.setValue(value, false);
                    that._collapse();
                });

            },
            /**
             * The function that sets the selected value in the ComboBox
             *
             * @method setValue
             * @param {Object} value The object to be set as the selected value in the comboBox
             * @param {Boolean} quiet If true, valueSelected event will be fired on the widget.
             */
            setValue : function (value, quiet) {
                this.selectedValue = value;
                this.$textField.val(value[this.dataFormat.display]);

                //the quiet flag tells the function to not trigger the change event
                //used in setting the default value of the combo box without telling the widget
                //that it has changed values
                if (!quiet) {
                    this.$textField.trigger('valueSelected');
                }
            },
            /**
             * The function that sets the list of values that make up the contents of the ComboBox
             *
             * @method setValueList
             * @param {Array} values An array of objects in the format of {key: 'key', value : 'value', display : 'display'}
             */
            setValueList : function (values) {
                var that = this;
                var valid = false;

                _.each(values, function (value) {
                    if (!value[that.dataFormat.key].length) {
                        valid = false;
                        $.error('invalid data format for key in ' + value);
                        return false;
                    }

                    if (!value[that.dataFormat.value].length) {
                        valid = false;
                        $.error('invalid data format for value in ' + value);
                        return false;
                    }

                    if (!value[that.dataFormat.display].length) {
                        valid = false;
                        $.error('invalid data format for display in ' + value);
                        return false;
                    }
                    valid = true;
                });

                if (valid) {
                    //change values in view
                    this.values = values;
                    //chnage values stored on widget
                    this.widget.options.values = values;

                    //set new defaultValue
                    this.defaultValue = this.values[0];
                    this.widget.options.defaultValue = this.defaultValue;

                    //set the default value to the first item in the list
                    this.setValue(this.defaultValue, false);
                }
                else {
                    $.error('error in data format for new value set');
                }

                return valid;
            },
            /**
             * The function that sets the default value of the ComboBox
             *
             * @method setDefaultValue
             * @param {Object} newDefault The object to be set as the default value in the comboBox
             */
            setDefaultValue : function (newDefault) {
                var that = this;
                var valid = false;

                _.each(that.values, function (value) {
                    if (value[that.dataFormat.key] === newDefault) {
                        valid = true;
                    }
                });

                if (valid) {
                    this.defaultValue = findValueByKey(newDefault, this.values, this.dataFormat);

                    this.setValue(this.defaultValue, true);
                }
                else {
                    $.error('default value supplied does not match any value currently stored');
                }
            },
            /**
             * The function that sets the dataFormat of the ComboBox
             *
             * @method setDataFormat
             * @param {Object} newDataFormat The object detailing the data format of the ComboBox.
             * Default value is {key: 'key', value : 'value', display : 'display'}
             */
            setDataFormat : function (newDataFormat) {
                this.dataFormat = newDataFormat;
                this.widget.options.dataFormat = this.dataFormat;
            },
            /**
             * The function that handles the press of the enter key
             *
             * @private
             * @method _handleEnter
             */
            _handleEnter : function () {
                var that = this;

                if (!that.$valueList.is('.hidden')) {
                    //there is a highlighted list item
                    var $lis = that.$valueList.children();
                    var $li = $lis.filter('.combo-item-hovered');

                    if ($li.length) {
                        that.setValue(findValueByKey($li.attr('data-key'), that.values, that.dataFormat), false);
                        that._collapse();
                    }
                }
            },
            /**
             * The function that returns the currently selected value of the ComboBox
             *
             * @method getSelectedValue
             * @return returns the currently selected value of the ComboBox
             */
            getSelectedValue : function () {
                return this.selectedValue;
            },
            /**
             * The function that generates the list of autocomplete values based on typed text
             *
             * @private
             * @method _autoComplete
             * @param {String} text The text entered in the input field
             */
            _autoComplete : function (text) {
                var that = this,
                    autoCompleteValues = [];

                if (text !== '') {
                    _.each(that.values, function (value) {
                        //if the supplied text is equal to the beginning of the value
                        if (value[that.dataFormat.display].toLowerCase().indexOf(text.toLowerCase()) === 0) {
                            //only add the value if it's not already here
                            if (!_.contains(autoCompleteValues, value)) {
                                autoCompleteValues.push(value);
                            }
                        }
                    });

                    if (autoCompleteValues.length) {
                        that.autoCompleteActive = true;
                        that._createDropdown(autoCompleteValues);
                        that._expand();
                    }
                    else {
                        that._collapse();
                    }
                }
                else {
                    that.autoCompleteActive = false;
                    that._createDropdown(that.values);
                    that._expand();
                }

            },
            /**
             * The function that handles the keyup, keydown, mousedown, mousein, and mouseout events of the ComboBox
             *
             * @private
             * @method _initListeners
             */
            _initListeners : function () {
                var that = this;

                that.$toggleButton.on('mousedown', function (event) {
                    //don't lose focus from anything
                    event.preventDefault();

                    if (that.$valueList.is('.hidden')) {
                        that._createDropdown(that.values);
                        that._expand();
                    }
                    else {
                        that._collapse();
                    }

                    that.$textField.focus();
                });

                that.$textField.on('keydown', function (event) {
                    //keep the cursor from jumping around during keybd navigation
                    switch (event.keyCode) {
                        case $.ui.keyCode.UP :
                        case $.ui.keyCode.DOWN :
                            event.preventDefault();
                    }
                });

                that.$textField.on('keyup', function (event) {
                    switch (event.keyCode) {
                        case $.ui.keyCode.ESCAPE :
                            that._collapse();
                            break;
                        case $.ui.keyCode.ENTER :
                            //need more compound logic here
                            that._handleEnter();
                            break;
                        case $.ui.keyCode.UP :
                            event.preventDefault();
                            if (!that.$valueList.is('.hidden')) {
                                that._moveSelection(true);
                            }
                            else {
                                that._createDropdown(that.values);
                                that._expand();
                                that._selectItem(false);
                            }
                            break;
                        case $.ui.keyCode.DOWN :
                            event.preventDefault();
                            if (!that.$valueList.is('.hidden')) {
                                that._moveSelection(false);
                            }
                            else {
                                that._createDropdown(that.values);
                                that._expand();
                                that._selectItem(true);
                            }
                            break;
                        case 16: //shift
                        case 17: //ctrl
                        case $.ui.keyCode.LEFT :
                        case $.ui.keyCode.RIGHT :
                            return;
                        default:
                            that._autoComplete($(this).val());
                    }
                });


                //these event handlers allow for the proper blur behavior of the drop down
                that.$valueList.on('mouseover', function () {
                    that.widget.cancelBlur = true;
                });

                that.$valueList.on('mouseout', function () {
                    that.widget.cancelBlur = false;
                });

                that.$toggleButton.on('mouseover', function () {
                    that.widget.cancelBlur = true;
                });

                that.$toggleButton.on('mouseout', function () {
                    that.widget.cancelBlur = false;
                });
            },
            /**
             * Expands the ComboBox drop down
             *
             * @private
             * @method _expand
             */
            _expand : function () {
                var that = this;

                //add some IE back compatability bits
                if ($.browser.msie) {
                    window.document.expando = false;
                }

                that.$valueList.removeClass('hidden');
            },
            /**
             * Collapses the ComboBox drop down
             *
             * @private
             * @method _collapse
             */
            _collapse : function () {
                var that = this;

                //add some IE back compatability bits
                if ($.browser.msie) {
                    window.document.expando = true;
                }

                that.autoCompleteActive = false;

                that.$valueList.addClass('hidden');
            },
            /**
             * While using keyboard navigation, this function moves the selection either up or down
             *
             * @private
             * @method _moveSelection
             * @param {Boolean} up If true, the selection moves up.  If false, it moves down.
             */
            _moveSelection : function (up) {
                var that = this;
                var $lis = that.$valueList.children();
                var $li = $lis.filter('.combo-item-hovered');

                if (!$li.length) {
                    $li = $lis.filter('.combo-item-selected');
                }

                if (!$li.length) {
                    $li = $lis.first().addClass('combo-item-hovered');
                }
                else {
                    $li = $li.eq(0);
                    $li.removeClass('combo-item-hovered');
                    var $next = up ? $li.prev() : $li.next();
                    if (!$next.length) {
                        $next = up ? $lis.last() : $lis.first();
                    }
                    $next.addClass('combo-item-hovered');
                }
            },
            /**
             * Handles the initial selection of an item using keyboard navigation.
             *
             * @private
             * @method _selectItem
             * @param {Boolean} first If true, selects the first item on the list.  If false, selects the last item on the list.
             */
            _selectItem : function (first) {
                var $li;

                if (first) {
                    $li = this.$valueList.children().first();
                }
                else {
                    this.$valueList.children().last();
                }

                $li.addClass('combo-item-hovered');
            },
            /**
             * Sets the text in the input field.  Used in conjunction with the widget's blur event.
             *
             * @method setSelectedText
             */
            setSelectedText : function () {
                this.$textField.val(this.selectedValue[this.dataFormat.display]);
            },
            /**
             * Removes the ComboBox view
             *
             * @method remove
             */
            remove : function () {
                this.$comboBox.remove();
                this.$toggleButton.remove();
                this.$valueList.remove();
            }
        });

        function findValueByKey(key, values, dataFormat) {
            for (var i = 0; i < values.length; i++) {
                if (key === values[i][dataFormat.key]) {
                    return values[i];
                }
            }
            return false;
        }

        return ComboBoxView;

    });
define('oui.combo/comboBoxWidget',['oui.jquery', 'oui.underscore', 'oui.combo/comboBoxView', 'oui.bootstrap', 'oui.jqueryui'],
    function ($, _, ComboBoxView) {
        

        /**
         * A widget that replaces the HTML Select element with a custom combo box that allows for a typeahead and
         * and follows the blue sky theme.
         *
         * Example creation with default options:
         *
         *     $('selector').comboBox({
         *         values : []
         *     });
         *
         * @class ComboBox
         * @since 1.2.0
         **/

        $.widget('orcl.comboBox', {

            options : {
                /**
                 * The data values for the combo box.  They are format as a triplet of key, value, and display fields.
                 * Key is the actual key value used to differentiate between values, value is the value stored in that key,
                 * and display is the string that will be displayed in the view.
                 *
                 * @property values
                 * @type Object
                 * @default []
                 */
                values : [],
                /**
                 * The default value to be displayed on the ComboBox.  Should match the 'display' property of the desired
                 * default value.  If no value is supplied, the first item in the ComboBox will be the default value.
                 *
                 * @property defaultValue
                 * @type String
                 * @default ''
                 */
                defaultValue : '',
                /**
                 * The format of the data to be used in the ComboBox.  Default values are {key : 'key', value: 'value', display: 'display'},
                 * however they can be overridden to use custom property names.
                 *
                 * @property dataFormat
                 * @type Object
                 * @default {
                    key : 'key',
                    value : 'value',
                    display : 'display'
                    }
                 */
                dataFormat : {
                    key : 'key', //the key of the item
                    value : 'value', //the data value of the item
                    display : 'display'  //the text to display for the item
                }
            },

            /**
             * This is the constructor that gets called when initializing a JQuery UI widget.
             *
             * See [JQuery UI Widget Factory _create](http://api.jqueryui.com/jQuery.widget/#method-_create) for more details.
             *
             * @private
             * @method _create
             *
             */
            _create : function () {
                this.id = _.uniqueId('comboBox_');

                this.view = new ComboBoxView(this);

                //used to handle the blur behavior of the combo box.
                this.cancelBlur = false;

                this._bindKeyEvents();
            },

            /**
             * This method handles turning on all the event handlers for the widget.
             *
             * @private
             * @method _bindKeyEvents
             */
            _bindKeyEvents : function () {
                var that = this;

                //blur
                that.element.on('blur', this, function () {
                    //do something
                    if (that.cancelBlur) {
                        return false;
                    }
                    else {
                        that.view._collapse();
                        that.view.setSelectedText();
                    }
                });
            },

            /**
             * This method handles turning off all of the event handlers for the widget.
             *
             * @private
             * @method _unBindKeyEvents
             */
            _unbindKeyEvents : function () {
                this.element.off('blur');
            },

            /**
             * This method is called when new options are supplied. An example of this can be:
             *
             *      $('.some_class').comboBox({defaultValue : 'newVal'});
             *
             * @private
             * @method _setOption
             * @param {String} key The option key to update
             * @param {String} value The value the new key should hold
             */
            _setOption : function (key, value) {
                switch (key) {
                    case 'values':
                        this.view.setValueList(value);
                        break;
                    case 'defaultValue':
                        this.view.setDefaultValue(value);
                        break;
                    case 'dataFormat':
                        this.view.setDataFormat(value);
                        break;
                    default:
                        $.error('unexpected option: ' + key);
                }
            },

            /**
             * Widget specific clean up and removal of element
             *
             * @private
             * @method _destroy
             */
            _destroy : function () {

                if (this.element.parent().is('.combo-box')) {
                    this.element.unwrap();
                }

                this._unbindKeyEvents();

                this.view.remove();

                delete this.view;
                delete this.id;
                delete this.cancelBlur;
            },

            /**
             * This method is used to programmatically set the value on the combo box.
             *
             * @method setValue
             * @param {Object} value The value to set on the combo box.
             * Follows format of {key: 'key', value : 'value', display : 'display'}
             * @param {Boolean} quiet If true, valueSelected event will be fired.
             */
            setValue : function (value, quiet) {
                this.view.setValue(value, quiet);
            },

            /**
             * This method is used to programmatically get the value on the combo box.
             *
             * @method getValue
             * @return {Object} returns the value currently selected on the combo box as an object formmatted as
             * {key: 'key', value : 'value', display : 'display'}
             */
            getValue : function () {
                return this.view.getSelectedValue();
            }
        });

    });
define('oui.editor/editorView',['oui.jquery', 'oui.underscore', 'oui.bootstrap', 'oui.utils/template'],
    function ($, _, bs, creatorFn) {
        

        //editor markup
        var markup = creatorFn('<div class="rich-text-editor"><div class="toolbar-container btn-toolbar"></div>' +
            '<iframe class="editor-iframe" id="<%=id%>" name="<%=id%>" /></div>');

        /**
         * The view associated with the editor widget
         *
         * @class EditorView
         * @since 1.2.0
         * @constructor
         * @param widget The editor widget containing all of the options and parameters needed to create the view
         */
        var editorView = function (widget) {
            /**
             * A reference to the core widget that controls the whole editor
             *
             * @property widget
             * @type Object
             */
            this.widget = widget;
            /**
             * A reference to the core widget options
             *
             * @property options
             * @type Object
             */
            this.options = widget.options;

            /**
             * Boolean flag indicating visibility of the view
             *
             * @property visible
             * @type Boolean
             */
            this.visible = false;

            /**
             * Property that governs the width of the editor
             *
             * @property width
             * @type Integer
             */
            this.width = this.options.width;

            /**
             * Property that governs the height of the editor
             *
             * @property height
             * @type Integer
             */
            this.height = this.options.height;

            /**
             * A unique identifier that is attached to the editor iframe
             *
             * @property id
             * @type {String}
             */
            this.id = this.widget.id + '_iframe';

            /**
             * An object that holds references to the individual elements that make up the editor window
             *
             * @property markup
             * @type {Object}
             */
            this.markup = {};

            //reference to main container element
            this.markup.$richTextEditor = $(markup({id : this.id}));

            //reference to toolbar container
            this.markup.$toolbar = this.markup.$richTextEditor.find('div.toolbar-container');

            //reference to editor window itself
            this.markup.$editorWindow = this.markup.$richTextEditor.find('.editor-iframe');
            this.markup.$editablePane = $();

            this._init();
        };

        $.extend(editorView.prototype, {
            /**
             * Initialization method of the editor view.  Called from constructor.
             *
             * @method _init
             * @private
             */
            _init : function () {
                var that = this;

                //append the empty view to the widget container
                this.widget.element.append(this.markup.$richTextEditor);

                //make the iframe editable
                this.markup.$editablePane = this.markup.$editorWindow.contents().find('body');

                //compatibility
                //needs to be this way to make contenteditable work properly in FF/IE
                if ($.browser.mozilla) {
                    this.markup.$editorWindow.on('load', function () {
                        window.frames[that.id].document.body.contentEditable = true;

                        that._initListeners($(window.frames[that.id].document.body));

                        //set default text
                        window.frames[that.id].document.body.innerHTML = that.options.defaultText;

                        that.window = window.frames[that.id];
                        that.document = window.frames[that.id].document;
                    });
                }
                else if ($.browser.msie) {
                    //ie
                    var document = window.document.getElementById(that.id).contentWindow.document;
                    var body = document.getElementsByTagName('body')[0];
                    document.designMode = 'on';

                    that._initListeners($(body));

                    //these references will be used in actionController to change the contents of the iframe
                    this.document = window.document.getElementById(that.id).contentWindow.document;
                    this.window = window.frames[that.id];

                    //set the default text on the editor window.  IE must wait for the whole page to load.
                    $(window.frames[that.id]).on('load', function () {
                        that.document.body.innerHTML = that.options.defaultText;
                    });
                }
                else {
                    that.markup.$editablePane.attr('contentEditable', 'true');
                    that._initListeners(that.markup.$editablePane);

                    //these references will be used in actionController to change the contents of the iframe
                    this.document = window.document.getElementById(that.id).contentWindow.document;
                    this.window = window.frames[that.id];

                    that.markup.$editablePane.html(this.options.defaultText);
                }

                //size the iframe properly so that it fits in the editor but leaves room for the footer
                var iframeHeight = (this.options.height -
                    this.markup.$toolbar.outerHeight(true));

                //set height
                this.markup.$editorWindow.height(iframeHeight);


            },
            /**
             * Attaches event handlers to editor view component
             *
             * @method _initListeners
             * @param {Object} iframe component of editor view
             * @private
             */
            _initListeners : function ($element) {
                var that = this;

                //when you release your mouse button, update the toolbar
                $element.on('mouseup', function () { //BS: can do mouseup keyup; MN: want to keep it separate for now
                    that.widget.toolbar.updateToolbar();
                });

                //make the tab key insert an indent
                $element.on('keydown', function (event) {
                    //i.e. compability
                    var keyCode = (event.keyCode) ? event.keyCode : event.which;

                    checkIfDirtyOnKeyDown(event, that.widget);

                    if (keyCode === 9) { //tab key
                        that.widget.actionController.triggerAction('indent', null);
                        return false;
                    }
                });

                //when you release your key, update the toolbar
                $element.on('keyup', function () {
                    that.widget.toolbar.updateToolbar();
                });
            },
            /**
             * Used to remove editor view and all associated HTML elements
             *
             * @method remove
             */
            remove : function () {
                this.markup.$richTextEditor.remove();
            },
            /**
             * Sets the content of the editor equal to the string of HTML markup passed to it
             *
             * @param markup
             * @method setText
             * @return {String} HTML markup in the editor
             */
            setText : function (markup) {
                if ($.browser.mozilla || $.browser.msie) {
                    this.widget.setDirty(true);
                    return (window.frames[this.id].document.body.innerHTML = markup);
                }
                else {
                    this.widget.setDirty(true);
                    return this.markup.$editablePane.html(markup);
                }
            },
            /**
             * Gets the content of the editor equal to the string of HTML markup it contains
             *
             * @method getText
             * @return {String} HTML markup in the editor
             */
            getText : function () {
                if ($.browser.mozilla || $.browser.msie) {
                    return window.frames[this.id].document.body.innerHTML;
                }
                else {
                    return this.markup.$editablePane.html();
                }
            },
            /**
             * Used to determine whether or not the editor has focus
             *
             * @method hasFocus
             * @return {Boolean} flag indicating whether or not the editor window has focus
             */
            hasFocus : function () {
                return this.markup.$editablePane.is(':focus');
            },
            /**
             * Gives the editor window focus
             *
             * @method focus
             * @return {Boolean} returns true if the window was successfully given focus
             */
            focus : function () {
                return this.markup.$editablePane.focus();
            }
        });

        function checkIfDirtyOnKeyDown(event, widget) {
            //keycodes that don't set dirty flag like shift, ctrl, print screen,caps lock, f keys, etc.
            var allowedKeyCodes = [16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 91, 93,
                112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];

            //keys that have actions associated with the ctrl key (i.e. ctrl + b for bold, ctrl + a for select all, etc.)
            var ctrlKeyCodes = [66, 73, 85, 86, 88, 90];

            if (_.indexOf(allowedKeyCodes, event.keyCode, true) === -1) {
                //check for control actions like bold, cut, paste, etc.
                if (event.ctrlKey) {
                    if (_.indexOf(ctrlKeyCodes, event.keyCode, true) !== -1) {
                        widget.setDirty(true);
                    }
                }
                else {
                    widget.setDirty(true);
                }
            }
        }

        return editorView;

    });
define('oui.editor/toolbar/controlConfig',['oui.jquery'],function ($) {
    

    //cross browser stuff for font names
    var fontName = {};
    var fontSize = {};
    if($.browser.mozilla){
        fontName = {
            id : 'fontname',
            title : 'Font Name',
            execCommand : 'fontname',
            listItems : [
                {
                    id : 'Times New Roman',
                    display : 'Times New Roman'
                },
                {
                    id : 'Arial',
                    display : 'Arial'
                },
                {
                    id : 'Georgia',
                    display : 'Georgia'
                },
                {
                    id : 'Verdana',
                    display : 'Verdana'
                },
                {
                    id : 'Courier New',
                    display : 'Courier New'
                }
            ],
            defaultSelection : ''
        };

        fontSize = {
            id : 'fontsize',
            title : 'Font Size',
            execCommand : 'fontsize',
            listItems : [
                {
                    id : '1',
                    display : '8'
                },
                {
                    id : '2',
                    display : '10'
                },
                {
                    id : '3',
                    display : '12'
                },
                {
                    id : '4',
                    display : '14'
                },
                {
                    id : '5',
                    display : '18'
                },
                {
                    id : '6',
                    display : '24'
                },
                {
                    id : '7',
                    display : '36'
                }
            ],
            defaultSelection : '3'
        };
    }
    else if($.browser.msie){
        fontName = {
            id : 'fontname',
            title : 'Font Name',
            execCommand : 'fontname',
            listItems : [
                {
                    id : 'Times New Roman',
                    display : 'Times New Roman'
                },
                {
                    id : 'Arial',
                    display : 'Arial'
                },
                {
                    id : 'Georgia',
                    display : 'Georgia'
                },
                {
                    id : 'Verdana',
                    display : 'Verdana'
                },
                {
                    id : 'Courier New',
                    display : 'Courier New'
                }
            ],
            defaultSelection : 'Times New Roman'
        };

        fontSize = {
            id : 'fontsize',
            title : 'Font Size',
            execCommand : 'fontsize',
            listItems : [
                {
                    id : 1,
                    display : '8'
                },
                {
                    id : 2,
                    display : '10'
                },
                {
                    id : 3,
                    display : '12'
                },
                {
                    id : 4,
                    display : '14'
                },
                {
                    id : 5,
                    display : '18'
                },
                {
                    id : 6,
                    display : '24'
                },
                {
                    id : 7,
                    display : '36'
                }
            ],
            defaultSelection : 3
        };
    }
    else{
        fontName = {
            id : 'fontname',
            title : 'Font Name',
            execCommand : 'fontname',
            listItems : [
                {
                    id : '\'Times New Roman\'',
                    display : 'Times New Roman'
                },
                {
                    id : 'Arial',
                    display : 'Arial'
                },
                {
                    id : 'Georgia',
                    display : 'Georgia'
                },
                {
                    id : 'Verdana',
                    display : 'Verdana'
                },
                {
                    id : '\'Courier New\'',
                    display : 'Courier New'
                }
            ],
            defaultSelection : '\'Times New Roman\''
        };

        fontSize = {
            id : 'fontsize',
            title : 'Font Size',
            execCommand : 'fontsize',
            listItems : [
                {
                    id : '1',
                    display : '8'
                },
                {
                    id : '2',
                    display : '10'
                },
                {
                    id : '3',
                    display : '12'
                },
                {
                    id : '4',
                    display : '14'
                },
                {
                    id : '5',
                    display : '18'
                },
                {
                    id : '6',
                    display : '24'
                },
                {
                    id : '7',
                    display : '36'
                }
            ],
            defaultSelection : '3'
        };
    }


    return {
        toolbarConfig : [
            {
                type : 'toggle',
                controls : ['bold', 'italic', 'underline', 'strikethrough']
            },
            {
                type : 'toggle',
                controls : ['subscript', 'superscript']
            },
            {
                type : 'color',
                controls : ['color', 'backgroundcolor']
            },
            {
                type : 'fontNameList',
                controls : ['fontname']
            },
            {
                type : 'fontSizeList',
                controls : ['fontsize']
            },
            /*{
                type : 'fontSize',
                controls : ['fontUp', 'fontDown']
            },*/
            {
                type : 'single',
                controls : ['orderedlist', 'unorderedlist', 'indent']
            },
            {
                type : 'link',
                controls : ['hyperlink']
            },
            {
                type : 'radio',
                controls : ['justifyleft', 'justifycenter', 'justifyright']
            }
        ],
        controls : {
            fontname : fontName,
            fontsize : fontSize,
            bold : {
                "id" : "bold",
                "title" : "Bold",
                "execCommand" : "bold",
                "icon" : "icon-bold"
            },
            italic : {
                "id" : "italic",
                "title" : "Italic",
                "execCommand" : "italic",
                "icon" : "icon-italic"
            },
            underline : {
                "id" : "underline",
                "title" : "Underline",
                "execCommand" : "underline",
                "icon" : "icon-underline"
            },
            strikethrough : {
                "id" : "strikethrough",
                "title" : "Strikethrough",
                "execCommand" : "strikethrough",
                "icon" : "icon-strike"
            },
            subscript : {
                "id" : "subscript",
                "title" : "Subscript",
                "execCommand" : "subscript",
                "icon" : "icon-subscript"
            },
            superscript : {
                "id" : "superscript",
                "title" : "Superscript",
                "execCommand" : "superscript",
                "icon" : "icon-superscript"
            },

            orderedlist : {
                "id" : "orderedList",
                "title" : "Ordered List",
                "execCommand" : "insertorderedlist",
                "icon" : "icon-olist"
            },
            unorderedlist : {
                "id" : "unorderedList",
                "title" : "Unordered List",
                "execCommand" : "insertunorderedlist",
                "icon" : "icon-ulist"
            },
            indent : {
                "id" : "indent",
                "title" : "Indent",
                "execCommand" : "indent",
                "icon" : "icon-indent"
            },

            justifyleft : {
                "id" : "justifyleft",
                "title" : "Justify Left",
                "execCommand" : "justifyleft",
                "icon" : "icon-align-left"
            },
            justifyright : {
                "id" : "justifyright",
                "title" : "Justify Right",
                "execCommand" : "justifyright",
                "icon" : "icon-align-right"
            },
            justifycenter : {
                "id" : "justifycenter",
                "title" : "Justify Center",
                "execCommand" : "justifycenter",
                "icon" : "icon-align-center"
            },

            hyperlink : {
                "id" : "link",
                "title" : "Link",
                "execCommand" : "createlink",
                "icon" : "icon-link"
            },

            fontUp : {
                "id" : "fontUp",
                "title" : "Increase Font Size",
                "execCommand" : "fontsize",
                "icon" : "icon-arrow-up"
            },
            fontDown : {
                "id" : "fontDown",
                "title" : "Decrease font size",
                "execCommand" : "fontsize",
                "icon" : "icon-arrow-down"
            },

            color : {
                "id" : "color",
                "title" : "Font Color",
                "execCommand" : "forecolor",
                "icon" : "icon-color"
            },
            backgroundcolor : {
                "id" : "backgroundcolor",
                "title" : "Background Color",
                "execCommand" : "backcolor",
                "icon" : "icon-back-color"
            }
        }
    };

});
define('oui.editor/toolbar/controls/toggleButton',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controlConfig', 'oui.bootstrap', 'oui.utils/template'],
    function ($, _, ControlConfig, bs, creatorFn) {

        var toolbarButtonMarkup = creatorFn('<button type="button" class="btn btn-blue-light toolbar-btn"><i class="<%=icon%>"></i></button>');

        /**
         * This component is a button with a toggleable state- active and inactive.  The behavior of this button does
         * not depend on any other controls to determine its behavior.
         *
         * @class ToggleButton
         * @since 1.2.0
         * @constructor
         * @param {Object} controlName The name of the control
         * @param {Object} group The group to which this control belongs
         */
        var ToggleButton = function (controlName, group) {
            /**
             * The group to which this control belongs
             *
             * @property group
             * @type {Object}
             */
            this.group = group;
            /**
             * The configuration of this control, retrieved from the ControlConfig file.
             *
             * @property config
             * @type {Object}
             */
            this.config = ControlConfig.controls[controlName];
            /**
             * Property governing whether this control is enabled or not
             *
             * @property enabled
             * @type {Boolean}
             */
            this.enabled = true;
            /**
             * The markup for this button, in an underscore template and wrapped in jQuery.
             *
             * @property $toggleElement
             * @type {HTMLElement}
             */
            this.$toggleElement = $(toolbarButtonMarkup({icon : this.config.icon}));

            this._attachClickEvent();
        };

        $.extend(ToggleButton.prototype = {
            constructor : ToggleButton,
            /**
             * Attaches markup for this element to its parent ToolbarGroup
             *
             * @method render
             */
            render : function () {
                var that = this;

                that.group.$groupElement.append(that.$toggleElement);

                that.$toggleElement.attr('title', that.config.title);
            },
            /**
             * Updates the status of this control.
             *
             * @method updateStatus
             */
            updateStatus : function () {
                var status = this.group.toolbar.widget.actionController.queryState(this.config.execCommand);

                //don't highlight underline if you're focused on a link
                status = checkUnderline(this, status);

                this._toggleState(status);
            },
            /**
             * Switches the enabled status of this control.
             *
             * @method enable
             * @param {Boolean} enable True for enable, false for disable.
             */
            enable : function (enable) {
                this.$toggleElement.attr('disabled', !enable);

                this.enabled = enable;
            },
            /**
             * Removes this control from the page and detaches its event handlers
             *
             * @method destroy
             */
            destroy : function () {
                this.$toggleElement.remove();
            },
            /**
             * Attaches mousedown event to button to make it launch the link modal dialog
             *
             * @method _attachClickEvent
             * @private
             */
            _attachClickEvent : function () {
                var that = this;
                this.$toggleElement.on('mousedown', function (event) {
                    //used to keep the focus on the editor window
                    event.preventDefault();

                    //give the editor focus if it doesn't have it already
                    that.group.toolbar.widget.view.focus();

                    //trigger the action of the current button
                    that.group.toolbar.widget.actionController.triggerAction(that.config.execCommand, null);
                });
            },
            /**
             * Toggles the state of the button between active and inactive
             *
             * @method _toggleState
             * @param {Boolean} pressed true if the button should be pressed, false if it not should be pressed
             * @private
             */
            _toggleState : function (pressed) {
                if (pressed) {
                    if (!this.$toggleElement.is('.active')) {
                        this.$toggleElement.addClass('active');
                    }
                }
                else {
                    if (this.$toggleElement.is('.active')) {
                        this.$toggleElement.removeClass('active');
                    }
                }
            }
        });

        function checkUnderline(context, status) {
            if (context.config.id === 'underline') {
                if (context.group.toolbar.widget.actionController.getAnchor() !== null) {
                    status = false; //BS: cleaner loop
                }
            }

            return status;
        }

        return ToggleButton;

    });
define('oui.editor/toolbar/controls/singleFireButton',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controlConfig', 'oui.bootstrap', 'oui.utils/template'],
    function ($, _, ControlConfig, bs, creatorFn) {

        var toolbarButtonMarkup = creatorFn('<button type="button" class="btn btn-blue-light toolbar-btn"><i class="<%=icon%>"></i></button>');

        /**
         * This component is a single-fire button with a once-and-done style action.  It does not rely on state to
         * determine its behavior.
         *
         * @class SingleFireButton
         * @since 1.2.0
         * @constructor
         * @param {Object} controlName The name of the control
         * @param {Object} group The group to which this control belongs
         */
        var SingleFireButton = function (controlName, group) {
            /**
             * The group to which this control belongs
             *
             * @property group
             * @type {Object}
             */
            this.group = group;
            /**
             * The configuration of this control, retrieved from the ControlConfig file.
             *
             * @property config
             * @type {Object}
             */
            this.config = ControlConfig.controls[controlName];
            /**
             * Property governing whether this control is enabled or not
             *
             * @property enabled
             * @type {Boolean}
             */
            this.enabled = true;
            /**
             * The markup for this button, in an underscore template and wrapped in jQuery.
             *
             * @property $singleFireElement
             * @type {HTMLElement}
             */
            this.$singleFireElement = $(toolbarButtonMarkup({icon : this.config.icon}));

            this._attachClickEvent();
        };

        $.extend(SingleFireButton.prototype = {
            constructor : SingleFireButton,
            /**
             * Attaches markup for this element to its parent ToolbarGroup
             *
             * @method render
             */
            render : function () {
                var that = this;

                that.group.$groupElement.append(that.$singleFireElement);

                that.$singleFireElement.attr('title', that.config.title);
            },
            /**
             * Updates the status of this control.
             *
             * @method updateStatus
             */
            updateStatus : function () {
                //shouldn't need to ever update because it doesn't have to reflect a state
                return true;
            },
            /**
             * Switches the enabled status of this control.
             *
             * @method enable
             * @param {Boolean} enable True for enable, false for disable.
             */
            enable : function (enable) {
                //not in use yet but could be
                this.$singleFireElement.attr('disabled', !enable);

                this.enabled = enable;
            },
            /**
             * Removes this control from the page and detaches its event handlers
             *
             * @method destroy
             */
            destroy : function () {
                this.$singleFireElement.remove();
            },
            /**
             * Attaches mousedown event to button to make it launch the link modal dialog
             *
             * @method _attachClickEvent
             * @private
             */
            _attachClickEvent : function () {
                var that = this;
                this.$singleFireElement.on('mousedown', function (event) {
                    //keep focus on editor even though we clicked outside of it
                    event.preventDefault();

                    //give the editor focus if it doesn't have it already
                    that.group.toolbar.widget.view.focus();

                    //trigger the action of the current button
                    that.group.toolbar.widget.actionController.triggerAction(that.config.execCommand, null);
                });
            }
        });
        return SingleFireButton;
    });
define('oui.editor/toolbar/controls/radioButton',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controlConfig', 'oui.bootstrap', 'oui.utils/template'],
    function ($, _, ControlConfig, bs, creatorFn) {

       var toolbarButtonMarkup = creatorFn('<button type="button" class="btn btn-blue-light toolbar-btn"><i class="<%=bootstrapIcon%>"></i></button>');

        /**
         * This component is a radio-button style control that switches between two states- active and unactive.
         * The handling of the radio-button style functionality (of only one button being active at one time) is
         * handled by bootstrap
         *
         * @class RadioButton
         * @since 1.2.0
         * @constructor
         * @param {Object} controlName The name of the control
         * @param {Object} group The group to which this control belongs
         */
        var RadioButton = function (controlName, group) {
            /**
             * The group to which this control belongs
             *
             * @property group
             * @type {Object}
             */
            this.group = group;
            /**
             * The configuration of this control, retrieved from the ControlConfig file.
             *
             * @property config
             * @type {Object}
             */
            this.config = ControlConfig.controls[controlName];
            /**
             * The markup for this button, in an underscore template and wrapped in jQuery.
             *
             * @property $radioElement
             * @type {HTMLElement}
             */
            this.$radioElement = $(toolbarButtonMarkup({bootstrapIcon : this.config.icon}));

            this._attachClickEvent();
        };

        $.extend(RadioButton.prototype = {
            constructor : RadioButton,
            /**
             * Attaches markup for this element to its parent ToolbarGroup
             *
             * @method render
             */
            render : function () {
                var that = this;

                that.group.$groupElement.append(that.$radioElement);

                that.$radioElement.attr('title', that.config.title);
            },
            /**
             * Updates the status of this control.
             *
             * @method updateStatus
             */
            updateStatus : function () {
                //fortunately, bootstrap actually handles the behavior of the radio buttons for us!
                var status = this.group.toolbar.widget.actionController.queryState(this.config.execCommand);

                this._toggleState(status);
            },
            /**
             * Switches the enabled status of this control.
             *
             * @method enable
             * @param {Boolean} enable True for enable, false for disable.
             */
            enable : function (enable) {
                this.$radioElement.attr('disabled', !enable);

                this.enabled = enable;
            },
            /**
             * Removes this control from the page and detaches its event handlers
             *
             * @method destroy
             */
            destroy : function () {
                this.$radioElement.remove();
            },
            /**
             * Attaches mousedown event to button to make it launch the link modal dialog
             *
             * @method _attachClickEvent
             * @private
             */
            _attachClickEvent : function () {
                var that = this;
                this.$radioElement.on('mousedown', function (event) {
                    //keep focus on editor even though we clicked outside of it
                    event.preventDefault();

                    //give the editor focus if it doesn't have it already
                    that.group.toolbar.widget.view.focus();

                    //trigger the action of the current button
                    that.group.toolbar.widget.actionController.triggerAction(that.config.execCommand, null);
                });
            },
            /**
             * Toggles the state of the button between active and inactive
             *
             * @method _toggleState
             * @param {Boolean} pressed true if the button should be pressed, false if it not should be pressed
             * @private
             */
            _toggleState : function (pressed) {
                if (pressed) {
                    if (!this.$radioElement.is('.active')) {
                        this.$radioElement.addClass('active');
                    }
                }
                else {
                    if (this.$radioElement.is('.active')) {
                        this.$radioElement.removeClass('active');
                    }
                }
            }
        });

        return RadioButton;

    });
define('oui.editor/toolbar/controls/extras/colorPicker',['oui.jquery', 'oui.underscore', 'oui.bootstrap', 'oui.utils/template'],
    function ($, _, bs, creatorFn) {
        //constants
        var colorPickerTemplate = creatorFn('<div class="color-picker-container" id="<%=id%>"></div>');
        var colorTileTemplate = creatorFn('<div class="color-tile" data-color="#<%=color%>" style="background-color:#<%=color%>"></div>');
        var colorMatrix = [
            ['000000', '993300', '333300', '003300', '003366', '000080', '333399', '333333'],
            ['800000', 'ff6600', '808000', '008000', '008080', '0000ff', '666699', '808080'],
            ['ff0000', 'ff9900', '99cc00', '339966', '33cccc', '3366ff', '800080', '969696'],
            ['ff00ff', 'ffcc00', 'ffff00', '00ff00', '00ffff', '00ccff', '993366', 'c0c0c0'],
            ['ff99cc', 'ffcc99', 'ffff99', 'ccffcc', 'ccffff', '99ccff', 'cc99ff', 'ffffff']
        ];

        /**
         * This class creates a color swatch of 40 colors that uses the same color set as the Sencha text editor
         *
         * @class ColorPicker
         * @since 1.2.0
         * @constructor
         * @param $positionElement the element off of which the color picker should be positioned
         * @param $containerElement the actual container within the rich text editor for the color swatches
         * @param button
         */
        var ColorPicker = function ($positionElement, $containerElement, button) {
            /**
             * A unique ID used to identify the color picker on the DOM
             *
             * @property uniqueId
             * @type {String}
             */
            this.uniqueId = _.uniqueId('color_'); //used for putting the color picker on screen
            /**
             * The element off of which this color picker is positioned
             *
             * @property $parent
             * @type {HTMLelement}
             */
            this.$parent = $positionElement;
            /**
             * The element that contains this color picker
             *
             * @property $container
             * @type {HTMLelement}
             */
            this.$container = $containerElement;
            /**
             * Boolean governing whether or not the color picker is open
             *
             * @property open
             * @type {Boolean}
             */
            this.open = false;
            /**
             * The currently selected color on the color picker.  Default color is black.
             *
             * @property selectedColor
             * @type {String}
             */
            this.selectedColor = '000000';
            /**
             * The button off of which this color picker is created
             *
             * @property button
             */
            this.button = button;
            /**
             * The markup for the color picker, created via underscore template and wrapped up in jQuery.
             *
             * @property $pickerElement
             * @type {HTMLElement}
             */
            this.$pickerElement = $(colorPickerTemplate({id : this.uniqueId}));
            this._initMatrix();

            this.$container.append(this.$pickerElement);

            this._attachEvents();

            this.hide();
        };

        _.extend(ColorPicker.prototype = {
            constructor : ColorPicker,
            /**
             * Adds the color tiles to the color matrix
             *
             * @method _initMatrix
             * @private
             */
            _initMatrix : function () {
                var that = this;
                var $tile = $();

                //add the colors to the matrix
                _.each(colorMatrix, function (colorRow) {
                    _.each(colorRow, function (color) {
                        $tile = $(colorTileTemplate({color : color}));
                        that.$pickerElement.append($tile);
                    });
                });
            },
            /**
             * Attaches mousedown event to allow the user to select a color
             *
             * @method _attachClickEvent
             * @private
             */
            _attachEvents : function () {
                var that = this;

                this.$pickerElement.children('.color-tile').on('mousedown', function (event) {
                    event.preventDefault();

                    that.selectedColor = $(this).attr('data-color');

                    //long chain to access the actionController and call triggerAction
                    that.button.group.toolbar.widget.actionController.triggerAction(that.button.config.execCommand,
                        that.button.picker.selectedColor);

                    that.hide();
                });
            },
            /**
             * Show and position the color picker
             *
             * @method show
             */
            show : function () {
                var that = this;

                that.$pickerElement.show();

                that.button._toggleState(true); //depress the button while the color picker is open

                that.$pickerElement.position({
                    my : 'left top',
                    at : 'left bottom',
                    of : that.$parent
                });

                this.open = true;
            },
            /**
             * Hide the color picker
             *
             * @method hide
             */
            hide : function () {
                this.$pickerElement.hide();

                this.button._toggleState(false); //release the button when the color picker closes

                this.open = false;
            }
        });

        return ColorPicker;
    });
define('oui.editor/toolbar/controls/colorButton',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controls/extras/colorPicker', 'oui.editor/toolbar/controlConfig',
    'oui.bootstrap', 'oui.utils/template'],
    function ($, _, ColorPicker, ControlConfig, bs, creatorFn) {

        //markup for the button
        var toolbarButtonMarkup = creatorFn('<button type="button" class="btn btn-blue-light toolbar-btn"><i class="<%=icon%>"></i></button>');

        /**
         * This button, when clicked, opens up a color picker and allows the user to select a color.
         * This color is in turn applied to either fore color or background color.
         *
         * @class ColorButton
         * @since 1.2.0
         * @constructor
         * @param {Object} controlName The name of the control (either 'color' or 'backgroundcolor')
         * @param {Object} group The group to which this control belongs
         */
        var ColorButton = function (controlName, group) {
            /**
             * The group to which this control belongs
             *
             * @property group
             * @type {Object}
             */
            this.group = group;

            /**
             * The configuration of this control, retrieved from the ControlConfig file.
             *
             * @property config
             * @type {Object}
             */
            this.config = ControlConfig.controls[controlName];

            /**
             * Property governing whether this control is enabled or not
             *
             * @property enabled
             * @type {Boolean}
             */
            this.enabled = true;

            /**
             * A string representing the currently selected color.  Default is black.
             *
             * @property selectedColor
             * @type {String}
             */
            this.selectedColor = '000000';

            /**
             * The markup for this button, in an underscore template and wrapped in jQuery.
             *
             * @property $colorButtonElement
             * @type {HTMLElement}
             */
            this.$colorButtonElement = $(toolbarButtonMarkup({icon : this.config.icon}));

            /**
             * The color picker object that is opened when this button is clicked
             *
             * @property picker
             * @type {oui.editor.toolbar.controls.extras.colorPicker}
             */
            this.picker = new ColorPicker(this.$colorButtonElement,
                this.group.toolbar.widget.view.markup.$richTextEditor, this);

            this._attachClickEvent();
        };

        $.extend(ColorButton.prototype = {
            constructor : ColorButton,
            /**
             * Attaches markup for this element to its parent ToolbarGroup
             *
             * @method render
             */
            render : function () {
                var that = this;

                that.group.$groupElement.append(that.$colorButtonElement);

                that.$colorButtonElement.attr('title', that.config.title);
            },
            /**
             * Updates the status of this control.  Specifically, it closes the picker if it is open.
             *
             * @method updateStatus
             */
            updateStatus : function () {
                if (this.picker.open) {
                    this.picker.hide();
                }
            },
            /**
             * Switches the enabled status of this control.
             *
             * @method enable
             * @param {Boolean} enable True for enable, false for disable.
             */
            enable : function (enable) {
                this.$colorButtonElement.attr('disabled', !enable);

                this.enabled = enable;
            },
            /**
             * Removes this control from the page and detaches its event handlers
             *
             * @method destroy
             */
            destroy : function () {
                this.$colorButtonElement.remove();
            },
            /**
             * Toggles the state of the button between active and inactive
             *
             * @method _toggleState
             * @param {Boolean} pressed true if the button should be pressed, false if it not should be pressed
             * @private
             */
            _toggleState : function (pressed) {
                if (pressed) {
                    if (!this.$colorButtonElement.is('.active')) {
                        this.$colorButtonElement.addClass('active');
                    }
                }
                else {
                    if (this.$colorButtonElement.is('.active')) {
                        this.$colorButtonElement.removeClass('active');
                    }
                }
            },
            /**
             * Attaches mousedown event to button to make it launch or hide color picker
             *
             * @method _attachClickEvent
             * @private
             */
            _attachClickEvent : function () {
                var that = this;
                this.$colorButtonElement.on('mousedown', function (event) {
                    //don't take focus away from the editor
                    event.preventDefault();

                    //give the editor focus if it doesn't have it already
                    that.group.toolbar.widget.view.focus();

                    if (that.picker.open) {
                        //if the picker is open, hide it from view
                        that.picker.hide();
                    }
                    else {
                        //show the picker
                        that.group.updateControls(); //prevents the group from displaying two color pickers at once
                        that.picker.show();
                    }
                });
            }
        });

        return ColorButton;

    });
define('oui.editor/toolbar/controls/extras/linkDialog',['oui.jquery', 'oui.underscore', 'oui.bootstrap', 'oui.utils/template'],
    function ($, _, bs, creatorFn) {
         var dialogMarkup =
            '<div id="linkDialog" class="modal hide fade">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
                '<h5 id="linkDialogHeader">Insert Link</h5>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div class="modal-input-container"><span>Link Text:</span>' +
                '<input type="text" class="link-input" id="modal-text-input" /></div>' +
                '<div class="modal-input-container"><span>URL:</span>' +
                '<input type="text" class="link-input" id="modal-url-input"/></div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button class="btn" id="modal-cancel" data-dismiss="modal" aria-hidden="true">Cancel</button>' +
                '<button class="btn btn-primary" id="modal-submit">Insert Link</button>' +
                '</div>' +
                '</div>';

        /**
         * This class creates a bootstrap modal dialog that allows the user to enter a title and URL to create a link
         * in the editor.
         *
         * @class LinkDialog
         * @since 1.2.0
         * @constructor
         * @param {Object} hyperlinkButton The button from which this dialog is launched
         */
        var LinkDialog = function (hyperlinkButton) {
            this.button = hyperlinkButton; //context of the button that triggers this dialog
            this.$dialogContainer = this.button.group.toolbar.widget.view.markup.$richTextEditor;
            this.$dialogElement = $();
        };

        $.extend(LinkDialog.prototype = {
            /**
             * This method processes the anchor tag passed to it and then calls _buildDialog
             *
             * @method show
             * @param anchorTag The anchor tag already found within the user's text selection.  Will be null if there
             * is no anchor tag within the selection or no selection at all.
             */
            show : function (anchorTag) {
                //the attributes of the link
                var linkText = '';
                var url = '';
                var window = this.button.group.toolbar.widget.view.window;
                this.range = {};

                //determine if the selection was already a link
                //there is a link already in the selection
                if (anchorTag !== null) {
                    linkText = $(anchorTag).text();
                    url = $(anchorTag).attr('href');
                    this.anchorTag = anchorTag;
                }
                else {
                    //there is no link and we're creating a new one
                    //compatibility
                    if ($.browser.msie) {
                        this.range = window.document.selection.createRange();
                        linkText = this.range.text; //doesn't work in IE
                    }
                    else {
                        if (window.getSelection().type !== 'None') {
                            this.range = window.getSelection().getRangeAt(0);
                            linkText = $(this.range.cloneContents()).text();
                        }
                        else {
                            linkText = '';
                        }
                    }

                    url = 'http://';
                    this.anchorTag = false;
                }

                this._buildDialog(linkText, url);
            },
            /**
             * This method builds the dialog markup and calls functions to attach necessary events and perform validation
             *
             * @method _buildDialog
             * @param linkText The string used as the link text
             * @param url The string used as the link URL
             * @private
             */
            _buildDialog : function (linkText, url) {
                this.$dialogElement.remove();
                this.$dialogElement = $(dialogMarkup);

                this.$dialogHeader = this.$dialogElement.find('.modal-header');
                this.$dialogBody = this.$dialogElement.find('.modal-body');

                this.$textInput = this.$dialogBody.find('#modal-text-input');
                this.$urlInput = this.$dialogBody.find('#modal-url-input');

                this.$textInput.val(linkText);
                this.$urlInput.val(url);

                this.$dialogFooter = this.$dialogElement.find('.modal-footer');

                this.$cancelButton = this.$dialogFooter.find('#modal-cancel');
                this.$submitButton = this.$dialogFooter.find('#modal-submit');

                this.$dialogContainer.append(this.$dialogElement);

                //attach events to input boxes
                attachInputEvents(this, this.$textInput);
                attachInputEvents(this, this.$urlInput);

                //attach events to submit button
                attachSubmitEvents(this);

                //disable submit button if needed
                validateForm(this);
            }
        });

        function attachInputEvents(dialogContext, $input) {
            //attach form validation events to input box
            $input.on('keypress', function (event) {
                validateForm(dialogContext);

                //submit link if form is valid
                if (event.keyCode === 13) {
                    //dialogContext.$submitButton.trigger('click'); //just directly trigger the click event
                    createLink(dialogContext);

                    dialogContext.$dialogElement.modal('hide');
                }
            });
        }

        function validateForm(dialogContext) {
            //don't allow the user to click the submit button if either field is empty
            if (dialogContext.$textInput.val() === '' || dialogContext.$urlInput.val() === '') {
                dialogContext.$submitButton.addClass('disabled');
            }
            else {
                dialogContext.$submitButton.removeClass('disabled');
            }
        }

        function attachSubmitEvents(dialogContext) {
            //create link on click
            dialogContext.$submitButton.on('click', function () {
                //create link
                if (!$(this).is('.disabled')) {
                    createLink(dialogContext);

                    dialogContext.$dialogElement.modal('hide');
                }
            });
        }

        function createLink(dialogContext) {
            var url = dialogContext.$urlInput.val();
            var linkText = dialogContext.$textInput.val();

            //if there is a link that we're already focused in
            if (dialogContext.anchorTag) {
                $(dialogContext.anchorTag).attr('href', url);
                $(dialogContext.anchorTag).text(linkText);
            }
            else {
                //if we need to create a new link
                var newLink = creatorFn('<a href="<%=url%>"><%=linkText%></a>');//'<a href="' + $urlInput.val() + '">' + $linkNameInput.val() + '</a>';

                if ($.browser.msie) {
                    dialogContext.range.pasteHTML(newLink({url : url, linkText : linkText}));
                }
                else {
                    dialogContext.button.group.toolbar.widget.actionController.triggerAction('insertHTML',
                        newLink({url : url, linkText : linkText}));
                }
            }
        }

        return LinkDialog;
    });

define('oui.editor/toolbar/controls/hyperlinkButton',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controlConfig',
    'oui.editor/toolbar/controls/extras/linkDialog', 'oui.bootstrap', 'oui.utils/template'],
    function ($, _, ControlConfig, LinkDialog, bs, creatorFn) {

        var toolbarButtonMarkup = creatorFn('<button type="button" class="btn btn-blue-light toolbar-btn" data-toggle="modal" data-target="#linkDialog">' +
            '<i class="<%=bootstrapIcon%>"></i></button>');

        /**
         * This button, when clicked, opens up a modal dialog and allows the user to insert or modify a hyperlink
         *
         * @class HyperlinkButton
         * @since 1.2.0
         * @constructor
         * @param {Object} controlName The name of the control
         * @param {Object} group The group to which this control belongs
         */
        var HyperlinkButton = function (controlName, group) {
            /**
             * The group to which this control belongs
             *
             * @property group
             * @type {Object}
             */
            this.group = group;
            /**
             * The configuration of this control, retrieved from the ControlConfig file.
             *
             * @property config
             * @type {Object}
             */
            this.config = ControlConfig.controls[controlName];
            /**
             * Property governing whether this control is enabled or not
             *
             * @property enabled
             * @type {Boolean}
             */
            this.enabled = true;
            /**
             * The markup for this button, in an underscore template and wrapped in jQuery.
             *
             * @property $linkElement
             * @type {HTMLElement}
             */
            this.$linkElement = $(toolbarButtonMarkup({bootstrapIcon : this.config.icon}));

            this.group.toolbar.widget.view.markup.$richTextEditor.append();

            /**
             * The modal dialog that is opened when this button is clicked.
             *
             * @property linkDialog
             * @type {oui.editor.toolbar.controls.extras.linkDialog}
             */
            this.linkDialog = new LinkDialog(this);

            this._attachClickEvent();
        };

        $.extend(HyperlinkButton.prototype = {
            constructor : HyperlinkButton,
            /**
             * Attaches markup for this element to its parent ToolbarGroup
             *
             * @method render
             */
            render : function () {
                var that = this;

                that.group.$groupElement.append(that.$linkElement);

                that.$linkElement.attr('title', that.config.title);
            },
            /**
             * Updates the status of this control.  Specifically, it shows that the button is active when the user's text
             * selection includes an <a> tag
             *
             * @method updateStatus
             */
            updateStatus : function () {
                //there will be something here
                var that = this;

                //check to see if the selection is already contained in an anchor tag
                if (that.group.toolbar.widget.actionController.getAnchor() !== null) {
                    that._toggleState(true);
                }
                else {
                    that._toggleState(false);
                }

            },
            /**
             * Removes this control from the page and detaches its event handlers
             *
             * @method destroy
             */
            destroy : function () {
                this.$linkElement.remove();
            },
            /**
             * Toggles the state of the button between active and inactive
             *
             * @method _toggleState
             * @param {Boolean} pressed true if the button should be pressed, false if it not should be pressed
             * @private
             */
            _toggleState : function (pressed) {
                if (pressed) {
                    if (!this.$linkElement.is('.active')) {
                        this.$linkElement.addClass('active');
                    }
                }
                else {
                    if (this.$linkElement.is('.active')) {
                        this.$linkElement.removeClass('active');
                    }
                }
            },
            /**
             * Switches the enabled status of this control.
             *
             * @method enable
             * @param {Boolean} enable True for enable, false for disable.
             */
            enable : function (enable) {
                this.$linkElement.attr('disabled', !enable);

                this.enabled = enable;
            },
            /**
             * Attaches mousedown event to button to make it launch the link modal dialog
             *
             * @method _attachClickEvent
             * @private
             */
            _attachClickEvent : function () {
                var that = this;
                this.$linkElement.on('mousedown', function (event) {
                    //don't take the focus away from the editor
                    event.preventDefault();

                    //give the editor focus if it doesn't have it already
                    that.group.toolbar.widget.view.focus();

                    var anchor = that.group.toolbar.widget.actionController.getAnchor();

                    that.linkDialog.show(anchor);
                });
            }
        });

        return HyperlinkButton;

    });
define('oui.editor/toolbar/controls/list',
    ['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controlConfig', 'oui.combo/comboBoxWidget', 'oui.bootstrap'],
    function ($, _, ControlConfig) {
        

        //unselectable is an IE trick to keep the iframe from losing its selection when a toolbar item is clicked
        var inputMarkup = '<input type="text" style="width:120px"/>';

        //list componenet, used to handle the changing of font face
        /**
         * This component uses a combo box to allow users to select a from a list of options to modify their content.
         * Specifically, it is used for font face and font size.
         *
         * @class List
         * @since 1.2.0
         * @constructor
         * @param {Object} controlName The name of the control
         * @param {Object} group The group to which this control belongs
         */
        var List = function (controlName, group) {
            /**
             * The group to which this control belongs
             *
             * @property group
             * @type {Object}
             */
            this.group = group;

            /**
             * The configuration of this control, retrieved from the ControlConfig file.
             *
             * @property config
             * @type {Object}
             */
            this.config = ControlConfig.controls[controlName];

            /**
             * Property governing whether this control is enabled or not
             *
             * @property enabled
             * @type {Boolean}
             */
            this.enabled = true;

            /**
             * The markup for this button.  Wrapped in jQuery.
             *
             * @property $listElement
             * @type {HTMLElement}
             */
            this.$listElement = $(inputMarkup);

            if (this.config.id === 'fontname') {
                this.$listElement.width('150px');
            }
            else {
                this.$listElement.width('50px');
            }

            this._attachChangeEvent();

            this.enable(this.enabled);
        };

        $.extend(List.prototype = {
            constructor : List,
            /**
             * Attaches markup for this element to its parent ToolbarGroup
             *
             * @method render
             */
            render : function () {
                var that = this;

                that.group.$groupElement.append(that.$listElement);

                var titleText = '';
                if (this.config.id === 'fontname') {
                    titleText = 'Font Face';
                }
                else{
                    titleText = 'Font Size';
                }

                that.$listElement.comboBox({
                    values : that._generateComboBoxValues(),
                    defaultValue : that.config.defaultSelection,
                    titleText : titleText
                });
            },
            /**
             * Removes this control from the page and detaches its event handlers
             *
             * @method destroy
             */
            destroy : function () {
                this.$listElement.remove();
            },
            /**
             * This method compiles an array of objects fit to use with a ComboBox control
             *
             * @method _generateComboBoxValues
             * @return {Array} the array of values to be used for the ComboBox
             * @private
             */
            _generateComboBoxValues : function () {
                var values = [];

                _.each(this.config.listItems, function (listItem) {
                    values.push({key : listItem.id, value : listItem.id, display : listItem.display});
                });

                return values;
            },
            /**
             * Updates the status of this control.  When the user makes a new text selection, this will update the
             * combo box to match what is highlighted (i.e. if this is a fontname combo box and the user selects text
             * that is Arial font, this box will update to say Arial)
             *
             * @method updateStatus
             */
            updateStatus : function () {
                //update the toolbar item to match the font face of the selection
                var queryValue = this.group.toolbar.widget.actionController.queryValue(this.config.execCommand);
                var result = '';

                if (queryValue === this.config.defaultSelection) {
                    result = getListItemIndex(this.config.listItems, this.config.defaultSelection);
                }
                else {
                    result = getListItemIndex(this.config.listItems, queryValue);
                }

                if (result !== -1) {
                    //set the value of the combo box to the value of what we just focused on
                    this.$listElement.comboBox('setValue',
                        {key : result.id, value : result.id, display : result.display}, true);
                }
            },
            /**
             * Switches the enabled status of this control.
             *
             * @method enable
             * @param {Boolean} enable True for enable, false for disable.
             */
            enable : function (enable) {
                this.$listElement.attr('disabled', !enable);

                this.enabled = enable;
            },
            /**
             * Attaches valueSelected event to $listElement to listen for new values being selected on the combo box
             *
             * @method _attachChangeEvent
             * @private
             */
            _attachChangeEvent : function () {
                var that = this;

                this.$listElement.on('valueSelected', function () {
                    var newValue = that.$listElement.comboBox('getValue');

                    that.group.toolbar.widget.view.focus();

                    that.group.toolbar.widget.actionController.triggerAction(that.config.execCommand, newValue.value);

                    that.group.toolbar.widget.view.focus();
                });
            }
        });

        //if listItem is contained within list, return the index
        //if not, return -1
        function getListItemIndex(list, listItem) {
            for (var i = 0; i < list.length; i++) {
                if (listItem === list[i].id) {
                    return list[i];
                }
            }
            return -1;
        }

        return List;

    });
define('oui.editor/toolbar/toolbarGroup',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controls/toggleButton',
    'oui.editor/toolbar/controls/singleFireButton', 'oui.editor/toolbar/controls/radioButton',
    'oui.editor/toolbar/controls/colorButton', 'oui.editor/toolbar/controls/hyperlinkButton',
    'oui.editor/toolbar/controls/list', 'oui.bootstrap'],
    function ($, _, ToggleButton, SingleFireButton, RadioButton, ColorButton, HyperlinkButton, List) {
        

        /**
         * Works as a wrapper around a group of editor controls.  As an example, one toolbar group may contain
         * Bold, Italic, Justify, Underline, and so forth while another group may contains Left Justify, Right Justify,
         * Center Justify, etc.  From here you can update the status of all of the controls in this particular group.
         *
         * @class ToolbarGroup
         * @since 1.2.0
         * @constructor
         * @param toolbarArgs The arguments that shape this toolbar group
         * @param toolbar The toolbar that contains this toolbar group
         */
        var ToolbarGroup = function (toolbarArgs, toolbar) {
            /**
             * The markup for the group container, wrapped up in jQuery
             *
             * @property $groupElement
             * @type {HTMLElement}
             */
            this.$groupElement = $('<div class="group-container btn-group"></div>');
            /**
             * Reference to the Toolbar that contains this ToolbarGroup
             *
             * @property toolbar
             * @type {Object}
             */
            this.toolbar = toolbar;

            /**
             * Object that contains a string that identifies the type of control group in use (toggle, radio, link, etc.)
             * and the details of each control in the group
             *
             * @property config
             * @type {Object}
             */
            this.config = toolbarArgs;

            /**
             * Array of controls that belong to this group.
             *
             * @property controls
             * @type {Array}
             */
            this.controls = [];

            this._init();
        };

        $.extend(ToolbarGroup.prototype = {
            constructor : ToolbarGroup,
            /**
             * Initialization method of the ToolbarGroup
             *
             * @method _init
             * @private
             */
            _init : function () {
                //switch on the type of the group being passed in
                //possible values : 'toggle', 'radio', 'list', 'single', 'link', 'color', 'fontSize'
                //the group type is passed to createGroup as well as the list of controls to be in that group
                switch (this.config.type) {
                    case 'toggle':
                        this.$groupElement.attr('data-toggle', 'buttons-checkbox'); //bootstrap effect
                        this._createGroup(ToggleButton, this.config.controls);
                        break;
                    case 'radio':
                        this.$groupElement.attr('data-toggle', 'buttons-radio'); //bootstrap effect
                        this._createGroup(RadioButton, this.config.controls);
                        break;
                    case 'fontNameList':
                        this._createGroup(List, this.config.controls);
                        break;
                    case 'fontSizeList':
                        this._createGroup(List, this.config.controls);
                        break;
                    case 'single':
                        this._createGroup(SingleFireButton, this.config.controls);
                        break;
                    case 'link':
                        this._createGroup(HyperlinkButton, this.config.controls);
                        break;
                    case 'color':
                        this._createGroup(ColorButton, this.config.controls);
                        break;
                }
            },
            /**
             * Calls render on each control in the ToolbarGroup
             *
             * @method render
             */
            render : function () {
                var that = this;

                that.toolbar.$toolbarElement.append(that.$groupElement);

                //render the controls of this group
                _.each(that.controls, function (control) {
                    control.render();
                });
            },
            /**
             * Calls destroy on each control in the ToolbarGroup
             *
             * @method destroy
             */
            destroy : function () {
                _.each(this.controls, function (control) {
                    control.destroy();
                });
            },
            /**
             * Creates each individual control and adds it to the controls array.
             *
             * @method _createGroup
             * @param ControlType Type of control to be created, passed in as a functor from _init
             * @param controlList The list of controls to instantiate
             * @private
             */
            _createGroup : function (ControlType, controlList) {
                var that = this;

                //create the control and add it to this group
                _.each(controlList, function (control) {
                    that.controls.push(new ControlType(control, that));
                });
            },
            /**
             * Updates the status of each control in this ToolbarGroup
             *
             * @method updateControls
             */
            updateControls : function () {
                //update the display of each control in this group
                _.each(this.controls, function (control) {
                    control.updateStatus();
                });
            }
        });

        return ToolbarGroup;

    });
define('oui.editor/toolbar/toolbar',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/toolbarGroup', 'oui.editor/toolbar/controlConfig'],
    function ($, _, ToolbarGroup, ControlConfig) {
        

        /**
         * The class that handles the creation and updating of the toolbar control groups.  Allows you to issue commands
         * such as update, render, and destroy to a group of controls.
         *
         * @class Toolbar
         * @since 1.2.0
         * @constructor
         * @param widget The editor widget containing all of the options and parameters needed to create the toolbar
         */
        var Toolbar = function (widget) {
            /**
             * A reference to the core widget that controls the whole editor
             *
             * @property widget
             * @type Object
             */
            this.widget = widget;

            /**
             * A reference to the widget's view
             *
             * @property editorView
             * @type Object
             */
            this.editorView = widget.view;

            /**
             * Array of references to the toolbar control groups
             *
             * @property groupDefinitions
             * @type {Array}
             */
            this.groupDefinitions = [];

            /**
             * Reference to the toolbar's HTML element within the view
             *
             * @property $toolbarElement
             * @type {HTMLelement}
             */
            this.$toolbarElement = this.editorView.markup.$toolbar;

            this._init();
        };

        $.extend(Toolbar.prototype = {
            constructor : Toolbar,
            /**
             * Initialization method of the toolbar
             *
             * @method _init
             * @private
             */
            _init : function () {
                this._createGroups();

                this.render();
            },
            /**
             * Calls destroy on each toolbar group
             *
             * @method destroy
             */
            destroy : function () {
                //call destroy on groups
                _.each(this.groupDefinitions, function (group) {
                    group.destroy();
                });
            },
            /**
             * Calls render on each toolbar group
             *
             * @method render
             */
            render : function () {
                var that = this;

                //render each group
                _.each(that.groupDefinitions, function (group) {
                    group.render();
                });
            },
            /**
             * Creates each toolbar group and adds it to this.groupDefinitions
             *
             * @method _createGroups
             * @private
             */
            _createGroups : function () {
                var that = this;

                //create a toolbar group for each item in toolbarConfig
                //and add it to the list of groups i.e. this.groupDefinitions
                _.each(ControlConfig.toolbarConfig, function (toolbarGroupArgs) {
                    that.groupDefinitions.push(new ToolbarGroup(toolbarGroupArgs, that));
                });
            },
            /**
             * Calls update on each toolbar group
             *
             * @method updateToolbar
             */
            updateToolbar : function () {
                //update the display of each of the groups
                _.each(this.groupDefinitions, function (group) {
                    group.updateControls();
                });
            }
        });

        return Toolbar;

    });
define('oui.editor/actionController',['oui.jquery', 'oui.underscore', 'oui.bootstrap'],
    function ($, _) {
        

        /**
         * The wrapper class that handles execCommand, queryCommandValue, and queryCommandState.  These functions are
         * responsible for handling the editing of the markup contained in the view in a cross-browser friendly manner.
         *
         * @class ActionController
         * @since 1.2.0
         * @constructor
         * @param widget The editor widget
         */
        var ActionController = function (widget) {
            /**
             * A reference to the core widget that controls the whole editor
             *
             * @property widget
             * @type Object
             */
            this.widget = widget;
        };

        _.extend(ActionController.prototype = {
            constructor : ActionController,
            /**
             * Invoke the browser execCommand method to apply the supplied command to the selected text
             * (or just at the caret position if there is no range selected).  When this method is invoked, it also sets
             * the widget's dirty flag.
             *
             * @method triggerAction
             * @param command The name of the execCommand command to be used
             * @param args The arguments used in conjunction with the command
             * @return {Boolean} Return true if the command was successfully executed or false if otherwise.
             */
            triggerAction : function (command, args) {
                //put focus back on editor
                this.widget.setDirty(true);
                return this.widget.view.document.execCommand(command, false, args);
            },
            /**
             * Check to see if the current selection contains styles associated with the command passed to this function
             * (i.e. if you pass 'bold' to this function, it will return true if the selection is within <b></b> tags)
             *
             * @method queryState
             * @param command The name of the execCommand command whose status is being checked
             * @return {Boolean} Return true if the selection has styles consistent with the command supplied;
             * return false otherwise
             */
            queryState : function (command) {
                return this.widget.view.document.queryCommandState(command);
            },
            /**
             * If a command has a value associated with it (i.e. 'fontname' has different font names, 'fontsize' has
             * different sizes), return that value.
             *
             * @method queryState
             * @param command The name of the execCommand command whose value is being checked
             * @return {Boolean} Return the actual value of the specified command.
             * Return false if no value belongs to the specified command.
             */
            queryValue : function (command) {
                return this.widget.view.document.queryCommandValue(command);
            },
            /**
             * Get the anchor tag that is located within the user's text selection.
             *
             * @method getAnchor
             * @return {Object} Returns the anchor tag that is located in the user's text selection.
             * Returns null if no anchor tag is selected.
             */
            getAnchor : function () {
                //compatibility check
                if (!$.browser.msie) {
                    return w3GetAnchor(this.widget.view.window);
                }
                else {
                    return ieGetAnchor(this.widget.view.window);
                }
            }
        });


        function w3GetAnchor(iframeWindow) {
            if(iframeWindow.getSelection().type !== 'None'){
                var range = iframeWindow.getSelection().getRangeAt(0);
                var container = range.commonAncestorContainer;
                return getAncestor(container, 'A');
            }

            return null;
        }

        function ieGetAnchor(iframeWindow) {
            //needs to be finished
            var selection = iframeWindow.document.selection;
            var range = selection.createRange();
            var elt = range.parentElement();

            return getAncestor(elt, 'A');
        }

        function getAncestor(element, ancestorToFind) {
            while (element.nodeName !== 'BODY') {
                if (element.nodeName === ancestorToFind) {
                    return element;
                }
                element = element.parentNode;
            }

            return null;
        }

        return ActionController;


    });

define('oui.editor/editorWidget',['oui.jquery', 'oui.underscore', 'oui.editor/editorView', 'oui.editor/toolbar/toolbar',
    'oui.editor/actionController', 'oui.jqueryui'],
    function ($, _, EditorView, Toolbar, ActionController) {
        

        /**
         * A rich-text-editor widget that allows for inline editing of text including decorations, font size, font face,
         * links, and more.
         *
         * Example creation with default options:
         *
         *     $('selector').editor({});
         *
         * @class Editor
         * @since 1.2.0
         **/

        $.widget('orcl.editor', {

            //default options
            options : {
                /**
                 * Property that governs whether or not the widget is resizable.
                 *
                 * @property values
                 * @type Boolean
                 * @default false
                 */
                resizable : false,
                /**
                 * Property that governs the height of the widget
                 *
                 * @property height
                 * @type Integer
                 * @default 300
                 */
                height : 300,
                /**
                 * Property that governs the width of the widget
                 *
                 * @property width
                 * @type Integer
                 * @default 900
                 */
                width : 900,
                /**
                 * Property that sets the default value of the editor.
                 *
                 * @property defaultText
                 * @type String
                 * @default '<br/>'
                 */
                defaultText : '<br/>'
            },
            /**
             * This is the constructor that gets called when initializing a JQuery UI widget.
             *
             * See [JQuery UI Widget Factory _create](http://api.jqueryui.com/jQuery.widget/#method-_create) for more details.
             *
             * @private
             * @method _create
             */
            _create : function () {
                this.widgetEventPrefix = this.widgetEventPrefix + '-';

                //create a unique id used in the widget
                this.id = _.uniqueId();

                //editor view
                this.view = new EditorView(this);

                //establish the toolbar
                this.toolbar = new Toolbar(this);

                //controls the actual document editing process
                this.actionController = new ActionController(this);

                //will be set to true when the editor text changes
                this.dirty = false;

                //set default text
                //this.view.setText(this.options.defaultText);
            },
            /**
             * This method is called when new options are supplied. An example of this can be:
             *
             *      $('.some_class').comboBox({defaultValue : 'newVal'});
             *
             * @private
             * @method _setOption
             * @param {String} key The option key to update
             * @param {String} value The value the new key should hold
             */
            _setOption : function (key, value) {
                //TODO: update options;
                console.log(key + ' ' + value);
            },
            /**
             * Widget specific clean up and removal of element
             *
             * @private
             * @method _destroy
             */
            _destroy : function () {
                //TODO: make this better
                this.view.remove();
            },
            /**
             * Sets the content of the editor equal to the string of HTML markup passed to it
             *
             * @param markup
             * @method setText
             * @return {String} HTML markup in the editor
             */
            setText : function (markup) {
                return this.view.setText(markup);
            },
            /**
             * Gets the content of the editor equal to the string of HTML markup it contains
             *
             * @method getText
             * @return {String} HTML markup in the editor
             */
            getText : function () {
                return this.view.getText();
            },
            /**
             * Method to check whether the editor has been modified since it was last saved (i.e. is dirty)
             *
             * @method isDirty
             * @return {Boolean} Flag indicating whether the editor is dirty or not
             */
            isDirty : function () {
                return this.dirty;
            },
            /**
             * Sets the widget's dirty flag to either true or false.
             *
             * @method setDirty
             * @param dirty boolean flag indicating whether the the editor should be marked as dirty or not
             */
            setDirty : function (dirty) {
                var that = this;

                if (dirty) {
                    that.view.markup.$richTextEditor.trigger('dirty');

                    that.dirty = true;
                }
                else {
                    that.dirty = false;
                }
            }
        });
    }
);

/**
 * Provides a single point of entry to require all the submodules
 *
 * @module oui
 **/
define('oui',['oui.picker/pickerWidget',
        'oui.typeAhead/typeAheadWidget',
        'oui.splitPane/splitPaneWidget',
        'oui.date/dateWidget',
        'oui.spinner/spinnerWidget',
        'oui.slider/sliderWidget',
        'oui.file/fileWidget',
        'oui.utils/fadeSwap',
        'oui.utils/formWalker',
        'oui.tree/treePanel',
        'oui.combo/comboBoxWidget',
        'oui.editor/editorWidget'], function () {});
// End oui