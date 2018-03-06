#callMeAdd广告插件使用说明
----------
第一步：引入插件 `<script src='./dist/callMeAdd.bundle.js'></script>`

----------

第二步：实例化对象

>       new callMeAdd().init({
>         width: 270,
>         height: 270,
>         position: 'bottom-right',
>         isShow: true,
>         showCancel:true,
>         slideShow: true,
>         interval: 5000,
>         className:'haha',
>         autoPlay: true,
>         adds: [
>           {
>             src: 'https://gma.alicdn.com/bao/uploaded/i2/131427851/TB26kmna3aTBuNjSszfXXXgfpXa_!!0-saturn_solar.jpg_270x270.jpg',
>             href: 'http://www.huwochuxing.com'
>           },
>           {
>             src: 'http://www.huwochuxing.com',
>             href: 'http://www.huwochuxing.com/'
>           },
>           {
>             src: 'https://gma.alicdn.com/bao/uploaded/i4/1650506016143463030/TB2pbcAlq8lpuFjy0FpXXaGrpXa_!!0-saturn_solar.jpg_270x270.jpg',
>             href: 'http://www.huwochuxing.com/'
>           },
>           {
>             src: 'http://node2.huwochuxing.com/getArticleContent?id=5',
>             href: 'http://node2.huwochuxing.com/getArticleContent?id=5'
>           }
>         ]
>       })

    
----------
## 参数说明 ##
 1. width       ---- 广告窗口宽度 默认为120 应设置为广告图片的实际宽度或等比例缩放 （值为 int）
 2. height      ---- 广告窗口高度 默认为270 应设置为广告图片的实际高度或等比例缩放（值为 int）
 3. showCancel  ---- 是否显示关闭按钮 默认为true (true -- 显示关闭按钮；false -- 不显示关闭按钮)
 4. **slideShow ---- 是否显示广告轮播** 默认为false，只显示一张广告 （当有多张广告需要显示是，应将此参数设置为true）
 5. autoPlay    ---- 广告轮播自动播放 默认true （只有在slideShow为true时才生效，设置为false时，广告不会自动轮播）
 6. interval    ---- 广告轮播时间间隔 默认3000 （只有在slideShow为true时才生效）
 7. **isShow    ---- 是否显示广告** 默认false （只有此参数为true时才会显示广告窗口）
 8. className   ---- 广告控件class 默认无
 9. position    ---- 控件显示位置 默认 bottom-right  (top-left || top-right || bottom-left || bottom-right)
 10. index      ---- 当需要配置多个广告时，必须配置此参数为唯一标识
 11. **adds     ---- 广告信息数组** 每一项 包含图片url及广告链接地址 **必需**
    adds数组的每一项都是一个对象，包括 src 和 href 两项
    

>     adds:[{
>       src : '...',
>       href : '...'
>     }]

    ## src ---- 广告图片或网页地址 ##
    ## href ---- 点击广告图片跳转地址，只有src为图片时才有效 ##
