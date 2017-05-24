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
    //当前所选区域对应的全局变量
    var area = "nierjizhen";

    /**
     * 轮播图方法
     * @param id 轮播图容器
     */
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
    /**
     * 家医签约点击方法，暂时不做保存筛选条件的处理
     */
    function bottomBind() {
        $(".bottom-head").on("click",function(){
            $(".bottom-header ul li").removeClass("click-active").eq(0).addClass("click-active")
            var $this = $(this).siblings(".bottom-content");
            $this.slideToggle(function(){
                api.getDoctorSign('illnessCasuses');
            });

        });
    }

    // 数据加载
    var api = {
        'getHomePage': function(town){
            $("#leftTabs").addClass("hide");
            $("#leftOperation").removeClass("hide");
            $("#sevenStepsTab").addClass("hide");

            //右侧--------------------start

            $.getJSON("../js/json/homePage/dutyHost.json",function(data){
                if(data) {
                    $('#rightSide').html(template('homepageRightSideTemp', data[town]));
                    //进度条生成
                    $("#cause").find(".progressBar").each(function(){
                        var value = $(this).prev().text();
                        progressBar.generate(this,value);
                    });
                    //致贫原因饼图
                    var causePieChartData = {
                        color:['#abfb06','#1ff4be','#c4572e','#387b14','#cb4345','#a96969','#40bfec','#c73983','#0786ef','#fde101'],
                        legend:['因病致贫','因学致贫','因灾致贫','缺土地','缺水','缺劳力','缺资金','交通条件落后','自身动力不足'],
                        data:data[town].causePieChartData
                    };
                    charts.pieChart("chartForCause",false,causePieChartData);
                    //责任主体绑定点击事件
                    $(".goToDetail").on("click", function () {
                        $.jBox('', {title: "组织架构", buttons: {}, border: 0, opacity: 0.4});
                        document.getElementsByTagName('body')[0].style.padding="0";
                        var title = document.getElementsByClassName("jbox-title")[0];
                        title.style.width ="96%";
                        // $.jBox("iframe:../html/perContent.html", {title: "李茜茜", buttons: {}, border: 0, opacity: 0.2})
                        //设置弹窗top值
                        var box = document.getElementById("jbox");
                        // var title = document.getElementsByClassName("jbox-title")[0];
                        box.style.top = "2.6vw";
                        // title.style.textAlign ="cen";
                        var html = template('organizationTemp',{});
                        document.getElementsByClassName('jbox-content')[0].innerHTML = html;
                    })
                }
            })

            //右侧--------------------end

            //左侧--------------------start
            //获取首页左侧数据
            var dataLeft ={};
            var houseHoldArr, populationArr, rateArr;
            $.ajaxSettings.async = false;
            $.getJSON("../js/json/homePage/2017poorTarget.json",function(res){
                // console.log(res)
                var _data = res[town];
                houseHoldArr = [
                    {"value":_data.poorHouseholds.actualPoorHouseholds,"name":'已完成'},{"value":_data.poorHouseholds.notPoorHouseholds,"name":'未完成'}
                ];
                populationArr = [
                    {"value":_data.poorPersons.actualPoorPersons,"name":'已完成'},{"value":_data.poorPersons.notPoorPersons,"name":'未完成'}
                ];
                rateArr = [
                    {"value":_data.poorProbability.poorPersons,"name":'贫困人口'},{"value":_data.poorProbability.countryHousePersons,"name":'农村户籍人口'}

                ];
                dataLeft['townData']=_data;
            });
            $.getJSON("../js/json/homePage/helpMission.json",function(res){
                dataLeft['mission']=res;
            });
            $('#leftSide').html(template('homepageLeftSideTemp', dataLeft));
            // $('#leftSide').html(template('homepageLeftSideTemp', data));
            chart.pieChart("poorFamily","#8ed02b","#1b9aea",houseHoldArr,dataLeft.townData.poorHouseholds.percentage);
            chart.pieChart("poorPeople","#8ed02b","#1b9aea",populationArr,dataLeft.townData.poorHouseholds.percentage);
            chart.pieChart("poorRate","#8ed02b","#1b9aea",rateArr,dataLeft.townData.poorProbability.percentage);
            $(".section-body.second-sec").find(".progressBar").each(function () {
                var value = $(this).next("div").children("span").text();
                progressBar.generate(this,value);
            })
            //左侧--------------------end

            //底部--------------------start
            $('.bottom').html(template('doctorSignTemp', {}));
            bottomBind();
            //家医签约切换标题
            $(".bottom-header ul").on("click","li", function(){
                var activeBool = $(this).hasClass("click-active");
                if(!activeBool){
                    $(this).addClass("click-active");
                    $(this).siblings("li").removeClass("click-active");
                    api.getDoctorSign('documentPersons');
                }
            });
            //底部--------------------end
        },
        'getFiveGroup': function(town){
            $("#leftTabs").addClass("hide");
            $("#leftOperation").addClass("hide");
            $("#sevenStepsTab").removeClass("hide");
            //右侧--------------------start
            $.getJSON("../js/json/fiveGroup/fivegroup_right.json",function(res){
                var data = res[town];
                $('#rightSide').html(template('sevenStepsRightSideTemp', data));

                charts.gauge("putOnRecordChart",{value:data.healthPoint,color:'#83ea43'});
                charts.gauge("diagnosisChart",{value:data.diagnosisPoint,color:'#fd8320'});
                charts.labelPie("healthChart",{color:["#f84c24","#fde101","#83d130","#0786ef"],data:data.healthDetail});
                charts.labelPie("laborChart",{color:["#f84c24","#fde101","#83d130","#0786ef"],data:data.laborDetail});
                charts.gauge("signChart",{value:data.signPoint,color:'#3ad3e1'});
                charts.gauge("overcomePovertyChart",{value:data.poorPoint,color:'#e14e35'});
            });


            //右侧--------------------end

            //左侧--------------------start
            $.getJSON("../js/json/fiveGroup/fivegroup_left.json",function(res){
                var data = res[town];
                $('#leftSide').html(template('fiveLeftSideTemp', data));
                //进度条生成
                $(".section-body.second-sec").find(".progressBar").each(function () {
                    var value = $(this).next("div").children("span").text();
                    progressBar.generate(this,value);
                })
            });

            //左侧--------------------end

            //底部--------------------start
            $('.bottom').html(template('helpDynamicTemp', {}));
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
        'getPoorFamily': function(switchFlag){//贫困家庭左侧
            $.getJSON("../js/json/povertyFamily/poorFamily.json",function(data){
                data["huorren"] = switchFlag || 1;
                $('#leftSide').html(template('povertyLeftSideTemp', data));
            });
            //绑定左侧 人/户 切换点击事件
            $(".switch-head").on("click","span", function(){
                var activeBool = $(this).hasClass("span-active");
                if(!activeBool){
                    // $(this).addClass("span-active");
                    // $(this).siblings("span").removeClass("span-active")
                    var text = $(this).text();
                    // var obj = $(".section-body table thead tr").children();
                    if(text == "户"){
                        api.getPoorFamily(1);
                    }else{
                        api.getPoorFamily(2);
                    }
                }

            });
        },
        'getDisease': function(){
            $("#leftTabs").removeClass("hide");
            $("#leftOperation").addClass("hide");
            $("#sevenStepsTab").addClass("hide");
            $("#leftTabs").find("span.disease").addClass("active").siblings().removeClass("active")

            //右侧--------------------start
            //右侧--------------------start
            var data={
                disease:[
                    {name:"高血压",percent:"16%"},
                    {name:"脑血管病",percent:"8%"},
                    {name:"糖尿病",percent:"6%"},
                    {name:"冠心病",percent:"5%"},
                    {name:"脑梗",percent:"3%"},
                    {name:"布病",percent:"2%"},
                    {name:"类风湿性关节炎",percent:"2%"},
                    {name:"关节病",percent:"2%"},
                    {name:"胆囊炎",percent:"1%"},
                    {name:"心肌病",percent:"1%"},
                    {name:"肺结核",percent:"1%"},
                    {name:"腰间盘突出",percent:"1%"}
                ],

            };
            $('#rightSide').html(template('povertyRightSideTemp_disease', data));
            var diseaseStructure = {
                legend:["高血压","脑血管病","糖尿病","冠心病","脑梗","布病","类风湿性关节炎","关节病","胆囊炎","心肌病","肺结核","腰间盘突出","其他"],
                color:['#abfb06','#1ff4be','#c4572e','#387b14','#cb4345','#a96969','#40bfec','#c73983','#0786ef','#fde101'],
                data:[
                    {value:532, name:'高血压'},
                    {value:275, name:'脑血管病'},
                    {value:191, name:'糖尿病'},
                    {value:164, name:'冠心病'},
                    {value:117, name:'脑梗'},
                    {value:69, name:'布病'},
                    {value:63, name:'类风湿性关节炎'},
                    {value:57, name:'关节病'},
                    {value:46, name:'胆囊炎'},
                    {value:43,name:"心肌病"},
                    {value:43,name:"肺结核"},
                    {value:36,name:"腰间盘突出"},
                    {value:1720,name:"其他"}
                ],
                total:"3356"
            }
            charts.pieChart("diseaseStructureChart",true,diseaseStructure);
            var diseaseIncidence = {
                color:['#ff5232','#1996e6'],
                data:[{value:3356, name:'发生',
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
                    {value:324444, name:'未发生'}],
                radius: ['50%', '70%'],
                center:["50%","50%"]
            };
            charts.pieChart("diseaseIncidenceChart",false,diseaseIncidence)
            //右侧--------------------end

            //左侧--------------------start
            api.getPoorFamily();
            /*$.getJSON("../js/json/povertyFamily/poorFamily.json",function(data){
                data["huorren"] = switchFlag || 1;
                $('#leftSide').html(template('povertyLeftSideTemp', data));
            });*/


            $(".progressLi").each(function(){
                var percent = $(this).find(".percent").text();
                progressBar.generate($(this),percent);
            })
            //左侧--------------------end

            //底部--------------------start
            $('.bottom').html(template('doctorSignTemp', data));
            bottomBind();
            // api.getDoctorSign('illnessCasuses');
            //家医签约切换标题
            $(".bottom-header ul").on("click","li", function(){
                var activeBool = $(this).hasClass("click-active");
                if(!activeBool){
                    $(this).addClass("click-active");
                    $(this).siblings("li").removeClass("click-active");
                    api.getDoctorSign('documentPersons');
                }
            });
            //底部--------------------end

        },
        'getEducation':function(){
            $.getJSON("../js/json/povertyFamily/education.json",function(data){
                $('#rightSide').html(template('povertyRightSideTemp_education', data[area]));
            });
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
                sexData.numberOfMen = (parseInt(sexData.poorCount) - parseInt(sexData.numberOfWomen)) + "";
                $('#rightSide').html(template('povertyRightSideTemp_population',sexData));
                maleChartData={
                    color: ['#c2ff42', '#1996e6'],
                    data:[
                        {
                            value: (parseInt(sexData.poorCount) - sexData.numberOfWomen),
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
                        {value: (parseInt(sexData.poorCount) - sexData.numberOfWomen), name: '男性'}

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
        },
        'getDoctorSign':function(town){
            $.getJSON("../js/json/homePage/doctorSign.json",function(data){
                if(data) {
                    var dataObj = data[town];
                    var townArr = [];
                    var dataArr = [];
                    for(p in dataObj) {
                        townArr.push(p);
                        dataArr.push(dataObj[p]);
                    }
                    chart.barChart("doctorSign",townArr,dataArr);
                }
            })
        }

    }
    $(function(){
        //加载倒计时
        countDown.countDown("2017/05/25")
        //刷新时触发首页点击事件
        api.getHomePage(area);
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
                api.getHomePage(area);

            }else if($(this).hasClass("poverty")){//点击贫困家庭按钮
                    api.getDisease();

            }else if($(this).hasClass("fivePeople")){//---------------点击五人小组按钮----------------
                api.getFiveGroup(area);
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

        /*$("#rightSide").on("click",".goToDetail",function(){
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

        })*/
        var height = $("header").height();
        var clientHeight = $(window).height();
        var margin = +$("#rightSide").css("margin-top").slice(0,-2);
        var sideHeight= clientHeight-height-margin;
        $("#rightSide,#leftSide").height(sideHeight-2);
    })



    //地图模块js ---------start----------
    $(function() {
        var aPath = $('#moqi_x');
        getMap(aPath);

        var hoverLock = true;  //hover事件开关；
        var curr_path_id=false;  //当前选中path对象id;
        //var Next_map_name=null;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var dis_w = 90; //鼠标坐标偏移量
        var dis_h = 180; //
        var $cheangeMap=$('#changeMap');//进入地图按钮

        function getMap(oSvg) {
            oSvg.on('mouseover', 'path', function(event) {
                if (hoverLock) {
                    $(this).addClass('map-hover');
                    oSvg.find('path').css('fill','#919689');
                    this.style.fill = '#5c5f57';

                    var x = event.pageX || event.clientX + scrollX;
                    var y = event.pageY || event.clientY + scrollY;
                    $(".map-tips").addClass('show');
                    //console.log($(this).attr('id'));

                    $(".map-tips").css({
                        "left": x - dis_w,
                        "top": y - dis_h,
                    });
                }
            });

            oSvg.on('click', 'path', function(event) {
                if (curr_path_id){
                    //如果有当前id 已选中某镇
                    if (curr_path_id!=this.id) {
                        oSvg.find('path').css('fill','#919689');
                        curr_path_id='';
                        $(".map-links").removeClass('show');
                        hoverLock=true;
                        return false;
                    }
                }
                if (!curr_path_id){
                    //如果没有当前id;未选中镇
                    hoverLock = false;
                    oSvg.find('path').css('fill','#919689');
                    $(this).addClass('map-active');
                    this.style.fill = '#5c5f57';
                    var x = event.pageX || event.clientX + scrollX;
                    var y = event.pageY || event.clientY + scrollY;
                    curr_path_id=this.id;

                    console.log(this.id);
                    $(".map-tips").removeClass('show');

                    $(".map-links").css({
                        "left": x - dis_w,
                        "top": y - dis_h,
                    }).addClass('show');
                }

            });


        }


        function getSubMap(oSvg) {
            oSvg.on('mouseover', 'path', function(event) {
                if (hoverLock) {
                    //$(this).addClass('map-hover');
                    oSvg.find('path').css('fill','#919689');
                    this.style.fill = '#5c5f57';

                    var x = event.pageX || event.clientX + scrollX;
                    var y = event.pageY || event.clientY + scrollY;
                    $(".map-tips").addClass('show');
                    //console.log($(this).attr('id'));
                    $(".map-tips").css({
                        "left": x - dis_w,
                        "top": y - dis_h,
                    });
                }
            });

            oSvg.on('click', 'path', function(event) {

                if (curr_path_id){
                    //如果有当前id 已选中某镇
                    if (curr_path_id!=this.id) {
                        oSvg.find('path').css('fill','#919689');
                        curr_path_id='';
                        alert('饮茶美好列表');
                    }
                }
                if (!curr_path_id){
                    //如果没有当前id;未选中镇
                    hoverLock = false;
                    oSvg.find('path').css('fill','#919689');
                    this.style.fill = '#5c5f57';
                    var x = event.pageX || event.clientX + scrollX;
                    var y = event.pageY || event.clientY + scrollY;
                    curr_path_id=this.id;

                    console.log(this.id);

                    alert('弹出列表');


                }

            });


        }

        //进入下级地图
        $cheangeMap.on('click', function(event) {

            event.preventDefault();
            aPath.removeClass('show');
            $(".map-links").removeClass('show');

            var _id='#'+'xiwaertuzhenSvg';

            $(_id).addClass('show');
            getSubMap($(_id));
            hoverLock=true;

        });
    });
    //地图模块js ---------end----------

});