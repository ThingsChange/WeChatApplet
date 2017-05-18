/**
 * Created by Administrator on 2017/5/17.
 */
require.config({
    baseUrl: "",
    paths: {
        "jquery": "../lib/jquery-2.2.1.min",
        "chart": "../js/leftChart",
        "charts": "../js/charts"
    }
});

require(['jquery', 'chart', 'charts'], function ($, chart, charts){
    // some code here
    function slide(id){
        var outerBox = $("#"+id);
        var innerBoxArr = outerBox.children().children();
        var leng = innerBoxArr.length;
        outerBox.children().animate({left:0},"fast")
        if(leng<3)return;
        var i=1;
        var setLeft = function(arr){
            var perWidth = innerBoxArr[0].offsetWidth;
            var distance;
            if(i>=leng-1) {
                i=0;
                outerBox.children().animate({left: "0px"},"fast");
            };
            distance= "-"+perWidth*i + "px";
            outerBox.children().animate({left: distance},"slow");
            i++;
        }
        window.timeOut = setInterval(setLeft.bind(null, innerBoxArr), 3800);
    }
    $(function(){
        $(".bottom-header ul").on("click","li", function(){
            var activeBool = $(this).hasClass("click-active");
            if(!activeBool){
                $(this).addClass("click-active");
                $(this).siblings("li").removeClass("click-active")
            }
        });
        $("#tab").on("click","div", function(){
            var activeBool = $(this).hasClass("active");
            if(!activeBool){
                $(this).addClass("active");
                $(this).siblings("div").removeClass("active")
            }
        });
        $(".bottom-head").on("click",function(){
            var $this = $(this).siblings(".bottom-content");
            $this.slideToggle(function(){
                var showBool = $this.is(":visible");
                if(!showBool){
                    clearTimeout(timeOut);
                }else{
                    slide("slideBox");
                    chart.barChart("doctorSign");
                }
            });


        })

        charts.charts();
        $(".progressBarBar").css({"width":"40%"});//测试进度条动画
//added by zrq  暂时这么判断
        var bool =$("#poorFamily").length;
        if(bool){
            chart.pieChart("poorFamily","#8ed02b","#1b9aea");
            chart.pieChart("poorPeople","#8ed02b","#1b9aea");
            chart.pieChart("poorRate","#8ed02b","#1b9aea");
        }
        var height = $("header").height();
        var clientHeight = $(window).height();
        var margin = +$("#rightSide").css("margin-top").slice(0,-2);
        var sideHeight= clientHeight-height-margin;
        $("#rightSide,#leftSide").height(sideHeight-2);
    })
});