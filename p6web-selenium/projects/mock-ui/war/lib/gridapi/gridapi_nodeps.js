/*!
 * Grid api
 * Version 1.2.0
 */

define('gridapi.utils/template',['gridapi.underscore'], function (_) {

    return function (str, data) {
        var origSettings = _.clone(_.templateSettings), t;
        _.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

        t = _.template(str, data);

        _.templateSettings = origSettings;

        return t;
    };
});


define('gridapi.grid/sorters',['gridapi.underscore'], function (_) {
    

    return {
        float : function (value, asc) {
            if (asc) {
                return parseFloat(value);
            }
            return -parseFloat(value);
        },
        integer : function (value, asc) {
            if (asc) {
                return parseInt(value, 10);
            }
            return -parseInt(value, 10);
        },
        string : function (value, asc) {
            // to do not modify
            return value;
        },
        date : function (value, asc) {
            if (value == null) {
                return 0;
            }
            if (!asc) {
                return -Date.parse(value);
            }
            return Date.parse(value);
        },
        check : function (value, asc) {
            if (asc) {
                return value === 'true' ? 1 : 0;
            }
            return -(value === 'true' ? 1 : 0);
        },
        enum : function (value, asc){
            if(asc){
                return value;
            }
            return -value;
        },
        picker: function (value, asc){
            if(asc){
                return value.length;
            }
            return -value.length;
        }
    };

});

define('gridapi.grid/selectionModel',['gridapi.jquery', 'gridapi.underscore'],
    function ($, _) {
        


        return function (grid) {

            if (grid == null) {
                throw new Error('SelectionModel - grid param not set');
            }
            var focus = {
                recordId : null,
                column : null,
                recordIndex : null,
                wafferId : null,
                groupId : null,
                viewport : null,
                columnIndex : null,
                $td : $()
            };
            var _cell = {

                moveUp : function () {
                    if (focus.wafferId != null) {

                        var renderLocation = 'top';
                        //Standard move up case
                        if (focus.recordIndex > 0) {
                            focus.recordIndex--;
                            //At the top of a waffer
                        } else {
                            var newWaffer = focus.viewport.wafferConfig.prev;

                            if (newWaffer != null) {
                                focus.recordIndex = grid.virtualRows[newWaffer.id].records.length - 1;
                                focus.wafferId = newWaffer.id;
                                focus.viewport = grid.viewports[newWaffer.id][focus.groupId];
                                renderLocation = 'bottom';

                                if (newWaffer.id === 'headers') {
                                    grid.widget.selectHeaderCell(focus.column);
                                    return;
                                }
                                //Nothing to go to above leave selection
                            } else {
                                return;
                            }
                        }
                        focus.recordId = grid.virtualRows[focus.wafferId].records[focus.recordIndex];
                        grid.widget.selectCell(focus.recordId, focus.column, renderLocation);
                    }
                },

                moveDown : function () {
                    if (focus.wafferId != null) {
                        var renderLocation = 'bottom';
                        //standard move down case
                        if (focus.recordIndex < grid.virtualRows[focus.wafferId].records.length - 1) {
                            focus.recordIndex++;
                            //At the bottom move to the next waffer
                        } else {
                            var newWaffer = focus.viewport.wafferConfig.next;
                            if (newWaffer != null) {
                                focus.recordIndex = 0;
                                focus.wafferId = newWaffer.id;
                                focus.viewport = grid.viewports[newWaffer.id][focus.groupId];
                                renderLocation = 'top';
                                //Nothing to go to below, leave selection
                            } else {
                                return;
                            }
                        }

                        focus.recordId = grid.virtualRows[focus.wafferId].records[focus.recordIndex];
                        grid.widget.selectCell(focus.recordId, focus.column, renderLocation);
                    }
                },

                moveLeft : function () {
                    if (focus.columnIndex != null) {
                        if (focus.columnIndex > 0) {
                            focus.columnIndex--;
                        } else {
                            var newGroup = focus.viewport.groupConfig.prev;
                            if (newGroup != null) {
                                focus.columnIndex = newGroup.columns.length - 1;
                                focus.groupId = newGroup.id;
                                focus.viewport = grid.viewports[focus.wafferId][focus.groupId];
                            } else if (focus.wafferId !== 'headers' &&
                                (focus.recordIndex > 0 || focus.viewport.wafferConfig.prev.id !== 'headers')) {
                                focus.groupId = _.last(grid.config.groups).id;
                                focus.viewport = grid.viewports[focus.wafferId][focus.groupId];
                                focus.columnIndex = focus.viewport.groupConfig.columns.length - 1;
                                focus.column = focus.viewport.groupConfig.columns[focus.columnIndex].dataIndex;
                                this.moveUp();
                                return;
                            }
                        }
                        focus.column = focus.viewport.groupConfig.columns[focus.columnIndex].dataIndex;

                        if (focus.wafferId === 'headers') {
                            grid.widget.selectHeaderCell(focus.column);
                        } else {
                            grid.widget.selectCell(focus.recordId, focus.column);
                        }

                    }
                },

                moveRight : function () {
                    if (focus.columnIndex != null) {
                        if (focus.columnIndex < focus.viewport.groupConfig.columns.length - 1) {
                            focus.columnIndex++;
                        } else {
                            var newGroup = focus.viewport.groupConfig.next;
                            if (newGroup != null) {
                                focus.columnIndex = 0;
                                focus.groupId = newGroup.id;
                                focus.viewport = grid.viewports[focus.wafferId][focus.groupId];
                            } else if (focus.wafferId !== 'headers') {
                                focus.groupId = _.first(grid.config.groups).id;
                                focus.viewport = grid.viewports[focus.wafferId][focus.groupId];
                                focus.columnIndex = 0;
                                focus.column = focus.viewport.groupConfig.columns[focus.columnIndex].dataIndex;
                                this.moveDown();
                            }

                        }
                        focus.column = focus.viewport.groupConfig.columns[focus.columnIndex].dataIndex;

                        if (focus.wafferId === 'headers') {
                            grid.widget.selectHeaderCell(focus.column);
                        } else {
                            grid.widget.selectCell(focus.recordId, focus.column);
                        }
                    }
                },

                firstCellInGrid : function () {
                    focus.column = _.first(_.first(grid.config.groups).columns).dataIndex;
                    focus.recordId = _.first(grid.virtualRows[grid.config.waffers[1].id].records);
                    grid.widget.selectCell(focus.recordId, focus.column);
                },

                lastCellInGrid : function () {
                    focus.column = _.last(_.last(grid.config.groups).columns).dataIndex;
                    focus.recordId = _.last(grid.virtualRows[_.last(grid.config.waffers).id].records);
                    grid.widget.selectCell(focus.recordId, focus.column);
                },

                firstCellInRow : function () {
                    focus.column = _.first(_.first(grid.config.groups).columns).dataIndex;
                    grid.widget.selectCell(focus.recordId, focus.column);
                },

                lastCellInRow : function () {
                    focus.column = _.last(focus.viewport.groupConfig.columns).dataIndex;
                    grid.widget.selectCell(focus.recordId, focus.column);
                },

                //Called when a user clicks on a cell
                cellSelected : function ($td, skipFocus) {
                    if ($td != null && $td.length) {
                        // clear current selection
                        this.clear();

                        // cache
                        $td.addClass('cell-selected');
                        this._updateFocusModel($td);

                        // close any other open editors
                        grid.closeEditor();

                        if (!skipFocus) {
                            // draw focus to grid
                            grid.$grid.get(0).focus();
                        }
                        // move focus
                        grid.widget.selectCell(focus.recordId, focus.column);
                    }
                },

                selectCell : function ($td, skipFocus) {
                    if (focus.$td != null && focus.$td.length && focus.$td.is('.cell-selected')) {
                        focus.$td.removeClass('cell-selected');
                    }
                    this._updateFocusModel($td);
                    focus.$td = $td;
                    focus.$td.addClass('cell-selected');
                    if (!skipFocus) {
                        // draw focus to grid
                        grid.$grid.get(0).focus();
                    }
                },

                selectHeader : function (virtualRow, columnId) {
                    if (focus.$td.length && focus.$td.is('.cell-selected')) {
                        focus.$td.removeClass('cell-selected');
                    }
                    focus.$td = virtualRow.find('th[data-index="' + columnId + ['"]']);
                    focus.$td.addClass('cell-selected');
                },

                _updateFocusModel : function ($td) {
                    focus.column = $td.attr('data-index');
                    focus.recordId = $td.parent().attr('data-id');

                    focus.viewport = $td.closest('div.viewport').data().viewport;
                    focus.wafferId = focus.viewport.wafferConfig.id;
                    focus.groupId = focus.viewport.groupConfig.id;
                    focus.recordIndex = grid.getRecordIndex(focus.recordId, focus.wafferId);

                    for (var j = 0; j < focus.viewport.groupConfig.columns.length; j++) {
                        if (focus.viewport.groupConfig.columns[j].dataIndex === focus.column) {
                            focus.columnIndex = j;
                            break;
                        }
                    }

                    focus.$td = $td;
                },

                clear : function () {
                    grid.$grid.find('.cell-selected').removeClass('cell-selected');
                }
            };
            var that = {

                get focus() {
                    return focus;
                },

                get cell() {
                    return _cell;
                },

                getShiftSelection : function ($tr) {
                    var selectedWaffer = focus.wafferId;
                    var clickedWaffer = $tr.closest('div.viewport').data().viewport.waffer;
                    var selection = [];

                    if (selectedWaffer === clickedWaffer) {
                        var lowerBounds, upperBounds,
                            currentIndex = focus.recordIndex,
                            clickedIndex = grid.getRecordIndex($tr.attr('data-id'), clickedWaffer);

                        if (currentIndex > clickedIndex) {
                            lowerBounds = clickedIndex;
                            upperBounds = currentIndex;
                        } else {
                            lowerBounds = currentIndex;
                            upperBounds = clickedIndex;
                        }

                        selection = grid.virtualRows[focus.wafferId].records.slice(lowerBounds, upperBounds + 1);
                    }

                    return selection;
                }
            };
            return that;
        };
    })
;
define('gridapi.grid/columns/core/columnResizeFns',['gridapi.jquery', 'gridapi.underscore'], function ($, _) {
    

    return function (grid) {
        var $columnResizeLine = $('<div class="col-resize-line hidden"></div>');
        var MINIMUM_WIDTH_BUMPER = grid.options.sizing.minColumnWidth,
            $th = $(),
            gridOffset,
            viewportOffset,
            thCurrentWidth,
            thPositionleft,
            thOffset,
            maxDrag = {};

        // add column resize bar after table markup
        grid.$grid.append($columnResizeLine);

        /**
         * Mousemove function
         */
        var mousemoveFn = function () {
            return function (event) {
                // left click button
                if (event.which === 1) {
                    calcColumnResizeBarFn(event.clientX + $(window).scrollLeft());
                }
            };
        };

        /**
         * Mouseup function
         */
        var mouseupFn = function () {
            return function (event) {
                if (event.which === 1) {
                    // switch of mouse events
                    grid.$grid.off('mousemove');
                    $(document.body).off('mouseup');

                    // remove resizing styles
                    $th.parent().removeClass('resize');

                    var distanceFromViewEdge = $columnResizeLine.offset().left - viewportOffset,
                        visibleAmount = $th.closest('table').position().left + thPositionleft + thCurrentWidth,
                        width = distanceFromViewEdge + thCurrentWidth - visibleAmount,
                        dataIndex = $th.attr('data-index');
                    grid.viewports['$group-' + $th.closest('div.viewport').data('group')]
                        .find('th[data-index="' + dataIndex + '"]').attr('width', width);
                    grid.columnDefinitions[dataIndex].width = width;
                    grid.widget._trigger('view-updated', null, {action: 'column-resize', column : $th.attr('data-index'), size : width} );
                    $columnResizeLine.addClass('hidden');
                    grid.resize();
                }
            };
        };

        /**
         * This function needs to be FAST as it occurs in mousemove
         * @param clientX - x coordinate of the mouse
         */
        var calcColumnResizeBarFn = function (clientX) {
            //Check minimum width, check if its within the viewport.
            if ((thOffset + MINIMUM_WIDTH_BUMPER) < clientX && clientX >= maxDrag.left &&  clientX < maxDrag.right) {
                $columnResizeLine.css('left', clientX - gridOffset);
            }

            // using css here instead of show and hide as will be quicker
            $columnResizeLine.removeClass('hidden');
        };

        return {
            /**
             * Trigger column resize
             * @param $column - column being resized
             * @param clientX - start position of column resize drag
             */
            initColumnResize : function ($columnHeader, clientX) {
                $th = $columnHeader;
                $th.parent().addClass('resize');
                gridOffset =grid.$grid.offset().left;
                var $viewport = $columnHeader.closest('div.viewport');
                viewportOffset = $viewport.offset().left;
                maxDrag.left = viewportOffset + 5;
                maxDrag.right = viewportOffset + $viewport.width() + 150;
                thCurrentWidth = parseInt($th.attr('width'), 10);
                thPositionleft = $columnHeader.position().left;
                thOffset = $columnHeader.offset().left;
                // add class for resizing column styles

                // switch mouse move and down event to on
                grid.$grid.on('mousemove', mousemoveFn());
                $(document.body).on('mouseup', mouseupFn());

                // move column resize bar into position
                calcColumnResizeBarFn(clientX + $(window).scrollLeft());
            }
        };
    };
});

define('gridapi.grid/columns/core/columnMover',['gridapi.jquery', 'gridapi.underscore'], function ($, _) {
    


    return function (grid) {
        var $columnMoveShade = grid.$grid.find('.col-move-shade'),
        $columnMoveBar = grid.$grid.find('.col-move-bar'),
        $colGroupDropShade = grid.$grid.find('.col-group-drop-shade'),
        appendBeforeIndex, currentIndex, columns = [], $th = $(), viewport, offsets = {}, widths = {},
            positions = {
                shade : {}
            }, direction = -1, scrollTimer, currentDropGroupViewport;

       /**
         * Mousemove function
         */
        var mousemoveFn = function () {
            return function (event) {
                // left click button
                if(event.which === 1) {
                    onMoveFn(event.clientX + $(window).scrollLeft());
                }
            };
        };
        var onMoveFn = function (mouseX) {
            direction = mouseX - offsets.grid - positions.pointer;
            positions.pointer = mouseX - offsets.grid;
            positionShadeFn();
            if(currentDropGroupViewport == null) {
                calcColumnMoveFn();
            }
        };
        /**
         * Mouseup function
         */
        var mouseupFn = function () {
            return function (event) {
                if(event.which === 1) {
                    // switch of mouse events
                    grid.$grid.off('mousemove.col-move');
                    $(document.body).off('mouseup.col-move');
                    if(scrollTimer != null) {
                        clearTimeout(scrollTimer);
                        scrollTimer = null;
                    }

                    if(currentDropGroupViewport == null) {
                        moveColumnFn();
                        grid.widget._trigger('view-updated', null, {action : 'column-move', column : $th.attr('data-index')});
                    } else {
                        dropIntoGroupFn();
                        grid.widget._trigger('view-updated', null, {action : 'column-drop', column : $th.attr('data-index'), viewport : currentDropGroupViewport.group, origin : viewport.group });
                    }


                    // hide the column move shade and bar
                    $colGroupDropShade.hide();
                    $columnMoveBar.hide();
                    $columnMoveShade.hide();
                    $th.removeClass('col-moving');

                    //This is very important. Dont ever comment it out. Commenting it out is bad for you.
                    columns = [];
                }
            };
        };

        var moveColumnFn = function () {
            if(currentIndex + 1 !== appendBeforeIndex && currentIndex !== appendBeforeIndex) {
                _.each(['thead', 'tbody', 'tfoot'], function (tag) {
                    _.each(grid.viewports['$group-' + viewport.group].find(tag).children(), function (tr, index) {
                        var $ths = $(tr).children(),
                            $thDrag = $ths.eq(currentIndex),
                            $thDrop = $ths.eq(appendBeforeIndex < columns.length ? appendBeforeIndex : appendBeforeIndex - 1);
                        if(appendBeforeIndex < columns.length) {
                            $thDrop.before($thDrag);
                        } else {
                            $thDrop.after($thDrag);
                        }
                    });
                });
                var indexToInsert = currentIndex > appendBeforeIndex ? appendBeforeIndex : appendBeforeIndex -1;
                var columnGroup = viewport.groupConfig.columns.splice(currentIndex,1)[0];
                viewport.groupConfig.columns.splice(indexToInsert, 0, columnGroup);
            }
        };

        var dropIntoGroupFn = function () {
            var dropGroup = currentDropGroupViewport.group;
            var headersToMove = grid.viewports['$group-' + viewport.group].find('th:eq(' + currentIndex + ')');
            var cellsToMove = grid.viewports['$group-' + viewport.group].find('tbody').children().find('td:eq(' + currentIndex + ')');
            var footerCellsToMove = grid.viewports['$group-' + viewport.group].find('tfoot').children().find('td:eq(' + currentIndex + ')');
            _.each(grid.viewports['$group-' + dropGroup].find('thead').children(), function (tr, index) {
                $(tr).append(headersToMove.eq(index));
            });
            _.each(grid.viewports['$group-' + dropGroup].find('tbody').children(), function (tr, index) {
                $(tr).append(cellsToMove.eq(index));
            });
            _.each(grid.viewports['$group-' + dropGroup].find('tfoot').children(), function (tr, index) {
                $(tr).append(footerCellsToMove.eq(index));
            });

            var currentGroupConfig = viewport.groupConfig;
            var newGroupConfig = grid.viewports[_.first(grid.config.waffers).id][dropGroup].groupConfig;
            newGroupConfig.columns.push(currentGroupConfig.columns.splice(currentIndex, 1)[0]);
            grid.resize();
        };

        /**
         * This function needs to be FAST as it occurs in mousemove
         * @param clientX - x coordinate of the mouse
         */
        var calcColumnMoveFn = function () {
            positions.table = viewport.$table.position().left;
            if(direction > 0 && appendBeforeIndex < columns.length) {
                if(positions.shade.right > columns[appendBeforeIndex].middle + positions.table) {
                    appendBeforeIndex++;
                    positionMoveBarFn();
                }
            } else if(direction < 0 && appendBeforeIndex > 0) {
                if(positions.shade.left < columns[appendBeforeIndex - 1].middle + positions.table) {
                    appendBeforeIndex--;
                    positionMoveBarFn();
                }
            }
        };

        var positionShadeFn = function () {
            if(scrollTimer != null) {
                clearTimeout(scrollTimer);
                scrollTimer = null;
            }

            var leftPosition = positions.pointer - widths.thMiddle,
                scrollAmount = 0;
            //Check if its the moving within the same viewport
            if(leftPosition > offsets.viewport && (leftPosition + widths.th) < offsets.viewportRight) {
                $columnMoveShade.css('left', leftPosition);
                positions.shade.left = leftPosition - offsets.viewport;
                positions.shade.right = positions.shade.left + widths.th;
                $columnMoveShade.show();
                currentDropGroupViewport = null;
                return;
            }
            //If outside of viewport check others
            if(positions.pointer < offsets.viewport || positions.pointer > offsets.viewportRight) {
                positionViewportDrop();
                return;
            } else {
                $colGroupDropShade.hide();
                currentDropGroupViewport = null;
            }

            //Check boundaries of the current viewport to see if it needs to scroll
            if(leftPosition < offsets.viewport) {
                leftPosition = offsets.viewport;
                scrollAmount = 15;
            } else if((leftPosition + widths.th) > offsets.viewportRight) {
                leftPosition = offsets.viewport + widths.viewport - widths.th;
                scrollAmount = -15;
            }
            //Duplication for speed
            positions.shade.left = leftPosition - offsets.viewport;
            positions.shade.right = positions.shade.left + widths.th;
            $columnMoveShade.css('left', leftPosition);
            $columnMoveShade.show();
            //scroll if on edge
            if(viewport.groupConfig.type === 'flex' && scrollAmount !== 0) {

                scrollTimer = setInterval(function () {
                    scrollFn(scrollAmount);
                }, 150);
            }
        };

        var scrollFn = function (amount) {
            var $scroller = grid.pseudoScrollers.horizontal[viewport.group].$scroller;
            $scroller.scrollLeft($scroller.scrollLeft() - amount);
            direction = -amount;
            calcColumnMoveFn();
        };
        var withinViewportFn = function (viewToCheck) {
            var values = {};
            values.left = viewToCheck.offset().left - offsets.grid;
            values.width = viewToCheck.width();
            values.right = values.left + values.width;
            values.fits = positions.pointer < values.right && positions.pointer > values.left;
            values.group = viewToCheck.data('group');
            values.$viewport = viewToCheck;
            return values;
        };

        var positionViewportDrop = function () {
            var groupToCheck, dropViewport;
            //Check if its the current drop viewport still
            if(currentDropGroupViewport != null && (positions.pointer < currentDropGroupViewport.right && positions.pointer > currentDropGroupViewport.left)) {
                return;
            }
            //If not check the viewports to the left and right of the current based on mouse position.
            if(positions.pointer < offsets.viewport) {
                groupToCheck = viewport.groupConfig.prev;  //Check left
                while (groupToCheck != null) {
                    dropViewport = withinViewportFn(grid.viewports[grid.firstWaffer.id][groupToCheck.id].$viewport);
                    if(dropViewport.fits) {
                        break;
                    } else {
                        dropViewport = null;
                        groupToCheck = groupToCheck.prev;
                    }
                }
            } else {
                groupToCheck = viewport.groupConfig.next; //Check right
                while (groupToCheck != null) {
                    dropViewport = withinViewportFn(grid.viewports[grid.firstWaffer.id][groupToCheck.id].$viewport);
                    if(dropViewport.fits) {
                        break;
                    } else {
                        dropViewport = null;
                        groupToCheck = groupToCheck.next;
                    }
                }
            }
            //If none hide it
            if(dropViewport == null) {
                $colGroupDropShade.hide();
                $colGroupDropShade.css('width', 0);
                $colGroupDropShade.css('left', 0);
                currentDropGroupViewport = null;
            } else {
                if(currentDropGroupViewport !== dropViewport) {
                    //Check that you can drop into the viewport
                    if(grid.widget._trigger('before-change-column-group', null, {currentGroup : viewport.group, dropGroup : dropViewport.group, column : $th.attr('data-index') }) === false) {
                        return;
                    }
                    $colGroupDropShade.css('width', dropViewport.width);
                    $colGroupDropShade.css('left', dropViewport.left);
                    currentDropGroupViewport = dropViewport;
                }
                $colGroupDropShade.show();
                $columnMoveBar.hide();
                $columnMoveShade.hide();
            }
        };


        var positionMoveBarFn = function () {
            var activeColumn = columns[appendBeforeIndex];
            if(appendBeforeIndex - 1 === currentIndex) {
                activeColumn = columns[currentIndex];
            } else if(appendBeforeIndex === columns.length) {
                activeColumn = columns[appendBeforeIndex - 1];
            }

            positions.line = activeColumn.$th.offset().left - offsets.grid;
            //Adjust for last column
            if(appendBeforeIndex === columns.length) {
                positions.line += activeColumn.width;
            }
            //Adjust line for scrolling to keep it in viewport
            if(positions.line > offsets.viewportRight) {
                positions.line = offsets.viewportRight;
            } else if(positions.line < offsets.viewport) {
                positions.line = offsets.viewport;
            }
            $columnMoveBar.css('left', positions.line);
            $columnMoveBar.show();


        };

        var updateColumnsFn = function () {
            _.each(viewport.$thead.children().children(), function (th) {
                var $header = $(th);
                if($header.attr('data-index') !== 'row-selector') {
                    var colLeft = $header.position().left;
                    var width = parseInt($header.attr('width'), 10);
                    columns.push({
                        dataIndex : $header.attr('data-index'),
                        $th : $header,
                        left : colLeft,
                        right : colLeft + width,
                        width : width,
                        middle : colLeft + width / 2
                    });
                    if($th.data('index') === $header.data('index')) {
                        currentIndex = columns.length - 1;
                        appendBeforeIndex = currentIndex + 1;
                    }
                }
            });
        };

        return {

            initColumnDrag : function ($column, activeViewport, mouseX) {
                $th = $column;
                viewport = activeViewport;

                $th.addClass('col-moving');
                offsets.grid = grid.$grid.offset().left;
                offsets.viewport = viewport.$viewport.offset().left - offsets.grid;

                widths.th = parseInt($th.attr('width'), 10);
                widths.thMiddle = widths.th / 2;
                widths.viewport = viewport.$viewport.width();
                offsets.viewportRight = offsets.viewport + widths.viewport;

                positions.pointer = mouseX - offsets.grid;
                $columnMoveShade.css('width', widths.th);

                updateColumnsFn();
                currentDropGroupViewport = null;
                // switch mouse move and down event to on
                grid.$grid.on('mousemove.col-move', _.throttle(mousemoveFn(), 20));
                $(document.body).on('mouseup.col-move', mouseupFn());
                onMoveFn(mouseX + $(window).scrollLeft());
            }
        };

    };
});
define('gridapi.text',{load: function(id){throw new Error("Dynamic load not allowed: " + id);}});
define('gridapi.templates/grid/templates/grid.htm',[],function () { return '<script type="text/html" class="htm-grid-layout">\n    <div class="scrolly-grid" tabIndex="0">\n\n        <div class="col-move-shade" style="top : 34px;"></div>\n        <div class="col-move-bar" style="top : 34px;"></div>\n        <div class="col-group-drop-shade"></div>\n        <div class="row-move-shade"><div class="count"><span></span></div></div>\n        <div class="row-move-bar"></div>\n        <div class="waffer-drop-shade"></div>\n    </div>\n</script>\n\n<script type="text/html" class="htm-scroll-shims">\n    <div class="bottom-scroll-shim"></div>\n    <div class="right-scroll-shim"></div>\n</script>\n\n<script type="text/html" class="htm-viewport">\n    <div class="viewport viewport-<%=type%> viewport-<%=waffer%>" data-waffer=<%=waffer%> data-group=<%=group%>\n        id="<%=waffer%>-<%=group%>">\n        <table class="pgbu-grid">\n            <thead></thead>\n            <tbody></tbody>\n            <tfoot></tfoot>\n        </table>\n    </div>\n</script>\n\n<script type="text/html" class="htm-waffer-flex">\n    <div class="grid-waffer waffer-flex waffer-<%=id%>" data-id=<%=id%> data-type="flex">\n    </div>\n</script>\n\n<script type="text/html" class="htm-waffer-fixed">\n    <div class="grid-waffer waffer-fixed waffer-<%=id%>" data-id=<%=id%> data-type="fixed"></div>\n</script>\n\n<script type="text/html" class="htm-row">\n    <tr data-id="<%=id%>" data-group-id=<%=groupId%>></tr>\n</script>\n\n<script type="text/html" class="htm-pseudoscroller">\n    <div class="pseudo-scroller <%=type%>" id="scroller-<%=id%>">\n        <div class="empty-content"></div>\n    </div>\n</script>\n\n<script type="text/html" class="htm-header-col">\n    <th class="pgbu-cell" title="<%=tooltip%>" data-index="<%=dataIndex%>" width="<%=width%>">\n        <div class="<%=align%>"><%=title%></div>\n    </th>\n</script>\n<script type="text/html" class="htm-header-shim">\n    <th class="pgbu-cell header-shim" data-index="<%=dataIndex%>" width=<%=width%>></th>\n</script>\n<script type="text/html" class="htm-group-resizer">\n    <div class="group-resize-bar group-<%=id%>" data-group=<%=id%>>\n        <div class="resize-line"></div>\n    </div>\n</script>\n\n<script type="text/html" class="menu-container-markup">\n    <ul class="menu-container"></ul>\n</script>\n\n<script type="text/html" class="sub-menu-container-markup">\n    <div class="sub-menu-container"></div>\n</script>\n\n\n<script type="text/html" class="menu-item-template">\n    <li class="menu-item">\n        <div class="menu-icon" ></div>\n        <%=name%>\n    </li>\n</script>\n\n<script type="text/html" class="switchable-filter-interface">\n    <div class="switchable-filter-interface">\n        <div class="radio-container">\n            <div class="range">\n                <input type="radio" name="switchable" >\n            </div>\n            <div class="equals">\n                <input type="radio" name="switchable">\n            </div>\n        </div>\n\n        <div class="switchable-inputs-container">\n            <div class="switchable-top">\n                <div class="inputs-range-container">\n                    <div class="switchable-input-greater">\n                        <div class="icon"><</div>\n                        <div class="content">\n                            <input type="text" class="greater" />\n                        </div>\n                    </div>\n                    <div class="switchable-input-lesser">\n                        <div class="icon">></div>\n                        <div class="content">\n                            <input type="text" class="lesser" />\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="switchable-bottom">\n                <div class="inputs-equals-container">\n                    <div class="switchable-input-equals">\n                        <div class="icon">=</div>\n                        <div class="content">\n                            <input type="text" class="equals" />\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</script>\n\n\n';});

