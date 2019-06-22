/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var browser_line_reader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! browser-line-reader */ \"./node_modules/browser-line-reader/src/index.js\");\n/* harmony import */ var browser_line_reader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(browser_line_reader__WEBPACK_IMPORTED_MODULE_0__);\nvar comment={oneLine:'//',multiline:{startComment:'/*',endComment:'*/',nmbSymbolComment:2}},allowedExt=/(\\.js)$/i;function deleteComment(file){var fileName=file.name,FILE_ERROR='File not found or invalid file type';var result=[];if(!file||!allowedExt.exec(fileName)){return FILE_ERROR;}return new Promise(function(resolve,reject){var lineReader=new browser_line_reader__WEBPACK_IMPORTED_MODULE_0___default.a(file),isMultilineComment=false;// if set true lines below will be excluded\nlineReader.readLines(function(line){var isIncludeEndMultilineComment=line.includes(comment.multiline.endComment),startIndexCommment=line.indexOf(comment.multiline.startComment),endIndexCommment=line.indexOf(comment.multiline.endComment),startIndexSingleLineComment=line.indexOf(comment.oneLine),cuttedLine,commentText;if(!isMultilineComment){var isIncludeStartMultilineComment=line.includes(comment.multiline.startComment),isIncludeOneLineComment=line.includes(comment.oneLine);var commentCases={isStartOneLineComment:isIncludeOneLineComment,isStartEndMultilineComment:isIncludeStartMultilineComment&&isIncludeEndMultilineComment,// if multiline comment placed on one line\nisStartMultilineComment:isIncludeStartMultilineComment&&!isIncludeEndMultilineComment};if(commentCases.isStartEndMultilineComment){// remove multiline comment from line\ncommentText=line.substring(startIndexCommment,endIndexCommment+comment.multiline.nmbSymbolComment);result.push(line.replace(commentText,''));}else if(commentCases.isStartMultilineComment){isMultilineComment=true;cuttedLine=line.slice(0,startIndexCommment);if(cuttedLine.length){result.push(cuttedLine);}}else if(commentCases.isStartOneLineComment){cuttedLine=line.slice(0,startIndexSingleLineComment);if(cuttedLine.length){result.push(cuttedLine);}}else if(!commentCases.isStartOneLineComment){result.push(line);}}else if(isMultilineComment&&isIncludeEndMultilineComment){cuttedLine=line.slice(endIndexCommment+comment.multiline.nmbSymbolComment);if(cuttedLine.length){result.push(cuttedLine);}isMultilineComment=false;}}).then(function(numLinesRead){resolve(result);})[\"catch\"](function(err){reject(err);});});}var fileInput=document.getElementsByClassName('file-input')[0],resultContainer=document.getElementsByClassName('result-container')[0];var CHANGE_ACTION='change';fileInput.addEventListener(CHANGE_ACTION,function(e){var currInput=e.currentTarget,currFile=currInput.files[0];var result=deleteComment(currFile);result.then(function(result){return resultContainer.innerHTML=result.join('\\n');})[\"catch\"](function(err){return resultContainer.innerHTML=err;});});\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./node_modules/browser-line-reader/src/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/browser-line-reader/src/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("Object.defineProperty(exports,\"__esModule\",{value:true});var LineReader=function(){function LineReader(file){var _this=this;this.fileReader=new FileReader();this.readPosition=0;this.chunk='';this.lines=[];this.file=file;this.events=new Map();this.fileReader.onerror=function(){return _this.emit('error',_this.fileReader.error.message);};this.fileReader.onload=function(){return _this.onLoad();};}LineReader.prototype.readLines=function(callback){var _this=this;var count=0;return new Promise(function(resolve,reject){_this.on('line',function(line){if(typeof callback===\"function\")callback(line);count++;_this.step();});_this.on('end',function(){return resolve(count);});_this.on('error',reject);_this.read();});};LineReader.prototype.onLoad=function(){this.chunk+=this.fileReader.result;if(/\\n/.test(this.chunk)){this.lines=this.chunk.split('\\n');if(this.hasMoreData())this.chunk=this.lines.pop();this.step();return;}if(this.hasMoreData())return this.read();if(this.chunk.length)return this.emit('line',this.chunk);this.emit('end');};LineReader.prototype.read=function(){var blob=this.file.slice(this.readPosition,this.readPosition+LineReader.chunkSize);this.readPosition+=LineReader.chunkSize;this.fileReader.readAsText(blob);};LineReader.prototype.step=function(){if(this.lines.length===0&&this.hasMoreData()){this.read();}else if(this.lines.length===0&&!this.hasMoreData()){this.emit('end');}else{this.emit('line',this.lines.shift());}};LineReader.prototype.hasMoreData=function(){return this.readPosition<=this.file.size;};;LineReader.prototype.on=function(eventName,callback){this.events.set(eventName,callback);};;LineReader.prototype.emit=function(eventName,prop){if(prop===void 0){prop='';}this.events.get(eventName).call(this,prop);};;LineReader.chunkSize=1024;return LineReader;}();exports.default=LineReader;\n\n//# sourceURL=webpack:///./node_modules/browser-line-reader/src/index.js?");

/***/ })

/******/ });