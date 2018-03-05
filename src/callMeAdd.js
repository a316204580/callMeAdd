import './css/css.css';
import $ from 'jquery';
import {_typeof} from "./checkDataTypes";

class callMeAdd {
  init(o) {
    /**
     * width 宽度 默认120px
     * height 高度 默认270px
     * showCancel 是否显示关闭按钮 默认true
     * slideShow 是否显示广告轮播 默认false
     * autoPlay 广告轮播自动播放 默认true
     * interval 广告轮播时间间隔 默认3000ms
     * isShow 是否显示广告 默认false
     * className 广告控件class 默认无
     * position 控件显示位置 默认 bottom-right  (top-left || top-right || bottom-left || bottom-right)
     * adds 广告信息数组 每一项 包含图片url及广告链接地址 必需
     */
    let w = o.width || 120, //width 宽度 默认120px·
      h = o.height || 270,  //height 高度 默认270px·
      sc = o.showCancel === void 0 ? true : o.showCancel,  //showCancel·
      ss = o.slideShow === void 0 ? false : o.slideShow,  //slideShow·
      a = o.autoPlay === void 0 ? true : o.autoPlay, //autoPlay·
      i = o.interval || 3000, //interval·
      display = o.isShow === void 0 ? false : o.isShow,//·
      c = o.className,  //className·
      adds = o.adds,
      p = o.position || 'bottom-right'; //position·

    let obj = {a, w, h, sc, ss, i, c, p, adds, display};

    if (display && adds[0].src) {
      this.constructor.appendElement(obj);
      this.constructor.setCloseAddEvents();
    }
  }

  static appendElement(e) {
    let div = $(`<div class="call-me-add add-${e.p} ${e.c}" id="call-me-add" style="width: ${parseInt(e.w)}px;height: ${parseInt(e.h)}px;"><div class="close"><span id="close-add">关闭</span></div></div>`);

    $('body').append(div);

    let closeBtn = $('#close-add');
    if (e.sc) {//显示关闭btn
      closeBtn.show();
    } else { //不显示关闭btn
      closeBtn.hide();
    }

    //添加图片
    this.appendImages(e, div);
  }

  static appendImages(e, t) {

    if (_typeof(e.adds) === 'array' && e.adds.length > 0) {
      if (e.adds.length === 1) {//只有一张图片
        this.appendSingleImg(e.adds[0], t)
      } else {//多张广告图片
        if (e.ss) {//开启轮播
          let ul = $(`<ul class="add-img-container"></ul>`);
          let ol = $(`<ul class="add-dot-container"></ul>`);
          for (let i = 0; i < e.adds.length; i++) {
            let imgLi = $(`<li data-index=${i}></li>`);
            let dotLi = $(`<li data-index=${i}></li>`);

            if (i === 0) {
              dotLi.attr('id', 'hover-dot').addClass('hover-dot');
            }

            this.appendSingleImg(e.adds[i], imgLi);

            imgLi.css('zIndex', (i + 1) ** -2);
            ul.append(imgLi);
            ol.append(dotLi);
          }

          t.append(ul).append(ol);

          this.setSlideShow();

          if (e.a) {//开启自动播放
            this.setAutoPlay(e)
          }

        } else {  //不开启轮播
          this.appendSingleImg(e.adds[0], t)
        }
      }
    } else {
      console.error('实例化时请务必传入广告信息！');
    }
  }

  static setAutoPlay(o) {
    let t;
    window.__index__ = 0;

    startInterval();

    $('#call-me-add').on('mouseover', () => {
      stopInterval();
    }).on('mouseout', () => {
      startInterval();
    });

    function startInterval() {
      let dotArr = $('.add-dot-container li');
      let imgArr = $('.add-img-container li');

      t = setInterval(() => {

        window.__index__ = window.__index__ >= imgArr.length - 1 ? 0 : window.__index__ + 1;

        for (let x = 0, y = imgArr.length; x < y; x++) {

          $(dotArr[x]).removeAttr('id').removeClass('hover-dot');
          $(dotArr[window.__index__]).attr('id', 'hover-dot').addClass('hover-dot');

          if (x === window.__index__) {
            $(imgArr[x]).fadeIn('slow');
          } else {
            $(imgArr[x]).fadeOut('slow');
          }
        }
      }, o.i);
    }

    function stopInterval() {
      clearInterval(t);
    }

  }

  static setSlideShow() {
    let dotArr = $('.add-dot-container li');
    let imgArr = $('.add-img-container li');

    for (let i = 0, j = dotArr.length; i < j; i++) {

      dotArr[i].addEventListener('mouseover', () => {

        for (let x = 0, y = imgArr.length; x < y; x++) {

          $(dotArr[x]).removeAttr('id').removeClass('hover-dot');
          $(dotArr[i]).attr('id', 'hover-dot').addClass('hover-dot');

          if (x === i) {
            $(imgArr[x]).fadeIn('slow');
            window.__index__ = x;
          } else {
            $(imgArr[x]).fadeOut('slow');
          }
        }
      });
    }
  }

  static appendSingleImg(add, t) {

    let img;

    if (/\.(png|jpg|jpeg|gif)$/.test(add.src)) {
      img = $(`<img src=${add.src} class="singleImg">`);

      //点击广告
      img.on('click', event => {
        event.stopPropagation();
        event.preventDefault();
        window.location.href = add.href;
      });

    } else {
      img = $(`<iframe src="${add.src}" frameborder="0" style="width: 100%;height: 100%;border: none;" marginheight="0" allowtransparency="true" marginwidth="0"></iframe>`);
    }

    t.append(img);
  }

  static setCloseAddEvents() {
    //关闭广告
    $('#close-add').on('click', event => {
      event.stopPropagation();
      event.preventDefault();
      $('#call-me-add').hide();
    });
  }

}

window.callMeAdd = callMeAdd;