define('gridapi.grid/sizeFns',['gridapi.jquery', 'gridapi.underscore'],
    function ($, _) {
        

        // changes made reduced time from 0.8s to 0.4s in chrome
        var ROW_HEIGHT = 31;

        function getGroupColumnWidths(group) {
            var groupWidth = 2;
            _.each(_.pluck(_.filter(group.columns, function (column) {
                return column.visible;
            }), 'width'), function (width) {
                groupWidth += parseInt(width, 10);
            });
            group.combinedColumnWidth = groupWidth;
            return groupWidth;
        }

        /**
         * Called when group resizing occurs from dragging the blue line. This will
         * readjust the widths
         */
        function changeGroupSize(groups, groupToChange, newWidth) {
            var widthChange = newWidth - groupToChange.width;
            groupToChange.width = newWidth;
            var flexGroups = _.filter(groups, function (group) {
                if (group.type === 'flex' && group.id !== groupToChange.id) {
                    return true;
                }
            });
            var totalWidth = 0;
            _.each(_.pluck(flexGroups, 'width'), function (width) {
                totalWidth += width;
            });
            _.each(flexGroups, function (group) {
                var percent = group.width / totalWidth;
                group.width = group.width - parseInt(widthChange * percent, 10);
            });
        }

        function getWafferHeight(virtualRows) {
            return (virtualRows.records.length + (virtualRows.headerRow ? 1 : 0)) * ROW_HEIGHT;
        }

        return {


            resizeWaffersFn : function (grid, requiresVerticalShim) {
                var topCalculation = 1;
                _.each(grid.config.waffers, function (waffer) {
                    if (!_.isNull(waffer.calculatedHeight) && !_.isUndefined(waffer.calculatedHeight)) {
                        var $waffer = grid.$waffers[waffer.id];
                        $waffer.css('height', waffer.calculatedHeight);
                        if (requiresVerticalShim) {
                            $waffer.css('margin-right', '15px');
                        } else {
                            $waffer.css('margin-right', '0');
                        }
                        if (waffer.type === 'flex') {
                            var pseudoScroller = grid.pseudoScrollers.vertical[waffer.id];
                            pseudoScroller.$scroller.css('height', waffer.calculatedHeight);
                            pseudoScroller.$scroller.css('top', topCalculation);
                            pseudoScroller.$content.css('height', waffer.contentHeight);
                            pseudoScroller.$scroller.scrollTop(grid.virtualRows[waffer.id].displayTop * ROW_HEIGHT);
                        }
                        topCalculation += waffer.calculatedHeight + 2;
                        grid.virtualRows[waffer.id].visibleRows = Math.floor(waffer.calculatedHeight / ROW_HEIGHT);
                    }
                });
            },

            resizeGroupsFn : function (grid, gridHeight) {
                var usedWidth = 0;
                var borderOffset = 0;
                _.each(grid.config.groups, function (group) {
                    if (!_.isNull(group.width) && !_.isUndefined(group.width)) {
                        borderOffset = borderOffset + 2;
                        grid.viewports['$group-' + group.id].css('width', group.width - 2); //-2 for borders of viewport
                        if (group.type === 'flex') {
                            var resizer = grid.resizers.group[group.id];
                            if (resizer != null) {
                                resizer.$selector.css('left', usedWidth + group.width - borderOffset); //handle borders
                            }
                            var pseudoScroller = grid.pseudoScrollers.horizontal[group.id];
                            pseudoScroller.$scroller.css('width', group.width);
                            pseudoScroller.$scroller.css('left', usedWidth);
                            pseudoScroller.$content.css('width', group.combinedColumnWidth);
                            pseudoScroller.$scroller.css('top', gridHeight - 15);
                        }
                        usedWidth += group.width + 2;
                    }
                });
            },

            calculateWafferHeights : function (grid, gridHeight, requiresShim) {
                var fixedHeightSpace = 0,
                    height = 0,
                    requiresVerticalShim = false;

                gridHeight -= grid.config.waffers.length * 2;
                if (requiresShim) {
                    gridHeight -= grid.options.scrollbar.extraHeight;
                }
                //Calculate the space required for the header and any fixed waffers
                var fixedWaffers = _.filter(grid.config.waffers, function (waffer) {
                    return waffer.type === 'fixed';
                });

                _.each(fixedWaffers, function (waffer) {
                    if (waffer.height != null) {
                        height = waffer.height;
                    } else {
                        height = getWafferHeight(grid.virtualRows[waffer.id]);
                    }
                    waffer.calculatedHeight = height;
                    fixedHeightSpace += height;
                });

                //Calculate the proper percentages for the flexible waffers
                var flexWaffers = _.filter(grid.config.waffers, function (waffer) {
                    return waffer.type === 'flex';
                });

                var availableHeight = (gridHeight - fixedHeightSpace);
                var allocatedSpace = 0;
                _.each(flexWaffers, function (waffer, index) {
                    var newHeight = parseInt(availableHeight * (waffer.percent / 100), 10);
                    var contentHeight = getWafferHeight(grid.virtualRows[waffer.id]);
                    if (waffer.squash && newHeight > contentHeight) {
                        newHeight = contentHeight;
                    }
                    if (contentHeight > newHeight) {
                        requiresVerticalShim = true;
                    }
                    allocatedSpace += newHeight;
                    //Take up additional space if it is not told to squash
                    if (index + 1 === flexWaffers.length && (waffer.squash == null || !waffer.squash)) {
                        newHeight = newHeight + (availableHeight - allocatedSpace);
                    }
                    waffer.calculatedHeight = newHeight;
                    waffer.contentHeight = contentHeight;
                });
                return requiresVerticalShim;
            },


            //Makes sure things can actually fit in places. Accounts for fixed Widths changing.
            calculateGroupWidths : function (grid, gridWidth, requiresShim) {
                var fixedWidth = 0,
                    flexColumnWidths = 0,
                    usedWidth,
                    requiresHorizontalShim = false;

                if (requiresShim) {
                    gridWidth -= grid.options.scrollbar.extraWidth;
                }
                var fixedGroups = _.filter(grid.config.groups, function (group) {
                    return group.type === 'fixed';
                });
                var flexGroups = _.filter(grid.config.groups, function (group) {
                    return group.type === 'flex';
                });
                //Fixed groups sizing
                _.each(fixedGroups, function (group) {
                    var width = getGroupColumnWidths(group);
                    fixedWidth += width;
                    group.width = width;
                });

                _.each(flexGroups, function (group) {
                    var groupWidth = 0;
                    var recalculatedWidths = getGroupColumnWidths(group);
                    if (group.width != null && !isNaN(group.width)) {
                        groupWidth = group.width;
                    } else {
                        groupWidth = recalculatedWidths;
                    }

                    flexColumnWidths += groupWidth;
                });

                var extraSpace = 0;
                var minimumWidth = grid.options.sizing.minGroupWidth * flexGroups.length;
                usedWidth = fixedWidth;
                var flexWidth = gridWidth - fixedWidth - minimumWidth;
                _.each(flexGroups, function (group, index) {
                    //If no space is specified use weighting based on the size of groups
                    var percent = ( group.width != null && !isNaN(group.width) ? group.width: group.combinedColumnWidth) / flexColumnWidths,
                        groupWidth = parseInt(flexWidth * percent, 10) + grid.options.sizing.minGroupWidth;

                    usedWidth += groupWidth;
                    //Make sure missed pixels get cleaned up from calculation
                    if (index === flexGroups.length - 1 && usedWidth < gridWidth) {
                        groupWidth += gridWidth - usedWidth;
                    }
                    //Don't let the group be larger than the data underneath
                    if (group.combinedColumnWidth < groupWidth) {
                        extraSpace += groupWidth - group.combinedColumnWidth;
                        groupWidth = _.clone(group.combinedColumnWidth);
                    }
                    //Reset if needed
                    group.width = groupWidth;

                    if (group.width < group.combinedColumnWidth) {
                        requiresHorizontalShim = true;
                    }

                });
                //Redistrubute freespace to groups that have scrolling;
                if (extraSpace > 0) {
                    _.each(flexGroups, function (group, index) {
                        var scrollSpace = group.combinedColumnWidth - group.width;
                        if (scrollSpace > 0 && extraSpace > 0) {
                            var addToGroup = extraSpace < scrollSpace ? extraSpace : scrollSpace;
                            group.width += addToGroup;
                            extraSpace = extraSpace - addToGroup;
                        }
                    });
                }

                return requiresHorizontalShim;
            },


            resizeDraggedGroupFn : function (grid, resizer) {
                return function () {
                    grid.$grid.off('mousemove.group-resize');
                    $(document.body).off('mouseup.group-resize');
                    resizer.$selector.removeClass('dragging');
                    var viewport = grid.viewports[_.first(grid.config.waffers).id][resizer.group.id],
                        leftPosition = viewport.$viewport.position().left;
                    //Potential call to giggity
                    changeGroupSize(grid.config.groups, resizer.group,
                        resizer.$selector.position().left - leftPosition);
                    grid.widget._trigger('view-updated', null, {action : 'group-resized', group : resizer.group.id});
                    grid.resize();


                };
            },

            onGroupDragFn : function (resizer, gridOffset) {
                var that = this;
                return function (event) {
                    // left click button
                    if (event.which === 1) {
                        that.moveResizeBarFn(resizer, event.clientX - gridOffset);
                    }
                };
            },

            moveResizeBarFn : function (resizer, position) {
                if (resizer.$selector.is('.dragging')) {
                    resizer.$selector.css('left', position);
                }
            }
        };

    }
);

define('gridapi.grid/rows/rowMoveFns',['gridapi.jquery', 'gridapi.underscore'], function ($, _) {
    



    return function (grid) {
        // MARKUP
        var $rowMoveShade = grid.$grid.find('.row-move-shade'),
            $rowMoveBar = grid.$grid.find('.row-move-bar'),
            $wafferDrop = grid.$grid.find('.waffer-drop-shade');

        var $rows = $(), rows = [], offsets = {}, heights = {}, $scroller, wafferConfig, whereToGo, wafferId, rowIndex,
            positions = {}, direction = -1, scrollTimer, currentDropWaffer = null;

        /**
         * Mousemove function
         */
        var mousemoveFn = function () {
            return function (event) {
                onMoveFn(event.clientY + $(window).scrollTop());
            };
        };
        var onMoveFn = function (mouseY) {
            direction = mouseY - offsets.grid - positions.pointer;
            positions.pointer = mouseY - offsets.grid;

            positionShadeFn();
            if (currentDropWaffer == null) {
                positionMoveBarFn();
            }
        };
        /**
         * Mouseup function
         */
        var mouseupFn = function () {
            return function (event) {
                if (event.which === 1) {
                    // switch of mouse events
                    grid.$grid.off('mousemove.row-move');
                    $(document.body).off('mouseup.row-move');
                    clearTimeout(scrollTimer);
                    if (currentDropWaffer == null) {
                        var virtualRows = grid.virtualRows[wafferId];
                        var afterId = -1;
                        if(whereToGo >0){
                            afterId = virtualRows.records[virtualRows.displayTop + whereToGo - (1 + (virtualRows.headerRow ? 1 : 0))];
                        }
                        grid.widget._moveRows({previousRecord : afterId, waffer : wafferId});
                    } else {
                        grid.widget._dropRows(wafferId, currentDropWaffer.waffer);
                    }

                    // hide the column move shade and bar
                    $rowMoveBar.hide();
                    $rowMoveShade.hide();
                    $wafferDrop.hide();

                    $rows.removeClass('row-moving');
                    currentDropWaffer = null;
                    whereToGo = null;
                }
            };
        };

        var positionShadeFn = function () {
            if(scrollTimer != null){
                clearTimeout(scrollTimer);
                scrollTimer = null;
            }
            //Check standard case of moving within the same waffer
            if (positions.pointer > offsets.wafferTop + heights.row && positions.pointer + heights.row < offsets.wafferBottom) {
                $rowMoveShade.css('top', positions.pointer - heights.halfrow);
                $rowMoveShade.show();
                $wafferDrop.hide();
                currentDropWaffer = null;
                return;
            }
            //Check if the mouse is outside of the waffer
            if (positions.pointer < offsets.wafferTop || positions.pointer > offsets.wafferBottom) {
                positionWafferDrop();
                return;
            } else {
                $wafferDrop.hide();
                currentDropWaffer = null;
            }

            //Check waffer boundaries for scrolling
            var topposition = positions.pointer - heights.halfrow,
                bottomposition = positions.pointer + heights.halfrow,
                scrollAmount = 0;
            if (topposition < offsets.wafferTop) {
                topposition = offsets.wafferTop;
                scrollAmount = 15;
            } else if (bottomposition > offsets.wafferBottom) {
                topposition = offsets.wafferBottom - heights.row;
                scrollAmount = -15;
            }
            $rowMoveShade.css('top', topposition);
            $rowMoveShade.show();

            //scroll if on edge
            if (scrollAmount !== 0) {
                scrollTimer = setInterval(function () {
                    scrollFn(scrollAmount);
                }, 150);
            }
        };

        var scrollFn = function (amount) {
            if ($scroller != null) {
                $scroller.$scroller.scrollTop($scroller.$scroller.scrollTop() - amount);
                direction = -amount;
                positionMoveBarFn();
            }
        };
        var withinWafferFn = function (wafferToCheck) {
            var values = {};
            values.top = wafferToCheck.offset().top - offsets.grid;
            values.height = wafferToCheck.height();
            values.bottom = values.top + values.height;
            values.fits = positions.pointer < values.bottom && positions.pointer > values.top;
            values.waffer = wafferToCheck.data('id');
            return values;
        };

        var positionWafferDrop = function () {
            var wafferToCheck,
                dropWaffer;
            //If mouse is still in the current waffer don't check
            if(currentDropWaffer != null && positions.pointer < currentDropWaffer.bottom && positions.pointer > currentDropWaffer.top){
                return;
            }
            //Check to find the mouse in waffers above or below.
            if (positions.pointer < offsets.wafferTop) {
                wafferToCheck = wafferConfig.prev; //Waffers above
                while (wafferToCheck != null) {
                    dropWaffer = withinWafferFn(grid.$waffers[wafferToCheck.id]);
                    if (dropWaffer.fits) {
                        break;
                    } else {
                        dropWaffer = null;
                        wafferToCheck = wafferToCheck.prev;
                    }
                }
            } else {
                wafferToCheck = wafferConfig.next; //Waffers below
                while (wafferToCheck != null) {
                    dropWaffer = withinWafferFn(grid.$waffers[wafferToCheck.id]);
                    if (dropWaffer.fits) {
                        break;
                    } else {
                        dropWaffer = null;
                        wafferToCheck = wafferToCheck.next;
                    }
                }
            }
            //Clear if none was found
            if (dropWaffer == null) {
                $wafferDrop.css('height', 0);
                $wafferDrop.css('top', 0);
                currentDropWaffer = null;
                $wafferDrop.hide();
            } else {
                if (currentDropWaffer !== dropWaffer) {
                    //Check if they can drop the row into this viewport
                    if (dropWaffer.waffer === 'headers' || grid.widget._trigger('before-drop-row', null, {currentWaffer : wafferId, dropWaffer : dropWaffer.waffer, rows : rows}) === false) {
                        return;
                    } else {
                        dropWaffer.permission = true;
                    }
                    $wafferDrop.css('height', dropWaffer.height);
                    $wafferDrop.css('top', dropWaffer.top);
                    currentDropWaffer = dropWaffer;
                    $wafferDrop.show();
                    $rowMoveBar.hide();
                    $rowMoveShade.hide();
                }

            }
        };

        var positionMoveBarFn = function () {
            var amountToAdd = heights.row;
            if (direction < 0) {
                amountToAdd = 0;
            }
            whereToGo = parseInt(((positions.pointer - offsets.wafferTop + amountToAdd) / heights.row), 10);
            var linePosition = (heights.row * whereToGo) + offsets.wafferTop;
            if (linePosition < offsets.wafferTop) {
                linePosition = offsets.wafferTop;
            } else if (linePosition > offsets.wafferBottom) {
                linePosition = offsets.wafferBottom;
            }

            $rowMoveBar.css('top', linePosition);
            $rowMoveBar.show();
        };
        //TODO: multiple row selection, dont have time for it
        return {
            /**
             * Trigger column resize
             * @param activeViewport - current viewport of column
             * @param $column - column being resized
             * @param mouseX - start position of column move drag
             */
            initMoveRow : function (rowWaffer, $selection, mouseY) {
                var count = grid.widget.getSelection().length;
                $rowMoveShade.find('.count span').text(count + ' Selected');
                wafferConfig = rowWaffer.data('waffer');
                wafferId = rowWaffer.data('id');
                $scroller = grid.pseudoScrollers.vertical[rowWaffer.data('id')];
                offsets.grid = grid.$grid.offset().top;
                offsets.wafferTop = rowWaffer.offset().top - offsets.grid;
                offsets.wafferBottom = offsets.wafferTop + rowWaffer.height();
                heights.row = $selection.first().innerHeight();
                heights.halfrow = heights.row / 2;
                heights.rows = heights.row * $selection.length;
                rowIndex = parseInt($selection.first().position().top / heights.row, 10);

                if (wafferId === 'headers') {
                    offsets.wafferTop = offsets.wafferTop + heights.row;
                    rowIndex--;
                }

                currentDropWaffer = null;
                whereToGo = null;
                $rows = $selection;
                $rows.each(function(){
                        rows.push($(this).attr('data-id'));
                    }
                );
                $rowMoveShade.show();
                $rows.addClass('row-moving');
                $rowMoveShade.css('height', heights.rows);
                // switch mouse move and down event to on
                grid.$grid.on('mousemove.row-move', _.throttle(mousemoveFn(), 20));
                $(document.body).on('mouseup.row-move', mouseupFn());
                onMoveFn(mouseY + $(window).scrollTop());
            }
        };
    };
});
define('gridapi.grid/gridMixins',['gridapi.underscore'], function (_) {
    

    // copied from backbone
    var Ctor = function(){};
    var inherits = function(parent, protoProps, staticProps) {
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ parent.apply(this, arguments); };
        }

        // Inherit class (static) properties from parent.
        _.extend(child, parent);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        Ctor.prototype = parent.prototype;
        child.prototype = new Ctor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Add static properties to the constructor function, if supplied.
        if (staticProps) _.extend(child, staticProps);

        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = parent.prototype;

        return child;
    };

    return {
        // copied from backbone
        extends : function (protoProps, classProps) {
            var child = inherits(this, protoProps, classProps);
            child.extend = this.extend;
            return child;
        }
    };
});

define('gridapi.grid/columns/core/editor',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/gridMixins', 'gridapi.utils/template'], function ($, _, mixins, creatorFn) {
    
    var inputTextTemplate = creatorFn('<div id="pgbu-grid-cell-editor" class="cell-editor cell-editor-text"><input type="text"/></div>');

    var editor = function () {

    };

    editor.extend = mixins.extends;

    _.extend(editor.prototype, {

        init : function (options) {
            var that = this;
            var properties = [];
            _.each(options, function (value, name) {
                that[name] = value;
                properties.push(name);
            });

            // use to determine if commit is already in process
            // this is just used to prevent commit being called again from the grid
            this.commitStarted = false;

            // cache the property names we have set so we can delete later on
            that.prop = properties;
        },

        initialize : function (options) {
            var that = this;

            that.init(options);

            var $editor = that.make();

            if (!$editor.is('.cell-editor')) {
                throw new Error('Editor.create() - No "cell-editor" class.');
            }

            if (!$editor.is('#pgbu-grid-cell-editor')) {
                throw new Error('Editor.create() - No "pgbu-grid-cell-editor" id.');
            }

            // append to document as editor is absolute in its positioning
            $(document.body).append($editor);

            that.initListeners();

            return $editor;
        },

        getEditor : function () {
            return $(document.body).find('#pgbu-grid-cell-editor');
        },

        getEditorInput : function () {
            return this.getEditor().find('input');
        },

        initListeners : function () {
            var that = this,
                $editorInput = this.getEditorInput();

            // stop double click events
            $editorInput.on('dblclick', function (event) {
                event.stopPropagation();
                event.preventDefault();
            });

            // add key events
            $editorInput.on('keyup', function (event) {
                switch (event.keyCode) {
                    case $.ui.keyCode.ENTER :
                        that.commit(false);
                        break;
                    case $.ui.keyCode.ESCAPE :
                        // escape - cancel editing
                        that.close();
                        break;
                }
                //disable all other key events
                event.stopPropagation();
                event.preventDefault();
            });

            // disable key events that we are interested in
            $editorInput.on('keydown', function (event) {
                switch (event.keyCode) {
                    case $.ui.keyCode.ESCAPE:
                    case $.ui.keyCode.ENTER:
                    case $.ui.keyCode.UP :
                    case $.ui.keyCode.DOWN :
                    case $.ui.keyCode.RIGHT :
                    case $.ui.keyCode.LEFT :
                        event.stopPropagation();
                        break;
                }
            });
        },

        make : function () {
            return $(inputTextTemplate({}));
        },

        setPosition : function ($editor) {
            throw new Error('Editor.setPosition() needs to implemented.');
        },

        getNewData : function () {
            throw new Error('Editor.getNewData() needs to implemented.');
        },

        getCommitStarted : function () {
            return this.commitStarted;
        },

        /**
         * Show editor
         */
        show : function (keyCode, shiftKey) {
            this.render(keyCode, shiftKey);

            var $editor = this.getEditor();

            this.setPosition($editor);

            $editor.show();

            this.drawFocusToInput();
        },

        render : function (keyCode, shiftKey) {
            if (keyCode != null) {
                // set typed character into input
                var character = String.fromCharCode(keyCode);
                this.getEditorInput().val(shiftKey ? character.toLocaleUpperCase() : character.toLocaleLowerCase());
            } else {
                // if the data is not valid then just display it
                if (this.validate()) {
                    this.getEditorInput().val(this.format());
                } else {
                    this.getEditorInput().val(this.data);
                }
            }
        },

        format : function () {
            return this.column.formatter.format(this.data);
        },

        validate : function () {
            return this.column.formatter.validate(this.data);
        },

        destroy : function () {
            var $editor = this.getEditor();
            if ($editor.length) {
                $editor.remove();
            }
        },

        drawFocusToInput : function (select) {
            var $editorInput = this.getEditorInput();
            // draw input cursor into editor
            $editorInput.get(0).focus();
            if (select) {
                // select/highlight the text in input
                $editorInput.select();
            }
        },

        clean : function () {
            var that = this;
            // delete any cached instances of variables that might interfere with the prototype versions
            _.each(that.prop, function (name) {
                delete that[name];
            });
            // remove newData property - set in some of the editors
            delete that.newData;

            // reset commit flag
            this.commitStarted = false;
        },

        hasDataChanged : function () {
            return !_.isEqual(this.getNewData(), this.data);
        },

        close : function () {
            this.destroy();
            // must be called before clean
            this.onCloseFn();
            this.clean();
        },

        commit : function (forceClose) {
            this.commitStarted = true;

            // persist the new value
            this.onPersistFn(this.getNewData());
            // close editor
            this.close();
            return true;
        }
    });

    return editor;

});

