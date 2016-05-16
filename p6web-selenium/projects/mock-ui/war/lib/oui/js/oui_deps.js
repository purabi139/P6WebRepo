/*! Built on: Fri Jan 11 2013 12:28:42 */
/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);

define("oui.jquery", (function (global) {
    return function () {
        var ret, fn;
       fn = function () {
                    return this.$.noConflict(false);
                };
        ret = fn.apply(global, arguments);
        return ret || global.$;
    };
}(this)));

//     Underscore.js 1.4.3
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // with specific `key:value` pairs.
  _.where = function(obj, attrs) {
    if (_.isEmpty(attrs)) return [];
    return _.filter(obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function(func, context) {
    var args, bound;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + (0 | Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = '' + ++idCounter;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

define("oui.underscore", (function (global) {
    return function () {
        var ret, fn;
       fn = function () {
                    return this._.noConflict();
                };
        ret = fn.apply(global, arguments);
        return ret || global._;
    };
}(this)));

//fgnass.github.com/spin.js#v1.2.7
!function(window, document, undefined) {

  /**
   * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
   * Licensed under the MIT license
   */

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }()

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines*100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-'+prefix+'-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }
    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   **/
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    if(s[prop] !== undefined) return prop
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  var Spinner = function Spinner(o) {
    if (!this.spin) return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  Spinner.defaults = {}

  merge(Spinner.prototype, {
    spin: function(target) {
      this.stop()
      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('aria-role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var s=o.lines; s; s--) {
            var alpha = Math.max(1-(i+s*astep)%f * ostep, o.opacity)
            self.opacity(el, o.lines-s, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    lines: function(el, o) {
      var i = 0
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))

        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })

  /////////////////////////////////////////////////////////////////////////
  // VML rendering for IE
  /////////////////////////////////////////////////////////////////////////

  /**
   * Check and init VML support
   */
  ;(function() {

    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    var s = css(createEl('group'), {behavior: 'url(#default#VML)'})

    if (!vendor(s, 'transform') && s.adj) {

      // VML support detected. Insert CSS rule ...
      sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

      Spinner.prototype.lines = function(el, o) {
        var r = o.length+o.width
          , s = 2*r

        function grp() {
          return css(
            vml('group', {
              coordsize: s + ' ' + s,
              coordorigin: -r + ' ' + -r
            }),
            { width: s, height: s }
          )
        }

        var margin = -(o.width+o.length)*2 + 'px'
          , g = css(grp(), {position: 'absolute', top: margin, left: margin})
          , i

        function seg(i, dx, filter) {
          ins(g,
            ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
              ins(css(vml('roundrect', {arcsize: o.corners}), {
                  width: r,
                  height: o.width,
                  left: o.radius,
                  top: -o.width>>1,
                  filter: filter
                }),
                vml('fill', {color: o.color, opacity: o.opacity}),
                vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
              )
            )
          )
        }

        if (o.shadow)
          for (i = 1; i <= o.lines; i++)
            seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

        for (i = 1; i <= o.lines; i++) seg(i)
        return ins(el, g)
      }

      Spinner.prototype.opacity = function(el, i, val, o) {
        var c = el.firstChild
        o = o.shadow && o.lines || 0
        if (c && i+o < c.childNodes.length) {
          c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
          if (c) c.opacity = val
        }
      }
    }
    else
      useCssAnimations = vendor(s, 'animation')
  })()

  if (typeof define == 'function' && define.amd)
    define('oui.spin',[],function() { return Spinner })
  else
    window.Spinner = Spinner

}(window, document);

define('oui.utils/template',['oui.underscore'], function (_) {
    
    return function (str, data) {
        var origSettings = _.templateSettings, t;
        _.templateSettings = {
            interpolate: /<%=([\s\S]+?)%>/g
        };

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

/*! jQuery UI - v1.9.0 - 2012-10-12
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js
* Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT */

(function( $, undefined ) {

var uuid = 0,
	runiqueId = /^ui-id-\d+$/;

// prevent duplicate loading
// this is only a problem because we proxy existing functions
// and we don't want to double proxy them
$.ui = $.ui || {};
if ( $.ui.version ) {
	return;
}

$.extend( $.ui, {
	version: "1.9.0",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	_focus: $.fn.focus,
	focus: function( delay, fn ) {
		return typeof delay === "number" ?
			this.each(function() {
				var elem = this;
				setTimeout(function() {
					$( elem ).focus();
					if ( fn ) {
						fn.call( elem );
					}
				}, delay );
			}) :
			this._focus.apply( this, arguments );
	},

	scrollParent: function() {
		var scrollParent;
		if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.css(this,'position')) && (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	uniqueId: function() {
		return this.each(function() {
			if ( !this.id ) {
				this.id = "ui-id-" + (++uuid);
			}
		});
	},

	removeUniqueId: function() {
		return this.each(function() {
			if ( runiqueId.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return !$( element ).parents().andSelf().filter(function() {
		return $.css( this, "visibility" ) === "hidden" ||
			$.expr.filters.hidden( this );
	}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support
$(function() {
	var body = document.body,
		div = body.appendChild( div = document.createElement( "div" ) );

	// access offsetHeight before setting the style to prevent a layout bug
	// in IE 9 which causes the element to continue to take up space even
	// after it is removed from the DOM (#8026)
	div.offsetHeight;

	$.extend( div.style, {
		minHeight: "100px",
		height: "auto",
		padding: 0,
		borderWidth: 0
	});

	$.support.minHeight = div.offsetHeight === 100;
	$.support.selectstart = "onselectstart" in div;

	// set display to none to avoid a layout bug in IE
	// http://dev.jquery.com/ticket/4014
	body.removeChild( div ).style.display = "none";
});





// deprecated

$.fn.extend({
	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.extend( $.ui, {
	// $.ui.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var i,
				set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) {
				return;
			}

			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},

	contains: $.contains,

	// only used by resizable
	hasScroll: function( el, a ) {

		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},

	// these are odd functions, fix the API or move into individual plugins
	isOverAxis: function( x, reference, size ) {
		//Determines when x coordinate is over "b" element axis
		return ( x > reference ) && ( x < ( reference + size ) );
	},
	isOver: function( y, x, top, left, height, width ) {
		//Determines when x, y coordinates is over "b" element
		return $.ui.isOverAxis( y, top, height ) && $.ui.isOverAxis( x, left, width );
	}
});

})( jQuery );
(function( $, undefined ) {

var uuid = 0,
	slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( $.isFunction( value ) ) {
			prototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			})();
		}
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: name
	}, prototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		// TODO remove widgetBaseClass, see #8155
		widgetBaseClass: fullName,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if (input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				target[ key ] = $.isPlainObject( value ) ? $.widget.extend( {}, target[ key ], value ) : value;
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					new object( options, this );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( options, element ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			// 1.9 BC for #7810
			// TODO remove dual storage
			$.data( element, this.widgetName, this );
			$.data( element, this.widgetFullName, this );
			this._on({ remove: "destroy" });
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( value === undefined ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( value === undefined ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_on: function( element, handlers ) {
		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
		} else {
			// accept selectors, DOM elements
			element = $( element );
			this.bindings = this.bindings.add( element );
		}

		var instance = this;
		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( instance.options.disabled === true ||
						$( this ).hasClass( "ui-state-disabled" ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				instance.widget().delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && ( $.effects.effect[ effectName ] || $.uiBackCompat !== false && $.effects[ effectName ] ) ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

// DEPRECATED
if ( $.uiBackCompat !== false ) {
	$.Widget.prototype._getCreateOptions = function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	};
}

})( jQuery );
(function( $, undefined ) {

var mouseHandled = false;
$( document ).mouseup( function( e ) {
	mouseHandled = false;
});

$.widget("ui.mouse", {
	version: "1.9.0",
	options: {
		cancel: 'input,textarea,button,select,option',
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + '.preventClickEvent')) {
					$.removeData(event.target, that.widgetName + '.preventClickEvent');
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);
		if ( this._mouseMoveDelegate ) {
			$(document)
				.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
				.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if( mouseHandled ) { return; }

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + '.preventClickEvent')) {
			$.removeData(event.target, this.widgetName + '.preventClickEvent');
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		event.preventDefault();
		
		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.browser.msie && !(document.documentMode >= 9) && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + '.preventClickEvent', true);
			}

			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
});

})(jQuery);
(function( $, undefined ) {

$.ui = $.ui || {};

var cachedScrollbarWidth,
	max = Math.max,
	abs = Math.abs,
	round = Math.round,
	rhorizontal = /left|center|right/,
	rvertical = /top|center|bottom/,
	roffset = /[\+\-]\d+%?/,
	rposition = /^\w+/,
	rpercent = /%$/,
	_position = $.fn.position;

function getOffsets( offsets, width, height ) {
	return [
		parseInt( offsets[ 0 ], 10 ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
		parseInt( offsets[ 1 ], 10 ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
	];
}
function parseCss( element, property ) {
	return parseInt( $.css( element, property ), 10 ) || 0;
}

$.position = {
	scrollbarWidth: function() {
		if ( cachedScrollbarWidth !== undefined ) {
			return cachedScrollbarWidth;
		}
		var w1, w2,
			div = $( "<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),
			innerDiv = div.children()[0];

		$( "body" ).append( div );
		w1 = innerDiv.offsetWidth;
		div.css( "overflow", "scroll" );

		w2 = innerDiv.offsetWidth;

		if ( w1 === w2 ) {
			w2 = div[0].clientWidth;
		}

		div.remove();

		return (cachedScrollbarWidth = w1 - w2);
	},
	getScrollInfo: function( within ) {
		var overflowX = within.isWindow ? "" : within.element.css( "overflow-x" ),
			overflowY = within.isWindow ? "" : within.element.css( "overflow-y" ),
			hasOverflowX = overflowX === "scroll" ||
				( overflowX === "auto" && within.width < within.element[0].scrollWidth ),
			hasOverflowY = overflowY === "scroll" ||
				( overflowY === "auto" && within.height < within.element[0].scrollHeight );
		return {
			width: hasOverflowX ? $.position.scrollbarWidth() : 0,
			height: hasOverflowY ? $.position.scrollbarWidth() : 0
		};
	},
	getWithinInfo: function( element ) {
		var withinElement = $( element || window ),
			isWindow = $.isWindow( withinElement[0] );
		return {
			element: withinElement,
			isWindow: isWindow,
			offset: withinElement.offset() || { left: 0, top: 0 },
			scrollLeft: withinElement.scrollLeft(),
			scrollTop: withinElement.scrollTop(),
			width: isWindow ? withinElement.width() : withinElement.outerWidth(),
			height: isWindow ? withinElement.height() : withinElement.outerHeight()
		};
	}
};

$.fn.position = function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	// make a copy, we don't want to modify arguments
	options = $.extend( {}, options );

	var atOffset, targetWidth, targetHeight, targetOffset, basePosition,
		target = $( options.of ),
		within = $.position.getWithinInfo( options.within ),
		scrollInfo = $.position.getScrollInfo( within ),
		targetElem = target[0],
		collision = ( options.collision || "flip" ).split( " " ),
		offsets = {};

	if ( targetElem.nodeType === 9 ) {
		targetWidth = target.width();
		targetHeight = target.height();
		targetOffset = { top: 0, left: 0 };
	} else if ( $.isWindow( targetElem ) ) {
		targetWidth = target.width();
		targetHeight = target.height();
		targetOffset = { top: target.scrollTop(), left: target.scrollLeft() };
	} else if ( targetElem.preventDefault ) {
		// force left top to allow flipping
		options.at = "left top";
		targetWidth = targetHeight = 0;
		targetOffset = { top: targetElem.pageY, left: targetElem.pageX };
	} else {
		targetWidth = target.outerWidth();
		targetHeight = target.outerHeight();
		targetOffset = target.offset();
	}
	// clone to reuse original targetOffset later
	basePosition = $.extend( {}, targetOffset );

	// force my and at to have valid horizontal and vertical positions
	// if a value is missing or invalid, it will be converted to center
	$.each( [ "my", "at" ], function() {
		var pos = ( options[ this ] || "" ).split( " " ),
			horizontalOffset,
			verticalOffset;

		if ( pos.length === 1) {
			pos = rhorizontal.test( pos[ 0 ] ) ?
				pos.concat( [ "center" ] ) :
				rvertical.test( pos[ 0 ] ) ?
					[ "center" ].concat( pos ) :
					[ "center", "center" ];
		}
		pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
		pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

		// calculate offsets
		horizontalOffset = roffset.exec( pos[ 0 ] );
		verticalOffset = roffset.exec( pos[ 1 ] );
		offsets[ this ] = [
			horizontalOffset ? horizontalOffset[ 0 ] : 0,
			verticalOffset ? verticalOffset[ 0 ] : 0
		];

		// reduce to just the positions without the offsets
		options[ this ] = [
			rposition.exec( pos[ 0 ] )[ 0 ],
			rposition.exec( pos[ 1 ] )[ 0 ]
		];
	});

	// normalize collision option
	if ( collision.length === 1 ) {
		collision[ 1 ] = collision[ 0 ];
	}

	if ( options.at[ 0 ] === "right" ) {
		basePosition.left += targetWidth;
	} else if ( options.at[ 0 ] === "center" ) {
		basePosition.left += targetWidth / 2;
	}

	if ( options.at[ 1 ] === "bottom" ) {
		basePosition.top += targetHeight;
	} else if ( options.at[ 1 ] === "center" ) {
		basePosition.top += targetHeight / 2;
	}

	atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
	basePosition.left += atOffset[ 0 ];
	basePosition.top += atOffset[ 1 ];

	return this.each(function() {
		var collisionPosition, using,
			elem = $( this ),
			elemWidth = elem.outerWidth(),
			elemHeight = elem.outerHeight(),
			marginLeft = parseCss( this, "marginLeft" ),
			marginTop = parseCss( this, "marginTop" ),
			collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) + scrollInfo.width,
			collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) + scrollInfo.height,
			position = $.extend( {}, basePosition ),
			myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );

		if ( options.my[ 0 ] === "right" ) {
			position.left -= elemWidth;
		} else if ( options.my[ 0 ] === "center" ) {
			position.left -= elemWidth / 2;
		}

		if ( options.my[ 1 ] === "bottom" ) {
			position.top -= elemHeight;
		} else if ( options.my[ 1 ] === "center" ) {
			position.top -= elemHeight / 2;
		}

		position.left += myOffset[ 0 ];
		position.top += myOffset[ 1 ];

		// if the browser doesn't support fractions, then round for consistent results
		if ( !$.support.offsetFractions ) {
			position.left = round( position.left );
			position.top = round( position.top );
		}

		collisionPosition = {
			marginLeft: marginLeft,
			marginTop: marginTop
		};

		$.each( [ "left", "top" ], function( i, dir ) {
			if ( $.ui.position[ collision[ i ] ] ) {
				$.ui.position[ collision[ i ] ][ dir ]( position, {
					targetWidth: targetWidth,
					targetHeight: targetHeight,
					elemWidth: elemWidth,
					elemHeight: elemHeight,
					collisionPosition: collisionPosition,
					collisionWidth: collisionWidth,
					collisionHeight: collisionHeight,
					offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
					my: options.my,
					at: options.at,
					within: within,
					elem : elem
				});
			}
		});

		if ( $.fn.bgiframe ) {
			elem.bgiframe();
		}

		if ( options.using ) {
			// adds feedback as second argument to using callback, if present
			using = function( props ) {
				var left = targetOffset.left - position.left,
					right = left + targetWidth - elemWidth,
					top = targetOffset.top - position.top,
					bottom = top + targetHeight - elemHeight,
					feedback = {
						target: {
							element: target,
							left: targetOffset.left,
							top: targetOffset.top,
							width: targetWidth,
							height: targetHeight
						},
						element: {
							element: elem,
							left: position.left,
							top: position.top,
							width: elemWidth,
							height: elemHeight
						},
						horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
						vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
					};
				if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
					feedback.horizontal = "center";
				}
				if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
					feedback.vertical = "middle";
				}
				if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
					feedback.important = "horizontal";
				} else {
					feedback.important = "vertical";
				}
				options.using.call( this, props, feedback );
			};
		}

		elem.offset( $.extend( position, { using: using } ) );
	});
};

$.ui.position = {
	fit: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
				outerWidth = within.width,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = withinOffset - collisionPosLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
				newOverRight;

			// element is wider than within
			if ( data.collisionWidth > outerWidth ) {
				// element is initially over the left side of within
				if ( overLeft > 0 && overRight <= 0 ) {
					newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
					position.left += overLeft - newOverRight;
				// element is initially over right side of within
				} else if ( overRight > 0 && overLeft <= 0 ) {
					position.left = withinOffset;
				// element is initially over both left and right sides of within
				} else {
					if ( overLeft > overRight ) {
						position.left = withinOffset + outerWidth - data.collisionWidth;
					} else {
						position.left = withinOffset;
					}
				}
			// too far left -> align with left edge
			} else if ( overLeft > 0 ) {
				position.left += overLeft;
			// too far right -> align with right edge
			} else if ( overRight > 0 ) {
				position.left -= overRight;
			// adjust based on position and margin
			} else {
				position.left = max( position.left - collisionPosLeft, position.left );
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
				outerHeight = data.within.height,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = withinOffset - collisionPosTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
				newOverBottom;

			// element is taller than within
			if ( data.collisionHeight > outerHeight ) {
				// element is initially over the top of within
				if ( overTop > 0 && overBottom <= 0 ) {
					newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
					position.top += overTop - newOverBottom;
				// element is initially over bottom of within
				} else if ( overBottom > 0 && overTop <= 0 ) {
					position.top = withinOffset;
				// element is initially over both top and bottom of within
				} else {
					if ( overTop > overBottom ) {
						position.top = withinOffset + outerHeight - data.collisionHeight;
					} else {
						position.top = withinOffset;
					}
				}
			// too far up -> align with top
			} else if ( overTop > 0 ) {
				position.top += overTop;
			// too far down -> align with bottom edge
			} else if ( overBottom > 0 ) {
				position.top -= overBottom;
			// adjust based on position and margin
			} else {
				position.top = max( position.top - collisionPosTop, position.top );
			}
		}
	},
	flip: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.left + within.scrollLeft,
				outerWidth = within.width,
				offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = collisionPosLeft - offsetLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					data.at[ 0 ] === "right" ?
						-data.targetWidth :
						0,
				offset = -2 * data.offset[ 0 ],
				newOverRight,
				newOverLeft;

			if ( overLeft < 0 ) {
				newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
				if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
					position.left += myOffset + atOffset + offset;
				}
			}
			else if ( overRight > 0 ) {
				newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
				if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
					position.left += myOffset + atOffset + offset;
				}
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.top + within.scrollTop,
				outerHeight = within.height,
				offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = collisionPosTop - offsetTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
				top = data.my[ 1 ] === "top",
				myOffset = top ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					data.at[ 1 ] === "bottom" ?
						-data.targetHeight :
						0,
				offset = -2 * data.offset[ 1 ],
				newOverTop,
				newOverBottom;
			if ( overTop < 0 ) {
				newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
				if ( ( position.top + myOffset + atOffset + offset) > overTop && ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) ) {
					position.top += myOffset + atOffset + offset;
				}
			}
			else if ( overBottom > 0 ) {
				newOverTop = position.top -  data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
				if ( ( position.top + myOffset + atOffset + offset) > overBottom && ( newOverTop > 0 || abs( newOverTop ) < overBottom ) ) {
					position.top += myOffset + atOffset + offset;
				}
			}
		}
	},
	flipfit: {
		left: function() {
			$.ui.position.flip.left.apply( this, arguments );
			$.ui.position.fit.left.apply( this, arguments );
		},
		top: function() {
			$.ui.position.flip.top.apply( this, arguments );
			$.ui.position.fit.top.apply( this, arguments );
		}
	}
};

// fraction support test
(function () {
	var testElement, testElementParent, testElementStyle, offsetLeft, i,
		body = document.getElementsByTagName( "body" )[ 0 ],
		div = document.createElement( "div" );

	//Create a "fake body" for testing based on method used in jQuery.support
	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0,
		background: "none"
	};
	if ( body ) {
		$.extend( testElementStyle, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
	}
	for ( i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || document.documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	div.style.cssText = "position: absolute; left: 10.7432222px;";

	offsetLeft = $( div ).offset().left;
	$.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;

	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );
})();

// DEPRECATED
if ( $.uiBackCompat !== false ) {
	// offset option
	(function( $ ) {
		var _position = $.fn.position;
		$.fn.position = function( options ) {
			if ( !options || !options.offset ) {
				return _position.call( this, options );
			}
			var offset = options.offset.split( " " ),
				at = options.at.split( " " );
			if ( offset.length === 1 ) {
				offset[ 1 ] = offset[ 0 ];
			}
			if ( /^\d/.test( offset[ 0 ] ) ) {
				offset[ 0 ] = "+" + offset[ 0 ];
			}
			if ( /^\d/.test( offset[ 1 ] ) ) {
				offset[ 1 ] = "+" + offset[ 1 ];
			}
			if ( at.length === 1 ) {
				if ( /left|center|right/.test( at[ 0 ] ) ) {
					at[ 1 ] = "center";
				} else {
					at[ 1 ] = at[ 0 ];
					at[ 0 ] = "center";
				}
			}
			return _position.call( this, $.extend( options, {
				at: at[ 0 ] + offset[ 0 ] + " " + at[ 1 ] + offset[ 1 ],
				offset: undefined
			} ) );
		};
	}( jQuery ) );
}

}( jQuery ) );

define("oui.jqueryui", ["oui.jquery"], (function (global) {
    return function () {
        var ret, fn;
       fn = function () {
                    return this.jQuery.ui;
                };
        ret = fn.apply(global, arguments);
        return ret;
    };
}(this)));

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

/* ===================================================
 * bootstrap-transition.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

   // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.item.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle()
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      })

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
    $target.carousel(options)
    e.preventDefault()
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

   // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

   // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
    .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('touchstart.dropdown.data-api', '.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);/* =========================================================
 * bootstrap-modal.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

   // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
            this.removeBackdrop()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (this.options.trigger != 'manual') {
        eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })
          .insertAfter(this.$element)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .offset(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)
      self[self.tip().hasClass('in') ? 'hide' : 'show']()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  , html: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);/* ===========================================================
 * bootstrap-popover.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

   // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);/* =============================================================
 * bootstrap-scrollspy.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

   // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + self.$scrollElement.scrollTop(), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

   // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

   // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    e.preventDefault()
    $this.typeahead($this.data())
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

   // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);
define("oui.bootstrap", ["oui.jquery"], function(){});

/*!
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
// 
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
// 
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
// 
// About: Release History
// 
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // A jQuery object containing all non-window elements to which the resize
  // event is bound.
  var elems = $([]),
    
    // Extend $.resize if it already exists, otherwise create it.
    jq_resize = $.resize = $.extend( $.resize, {} ),
    
    timeout_id,
    
    // Reused strings.
    str_setTimeout = 'setTimeout',
    str_resize = 'resize',
    str_data = str_resize + '-special-event',
    str_delay = 'delay',
    str_throttle = 'throttleWindow';
  
  // Property: jQuery.resize.delay
  // 
  // The numeric interval (in milliseconds) at which the resize event polling
  // loop executes. Defaults to 250.
  
  jq_resize[ str_delay ] = 250;
  
  // Property: jQuery.resize.throttleWindow
  // 
  // Throttle the native window object resize event to fire no more than once
  // every <jQuery.resize.delay> milliseconds. Defaults to true.
  // 
  // Because the window object has its own resize event, it doesn't need to be
  // provided by this plugin, and its execution can be left entirely up to the
  // browser. However, since certain browsers fire the resize event continuously
  // while others do not, enabling this will throttle the window resize event,
  // making event behavior consistent across all elements in all browsers.
  // 
  // While setting this property to false will disable window object resize
  // event throttling, please note that this property must be changed before any
  // window object resize event callbacks are bound.
  
  jq_resize[ str_throttle ] = true;
  
  // Event: resize event
  // 
  // Fired when an element's width or height changes. Because browsers only
  // provide this event for the window element, for other elements a polling
  // loop is initialized, running every <jQuery.resize.delay> milliseconds
  // to see if elements' dimensions have changed. You may bind with either
  // .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
  // 
  // Usage:
  // 
  // > jQuery('selector').bind( 'resize', function(e) {
  // >   // element's width or height has changed!
  // >   ...
  // > });
  // 
  // Additional Notes:
  // 
  // * The polling loop is not created until at least one callback is actually
  //   bound to the 'resize' event, and this single polling loop is shared
  //   across all elements.
  // 
  // Double firing issue in jQuery 1.3.2:
  // 
  // While this plugin works in jQuery 1.3.2, if an element's event callbacks
  // are manually triggered via .trigger( 'resize' ) or .resize() those
  // callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
  // events system. This is not an issue when using jQuery 1.4+.
  // 
  // > // While this works in jQuery 1.4+
  // > $(elem).css({ width: new_w, height: new_h }).resize();
  // > 
  // > // In jQuery 1.3.2, you need to do this:
  // > var elem = $(elem);
  // > elem.css({ width: new_w, height: new_h });
  // > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
  // > elem.resize();
      
  $.event.special[ str_resize ] = {
    
    // Called only when the first 'resize' event callback is bound per element.
    setup: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will bind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      
      var elem = $(this);
      
      // Add this element to the list of internal elements to monitor.
      elems = elems.add( elem );
      
      // Initialize data store on the element.
      $.data( this, str_data, { w: elem.width(), h: elem.height() } );
      
      // If this is the first element added, start the polling loop.
      if ( elems.length === 1 ) {
        loopy();
      }
    },
    
    // Called only when the last 'resize' event callback is unbound per element.
    teardown: function() {
      // Since window has its own native 'resize' event, return false so that
      // jQuery will unbind the event using DOM methods. Since only 'window'
      // objects have a .setTimeout method, this should be a sufficient test.
      // Unless, of course, we're throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      
      var elem = $(this);
      
      // Remove this element from the list of internal elements to monitor.
      elems = elems.not( elem );
      
      // Remove any data stored on the element.
      elem.removeData( str_data );
      
      // If this is the last element removed, stop the polling loop.
      if ( !elems.length ) {
        clearTimeout( timeout_id );
      }
    },
    
    // Called every time a 'resize' event callback is bound per element (new in
    // jQuery 1.4).
    add: function( handleObj ) {
      // Since window has its own native 'resize' event, return false so that
      // jQuery doesn't modify the event object. Unless, of course, we're
      // throttling the 'resize' event for window.
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      
      var old_handler;
      
      // The new_handler function is executed every time the event is triggered.
      // This is used to update the internal element data store with the width
      // and height when the event is triggered manually, to avoid double-firing
      // of the event callback. See the "Double firing issue in jQuery 1.3.2"
      // comments above for more information.
      
      function new_handler( e, w, h ) {
        var elem = $(this),
          data = $.data( this, str_data );
        
        // If called from the polling loop, w and h will be passed in as
        // arguments. If called manually, via .trigger( 'resize' ) or .resize(),
        // those values will need to be computed.
        data.w = w !== undefined ? w : elem.width();
        data.h = h !== undefined ? h : elem.height();
        
        old_handler.apply( this, arguments );
      };
      
      // This may seem a little complicated, but it normalizes the special event
      // .add method between jQuery 1.4/1.4.1 and 1.4.2+
      if ( $.isFunction( handleObj ) ) {
        // 1.4, 1.4.1
        old_handler = handleObj;
        return new_handler;
      } else {
        // 1.4.2+
        old_handler = handleObj.handler;
        handleObj.handler = new_handler;
      }
    }
    
  };
  
  function loopy() {
    
    // Start the polling loop, asynchronously.
    timeout_id = window[ str_setTimeout ](function(){
      
      // Iterate over all elements to which the 'resize' event is bound.
      elems.each(function(){
        var elem = $(this),
          width = elem.width(),
          height = elem.height(),
          data = $.data( this, str_data );
        
        // If element size has changed since the last time, update the element
        // data store and trigger the 'resize' event.
        if ( width !== data.w || height !== data.h ) {
          elem.trigger( str_resize, [ data.w = width, data.h = height ] );
        }
        
      });
      
      // Loop.
      loopy();
      
    }, jq_resize[ str_delay ] );
    
  };
  
})(jQuery,this);

define("oui.resize", function(){});

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

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
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
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
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
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

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


define("oui.dateFormat", function(){});

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

define('oui.combo/comboBoxView',['oui.jquery', 'oui.underscore', 'oui.bootstrap'],
    function ($, _) {
        

        var comboBox = '<div class="combo-box" style="display:inline-block;"></div>';
        var button = '<a class="combo-button btn btn-blue-light"><span class="caret"></span></a>';
        var valueList = '<ul class="combo-list hidden"></ul>';
        var listItemTemplate = _.template('<li class="combo-item" data-key="<%=key%>" data-value="<%=value%>"><%=display%></li>');

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
define('oui.editor/editorView',['oui.jquery', 'oui.underscore', 'oui.bootstrap'],
    function ($, _) {
        

        //editor markup
        var markup = _.template('<div class="rich-text-editor"><div class="toolbar-container btn-toolbar"></div>' +
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
define('oui.editor/toolbar/controls/toggleButton',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controlConfig', 'oui.bootstrap'],
    function ($, _, ControlConfig) {
        
        var toolbarButtonMarkup = _.template('<button type="button" class="btn btn-blue-light toolbar-btn"><i class="<%=icon%>"></i></button>');

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
define('oui.editor/toolbar/controls/singleFireButton',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controlConfig', 'oui.bootstrap'],
    function ($, _, ControlConfig) {
        

        var toolbarButtonMarkup = _.template('<button type="button" class="btn btn-blue-light toolbar-btn"><i class="<%=icon%>"></i></button>');

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
define('oui.editor/toolbar/controls/radioButton',['oui.jquery', 'oui.underscore', 'oui.editor/toolbar/controlConfig', 'oui.bootstrap'],
    function ($, _, ControlConfig) {
        

        var toolbarButtonMarkup = _.template('<button type="button" class="btn btn-blue-light toolbar-btn"><i class="<%=bootstrapIcon%>"></i></button>');

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
define('oui.editor/toolbar/controls/extras/colorPicker',['oui.jquery', 'oui.underscore', 'oui.bootstrap'],
    function ($, _) {
        

        //constants
        var colorPickerTemplate = _.template('<div class="color-picker-container" id="<%=id%>"></div>');
        var colorTileTemplate = _.template('<div class="color-tile" data-color="#<%=color%>" style="background-color:#<%=color%>"></div>');
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
    'oui.bootstrap'],
    function ($, _, ColorPicker, ControlConfig) {
        

        //markup for the button
        var toolbarButtonMarkup = _.template('<button type="button" class="btn btn-blue-light toolbar-btn"><i class="<%=icon%>"></i></button>');

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
define('oui.editor/toolbar/controls/extras/linkDialog',['oui.jquery', 'oui.underscore', 'oui.bootstrap'],
    function ($, _) {
        

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
                var newLink = _.template('<a href="<%=url%>"><%=linkText%></a>');//'<a href="' + $urlInput.val() + '">' + $linkNameInput.val() + '</a>';

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
    'oui.editor/toolbar/controls/extras/linkDialog', 'oui.bootstrap'],
    function ($, _, ControlConfig, LinkDialog) {
        

        var toolbarButtonMarkup = _.template('<button type="button" class="btn btn-blue-light toolbar-btn" data-toggle="modal" data-target="#linkDialog">' +
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