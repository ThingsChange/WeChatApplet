/**
 * Created by Administrator on 2017/5/17.
 */
function pieChart(id, color1,color2, text1, text2) {
    var pieChart = echarts.init(document.getElementById(id));
    pieChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{b}:{d}%",//单位参数
            padding: [2, 4],
            confine: true
        },
        color: [color1,color2],
        series: [
            {
                name:'',
                type:'pie',
                radius: ['65%', '100%'],
                avoidLabelOverlap: false,
                hoverAnimation:false,
                data: [
                    {value:200, name:'未完成'},
                    {
                        value:1548,
                        name:'已完成',
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter:'{d}%\n已完成',
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'normal',
                                    color:'#fff'
                                }
                            },
                            emphasis: {
                                show:false
                            }
                        },
                    }
                ],

                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
    resize_window(pieChart);
}
/**
 * 重置浏览器窗口图表随之变化
 * @param Chart 图表
 */
function resize_window(Chart) {
    $(window).resize(function () {
        Chart.resize();
    });
}
function barChart(id) {
    var barchart = echarts.init(document.getElementById(id));
    var towns = ["尼尔基镇", "西瓦尔图镇", "拉杜尔鄂温族乡","拉杜尔鄂","拉杜", "拉杜克民族乡", "反政府武装", "西瓦尔图镇", "拉杜尔鄂乡", "拉杜克民族乡", "反政府武装","伊拉克", "美国", "北京", "登特办事处", "坤米尔", "办事粗"];
    barchart.setOption({
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '0%',
            right: '2%',
            bottom: '3%',
            height: '80%',
            // width: "100%",
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : towns,
                axisTick: {
                    alignWithLabel: true,
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#3a4146',
                        width: 2
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff"
                    },
                    interval:0,
                    formatter: function (val) {
                        //return val.name.replace(/(.{5})/g,'$1\n'); // 让series 中的文字进行换行
                        if (val.length > 4) {
                            var _val = val.substring(0, 5) + "\n"+val.substring(5);  // 让series 中的文字超出5个显示...
                            return _val;
                        }
                        return val;
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                show : true,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    lineStyle: {
                        color: "#3a4146",
                        width: 3
                    }
                }
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#1287b3'},//颜色参数
                                {offset: 1, color: '#0ed1f1'}
                            ]
                        )
                    },
                    emphasis: {
                        color: []
                    }
                },
                data:[10, 52, 200, 334, 390, 330, 220, 390, 330, 220,330, 220, 390, 330, 220, 330, 220]
            }
        ]
    })

// Enable data zoom when user click bar.
    /*var zoomSize = 6;
     myChart.on('click', function (params) {
     console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
     myChart.dispatchAction({
     type: 'dataZoom',
     startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
     endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
     });*/

}