define('gridapi.grid/columns/core/renderer',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/gridMixins'], function ($, _, mixins) {
    

    var renderer = function () {
    };

    renderer.extend = mixins.extends;

    // alignment of text
    var columnAlignment = {
        left : '',//'cell-align-left', no need to do this, save some css speed
        right : 'cell-align-right',
        center : 'cell-align-center'
    };

    _.extend(renderer.prototype, {
        /**
         * Override to build cell html
         * Must be in string format for performance - NO JQUERY!!
         * @param column - column definition
         * @param record - record containing the data for cell
         */
        create : function (column, record, data, modified, readOnly, selected) {
            var isValid = this.validate(column, data),
                value = isValid ? this.format(column, data, record) : data;
            var html = '<td data-index="' + column.dataIndex + '"' + this.getClasses(modified,
                readOnly, selected, isValid) + ' ><div class="cell-renderer ' + this.getAlignment(column) + '">' + value + '</div>' + (isValid ? '' : '<div class="invalid-top-right"></div>') +'</td>';

            return html;
        },

        getClasses : function (modified, readOnly, selected, isValid) {
            var classes = '';
//            if (mod?ified || readOnly || selected || !isValid) {
                classes = ' class="pgbu-cell ' + (modified ? 'cell-modified ' : '') + (readOnly ? 'cell-uneditable ' : '') + (selected ? 'cell-selected ' : '') + (isValid ? '' : 'cell-invalid ') + '" ';
//            }
            return classes;
        },

        validate : function (column, data) {
            return column.formatter.validate(data);
        },

        /**
         * Override to change the format of the data
         * @param column - column definition
         * @param data - value to be formatted
         * * @param record - record containing all data
         */
        format : function (column, data, record) {
            return data == null ? '' : column.formatter.format(data);
        },

        getAlignment : function (column) {
            return ' ' + columnAlignment[column.align] || columnAlignment.left;
        }
    });

    return renderer;

});

define('gridapi.grid/columns/checkColumn',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/renderer', 'gridapi.grid/columns/core/editor'],
    function ($, _, renderer, editor) {
        

        return {
            editor : editor.extend({

            }),

            renderer : renderer.extend({
                create : function (column, record, data, modified, readOnly, selected) {
                    
                    var checked = (data === true || data === 'true') ? 'checked="checked"' : '';
                    var html = '<td data-index="' + column.dataIndex + '"' + this.getClasses(modified, readOnly, selected, true) + ' ><div class="cell-renderer cell-renderer-checkbox' + this.getAlignment(column) + '">' +
                        '<input type="checkbox" ' + checked + '"/></div></td>';

                    return html;
                }
            })

        };
    });

