/**
 * 这个是js脚部
 * 说明：
 * 变量container表示id选择器名称为container的div标签
 * 变量box表示类选择器名称为box的div标签
 */

//整个html页面加载完成后,调用此方法
window.onload = function () {

    //设置图片的CS样式
    setImageCss("container", "box");
}


//监听滚动条，当滚动滚动条后,调用此方法
window.onscroll = function () {

    //加载图片
    loadImage();
}


//加载图片
function loadImage() {

    //创建一个json字符串,用于保存待加载的图片信息
    var imgData = {
        "data": [
            {"src": "./images/1.jpg"},
            {"src": "./images/2.jpg"},
            {"src": "./images/3.jpg"},
            {"src": "./images/4.jpg"},
            {"src": "./images/5.jpg"},
            {"src": "./images/6.jpg"},
            {"src": "./images/7.jpg"},
            {"src": "./images/8.jpg"},
            {"src": "./images/9.jpg"},
            {"src": "./images/10.jpg"}
        ]
    };

    //如果允许加载图片
    if (checkFlag()) {

        //获得container
        var container = document.getElementById("container");

        //遍历json字符串中的数据
        for (var i = 0; i < imgData.data.length; i++) {

            var tag = '<div class="box">';
            tag += '<div class="box-img">';
            tag += '<img src="' + imgData.data[i].src + '">';
            tag += '</div>';
            tag += '<div/>';

            var box = parseDom(tag);
            container.appendChild(box);
        }

        //设置图片的CSS样式
        setImageCss("container", "box");
    }
}


//设置图片的css样式
function setImageCss(parent, content) {

    //获得id选择器名称为parent的div标签
    var container = document.querySelector('#' + parent);

    //获得所有类选择器名称为content的div标签
    var box = getChildElement(container, content);

    //获得第一个box的宽度(所有box的宽度都一样)
    var boxWidth = box[0].offsetWidth;

    //获得每行可放box的个数
    //document.documentElement.clientWidth获得浏览器窗口的宽度
    //每行可以放box的个数 = 浏览器窗口的宽度 / 每个box的宽度
    var num = Math.floor(document.documentElement.clientWidth / boxWidth);

    //设置container的css样式
    //boxWidth * num 表示container的宽度
    container.style.cssText = "width:" + boxWidth * num + "px;" + "margin:0 auto;";

    //创建数组,保存每个box的高度
    var boxHeightArr = [];

    //遍历所有的box
    for (var i = 0; i < box.length; i++) {

        //将第一行box中，box的高度保存在boxHeightArr数组中
        if (i < num) {
            boxHeightArr[i] = box[i].offsetHeight;
        }
        //处理第二行box
        else {

            //获得第一行box中，高度最小的box值
            var minHeight = Math.min.apply(null, boxHeightArr);

            //获得minHeight在数组boxHeightArr中的下标
            var minIndex = getMinHeightIndex(boxHeightArr, minHeight);

            //设置box的定位方式为绝对定位
            box[i].style.position = "absolute";

            //设置box到container顶部的距离
            box[i].style.top = minHeight + "px";

            //设置box到container左端的距离 = box上一个box的left值
            box[i].style.left = box[minIndex].offsetLeft + "px";

            //将第一排box的高度 + 第二排box高度的和保存在boxHeightArr数组中
            boxHeightArr[minIndex] = boxHeightArr[minIndex] + box[i].offsetHeight;
        }
    }
}


/**
 * 获得父标签下的类选择器名称为className的子标签
 * @param parent 父标签
 * @param className 父标签下的子标签的类名
 * @returns {Array} 子标签数组
 */
function getChildElement(parent, className) {

    //创建数组,用于保存父级标签下的类选择器名称为className的子标签
    var contentArr = [];

    //获得parent标签下的所有子标签
    var allcontent = parent.getElementsByTagName("*");

    //遍历子标签
    for (var i = 0; i < allcontent.length; i++) {

        //如果标签的类选择器名称为className;
        if (allcontent[i].className == className) {

            //将标签添加到contentArr数组中
            contentArr.push(allcontent[i]);
        }
    }

    return contentArr;
}


//获得minHeight在数组BoxHeightArr中的下标
function getMinHeightIndex(BoxHeightArr, minHeight) {
    for (var i in BoxHeightArr) {
        if (BoxHeightArr[i] == minHeight) {
            return i;
        }
    }
}


//检测是否允许加载数据
function checkFlag() {

    //获得container
    var container = document.querySelector("#container");

    //获得container下的所有box
    var box = getChildElement(container, "box");

    //获得最后一个box顶部到浏览器顶部的距离
    var lastBoxHeight = box[box.length - 1].offsetTop;

    //获得竖直方向上的滑块到浏览器顶部的距离
    var scollTop = document.documentElement.scrollTop || document.body.scrollTop;

    //获得浏览器的高度
    var winHeight = document.documentElement.clientHeight || document.body.clientHeight;

    if (lastBoxHeight < scollTop + winHeight) {

        //允许加载图片
        return true;
    }
    else {

        //不允许加载图片
        return false;
    }
}


//将HTML字符串转换成DOM对象
function parseDom(str) {
    var ele = document.createElement('div');
    ele.innerHTML = str;
    return ele.children[0];
}
