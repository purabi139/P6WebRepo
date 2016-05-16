
define('pgbucoreapi.numberFormatter',[],function () {
    

    /**
     * It seems that the number functions work by a period for a decimal place no matter of the locale.
     * Using toLocaleString resolves to a locale version
     */

    var DEFAULT_OPTIONS = {
        decimalPlaces : 2,
        decimalSeparator : '.',
        thousandsSeparator : ',',
        symbol : '',
        prefixSymbol : true,
        negativeSymbol : '-'
    };

    function getOption(name, options) {

        if (options == null || options[name] == null) {
            return DEFAULT_OPTIONS[name];
        }

        return options[name];
    }

    function isValueOfStringType(value) {
        return (typeof value === 'string');
    }

    return {
        format : function (value, options) {

            // handle empty or null values
            if (value == null || value === '') {
                return value;
            }

            // value must be a string
            if (!isValueOfStringType(value)) {
                throw new SyntaxError('value is not a string');
            }

            // merge options
            var decimalPlaces = getOption('decimalPlaces', options),
                decimalSeparator = getOption('decimalSeparator', options),
                thousandsSeparator = getOption('thousandsSeparator', options),
                symbol = getOption('symbol', options),
                prefixSymbol = getOption('prefixSymbol', options),
                negativeSymbol = getOption('negativeSymbol', options);

            // is the value a negative value?
            var isNegative = false;
            if (value.charAt(0) === negativeSymbol) {
                isNegative = true;
                // remove negative value
                value = value.replace(negativeSymbol, '');
            }

            // remove any thousand separators
            // remove any symbols
            // this might appear redundant but u many want to take a poorly formatted number and format it correctly
            value = value.replace(thousandsSeparator, '');
            value = value.replace(symbol, '');

            // round the value
            // turn our locale version into a non locale version so we can use toFixed
            var nonLocaleValue = value.replace(decimalSeparator, '.');
            value = parseFloat(nonLocaleValue).toFixed(decimalPlaces);
            value = value.replace('.', decimalSeparator);

            // remove decimal part
            var decimalPart = '';
            var decPos = value.indexOf(decimalSeparator);
            if (decPos >= 0) {
                decimalPart = value.substring(decPos);
                value = value.substring(0, decPos);
            }

            // add thousand separator
            var counter = 1;
            var formattedValue = '';
            var lstPt = value.length;
            for (var c = value.length - 1; c > 0; --c) {
                if (counter % 3 === 0) {
                    formattedValue = thousandsSeparator + value.substring(c, lstPt) + formattedValue;
                    lstPt = c;
                }
                counter++;
            }

            if (lstPt > 0) {
                formattedValue = value.substring(0, lstPt) + formattedValue;
            }

            // add decimal separator
            formattedValue += decimalPart;

            // add symbol
            if (prefixSymbol) {
                formattedValue = symbol + formattedValue;
            } else {
                formattedValue = formattedValue + symbol;
            }

            // add negative value
            if (isNegative) {
                return negativeSymbol + formattedValue;
            }
            return formattedValue;
        },

        validate : function (value, options) {

            // value must be a string
            if (!isValueOfStringType(value)) {
                throw new SyntaxError('value is not a string');
            }

            // merge options
            var decimalSeparator = getOption('decimalSeparator', options),
                thousandsSeparator = getOption('thousandsSeparator', options),
                symbol = getOption('symbol', options),
                negativeSymbol = getOption('negativeSymbol', options);

            // remove thousands separator
            value = value.replace(thousandsSeparator, '');
            // remove symbol
            value = value.replace(symbol, '');

            // test for more than one decimal separator
            var a = new RegExp('^[^\\' + decimalSeparator + ']*\\' + decimalSeparator + '?[^\\' + decimalSeparator + ']*$');
            if (value.match(a) == null) {
                return false;
            }
            // remove decimal separator
            value = value.replace(decimalSeparator, '');

            // test for zero or one negative sign only at the beginning
            // test for one or more digits at the beginning and the end
            var c = new RegExp('^' + negativeSymbol + '?[0-9]+$');
            if (value.match(c) == null) {
                return false;
            }
            return true;
        }
    };

});

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */
define('pgbucoreapi.dateFormatter',[],function () {
    
    var dateFormat = (function () {
        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[\-+]\d{4})?)\b/g,
            timezoneClip = /[^\-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

        // Regexes and supporting functions are cached through closure
        return function (date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length === 1 && Object.prototype.toString.call(date) === "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date();
            if (isNaN(date)) throw new SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) === "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }());

    // Some common format strings
    dateFormat.masks = {
        "default":      "ddd mmm dd yyyy HH:MM:ss",
        shortDate:      "m/d/yy",
        mediumDate:     "mmm d, yyyy",
        longDate:       "mmmm d, yyyy",
        fullDate:       "dddd, mmmm d, yyyy",
        shortTime:      "h:MM TT",
        mediumTime:     "h:MM:ss TT",
        longTime:       "h:MM:ss TT Z",
        isoDate:        "yyyy-mm-dd",
        isoTime:        "HH:MM:ss",
        isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

    // For convenience...
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };
});

define('pgbucoreapi',['pgbucoreapi.numberFormatter', 'pgbucoreapi.dateFormatter'], function () {
});