define('gridapi.grid/columns/selectColumn',
    ['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/editor', 'gridapi.grid/columns/core/renderer', 'gridapi.utils/template'],
    function ($, _, editor, renderer, creatorFn) {
        

        var inputTextTemplate = creatorFn('<div id="pgbu-grid-cell-editor" class="cell-editor cell-editor-select"><input type="text"/>' +
            '<a class="btn dropdown-toggle btn-blue-light"><span class="caret"/>' +
            '</a><ul class="hide cell-select-menu"></ul></div>');

        var singleOptionTemplate = creatorFn('<li class="select-menu-item <%=selected%>" data-id="<%=dataId%>"><%=name%></li>');

        var multiOptionTemplate = creatorFn('<li class="select-menu-item <%=selected%>" data-id="<%=dataId%>"><input type="checkbox" <%=checked%> class="dropdown-checkbox"><%=name%></li>');


        return {
            formatter : {
                format : function (data, column) {
                    var text = '';

                    if (column.selectMultiple) {
                        // data should be an array of ids
                        _.each(data, function (id, index) {
                            text += column.selectValues[id].name;

                            if (index < data.length - 1) {
                                text += column.listDelim;
                            }
                        });
                    } else {
                        // data should be one id
                        if (column.selectValues[data] != null) {
                            text = column.selectValues[data].name;
                        }
                    }
                    return text;
                },

                validate : function (data) {
                    return true;
                }
            },

            renderer : renderer.extend({
                format : function (column, data, record) {
                    return column.formatter.format(data, column);
                }
            }),

            editor : editor.extend({
                init : function (options) {
                    // have to clone as data will be an array for multi-select
                    this.newData = _.clone(options.data);
                    this.constructor.__super__.init(options);
                },

                updateData : function (id) {
                    var that = this;

                    // multi-select ->
                    // if the id is in the array then remove it
                    // if the id is NOT in the array then add it
                    // single-select ->
                    // replace the id with the new one
                    if (that.column.selectMultiple) {
                        var found = false;
                        for (var index = 0; index < that.newData.length; index++) {
                            var thisId = that.newData[index];
                            if (id === thisId) {
                                that.newData.splice(index, 1);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            that.newData.push(id);
                        }
                    } else {
                        that.newData = id;
                    }

                    // re-render value in input
                    that.render();
                },

                getNewData : function () {
                    return this.newData;
                },

                make : function () {
                    var that = this;

                    if (that.column.selectValues == null || that.column.selectValues.length === 0) {
                        throw new Error('DropDownColumn.make() - no values defined.');
                    }

                    var $markup = $(inputTextTemplate({})),
                        $ul = $markup.find('ul'),
                        $editorInput = $markup.find('input');

                    if (that.column.selectMultiple) {
                        $markup.addClass('cell-editor-select-multi');
                        $ul.addClass('cell-select-multi-menu');
                    }

                    that.createDropDown($ul, that.column.selectValues);

                    // when the drop down button is clicked toggle the drop down menu being visible
                    $markup.find('a.dropdown-toggle').on('click', function (event) {
                        $ul.toggleClass('hide');
                        $markup.find('input').get(0).focus();
                        event.stopPropagation();
                        event.preventDefault();
                    });

                    return $markup;
                },

                createDropDown : function ($ul, values) {
                    var that = this;

                    // remove any previous drop down content
                    $ul.empty();

                    // create all the options
                    _.each(values, function (value) {
                        if (that.column.selectMultiple) {
                            var checked = _.indexOf(that.data, value.id) > -1;
                            $ul.append($(multiOptionTemplate({
                                dataId : value.id,
                                name : value.name,
                                checked : checked ? 'checked="checked"' : '',
                                selected : checked ? 'menu-item-selected' : ''
                            })));
                        } else {
                            var selected = (value.id === that.data);
                            $ul.append($(singleOptionTemplate({
                                dataId : value.id,
                                name : value.name,
                                selected : selected ? 'menu-item-selected' : ''
                            })));
                        }
                    });

                    var $lis = $ul.find('li');

                    // stop any double click events propagating
                    $lis.on('dblclick', function (event) {
                        return event.stopPropagation();
                    });

                    // highlight the value checked
                    $lis.find('input[type="checkbox"]').on('change',function (event) {
                        var $input = $(this),
                            $li = $input.closest('li'),
                            id = $li.attr('data-id');

                        if ($input.is(':checked')) {
                            $li.addClass('menu-item-selected');
                        } else {
                            $li.removeClass('menu-item-selected');
                        }
                        that.updateData(id);

                        // draw focus back to input
                        that.getEditorInput(that.getEditor()).get(0).focus();

                        // stop other events occurring
                        event.stopPropagation();
                    }).on('click', function (event) {
                            // stop div event below being triggered
                            event.stopPropagation();
                        });

                    $lis.on('mouseover', function (event) {
                        $ul.find('li.item-hovered').addClass('menu-item-hovered-transparent');
                    });

                    // highlight the value clicked
                    $lis.on('click', function (event) {
                        var $span = $(this),
                            $li = $span.closest('li'),
                            id = $li.attr('data-id'),
                            $input = $li.find('input');

                        // if already clicked then removed selected
                        if ($li.is('.menu-item-selected')) {
                            $li.removeClass('menu-item-selected');
                            if ($input.length) {
                                $input.removeAttr('checked');
                            }
                        } else {
                            $input.attr('checked', 'checked');
                            if ($input.length) {
                                $li.addClass('menu-item-selected');
                            }
                        }
                        that.updateData(id);

                        // if in multi select mode then DON'T close drop down on selection
                        if (!that.column.selectMultiple) {
                            that.commit();
                        } else {
                            // draw focus back to input
                            that.getEditorInput(that.getEditor()).get(0).focus();
                        }

                        // stop other events occurring
                        event.stopPropagation();
                    });

                },

                moveSelection : function ($ul, up) {
                    // use current list item selection and move from there, otherwise start from beginning
                    var $lis = $ul.children();
                    var $li = $lis.filter('.menu-item-hovered');
                    if (!$li.length) {
                        $li = $lis.filter('.menu-item-selected');
                    }
                    if (!$li.length) {
                        $li = $lis.first().addClass('menu-item-hovered');
                    } else {
                        $li = $li.eq(0);
                        $li.removeClass('menu-item-hovered');
                        var $nextLi = up ? $li.prev() : $li.next();
                        if (!$nextLi.length) {
                            $nextLi = up ? $lis.last() : $lis.first();
                        }
                        $nextLi.addClass('menu-item-hovered');
                    }
                },

                initListeners : function () {
                    var that = this,
                        $ul = that.getEditor().find('.cell-select-menu'),
                        $dropDownButton = that.getEditor().find('a.dropdown-toggle'),
                        $editorInput = that.getEditorInput();

                    // add actions to keyboard events
                    $editorInput.on('keyup', function (event) {
                        $ul.find('.menu-item-hovered').removeClass('menu-item-hovered-transparent');

                        switch (event.keyCode) {
                            case  $.ui.keyCode.ENTER:
                                // select the selected list item
                                // commit selection
                                var $lis = $ul.children();
                                $lis.filter('.menu-item-hovered').trigger('click');
                                that.commit(event.keyCode);
                                break;
                            case $.ui.keyCode.ESCAPE :
                                // cancel editing
                                that.close();
                                break;
                            case $.ui.keyCode.UP:
                                // if the drop down menu is showing then cycle through the list items
                                // start from the selected list item
                                // if no list item is selected then start from the beginning of the list
                                if (!$ul.is('.hide')) {
                                    that.moveSelection($ul, true);
                                }
                                break;
                            case $.ui.keyCode.DOWN:
                                // drop the menu into view if not already in view
                                // otherwise move down the items in the list
                                // cycle around once hitting the bottom
                                if ($ul.is('.hide')) {
                                    $dropDownButton.trigger('click');
                                } else {
                                    that.moveSelection($ul, false);
                                }
                                break;

                            case $.ui.keyCode.SPACE:
                                $ul.find('li.menu-item-hovered').click();
                                if (!that.column.selectMultiple) {
                                    that.commit(event.keyCode);
                                }
                                break;
                            default:
                                that.autoComplete($editorInput.val());
                        }
                    });

                    // stop any key events we care about getting any further
                    $editorInput.on('keydown', function (event) {
                        switch (event.keyCode) {
                            case $.ui.keyCode.ENTER:
                            case $.ui.keyCode.UP:
                            case $.ui.keyCode.DOWN:
                            case $.ui.keyCode.LEFT:
                            case $.ui.keyCode.RIGHT:
                            case $.ui.keyCode.SPACE:
                                event.stopPropagation();
                                event.preventDefault();
                        }
                    });

                },

                autoComplete : function (text) {
                    var that = this,
                        values = [],
                        $ul = that.getEditor().find('.cell-select-menu'),
                        lastValue = text.toLowerCase().split(that.column.listDelim).pop();

                    // add any currently selected list items
                    if (that.column.selectMultiple) {
                        var $lis = $ul.children().filter('.menu-item-selected');
                        _.each(that.column.selectValues, function (value) {
                            _.each($lis, function (li) {
                                if (value.id === $(li).attr('data-id')) {
                                    values.push(value);
                                }
                            });
                        });
                    }

                    // find possible values for the entered text
                    _.each(that.column.selectValues, function (value) {
                        if (value.name.toLowerCase().indexOf(lastValue) === 0) {    // must be the beginning
                            // only add value if it is not already added
                            if (!_.contains(values, value)) {
                                values.push(value);
                            }
                        }
                    });

                    that.createDropDown($ul, values);

                    // select the first list item
                    $ul.children().first().addClass('menu-item-selected');

                    // show drop down if not already
                    if ($ul.is('.hide')) {
                        $ul.toggleClass('hide');
                    }
                },

                render : function (keyCode, shiftKey) {
                    if (keyCode == null) {
                        this.getEditorInput().val(this.column.formatter.format(this.newData, this.column));
                    } else {
                        this.constructor.__super__.render(keyCode, shiftKey);
                    }
                },

                setPosition : function ($editor) {
                    var $cellOffset = this.$cell.offset();
                    $editor.css('top', $cellOffset.top);
                    $editor.css('left', $cellOffset.left);
                    $editor.css('width', this.$cell.css('width'));
                    $editor.css('height', this.$cell.css('height'));
                }
            })
        };
    });

define('gridapi.grid/columns/spinnerColumn',
    ['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/editor', 'gridapi.grid/columns/core/renderer'],
    function ($, _, editor, renderer) {
        

        return {
            renderer : renderer.extend({}),
            editor : editor.extend({

                make : function () {
                    return $('<div id="pgbu-grid-cell-editor" class="cell-editor cell-editor-spinner"><input type="number"/></div>');
                },

                getNewData : function () {
                    return this.getEditorInput().val();
                },

                render : function () {
                    var that = this,
                        $editorInput = this.getEditorInput();

                    // initialize spinner jQuery widget
                    $editorInput.spinner({
                        type : that.column.spinnerType,
                        style : 'self',
                        fallback : true,
                        min : that.column.spinnerMin,
                        max : that.column.spinnerMax,
                        step : that.column.spinnerStep
                    });

                    // set the value
                    $editorInput.val(this.data);

                    // stop double click on the spinner buttons
                    that.getEditor().find('.spinner-btn').on('dblclick', function (event) {
                        event.stopPropagation();
                    });
                },

                setPosition : function ($editor) {
                    var $cellOffset = this.$cell.offset();
                    $editor.css('top', $cellOffset.top);
                    $editor.css('left', $cellOffset.left);
                    $editor.css('width', this.$cell.css('width'));
                    $editor.css('height', this.$cell.css('height'));
                }
            })
        };
    });

define('gridapi.grid/columns/rowSelectorColumn',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/checkColumn', 'gridapi.grid/columns/core/editor', 'gridapi.utils/template'],
    function ($, _, checkColumn, editor, creatorFn) {
        

        return {
            editor : editor.extend({
                init : function (grid, $cell, data, column, onAfterEditFn) {
                    this.constructor.__super__.init(grid, $cell, data, column, onAfterEditFn);
                }
            }),
            renderer : checkColumn.renderer.extend({
                thTemplate : creatorFn('<th data-index="<%=dataIndex%>" width="<%=width%>"><div class="cell-renderer align-center"><input type="checkbox"/></div></td>'),
                create : function (column, record, data) {
                    var checked = (data === true || data === 'true') ? 'checked="checked"' : '';
                    var html = '<td data-index="' + column.dataIndex + '"><div class="cell-renderer cell-renderer-selector-checkbox' + this.getAlignment(column) + '">' +
                        '<input type="checkbox" ' + checked + '"/></div></td>';

                    return html;
                }
            })

        };
    });

define('gridapi.grid/columns/textColumn',
    ['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/editor', 'gridapi.grid/columns/core/renderer'],
    function ($, _, editor, renderer) {
        

        return {
            renderer : renderer.extend({

            }),
            editor : editor.extend({

                getNewData : function(){
                    return this.getEditorInput().val();
                },

                setPosition : function ($editor) {
                    var $cellOffset = this.$cell.offset();
                    $editor.css('top', $cellOffset.top);
                    $editor.css('left', $cellOffset.left);
                    $editor.css('width', this.$cell.css('width'));
                    $editor.css('height', this.$cell.css('height'));
                }
            })
        };
    });

define('gridapi.grid/i18n/localizedStrings',[],function () {
    

    return {
        sortAscending : 'Sort Ascending',
        sortDescending : 'Sort Descending',
        columnToggle : 'Columns',
        filter : 'Filter',
        dates : {
            mm : 'mm',
            dd : 'dd',
            yyyy : 'yyyy',
            today : 'Today',
            cancel : 'Cancel'
        },
        invalidFormatError : 'Format not correct for cell.',
        picker : {
            save : 'Select',
            cancel : 'Cancel',
            search : 'search',
            title : 'Select {set my locale}'
        },
        enterNumber : 'Enter number...'
    };
});

define('gridapi.grid/columns/dateColumn',
    ['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/editor', 'gridapi.grid/columns/core/renderer',
        'gridapi.grid/i18n/localizedStrings'],
    function ($, _, editor, renderer, locale) {
        

        return {

            formatter : {
                format : function (data, format) {
                    // pass in true to formatter as date be utc format
                    return (data == null || data === '' ? '' : new Date(data).format(format, true));
                },

                validate : function (value) {
                    return (value == null || value === '') ? true : (new Date(value)).toString() !== 'Invalid Date';
                }
            },

            renderer : renderer.extend({
                format : function (column, data) {
                    return column.formatter.format(data, column.dateFormat);
                }
            }),
            editor : editor.extend({

                init : function (options) {
                    this.constructor.__super__.init(options);
                },

                make : function () {
                    this.isValid = true;
                    var $editor = this.constructor.__super__.make();
                    $editor.addClass('cell-editor-date');

                    return $editor;
                },

                getNewData : function () {

                    var date =  this.getEditorInput().datePicker('getDate');
                    if (date.toString() !== 'Invalid Date') {
                        return date.toJSON();
                    }

                    return date;
                },

                format : function () {
                    return this.column.formatter.format(this.data, this.column.dateFormat);
                },

                render : function (keyCode, shiftKey) {
                    var that = this,
                        $editorInput = this.getEditorInput();

                    $editorInput.datePicker({
                        style : 'self',
                        fallback : true,
                        dateFormat : that.column.dateFormat,
                        type : that.column.dateType,
                        locale : {
                            today : locale.dates.today,
                            cancel : locale.dates.cancel
                        }
                    });

                    that.getEditorInput().datePicker('setDate', new Date(that.data));
                    that.constructor.__super__.render.call(that, keyCode, shiftKey);
                },

                setPosition : function ($editor) {
                    var $cellOffset = this.$cell.offset();
                    $editor.css('top', $cellOffset.top);
                    $editor.css('left', $cellOffset.left);
                    $editor.css('width', this.$cell.css('width'));
                    $editor.css('height', this.$cell.css('height'));
                }
            })
        };
    });

define('gridapi.grid/columns/textAreaColumn',
    ['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/editor', 'gridapi.grid/columns/core/renderer'],
    function ($, _, editor, renderer) {
        

        return {
            renderer : renderer.extend({
            }),
            editor : editor.extend({

                make : function () {
                    var that = this;

                    // create a text area
                    var $editor = $('<div id="pgbu-grid-cell-editor" class="cell-editor cell-editor-textarea">' +
                        '<textarea rows="3" cols="100"></textarea></div>');

                    // keep scroll event to ourselves - not doing will cause no scroll in the text area
                    var $editorInput = that.getEditorInput($editor);
                    $editorInput.on('mousewheel', function(event){
                        event.stopPropagation();
                    });

                    return $editor;
                },

                getNewData : function(){
                    return this.getEditorInput().val();
                },

                setPosition : function ($editor) {
                    var $cellOffset = this.$cell.offset();
                    $editor.css('top', $cellOffset.top);
                    $editor.css('left', $cellOffset.left);
                },

                getEditorInput : function () {
                    return this.getEditor().find('textarea');
                }
            })
        };
    });
define('gridapi.grid/columns/pickerColumn',
    ['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/editor', 'gridapi.grid/columns/core/renderer'],
    function ($, _, editor, renderer) {
        

        /**
         * Picker column assumes that data is held in an array.  Objects in the array at the minimal should have id, parentId and name
         * [{
         *     id : 'fooId',
         *     parentId : 'fooParentId',
         *     name : 'fooName'
         * }]
         */

        return {

            formatter : {
                format : function (datas, column) {
                    var values = '';
                    _.each(datas, function (data, index) {

                        values += data.name;

                        if (index < datas.length - 1) {
                            // if not last item then add a delimiter
                            values += column.listDelim;
                        }
                    });
                    return values;
                },

                validate : function (datas) {
                    return true;
                }
            },

            renderer : renderer.extend({
                format : function (column, data, record) {
                    return column.formatter.format(data, column);
                }
            }),

            editor : editor.extend({

                init : function (options) {
                    // have to clone as data will be an array for multi-select
                    this.newData = _.clone(options.data);
                    this.constructor.__super__.init(options);
                },

                make : function () {
                    var $editor = this.constructor.__super__.make();
                    $editor.addClass('cell-editor-picker');

                    return $editor;
                },

                render : function (keyCode, shiftKey) {
                    var that = this;
                    var $editorInput = this.getEditorInput();
                    var mergeOptions = {
                        style : 'self',
                        storeFns : {
                            submit : function (datas) {
                                that.newData = datas;
                                that.render();
                            }
                        },
                        typeahead : {
                            storeFns : {
                                filter : function (results) {
                                    $editorInput.picker('filter', results);
                                },
                                submit : function (datas) {
                                    that.newData = datas;
                                    that.render();
                                }
                            }
                        }
                    };
                    $.extend(true, mergeOptions, {
                        rootId : that.column.pickerRootId,
                        locale : that.column.pickerLocale,
                        lazyload : that.column.pickerLazyLoad,
                        multiSelect : that.column.pickerSelectMultiple,
                        storeFns : that.column.pickerStoreFns,
                        display : that.column.pickerDisplayFormat,
                        typeahead : that.column.pickerTypeaheadStoreFns
                    });
                    $editorInput.picker(mergeOptions);

                    _.each(that.data, function (data) {
                        $editorInput.picker('select', data.id);
                    });

                    if (keyCode == null) {
                        this.getEditorInput().val(this.column.formatter.format(this.newData, this.column));
                    } else {
                        this.constructor.__super__.render(keyCode, shiftKey);
                    }
                },

                getNewData : function () {
                    return this.newData;
                },

                setPosition : function ($editor) {
                    var $cellOffset = this.$cell.offset();
                    $editor.css('top', $cellOffset.top);
                    $editor.css('left', $cellOffset.left);
                    $editor.css('width', this.$cell.css('width'));
                    $editor.css('height', this.$cell.css('height'));
                }
            })
        };
    });

define('gridapi.grid/columns/costColumn',
    ['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/editor', 'gridapi.grid/columns/core/renderer',
        'pgbucoreapi.numberFormatter'],
    function ($, _, editor, renderer, numberFormatter) {
        

        return {

            formatter : numberFormatter,

            renderer : renderer.extend({
                validate : function (column, data) {
                    return data == null || data === '' ? true : column.formatter.validate(data, {
                        decimalSeparator : column.decimalSeparator,
                        thousandsSeparator : column.thousandsSeparator,
                        symbol : column.symbol
                    });
                },

                format : function (column, data, record) {
                    return column.formatter.format(data, {
                        decimalPlaces : column.decimalPlaces,
                        decimalSeparator : column.decimalSeparator,
                        thousandsSeparator : column.thousandsSeparator,
                        symbol : column.symbol,
                        prefixSymbol : column.prefixSymbol
                    });
                }
            }),
            editor : editor.extend({
                    make : function () {
                        var $editor = this.constructor.__super__.make();
                        $editor.addClass('cell-editor-cost');
                        return $editor;
                    },

                    getNewData : function () {
                        var value = this.getEditorInput().val();
                        value = value.replace(this.column.thousandsSeparator, '');
                        value = value.replace(this.column.symbol, '');
                        return value;
                    },

                    setPosition : function ($editor) {
                        var $cellOffset = this.$cell.offset();
                        $editor.css('top', $cellOffset.top);
                        $editor.css('left', $cellOffset.left);
                        $editor.css('width', this.$cell.css('width'));
                        $editor.css('height', this.$cell.css('height'));
                    }
                }
            )
        };
    });


define('gridapi.grid/columns/percentColumn',
    ['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/editor', 'gridapi.grid/columns/core/renderer',
        'pgbucoreapi.numberFormatter'],
    function ($, _, editor, renderer, numberFormatter) {
        

        return {

            formatter : numberFormatter,

            renderer : renderer.extend({
                validate : function (column, data) {
                    return data == null || data === '' ? true : column.formatter.validate(data, {
                        decimalSeparator : column.decimalSeparator,
                        thousandsSeparator : column.thousandsSeparator,
                        symbol : column.symbol
                    });
                },

                format : function (column, data, record) {
                    return column.formatter.format(data, {
                        decimalPlaces : column.decimalPlaces,
                        decimalSeparator : column.decimalSeparator,
                        thousandsSeparator : column.thousandsSeparator,
                        symbol : column.symbol,
                        prefixSymbol : column.prefixSymbol
                    });
                }
            }),
            editor : editor.extend({

                    make : function () {
                        var $editor = this.constructor.__super__.make();
                        $editor.addClass('cell-editor-cost');
                        return $editor;
                    },

                    format : function () {
                        return  this.column.formatter.format(this.data, {
                            decimalPlaces : this.column.decimalPlaces,
                            decimalSeparator : this.column.decimalSeparator,
                            thousandsSeparator : this.column.thousandsSeparator,
                            symbol : this.column.symbol,
                            prefixSymbol : this.column.prefixSymbol
                        });
                    },

                    getNewData : function () {
                        var value = this.getEditorInput().val();
                        value = value.replace(this.column.thousandsSeparator, '');
                        value = value.replace(this.column.symbol, '');
                        return value;
                    },

                    setPosition : function ($editor) {
                        var $cellOffset = this.$cell.offset();
                        $editor.css('top', $cellOffset.top);
                        $editor.css('left', $cellOffset.left);
                        $editor.css('width', this.$cell.css('width'));
                        $editor.css('height', this.$cell.css('height'));
                    }
                }
            )
        };
    });


define('gridapi.grid/columns/core/defaultFormatter',[],function () {
    
    return {
        format : function (value) {
            return value;
        },
        validate : function (value) {
            return true;
        }
    };
});

define('gridapi.grid/columns/core/columnDefinitionFns',
    ['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columns/core/editor', 'gridapi.grid/columns/core/renderer',
        'gridapi.grid/columns/checkColumn', 'gridapi.grid/columns/selectColumn', 'gridapi.grid/columns/spinnerColumn',
        'gridapi.grid/columns/rowSelectorColumn', 'gridapi.grid/columns/textColumn', 'gridapi.grid/columns/dateColumn',
        'gridapi.grid/columns/textAreaColumn', 'gridapi.grid/columns/pickerColumn', 'gridapi.grid/columns/costColumn',
        'gridapi.grid/columns/percentColumn', 'gridapi.grid/i18n/localizedStrings', 'gridapi.grid/columns/core/defaultFormatter'
    ],
    function ($, _, Editor, Renderer, checkColumn, selectColumn, spinnerColumn, rowSelectorColumn, textColumn,
        dateColumn, textAreaColumn, pickerColumn, costColumn, percentColumn, locale, defaultFormatter) {
        
        var columnAlignment = {
            left : 'cell-align-left',
            right : 'cell-align-right',
            center : 'cell-align-center'
        };

        var columnDisplayTypes = {
            text : textColumn,
            textArea : textAreaColumn,
            date : dateColumn,
            check : checkColumn,
            select : selectColumn,
            spinner : spinnerColumn,
            picker : pickerColumn,
            cost : costColumn,
            percent : percentColumn,
            rowSelector : rowSelectorColumn   // internal column
        };

        var columnDataTypes = ['string', 'integer', 'float', 'date', 'boolean', 'enum'];

        var columnDisplayDataAssociations = {
            'string' : ['text', 'textArea', 'picker'],
            'integer' : ['text', 'spinner'],
            'float' : ['text', 'spinner', 'cost'],
            'date' : ['text', 'date'],
            'boolean' : ['text', 'check'],
            'enum' : ['select']
        };

        var defaultColumnDefinition = {
            dataIndex : '_no-data-index_', // data name in object
            title : '_no-header_', // column header text
            tooltip : '', // text displayed when hovered over column header
            headerAlign : 'left', // alignment of column header text 'left', 'right', 'center'
            align : 'left', // alignment of column data text 'left', 'right', 'center'
            width : '100px', // width of the column
            resizable : false, // can the column be resized
            draggable : false, // can the column be moved to a new column position
            displayType : 'text', // type of column to be used for renderer and editor
            dataType : 'string', // data type inside of column
            readOnly : false, // force the column data not to be editable
            filterable : false, // can the column be filtered
            sortable : false, // can the column be sorted
            hideable : false, // can the column be hidden
            menu : false, // display column menu
            formatter : defaultFormatter, // formatter and validator for column
            spinnerMin : null, // minimal value for spinner
            spinnerMax : null, // maximum value for spinner
            spinnerStep : 1, // step interval for spinner
            spinnerType : 'number', // type of spinner - 'number' or 'time'
            selectValues : {}, // enum list for select column
            selectMultiple : false, // multiple selection for select column
            dateType : 'date', // type for date picker widget 'date', 'datetime'
            dateFormat : 'mmm dd yyyy', // string date format 'mmm dd yyyy'
            pickerDisplayFormat : null, // display format for the picker items fn(branch)
            pickerRootId : '0', // id of root element in picker column
            pickerTypeaheadStoreFns : {}, // store functions for picker search field
            pickerLazyLoad : false, // load only on node expansion for picker column
            pickerSelectMultiple : false, // allow for more than one branch to be selected in picker
            pickerStoreFns : {}, // store functions for picker column
            pickerLocale : {                        // locale for picker widget for picker column
                save : locale.picker.save,
                cancel : locale.picker.cancel,
                search : locale.picker.search,
                title : locale.picker.title
            },
            decimalSeparator : '.', // decimal separator for float columns
            thousandsSeparator : ',', // thousands separator for float columns
            symbol : '', // symbol for float columns
            prefixSymbol : true, // symbol position for float columns
            decimalPlaces : 2, // decimal places for float columns
            listDelim : ',', // delimiter separator used for any lists
            renderer : new Renderer(), // custom renderer override
            editor : new Editor(), // custom editor override


            visible : true                          // used for internal use only for column menu
        };

        return function (definedColumn) {

            if (definedColumn == null) {
                throw new Error('columnDefintionFns.js - defined column is undefined.');
            }

            if (definedColumn.dataIndex == null || definedColumn.dataIndex === '' || definedColumn.dataIndex === '_no-data-index_') {
                throw new SyntaxError('dataIndex property has not been set correctly for column.');
            }

            if (definedColumn.dataIndex !== 'row-selector') {
                if (definedColumn.title == null || definedColumn.title === '' || definedColumn.title === '_no-header_') {
                    throw new SyntaxError('title property has not been set correctly for column.');
                }
            }

            if (definedColumn.displayType === 'select' && _.isEmpty(definedColumn.selectValues)) {
                throw new SyntaxError('selectValues property has not been set correctly for the column displayType select');
            }

            if (definedColumn.displayType === 'cost') {
                // set default currency symbol
                definedColumn.symbol = '$';
            }

            if (definedColumn.displayType === 'percent') {
                // set default percent symbol
                definedColumn.symbol = '%';
                definedColumn.prefixSymbol = false;
            }

            var cloneColDef = _.clone(defaultColumnDefinition);

            // column overrides
            var column = columnDisplayTypes[definedColumn.displayType || defaultColumnDefinition.displayType];
            if (column != null) {
                if (column.editor != null) {
                    cloneColDef.editor = new column.editor();
                }

                if (column.renderer != null) {
                    cloneColDef.renderer = new column.renderer();
                }

                if (column.formatter != null) {
                    cloneColDef.formatter = column.formatter;
                }
            }

            // programmer overrides
            if (definedColumn.renderer != null) {
                cloneColDef.renderer = new definedColumn.renderer();
                delete definedColumn.renderer;
            }

            if (definedColumn.editor != null) {
                cloneColDef.editor = new definedColumn.editor();
                delete definedColumn.editor;
            }

            if (definedColumn.formatter != null) {
                cloneColDef.formatter = definedColumn.formatter;
                delete definedColumn.formatter;
            }

            var newCol = {};
            $.extend(true, newCol, cloneColDef, definedColumn);

            return newCol;
        };

    });

define('gridapi.grid/eventHandlers',['gridapi.jquery', 'gridapi.underscore'], function ($, _) {
    

    // 0-9
    var NUM_KEYS = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    // a-z
    var ALPHA_KEYS = [58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
    // multiply, add, subtract, decimal point, divide
    var NUMPAD_KEYS = [106, 107, 109, 110, 111];
    // semi-colon, equal-sign, comma, dash, period, forward slash, grave ascent, open bracket, back bracket, back slash, close bracket, single quote
    var ADDITIVE_KEYS = [186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222];

    return {
        focus : function () {
            var that = this;
            return function (event) {
                // if no selection for the first time then select something
                // this is do give power to the keyboard
                if (that.widget.focus.record == null) {
                    that.selectionModel.cell.firstCellInGrid();
                }
            };
        },

        change : function () {
            var that = this;
            return function (event) {
                var $target = $(event.target);

                var checked = false;
                // check box column
                var $tdCheckColumn = $target.closest('div.cell-renderer-checkbox').parent();
                if ($tdCheckColumn.length) {
                    checked = $tdCheckColumn.find('input').is(':checked');
                    that.widget._cellUpdated($tdCheckColumn.parent().attr('data-id'), $tdCheckColumn.attr('data-index'),
                        checked ? 'true' : 'false');
                }
                else {
                    // selector column
                    var $tdSelectorColumn = $target.closest('div.cell-renderer-selector-checkbox').parent();
                    if ($tdSelectorColumn.length) {
                        checked = $tdSelectorColumn.find('input').is(':checked');
                        that.widget.checkRows([$tdSelectorColumn.parent().attr('data-id')], checked);
                    }
                }
            };
        },
        doubleClick : function () {
            var that = this;
            return function (event) {
                var $target = $(event.target);
                var $td = $target.closest('td');
                if ($td.length) {
                    var $tdCheckColumn = $td.find('div.cell-renderer-checkbox');
                    if (!$tdCheckColumn.length) {
                        // no editor for check column
                        that.widget.editRow($td.parent().attr('data-id'), $td.attr('data-index'), event);
                    }
                }
            };
        },
        scroll : function () {
            return function (event) {
                return false;
            };
        },
        keydown : function () {
            var that = this;
            var TIMER = 75;
            var moveLeftFn = _.throttle(function () {
                that.selectionModel.cell.moveLeft();
            }, TIMER);
            var moveRightFn = _.throttle(function () {
                that.selectionModel.cell.moveRight();
            }, TIMER);
            var moveUpFn = _.throttle(function () {
                that.selectionModel.cell.moveUp();
            }, TIMER);
            var moveDownFn = _.throttle(function () {
                that.selectionModel.cell.moveDown();
            }, TIMER);

            return function (event) {
                var $target = $(event.target);
                switch (event.keyCode) {
                    case $.ui.keyCode.RIGHT:
                        event.preventDefault();
                        moveRightFn();
                        break;
                    case $.ui.keyCode.LEFT:
                        event.preventDefault();
                        moveLeftFn();
                        break;
                    case $.ui.keyCode.UP:
                        event.preventDefault();
                        moveUpFn();
                        break;
                    case $.ui.keyCode.DOWN:
                        event.preventDefault();
                        moveDownFn();
                        break;
                    case $.ui.keyCode.HOME:
                        event.preventDefault();
                        break;
                    case $.ui.keyCode.END:
                        event.preventDefault();
                        break;
                    case $.ui.keyCode.ESCAPE:
                        // stop focus moving away from table
                        event.preventDefault();
                        break;
                    case $.ui.keyCode.SPACE:
                        break;
                }
            };
        },
        keyup : function () {
            var that = this;
            return function (event) {
                var $td = $();
                switch (event.keyCode) {
                    case 89 :
                        // ctrl y (redo)
                        if (that.options.editable && event.ctrlKey) {
                            that.widget.redo();
                        }
                        break;
                    case 90 :
                        // ctrl z (undo)
                        if (that.options.editable && event.ctrlKey) {
                            that.widget.undo();
                        }
                        break;
                    case 83 :
                        // shift s (save)
                        if (that.options.editable && event.shiftKey) {
                            that.widget._trigger('save-accelerator');
                        }
                        break;
                    case 78 :
                        // shift n (new)
                        if (that.options.editable && event.shiftKey) {
                            that.widget._trigger('new-accelerator');
                        }
                        break;
                    case 86 :
                        // ctrl v (paste)
                        if (that.options.editable && event.ctrlKey) {
                            that.widget.pasteRows();
                        }
                        break;
                    case 88 :
                        // ctrl x (cut)
                        if (that.options.editable && event.ctrlKey) {
                            that.widget.cutRows();
                        }

                        break;
                    case 67 :
                        // ctrl c (copy)
                        if (that.options.editable && event.ctrlKey) {
                            that.widget.copyRows();
                        }
                        break;
                    case $.ui.keyCode.SPACE :
                        if (that.options.editable) {
                            // stop focus moving away from table
                            event.preventDefault();
                            if (that.widget.focus.record != null) {
                                that.widget.selectCell();
                                $td = that.selectionModel.focus.$td;
                                var $chkBox = $td.find('input[type="checkbox"]');
                                if ($td.length === 1 && $chkBox.length === 1) {
                                    var isChecked = $chkBox.is(':checked');
                                    if (isChecked) {
                                        $chkBox.removeAttr('checked');
                                    } else {
                                        $chkBox.attr('checked', 'checked');
                                    }
                                    $chkBox.trigger('change');
                                }
                            }
                        }
                        break;
                    case $.ui.keyCode.END :
                        if (event.ctrlKey) {
                            that.selectionModel.cell.lastCellInGrid();
                        } else {
                            that.selectionModel.cell.lastCellInRow();
                        }

                        break;
                    case $.ui.keyCode.HOME :
                        if (event.ctrlKey) {
                            that.selectionModel.cell.firstCellInGrid();
                        } else {
                            that.selectionModel.cell.firstCellInRow();
                        }
                        break;
                    case $.ui.keyCode.ESCAPE :
                        that.closeEditor();
                        that.closeMenus();
                        break;

                    case $.ui.keyCode.UP :
                    case $.ui.keyCode.DOWN :
                    case $.ui.keyCode.LEFT :
                    case $.ui.keyCode.RIGHT :
                        event.preventDefault();
                        break;
                    case 113 :
                        // F2
                        if (that.widget.focus.record != null) {
                            that.widget.selectCell();
                            $td = that.selectionModel.focus.$td;
                            //Due to the scrollTop function we need to give a break in execution as it closes the editor immediately otherwise
                            setTimeout(function () {
                                that.widget.editRow(that.widget._getRecordId(that.widget.focus.record),
                                    that.widget.focus.columnId, {
                                        target : $td,
                                        keyCode : null,
                                        shiftKey : null,
                                        ctrlKey : null
                                    });
                            }, 10);

                        }
                        event.stopPropagation();
                        event.preventDefault();
                        break;
                }
                if (_.contains(NUM_KEYS, event.keyCode) || _.contains(NUMPAD_KEYS,
                    event.keyCode) || _.contains(ADDITIVE_KEYS, event.keyCode) || _.contains(ALPHA_KEYS,
                    event.keyCode)) {
                    // allow for automatic typing to occur in cell
                    if (that.widget.focus.record != null) {
                        that.widget.selectCell();
                        $td = that.selectionModel.focus.$td;
                        //Due to the scrollTop function we need to give a break in execution as it closes the editor immediately otherwise
                        setTimeout(function () {
                            that.widget.editRow(that.widget._getRecordId(that.widget.focus.record),
                                that.widget.focus.columnId, {
                                    target : $td,
                                    keyCode : event.keyCode,
                                    shiftKey : event.shiftKey,
                                    ctrlKey : event.ctrlKey
                                });
                        }, 10);
                    }

                }
            };
        },

        contextMenu : function () {
            var that = this;
            return function (event) {
                var $target = $(event.target);
                // don't allow the default context menu to open when clicking an already open context menu
                if ($target.is('.context-menu-item') || $target.parent().is('.context-menu-item')) {
                    return false;
                }

                // if the $target area is scrolly-grid then it is a keyboard event that was fired
                if ($target.is('.scrolly-grid')) {
                    if (that.selectionModel.focus.$td.is('th')) {
                        that.columnMenu.render(that.selectionModel.focus.$td, event, true);
                    } else if (that.widget.focus.record != null) {
                        that.widget.selectCell();
                        that.contextMenu.render(that.selectionModel.focus.$td, event, true);
                    }
                } else {
                    var $cell = $target;
                    if (!$cell.is('.viewport')) {
                        $cell = $target.closest('td');
                    }
                    that.contextMenu.render($cell, event, false);
                }

                event.stopPropagation();
                event.preventDefault();
            };
        },

        mousedown : function () {
            var that = this;

            return function (event) {
                var $target = $(event.target);
                var dataType = '';

                //fire only on left click
                if (event.which === 1 || event.which === 3) {//left and right click only
                    if (!$target.is('.input')) {
                        var $td = $target.closest('td');
                        if ($td.length) {

                            if (event.which === 1 && !$target.is('th')) {
                                that.rowDragTimeout = setTimeout(function () {
                                    if (that.options.rows.draggable && !that.config.sortBy.length) {
                                        that.rowMover.initMoveRow($td.closest('div.grid-waffer'), $td.parent(),
                                            event.clientY);
                                    }
                                }, 200);

                                $(document.body).on('mouseup', function () {
                                    clearTimeout(that.rowDragTimeout);
                                    $(document.body).off('mouseup');
                                });
                                // comment out so date picker picks up cell clicks
//                                event.preventDefault();
                            }

                            // if not already editing
                            if (!$td.is('.editing')) {
                                // select the cell and row
                                var $tr = $td.parent();
                                var append = false;
                                if ((!event.shiftKey && !event.ctrlKey) || !that.options.multiSelect) {
                                    that.selectionModel.cell.cellSelected($td);
                                }

                                var rowsToSelect = [];
                                rowsToSelect.push($tr.attr('data-id'));
                                if (event.ctrlKey && $tr.is('.row-selected') && that.options.multiSelect) {
                                    that.widget.deselectRows(rowsToSelect, event);
                                } else if (event.shiftKey && that.options.multiSelect) {
                                    rowsToSelect = that.selectionModel.getShiftSelection($tr);
                                    that.widget.selectRows(rowsToSelect);
                                } else {
                                    if (event.ctrlKey && that.options.multiSelect) {
                                        append = true;
                                    }
                                    that.widget.selectRows(rowsToSelect, append, event);
                                }
                            }
                        }
                        //close open context/column menu
                        that.closeMenus();
                        //Cut down on some chrome recalcs
                        event.stopPropagation();
                    }
                }
            };
        }
    };
});

define('gridapi.grid/columnMenu/columnSubMenus',['gridapi.jquery', 'gridapi.underscore'],
    function ($, _) {
        

        return {
            /**
             * Create a new sub menu based on the type.
             * @param grid - access grid functionality
             * @param $parentLi - parent list item for sub menu
             * @param type - type of sub menu
             * @param options - any additional params needing to be passed to sub menu
             */
            init : function (grid, $parentLi, type, options) {

                require(['gridapi.grid/columnMenu/columnTogglesMenu', 'gridapi.grid/menu'],
                    function (columnToggles, menu) {

                        var subMenu = null;
                        switch (type) {
                            case 'columnToggle':
                                subMenu = columnToggles(grid, options.column, options.toggleLayout);
                                break;
                            case 'filter':
//                                theSubMenu = subMenuFactory.generateMenu('filter', $menuContainer,
//                                    {grid : grid, column : args.column});
                                break;
                            default:
                                throw new Error('subMenu.js - Invalid column type.');
                        }

                        // create new sub menu
                        var $menu = subMenu.render();

                        // add sub menu after the parent list item list menu - eg after the ul
                        $parentLi.closest('ul').append($menu);

                        // position menu
                        $menu.position({
                            my : 'left top',
                            at : 'right top',
                            of : $parentLi,
                            offset : '0 0',
                            collision : 'fit'
                        });

                        // select the first item in menu
                        menu.selectFirstMenuItem($menu.find('ul'));
                    });
            }
        };

    });
define('gridapi.grid/menu',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columnMenu/columnSubMenus', 'gridapi.utils/template'], function ($, _, subMenu, creatorFn) {
    

    // templates
    var menuTemplate = creatorFn('<div class="gpbu-grid-menu"><ul></ul></div>');
    var menuItemTemplate = creatorFn('<li data-action="<%=action%>"><a href="#"><img class="icon" src="<%=icon%>">' +
        '<div class="name"><%=name%></div></a></li>');
    var menuItemCheckTemplate = creatorFn('<li data-index="<%=dataIndex%>" data-action="<%=action%>"><a href="#"><input type="checkbox" class="icon"' +
        '<%=checked%>/><div class="name"><%=name%></div></a></li>');

    // markup
    var menuItemDividerMarkup = '<li class="divider"></li>';

    return {

        createMenu : function (options) {
            var $menu = $(menuTemplate(options));

            // add classes
            _.each(options.classes, function (clazz) {
                $menu.addClass(clazz);
            });

            return $menu;
        },

        createMenuItem : function (options) {
            var $li = $(menuItemTemplate(options));

            // add classes
            _.each(options.classes, function (clazz) {
                $li.addClass(clazz);
            });

            // add data
            _.each(options.data, function (data, name) {
                $li.data(name, data);
            });

            return $li;
        },

        createMenuItemCheck : function (options) {
            var $li = $(menuItemCheckTemplate(options));

            // add classes
            _.each(options.classes, function (clazz) {
                $li.addClass(clazz);
            });

            // add data
            _.each(options.data, function (data, name) {
                $li.data(name, data);
            });

            return $li;
        },

        addDivider : function ($ul) {
            $ul.append(menuItemDividerMarkup);
        },

        attachListeners : function ($ul, eventActions, options) {
            var that = this,
                $lis = $ul.find('li'),
                $rootMenu = $ul.closest('.root-menu');

            $rootMenu.data('navigation-type', 'keyboard');

            // trigger any actions we can
            $lis.on('click', function (event) {
                var $li = $(this);
                if ($li.is('.divider')) {
                    return;
                }
                eventActions[$li.attr('data-action')].call(event, $li, options);
            });

            $lis.on('keyup', function (event) {
                // get active list item
                var $li = $ul.find('.item-focused'),
                    action = $li.attr('data-action');

                $rootMenu.data('navigation-type', 'keyboard');
                $rootMenu.find('li.item-focused').removeClass('item-focused-transparent');

                switch (event.keyCode) {
                    case $.ui.keyCode.ENTER :
                        // trigger action and close
                        eventActions[action].call(event, $li, options);
                        break;
                    case $.ui.keyCode.SPACE :
                        // toggle column and dont close
                        eventActions[action].call(event, $li, options);
                        break;
                    case $.ui.keyCode.UP :
                        // move selection up one
                        that.moveSelection($ul, true);
                        break;
                    case $.ui.keyCode.DOWN :
                        // move selection down one
                        that.moveSelection($ul, false);
                        break;
                    case $.ui.keyCode.RIGHT :
                        // open sub menu if item is a sub menu
                        $li.trigger('mouseover', true);
                        break;
                    case $.ui.keyCode.LEFT :
                        // destroy deepest sub menu
                        var $menu = $li.closest('.sub-menu');
                        if (!$menu.is('.root-menu') && $menu.length) {
                            var $subMenuItem = $menu.parent().find('li.item-focused');
                            $subMenuItem.removeClass('item-focused-transparent');
                            that.drawFocus($subMenuItem);
                            $li.parent().remove();
                        }
                        break;
                    case $.ui.keyCode.ESCAPE:
                        // destroy the whole menu
                        $rootMenu = $li.closest('.root-menu');  // context lost
                        var menuApi = $rootMenu.data('menu-api');
                        menuApi.destroy();
                        break;
                    default :
                        //disable all other key events
                        event.stopPropagation();
                        event.preventDefault();
                }
            });

            // to expand sub lists
            $lis.on('mouseover', function (event, fromKeyUp) {
                var $li = $(this),
                    $rootMenu = $li.closest('.root-menu'),
                    action = $li.attr('data-action');

                // if not using the keyboard then remove visual focus
                if (!fromKeyUp) {
                    $rootMenu.data('navigation-type', 'mouse');
                    $rootMenu.find('li.item-focused').addClass('item-focused-transparent');
                }

                // give focus to list item so that if we change to using keys we can move
                that.drawFocus($li);

                if (action === 'check-column') {
                    eventActions[action].call(event, $li, options);
                } else {
                    // destroy deepest sub menu
                    $li.parent().find('.sub-menu').remove();
                }
            });
        },

        moveSelection : function ($ul, up) {
            // use current list item selection and move from there, otherwise start from beginning
            var $lis = $ul.children(),
                $li = $lis.filter('.item-focused'),
                $rootMenu = $ul.closest('.root-menu');


            if (!$li.length) {
                $li = $lis.first();
                $li.addClass('item-focused');
                if ($rootMenu.data('navigation-type') === 'mouse') {
                    $li.addClass('item-focused-transparent');
                }
            } else {
                $li = $li.eq(0);
                $li.removeClass('item-focused');
                var $nextLi = up ? $li.prev() : $li.next();
                if (!$nextLi.length) {
                    $nextLi = up ? $lis.last() : $lis.first();
                }
                // select the next item
                $nextLi.addClass('item-focused');
                if ($rootMenu.data('navigation-type') === 'mouse') {
                    $nextLi.addClass('item-focused-transparent');
                }
                // skip dividers
                if ($nextLi.is('.divider')) {
                    this.moveSelection($ul, up);
                }
                // draw focus to item
                this.drawFocus($nextLi);
            }
        },

        selectFirstMenuItem : function ($ul) {
            var $lis = $ul.find('li');

            // select the first item in menu
            if ($lis.length) {

                // select the first item in the list
                this.moveSelection($ul, false);

                // draw focus to control
                this.drawFocus($lis.eq(0));
            }
        },

        drawFocus : function ($li) {
            // draw focus to anchor tag so we can interact with menu via keyboard
            var $anchor = $li.find('a');
            if ($anchor.length) {
                $anchor.get(0).focus();
            }
        }
    };

});

define('gridapi.grid/contextMenu/contextMenuActions',['gridapi.jquery', 'gridapi.underscore'], function ($, _) {
    
    return {
        action : function ($li, options) {
            var $ul = $li.closest('ul'),
                $menu = $ul.closest('.root-menu'),
                menuApi = $menu.data('menu-api');
            if ($li != null && !$li.length) {
                $li = $ul.find('.item-focused');
            }

            if ($li.length) {
                if (!$li.is('.disabled')) {
                    var action = $li.data('menu-action');
                    if ($.isFunction(options.grid.widget[action])) {
                        // trigger action on widget because it exists
                        options.grid.widget[action].call(options.grid.widget, {});
                    } else {
                        // trigger general action
                        options.grid.widget._trigger(action, {});
                    }
                }
                // close menu
                menuApi.destroy();
            }
        }
    };
});

define('gridapi.grid/contextMenu/contextMenu',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/menu', 'gridapi.grid/contextMenu/contextMenuActions'],
    function ($, _, menu, actions) {
        

        function getIcon(option) {
            if (option.disabled) {
                // add 'disabled' to the image path
                var fileExtensionPeriod = option.icon.lastIndexOf('.'),
                    fileExtension = option.icon.slice(fileExtensionPeriod),
                    filePath = option.icon.slice(0, fileExtensionPeriod);

                return filePath + '-disabled' + fileExtension;
            }

            return option.icon;
        }

        function getRecordFromCell(grid, $td) {
            var recordId = $td.parent().attr('data-id');
            grid.widget.selectCell(recordId, $td.attr('data-index'));
            return grid.widget.store.getRecord(recordId);
        }

        return function (grid) {

            // create menu
            var $menu = menu.createMenu({
                    classes : ['root-menu']
                }),
                $ul = $menu.find('ul'),
                isOpen = false;

            $menu.attr('id', 'pgbu-grid-context-menu');

            return {
                render : function ($td, event, keyboard) {
                    var that = this,
                        record = null,
                        position = null;

                    isOpen = false;

                    // is context menu enabled
                    if (!grid.options.contextMenu.enabled) {
                        return;
                    }

                    // close any open editors
                    if (!grid.closeEditor(false)) {
                        return;
                    }

                    // if using keyboard then use focused cell for position
                    if (keyboard) {
                        position = $td.offset();
                    } else {
                        position = {
                            left : event.pageX,
                            top : event.pageY
                        };
                    }

                    if ($td != null && $td.length && $td.is('td')) {
                        record = grid.widget.focus.record;
                    }

                    var menuOptions = grid.options.contextMenu.populate(record);

                    if (menuOptions != null && menuOptions.length) {

                        // empty list of any previous options
                        $ul.empty();

                        // store the menu instance for use in the actions
                        $menu.data('menu-api', that);

                        // append the options to the menu
                        _.each(menuOptions, function (option) {
                            if (!_.isEmpty(option)) {
                                $ul.append(menu.createMenuItem({
                                    action : 'action',
                                    name : option.label,
                                    icon : getIcon(option),
                                    classes : [option.disabled ? 'disabled' : ''],
                                    data : {
                                        'menu-action' : option.action
                                    }
                                }));
                            }
                            else {
                                menu.addDivider($ul);
                            }
                        });


                        // position menu
                        $menu.css('left', position.left);
                        $menu.css('top', position.top);

                        // attach listeners
                        menu.attachListeners($ul, actions, {
                            grid : grid
                        });

                        // add menu to document body
                        $(document.body).append($menu);

                        // select the first item in menu if using keyboard
                        if (keyboard) {
                            menu.selectFirstMenuItem($ul);
                        }

                        isOpen = true;
                    }
                },

                destroy : function () {
                    isOpen = false;
                    $menu.remove();
                    // pull focus back to grid
                    grid.$grid.get(0).focus();
                },

                isOpen : function () {
                    return isOpen;
                }
            };
        };

    });

define('gridapi.grid/columnMenu/columnMenuActions',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/columnMenu/columnSubMenus'], function ($, _, subMenu) {
    
    return {
        'sort-asc' : function ($li, options) {
            if (!$li.is('.disabled')) {
                var $menu = $li.closest('.menu'),
                    menuApi = $menu.data('menu-api');
                options.grid.widget.sortRows(options.column.dataIndex, this.ctrlKey, 'asc');
                menuApi.destroy();
            }
        },
        'sort-dsc' : function ($li, options) {
            if (!$li.is('.disabled')) {
                var $menu = $li.closest('.menu'),
                    menuApi = $menu.data('menu-api');
                options.grid.widget.sortRows(options.column.dataIndex, this.ctrlKey, 'dsc');
                menuApi.destroy();
            }
        },
        'check-column' : function ($li, options) {
            // destroy deepest sub menu
            $li.parent().find('.sub-menu').remove();

            if ($li.is('.sub-menu-item')) {
                // make the selection appear disappeared from sub menu item
                $li.addClass('item-focused-transparent');

                // expand column sub menu
                var index = $li.data('dataLayoutIndex'),
                    columnLayout = $li.data('columnLayout');
                // get the column layout for the next level if not root level
                if (_.isNumber(index)) {
                    columnLayout = columnLayout.subMenus[index];
                }
                subMenu.init(options.grid, $li, 'columnToggle', {
                    toggleLayout : columnLayout,
                    column : options.column
                });
            }
        },
        'column' : function ($li, options) {
            var $menu = $li.closest('.menu'),
                menuApi = $menu.data('menu-api');

            if (!$li.is('.disabled')) {
                var action = $li.attr('data-action');
                var checkbox = $li.find('input[type="checkbox"]');
                // if event came from checkbox then no need to reset its current state
                if (!$(this.target).is('input[type="checkbox"]')) {
                    if (checkbox.is(':checked')) {
                        checkbox.removeAttr('checked');
                    } else {
                        checkbox.attr('checked', 'checked');
                    }
                }
                var col = options.grid.columnDefinitions[$li.attr('data-index')];
                options.grid.switchColumnVisibilty(col);

                // enable sorting capabilities for column
                if (options.column.dataIndex === col.dataIndex) {
                    var $rootMenu = $li.closest('.root-menu');
                    var $liSorts = $rootMenu.find('li[data-action^="sort-"]');
                    if (col.visible) {
                        $liSorts.removeClass('disabled');
                    } else {
                        $liSorts.addClass('disabled');
                    }
                }

                // disable last available chec column
                menuApi.disableLastColumnToggle();
            }
        }
    };
});

