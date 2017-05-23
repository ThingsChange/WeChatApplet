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
        "progressBar":"../js/progressBar",
        "countDown" : "../js/countDown"
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

require(['jquery','migrate','template','chart','charts','jbox','progressBar','countDown'], function ($,migrate,template,chart,charts,jbox,progressBar,countDown){
    var area = "nierjizhen";

    //底部轮播图
    function slide(id){
        var outerBox = $("#"+id);
        var innerBoxArr = outerBox.children().children();
        var leng = innerBoxArr.length;
        // outerBox.children().animate({left:0},"fast")
        if(leng<3)return;
        // var i=1;
        var leftFlag = 0;
        var perWidth = innerBoxArr[0].offsetWidth;
        var distance = perWidth/2200;
        var setLeft = function(arr){
            /*if(leftFlag > perWidth*(leng-1)) {
                leftFlag = 0;
                outerBox.children().animate({left: "0px"});
            };*/
            leftFlag += distance;
            leftFlagPx = "-" + leftFlag + "px";
            outerBox.children().css({left: leftFlagPx});
            //如果第一个模块滚出视线，则将其移动到该列末尾
            if(leftFlag > perWidth){
                var arr = Array.prototype.shift.call(innerBoxArr);
                var first = outerBox.children().children().eq(0)
                first.remove();
                outerBox.children().append(first);
                innerBoxArr.push(arr);
                leftFlag = 0;
            }
        }
        window.timeOut = setInterval(setLeft.bind(null, innerBoxArr), 10);
    }
    //由于贫困家庭与首页共用签约，提取公共部分
    function bottomBind() {
        $(".bottom-head").on("click",function(){
            var $this = $(this).siblings(".bottom-content");
            $this.slideToggle(function(){
                chart.barChart("doctorSign");
            });
        });
        //家医签约切换标题
        $(".bottom-header ul").on("click","li", function(){
            var activeBool = $(this).hasClass("click-active");
            if(!activeBool){
                $(this).addClass("click-active");
                $(this).siblings("li").removeClass("click-active");
                chart.barChart("doctorSign");
            }
        });
    }

    // 数据加载
    var api = {
        'getHomePage': function(data){
            $("#leftTabs").addClass("hide");
            $("#leftOperation").removeClass("hide");
            $("#sevenStepsTab").addClass("hide");

            //右侧--------------------start

            $.getJSON("../js/json/homePage/cause.json",function(data){
                if(data) {
                    $('#rightSide').html(template('homepageRightSideTemp', data));
                    //进度条生成
                    $("#cause").find(".progressBar").each(function(){
                        var value = $(this).prev().text();
                        progressBar.generate(this,value);
                    });
                    //致贫原因饼图
                    var causePieChartData = {
                        color:['#abfb06','#1ff4be','#c4572e','#387b14','#cb4345','#a96969','#40bfec','#c73983','#0786ef','#fde101'],
                        legend:['因病致贫','因学致贫','因灾致贫','缺土地','缺水','缺劳力','缺资金','交通条件落后','自身动力不足'],
                        data:data.causePieChartData
                    };
                    charts.pieChart("chartForCause",false,causePieChartData);

                }
            })

            //右侧--------------------end
            //责任主体绑定点击事件
            $(".goToDetail").on("click", function () {
                $.jBox('', {title: "组织架构", buttons: {}, border: 0, opacity: 0.4});
                document.getElementsByTagName('body')[0].style.padding="0";
                // $.jBox("iframe:../html/perContent.html", {title: "李茜茜", buttons: {}, border: 0, opacity: 0.2})
                //设置弹窗top值
                var box = document.getElementById("jbox");
                // var title = document.getElementsByClassName("jbox-title")[0];
                box.style.top = "2.6vw";
                // title.style.textAlign ="cen";
                var html = template('organizationTemp',{});
                document.getElementsByClassName('jbox-content')[0].innerHTML = html;
            })
            //左侧--------------------start
            $('#leftSide').html(template('homepageLeftSideTemp', data));
            chart.pieChart("poorFamily","#8ed02b","#1b9aea");
            chart.pieChart("poorPeople","#8ed02b","#1b9aea");
            chart.pieChart("poorRate","#8ed02b","#1b9aea");
            $(".section-body.second-sec").find(".progressBar").each(function () {
                var value = $(this).next("div").children("span").text();
                progressBar.generate(this,value);
            })
            //左侧--------------------end

            //底部--------------------start
            $('.bottom').html(template('doctorSignTemp', data));
            bottomBind();
            //底部--------------------end
        },
        'getFiveGroup': function(){
            $("#leftTabs").addClass("hide");
            $("#leftOperation").addClass("hide");
            $("#sevenStepsTab").removeClass("hide");
            //右侧--------------------start
            var data={};
            $('#rightSide').html(template('sevenStepsRightSideTemp', data));
            charts.gauge("putOnRecordChart",{value:'.5',color:'#83ea43'});
            charts.gauge("diagnosisChart",{value:'.6',color:'#fd8320'});
            charts.labelPie("healthChart",{color:["#f84c24","#fde101","#83d130","#0786ef"],data:[{value:"123",name:"健康人数"},{value:"222",name:"大病人数"},{value:"333",name:"残疾人数"},{value:"221",name:"长期慢病"}]});
            charts.labelPie("laborChart",{color:["#f84c24","#fde101","#83d130","#0786ef"],data:[{value:"123",name:"普通劳动力"},{value:"252",name:"丧失劳动力"},{value:"223",name:"无劳动力"},{value:"255",name:"技能劳动力"}]});
            charts.gauge("signChart",{value:'.4',color:'#3ad3e1'});
            charts.gauge("overcomePovertyChart",{value:'.8',color:'#e14e35'});
            //右侧--------------------end

            //左侧--------------------start
            $('#leftSide').html(template('fiveLeftSideTemp', data));
            //进度条生成
            $(".section-body.second-sec").find(".progressBar").each(function () {
                var value = $(this).next("div").children("span").text();
                progressBar.generate(this,value);
            })
            //左侧--------------------end

            //底部--------------------start
            $('.bottom').html(template('helpDynamicTemp', data));
            //家医签约按钮点击事件
            $(".bottom-head").on("click",function(){
                var $this = $(this).siblings(".bottom-content");
                $this.slideToggle(function(){
                    var showBool = $this.is(":visible");
                    if(!showBool){
                        clearTimeout(timeOut);
                    }else{
                        slide("slideBox");
                        // chart.barChart("doctorSign");
                    }
                });
            });
            //底部--------------------end
            //弹窗部分代码
            //建档情况
            $("#openDoc").on("click", function () {
                $.jBox('', {title: "建档情况", buttons: {}, border: 0, opacity: 0.4});
                document.getElementsByTagName('body')[0].style.padding="0";
                //改变title宽度
                var title = document.getElementsByClassName("jbox-title")[0];
                title.style.width ="96%";
                var html = template('docCreateTemp',{});
                document.getElementsByClassName('jbox-content')[0].innerHTML = html;
                var docData = {color:['#fde101', '#1ff4be', '#c4572e'],total:"2030",center:["50%","50%"],data:[{value:111,name:"一般贫困户"},{value:222,name:"低保贫困户"},{value:321,name:"五保贫困户"}]}
                charts.pieChart('docChart',true,docData)
                // chart.poorChart("poorChart");
                /*var box=document.getElementById("jbox");
                 box.style.top = "3vw";*/
            })
            //脱贫情况
            $("#openTuopin").on("click", function () {
                $.jBox('', {title: "脱贫情况", buttons: {}, border: 0, opacity: 0.4});
                document.getElementsByTagName('body')[0].style.padding="0";
                var title = document.getElementsByClassName("jbox-title")[0];
                title.style.width ="96%";
                var html = template('tuopinTemp',{});
                document.getElementsByClassName('jbox-content')[0].innerHTML = html;
                chart.poorChart("poorChart");
                /*var box=document.getElementById("jbox");
                 box.style.top = "3vw";*/
            })
            //劳动力情况
            $("#laborCondition").on("click", function () {
                $.jBox('', {title: "劳动力情况", buttons: {}, border: 0, opacity: 0.4});
                document.getElementsByTagName('body')[0].style.padding="0";
                var title = document.getElementsByClassName("jbox-title")[0];
                title.style.width ="96%";
                var html = template('laborTemp',{});
                document.getElementsByClassName('jbox-content')[0].innerHTML = html;

                charts.labelPie("laborWindowChart",{color:["#f84c24","#fde101","#83d130","#0786ef"],data:[{value:"123",name:"普通劳动力"},{value:"252",name:"丧失劳动力"},{value:"223",name:"无劳动力"},{value:"255",name:"技能劳动力"}]});
                /*var box=document.getElementById("jbox");
                 box.style.top = "3vw";*/
            })
            //诊断情况 与建档情况公用一个模板
            $("#diagnoseCondition").on("click", function () {
                $.jBox('', {title: "诊断情况", buttons: {}, border: 0, opacity: 0.4});
                document.getElementsByTagName('body')[0].style.padding="0";
                var title = document.getElementsByClassName("jbox-title")[0];
                title.style.width ="96%";
                var html = template('docCreateTemp',{});
                document.getElementsByClassName('jbox-content')[0].innerHTML = html;
                var docData = {color:['#fde101', '#1ff4be', '#c4572e'],total:"2030",center:["50%","50%"],data:[{value:111,name:"一般贫困户"},{value:222,name:"低保贫困户"},{value:321,name:"五保贫困户"}]}
                charts.pieChart('docChart',true,docData)
                /*var box=document.getElementById("jbox");
                 box.style.top = "3vw";*/
            })
            //身体健康状况 与劳动力情况公用一个模板
            $("#healthCondition").on("click", function () {
                $.jBox('', {title: "身体健康情况", buttons: {}, border: 0, opacity: 0.4});
                document.getElementsByTagName('body')[0].style.padding="0";
                var title = document.getElementsByClassName("jbox-title")[0];
                title.style.width ="96%";
                var html = template('laborTemp',{});
                document.getElementsByClassName('jbox-content')[0].innerHTML = html;

                charts.labelPie("laborWindowChart",{color:["#f84c24","#fde101","#83d130","#0786ef"],data:[{value:"123",name:"普通劳动力"},{value:"252",name:"丧失劳动力"},{value:"223",name:"无劳动力"},{value:"255",name:"技能劳动力"}]});
                /*var box=document.getElementById("jbox");
                 box.style.top = "3vw";*/
            })
            //签约情况 与建档情况公用一个模板     --------------暂时这么写，后续提取公共部分--------------
            $("#signCondition").on("click", function () {
                $.jBox('', {title: "签约情况", buttons: {}, border: 0, opacity: 0.4});
                document.getElementsByTagName('body')[0].style.padding="0";
                var title = document.getElementsByClassName("jbox-title")[0];
                title.style.width ="96%";
                var html = template('docCreateTemp',{});
                document.getElementsByClassName('jbox-content')[0].innerHTML = html;
                var docData = {color:['#fde101', '#1ff4be', '#c4572e'],total:"2030",center:["50%","50%"],data:[{value:111,name:"一般贫困户"},{value:321,name:"五保贫困户"}]}
                charts.pieChart('docChart',true,docData)
                /*var box=document.getElementById("jbox");
                 box.style.top = "3vw";*/
            })
            //个人中心
            $("#openPerinfo").on("click", function () {
                $.jBox('', {title: "李茜茜", buttons: {}, border: 0, opacity: 0.4});
                document.getElementsByTagName('body')[0].style.padding="0";
                // $.jBox("iframe:../html/perContent.html", {title: "李茜茜", buttons: {}, border: 0, opacity: 0.2})
                //设置弹窗top值
                var box = document.getElementById("jbox");
                var title = document.getElementsByClassName("jbox-title")[0];
                box.style.top = "2.6vw";
                title.style.textAlign ="left";
                var html = template('personalTemp',{});
                document.getElementsByClassName('jbox-content')[0].innerHTML = html;
            })
            //村贫困家庭表单
            $("#openPoorInfo").on("click", function () {
                $.jBox('', {title: "", buttons: {}, border: 0, opacity: 0.4});
                document.getElementsByTagName('body')[0].style.padding="0";
                // $.jBox("iframe:../html/perContent.html", {title: "李茜茜", buttons: {}, border: 0, opacity: 0.2})
                //设置弹窗top值
                var box = document.getElementById("jbox");
                var title = document.getElementsByClassName("jbox-title")[0];
                box.style.top = "2.6vw";
                title.style.textAlign ="left";
                var html = template('personalTemp',{});
                document.getElementsByClassName('jbox-content')[0].innerHTML = html;
            })
        },
        'getDisease': function(){
            $("#leftTabs").removeClass("hide");
            $("#leftOperation").addClass("hide");
            $("#sevenStepsTab").addClass("hide");
            $("#leftTabs").find("span.disease").addClass("active").siblings().removeClass("active")

            //右侧--------------------start
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

            //左侧--------------------start
            $('#leftSide').html(template('povertyLeftSideTemp', data));
            //绑定左侧 人/户 切换点击事件
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
            $(".progressLi").each(function(){
                var percent = $(this).find(".percent").text();
                progressBar.generate($(this),percent);
            })
            //左侧--------------------end

            //底部--------------------start
            $('.bottom').html(template('doctorSignTemp', data));
            bottomBind();
            //底部--------------------end

        },
        'getEducation':function(){
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

        },
        'getSex':function(){
            $.getJSON("../js/json/povertyFamily/sex.json",function(data){
                if(data){
                    var sexData = data.povertyStructure[area];
                }
                $('#rightSide').html(template('povertyRightSideTemp_population',sexData));
                maleChartData={
                    color: ['#c2ff42', '#1996e6'],
                    data:[
                        {
                            value: sexData.numberOfMen,
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
                        {value: sexData.numberOfWomen, name: '女性'}

                    ],
                    center: ["50%", "50%"],
                    radius: ['50%', '70%']
                }
                charts.pieChart("maleChart",false,maleChartData)
                femaleChartData={
                    color: ['#fe5b3c', '#1996e6'],
                    data:[
                        {
                            value: sexData.numberOfWomen,
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
                        {value: sexData.numberOfMen, name: '男性'}

                    ],
                    center: ["50%", "50%"],
                    radius: ['50%', '70%']
                }
                charts.pieChart("femaleChart",false,femaleChartData)

            })
        },
        'getPoverty':function(){
            $('#rightSide').html(template('povertyRightSideTemp_poverty', {}));
            charts.labelPie("povertyStructureChart",{color:['#fde101', '#1ff4be', '#c4572e'],data:[{value:111,name:"一般贫困户"},{value:222,name:"低保贫困户"},{value:321,name:"五保贫困户"}]});
            $(".sectionTab").on("click","span",function(){
                if(!$(this).hasClass("active")&&$(this).text()=="人"){
                    $(this).addClass("active").siblings().removeClass("active");
                    $("#povertyTypeRank").find("thead th:eq(1)").text("人数")
                    //ajax
                }else if(!$(this).hasClass("active")&&$(this).text()=="户"){
                    $(this).addClass("active").siblings().removeClass("active");
                    $("#povertyTypeRank").find("thead th:eq(1)").text("户数")
                }
            });
        }

    }
    $(function(){
        //加载倒计时
        countDown.countDown("2017/05/25")
        //村贫困家庭表单
        $(".logout").on("click", function () {
            $.jBox('', {title: "", buttons: {}, border: 0, opacity: 0.4});
            document.getElementsByTagName('body')[0].style.padding="0";
            // $.jBox("iframe:../html/perContent.html", {title: "李茜茜", buttons: {}, border: 0, opacity: 0.2})
            //设置弹窗top值
            var html = template('villageTemp',{});
            document.getElementsByClassName('jbox-content')[0].innerHTML = html;
        })
        //切换头部标签
        $("#tab").on("click","div", function(){
            var activeBool = $(this).hasClass("active");
            if(!activeBool){
                $("#rightSide").empty();
                $(this).addClass("active");
                $(this).siblings("div").removeClass("active")
            }
            if($(this).hasClass("homepage")){//点击首页按钮
                api.getHomePage();

            }else if($(this).hasClass("poverty")){//点击贫困家庭按钮
                api.getDisease();
            }else if($(this).hasClass("fivePeople")){//---------------点击五人小组按钮----------------
                api.getFiveGroup();
            }
        });
        //贫困家庭右侧栏tab切换
        $("#leftTabs").on("click","span",function(){
            if(!$(this).hasClass("active")){
                $("#rightSide").empty();
                $(this).addClass("active").siblings().removeClass("active");

            }else{
                return;
            }
            if($(this).hasClass("disease")){//大病结构
                api.getDisease();
            }else if($(this).hasClass("education")){//学历结构
                api.getEducation()
            }else if($(this).hasClass("sex")){//性别结构
                api.getSex()
            }else if($(this).hasClass("poverty")){//贫困结构
                api.getPoverty();
            }
        });

        //督导组成员弹窗

        $("#rightSide").on("click",".goToDetail",function(){
            var membersTemp = template('selectTown',{town:[{'id':'123','name':'张家口村'},{'id':'234','name':'别的什么村'}]});
            membersTemp += template('members',{data:[{'duty':'组长','name':'李天骄','sex':'女','nation':'汉族','politic':'党员','office':'北京','contect':'13711111111','remarks':'没有备注'},{'duty':'副组长','name':'李天骄','sex':'女','nation':'汉族','politic':'党员','office':'北京','contect':'13711111111','remarks':'没有备注'}]});
            var $pop = $.jBox(membersTemp, {title: "督导组成员", buttons: {}, border: 0, opacity: 0.4});
            document.getElementsByTagName('body')[0].style.padding="0";
            var title = document.getElementsByClassName("jbox-title")[0];
            title.style.width ="96%";
            $(".select-switch").on("change",'select',function(){
                var selected=$(this).children('option:selected').val();
                var membersTemp = template('members',{data:[{'duty':'组长','name':'李骄','sex':'女','nation':'汉族','politic':'党员','office':'北京','contect':'13711111111','remarks':'没有备注'},{'duty':'副组长','name':'李天骄','sex':'女','nation':'汉族','politic':'党员','office':'北京','contect':'13711111111','remarks':'没有备注'}]});
                $("#jbox-content").find("table").remove();
                $("#jbox-content").append(membersTemp)
            })

        })

        //added by zrq  暂时这么判断
        var bool = $("#poorFamily").length;
        if(bool){

        }
        var height = $("header").height();
        var clientHeight = $(window).height();
        var margin = +$("#rightSide").css("margin-top").slice(0,-2);
        var sideHeight= clientHeight-height-margin;
        $("#rightSide,#leftSide").height(sideHeight-2);
        //刷新时触发首页点击事件
        $(".homepage").trigger("click");
    })
});