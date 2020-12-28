$(function () {
    // 1.设置设备监控点击事件
    $('.monitor .head a').on('click', function () {
        /* 
        $(this).addClass('active').siblings('a').removeClass('active')
        let index = $(this).index('.monitor .head a') 
        */

        // 改为链式编程
        let index = $(this).addClass('active').siblings('a').removeClass('active').end().index('.monitor .head a')

        $('.monitor .content').eq(index).show().siblings('.monitor .content').hide()
    })

    // 2.设置轮播图动画
    // 封装轮播图动画
    let time = 7000
    function loop() {
        $('.monitor .content ul').animate({
            top: -$('.monitor .content li').height() * 15
        }, time, 'linear', function () {
            $(this).css('top', 0)
        })
    }
    loop()
    // 设置定时器
    setInterval(loop, time)

    //3.设置订单销售额概览动画
    // 订单销售额概览数据
    let orderData = [
        { orders: "301,987", amount: "99834" }, //0
        { orders: "20,301", amount: "8617" }, //1
        { orders: "1,987", amount: "3834" }, //2
        { orders: "987", amount: "851" }, //3
    ];
    // 下标
    let orderIndex = 0
    // 定时器
    setInterval(function () {
        orderIndex++
        if (orderIndex == $('.order .title a').length) {
            orderIndex = 0
        }
        $('.order .title a').eq(orderIndex).addClass('active').siblings('a').removeClass('active')
        $('.order .data h3').eq(0).text(orderData[orderIndex].orders)
        $('.order .data h3').eq(1).text(orderData[orderIndex].amount)
    }, 1500)
})

// 饼状图
$(function () {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.querySelector('.point .echarts .pie'));
    let option = {
        color: ['#1d9dff', '#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '点位分布统计',
                startAngle: 170,
                type: 'pie',
                radius: [10, 75],
                center: ['50%', '50%'],
                data: [
                    { value: 335, name: '湖北' },
                    { value: 110, name: '云南' },
                    { value: 160, name: '北京' },
                    { value: 180, name: '山东' },
                    { value: 180, name: '河北' },
                    { value: 160, name: '江苏' },
                    { value: 200, name: '浙江' },
                    { value: 280, name: '四川' }
                ],
                roseType: 'radius',
                labelLine: {
                    smooth: 0.2,
                    length: 5,
                    length2: 7
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    myChart.setOption(option);
})