define('gridapi.grid/columnMenu/columnMenu',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/menu', 'gridapi.grid/columnMenu/columnMenuActions'],
    function ($, _, menu, actions) {
        

        return function (grid) {

            // create menu
            var isOpen = false,
                $menu = null;

            function getColumnSortOrder(column) {

                for (var index = 0; index < grid.config.sortBy.length; index++) {
                    var sort = grid.config.sortBy[index];
                    if (column.dataIndex === sort.key) {
                        return sort.order;
                    }
                }
                return '';
            }

            function createRootMenu(column) {

                var $menu = menu.createMenu({
                        classes : ['root-menu']
                    }),
                    $ul = $menu.find('ul');
                $menu.attr('id', 'pgbu-grid-column-menu');

                // create sortable menu items
                if (column.sortable) {
                    var sortOrder = getColumnSortOrder(column);
                    $ul.append(menu.createMenuItem({
                        name : grid.options.locale.sortAscending,
                        icon : 'img/menu_sort_ascending.png',
                        action : 'sort-asc',
                        classes : sortOrder === 'asc' ? ['active'] : []
                    }));


                    $ul.append(menu.createMenuItem({
                        name : grid.options.locale.sortDescending,
                        icon : 'img/menu_sort_descending.png',
                        action : 'sort-dsc',
                        classes : sortOrder === 'dsc' ? ['active'] : []
                    }));

                    menu.addDivider($ul);
                }

                // create toggle column menu
                $ul.append(menu.createMenuItem({
                    name : grid.options.locale.columnToggle,
                    icon : 'img/menu_table_column.png',
                    action : 'check-column',
                    classes : ['sub-menu-item'],
                    data : {
                        columnLayout : grid.options.columnMenu.columnToggleMenu
                    }
                }));

                // create filter column menu
                // TODO

                // attach listeners
                menu.attachListeners($ul, actions, {
                    grid : grid,
                    column : column
                });

                return $menu;
            }

            return {
                render : function ($th, event, keyboard) {

                    // get the column
                    var column = grid.columnDefinitions[$th.attr('data-index')];

                    // if column is not enabled they don't show it
                    if (!grid.options.columnMenu.enabled || !column.menu) {
                        return;
                    }

                    isOpen = false;

                    // clear any previous instances
                    this.destroy();

                    // create column menu
                    $menu = createRootMenu.call(this, column);
                    var $ul = $menu.find('ul');

                    // store the api for later use
                    $menu.data('menu-api', this);

                    // position menu with column
                    var position = $th.offset();
                    $menu.css('left', position.left);
                    $menu.css('top', position.top + $th.outerHeight());

                    // attach column menu to document
                    $(document.body).append($menu);

                    // select the first item in menu if using keyboard
                    if (keyboard) {
                        menu.selectFirstMenuItem($ul);
                    }

                    isOpen = true;
                },

                destroy : function () {
                    if ($menu != null) {
                        $menu.remove();
                    }
                    isOpen = false;
                    grid.$grid.get(0).focus();
                },

                isOpen : function () {
                    return isOpen;
                }
            };
        };
    });
define('gridapi.grid/find',['gridapi.jquery', 'gridapi.underscore'], function ($, _) {
    

    return function (grid) {

        var _params = {},
            _$previousMatch = $(),
            _pointer = 0;

        // declare find events
        var events = {
            trigger : function (event) {
                switch (event) {
                    case 'position':
                        // tell outside world position of pointer and total found
                        grid.widget._trigger('find-position', null, {
                            position : _pointer + 1,
                            total : _$previousMatch.length
                        });
                        break;
                    case 'values' :
                        // give the top ten values found, maybe this could be used for type-ahead - performance will be an issue
                        grid.widget._trigger('find-values', null, {
                            values : _$previousMatch.slice(0, 10)
                        });

                        break;
                }
            }
        };

        function clear() {
            _params = {};
            _pointer = 0;
            _$previousMatch.removeClass('found');
            _$previousMatch = $();
            _.each(grid.config.waffers, function (waffer, wafferIndex) {
                _.each(grid.config.groups, function (group, groupIndex) {
                    var viewport = grid.viewports[waffer.id][group.id];
                    viewport.$tbody.children().removeClass('hide');
                });
            });
            events.trigger('position');
        }

        function highlightFn(position) {
            var $td = _$previousMatch.eq(position);
            grid.widget.selectCell($td.parent().attr('data-id'), $td.attr('data-index'));
            events.trigger('position');
        }

        function searchFn(params) {

            // if values are the same no need to search again
            if (params.term === _params.term && params.hide === _params.hide) {
                return;
            }

            // remove any previous selections
            clear();

            _params = params;

            // if empty do nothing
            if (_params.term === '') {
                return;
            }

            // initiate pattern
            // RULE - find first any occurence
            // RULE - ignore case sensitivity
            var pattern = new RegExp(_params.term, 'i');

            var foundIds = {};

            // search for cell that contain a match
            var $tds = grid.$grid.find('td');
            var tdsMatch = _.filter($tds, function (td) {
                var $td = $(td);
                var test = pattern.test($td.text());
                if (params.hide) {
                    var $tr = $td.parent();
                    if (test) {
                        // found
                        foundIds[$tr.attr('data-id')] = 'found';
                        $tr.removeClass('hide');
                    } else {
                        // not found
                        if (!foundIds[$tr.attr('data-id')]) {
                            $tr.addClass('hide');
                        }
                    }
                }

                return test;
            });

            // tell the outside world the top ten values
            events.trigger('values');

            _$previousMatch = $(tdsMatch);

            // mark cells with style
            _$previousMatch.addClass('found');

            // go to the first location
            highlightFn(0);
        }

        return {
            search : function (params) {
                searchFn(params);
            },
            next : function (params) {
                // go to the next find location
                if (_$previousMatch.length) {
                    ++_pointer;
                    if (_pointer === _$previousMatch.length) {
                        // return to the beginning of the collection
                        _pointer = 0;
                    }
                    highlightFn(_pointer);
                }
            },
            prev : function (params) {
                // go the previous find location
                if (_$previousMatch.length) {
                    --_pointer;
                    if (_pointer < 0) {
                        // return to the beginning of the collection
                        _pointer = _$previousMatch.length - 1;
                    }
                    highlightFn(_pointer);
                }
            },
            reset : function () {
                clear();
            }
        };
    };
});

