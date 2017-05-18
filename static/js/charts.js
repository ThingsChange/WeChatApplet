require.config({
    paths: {
        'echarts': '../lib/echarts.min'
    }
});
define(['echarts'],function(echarts){
/**
 * 首页-致贫原因情况-饼图
 */
    var chartForCause = function(){
        echarts.init(document.getElementById('chartForCause')).setOption(
            {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    bottom:'20',
                    right:'0',
                    itemHeight:'5',
                    itemWidth:5,
                    width:10,
                    textStyle:{
                        color:'#fff'
                    },
                    data:['因病致贫','因学致贫','因灾致贫','缺土地','缺水','缺劳力','缺资金','交通条件落后','自身动力不足']
                },
                series: [
                    {
                        type:'pie',
                        radius: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '15',
                                    fontWeight: 'normal'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        center:["30%","50%"],
                        color:['#abfb06','#1ff4be','#c4572e','#387b14','#cb4345','#a96969','#40bfec','#c73983','#0786ef','#fde101'],
                        data:[
                            {value:335, name:'因病致贫'},
                            {value:310, name:'因学致贫'},
                            {value:234, name:'因灾致贫'},
                            {value:135, name:'缺土地'},
                            {value:1548, name:'缺水'},
                            {value:123, name:'缺劳力'},
                            {value:234, name:'缺资金'},
                            {value:1243, name:'交通条件落后'},
                            {value:222, name:'自身动力不足'}
                        ]
                    }
                ]
            }
        );
    };

    /**
     * 贫困家庭-大病结构-饼图
     */

    var diseaseStructureChart = function() {
        echarts.init(document.getElementById('diseaseStructureChart')).setOption(
            {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    bottom: '20',
                    right: '0',
                    itemHeight: '5',
                    itemWidth: 5,
                    width: 10,
                    textStyle: {
                        color: '#fff'
                    },
                    data: ['心脏a病', '类风湿性关节炎', '心脏c病', '心脏d病', '心脏e病', '心脏f病', '心脏g病', '心脏h病', '心脏i病', '心脏j病', '心脏k病', '心脏l病']
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                formatter: "5000",//总数
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'lighter',
                                    color: '#fff'
                                }
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        center: ["28%", "50%"],
                        color: ['#abfb06', '#1ff4be', '#c4572e', '#387b14', '#cb4345', '#a96969', '#40bfec', '#c73983', '#0786ef', '#fde101'],
                        data: [
                            {value: 335, name: '心脏a病'},
                            {value: 310, name: '类风湿性关节炎'},
                            {value: 234, name: '心脏c病'},
                            {value: 135, name: '心脏d病'},
                            {value: 1548, name: '心脏e病'},
                            {value: 123, name: '心脏f病'},
                            {value: 234, name: '心脏h病'},
                            {value: 1243, name: '心脏i病'},
                            {value: 1243, name: '心脏j病'},
                            {value: 1243, name: '心脏k病'},
                            {value: 1243, name: '心脏l病'},
                            {value: 222, name: '心脏m病'}
                        ]
                    }
                ]
            }
        );
    };

    /**
     * 贫困家庭-大病发生率-饼图
     */

    var diseaseIncidenceChart = function(){
        echarts.init(document.getElementById('diseaseIncidenceChart')).setOption(
            {
                series: [
                    {
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show:false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        center:["50%","50%"],
                        color:['#ff5232','#1996e6'],
                        data:[
                            {
                                value:335,
                                name:'发生',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'center',
                                        formatter:"{d}%",
                                        textStyle: {
                                            fontSize: '11',
                                            fontWeight:'lighter',
                                            color:'#fff'
                                        }
                                    }
                                }
                            },
                            {value:310, name:'未发生'},

                        ]
                    }
                ]
            }
        );
    };

    /**
     * 贫困家庭-贫困结构-饼图
     */

    var povertyStructureChart = function() {
        echarts.init(document.getElementById('povertyStructureChart')).setOption(
            {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}<br />{c}<br />{d}%"
                },
                legend: {
                    orient: 'horizontal',
                    bottom: '20',
                    right: '0',
                    itemHeight: '5',
                    itemWidth: 5,
                    width: 10,
                    textStyle: {
                        color: '#fff'
                    },
                    data: ['一般贫困户', '五保贫困户', '低保贫困户']
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '15',
                                    fontWeight: 'normal'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        center: ["40%", "50%"],
                        color: ['#abfb06', '#1ff4be', '#c4572e', '#387b14', '#cb4345', '#a96969', '#40bfec', '#c73983', '#0786ef', '#fde101'],
                        data: [
                            {value: 335, name: '一般贫困户'},
                            {value: 310, name: '五保贫困户'},
                            {value: 234, name: '低保贫困户'},

                        ]
                    }
                ]
            }
        );
    };

    /**
     * 贫困家庭-学历结构-饼图
     */

    var educationStructureChart = function() {
        echarts.init(document.getElementById('educationStructureChart')).setOption(
            {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}<br/>{c}<br/>{d}%"
                },
                legend: {
                    orient: 'horizontal',
                    bottom: '30',
                    right: '0',
                    itemHeight: '5',
                    itemWidth: 5,
                    width: 10,
                    textStyle: {
                        color: '#fff'
                    },
                    data: ['学龄前儿童', '小学', '初中', '高中', '大专及以上', '文盲及半文盲']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '70%',
                        center: ['40%', '50%'],
                        color: ['#fde101', '#1ff4be', '#c4572e', '#387b14', '#cb4345', '#a96969', '#40bfec', '#c73983', '#0786ef'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '15',
                                    fontWeight: 'normal'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {value: 335, name: '学龄前儿童'},
                            {value: 310, name: '小学'},
                            {value: 234, name: '初中'},
                            {value: 135, name: '高中'},
                            {value: 1548, name: '大专及以上'},
                            {value: 123, name: '文盲及半文盲'}

                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        );
    };

    /**
     * 贫困家庭-人口结构-饼图
     */

    var maleChart = function() {
        echarts.init(document.getElementById('maleChart')).setOption(
            {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}<br/>{c}<br/>{d}%"
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        center: ["50%", "50%"],
                        color: ['#c2ff42', '#1996e6'],
                        data: [
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
                            {value: 221, name: '女性'},

                        ]
                    }
                ]
            }
        );
    }

    var femaleChart = function() {
        echarts.init(document.getElementById('femaleChart')).setOption(
            {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}<br/>{c}<br/>{d}%"
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        center: ["50%", "50%"],
                        color: ['#fe5b3c', '#1996e6'],
                        data: [
                            {
                                value: 221,
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
                            {value: 335, name: '男性'},

                        ]
                    }
                ]
            }
        );
    }
    return {
        'chartForCause':chartForCause,
        'diseaseStructureChart':diseaseStructureChart,
        'diseaseIncidenceChart':diseaseIncidenceChart,
        'povertyStructureChart':povertyStructureChart,
        'educationStructureChart':educationStructureChart,
        'maleChart':maleChart,
        'femaleChart':femaleChart
    }
})
