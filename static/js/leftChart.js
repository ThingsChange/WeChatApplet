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
                    {value:1548, name:'已完成'}
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