/**
 * 这个是js脚部
 * 说明：
 * 变量container表示id选择器名称为container的div标签
 * 变量box表示类选择器名称为box的div标签
 */

//整个html页面加载完成后,调用此方法
window.onload = function()
{
    //设置图片的CS样式
    setImageCss("container", "box");
}

//监听滚动条，当滚动滚动条后,调用此方法
window.onscroll = function()
{
    //加载图片
    loadImage();
}

//加载图片
function loadImage()
{
    //创建一个json字符串,用于保存待加载的图片信息
    var imgData = {
        "data": [
            { "src": "1.jpg" },
            { "src": "2.jpg" },
            { "src": "3.jpg" },
            { "src": "4.jpg" },
            { "src": "5.jpg" },
            { "src": "6.jpg" },
            { "src": "7.jpg" },
            { "src": "8.jpg" },
            { "src": "9.jpg" },
            { "src": "10.jpg" }
        ]
    };

    //如果允许加载图片
    if (checkFlag())
    {
        //获得container
        var container = document.getElementById("container");

        //遍历json字符串中的数据
        for (var i = 0; i < imgData.data.length; i++)
        {
            //创建一个box
            var box = document.createElement("div");

            //设置box的类选择器名称
            box.className = "box";

            //将box添加到container中
            container.appendChild(box);

            //创建一个boxing
            var boximg = document.createElement("div");

            //设置boximg的类选择器名称
            boximg.className = "box-img";

            //将boximg添加到box中
            box.appendChild(boximg);

            //创建img
            var img = document.createElement("img");

            //设置img的src属性
            img.src = "image/" + imgData.data[i].src;

            //将img添加到boxing中
            boximg.appendChild(img);
        }

        //设置图片的CSS样式
        setImageCss("container", "box");
    }
}

//设置图片的css样式
function setImageCss(parent, content)
{
    //获得id选择器名称为container的div标签
    var container = document.getElementById(parent);

    //获得类选择器名称为box的div标签
    var box = getChildElement(container, content);

    //获得第一个box的宽度(每一张图片的宽度)
    var boxWidth = box[0].offsetWidth;

    //获得每行可以存放的图片的张数，即box的个数
    //document.documentElement.clientWidth获得窗口的宽度(获得)
    var num = Math.floor(document.documentElement.clientWidth / boxWidth);

    //设置container的css样式
    container.style.cssText = "width:" + boxWidth * num + "px;" + "margin:0 auto;";

    //创建数组,保存box的高度
    var boxHeightArr = [];

    //遍历所有的box
    for(var i = 0; i < box.length; i++)
    {
        //将第一行box中，box的高度保存在boxHeightArr数组中
        if(i < num)
        {
            boxHeightArr[i] = box[i].offsetHeight;
        }
        //处理第二行box
        else
        {
            //获得数组boxHeightArr中最小的数值
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

//获得父标签下的类选择器名称为className的子标签
function getChildElement(parent, className)
{
    //创建数组,保存父级标签下的类选择器名称为className的子标签
    var contentArr = [];

    //获得parent标签下的所有子标签
    var allcontent = parent.getElementsByTagName("*");

    //遍历子标签
    for(var i = 0; i < allcontent.length; i++)
    {
        //如果标签的类选择器名称为className;
        if(allcontent[i].className == className)
        {
            //将标签添加到contentArr数组中
            contentArr.push(allcontent[i]);
        }
    }

    return contentArr;
}

//获得minHeight在数组BoxHeightArr中的下标
function getMinHeightIndex(BoxHeightArr, minHeight)
{
    for(var i in BoxHeightArr)
    {
        if(BoxHeightArr[i] == minHeight)
        {
            return i;
        }
    }
}

//检测是否允许加载数据
function checkFlag()
{
    //获得container
    var container = document.getElementById("container");

    //获得container下的所有box
    var box = getChildElement(container, "box");

    //获得最后一个box顶部到浏览器顶部的距离
    var lastBoxHeight = box[box.length - 1].offsetTop;

    //获得滚动条到浏览器顶部的距离
    var scollTop = document.documentElement.scrollTop || document.body.scrollTop;

    //获得当前页面的高度
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;

    //console.log("滚动条到窗口顶部的距离:" + parseInt(scollTop));
    //console.log("当前页面的高度:" + parseFloat(pageHeight));
    //console.log("最后一个box到顶部的距离:" + parseInt(lastBoxHeight));
    //console.log("*******************************");

    if (lastBoxHeight < scollTop + pageHeight)
    {
        //允许加载图片
        return true;
    }
    else
    {
        //不允许加载图片
        return false;
    }
}

