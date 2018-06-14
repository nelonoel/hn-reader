(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}require("./utils/registerServiceWorker");var _App=require("./components/App"),_App2=_interopRequireDefault(_App);window.addEventListener("load",_App2["default"].init);


},{"./components/App":3,"./utils/registerServiceWorker":6}],2:[function(require,module,exports){
"use strict";function getNewStories(){var e="https://hacker-news.firebaseio.com/v0/newstories.json";return fetch(e).then(function(e){return e.json()})}function getItem(e){var t="https://hacker-news.firebaseio.com/v0/item/"+e+".json",n=function(e){return"https://news.ycombinator.com/item?id="+e};return fetch(t).then(function(e){return e.json()}).then(function(e){return e&&"title"in e?{title:e.title,author:e.by,url:"url"in e?e.url:n(e.id)}:null})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getNewStories=getNewStories,exports.getItem=getItem;


},{}],3:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _dom=require("../../utils/dom"),_api=require("../../api"),_Story=require("../Story"),_Story2=_interopRequireDefault(_Story),App={ids:[],items:10,page:0,loadMoreButton:document.getElementById("load-more"),loadingIndicator:document.getElementById("loading")};App.isEndOfList=function(){document.querySelectorAll(".story").length===App.ids.length},App.toggleLoadingIndicators=function(e){var t="undefined"!=typeof e?e:document.querySelectorAll(".placeholder").length>0;App.isEndOfList()?(App.loadingIndicator.innerText="The End",(0,_dom.toggle)(App.loadingIndicator,!0)):((0,_dom.toggle)(App.loadMoreButton,!t),(0,_dom.toggle)(App.loadingIndicator,t))},App.loadStories=function(){var e=App.page*App.items,t=++App.page*App.items;App.ids.slice(e,t).map(_Story2["default"].fetch)},App.init=function(){var e=function(){return window.requestAnimationFrame(function(){window.innerHeight+window.scrollY>=document.body.offsetHeight&&App.loadStories()})};window.addEventListener("scroll",e),App.loadMoreButton.addEventListener("click",App.loadStories),(0,_api.getNewStories)().then(function(e){App.ids=e,App.loadStories()})},exports["default"]=App;


},{"../../api":2,"../../utils/dom":5,"../Story":4}],4:[function(require,module,exports){
"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(exports,"__esModule",{value:!0});var _dom=require("../../utils/dom"),_api=require("../../api"),_App=require("../App"),_App2=_interopRequireDefault(_App),Story={container:document.getElementById("app")};Story.render=function(t,e){var r=e.url,n=e.title,o=e.author;(0,_dom.replace)(t,'\n\t\t<li class="story">\n\t\t\t<a href="'+r+'" target="blank" rel="noopener noreferrer">'+n+"</a>\n\t\t\t<br />"+o+"\n\t\t</li>\n\t"),_App2["default"].toggleLoadingIndicators()},Story.mount=function(t){_App2["default"].toggleLoadingIndicators(!0);var e=document.createElement("div");e.setAttribute("id",t),e.setAttribute("class","placeholder"),(0,_dom.append)(Story.container,e)},Story.fetch=function(t){Story.mount(t),(0,_api.getItem)(t).then(function(e){e&&"title"in e&&Story.render(document.getElementById(t),e)})},exports["default"]=Story;


},{"../../api":2,"../../utils/dom":5,"../App":3}],5:[function(require,module,exports){
"use strict";function toggle(e,p){e.style.display=p?"":"none"}function append(e,p){e.appendChild(p,e.firstChild)}function replace(e,p){e.outerHTML=p}Object.defineProperty(exports,"__esModule",{value:!0}),exports.toggle=toggle,exports.append=append,exports.replace=replace;


},{}],6:[function(require,module,exports){
"use strict";"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("service-worker.js").then(function(e){e.onupdatefound=function(){var n=e.installing;n.onstatechange=function(){switch(n.state){case"installed":navigator.serviceWorker.controller?console.log("New or updated content is available."):console.log("Content is now available offline!");break;case"redundant":console.error("The installing service worker became redundant.")}}}})["catch"](function(e){console.error("Error during service worker registration:",e)})});


},{}]},{},[1]);

//# sourceMappingURL=bundle.js.map