define('gridapi.grid/gridView',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/sorters',
    'gridapi.grid/selectionModel', 'gridapi.grid/columns/core/columnResizeFns',
    'gridapi.grid/columns/core/columnMover',
    'gridapi.templates/grid/templates/grid.htm', 'gridapi.grid/sizeFns', 'gridapi.grid/rows/rowMoveFns',
    'gridapi.grid/columns/core/columnDefinitionFns', 'gridapi.grid/eventHandlers',
    'gridapi.grid/contextMenu/contextMenu',
    'gridapi.grid/columnMenu/columnMenu', 'gridapi.grid/find',
    'gridapi.utils/template'],
    function ($, _, sorters, SelectionModel, ColumnResizer, ColumnMover, markup, SizingUtil, rowMoveFns,
        columnDefinitionBuilder, eventHandlers, contextMenu, columnMenu, find, creatorFn) {
        // stop exiting keyup functions
        

        function pluckMarkup($markup, clazzName, map) {
            var template = $markup.filter(clazzName).html();
            if (map == null) {
                return template;
            }
            return creatorFn(template, map);
        }

        var ROW_HEIGHT = 31;
        var $markup = $(markup),
            $gridMarkup = $(pluckMarkup($markup, '.htm-grid-layout')),
            viewportTemplate = creatorFn(pluckMarkup($markup, '.htm-viewport')),
            trTemplate = creatorFn(pluckMarkup($markup, '.htm-row')),
            thTemplate = creatorFn(pluckMarkup($markup, '.htm-header-col')),
            thShimTemplate = creatorFn(pluckMarkup($markup, '.htm-header-shim')),
            pseudoScrollerTemplate = creatorFn(pluckMarkup($markup, '.htm-pseudoscroller')),
            flexWafferTemplate = creatorFn(pluckMarkup($markup, '.htm-waffer-flex')),
            fixedWafferTemplate = creatorFn(pluckMarkup($markup, '.htm-waffer-fixed')),
            $scrollShims = $(pluckMarkup($markup, '.htm-scroll-shims')),
            groupResizer = creatorFn(pluckMarkup($markup, '.htm-group-resizer'));

        var selectorGroup = {
            id : 'rowSelectorGroup',
            type : 'fixed',
            columns : [
                {
                    title : '',
                    dataIndex : 'row-selector',
                    displayType : 'rowSelector',
                    align : 'center',
                    width : '40px',
                    readOnly : true,
                    draggable : false
                }
            ]
        };

        var gridView = function (widget) {

            this.widget = widget;
            this.options = widget.options;
            this.$el = this.options.el;
            // add row selector column
            if (this.options.selectionMode === 'check') {
                this.options.columns.groups.unshift(selectorGroup);
            }
            this.config = widget.config;
            // add waffer for headers
            this.options.layout.waffers.unshift({
                id : 'headers',
                type : 'fixed',
                height : 30
            });
            //Holds references to the fake scrollers that are overlaid ontop of the various groups and waffers
            this.pseudoScrollers = {
                vertical : {}, // Handles scrolling for flexible waffers. Keyed off of waffer.id
                horizontal : {} // Handle scroll for flexible column groups. Keyed off of group.id
            };
            //Jquery saved selectors to keep from having to do a find. Keyed off of the waffer.id
            this.$waffers = {};
            //Contains references to viewports accessed via the [wafferId][groupId]
            this.viewports = {};
            //Used to wait for a long press to initiate row dragging
            this.rowDragTimeout = 0;
            //the vertical and horizontal draggers that let a user customize the size of groups and waffers
            this.resizers = {
                group : {},
                waffer : {}
            };

            this.rowDragTimeout = 0;
            this.$grid = $gridMarkup.clone();
            this.columnDefinitions = {};

            // initiate table models
            //And get a bunch of stuff on here. maybe do what i did below
            this.selectionModel = new SelectionModel(this);
            this.columnResizer = new ColumnResizer(this);
            this.rowMover = rowMoveFns(this);
            this.find = find(this);
            this.columnMover = new ColumnMover(this);
            this.contextMenu = contextMenu(this);
            this.columnMenu = columnMenu(this);
            this.virtualRows = {};

            this.currentEditor = null;
            this.$cellEditor = $();

        };

        $.extend(gridView.prototype, {
            remove : function () {
                this.$grid.empty();
                this.$el.empty();
                // wont remove on $el do the action of the above 2 statements?
                this.$el.remove();
            },

            init : function () {
                var that = this;
                that.generateColumnDefinitions(that.options.columns.groups, that.config.groups);
                //Link waffers
                var prevWaffer;
                _.extend(that.config.waffers, that.options.layout.waffers);
                _.each(that.config.waffers, function (waffer) {
                    waffer.prev = prevWaffer;
                    if (prevWaffer != null) {
                        prevWaffer.next = waffer;
                    }
                    prevWaffer = waffer;
                    that.virtualRows[waffer.id] = {
                        displayTop : 0,
                        displayBottom : 10,
                        visibleRows : 0,
                        renderedTop : -1,
                        renderedBottom : -1,
                        records : []
                    };
                });
                that.firstWaffer = _.first(that.config.waffers);
                that.widget.element.append(that.$grid);

                //Fill the layout
                that.createWaffers();

                // construct table shell
                that.generateViewports();
                //Create and fix columns
                that.createColumns();

                // create waffer headers
                that.createWafferHeaders();
                that.initListeners();
            },

            //Todo: have a rethink     MOve into layout Fns
            createWafferHeaders : function () {
                var that = this;
                _.each(that.config.waffers, function (waffer) {
                    if (waffer.id !== 'headers') {
                        var header = waffer.header;
                        if (header != null) {
                            that.createHeaderRow(waffer.id, header.title);
                            that.virtualRows[waffer.id].headerRow = true;
                        }
                    }
                });
            },
            //Move into table functions
            createHeaderRow : function (wafferId, title) {
                var that = this;
                var groups = that.config.groups;
                _.each(groups, function (group) {
                    var $tr = $(trTemplate({id : 'header', groupId : group.id}));
                    var $th = $('<th class="pgbu-cell"></th>');
                    $th.attr('colspan', group.columns.length);
                    //should be derived from the row
                    if (group.id !== 'rowSelectorGroup') {
                        $th.text(title);
                    }
                    $tr.append($th);
                    that.viewports[wafferId][group.id].$thead.append($tr);
                });
            },
            //can stay slightly edit

            initListeners : function () {
                var that = this;
                that.$grid.on('focus', $.proxy(eventHandlers.focus, that)());
                that.$grid.on('keyup', $.proxy(eventHandlers.keyup, that)());
                that.$grid.on('keydown', $.proxy(eventHandlers.keydown, that)());
                that.$grid.on('mousedown', $.proxy(eventHandlers.mousedown, that)());
                that.$grid.on('change', $.proxy(eventHandlers.change, that)());
                that.$grid.on('dblclick', $.proxy(eventHandlers.doubleClick, that)());
                that.$grid.on('contextmenu', $.proxy(eventHandlers.contextMenu, that)());
                that.$grid.on('scroll', $.proxy(eventHandlers.scroll, that)());
                _.each(that.resizers.group, function (resizer) {
                    resizer.$selector.on('mousedown', function () {
                        that.resizeGroup(resizer);
                        return false;
                    });
                });

                var verticalScrollHeight = that.options.scrollbar.rowScrollHeight;
                _.each(that.pseudoScrollers.vertical, function (scroller, wafferId) {
                    var $waffer = that.$waffers[wafferId];
                    //Setup vertical scroll listeners on the actual pseudoScrollers
                    var throttledScrollHandler = _.throttle(function () {
                        var scrollTop = scroller.$scroller.scrollTop();
                        var round = Math.round(scrollTop / ROW_HEIGHT);
                        var ceil = Math.ceil(scrollTop / ROW_HEIGHT);

                        if (ceil === that.virtualRows[wafferId].records.length - that.virtualRows[wafferId].visibleRows) {
                            that.virtualRows[wafferId].displayTop = ceil;
                        } else {
                            that.virtualRows[wafferId].displayTop = round;
                        }

                        that.renderWaffer(wafferId);
                        if (that.closeEditor(true)) {
                            that.$cellEditor = $();
                        }
                    }, 50);
                    scroller.$scroller.on('scroll', throttledScrollHandler);

                    //Allow scrollwhere to work when you are over the proper waffer
                    $waffer.mousewheel(function (event, delta, deltaX, deltaY) {
                        var scrollAmount = 0;
                        if (deltaY > 0) {
                            scrollAmount = -verticalScrollHeight;
                        } else if (deltaY < 0) {
                            scrollAmount = verticalScrollHeight;
                        }
                        if (scrollAmount !== 0) {
                            scroller.$scroller.scrollTop(scroller.$scroller.scrollTop() + scrollAmount);
                            return false;
                            //check for top and allow event to flow out ? maybe
                        }

                    });

                    //swipe support ???? unsure
                });

                _.each(that.pseudoScrollers.horizontal, function (scroller, group) {
                    var $tablesToAdjust = that.viewports['$group-' + group].find('table');
                    scroller.$scroller.scroll(function () {
                        $tablesToAdjust.css('left', -(scroller.$scroller.scrollLeft()));
                        that.closeEditor(true);
                    });
                    //swipe support ???? unsure
                    //Need to handle a similar situation for horizontal scrollwheel.
                });

                // find all the resize markups and place column resizing event upon them
                that.viewports['$waffer-' + _.first(that.config.waffers).id].find('.col-resize-anchor').on('mousedown',
                    function (event) {
                        that.columnResizer.initColumnResize($(this).parent('th'), event.clientX);
                        return false;
                    });
            },
            //Move these into layout functions
            /**
             * Create the waffer structure and add neccessary pseudoScrollers, and scrolling
             * shims for spacing.
             */
            createWaffers : function () {
                var that = this;
                var $scrollers = $();
                _.each(that.config.waffers, function (waffer) {
                    var $waffer;
                    if (waffer.type === 'fixed') {
                        $waffer = $(fixedWafferTemplate(waffer));
                    } else {
                        $waffer = $(flexWafferTemplate(waffer));
                        //Create scrollers and save references to them
                        $scrollers = $scrollers.add(that.createPseudoScroller('vertical', waffer));
                    }
                    // store all waffer options
                    $waffer.data('waffer', waffer);

                    that.$grid.append($waffer);
                    that.$waffers[waffer.id] = $waffer;
                });
                var $shims = $scrollShims.clone();
                that.$grid.find('.waffer-flex').last().after($shims);
                that.$grid.append($scrollers);

                that.$scrollShims = {
                    $bottom : $shims.filter('.bottom-scroll-shim'),
                    $right : $shims.filter('.right-scroll-shim')
                };
            },

            createPseudoScroller : function (type, area) {
                var that = this;
                var $scroller = $(pseudoScrollerTemplate({type : type, id : area.id}));
                that.pseudoScrollers[type][area.id] = {
                    $content : $scroller.find('.empty-content'),
                    $scroller : $scroller
                };
                return $scroller;
            },

            generateViewports : function () {
                var that = this;

                _.each(that.config.waffers, function (waffer) {
                    that.viewports['$waffer-' + waffer.id] = $();
                    that.viewports[waffer.id] = {};
                });

                _.each(that.config.groups, function (group, groupIndex) {
                    that.viewports['$group-' + group.id] = $();
                    _.each(that.config.waffers, function (waffer) {
                        var viewport = {};
                        viewport.type = group.type;
                        viewport.group = group.id;
                        viewport.waffer = waffer.id;
                        viewport.$viewport = $(viewportTemplate(viewport));
                        viewport.$table = viewport.$viewport.find('table');
                        viewport.$tbody = viewport.$table.find('tbody');
                        viewport.tbody = '';
                        viewport.$thead = viewport.$table.find('thead');
                        viewport.thead = [];
                        viewport.$tfoot = viewport.$table.find('tfoot');
                        viewport.tfoot = [];
                        viewport.groupConfig = group; // this will probably change to group etc for now so you can access it
                        viewport.wafferConfig = waffer;

                        that.viewports[waffer.id][group.id] = viewport;

                        //Save selectors
                        that.viewports['$waffer-' + waffer.id] = that.viewports['$waffer-' + waffer.id].add(viewport.$viewport);
                        that.viewports['$group-' + group.id] = that.viewports['$group-' + group.id].add(viewport.$viewport);

                        //Add viewport as data reference on the dom
                        viewport.$viewport.data('viewport', viewport);

                        //Put it on
                        that.$waffers[waffer.id].append(viewport.$viewport);

                    });
                    //Create horizontal scrollers for the proper divs
                    if (group.type === 'flex') {
                        that.$grid.append(that.createPseudoScroller('horizontal', group));
                        that.$grid.append(that.createGroupResizer(group, groupIndex));
                    }
                    ++groupIndex;
                });
                //Remove the resize bar for the last group
                var lastFlexGroup = _.last(_.keys(that.resizers.group));
                if (lastFlexGroup != null) {
                    var resizer = that.resizers.group[lastFlexGroup];
                    if (resizer != null) {
                        resizer.$selector.remove();
                        delete that.resizers.group[lastFlexGroup];
                    }

                }

            },

            //layout functions
            createGroupResizer : function (group) {
                var that = this;
                var resizer = {};
                resizer.$selector = $(groupResizer(group));
                resizer.group = group;
                that.resizers.group[group.id] = resizer;
                return  resizer.$selector;
            },

            generateColumnDefinitions : function (columnGroups, destination) {
                var prevGroup = null;
                var that = this;
                var clonedGroups = {};
                $.extend(true, clonedGroups, {}, columnGroups);
                _.each(clonedGroups, function (group) {
                    group.prev = prevGroup;
                    if (prevGroup != null) {
                        prevGroup.next = group;
                    }
                    prevGroup = group;
                    //Build column definitions
                    for (var c = 0; c < group.columns.length; ++c) {
                        var column = group.columns[c];
                        group.columns[c] = column = columnDefinitionBuilder(column);
                        that.columnDefinitions[column.dataIndex] = column;
                    }

                    destination.push(group);
                });
            },

            createColumns : function () {
                var that = this;

                // loop through each group so we can get the assigned columns
                _.each(that.config.groups, function (group) {
                    _.each(that.config.waffers, function (waffer) {

                        var viewport = that.viewports[waffer.id][group.id];

                        viewport.$headerRow = $('<tr></tr>').appendTo(viewport.$thead);

                        // loop through columns for the group otherwise add header shims into other waffers
                        _.each(group.columns, function (column) {
                            if (column.visible) {
                                // add columns only in the first waffer
                                if (waffer.id === 'headers') {

                                    var $column = $();

                                    // create row selector column markup
                                    if (column.dataIndex === 'row-selector') {
                                        //Todo: configurable per request from matanel
                                        $column = $(column.renderer.thTemplate({
                                            dataIndex : column.dataIndex,
                                            width : column.width,
                                            tooltip : column.tooltip
                                        }));

                                        // listener for select and deselect all
                                        $column.find('input[type="checkbox"]').on('change', function (event) {
                                            var $checkbox = $(this);
                                            var recordsToCheck = [];
                                            for (var w = 0; w < that.config.waffers.length; w++) {
                                                recordsToCheck = _.union(that.virtualRows[that.config.waffers[w].id].records,
                                                    recordsToCheck);
                                            }
                                            that.widget.checkRows(recordsToCheck, $checkbox.is(':checked'));
                                            return false;
                                        });
                                    } else {
                                        // create column markup

                                        var alignment = 'align-' + (column.headerAlign || 'left');

                                        $column = $(thTemplate({
                                            dataIndex : column.dataIndex,
                                            title : column.title,
                                            width : column.width,
                                            align : alignment,
                                            tooltip : column.tooltip
                                        }));

                                        if (column.resize) {
                                            $column.append('<div class="col-resize-anchor"></div>');
                                        }
                                    }

                                    // add column markup to header
                                    viewport.$headerRow.append($column);
                                    // column listeners
                                    var columnTimeout = 0;
                                    $column.on('mousedown', function (event) {
                                        var $md = $(this);
                                        columnTimeout = setTimeout(function () {
                                            var $th = $md.closest('th');
                                            var column = that.columnDefinitions[$th.attr('data-index')];
                                            if (column.draggable) {
                                                that.columnMover.initColumnDrag($th,
                                                    $md.closest('div.viewport').data('viewport'),
                                                    event.clientX);
                                            }
                                        }, 200);
                                        return false;
                                    });


                                    $column.on('mouseup', function (event) {
                                        clearTimeout(columnTimeout);
                                    });

                                    // event for sorting
                                    $column.on('click', function (event) {
                                        var $th = $(this);
                                        // close any editor or menus
                                        that.closeEditor();
                                        that.closeMenus();

                                        var column = that.columnDefinitions[$th.attr('data-index')];
                                        if (column.dataIndex !== 'row-selector' && column.sortable) {
                                            that.widget.sortRows(column.dataIndex, event.ctrlKey);
                                            return false;
                                        }
                                    });

                                    $column.on('contextmenu', function (event) {
                                        var $target = $(event.target);
                                        that.columnMenu.render($target.closest('th'), event, false);
                                        event.stopPropagation();
                                        event.preventDefault();
                                    });

                                    // add column markup to header
                                    viewport.$headerRow.append($column);
                                }
                                else {
                                    viewport.$headerRow.append(thShimTemplate(column));
                                }
                            }
                        });

                    });
                });
            },

            openEditor : function (data, rowId, columnId, event) {
                var that = this;
                //Checks the store in case someone tries to take read only off and try to update the cell. Of course validation still needs to be done on the server
                //this is just an extra little check.
                if (!that.options.editable || _.contains(that.widget.store.getRecordAttributes(that.widget.store.getRecord(rowId)).readOnly,
                    columnId)) {
                    return;
                }

                var $td = $();
                if (event != null) {
                    var $target = $(event.target);
                    $td = $target.closest('td');
                } else {
                    this.widget.selectCell(rowId, columnId, 'middle', false);
                    $td = this.selectionModel.focus.$td;
                }

                var column = that.columnDefinitions[$td.attr('data-index')];

                if (!column.readOnly && column.displayType !== 'check') {

                    // move cell focus
                    $td.addClass('editing');

                    // hide render cell contents whilst editing
                    var $cellRenderer = $td.find('.cell-renderer');
                    $cellRenderer.hide();

                    // create editor cell
                    var $editor = column.editor.initialize(
                        {
                            grid : that,
                            $cell : $td,
                            data : data,
                            column : column,
                            onPersistFn : function (data) {
                                // set the new data
                                that.widget._cellUpdated($td.parent().attr('data-id'), $td.attr('data-index'), data);
                            },
                            onCloseFn : function () {
                                // remove editing class
                                $td.removeClass('editing');

                                // re-show rendered contents
                                $cellRenderer.show();

                                // null out the current editor
                                that.currentEditor = null;

                                // draw focus back to the grid for continued navigation
                                that.$grid.get(0).focus();
                            }
                        }
                    );

                    // save the current editor so we can close it later
                    that.currentEditor = column.editor;
                    that.$cellEditor = $editor;
                    var keyCode = null, shift = false;
                    if (event != null) {
                        keyCode = event.keyCode;
                        shift = event.shiftKey;
                    }
                    column.editor.show(keyCode, shift);
                }
            },


            closeEditor : function (forceClose) {
                if (this.$cellEditor.length && this.currentEditor != null) {
                    // passing true tells the editor to still close even if validation is not correct
                    // value is not persisted and no error message is displayed
                    if (!this.currentEditor.getCommitStarted()) {
                        return this.currentEditor.commit();
                    }
                }
                return true;
            },

            closeMenus : function () {
                // column menu
                this.columnMenu.destroy();

                // context menu
                if (this.contextMenu.isOpen()) {
                    this.contextMenu.destroy();
                }
            },

            /**
             * Build a virtual row
             * @param rowIndex
             * @param waffer
             */
            buildVirtualRow : function (recordId, wafferId) {
                if (wafferId == null) {
                    wafferId = this.widget._getRecordWaffer(recordId);
                }
                return this.viewports['$waffer-' + wafferId].find('tbody tr[data-id="' + recordId + '"]');
            },

            /**
             * Cut selected rows  ... this should just be styling
             */
            cutRecords : function (recordIds) {
                this.clearCopyFlags();
                this.applyClassToRecords(recordIds, 'row-cut');
            },

            /**
             * Copy selected rows  ... this should just be styling
             */
            copyRecords : function (recordIds) {
                this.clearCopyFlags();
                this.applyClassToRecords(recordIds, 'row-copied');
            },

            clearCopyFlags : function () {
                this.$grid.find('.row-cut').removeClass('row-cut');
                this.$grid.find('.row-copied').removeClass('row-copied');
            },

            /**
             * used by cut / copy record
             */
            applyClassToRecords : function (recordIds, className) {
                var that = this;
                _.each(recordIds, function (recordId) {
                    var wafferId = that.widget._getRecordWaffer(recordId);
                    var virtualRows = that.virtualRows[wafferId];
                    var recordIndex = that.getRecordIndex(recordId, wafferId);
                    if (recordIndex >= virtualRows.displayTop && recordIndex <= virtualRows.displayBottom) {
                        that.buildVirtualRow(recordId).addClass(className);
                    }
                });
            },

            clearSelection : function () {
                this.$grid.find('.row-selected').removeClass('row-selected');
                this.$grid.find('.cell-selected').removeClass('cell-selected');
            },

            selectRow : function (virtualRow, selectRow, columnId) {
                if (selectRow == null) {
                    selectRow = true;
                }
                if (selectRow) {
                    virtualRow.addClass('row-selected');
                } else if (virtualRow.is('.row-selected')) {
                    virtualRow.removeClass('row-selected');
                }
                if (columnId != null) {
                    this.selectionModel.cell.selectCell(virtualRow.find('td[data-index="' + columnId + ['"]']));
                }
            },

            selectRecords : function (recordIds, select, columnId) {
                var that = this;
                _.each(recordIds, function (recordId) {
                    var wafferId = that.widget._getRecordWaffer(recordId);
                    var virtualRows = that.virtualRows[wafferId];
                    var recordIndex = that.getRecordIndex(recordId, wafferId);
                    if (recordIndex >= virtualRows.displayTop && recordIndex <= virtualRows.displayBottom) {
                        that.selectRow(that.buildVirtualRow(recordId), select, columnId);
                    }
                });
            },


            checkRow : function (virtualRow, check) {
                if (check) {
                    virtualRow.addClass('row-checked');
                } else if (virtualRow.is('.row-checked')) {
                    virtualRow.removeClass('row-checked');
                }
                virtualRow.find('td[data-index="row-selector"] input').prop('checked', check);
            },

            checkRecords : function (recordIds, check) {
                var that = this;
                _.each(recordIds, function (recordId) {
                    var wafferId = that.widget._getRecordWaffer(recordId);
                    var virtualRows = that.virtualRows[wafferId];
                    var recordIndex = that.getRecordIndex(recordId, wafferId);
                    if (recordIndex >= virtualRows.displayTop && recordIndex <= virtualRows.displayBottom) {
                        that.checkRow(that.buildVirtualRow(recordId), check);
                    }
                });
            },

            selectHeaderCell : function (columnId) {
                this.selectionModel.cell.selectHeader(this.viewports['$waffer-headers'].find('thead tr'), columnId);
            },

            moveRecords : function (recordIds, location) {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                var that = this;
                this.deleteRecords(recordIds, true);
                _.each(recordIds, function (recordId) {
                    that.addRecord(recordId, location, false, false);
                });
                if (this.options.debug) {
                    this.widget._trigger('performance-debug', null,
                        {start : start, end : Date.now(), name : 'move-Records', type : 'view', info : recordIds});
                }
            },

            deleteRecords : function (recordIds, move) {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                var that = this;
                var modifiedWaffers = {};
                var reselect = false;
                _.each(recordIds, function (recordId) {
                    var wafferId = that.widget._getRecordWaffer(recordId);
                    var virtualRows = that.virtualRows[wafferId];
                    var recordIndex = that.getRecordIndex(recordId, wafferId);
                    if (recordIndex < virtualRows.displayTop) {
                        virtualRows.displayTop--;
                    } else if (recordIndex >= virtualRows.displayTop && recordIndex <= virtualRows.displayBottom) {
                        that.deleteRow(recordId, wafferId);
                        virtualRows.renderedBottom--;
                    }
                    modifiedWaffers[wafferId] = true;
                    virtualRows.records.splice(recordIndex, 1);
                    if (that.selectionModel.focus.recordId === recordId) {
                        reselect = true;
                    }
                });

                _.each(_.keys(modifiedWaffers), function (wafferId) {
                    var virtualRows = that.virtualRows[wafferId];
                    if (virtualRows.displayTop < 0) {
                        virtualRows.displayTop = 0;
                    }
                    //Try and force it to fill the viewport
                    if (virtualRows.displayTop + virtualRows.visibleRows > virtualRows.records.length) {
                        virtualRows.displayTop = virtualRows.records.length - virtualRows.visibleRows;
                    }
                    that.renderWaffer(wafferId);
                    if (that.selectionModel.focus.wafferId === wafferId) {
                        if (reselect && !move) {
                            var indexToSelect = that.selectionModel.focus.recordIndex;
                            if (indexToSelect >= virtualRows.records.length) {
                                indexToSelect = virtualRows.records.length - 1;
                            }
                            if (indexToSelect >= 0) {
                                var newSelectionId = virtualRows.records[indexToSelect];
                                that.widget.selectCell(newSelectionId);
                            } else {
                                that.widget.clearSelection();
                            }

                        }
                    }
                });
                if (this.options.debug) {
                    this.widget._trigger('performance-debug', null,
                        {start : start, end : Date.now(), name : 'delete-Records', type : 'view', info : recordIds});
                }
            },

            deleteRow : function (recordId, wafferId) {
                var $virtualRow = this.buildVirtualRow(recordId, wafferId);
                $virtualRow.remove();
            },


            attachRows : function (wafferId, tableSection, rows, action, actionIndex) {
                var that = this;
                var $tbody = that.viewports['$waffer-' + wafferId].find('tbody');

                switch (action) {
                    case 'replace' :
                        $tbody.empty();
                        break;
                    case 'append' :
                        $tbody.find('tr:lt(' + actionIndex + ')').remove();
                        break;
                    case 'prepend' :
                        $tbody.find('tr:gt(' + actionIndex + ')').remove();
                        break;
                    case 'insert' :
                        //Remove from the end the number you are trying to add, must work or further pruning breaks;
                        var cutExcess = this.virtualRows[wafferId].visibleRows - rows.length;
                        $tbody.find('tr:gt(' + cutExcess + ')').remove();
                        break;
                }


                _.each(that.config.groups, function (group) {
                    var rowMarkup = _.pluck(rows, group.id).join(' ');
                    switch (action) {
                        case 'replace' :
                        case 'append' :
                            that.viewports[wafferId][group.id][tableSection].append(rowMarkup);
                            break;
                        case 'prepend' :
                            that.viewports[wafferId][group.id][tableSection].prepend(rowMarkup);
                            break;
                        case 'insert' :
                            that.viewports[wafferId][group.id][tableSection].children().eq(actionIndex).after(rowMarkup);
                            break;
                    }
                });

            },

            replaceRow : function (newRow, oldRow) {
                var that = this;
                oldRow.each(function () {
                    var row = $(this);
                    var replacement = $(newRow[row.attr('data-group-id')]);
                    //If the row was selected need to maintain this selection
                    if (row.is('.row-selected')) {
                        row.before(replacement);
                        row.remove();

                        var cellSelected = row.find('td.cell-selected');
                        if (cellSelected.length) {
                            that.selectionModel.cell.selectCell(replacement.find('td[data-index="' + cellSelected.attr('data-index') + '"]'));
                        }

                    } else {
                        row.before(replacement);
                        row.remove();
                    }

                });

            },

            populateRecords : function (recordId, location) {
                var virtualRows = this.virtualRows[location.waffer];
                virtualRows.records.push(recordId);
            },

            addRecord : function (recordId, location, select) {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                var virtualRows = this.virtualRows[location.waffer];
                var afterIndex = this.getRecordIndex(location.previousRecord, location.waffer);
                if (afterIndex < 0 && (location.previousRecord !== -1 && location.previousRecord != null)) {
                    if (this.selectionModel.focus.recordIndex != null) {
                        afterIndex = this.selectionModel.focus.recordIndex;
                    } else {
                        afterIndex = virtualRows.records.length - 1;
                    }
                }
                virtualRows.records.splice(afterIndex + 1, 0, recordId);

                //If rows do not need to be rendered in
                if ((afterIndex < 0 && virtualRows.displayTop > 0) || //inserted at the very top but not viewing
                    (afterIndex >= 0 && afterIndex < virtualRows.displayTop) || //Standard case of top not in view
                    afterIndex >= virtualRows.displayBottom) { //standard case of not in view below

                    //If a record is inserted above what is displaying change display top to account
                    if (afterIndex < virtualRows.displayTop) {
                        virtualRows.displayTop++;
                    }
                    //If you need to select this record change display top to its index
                    if (select) {
                        virtualRows.displayTop = afterIndex + 1;
                        virtualRows.recordsModified = true;
                    }
                    //If rows do need to be rendered
                } else {

                    var rows = [this.makeRow(recordId, location.waffer)];
                    //Attempting to add to be start of a waffer when the view is scrolled to the top
                    //Prepend row and trim end records, display and render values remain the same
                    if (afterIndex === -1 && virtualRows.displayTop === 0) {
                        this.attachRows(location.waffer, '$tbody', rows, 'prepend', virtualRows.visibleRows - 1);
                        //If the view is not full need to fix renderedBottom count
                        if (virtualRows.records.length <= virtualRows.visibleRows) {
                            virtualRows.renderedBottom++;
                            virtualRows.displayBottom++;
                        }
                        //Attemping to add to the end of a waffer
                    } else if (afterIndex === virtualRows.records.length - 2) {
                        //Adjust render and view references so renderWaffer performs properly
                        virtualRows.renderedBottom++;
                        virtualRows.displayBottom++;

                        var removeCount = 1;
                        //If the waffer is not full do not remove any records else increase render counts for the top
                        if (virtualRows.visibleRows >= virtualRows.displayBottom) {
                            removeCount = 0;
                        } else {
                            virtualRows.displayTop++;
                            virtualRows.renderedTop++;
                        }
                        this.attachRows(location.waffer, '$tbody', rows, 'append', removeCount);

                    } else {
                        this.attachRows(location.waffer, '$tbody', rows, 'insert', afterIndex - virtualRows.displayTop);
                        //If the view is not full need to fix renderedBottom count
                        if (virtualRows.records.length < virtualRows.visibleRows) {
                            virtualRows.renderedBottom++;
                        }
                    }
                }
                if (this.options.debug) {
                    this.widget._trigger('performance-debug', null,
                        {start : start, end : Date.now(), name : 'add-Record', type : 'view', info : recordId});
                }
            },

            //Redraw the elements of the waffer, only creates the rows it needs
            renderWaffer : function (wafferId, forceFullRender) {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                var that = this;
                var virtualRows = this.virtualRows[wafferId];
                //Ensure display
                if (virtualRows.displayTop < 0) {
                    virtualRows.displayTop = 0;
                }
                var displayBottom = virtualRows.displayTop + virtualRows.visibleRows + 1;
                //Check we dont try and draw non existant records
                if (displayBottom >= virtualRows.records.length) {
                    displayBottom = virtualRows.records.length;
                }

                virtualRows.displayBottom = displayBottom;
                //If the data is already rendered do nothing
                if (virtualRows.renderedTop === virtualRows.displayTop && !forceFullRender && virtualRows.renderedBottom === virtualRows.displayBottom) {
                    return;
                }

                var rowStart = virtualRows.displayTop,
                    rowEnd = displayBottom,
                    actionIndex = 0,
                    action = '';

                //If the sets of rows are disjoint add them all and clear everything
                if (forceFullRender || virtualRows.displayTop >= virtualRows.renderedBottom ||
                    virtualRows.displayBottom <= virtualRows.renderedTop) {
                    action = 'replace';
                } else if ((virtualRows.displayTop > virtualRows.renderedTop && //If the beginning is partially rendered
                    virtualRows.displayTop < virtualRows.renderedBottom) || virtualRows.displayBottom > virtualRows.renderedBottom) {
                    rowStart = virtualRows.renderedBottom;
                    //index of rows to remove before
                    actionIndex = virtualRows.displayTop - virtualRows.renderedTop;
                    action = 'append';

                } else if (virtualRows.displayBottom <= virtualRows.renderedBottom && //If the end is partially rendered
                    virtualRows.displayTop < virtualRows.renderedTop) {

                    rowEnd = virtualRows.renderedTop;
                    actionIndex = virtualRows.displayBottom - virtualRows.renderedTop - 1; //Index of how rows to cut after
                    action = 'prepend';
                }

                var rows = [];
                for (var i = rowStart; i < rowEnd; i++) {
                    rows.push(that.makeRow(virtualRows.records[i], wafferId));
                }

                that.attachRows(wafferId, '$tbody', rows, action, actionIndex);
                this.virtualRows[wafferId].renderedTop = virtualRows.displayTop;
                this.virtualRows[wafferId].renderedBottom = virtualRows.displayBottom;
                virtualRows.recordsModified = false;
                if (this.options.debug) {
                    this.widget._trigger('performance-debug', null,
                        {start : start, end : Date.now(), name : 'render-Waffer', type : 'view'});
                }
            },

            makeRow : function (recordId, wafferId) {
                var record = this.widget.store.getRecord(recordId);
                var recordAttributes = this.widget._getRecordAttributes(record);
                var that = this;
                var row = {};
                var id = that.widget._getRecordId(record),
                    groups = that.config.groups,
                    groupsSize = that.config.groups.length,
                    g = 0,
                    group = null;

                for (; g < groupsSize; g++) {
                    group = groups[g];
                    var userClasses = that.options.rows.classes(record, group.id, wafferId),
                        classes = '';
                    if (userClasses.length || recordAttributes.newRow || recordAttributes.selected ||
                        recordAttributes.cut || recordAttributes.copied || recordAttributes.checked) {
                        classes = 'class="' + (recordAttributes.newRow ? 'row-new ' : '');
                        classes += (recordAttributes.selected ? 'row-selected ' : '');
                        classes += (recordAttributes.cut ? 'row-cut ' : '');
                        classes += (recordAttributes.copied ? 'row-copied ' : '');
                        classes += (recordAttributes.checked ? 'row-checked ' : '');
                        classes += userClasses + '"';
                    }
                    var columns = group.columns,
                        column = null,
                        columnsSize = columns.length,
                        c = 0,
                        groupId = group.id,

                        tr = '<tr ' + classes + that.options.rows.attributes(record, group.id, wafferId) +
                            ' data-id="' + id + '" data-group-id="' + groupId + '">';

                    for (; c < columnsSize; c++) {
                        column = columns[c];
                        if (column.visible) {

                            // append cell to row;
                            var data = this.widget.store.getValueFromRecord(record, column.dataIndex);
                            if (column.dataIndex === 'row-selector') {
                                data = recordAttributes.checked;
                            }
                            tr += column.renderer.create(column, record, data,
                                _.contains(recordAttributes.modified, column.dataIndex), //modified
                                (column.readOnly || _.contains(recordAttributes.readOnly, column.dataIndex)), //readonly
                                (recordAttributes.focused && column.dataIndex === that.selectionModel.focus.column)); //selected column
                        }
                    }
                    tr += '</tr>';
                    row[group.id] = tr;
                }
                return row;

            },

            attachDOMTables : function (attach, selector, parent) {
                //detach table body off the dom whilst appending all the rows
                for (var w = 0; w < this.config.waffers.length; w++) {
                    for (var g = 0; g < this.config.groups.length; g++) {
                        var viewport = this.viewports[this.config.waffers[w].id][this.config.groups[g].id];
                        if (attach) {
                            viewport[parent].after(viewport[selector]);
                        } else {
                            viewport[selector].detach();
                        }
                    }
                }
            },

            clearTables : function () {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                for (var w = 0; w < this.config.waffers.length; w++) {
                    for (var g = 0; g < this.config.groups.length; g++) {
                        var viewport = this.viewports[this.config.waffers[w].id][this.config.groups[g].id];
                        viewport.$tbody.empty();
                        viewport.$tfoot.empty();
                    }
                    this.virtualRows[this.config.waffers[w].id].records = [];
                }
                if (this.options.debug) {
                    this.widget._trigger('performance-debug', null,
                        {start : start, end : Date.now(), name : 'clear-Tables', type : 'view'});
                }
            },

            resetHeaders : function () {
                for (var w = 0; w < this.config.waffers.length; w++) {
                    for (var g = 0; g < this.config.groups.length; g++) {
                        var viewport = this.viewports[this.config.waffers[w].id][this.config.groups[g].id];
                        viewport.$thead.empty();
                    }
                }
                this.createColumns();
            },

            cleanModifiedRows : function () {
                this.$grid.find('td.modified').removeClass('modified');
                this.$grid.find('tr.deleted').remove();
                this.$grid.find('tr.new').removeClass('new');
            },

            switchColumnVisibilty : function (column) {
                var that = this;

                column.visible = !column.visible;
                that.resetHeaders();
                _.each(this.config.waffers, function (waffer) {
                    if (waffer.id !== 'headers') {
                        that.renderWaffer(waffer.id, true);
                    }
                });
            },

            getColumnVisibleCount : function () {
                var visibleCount = 0;

                _.each(this.columnDefinitions, function (column) {

                    if (column.dataIndex !== 'row-selector') {
                        if (column.visible === true) {
                            visibleCount++;
                        }
                    }
                });

                return visibleCount;
            },

            getRecordOrder : function (wafferId) {
                return _.clone(this.virtualRows[wafferId].records);
            },

            applySortOrder : function (wafferId, recordOrder) {
                var virtualRows = this.virtualRows[wafferId];
                if (virtualRows.originalOrder == null) {
                    virtualRows.originalOrder = virtualRows.records;
                }
                virtualRows.records = recordOrder;
            },

            clearSort : function () {
                var that = this;
                _.each(this.config.waffers, function (waffer) {
                    var virtualRows = that.virtualRows[waffer.id];
                    var forceRerender = false;
                    if (virtualRows.originalOrder != null) {
                        virtualRows.records = that.virtualRows[waffer.id].originalOrder;
                        virtualRows.originalOrder = null;
                        forceRerender = true;
                    }
                    that.renderWaffer(waffer.id, forceRerender);
                });
            },

            resize : function () {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                var width, height;
                var $parent = this.$grid.parent();
                if (this.config.width.indexOf('%') === -1) {
                    width = parseFloat(this.config.width);
                } else {
                    width = $parent.width() * (parseFloat(this.config.width) / 100);
                }

                if (this.config.height.indexOf('%') === -1) {
                    height = parseFloat(this.config.height);
                } else {
                    height = $parent.height() * (parseFloat(this.config.height) / 100);
                }

                var gridWidth = parseInt(width, 10),
                    gridHeight = parseInt(height, 10);
                //Set the size of the grid.
                this.$grid.css('width', gridWidth);
                this.$grid.css('height', gridHeight);

                var requiresVerticalShim = SizingUtil.calculateWafferHeights(this, gridHeight, false);
                var requiresHorizontalShim = SizingUtil.calculateGroupWidths(this, gridWidth, requiresVerticalShim);
                //Need to recalculate
                if (requiresHorizontalShim) {
                    SizingUtil.calculateWafferHeights(this, gridHeight, requiresHorizontalShim);
                    this.$scrollShims.$bottom.css('display', 'block');
                } else {
                    this.$scrollShims.$bottom.css('display', 'none');
                }
                if (requiresVerticalShim) {
                    this.$scrollShims.$right.css('display', 'block');
                } else {
                    this.$scrollShims.$right.css('display', 'none');
                }
                SizingUtil.resizeWaffersFn(this, requiresVerticalShim);
                SizingUtil.resizeGroupsFn(this, gridHeight);
                if (this.options.debug) {
                    this.widget._trigger('performance-debug', null,
                        {start : start, end : Date.now(), name : 'resize', type : 'view'});
                }
            },

            resizeGroup : function (resizer, mouseX) {
                var gridOffset = this.$grid.offset().left;
                resizer.$selector.addClass('dragging');
                this.$grid.on('mousemove.group-resize', _.throttle(SizingUtil.onGroupDragFn(resizer, gridOffset), 20));
                $(document.body).on('mouseup.group-resize', SizingUtil.resizeDraggedGroupFn(this, resizer));
                SizingUtil.moveResizeBarFn(resizer, mouseX - gridOffset);
            },

            scrollFocusIntoView : function () {
                var $selection = this.selectionModel.focus.$td;
                var viewport = this.selectionModel.focus.viewport;
                var hScroller = this.pseudoScrollers.horizontal[viewport.group];
                if (hScroller != null) {
                    var start;
                    if (this.options.debug) {
                        start = Date.now();
                    }
                    var width = 0;
                    if ($selection.is('th')) {
                        width = parseInt($selection.attr('width'), 10);
                    } else {
                        width = parseInt(viewport.$thead.find('th[data-index="' + $selection.attr('data-index') + '"]').attr('width'),
                            10);
                    }
                    var viewWidth = viewport.$viewport.width(),
                        requiredToView = viewport.$table.position().left + $selection.position().left + width,
                        missingAmount = requiredToView - viewWidth;
                    if (missingAmount > 0) {
                        hScroller.$scroller.scrollLeft(hScroller.$scroller.scrollLeft() + missingAmount);
                    } else if (requiredToView < width) {
                        hScroller.$scroller.scrollLeft(hScroller.$scroller.scrollLeft() + requiredToView - width);
                    }
                    if (this.options.debug) {
                        this.widget._trigger('performance-debug', null,
                            {start : start, end : Date.now(), name : 'scroll-Focus-Into-View', type : 'view'});
                    }
                }
            },
            //Returns true if the scollbar needs to be updated still, IE flicker bug
            renderFocus : function (recordId, wafferId, columnId, location) {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                if (recordId != null) {
                    var virtualRows = this.virtualRows[wafferId];

                    this.selectionModel.focus.recordId = recordId;
                    this.selectionModel.focus.wafferId = wafferId;
                    if (virtualRows[this.selectionModel.focus.recordIndex] !== recordId) {
                        this.selectionModel.focus.recordIndex = _.indexOf(virtualRows.records, recordId);
                    }
                    if (columnId != null) {
                        this.selectionModel.focus.column = columnId;
                    }

                    var updateScrollbar = this.renderRecord(this.selectionModel.focus.recordId,
                        this.selectionModel.focus.wafferId,
                        location, this.selectionModel.focus.recordIndex);

                    if (this.options.debug) {
                        this.widget._trigger('performance-debug', null,
                            {start : start, end : Date.now(), name : 'render-focus', type : 'view'});
                    }

                    return updateScrollbar;
                }
                return false;
            },

            getRecordIndex : function (recordId, wafferId) {
                if (wafferId == null) {
                    wafferId = this.widget._getRecordWaffer(recordId);
                }
                var virtualRows = this.virtualRows[wafferId];
                for (var i = virtualRows.displayTop; i < virtualRows.records.length; ++i) {
                    if (virtualRows.records[i] === recordId) {
                        return i;
                    }
                }
                return _.indexOf(virtualRows.records, recordId);
            },

            //Renders the requested record into the view, the location attribute is where you want
            //the record to be displayed in the waffer: 'top' 'middle' 'bottom'
            //returns true if renderWaffer is required meaning we need to update the scrollbar (IE performance fix for flicker
            renderRecord : function (recordId, wafferId, location, recordIndex) {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                var virtualRows = this.virtualRows[wafferId];

                if (recordIndex == null) {
                    recordIndex = this.getRecordIndex(recordId, wafferId);
                }

                //Detemine what the top index should be.
                //Already in view return
                if (recordIndex >= virtualRows.displayTop && recordIndex <= virtualRows.displayTop + virtualRows.visibleRows - 1) {
                    return false;
                }
                var newTopIndex = recordIndex;
                if (location == null || location === 'top') {
                    newTopIndex = recordIndex;
                } else if (location === 'middle') {
                    newTopIndex = recordIndex - Math.floor(virtualRows.visibleRows / 2);
                } else if (location === 'bottom') {
                    newTopIndex = recordIndex - virtualRows.visibleRows + 1; // +1 is for index offset
                }
                //Try and force it to fill the viewport
                if (newTopIndex + virtualRows.visibleRows > virtualRows.records.length) {
                    newTopIndex = virtualRows.records.length - virtualRows.visibleRows;
                }
                //Not enough records to do what its trying, just render from 0
                if (newTopIndex < 0) {
                    newTopIndex = 0;
                }

                //Set the top and rerender the waffer
                virtualRows.displayTop = newTopIndex;
                this.renderWaffer(wafferId);
                //This used to be where we updated scrollbar IE flicker means we return true and have it done after
                //select
                if (this.options.debug) {
                    this.widget._trigger('performance-debug', null,
                        {start : start, end : Date.now(), name : 'render-record', type : 'view'});
                }
                return true;
            },

            //Delayed scrollbar updating brought to you by IEs poor performance
            updateWafferScrollbar : function (wafferId) {
                var virtualRows = this.virtualRows[wafferId];
                this.pseudoScrollers.vertical[wafferId].$scroller.scrollTop(virtualRows.displayTop * ROW_HEIGHT);
            }
        })
        ;

        return gridView;
    }
)
;

