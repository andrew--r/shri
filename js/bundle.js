!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return e[i].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}var o=n(11),r=(i(o),n(4)),s=i(r),a=n(3),u=i(a);window.app=new s.default(document.querySelector(".app")),window.item=new u.default({node:document.querySelector("body")})},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(t,i){function o(){this.isDisabled||this.openPopup()}function r(){this.closePopup()}n(this,e),this.number=t,this.onUnclockCallback=i,this.level=document.querySelector(".level_"+t),this.door=document.querySelector(".door_level_"+t),this.popup=document.querySelector(".popup_level_"+t),this.close=this.popup.querySelector(".popup__close"),this.isLocked=!0,this.isDisabled=this.door.classList.contains("door_disabled"),this.door.addEventListener("click",o.bind(this)),this.close.addEventListener("click",r.bind(this))}return i(e,[{key:"openPopup",value:function(){this.popup.classList.remove("popup_hidden")}},{key:"closePopup",value:function(){this.popup.classList.add("popup_hidden")}},{key:"enable",value:function(){this.door.classList.remove("door_disabled"),this.isDisabled=!1}},{key:"unlock",value:function(){this.door.classList.remove("door_locked"),this.isLocked=!1,this.closePopup(),this.onUnclockCallback(),this.showCongratulations()}},{key:"showCongratulations",value:function(){alert("Дверь "+this.number+" открыта!")}}]),e}();t.default=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.Vector2d=function i(e,t){n(this,i),this.x=e,this.y=t}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(2),s=function(){function e(t){var n=this;if(i(this,e),!t.name)throw new Error("Name must be specified to create an item");var o="game-item";this.id=Math.round(Math.random()*new Date),this.isInitialized=!1,this.node=document.createElement("div"),this.size=t.size||new r.Vector2d(32,32),this.classes={base:t.baseClass||o,initialized:(t.baseClass||o)+"_initialized"},this.defaultPosition=t.defaultPosition||new r.Vector2d(0,0),this.translate=new r.Vector2d(0,0);var s=this.node,a=this.classes;this.render(function(){s.style.position="absolute",s.setAttribute("data-id",n.id),s.setAttribute("data-item-name",t.name),a.base&&s.classList.add(a.base)})}return o(e,[{key:"initialize",value:function(){var e=this,t=this.node,n=this.classes;this.render(function(){e.updateSize(),e.updatePosition(),t.classList.add(n.initialized),e.isInitialized=!0})}},{key:"destroy",value:function(){var e=this,t=this.node,n=this.classes;this.render(function(){t.setAttribute("style",""),t.classList.remove(n.initialized),e.isInitialized=!1})}},{key:"setPosition",value:function(e){this.position=e}},{key:"setTranslate",value:function(e){this.translate=e}},{key:"updateSize",value:function(){var e=this.node,t=this.size;e.style.width=t.x+"px",e.style.height=t.y+"px"}},{key:"updatePosition",value:function(){var e=this.node,t=this.defaultPosition,n=this.translate;e.style.left=t.x+"px",e.style.top=t.y+"px",e.style.transform="translate("+n.x+"px, "+n.y+"px)"}},{key:"render",value:function(e){window.requestAnimationFrame(e)}},{key:"on",value:function(e,t){var n=this;e.split(" ").map(function(e){return n.node.addEventListener(e,t)})}},{key:"off",value:function(e,t){var n=this;e.split(" ").map(function(e){return n.node.removeEventListener(e,t)})}}]),e}();t.default=s},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(){function e(){for(var e=void 0,n=0;n<t.length;n++)if(t[n].isLocked){if(e&&t[n].isLocked){t[n].enable();break}}else e=!0}var t=[new s.default(0,e),new u.default(1,e),new l.default(2,e),new h.default(3,e)];this.doors=t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var r=n(6),s=i(r),a=n(7),u=i(a),c=n(8),l=i(c),f=n(5),h=i(f)},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(1),c=i(u),l=function(e){function t(e,n){o(this,t);var i=r(this,Object.getPrototypeOf(t).call(this,e,n));return i.popup.addEventListener("click",function(){i.unlock()}),i}return s(t,e),a(t,[{key:"showCongratulations",value:function(){alert("Поздравляю! Игра пройдена!")}}]),t}(c.default);t.default=l},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),u=i(a),c=function(e){function t(e,n){function i(e){e.target.classList.add("door-riddle__button_pressed"),a.apply(this)}function s(e){}function a(){var e=!0;c.forEach(function(t){t.classList.contains("door-riddle__button_pressed")||(e=!1)}),e&&this.unlock()}o(this,t);var u=r(this,Object.getPrototypeOf(t).call(this,e,n)),c=[u.popup.querySelector(".door-riddle__button_0"),u.popup.querySelector(".door-riddle__button_1"),u.popup.querySelector(".door-riddle__button_2")];return c.forEach(function(e){e.addEventListener("pointerdown",i.bind(u)),e.addEventListener("pointerup",s.bind(u)),e.addEventListener("pointercancel",s.bind(u)),e.addEventListener("pointerleave",s.bind(u))}),u}return s(t,e),t}(u.default);t.default=c},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(2),c=n(1),l=i(c),f=n(9),h=i(f),p=n(10),d=i(p),v=function(e){function t(e,n){o(this,t);var i=r(this,Object.getPrototypeOf(t).call(this,e,n)),s=i.popup.querySelector(".popup__content");i.popupContent=s,i.classes={lever:{base:"door-lever",initialized:"door-lever_initialized"},button:{base:"door-button",visible:"door-button_visible",pressed:"door-button_pressed",initialized:"door-button_initialized"},key:{base:"door-key",initialized:"door-key_initialized"}};var a=new u.Vector2d(64,64),c=new u.Vector2d(64,64),l=s.clientWidth,f=s.clientHeight;return i.items={button:new h.default({size:a,defaultPosition:new u.Vector2d(.5*l-a.x/2,f-a.y)}),keys:["red","green","blue"].map(function(e,t){return new d.default({color:e,size:c,defaultPosition:new u.Vector2d(l*(.25*(t+1))-c.x/2,.1*f)})})},i.initializeButton(),i.initializeKeys(),i}return s(t,e),a(t,[{key:"initializeButton",value:function(){var e=this.popupContent,t=this.items.button;e.appendChild(t.node),t.initialize()}},{key:"initializeKeys",value:function(){function e(e){if("key"===e.target.getAttribute("data-item-name")){var t=function(t){return t.id===parseInt(e.target.getAttribute("data-id"),10)};o[e.pointerId.toString()]={startPosition:new u.Vector2d(e.clientX,e.clientY),key:r.items.keys.filter(t)[0]},s=!0}}function t(e){if(s){var t=o[e.pointerId.toString()],n=t.key,i=t.startPosition;n.setTranslate(new u.Vector2d(e.clientX-i.x,e.clientY-i.y)),n.render(function(){return n.updatePosition()})}}function n(e){s=!1}var i=this,o={},r=this,s=!1;this.items.keys.forEach(function(e){i.popupContent.appendChild(e.node),e.initialize()}),this.popupContent.addEventListener("pointerdown",e),this.popupContent.addEventListener("pointermove",t),this.popupContent.addEventListener("pointerup",n)}}]),t}(l.default);t.default=v},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),u=i(a),c=function(e){function t(e,n){o(this,t);var i=r(this,Object.getPrototypeOf(t).call(this,e,n));return i.popup.addEventListener("click",function(){i.unlock()}),i}return s(t,e),t}(u.default);t.default=c},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=function p(e,t,n){null===e&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(void 0===i){var o=Object.getPrototypeOf(e);return null===o?void 0:p(o,t,n)}if("value"in i)return i.value;var r=i.get;if(void 0!==r)return r.call(n)},c=n(3),l=i(c),f=n(2),h=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,{name:"button",baseClass:"door-button",size:e.size||new f.Vector2d(32,32),defaultPosition:e.defaultPosition||new f.Vector2d(0,0)}));return n.classes.initialized=n.classes.base+"_initialized",n.classes.hidden=n.classes.base+"_hidden",n.classes.pressed=n.classes.base+"_pressed",n._onPress=function(){this.press()}.bind(n),n._onRelease=function(){this.release()}.bind(n),n}return s(t,e),a(t,[{key:"initialize",value:function(){u(Object.getPrototypeOf(t.prototype),"initialize",this).call(this),this.on("pointerdown",this._onPress),this.on("pointerup pointercancel pointerleave",this._onRelease)}},{key:"destroy",value:function(){u(Object.getPrototypeOf(t.prototype),"destroy",this).call(this),this.off("pointerdown",this._onPress),this.off("pointerup pointercancel pointerleave",this._onRelease)}},{key:"show",value:function(){var e=this;this.render(function(){e.node.classList.remove(e.classes.hidden)})}},{key:"hide",value:function(){var e=this;this.render(function(){e.node.classList.add(e.classes.hidden)})}},{key:"press",value:function(){var e=this;this.render(function(){e.node.classList.add(e.classes.pressed)})}},{key:"release",value:function(){var e=this;this.render(function(){e.node.classList.remove(e.classes.pressed)})}}]),t}(l.default);t.default=h},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=function p(e,t,n){null===e&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(void 0===i){var o=Object.getPrototypeOf(e);return null===o?void 0:p(o,t,n)}if("value"in i)return i.value;var r=i.get;if(void 0!==r)return r.call(n)},c=n(3),l=i(c),f=n(2),h=function(e){function t(e){o(this,t);var n=r(this,Object.getPrototypeOf(t).call(this,{name:"key",baseClass:"door-key",size:e.size||new f.Vector2d(32,32),defaultPosition:e.defaultPosition||new f.Vector2d(0,0)}));return n.classes.initialized=n.classes.base+"_initialized",n.classes.red=n.classes.base+"_red",n.classes.green=n.classes.base+"_green",n.classes.blue=n.classes.base+"_blue",n.render(function(){n.node.classList.add(n.classes[e.color||"red"])}),n}return s(t,e),a(t,[{key:"initialize",value:function(){u(Object.getPrototypeOf(t.prototype),"initialize",this).call(this),this.on("pointerdown",this._onPress),this.on("pointerup pointercancel pointerleave",this._onRelease)}},{key:"destroy",value:function(){u(Object.getPrototypeOf(t.prototype),"destroy",this).call(this),this.off("pointerdown",this._onPress),this.off("pointerup pointercancel pointerleave",this._onRelease)}}]),t}(l.default);t.default=h},function(e,t,n){/*!
	 * PEP v0.4.1 | https://github.com/jquery/PEP
	 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
	 */
!function(t,n){e.exports=n()}(this,function(){"use strict";function e(e,t){t=t||Object.create(null);var n=document.createEvent("Event");n.initEvent(e,t.bubbles||!1,t.cancelable||!1);for(var i,o=2;o<l.length;o++)i=l[o],n[i]=t[i]||f[o];n.buttons=t.buttons||0;var r=0;return r=t.pressure?t.pressure:n.buttons?.5:0,n.x=n.clientX,n.y=n.clientY,n.pointerId=t.pointerId||0,n.width=t.width||0,n.height=t.height||0,n.pressure=r,n.tiltX=t.tiltX||0,n.tiltY=t.tiltY||0,n.pointerType=t.pointerType||"",n.hwTimestamp=t.hwTimestamp||0,n.isPrimary=t.isPrimary||!1,n}function t(){this.array=[],this.size=0}function n(e,t,n,i){this.addCallback=e.bind(i),this.removeCallback=t.bind(i),this.changedCallback=n.bind(i),k&&(this.observer=new k(this.mutationWatcher.bind(this)))}function i(e){return"body /shadow-deep/ "+o(e)}function o(e){return'[touch-action="'+e+'"]'}function r(e){return"{ -ms-touch-action: "+e+"; touch-action: "+e+"; touch-action-delay: none; }"}function s(){if(R){I.forEach(function(e){String(e)===e?(j+=o(e)+r(e)+"\n",z&&(j+=i(e)+r(e)+"\n")):(j+=e.selectors.map(o)+r(e.rule)+"\n",z&&(j+=e.selectors.map(i)+r(e.rule)+"\n"))});var e=document.createElement("style");e.textContent=j,document.head.appendChild(e)}}function a(){if(!window.PointerEvent){if(window.PointerEvent=h,window.navigator.msPointerEnabled){var e=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:e,enumerable:!0}),g.registerSource("ms",oe)}else g.registerSource("mouse",V),void 0!==window.ontouchstart&&g.registerSource("touch",ee);g.register(document)}}function u(e){if(!g.pointermap.has(e))throw new Error("InvalidPointerId")}function c(){window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:Q},releasePointerCapture:{value:Z}})}var l=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],f=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0],h=e,p=window.Map&&window.Map.prototype.forEach,d=p?Map:t;t.prototype={set:function(e,t){return void 0===t?this.delete(e):(this.has(e)||this.size++,void(this.array[e]=t))},has:function(e){return void 0!==this.array[e]},"delete":function(e){this.has(e)&&(delete this.array[e],this.size--)},get:function(e){return this.array[e]},clear:function(){this.array.length=0,this.size=0},forEach:function(e,t){return this.array.forEach(function(n,i){e.call(t,n,i,this)},this)}};var v=d,b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which","pageX","pageY","timeStamp"],y=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0],m={pointerover:1,pointerout:1,pointerenter:1,pointerleave:1},E="undefined"!=typeof SVGElementInstance,w={pointermap:new v,eventMap:Object.create(null),captureInfo:Object.create(null),eventSources:Object.create(null),eventSourceList:[],registerSource:function(e,t){var n=t,i=n.events;i&&(i.forEach(function(e){n[e]&&(this.eventMap[e]=n[e].bind(n))},this),this.eventSources[e]=n,this.eventSourceList.push(n))},register:function(e){for(var t,n=this.eventSourceList.length,i=0;i<n&&(t=this.eventSourceList[i]);i++)t.register.call(t,e)},unregister:function(e){for(var t,n=this.eventSourceList.length,i=0;i<n&&(t=this.eventSourceList[i]);i++)t.unregister.call(t,e)},contains:function(e,t){try{return e.contains(t)}catch(n){return!1}},down:function(e){e.bubbles=!0,this.fireEvent("pointerdown",e)},move:function(e){e.bubbles=!0,this.fireEvent("pointermove",e)},up:function(e){e.bubbles=!0,this.fireEvent("pointerup",e)},enter:function(e){e.bubbles=!1,this.fireEvent("pointerenter",e)},leave:function(e){e.bubbles=!1,this.fireEvent("pointerleave",e)},over:function(e){e.bubbles=!0,this.fireEvent("pointerover",e)},out:function(e){e.bubbles=!0,this.fireEvent("pointerout",e)},cancel:function(e){e.bubbles=!0,this.fireEvent("pointercancel",e)},leaveOut:function(e){this.out(e),this.contains(e.target,e.relatedTarget)||this.leave(e)},enterOver:function(e){this.over(e),this.contains(e.target,e.relatedTarget)||this.enter(e)},eventHandler:function(e){if(!e._handledByPE){var t=e.type,n=this.eventMap&&this.eventMap[t];n&&n(e),e._handledByPE=!0}},listen:function(e,t){t.forEach(function(t){this.addEvent(e,t)},this)},unlisten:function(e,t){t.forEach(function(t){this.removeEvent(e,t)},this)},addEvent:function(e,t){e.addEventListener(t,this.boundHandler)},removeEvent:function(e,t){e.removeEventListener(t,this.boundHandler)},makeEvent:function(e,t){this.captureInfo[t.pointerId]&&(t.relatedTarget=null);var n=new h(e,t);return t.preventDefault&&(n.preventDefault=t.preventDefault),n._target=n._target||t.target,n},fireEvent:function(e,t){var n=this.makeEvent(e,t);return this.dispatchEvent(n)},cloneEvent:function(e){for(var t,n=Object.create(null),i=0;i<b.length;i++)t=b[i],n[t]=e[t]||y[i],!E||"target"!==t&&"relatedTarget"!==t||n[t]instanceof SVGElementInstance&&(n[t]=n[t].correspondingUseElement);return e.preventDefault&&(n.preventDefault=function(){e.preventDefault()}),n},getTarget:function(e){var t=this.captureInfo[e.pointerId];return t?e._target!==t&&e.type in m?void 0:t:e._target},setCapture:function(e,t){this.captureInfo[e]&&this.releaseCapture(e),this.captureInfo[e]=t;var n=document.createEvent("Event");n.initEvent("gotpointercapture",!0,!1),n.pointerId=e,this.implicitRelease=this.releaseCapture.bind(this,e),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease),n._target=t,this.asyncDispatchEvent(n)},releaseCapture:function(e){var t=this.captureInfo[e];if(t){var n=document.createEvent("Event");n.initEvent("lostpointercapture",!0,!1),n.pointerId=e,this.captureInfo[e]=void 0,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease),n._target=t,this.asyncDispatchEvent(n)}},dispatchEvent:function(e){var t=this.getTarget(e);if(t)return t.dispatchEvent(e)},asyncDispatchEvent:function(e){requestAnimationFrame(this.dispatchEvent.bind(this,e))}};w.boundHandler=w.eventHandler.bind(w);var g=w,P={shadow:function(e){if(e)return e.shadowRoot||e.webkitShadowRoot},canTarget:function(e){return e&&Boolean(e.elementFromPoint)},targetingShadow:function(e){var t=this.shadow(e);if(this.canTarget(t))return t},olderShadow:function(e){var t=e.olderShadowRoot;if(!t){var n=e.querySelector("shadow");n&&(t=n.olderShadowRoot)}return t},allShadows:function(e){for(var t=[],n=this.shadow(e);n;)t.push(n),n=this.olderShadow(n);return t},searchRoot:function(e,t,n){if(e){var i,o,r=e.elementFromPoint(t,n);for(o=this.targetingShadow(r);o;){if(i=o.elementFromPoint(t,n)){var s=this.targetingShadow(i);return this.searchRoot(s,t,n)||i}o=this.olderShadow(o)}return r}},owner:function(e){for(var t=e;t.parentNode;)t=t.parentNode;return t.nodeType!==Node.DOCUMENT_NODE&&t.nodeType!==Node.DOCUMENT_FRAGMENT_NODE&&(t=document),t},findTarget:function(e){var t=e.clientX,n=e.clientY,i=this.owner(e.target);return i.elementFromPoint(t,n)||(i=document),this.searchRoot(i,t,n)}},_=Array.prototype.forEach.call.bind(Array.prototype.forEach),T=Array.prototype.map.call.bind(Array.prototype.map),O=Array.prototype.slice.call.bind(Array.prototype.slice),S=Array.prototype.filter.call.bind(Array.prototype.filter),k=window.MutationObserver||window.WebKitMutationObserver,M="[touch-action]",C={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};n.prototype={watchSubtree:function(e){this.observer&&P.canTarget(e)&&this.observer.observe(e,C)},enableOnSubtree:function(e){this.watchSubtree(e),e===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(e)},installNewSubtree:function(e){_(this.findElements(e),this.addElement,this)},findElements:function(e){return e.querySelectorAll?e.querySelectorAll(M):[]},removeElement:function(e){this.removeCallback(e)},addElement:function(e){this.addCallback(e)},elementChanged:function(e,t){this.changedCallback(e,t)},concatLists:function(e,t){return e.concat(O(t))},installOnLoad:function(){document.addEventListener("readystatechange",function(){"complete"===document.readyState&&this.installNewSubtree(document)}.bind(this))},isElement:function(e){return e.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(e){var t=T(e,this.findElements,this);return t.push(S(e,this.isElement)),t.reduce(this.concatLists,[])},mutationWatcher:function(e){e.forEach(this.mutationHandler,this)},mutationHandler:function(e){if("childList"===e.type){var t=this.flattenMutationTree(e.addedNodes);t.forEach(this.addElement,this);var n=this.flattenMutationTree(e.removedNodes);n.forEach(this.removeElement,this)}else"attributes"===e.type&&this.elementChanged(e.target,e.oldValue)}};var L=n,I=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]}],j="",R=window.PointerEvent||window.MSPointerEvent,z=!window.ShadowDOMPolyfill&&document.head.createShadowRoot,x=g.pointermap,Y=25,D=[1,4,2,8,16],N=!1;try{N=1===new MouseEvent("test",{buttons:1}).buttons}catch(X){}var A,F={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],register:function(e){g.listen(e,this.events)},unregister:function(e){g.unlisten(e,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(e){for(var t,n=this.lastTouches,i=e.clientX,o=e.clientY,r=0,s=n.length;r<s&&(t=n[r]);r++){var a=Math.abs(i-t.x),u=Math.abs(o-t.y);if(a<=Y&&u<=Y)return!0}},prepareEvent:function(e){var t=g.cloneEvent(e),n=t.preventDefault;return t.preventDefault=function(){e.preventDefault(),n()},t.pointerId=this.POINTER_ID,t.isPrimary=!0,t.pointerType=this.POINTER_TYPE,t},prepareButtonsForMove:function(e,t){var n=x.get(this.POINTER_ID);e.buttons=n?n.buttons:0,t.buttons=e.buttons},mousedown:function(e){if(!this.isEventSimulatedFromTouch(e)){var t=x.get(this.POINTER_ID),n=this.prepareEvent(e);N||(n.buttons=D[n.button],t&&(n.buttons|=t.buttons),e.buttons=n.buttons),x.set(this.POINTER_ID,e),t?g.move(n):g.down(n)}},mousemove:function(e){if(!this.isEventSimulatedFromTouch(e)){var t=this.prepareEvent(e);N||this.prepareButtonsForMove(t,e),g.move(t)}},mouseup:function(e){if(!this.isEventSimulatedFromTouch(e)){var t=x.get(this.POINTER_ID),n=this.prepareEvent(e);if(!N){var i=D[n.button];n.buttons=t?t.buttons&~i:0,e.buttons=n.buttons}x.set(this.POINTER_ID,e),0===n.buttons||n.buttons===D[n.button]?(this.cleanupMouse(),g.up(n)):g.move(n)}},mouseover:function(e){if(!this.isEventSimulatedFromTouch(e)){var t=this.prepareEvent(e);N||this.prepareButtonsForMove(t,e),g.enterOver(t)}},mouseout:function(e){if(!this.isEventSimulatedFromTouch(e)){var t=this.prepareEvent(e);N||this.prepareButtonsForMove(t,e),g.leaveOut(t)}},cancel:function(e){var t=this.prepareEvent(e);g.cancel(t),this.cleanupMouse()},cleanupMouse:function(){x.delete(this.POINTER_ID)}},V=F,q=g.captureInfo,B=P.findTarget.bind(P),K=P.allShadows.bind(P),U=g.pointermap,H=2500,G=200,W="touch-action",$=!1,J={events:["touchstart","touchmove","touchend","touchcancel"],register:function(e){$?g.listen(e,this.events):A.enableOnSubtree(e)},unregister:function(e){$&&g.unlisten(e,this.events)},elementAdded:function(e){var t=e.getAttribute(W),n=this.touchActionToScrollType(t);n&&(e._scrollType=n,g.listen(e,this.events),K(e).forEach(function(e){e._scrollType=n,g.listen(e,this.events)},this))},elementRemoved:function(e){e._scrollType=void 0,g.unlisten(e,this.events),K(e).forEach(function(e){e._scrollType=void 0,g.unlisten(e,this.events)},this)},elementChanged:function(e,t){var n=e.getAttribute(W),i=this.touchActionToScrollType(n),o=this.touchActionToScrollType(t);i&&o?(e._scrollType=i,K(e).forEach(function(e){e._scrollType=i},this)):o?this.elementRemoved(e):i&&this.elementAdded(e)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(e){var t=e,n=this.scrollTypes;return"none"===t?"none":t===n.XSCROLLER?"X":t===n.YSCROLLER?"Y":n.SCROLLER.exec(t)?"XY":void 0},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(e){return this.firstTouch===e.identifier},setPrimaryTouch:function(e){(0===U.size||1===U.size&&U.has(1))&&(this.firstTouch=e.identifier,this.firstXY={X:e.clientX,Y:e.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(e){e.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var e=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(e,G)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(e){var t=0;return"touchstart"!==e&&"touchmove"!==e||(t=1),t},touchToPointer:function(e){var t=this.currentTouchEvent,n=g.cloneEvent(e),i=n.pointerId=e.identifier+2;n.target=q[i]||B(n),n.bubbles=!0,n.cancelable=!0,n.detail=this.clickCount,n.button=0,n.buttons=this.typeToButtons(t.type),n.width=e.radiusX||e.webkitRadiusX||0,n.height=e.radiusY||e.webkitRadiusY||0,n.pressure=e.force||e.webkitForce||.5,n.isPrimary=this.isPrimaryTouch(e),n.pointerType=this.POINTER_TYPE;var o=this;return n.preventDefault=function(){o.scrolling=!1,o.firstXY=null,t.preventDefault()},n},processTouches:function(e,t){var n=e.changedTouches;this.currentTouchEvent=e;for(var i,o=0;o<n.length;o++)i=n[o],t.call(this,this.touchToPointer(i))},shouldScroll:function(e){if(this.firstXY){var t,n=e.currentTarget._scrollType;if("none"===n)t=!1;else if("XY"===n)t=!0;else{var i=e.changedTouches[0],o=n,r="Y"===n?"X":"Y",s=Math.abs(i["client"+o]-this.firstXY[o]),a=Math.abs(i["client"+r]-this.firstXY[r]);t=s>=a}return this.firstXY=null,t}},findTouch:function(e,t){for(var n,i=0,o=e.length;i<o&&(n=e[i]);i++)if(n.identifier===t)return!0},vacuumTouches:function(e){var t=e.touches;if(U.size>=t.length){var n=[];U.forEach(function(e,i){if(1!==i&&!this.findTouch(t,i-2)){var o=e.out;n.push(o)}},this),n.forEach(this.cancelOut,this)}},touchstart:function(e){this.vacuumTouches(e),this.setPrimaryTouch(e.changedTouches[0]),this.dedupSynthMouse(e),this.scrolling||(this.clickCount++,this.processTouches(e,this.overDown))},overDown:function(e){U.set(e.pointerId,{target:e.target,out:e,outTarget:e.target}),g.over(e),g.enter(e),g.down(e)},touchmove:function(e){this.scrolling||(this.shouldScroll(e)?(this.scrolling=!0,this.touchcancel(e)):(e.preventDefault(),this.processTouches(e,this.moveOverOut)))},moveOverOut:function(e){var t=e,n=U.get(t.pointerId);if(n){var i=n.out,o=n.outTarget;g.move(t),i&&o!==t.target&&(i.relatedTarget=t.target,t.relatedTarget=o,i.target=o,t.target?(g.leaveOut(i),g.enterOver(t)):(t.target=o,t.relatedTarget=null,this.cancelOut(t))),n.out=t,n.outTarget=t.target}},touchend:function(e){this.dedupSynthMouse(e),this.processTouches(e,this.upOut)},upOut:function(e){this.scrolling||(g.up(e),g.out(e),g.leave(e)),this.cleanUpPointer(e)},touchcancel:function(e){this.processTouches(e,this.cancelOut)},cancelOut:function(e){g.cancel(e),g.out(e),g.leave(e),this.cleanUpPointer(e)},cleanUpPointer:function(e){U.delete(e.pointerId),this.removePrimaryPointer(e)},dedupSynthMouse:function(e){var t=V.lastTouches,n=e.changedTouches[0];if(this.isPrimaryTouch(n)){var i={x:n.clientX,y:n.clientY};t.push(i);var o=function(e,t){var n=e.indexOf(t);n>-1&&e.splice(n,1)}.bind(null,t,i);setTimeout(o,H)}}};$||(A=new L(J.elementAdded,J.elementRemoved,J.elementChanged,J));var Q,Z,ee=J,te=g.pointermap,ne=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,ie={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],register:function(e){g.listen(e,this.events)},unregister:function(e){g.unlisten(e,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(e){var t=e;return ne&&(t=g.cloneEvent(e),t.pointerType=this.POINTER_TYPES[e.pointerType]),t},cleanup:function(e){te.delete(e)},MSPointerDown:function(e){te.set(e.pointerId,e);var t=this.prepareEvent(e);g.down(t)},MSPointerMove:function(e){var t=this.prepareEvent(e);g.move(t)},MSPointerUp:function(e){var t=this.prepareEvent(e);g.up(t),this.cleanup(e.pointerId)},MSPointerOut:function(e){var t=this.prepareEvent(e);g.leaveOut(t)},MSPointerOver:function(e){var t=this.prepareEvent(e);g.enterOver(t)},MSPointerCancel:function(e){var t=this.prepareEvent(e);g.cancel(t),this.cleanup(e.pointerId)},MSLostPointerCapture:function(e){var t=g.makeEvent("lostpointercapture",e);g.dispatchEvent(t)},MSGotPointerCapture:function(e){var t=g.makeEvent("gotpointercapture",e);g.dispatchEvent(t)}},oe=ie,re=window.navigator;re.msPointerEnabled?(Q=function(e){u(e),this.msSetPointerCapture(e)},Z=function(e){u(e),this.msReleasePointerCapture(e)}):(Q=function(e){u(e),g.setCapture(e,this)},Z=function(e){u(e),g.releaseCapture(e,this)}),s(),a(),c();var se={dispatcher:g,Installer:L,PointerEvent:h,PointerMap:v,targetFinding:P};return se})}]);
//# sourceMappingURL=bundle.js.map