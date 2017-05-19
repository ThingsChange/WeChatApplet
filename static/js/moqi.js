/**
 * Created by Administrator on 2017/5/17.
 */
require.config({
    baseUrl: "",
    paths: {
        "jquery": "../lib/jquery-2.2.1.min",
        "migrate": "../lib/jquery-migrate-1.2.1",
        "jbox": "../lib/jquery-jbox/2.3/jquery.jBox-2.3.min",
        "template": "../lib/template",
        "chart": "../js/leftChart",
        "charts": "../js/charts",
        "progressBar":"../js/progressBar"
    },
    shim:{
        'jbox':{
            deps:['jquery']
        },
        'migrate':{
            deps:['jquery']
        }
    }
});

require(['jquery','migrate','template','chart','charts','jbox','progressBar'], function ($,migrate,template,chart,charts,jbox,progressBar){
    // some code here
    //底部轮播图
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
                $("#rightSide").empty();
                $(this).addClass("active");
                $(this).siblings("div").removeClass("active")
            }
            if($(this).hasClass("homepage")){//点击首页按钮
                $("#leftTabs").addClass("hide");
                $("#leftOperation").removeClass("hide");
                $("#sevenStepsTab").addClass("hide");

                //右侧--------------------start
                var data={};
                //ajax
                $('#rightSide').html(template('homepageRightSideTemp', data));
                //右侧进度条生成
                setTimeout(function(){$("#cause").find(".progressBar").each(function(){
                    var value = $(this).prev().text();
                    progressBar.generate(this,value)
                })},200)

                var causePieChartData = {
                    color:['#abfb06','#1ff4be','#c4572e','#387b14','#cb4345','#a96969','#40bfec','#c73983','#0786ef','#fde101'],
                    legend:['因病致贫','因学致贫','因灾致贫','缺土地','缺水','缺劳力','缺资金','交通条件落后','自身动力不足'],
                    data:[
                        {value:335, name:'因病致贫'},
                        {value:300, name:'因学致贫'},
                        {value:211, name:'因灾致贫'},
                        {value:30, name:'缺土地'},
                        {value:320, name:'缺水'},
                        {value:100, name:'缺劳力'},
                        {value:340, name:'缺资金'},
                        {value:50, name:'交通条件落后'},
                        {value:20, name:'自身动力不足'},

                    ]
                };
                charts.pieChart("chartForCause",false,causePieChartData);
                //右侧--------------------end

            }else if($(this).hasClass("poverty")){//点击贫困家庭按钮
                $("#leftTabs").removeClass("hide");
                $("#leftOperation").addClass("hide");
                $("#sevenStepsTab").addClass("hide");

                //右侧--------------------start
                //ajax
                var data={
                    disease:[
                        {name:"心脏病",percent:"30%"},
                        {name:"脑中风",percent:"40%"},
                        {name:"良性脑肿瘤",percent:"20%"},
                        {name:"类风湿性关节炎",percent:"50%"},
                        {name:"活动性肺结核",percent:"60%"},
                        {name:"肺癌",percent:"30%"},
                        {name:"缺资金",percent:"40%"},
                        {name:"白血病",percent:"40%"},
                        {name:"自身动力不足",percent:"20%"},
                        {name:"自身动力不足",percent:"40%"},
                        {name:"自身动力不足",percent:"46%"},
                        {name:"自身动力不足",percent:"34%"}
                    ],

                };
                $('#rightSide').html(template('povertyRightSideTemp_disease', data));
                setTimeout(function(){$(".progressLi").each(function(){
                    var percent = $(this).find(".percent").text();
                    progressBar.generate($(this),percent);
                })},200);
                var diseaseStructure = {
                    legend:["心脏病","脑中风","良性脑肿瘤","类风湿性关节炎","活动性肺结核","肺癌","缺资金","白血病","自身动力不足","贫血","关节炎","感冒"],
                    color:['#abfb06','#1ff4be','#c4572e','#387b14','#cb4345','#a96969','#40bfec','#c73983','#0786ef','#fde101'],
                    data:[
                        {value:335, name:'心脏病'},
                        {value:300, name:'良性脑肿瘤'},
                        {value:211, name:'类风湿性关节炎'},
                        {value:30, name:'活动性肺结核'},
                        {value:320, name:'肺癌'},
                        {value:100, name:'白血病'},
                        {value:340, name:'自身动力不足'},
                        {value:50, name:'贫血'},
                        {value:20, name:'关节炎'},
                        {value:232,name:"缺资金"}
                    ],
                    total:"2030"
                }
                charts.pieChart("diseaseStructureChart",true,diseaseStructure);
                var diseaseIncidence = {
                    color:['#ff5232','#1996e6'],
                    data:[{value:335, name:'发生',
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: "{d}%",
                                textStyle: {
                                    fontSize: '11',
                                    fontWeight: 'lighter',
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    {value:310, name:'未发生'}],
                    radius: ['50%', '70%'],
                    center:["50%","50%"]
                };
                charts.pieChart("diseaseIncidenceChart",false,diseaseIncidence)



                //右侧--------------------end

            }else if($(this).hasClass("fivePeople")){//点击五人小组按钮
                $("#leftTabs").addClass("hide");
                $("#leftOperation").addClass("hide");
                $("#sevenStepsTab").removeClass("hide");
                //右侧--------------------start
                //ajax
                var data={};
                $('#rightSide').html(template('sevenStepsRightSideTemp', data));
                charts.gauge("putOnRecordChart",{value:'.5',color:'#83ea43'});
                charts.gauge("diagnosisChart",{value:'.6',color:'#fd8320'});
                charts.labelPie("healthChart",{color:["#f84c24","#fde101","#83d130","#0786ef"],data:[{value:"123",name:"健康人数"},{value:"222",name:"大病人数"},{value:"333",name:"残疾人数"},{value:"221",name:"长期慢病"}]});
                charts.labelPie("laborChart",{color:["#f84c24","#fde101","#83d130","#0786ef"],data:[{value:"123",name:"普通劳动力"},{value:"252",name:"丧失劳动力"},{value:"223",name:"无劳动力"},{value:"255",name:"技能劳动力"}]});
                charts.gauge("signChart",{value:'.4',color:'#3ad3e1'});
                charts.gauge("overcomePovertyChart",{value:'.8',color:'#e14e35'});


                //右侧--------------------end
            }
        });
        //左侧 人/户 切换点击事件
        $(".switch-head").on("click","span", function(){
            var activeBool = $(this).hasClass("span-active");
            if(!activeBool){
                $(this).addClass("span-active");
                $(this).siblings("span").removeClass("span-active")
                var text = $(this).text();
                var obj = $(".section-body table thead tr").children();
                if(text == "户"){
                    obj.eq(1).text("目标户数");
                    obj.eq(2).text("完成户数");
                }else{
                    obj.eq(1).text("目标人数");
                    obj.eq(2).text("完成人数");
                }
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


        });
        $("#leftTabs").on("click","span",function(){
            if(!$(this).hasClass("active")){
                $("#rightSide").empty();
                $(this).addClass("active").siblings().removeClass("active");

            }else{
                return;
            }
            if($(this).hasClass("disease")){//大病结构
                //ajax
                var data={};
                $('#rightSide').html(template('povertyRightSideTemp_disease', data));
                //ajax
                var data={
                    disease:[
                        {name:"心脏病",percent:"30%"},
                        {name:"脑中风",percent:"40%"},
                        {name:"良性脑肿瘤",percent:"20%"},
                        {name:"类风湿性关节炎",percent:"50%"},
                        {name:"活动性肺结核",percent:"60%"},
                        {name:"肺癌",percent:"30%"},
                        {name:"缺资金",percent:"40%"},
                        {name:"白血病",percent:"40%"},
                        {name:"自身动力不足",percent:"20%"},
                        {name:"自身动力不足",percent:"40%"},
                        {name:"自身动力不足",percent:"46%"},
                        {name:"自身动力不足",percent:"34%"}
                    ],

                };
                $('#rightSide').html(template('povertyRightSideTemp_disease', data));
                setTimeout(function(){$(".progressLi").each(function(){
                    var percent = $(this).find(".percent").text();
                    progressBar.generate($(this),percent);
                })},200);
                var diseaseStructure = {
                    legend:["心脏病","脑中风","良性脑肿瘤","类风湿性关节炎","活动性肺结核","肺癌","缺资金","白血病","自身动力不足","贫血","关节炎","感冒"],
                    color:['#abfb06','#1ff4be','#c4572e','#387b14','#cb4345','#a96969','#40bfec','#c73983','#0786ef','#fde101'],
                    data:[
                        {value:335, name:'心脏病'},
                        {value:300, name:'良性脑肿瘤'},
                        {value:211, name:'类风湿性关节炎'},
                        {value:30, name:'活动性肺结核'},
                        {value:320, name:'肺癌'},
                        {value:100, name:'白血病'},
                        {value:340, name:'自身动力不足'},
                        {value:50, name:'贫血'},
                        {value:20, name:'关节炎'},
                        {value:232,name:"缺资金"}
                    ],
                    total:"2030"
                }
                charts.pieChart("diseaseStructureChart",true,diseaseStructure);
                var diseaseIncidence = {
                    color:['#ff5232','#1996e6'],
                    data:[{value:335, name:'发生',
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: "{d}%",
                                textStyle: {
                                    fontSize: '11',
                                    fontWeight: 'lighter',
                                    color: '#fff'
                                }
                            }
                        }
                    },
                        {value:310, name:'未发生'}],
                    radius: ['50%', '70%'],
                    center:["50%","50%"]
                };
                charts.pieChart("diseaseIncidenceChart",false,diseaseIncidence)


            }else if($(this).hasClass("education")){//学历结构
                //ajax
                var data={};
                $('#rightSide').html(template('povertyRightSideTemp_education', data));
                var eduData = {
                    legend:['学龄前儿童', '小学', '初中', '高中', '大专及以上', '文盲及半文盲'],
                    color:['#fde101', '#1ff4be', '#c4572e', '#387b14', '#cb4345', '#a96969', '#40bfec', '#c73983', '#0786ef'],
                    data:[
                        {value: 335, name: '学龄前儿童'},
                        {value: 310, name: '小学'},
                        {value: 234, name: '初中'},
                        {value: 135, name: '高中'},
                        {value: 1548, name: '大专及以上'},
                        {value: 123, name: '文盲及半文盲'}

                    ]
                }
                charts.fullPieChart("educationStructureChart",eduData)

            }else if($(this).hasClass("sex")){//性别结构
                //ajax
                var data={};
                $('#rightSide').html(template('povertyRightSideTemp_population', data));
                maleChartData={
                    color: ['#c2ff42', '#1996e6'],
                    data:[
                        {
                            value: 335,
                            name: '男性',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter: "{d}%",
                                    textStyle: {
                                        fontSize: '11',
                                        fontWeight: 'lighter',
                                        color: '#fff'
                                    }
                                }
                            }
                        },
                        {value: 221, name: '女性'}

                    ],
                    center: ["50%", "50%"],
                    radius: ['50%', '70%']
                }
                charts.pieChart("maleChart",false,maleChartData)
                femaleChartData={
                    color: ['#fe5b3c', '#1996e6'],
                    data:[
                        {
                            value: 45,
                            name: '女性',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter: "{d}%",
                                    textStyle: {
                                        fontSize: '11',
                                        fontWeight: 'lighter',
                                        color: '#fff'
                                    }
                                }
                            }
                        },
                        {value: 321, name: '男性'}

                    ],
                    center: ["50%", "50%"],
                    radius: ['50%', '70%']
                }
                charts.pieChart("femaleChart",false,femaleChartData)

            }else if($(this).hasClass("poverty")){//贫困结构
                //ajax
                var data={};
                $('#rightSide').html(template('povertyRightSideTemp_poverty', data));

            }
        });

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


    //弹窗部分代码
    $(".per-info").on("click", function () {
        $.jBox('id:per-content', {title: "李茜茜", buttons: {}, border: 0, opacity: 0.2});
        // $.jBox("iframe:../html/perContent.html", {title: "李茜茜", buttons: {}, border: 0, opacity: 0.2})
        //设置弹窗top值
        var box = document.getElementById("jbox");
        var title = document.getElementsByClassName("jbox-title")[0];
        box.style.top = "2.6vw";
        title.style.textAlign ="left";
        var html = template('personalTemp',{});
        document.getElementsByClassName('jbox-content')[0].innerHTML = html;
    })
    //脱贫情况
    $(".tuopin").on("click", function () {
        $.jBox('id:tuopin', {title: "脱贫情况", buttons: {}, border: 0, opacity: 0.2});
        var title = document.getElementsByClassName("jbox-title")[0];
        title.style.width ="96%";
        var html = template('tuopinTemp',{});
        document.getElementsByClassName('jbox-content')[0].innerHTML = html;
        chart.poorChart("poorChart");
        /*var box=document.getElementById("jbox");
         box.style.top = "3vw";*/
    })
    //建档情况
    $(".docCreate").on("click", function () {
        $.jBox('id:docCreate', {title: "建档情况", buttons: {}, border: 0, opacity: 0.2});
        //改变title宽度
        var title = document.getElementsByClassName("jbox-title")[0];
        title.style.width ="96%";
        var html = template('docCreateTemp',{});
        document.getElementsByClassName('jbox-content')[0].innerHTML = html;
        // chart.poorChart("poorChart");
        /*var box=document.getElementById("jbox");
         box.style.top = "3vw";*/
    })
});