define('gridapi.grid/storeWrapper',['gridapi.jquery', 'gridapi.underscore'], function ($, _) {
    

    var optionDefaults = {

    };

    /**
     * Data Related Actions: Cut, Copy, Paste, Delete, New    (Is this only for toolbar)
     * Store Related : Sort, Filter, Page, Load, Save, Cancel, Update, Undo, Redo, Load Children,
     * View Related : Resize, Select, ColumnToggle, Column Moved, Row Moved, Group
     *
     * Callable: Find, Find Next, Find Prev
     *
     *
     * Grid Triggered Actions:
     * Filldown, Delete (delete), Paste (paste), Copy (copy),
     *
     */
    var StoreWrapper = function (store, widget) {
        this.store = store;
        this.options = widget.options;
        this.widget = widget;
        var storeFns = this.options.storeFns;
        this.group = storeFns.group || this.group;
        this.sort = storeFns.sort || this.sort;
        this.filter = storeFns.filter || this.filter;
        this.getRecord = storeFns.getRecord || this.getRecord;
        this.getRecords = storeFns.getRecords || this.getRecords;
        this.newRecord = storeFns.newRecord || this.newRecord;
        this.cutRecords = storeFns.cutRecords || this.cutRecords;
        this.copyRecords = storeFns.copyRecords || this.copyRecords;
        this.deleteRecords = storeFns.deleteRecords || this.deleteRecords;
        this.attachListeners = storeFns.attachListeners || this.attachListeners;
        this.placeRecord = storeFns.placeRecord || this.placeRecord;
        this.iterateStore = storeFns.iterateStore || this.iterateStore;
        this.updateRecord = storeFns.updateRecord || this.updateRecord;
        this.commit = storeFns.commit || this.commit;
        this.reset = storeFns.reset || this.reset;
        this.deletedRecords = [];
        this.getRecordAttributes = storeFns.getRecordAttributes || this.getRecordAttributes;
        this.checkRecordPermissions = storeFns.checkRecordPermissions || this.checkRecordPermissions;
        this.updateRecordPlacement = storeFns.updateRecordPlacement || this.updateRecordPlacement;
        this.modified = {};
        this.readOnly = {};

        this.newRecords = {};

    };

    StoreWrapper.prototype = {
        constructor : StoreWrapper,

        sort : function (args) {
            return false;
        },

        group : function (args) {
            return false;
        },

        filter : function (args) {
            return false;
        },

        getRecord : function (id) {
            if(id < 0) {
                return this.newRecords[id];
            }
            return this.store[id];
        },

        getRecords : function (ids) {
            var records = [];
            var that = this;
            _.each(ids, function (id) {
                records.push(that.getRecord(id));
            });
            return records;
        },

        newRecord : function (type) {
            var record = {};
            record[this.widget.options.rows.id] = '' + -(_.uniqueId() + 1);
            record.title = 'You should probably overwrite this method !!';
            record.type = type;
            return record;
        },

        addRecords : function (records) {
            var that = this;
            var stripOut = [];
            _.each(records, function (record) {
                var recordIndex = _.indexOf(that.deletedRecords, record);
                if(recordIndex !== -1) {
                    delete that.deletedRecords[recordIndex];
                    stripOut.push(record);
                }
                if(record[that.widget.options.rows.id] < 0) {
                    that.newRecords[record[that.widget.options.rows.id]] = record;
                }
            });
            this.store.push(_.difference(records, stripOut));
            this.widget._recordsAdded(records);
        },

        cutRecords : function (records, destination) {
            //Dont think it does anythign by default
        },

        copyRecords : function (records, destination) {
            var that = this;
            var newRecords = [];
            _.each(records, function (record) {
                var newRecord = $.extend(true, that.newRecord(), record);
                newRecord.id = '' + -(_.uniqueId());
                that.store.push(newRecord);
                newRecords.push(newRecord);
            });
            return newRecords;
        },
        deleteRecords : function (records) {
            this.deletedRecords = _.union(this.deletedRecords, records);
            this.widget._recordsRemoved(records);
        },
        attachListeners : function () {
            //Cant really watch an array now can we ....
        },
        placeRecord : function (record) {
            var location = {
                waffer : record.__location__,
                table : '$tbody',
                previousRecord : record.parentId
            };

            if(location.waffer == null || location.waffer === '') {
                location.waffer = this.widget.defaultWaffer;
            }
            return location;
        },
        iterateStore : function (functionToRun, thisContext, args) {
            for (var i = 0; i < this.store.length; ++i) {
                functionToRun.call(thisContext, this.store[i], args);
            }
        },
        updateRecord : function (record, key, data) {
            record[key] = data;

            if(this.modified[record.id] != null) {
                this.modified[record.id].push(key);
            } else {
                this.modified[record.id] = [key];
            }
            // TODO: modified flag is constantly set to true for now
            // TODO: if its going to track changes it needs to clear this;
            this.widget._recordUpdated(record, key, data, true);
        },
        getValueFromRecord : function (record, key) {
            return record[key];
        },

        commit : function () {
            this.widget.repopulate();
            this.modified = {};
            this.readOnly = {};
        },

        reset : function () {
            this.widget.repopulate();
            this.modified = {};
            this.readOnly = {};
        },
        //return an array of column keys that will be read only
        checkRecordPermissions : function (record) {
            return ['description'];
        },

        moveRecords : function (records, newParent) {
            for (var i = 0; i < records.length; ++i) {
                if(i === 0) {
                    if(newParent != null) {
                        records[i].parentId = newParent.id;
                    }
                } else {
                    records[i].parentId = records[i - 1].id;
                }
                if(newParent != null) {
                    records[i].__location__ = newParent.__location__;
                }
            }
        },

        //Build the record attributes to see if a record is new, its readonly fields and its modified values
        getRecordAttributes : function (record) {
            var attributes = { newRow : false, modified : [], readOnly : []};
            if(this.modified[record.id] != null) {
                attributes.modified = this.modified[record.id];
            }
            if(this.readOnly[record.id] != null) {
                attributes.readOnly = this.readOnly[record.id];
            } else {
                var readOnly = this.checkRecordPermissions(record);
                attributes.readOnly = readOnly;
                this.readOnly[record.id] = readOnly;
            }
            if(record.id < 0) {
                attributes.newRow = true;
            }
            return attributes;
        },
        //Indicating a row has been dropped into a new waffer
        updateRecordPlacement : function (record, oldWafferId, newWafferId) {
            if(oldWafferId !== newWafferId) {
                record.__location__ = newWafferId;
            }
        }
    };

    return StoreWrapper;

});

