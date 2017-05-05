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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Layout {
    constructor(loader) {
        this.loader = loader;
        this.clientWidth = document.documentElement.clientWidth;
        this.clientHeight = document.documentElement.clientHeight;
    }

    init() {
        this.renderContainer();
        this.renderFooter();
        this.pinStopIframes();
    }

    renderContainer() {
        let container = document.createElement('div'),
            header = document.createElement('div'),
            results = document.createElement('div');
        container.setAttribute('id', 'container');
        header.setAttribute('id', 'header-site');
        results.setAttribute('id', 'results');
        container.appendChild(header);
        container.appendChild(results);
        document.body.appendChild(container);
        this.renderForm();
    }

    renderForm() {
        let form = document.createElement('form');
        form.setAttribute('id', 'search-form');
        form.setAttribute('action', '#');
        document.getElementById('header-site').appendChild(form);
        this.renderIcon();
        this.renderInput();
        this.renderButton();
    }

    renderIcon() {
        let img = document.createElement('img');
        img.setAttribute('src', './images/theatre-icon.png');
        img.setAttribute('id', 'youtube-icon');
        document.getElementById('search-form').appendChild(img);
        img.addEventListener('click', () => {
            this.clearResults();
            document.getElementById('search-input').value = '';
            document.getElementById('results').style.left = '0px';
        });
    }

    renderInput() {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'search-input');
        input.setAttribute('autofocus', 'true');
        document.getElementById('search-form').appendChild(input);
    }

    renderButton() {
        let searchButton = document.createElement('button'),
            span = document.createElement('span');
        searchButton.setAttribute('type', 'submit');
        searchButton.setAttribute('id', 'search-button');
        span.setAttribute('id', 'search-icon');
        searchButton.appendChild(span);
        searchButton.addEventListener('click', () => {
            this.startSearch();
        });
        document.getElementById('search-form').appendChild(searchButton);
    }

    startSearch() {
        this.clearResults();
        let inputVal = document.getElementById('search-input').value;
        inputVal = inputVal.trim();
        if (inputVal.length) {
            document.getElementById('results').style.left = '0px';
            this.loader.loadVideos(inputVal);
        }
    }

    renderSlides(slides) {
        this.clearResults();
        slides.forEach(slide => {
            this.renderSlide(slide);
        });
    }

    renderSlide(slide) {
        let slideDiv = document.createElement('div'),
            videoList = document.createElement('ul');
        slideDiv.setAttribute('class', 'slide');
        videoList.setAttribute('class', 'videoList');
        slideDiv.appendChild(videoList);
        document.getElementById('results').appendChild(slideDiv);
        slideDiv.style.left = slide.id * document.documentElement.clientWidth + 'px';
        slide.posLeft = slideDiv.style.left;
        slide.items.forEach(item => {
            this.renderVideo(item, videoList);
        });
    }

    renderVideo(video, videoList) {
        let frame = document.createElement('li'),
            li = document.createElement('div'),
            channel = document.createElement('div'),
            viewsInfo = document.createElement('div');
        frame.setAttribute('class', 'frame');
        this.renderTitle(li, video.title, video.hrefYouTube);
        this.renderImg(li, video.iframe, video.imgUrl);
        this.renderDate(li, video.date);
        this.renderChannel(li, video.channel);
        this.renderDescription(li, video.description);
        this.renderViewInfo(li, video.views, video.likes, video.dislikes, video.comments);
        frame.appendChild(li);
        videoList.appendChild(frame);
    }

    renderTitle(li, title, href) {
        let titleDiv = document.createElement('div'),
            h3 = document.createElement('h3'),
            a = document.createElement('a');
        a.setAttribute('href', href);
        titleDiv.setAttribute('class', 'title-video');
        h3.innerHTML = title;
        a.appendChild(h3);
        titleDiv.appendChild(a);
        li.appendChild(titleDiv);
    }

    renderImg(li, href, img) {
        let imageDiv = document.createElement('div'),
            imgTag = document.createElement('img'),
            iframe = document.createElement('iframe'),
            play = document.createElement('div'),
            playIcon = document.createElement('img');
        play.setAttribute('class', 'play-video');
        playIcon.setAttribute('src', './images/play-icon2.png');
        playIcon.setAttribute('class', 'play-icon');
        play.appendChild(playIcon);
        imageDiv.setAttribute('class', 'image-video');
        iframe.setAttribute('src', href);
        imgTag.setAttribute('src', img);
        imageDiv.appendChild(imgTag);
        imageDiv.appendChild(play);
        this.pinIframeOnImg(imgTag, play, iframe, imageDiv);
        li.appendChild(imageDiv);
    }

    pinStopIframes() {
        document.body.addEventListener('click', e => {
            if (e.target.className !== 'play-video' && e.target.className !== 'play-icon') {
                let iframes = document.querySelectorAll('iframe');
                for (let i = 0; i < iframes.length; i++) {
                    iframes[i].parentNode.children[0].style.display = 'block';
                    iframes[i].parentNode.children[1].style.display = 'block';
                    iframes[i].parentNode.removeChild(iframes[i]);
                }
            }
        });
    }

    pinIframeOnImg(img, play, iframe, imageDiv) {
        play.addEventListener('click', e => {
            this.renderIframe(iframe, imageDiv);
            img.style.display = 'none';
            iframe.style.display = 'block';
            // iframe.style.top = this.clientHeight / 2;
            // iframe.style.left = this.clientWidth / 10;
            // iframe.style.width = this.clientWidth * 4 / 5;

            play.style.display = 'none';
        });
    }

    renderIframe(iframe, imageDiv) {
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        imageDiv.appendChild(iframe);
    }

    renderDate(li, date) {
        this.renderItem(li, date, 'fa fa-calendar');
    }

    renderChannel(li, channel) {
        this.renderItem(li, channel, 'fa fa-user-circle-o');
    }

    renderDescription(li, description) {
        this.renderItem(li, description, 'fa fa-pencil');
    }

    renderItem(li, item, classIcon) {
        let itemDiv = document.createElement('div'),
            p = document.createElement('p'),
            icon = document.createElement('i'),
            span = document.createElement('span');
        icon.setAttribute('class', classIcon);
        icon.classList.add('icon-item');
        span.innerHTML = item;
        span.setAttribute('class', 'text-item');
        p.appendChild(icon);
        p.appendChild(span);
        itemDiv.appendChild(p);
        itemDiv.setAttribute('class', 'item-div');
        li.appendChild(itemDiv);
    }

    renderViewInfo(li, views, likes, dislikes, comments) {
        let viewDiv = document.createElement('div'),
            ul = document.createElement('ul');
        viewDiv.setAttribute('class', 'views-info');
        this.renderViewItem(ul, 'fa fa-eye', views);
        this.renderViewItem(ul, 'fa fa-thumbs-o-up', likes);
        this.renderViewItem(ul, 'fa fa-thumbs-o-down', dislikes);
        this.renderViewItem(ul, 'fa fa-comment-o', comments);
        viewDiv.appendChild(ul);
        li.appendChild(viewDiv);
    }

    renderViewItem(ul, iconClass, count) {
        let li = document.createElement('li'),
            icon = document.createElement('i'),
            p = document.createElement('p');
        icon.setAttribute('class', iconClass);
        li.appendChild(icon);
        p.innerHTML = count ? count : 0;
        li.appendChild(p);
        ul.appendChild(li);
    }

    renderFooter() {
        let footer = document.createElement('div'),
            pagination = document.createElement('ul');
        footer.setAttribute('class', 'footer');
        pagination.setAttribute('class', 'pagination');
        footer.appendChild(pagination);
        document.body.appendChild(footer);
    }

    clearFooter() {
        let pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';
    }

    removeActivePage() {
        let pages = document.querySelector('.pagination').children;
        for (let i = 0; i < pages.length; i++) {
            pages[i].className = "";
        }
    }

    makeActivePage(page) {
        this.removeActivePage();
        if (typeof page != 'number') {
            page.classList.add('active');
        } else {
            document.querySelector('.pagination').children[page].classList.add('active');
        }
    }

    addPageToFooter(newPageId) {
        let pagination = document.querySelector('.pagination');
        if (pagination.children.length < 5) {
            let li = document.createElement('li'),
                link = document.createElement('a');
            link.setAttribute('class', 'page');
            link.innerHTML = newPageId;
            li.appendChild(link);
            pagination.appendChild(li);
        }
    }

    getActivePageId() {
        let pages = document.querySelector('.pagination').children;
        for (let i = 0; i < pages.length; i++) {
            if (pages[i].className == 'active') {
                return i;
            }
        }
    }

    changeValuesPages(start, end) {
        this.clearFooter();
        for (let i = start; i <= end; i++) {
            this.addPageToFooter(i);
        }
    }

    clearResults() {
        document.getElementById('results').innerHTML = '';
        document.getElementById('search-input').focus();
        this.clearFooter();
    }

    isEmpty() {
        return document.getElementById('results').innerHTML ? false : true;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Layout;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__slideManager__ = __webpack_require__(5);

const apiKey = 'AIzaSyDD19aNS0BJCtoS-ubYjb3f-C2xGs0kJ3M';
const maxQueryCount = 15;
class Loader {
    constructor() {
        this.nextPageToken = '';
        this.value = '';
        this.wasLoaded = false;
    }

    loadVideos(valueQuery) {
        this.value = valueQuery;
        if (this.wasLoaded) {
            this.nextPageToken = '';
            this.manager.clearSlides();
        } else {
            this.manager = new __WEBPACK_IMPORTED_MODULE_0__slideManager__["a" /* default */](this);
            this.wasLoaded = true;
            this.manager.pinListeners();
        }
        this.getVideos();
    }

    getVideos() {
        const searchUrl = 'https://www.googleapis.com/youtube/v3/search?pageToken=';

        let url = searchUrl + (this.nextPageToken ? this.nextPageToken : '') + '&part=snippet&maxResults=' + maxQueryCount + '&q=' + this.value + '&type=video&key=' + apiKey,
            items;
        const statisticsUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
        fetch(url).then(response => response.json()).then(response => {
            this.nextPageToken = response.nextPageToken;
            items = response.items;
            return items;
        }).then(items => {
            items = this.formObjects(items);
            return items;
        }).then(videoObjs => {
            this.pushStatistics(videoObjs);
        });
    }

    formObjects(arrayVideos) {
        let result = [];
        arrayVideos.forEach(video => {
            result.push(this.getVideoObject(video));
        });
        return result;
    }

    getVideoObject(item) {
        return {
            hrefYouTube: 'https://www.youtube.com/watch?v=' + (item.id.videoId ? item.id.videoId : ''),
            iframe: 'https://www.youtube.com/embed/' + (item.id.videoId ? item.id.videoId : ''),
            title: item.snippet.title,
            imgUrl: item.snippet.thumbnails.medium.url,
            channel: item.snippet.channelTitle,
            date: item.snippet.publishedAt.substring(0, 10),
            views: 0,
            likes: 0,
            dislikes: 0,
            comments: 0,
            description: item.snippet.description,
            videoId: item.id.videoId ? item.id.videoId : ''
        };
    }

    pushStatistics(videos) {
        const statisticsUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
        videos.forEach(item => {
            if (item.videoId != '') {
                let url = statisticsUrl + item.videoId + '&key=' + apiKey;
                fetch(url).then(response => response.json()).then(statistic => {
                    item.views = statistic.items[0].statistics.viewCount;
                    item.likes = statistic.items[0].statistics.likeCount;
                    item.dislikes = statistic.items[0].statistics.dislikeCount;
                    item.comments = statistic.items[0].statistics.commentCount;
                    this.manager.pushItem(item);
                }).catch(err => console.log(err));
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Loader;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layout__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loader__ = __webpack_require__(1);


let loader = new __WEBPACK_IMPORTED_MODULE_1__loader__["a" /* default */]();
let layout = new __WEBPACK_IMPORTED_MODULE_0__layout__["a" /* default */](loader);
layout.init();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return maxCountInScreen; });
const maxCountInScreen = () => {
    let widthScreen = document.documentElement.clientWidth;
    switch (true) {
        case widthScreen <= 800:
            return 1;
        case widthScreen <= 1000:
            return 2;
        case widthScreen <= 1300:
            return 3;
        default:
            return 4;
    }
};



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Slide {
    constructor(items, id, state) {
        this.items = Array.isArray(items) ? items : [items];
        this.id = id || 0;
        this.state = state || 'passive';
    }

    addItem(item) {
        this.items.push(item);
    }

    setState(state) {
        this.state = state;
    }

    isActive() {
        return this.state === 'active' ? true : false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Slide;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layout__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__swipe__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__slide__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resize__ = __webpack_require__(3);





class SlideManager {
    constructor(loader) {
        this.loader = loader;
        this.slides = [];
        this.maxItems = 4;
        this.wasLeftSlide = false;
        this.swipe = new __WEBPACK_IMPORTED_MODULE_1__swipe__["a" /* default */]();
        this.layout = new __WEBPACK_IMPORTED_MODULE_0__layout__["a" /* default */]();
        this.buffer = [];
    }

    clearSlides() {
        this.animateTransition(false);
        this.slides = [];
        this.buffer = [];
        this.layout.clearResults();
    }

    pushItem(video) {
        this.buffer.push(video);
        this.maxItems = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__resize__["a" /* maxCountInScreen */])();
        if (this.buffer.length === this.maxItems) {
            if (this.slides.length === 0) {
                this.slides.push(new __WEBPACK_IMPORTED_MODULE_2__slide__["a" /* default */](this.buffer, 0, 'active'));
            } else {
                this.slides.push(new __WEBPACK_IMPORTED_MODULE_2__slide__["a" /* default */](this.buffer, this.slides[this.slides.length - 1].id + 1));
            }
            this.layout.renderSlide(this.lastSlide());
            this.layout.addPageToFooter(this.countSlides());
            if (this.countSlides() === 1) {
                this.layout.makeActivePage(0);
            }
            this.buffer = [];
        }
    }

    pushItems(slides, countInSlide) {
        this.currWidth = document.documentElement.clientWidth;
        for (let i = 0; i < slides.length; i++) {
            slides[i].items.forEach(video => {
                this.pushItem(video);
            });
        }
    }

    lastSlide() {
        return this.slides[this.slides.length - 1];
    }

    noSlides() {
        return this.slides.length ? false : true;
    }

    countSlides() {
        return this.slides.length;
    }

    setActiveSLide(slideId) {
        if (slideId && slideId < this.countSlides()) {
            for (let i = 0; i < this.countSlides(); i++) {
                this.slides[i].setState('passive');
            }
            this.slides[slideId].setState('active');
        }
    }

    slideTo(newId) {
        let oldActiveId = this.getActiveSlideId();
        let newActiveId = 1;
        if (typeof newId === 'number') {
            newActiveId = newId;
        } else if (newId == 'left') {
            newActiveId = oldActiveId ? oldActiveId - 1 : 0;
        } else {
            newActiveId = oldActiveId + 1;
        }

        this.slides[oldActiveId].setState('passive');
        this.slides[newActiveId].setState('active');
        let slideLeftPos = parseInt(this.slides[newActiveId].posLeft, 10);
        this.animateTransition(true);
        this.resetLeftSlide();
        this.changePageFooter(newActiveId);
        this.setContainerPos(-slideLeftPos);
    }

    changePageFooter(newSlideId) {
        if (newSlideId == 1) {
            this.layout.changeValuesPages(newSlideId, this.slides.length);
            this.layout.makeActivePage(newSlideId);
        } else if (newSlideId == 0) {
            this.layout.makeActivePage(newSlideId);
        } else {
            this.layout.changeValuesPages(newSlideId - 1, this.slides.length);
            this.layout.makeActivePage(2);
        }
    }

    preLoadVideos() {
        if (this.getActiveSlideId() >= this.slides.length - 2) {
            this.loader.getVideos();
        }
    }

    setContainerPos(pos) {
        document.getElementById('results').style.left = pos + 'px';
    }

    animateTransition(flag) {
        let container = document.getElementById('results');
        container.style.transition = flag ? "left 1.0s" : "left .0s";
    }

    getActiveSlideId() {
        for (let i = 0; i < this.slides.length; i++) {
            if (this.slides[i].isActive()) {
                return i;
            }
        }
    }

    backSlide() {
        let slideLeftPos = parseInt(this.slides[this.getActiveSlideId()].posLeft, 10);
        this.animateTransition(true);
        this.setContainerPos(-slideLeftPos);
    }

    setLeftSlide(slideId) {
        this.slides[slideId].items[0].left = true;
        this.wasLeftSlide = true;
    }

    resetLeftSlide() {
        if (this.wasLeftSlide) {
            for (let i = 0; i < this.countSlides(); i++) {
                this.slides[i].items.forEach(video => {
                    if (video.left) video.left = false;
                });
            }
            this.wasLeftSlide = false;
        }
    }

    getLeftSlide() {
        for (let i = 0; i < this.countSlides(); i++) {
            for (let j = 0; j < this.slides[i].items.length; j++) {
                if (this.slides[i].items[j].left) return i;
            }
        }
    }

    pinListeners() {
        this.pinSwipe();
        this.pinTransitionPage();
        this.pinResize();
    }

    pinTransitionPage() {
        document.querySelector('.pagination').addEventListener('click', e => {
            if (e.target.className == 'page') {
                let currentSlide = this.getActiveSlideId(),
                    newSlide = parseInt(e.target.innerHTML, 10) - 1;
                if (newSlide > currentSlide) {
                    this.slideTo(newSlide);
                    this.preLoadVideos();
                } else if (newSlide < currentSlide) {
                    this.slideTo(newSlide);
                }
            }
        });
    }

    pinResize() {
        window.addEventListener('resize', () => {
            if (!this.layout.isEmpty()) {
                let wasActiveSlideId = this.getActiveSlideId() * this.maxItems + 1;

                if (!this.wasLeftSlide) {
                    this.setLeftSlide(0);
                } else {
                    let slides = this.slides;
                    this.clearSlides();
                    let container = document.getElementById('results');
                    this.pushItems(slides);
                    container = document.getElementById('results');
                    slides = [];
                    let resizedSlideId = 0;
                    if (wasActiveSlideId % this.maxItems == 0) {
                        resizedSlideId = Math.floor(wasActiveSlideId / this.maxItems) - 1;
                    } else {
                        resizedSlideId = Math.floor(wasActiveSlideId / this.maxItems);
                    }
                    this.setActiveSLide(resizedSlideId);
                    this.setContainerPos(-resizedSlideId * this.currWidth);
                    this.changePageFooter(resizedSlideId);
                }
            }
            /*            let container = document.getElementById('results');
                        let margin = (document.documentElement.clientWidth - 320 * this.maxItems) / 2;
                        container.style['margin-left'] = margin + 'px';*/
        });
    }

    pinSwipe() {
        this.pinMouseSwipe();
        this.pinTouchSwipe();
    }

    pinMouseSwipe() {
        document.getElementById('results').addEventListener('mousedown', e => {
            e.preventDefault();
            this.swipe.mouseDown = true;
            this.swipe.x = e.pageX;
        });

        document.getElementById('results').addEventListener('mousemove', e => {
            if (this.swipe.mouseDown && this.slides.length) {
                let deltaX = this.swipe.x - e.pageX;
                let slideLeftPos = parseInt(this.slides[this.getActiveSlideId()].posLeft, 10);
                this.animateTransition(false);
                this.setContainerPos(-slideLeftPos - deltaX);
            }
        });
        document.addEventListener('mouseup', e => {
            e.preventDefault();
            if (this.swipe.mouseDown) {
                let deltaX = this.swipe.x - e.pageX;
                if (deltaX < -150) {
                    this.slideTo('left');
                } else if (deltaX > 150) {
                    this.slideTo('right');
                    this.preLoadVideos();
                } else {
                    this.backSlide();
                }
                this.swipe.mouseDown = false;
            };
        });
    }

    pinTouchSwipe() {
        document.getElementById('results').addEventListener('touchstart', e => {
            this.swipe.mouseDown = true;
            this.swipe.x = e.changedTouches[0].clientX;
        });

        document.getElementById('results').addEventListener('touchmove', e => {
            if (this.swipe.mouseDown && this.slides.length) {
                let deltaX = this.swipe.x - e.changedTouches[0].clientX;
                let slideLeftPos = parseInt(this.slides[this.getActiveSlideId()].posLeft, 10);
                this.animateTransition(false);
                this.setContainerPos(-slideLeftPos - deltaX);
            }
        });

        document.addEventListener('touchend', e => {
            if (this.swipe.mouseDown) {
                let deltaX = this.swipe.x - e.changedTouches[0].clientX;
                if (deltaX < -50) {
                    this.slideTo('left');
                } else if (deltaX > 50) {
                    this.slideTo('right');
                    this.preLoadVideos();
                } else {
                    this.backSlide();
                }
                this.swipe.mouseDown = false;
            };
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SlideManager;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Swipe {
    constructor() {
        this.mouseDown = false;
        this.x = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Swipe;


/***/ })
/******/ ]);