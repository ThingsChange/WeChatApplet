require.config({
    paths: {
        'echarts': '../lib/echarts.min'
    }
});
define(['echarts'],function(echarts){
/**
 * 首页-致贫原因情况-饼图
 */
    var chart = function(){
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
    }
    return {
        'charts':chart
    }
})