define('gridapi.grid/filterController',['gridapi.jquery', 'gridapi.underscore'], function ($, _) {
    

    function calculateMillis(value) {
        var valueDate = new Date(value);
        var valueHours = valueDate.getHours();

        return(valueDate.getTime() - ((valueHours * 3600000)));
    }

    return function (gridView) {

        return{
            triggerFilter : function (dataType, args) {
                var options = {};

                switch (dataType) {
                    case 'integer':
                    case 'float':
                    case 'date':
                        options.filterType = args.filterType;
                        break;
                    case 'enum':
                        options.selectMultiple = args.selectMultiple;
                        break;
                }

                options.dataType = dataType;
                options.value = args.value;

                gridView.widget.filterRows(gridView.columnDefinitions[args.columnId],
                    gridView.columnDefinitions[args.columnId].filterable, options);
            },
            deleteFilter : function (column) {
                gridView.widget.filterRows(column, false, {});
            },
            _generateFilter : function (column, args) {
                switch (column.dataType) {
                    case 'picker':
                        return function (value) {
                            var valueIDs = [];

                            _.each(value, function (rowValue) {
                                valueIDs.push(rowValue.id);
                            });

                            for (var i = 0; i < args.value.length; i++) {

                                for (var j = 0; j < valueIDs.length; j++) {
                                    if (args.value[i].id === valueIDs[j]) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        };
                    case 'integer':
                        if (args.filterType === 'greater') {
                            //greater than filter
                            return function (value) {
                                if (parseInt(value, 10) < parseInt(args.value, 10)) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        else if (args.filterType === 'lesser') {
                            //less than filter
                            return function (value) {
                                if (parseInt(value, 10) > parseInt(args.value, 10)) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        else if (args.filterType === 'range') {
                            return function (value) {
                                if (parseInt(value, 10) < parseInt(args.value.greater, 10) && parseInt(value,
                                    10) > parseInt(args.value.lesser, 10)) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        else {
                            //equals filter
                            return function (value) {
                                if (parseInt(value, 10) === parseInt(args.value, 10)) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        break;
                    case 'float':
                        if (args.filterType === 'greater') {
                            return function (value) {

                                if (parseFloat(value) < parseFloat(args.value)) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        else if (args.filterType === 'lesser') {
                            return function (value) {
                                if (parseFloat(value) > parseFloat(args.value)) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        else if (args.filterType === 'range') {
                            return function (value) {

                                if (parseFloat(value) < parseFloat(args.value.greater) &&
                                    parseFloat(value) > parseFloat(args.value.lesser)) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        else {
                            //filterType = 'equals'
                            return function (value) {
                                if (parseFloat(value) === parseFloat(args.value)) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        break;
                    case 'string':
                    case 'large':
                        return function (value) {
                            if (value.toLowerCase().indexOf(args.value.toLowerCase()) !== -1) {
                                return true;
                            }

                            return false;
                        };
                    case 'date':
                        if (args.filterType === 'greater') {
                            return function (value) {
                                if (calculateMillis(value) < args.value.getTime()) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        else if (args.filterType === 'lesser') {
                            return function (value) {
                                if (calculateMillis(value) > args.value.getTime()) {
                                    return true;
                                }
                                return false;
                            };
                        }
                        else if (args.filterType === 'range') {
                            return function (value) {
                                var millis = calculateMillis(value);

                                if (millis > args.value.lesser.getTime() && millis < args.value.greater.getTime()) {
                                    return true;
                                }

                                return false;
                            };
                        }
                        else {
                            return function (value) {
                                if (calculateMillis(value) === args.value.getTime()) {
                                    return true;
                                }

                                return false;
                            };
                        }
                        break;
                    case 'enum':
                        if (args.selectMultiple === true) {
                            return function (value) {
                                for (var i = 0; i < value.length; i++) {
                                    if (_.indexOf(args.value, parseInt(value[i], 10)) !== -1) {
                                        return true;
                                    }
                                }
                                return false;
                            };
                        }
                        else {
                            return function (value) {
                                if (_.indexOf(args.value, parseInt(value, 10)) === -1) {
                                    return false;
                                }
                                else {
                                    return true;
                                }
                            };
                        }
                }
            },
            _updateFilterConfig : function (column, args, filterConfig) {
                var config = {key : column, args : args};
                if (filterConfig != null) {
                    config = filterConfig;
                }

                //create a new filter based on arguments supplied
                config.filter = this._generateFilter(column, args);

                return config;
            }
        };
    };


});

define('gridapi',['gridapi.jquery', 'gridapi.underscore', 'gridapi.grid/gridView', 'gridapi.grid/storeWrapper',
    'gridapi.grid/sorters', 'gridapi.grid/i18n/localizedStrings', 'gridapi.grid/filterController', 'gridapi.jqueryui',
    'gridapi.mousewheel', 'oui', 'pgbucoreapi'],
    function ($, _, GridView, DefaultStoreWrapper, sorters, locale, FilterController, jqui, core) {
        

        /**
         * Data Related Actions: Cut, Copy, Paste, Delete, New    (Is this only for toolbar)
         * Store Related : Sort, Filter, Page, Load, Save, Cancel, Update, Undo, Redo, Load Children,
         * View Related : Resize, Select, ColumnToggle, Column Moved, Row Moved, Group
         *
         * Callable: Find, Find Next, Find Prev
         *
         *
         */

        var UTILS = {
            determineWafferPercents : function (waffers) {
                var setPercentage = 0;
                var alreadySet = 0;

                var flexWaffers = _.filter(waffers, function (waffer) {
                    return waffer.type === 'flex';
                });
                _.each(flexWaffers, function (waffer) {
                    if (waffer.percent != null) {
                        waffer.percent = parseInt(waffer.percent, 10);
                        setPercentage += waffer.percent;
                        alreadySet++;
                    }
                });
                if (flexWaffers.length > alreadySet) {
                    var percentPerWaffer = (100 - setPercentage) / flexWaffers.length - alreadySet;
                    _.each(flexWaffers, function (waffer) {
                        if (waffer.percent == null) {
                            waffer.percent = percentPerWaffer;
                        }
                    });
                }
            }
        };

        $.widget('pgbu.grid', {
            //Defaults
            options : {
                columns : {},
                createRow : $.noop,
                filter : {},
                contextMenu : {
                    enabled : false,
                    populate : $.noop
                },
                columnMenu : {
                    enabled : false,
                    columnToggleMenu : {}
                },
                editable : false,
                debug : false,
                layout : {
                    width : '500px',
                    height : '500px',
                    waffers : [],
                    autoResize : true
                },
                scrollbar : {
                    extraHeight : 15,
                    extraWidth : 15,
                    rowScrollHeight : 31
                },
                borders : {
                    size : 2
                },
                sizing : {
                    minColumnWidth : 40,
                    minGroupWidth : 100
                },
                rows : {
                    id : 'id',
                    draggable : false,
                    classes : function (record, groupId, wafferId) {
                        //Space separated list of classes
                        //Example 'my-row-type icon-class awesome-hightlight-class'
                        return '';
                    },
                    attributes : function (record, groupId, wafferId) {
                        //Add attributes
                        return '';
                    }
                },
                storeFns : {},
                selectionMode : 'default',
                multiSelect : true,
                locale : locale
            },

            _create : function () {
                var that = this;
                if (this.options.layout.autoResize) {
                    $(window).on('resize.grid', _.debounce(function () {
                        that.resize();
                    }, 300));
                }
                this.widgetEventPrefix = 'grid-';
                this.eventNamespace = 'grid-';
                this.config = {
                    waffers : [],
                    groups : [],
                    height : this.options.layout.height,
                    width : this.options.layout.width,
                    filter : this.options.filter,
                    contextMenu : this.options.contextMenu,
                    sortBy : []
                };
                this.idKey = this.options.rows.id;
                this.view = new GridView(this);
                this.view.init();
                this.filterController = new FilterController(this.view);
                if (this.options.selectionMode === 'check') {
                    this.options.multiSelect = false;
                }
                this.selection = {
                    records : []
                };

                this.focus = {
                    record : null,
                    column : null
                };

                this.checkedRecords = [];

                this.clipboard = {
                    records : [],
                    mode : 'cut'
                };

                this.paging = {
                    startIndex : 0,
                    pageSize : 50,
                    page : 0,
                    loaded : 150,
                    totalRows : 300
                };
                this.defaultWaffer = _.filter(this.config.waffers, function (waffer) {
                    return waffer.type === 'flex';
                })[0].id;
                if (this.defaultWaffer == null) {
                    this.defaultWaffer = this.config.waffers[0].id;
                }
                this.undoStack = [];
                this.redoStack = [];

                UTILS.determineWafferPercents(this.config.waffers);

                var triggerDirty = function () {
                    that._trigger('is-dirty');
                };

                this.element.bind('grid-cell-updated', triggerDirty);
                this.element.bind('grid-rows-added', triggerDirty);
                this.element.bind('grid-rows-deleted', triggerDirty);
                this.element.bind('grid-rows-pasted', triggerDirty);
                this.view.resize();
            },

            _setOption : function (key, value) {
                $.Widget.prototype._setOption.apply(this, arguments);
                // TODO: update grid correctly depending on option that has changed.
                // maybe nothing should happen
            },

            destroy : function () {
                // remove any editors and menus
                this.view.closeEditor();
                this.view.closeMenus();

                this.element.children().each(function () {
                    $(this).remove();
                });

                this.element.empty();
                this._tearDownTriggers();
                // Does nice things like unbind all namespaced events on the original element
                delete this.store;
                delete this.view;
                $.Widget.prototype.destroy.call(this);
            },

            _tearDownTriggers : function () {
                this.element.unbind('grid-cell-updated');
                this.element.unbind('grid-rows-added');
                this.element.unbind('grid-rows-deleted');
                this.element.unbind('grid-rows-pasted');
                $(window).off('resize.grid');
                this.element.off(this.widgetEventPrefix);
            },

            _getRecordId : function (record) {
                return this.store.getValueFromRecord(record, this.idKey);
            },

            //Called from grid view when a change is made
            _cellUpdated : function (recordId, key, data) {
                var record = this.store.getRecord(recordId);
                this._pushUndoAction({
                    type : 'edit',
                    key : key,
                    data : _.clone(this.store.getValueFromRecord(record, key)),
                    record : record
                });
                this.store.updateRecord(record, key, data);
            },


            //************************************************************
            // METHODS TO CALL FROM STORE
            //************************************************************
            _recordUpdated : function (record, key) {
                var recordId = this._getRecordId(record);
                this._updateRow(record);
                this._trigger('cell-updated', null, [recordId, key, record]);
            },


            //Tweak addRow to take in parent, add get parent from store, option for when no parent, top, after selection, etc, sibling
            _recordsAdded : function (records, select) {
                var that = this;
                var waffersToRender = [];
                _.each(records, function (record) {
                    var location = that.store.placeRecord(record);

                    if (select == null) {
                        select = true;
                    }
                    if (!_.contains(waffersToRender, location.waffer)) {
                        waffersToRender.push(location.waffer);
                    }
                    that._addRecordToView(record, {location : location, bulk : false, select : select});
                });
                _.each(waffersToRender, function (wafferId) {
                    that.view.renderWaffer(wafferId);
                });
                this.view.resize();
                if (select) {
                    this.selectCell(this._getRecordId(_.last(records)));
                }
                this._trigger('rows-added', null, records);
            },

            _recordsRemoved : function (records) {
                var that = this;
                var recordIds = [];
                _.each(records, function (record) {
                    recordIds.push(that._getRecordId(record));
                });
                that.view.deleteRecords(recordIds);
                that.view.resize();
                that.selection.records = _.difference(that.selection.records, records);
                if (_.contains(records, that.focus.record)) {
                    that.focus.record = null;
                }
                that.checkedRecords = _.difference(that.checkedRecords, records);
                that._trigger('rows-deleted', null, records);
            },

            //************************************************************
            //Methods exposed on the widget
            //************************************************************
            newRow : function () {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }

                if (this._trigger('before-new', null, {args : arguments,
                    selection : this.selection.records
                }) === false) {
                    return;
                }

                var record = this.store.newRecord.apply(this.store, arguments);

                this._pushUndoAction({
                    records : [record],
                    type : 'new'
                });
                this.store.addRecords([record]);
                if (this.options.debug) {
                    this._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'new-row',
                        type : 'widget'});
                }
            },

            deleteRows : function () {
                var records = this.getSelection();
                if (records.length) {
                    var start;
                    if (this.options.debug) {
                        start = Date.now();
                    }
                    if (this._trigger('before-delete-selected', null, records) === false) {
                        return;
                    }
                    this.store.deleteRecords(records);
                    this._pushUndoAction({
                        type : 'delete',
                        records : _.clone(records)
                    });
                    if (this.options.debug) {
                        this._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'delete-rows',
                            type : 'widget'});
                    }
                }

            },

            editRow : function (recordId, columnId, event) {
                var record = this.store.getRecord(recordId);
                var data = this.store.getValueFromRecord(record, columnId);
                this.view.openEditor(data, recordId, columnId, event);
            },

            //location: top bottom middle (where you want it to render in the waffer)
            selectCell : function (recordId, columnId, location, appendToSelection) {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                if (recordId != null) {
                    this.focus.record = this.store.getRecord(recordId);
                } else {
                    if (this.focus.record != null) {
                        recordId = this._getRecordId(this.focus.record);
                    } else {
                        recordId = this.view.virtualRows[this.config.waffers[1].id].records[0];
                        if (recordId != null) {
                            this.focus.record = this.store.getRecord(recordId);
                        }else {
                            this.focus.record = null;
                        }
                    }
                }

                if (columnId == null) {
                    if (this.focus.columnId != null) {
                        columnId = this.focus.columnId;
                    } else {
                        columnId = this.config.groups[0].columns[0].dataIndex;
                    }
                }
                this.focus.columnId = columnId;

                if (recordId != null) {
                    var wafferId = this.store.placeRecord(this.focus.record).waffer;
                    var updateScrollbar = this.view.renderFocus(recordId, wafferId, columnId, location);
                    this.selectRows([recordId], appendToSelection, null, columnId);
                    this.view.scrollFocusIntoView();
                    if (updateScrollbar) {
                        this.view.updateWafferScrollbar(wafferId);
                    }
                }
                if (this.options.debug) {
                    this._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'select-cell',
                        type : 'widget', info : 'Record:  ' + recordId + ' Col: ' + columnId });
                }
            },

            selectHeaderCell : function (columnId) {
                this.clearSelection();
                this.focus.record = null;
                this.view.selectHeaderCell(columnId);
                this.view.scrollFocusIntoView();
            },

            selectRows : function (recordIds, append, event, columnId) {
                var that = this;
                var start;
                if (that.options.debug) {
                    start = Date.now();
                }
                var records = this.store.getRecords(recordIds);
                if (that._trigger('before-select-rows', null, records) === false) {
                    return;
                }
                if (recordIds != null && recordIds.length > 0) {
                    if (append == null || !append) {
                        if (records.length !== this.selection.records.length || _.difference(records,
                            this.selection.records).length) {
                            that.clearSelection(true);
                        }
                    }

                    var unselected = _.difference(records, this.selection.records);

                    if (unselected.length > 0) {
                        var unslectedRecordIds = [];
                        _.each(records, function (record) {
                            that.selection.records.push(record);
                            unslectedRecordIds.push(that._getRecordId(record));
                        });
                        that.view.selectRecords(unslectedRecordIds, true, columnId);

                        that._trigger('rows-selected', event, [unselected, this.selection.records]);
                    } else if (columnId != null) { //select the cell if the row is already selected
                        that.view.selectRecords([recordIds[0]], true, columnId);
                    }
                } else {
                    that.clearSelection();
                }

                if (that.options.debug) {
                    that._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'select-rows', type : 'widget', info : recordIds});
                }
            },

            deselectRows : function (recordIds, event) {
                var that = this;
                var start;
                if (that.options.debug) {
                    start = Date.now();
                }
                var records = that.store.getRecords(recordIds);
                if (that._trigger('before-deselect-rows', null, records) === false) {
                    return;
                }
                if (recordIds != null && recordIds.length > 0) {
                    var selected = _.intersection(records, that.selection.records);
                    _.each(selected, function (record) {
                        that.view.selectRecords([that._getRecordId(record)], false);
                    });
                    that.selection.records = _.difference(that.selection.records, records);

                    if (selected.length > 0) {
                        that._trigger('rows-selected', event, [selected, this.selection.records]);
                    }
                }

                if (that.options.debug) {
                    that._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'deselect-rows', type : 'widget', info : recordIds});
                }
            },

            checkRows : function (recordIds, check) {
                var that = this;
                if (that.options.selectionMode === 'check') {
                    var records = this.store.getRecords(recordIds);
                    if (check == null || check) {
                        that.checkedRecords = _.union(that.checkedRecords, records);
                    } else {
                        that.checkedRecords = _.difference(that.checkedRecords, records);
                    }
                    that.view.checkRecords(recordIds, check);
                    that._trigger('rows-checked', null, [this.checkedRecords]);
                }
            },

            getSelection : function () {
                switch (this.options.selectionMode) {
                    case 'default' :
                        return this.selection.records;
                    case 'check' :
                        return this.checkedRecords;
                }

                throw new Error('Selection mode is not set correctly');
            },

            clearSelection : function (skipTrigger) {
                this.selection.records = [];
                this.view.clearSelection();

                if (!skipTrigger) {
                    this._trigger('rows-selected', null, [
                        [],
                        []
                    ]);
                }
            },

            resize : function (width, height) {
                //update the config
                this.view.resize();
            },

            setStore : function (store, CustomWrapper) {
                var start;
                if (this.options.debug) {
                    start = Date.now();
                }
                if (CustomWrapper != null) {
                    this.store = new CustomWrapper(store, this);
                } else {
                    this.store = new DefaultStoreWrapper(store, this);
                }

                this.repopulate();

                this.store.attachListeners();

                if (this.options.debug) {
                    this._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'set-store', type : 'widget'});
                }
            },

            reset : function () {
                if (this._trigger('before-reset') === false) {
                    return;
                }
                this.store.reset();
                this._trigger('reset');
                this._trigger('is-clean');
            },

            commit : function () {
                if (this._trigger('before-commit-grid') === false) {
                    return;
                }
                this.store.commit();
                this._trigger('commit');
            },

            /**
             * Removes deleted rows, unsets modified and new classes.
             */
            cleanRows : function () {
                this.view.cleanModifiedRows();
                this._trigger('is-clean');
            },

            sortRows : function (key, append, order) {
                //Update the sort config
                var columnSort = _.first(_.filter(this.config.sortBy, function (sort) {
                    return sort.key === key;
                }));

                if (append == null || !append) {
                    this.config.sortBy = _.intersection(this.config.sortBy, [columnSort]);
                }

                if (columnSort != null) {
                    //If order is specified by the user/function use it.
                    if (order != null) {
                        if (columnSort.order === order) {
                            this.config.sortBy = _.without(this.config.sortBy, columnSort);
                        } else {
                            columnSort.order = order;
                            if (this.config.sortBy.length === 1) {
                                this.reverseSortOrder = true;
                            }
                        }

                    } else if (columnSort.order === 'asc') {
                        columnSort.order = 'dsc';
                        if (this.config.sortBy.length === 1) {
                            this.reverseSortOrder = true;
                        }
                    } else {
                        this.config.sortBy = _.without(this.config.sortBy, columnSort);
                    }
                } else {
                    this.config.sortBy.push({ key : key, order : order != null ? order : 'asc', sorter : sorters[this.view.columnDefinitions[key].dataType]});
                }

                if (this.store.sort(this.config.sortBy) === false) {
                    this._sortRecords();
                }
                var $ths = this.view.viewports['$waffer-' + _.first(this.config.waffers).id].find('thead th');
                $ths.removeClass('col-sort-asc').removeClass('col-sort-dsc');
                _.each(this.config.sortBy, function (sortConf) {
                    $ths.filter('th[data-index="' + sortConf.key + '"]').addClass(sortConf.order === 'asc' ? 'col-sort-asc' : 'col-sort-dsc');
                });

                this._trigger('view-updated', null, {action : 'column-sort', sort : _.clone(this.config.sortBy)});
            },

            groupRows : function (groupBy) {
                var that = this;
                var start;
                if (that.options.debug) {
                    start = Date.now();
                }
                if (this.store.group(groupBy) === false) {
                    //group logic goes here
                    console.log('GROUPME');
                }
                if (that.options.debug) {
                    that._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'group-rows', type : 'widget', info : groupBy});
                }
            },

            filterRows : function (column, enabled, args) {
                var that = this;

                var start;
                if (that.options.debug) {
                    start = Date.now();
                }

                if (!enabled) {
                    delete this.config.filter[column.dataIndex];
                }
                else {
                    this.config.filter[column.dataIndex] = this.filterController._updateFilterConfig(column, args,
                        this.config.filter[column]);
                }

                if (this.store.filter(this.config.filter) === false) {
                    //do client column filtering normal will force a reload
                    that.filters = [];
                    _.each(this.config.filter, function (filter) {
                        that.filters.push(filter);
                    });
                    this._filterRecords();
                    this._sortRecords();
                }
                this._trigger('view-updated', null, {action : 'filter', filter : _.clone(this.config.filter)});

                if (that.options.debug) {
                    that._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'filter-rows', type : 'widget', info : _.pluck(that.filter, 'key')});
                }
            },

            _filterRecord : function (record) {
                var that = this;
                var filters = that.filters;
                for (var i = 0; i < filters.length; i++) {
                    if (!filters[i].filter(that.store.getValueFromRecord(record,
                        filters[i].key.dataIndex))) {
                        return false;
                    }
                }
                that._addRecordToView(record);
                return true;
            },

            _filterRecords : function () {
                var that = this;

                // detach tables from DOM
                that.view.attachDOMTables(false, '$tbody');
                that.view.clearTables();

                // add rows to grid
                that.store.iterateStore(this._filterRecord, this);
                // size grid
                that.view.resize();
                _.each(that.config.waffers, function (waffer) {
                    that.view.renderWaffer(waffer.id, true);
                });

                // attach rows to tables
                that.view.attachDOMTables(true, '$tbody', '$thead', true);
                that.selectCell();
            },

            undo : function () {
                var change = this.undoStack.pop();
                if (change != null) {
                    var redoAction = _.clone(change);
                    switch (change.type) {
                        case 'edit' :
                            redoAction.data = _.clone(this.store.getValueFromRecord(change.record, change.key));
                            this.store.updateRecord(change.record, change.key, change.data);
                            break;
                        case 'delete' :
                            this.store.addRecords(change.records);
                            break;
                        case 'new' :
                            this.store.deleteRecords(change.records);
                            break;
                    }
                    this.redoStack.push(redoAction);
                }

            },

            redo : function () {
                var change = this.redoStack.pop();
                if (change != null) {
                    var undoAction = _.clone(change);
                    switch (change.type) {
                        case 'edit' :
                            undoAction.data = _.clone(this.store.getValueFromRecord(change.record, change.key));
                            this.store.updateRecord(change.record, change.key, change.data);
                            break;
                        case 'delete' :
                            this.store.deleteRecords(change.records);
                            break;
                        case 'new' :
                            this.store.addRecords(change.records);
                            break;
                    }
                    this._pushUndoAction(undoAction, false);
                }
            },

            repopulate : function (recordId, columnId, args) {
                var that = this;

                var start;
                if (that.options.debug) {
                    start = Date.now();
                }

                // detach tables from DOM
                that.view.attachDOMTables(false, '$tbody');
                that.view.clearTables();

                //Clear focus
                that.focus.record = null;
                that.focus.columnId = null;

                // add rows to grid
                var defaultOptions = {
                    bulk : true
                };

                var mergedOptions = {};
                $.extend(true, mergedOptions, defaultOptions, args);
                that.store.iterateStore(this._addRecordToView, this, mergedOptions);
                // size grid
                that.view.resize();
                _.each(that.config.waffers, function (waffer) {
                    that.view.renderWaffer(waffer.id, true);
                });

                // attach rows to tables
                that.view.attachDOMTables(true, '$tbody', '$thead', true);
                that.selectCell(recordId, columnId);

                if (that.options.debug) {
                    that._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'repopulate', type : 'widget', info : recordId + '-' + columnId});
                }
            },

            cutRows : function () {
                var that = this;
                if (this.options.editable) {

                    var records = this.getSelection();
                    if (records.length) {
                        if (this._trigger('before-cut-selected', null, records) === false) {
                            return;
                        }

                        var start;
                        if (that.options.debug) {
                            start = Date.now();
                        }

                        this.clipboard.records = _.clone(records);
                        this.clipboard.mode = 'cut';

                        var recordIds = [];
                        _.each(records, function (record) {
                            recordIds.push(that._getRecordId(record));
                        });

                        this.view.cutRecords(recordIds);

                        this._trigger('rows-cut', null, [records]);

                        if (that.options.debug) {
                            that._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'cut-Rows', type : 'widget', info : recordIds});
                        }
                    } else {
                        //Rettrigger select with nothing so that whatever made it call cut gets disabled
                        this._trigger('rows-selected', null, [this.selection.records]);
                    }
                }
            },

            copyRows : function () {
                var that = this;

                if (this.options.editable) {

                    var records = this.getSelection();
                    if (records.length) {
                        if (this._trigger('before-copy-selected', null, records) === false) {
                            return;
                        }

                        var start;
                        if (that.options.debug) {
                            start = Date.now();
                        }

                        this.clipboard.records = _.clone(records);
                        this.clipboard.mode = 'copy';
                        var recordIds = [];
                        _.each(records, function (record) {
                            recordIds.push(that._getRecordId(record));
                        });

                        this.view.copyRecords(recordIds);

                        this._trigger('rows-copied', null, [records]);

                        if (that.options.debug) {
                            that._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'copy-Rows', type : 'widget', info : recordIds});
                        }

                    } else {
                        //Rettrigger select with nothing so that whatever made it call copy gets disabled
                        this._trigger('rows-selected', null, [this.selection.records]);
                    }

                }
            },

            pasteRows : function () {
                var that = this;
                if (this.options.editable) {
                    var records = this.clipboard.records;
                    if (records.length) {
                        if (this._trigger('before-paste', null, records, this.clipboard.mode) === false) {
                            return;
                        }
                        var destination = this.focus.record;
                        if (this.clipboard.mode === 'cut') {
                            this.store.cutRecords(records, destination);
                            var recordIds = [];
                            _.each(records, function (record) {
                                recordIds.push(that._getRecordId(record));
                            });

                            this.view.moveRecords(recordIds,
                                {previousRecord : that._getRecordId(destination), waffer : that.store.placeRecord(that.focus.record).waffer });
                            that.store.moveRecords(this.getSelection(), destination);
                            this.clipboard.records = [];
                            this._trigger('cut-rows-pasted', null, [records]);
                        } else if (this.clipboard.mode === 'copy') {
                            var newRecords = this.store.copyRecords(records, destination);
                            this.store.addRecords(newRecords);
                            this._trigger('copied-rows-pasted', null, [newRecords]);
                        }
                    }
                }
            },

            //Misc view interaction methods
            _getRecordWaffer : function (recordId) {
                return this.store.placeRecord(this.store.getRecord(recordId)).waffer;
            },

            _pushUndoAction : function (undoAction, clearRedo) {
                if (clearRedo == null || clearRedo) {
                    this.redoStack = [];
                }
                this.undoStack.push(undoAction);
            },

            _addRecordToView : function (record, args) {
                if (args == null) {
                    args = {bulk : true, location : this.store.placeRecord(record), select : false};
                }
                var location = args.location;

                if (location == null) {
                    location = this.store.placeRecord(record);
                }
                if (args.bulk) {
                    this.view.populateRecords(this._getRecordId(record), location);
                } else {
                    this.view.addRecord(this._getRecordId(record), location, args.select, args.bulk);
                }
            },

            _updateRow : function (record) {
                var location = this.store.placeRecord(record);

                var newRow = this.view.makeRow(this._getRecordId(record), location.waffer),
                    virtualRow = this.view.buildVirtualRow(this._getRecordId(record), location.waffer);

                this.view.replaceRow(newRow, virtualRow);
            },

            /**
             * Sort function
             * @param columnDefinition - column to be sorted
             */
            _sortRecords : function () {

                var that = this;
                var sorters = that.config.sortBy;
                if (sorters.length) {
                    _.each(that.config.waffers, function (waffer) {
                        var records = that.view.getRecordOrder(waffer.id);
                        var start;
                        if (that.options.debug) {
                            start = Date.now();
                        }
                        if (records.length) {
                            if (that.reverseSortOrder) {
                                records.reverse();
                            } else {
                                if (sorters.length) {
                                    records.sort(function (left, right) {
                                        var match = 0;
                                        for (var i = 0; i < sorters.length; ++i) {
                                            var sortConf = sorters[i];
                                            var a = sortConf.sorter.call(that,
                                                that.store.getValueFromRecord(that.store.getRecord(left), sortConf.key),
                                                sortConf.order === 'asc');
                                            var b = sortConf.sorter.call(that,
                                                that.store.getValueFromRecord(that.store.getRecord(right),
                                                    sortConf.key), sortConf.order === 'asc');
                                            if (a === void 0) return 1;
                                            if (b === void 0) return -1;
                                            match = a < b ? -1 : a > b ? 1 : 0;
                                            if (match !== 0) {
                                                return match;
                                            }
                                        }
                                        return match;
                                    });
                                }
                            }
                        }
                        if (that.options.debug) {
                            var info = _.pluck(sorters, 'key');
                            info.splice(0, 0, waffer.id);
                            that._trigger('performance-debug', null,
                                {start : start, end : Date.now(), name : 'sort-Records', type : 'widget', info : info});
                        }
                        that.view.applySortOrder(waffer.id, records);
                    });
                    that.reverseSortOrder = false;
                } else {
                    that.view.clearSort();
                }
                that.selectCell();
            },

            _moveRows : function (location) {
                var that = this;
                var start;
                if (that.options.debug) {
                    start = Date.now();
                }
                var destinationRecord = this.store.getRecord(location.previousRecord);
                var triggerValues = {records : this.getSelection(), afterRecord : destinationRecord};
                if (this._trigger('before-move-rows', null, triggerValues) === false) {
                    return;
                }
                var recordIds = [];
                _.each(this.getSelection(), function (record) {
                    recordIds.push(that._getRecordId(record));
                });
                that.view.moveRecords(recordIds, location);
                that.store.moveRecords(this.getSelection(), destinationRecord);
                this._trigger('rows-moved', null, triggerValues);
                if (that.options.debug) {
                    that._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'move-Rows', type : 'widget', info : recordIds});
                }
            },

            _dropRows : function (origin, destination) {
                var that = this;

                var start;
                if (that.options.debug) {
                    start = Date.now();
                }

                var triggerArgs = {records : that.getSelection(), origin : origin, dropWaffer : destination };
                if (that._trigger('before-drop-rows', null, triggerArgs) === false || destination == null) {
                    return;
                }
                var recordIds = [];
                _.each(this.getSelection(), function (record) {
                    recordIds.push(that._getRecordId(record));
                });
                var lastRecordInDestination = this.store.getRecord(_.last(that.view.virtualRows[destination].records));
                that.view.moveRecords(recordIds,
                    {previousRecord : _.last(that.view.virtualRows[destination].records), waffer : destination});
                that.store.moveRecords(this.getSelection(), lastRecordInDestination);
                that.selectCell();
                that.resize();

                that._trigger('rows-dropped', null, triggerArgs);
                if (that.options.debug) {
                    that._trigger('performance-debug', null, {start : start, end : Date.now(), name : 'drop-Rows', type : 'widget', info : recordIds});
                }
            },

            _getRecordAttributes : function (record) {
                var attributes = this.store.getRecordAttributes(record);
                attributes.selected = _.contains(this.selection.records, record);
                attributes.focused = this.focus.record === record;
                attributes.copied = this.clipboard.mode === 'copy' && _.contains(this.clipboard.records,
                    record) ? true : false;
                attributes.cut = this.clipboard.mode === 'cut' && _.contains(this.clipboard.records,
                    record) ? true : false;
                if (this.options.selectionMode === 'check') {
                    attributes.checked = _.contains(this.checkedRecords, record);
                }
                return attributes;
            },

            _silkFindRecord : function (dataIndex, value) {
                var that = this;
                var found = false;
                this.store.iterateStore(function (record) {
                    if (that.store.getValueFromRecord(record, dataIndex) === value) {
                        that.selectCell(that._getRecordId(record));
                        found = true;
                    }
                }, this);
                return found;
            }
        });

    });