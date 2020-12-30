// 页面动画效果
$(function () {
    // 1.设置设备监控点击事件
    $('.monitor .head a').on('click', function () {
        /* 
        $(this).addClass('active').siblings('a').removeClass('active')
        let index = $(this).index('.monitor .head a') 
        */

        // 1.1 改为链式编程
        let index = $(this).addClass('active').siblings('a').removeClass('active').end().index('.monitor .head a')

        $('.monitor .content').eq(index).show().siblings('.monitor .content').hide()
    })

    // 2.设置轮播图动画
    // 2.1 封装轮播图动画
    let time = 7000
    function loop() {
        $('.monitor .content ul').animate({
            top: -$('.monitor .content li').height() * 15
        }, time, 'linear', function () {
            $(this).css('top', 0)
        })
    }
    loop()
    // 2.2 设置定时器
    setInterval(loop, time)

    // 3.设置订单销售额概览动画
    // 3.1 订单销售额概览数据
    let orderData = [
        { orders: "301,987", amount: "99834" }, //0
        { orders: "20,301", amount: "8617" }, //1
        { orders: "1,987", amount: "3834" }, //2
        { orders: "987", amount: "851" }, //3
    ]
    // 3.2 下标
    let orderIndex = 0
    // 3.3 定时器动画
    setInterval(function () {
        orderIndex++
        if (orderIndex == $('.order .title a').length) {
            orderIndex = 0
        }
        $('.order .title a').eq(orderIndex).addClass('active').siblings('a').removeClass('active')
        $('.order .data h3').eq(0).text(orderData[orderIndex].orders)
        $('.order .data h3').eq(1).text(orderData[orderIndex].amount)
    }, 1500)

    /* // 4.设置销售额统计动画
    // 4.1 下标
    let saleIndex = 0
    // 4.2 .定时器动画
    setInterval(function () {
        saleIndex++
        if (saleIndex == $('.sale .title a').length) {
            saleIndex = 0
        }
        $('.sale .title a').eq(saleIndex).addClass('active').siblings('a').removeClass('active')
    }, 1500) */

    // 5.设置全国热榜各省热销动画
    // 5.1 各省热销数据
    let hotData = [
        { name: "可爱多", num: "9,086" },
        { name: "娃哈哈", num: "8,341" },
        { name: "喜之郎", num: "7,407" },
        { name: "八喜", num: "6,080" },
        { name: "小洋人", num: "6,724" },
        { name: "好多鱼", num: "2,170" },
    ]
    // 5.2 下标
    let hotIndex = 0
    // 5.3 定时器动画
    setInterval(function () {
        hotIndex++
        if (hotIndex == $('.hot .middle li').length) {
            hotIndex = 0
        }
        $('.hot .middle li').eq(hotIndex).addClass('active').siblings().removeClass('active')
        // 5.4 生成新数据
        hotData.push(hotData.shift())
        // 5.5 清空ul里的数据
        $('.hot .right ul').empty()
        // 5.6 生成新的ul
        for (let i = 0; i < hotData.length; i++) {
            $(` <li>
                    <span>${hotData[i].name}</span>
                    <b>${hotData[i].num}</b>
                    <i class="icon-up"></i>
                </li>`).appendTo($('.hot .right ul'))
        }
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

// 柱状图
$(function () {
    let myChart = echarts.init($('.userTotal .bar')[0])
    let item = {
        value: 1000,
        itemStyle: {
            color: '#254065',
            opacity: .6
        }
    }
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'none'        // 默认为直线，可选为：'line' | 'shadow' | 'none'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            height: 210,
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#034f5f'
                    }
                },
                axisLabel: {
                    color: '#478fe9'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#034f5f'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#034f5f'
                    }
                },
                axisLabel: {
                    color: '#478fe9'
                }
            }, {
                axisLine: {
                    lineStyle: {
                        color: '#034f5f'
                    }
                }
            }
        ],
        series: [
            {
                name: '全国用户总量统计',
                type: 'bar',
                barWidth: '60%',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#00f8f9' },
                            { offset: 1, color: '#0069d0' }
                        ]
                    )
                },
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
            }
        ]
    };
    myChart.setOption(option)
})

// 曲线图
$(function () {
    let myChart = echarts.init($('.sale .line')[0])
    let option = {
        title: {
            text: '单位 万',
            textStyle: {
                color: "#468fea",
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            }
        },
        legend: {
            data: ['最高额度', '最低额度'],
            right: '10%',
            textStyle: {
                color: '#4b99fa'
            }
        },
        grid: {
            height: 110,
            left: '7%',
            right: '3%',
            top: '20%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: {
                lineStyle: {
                    color: '#012b48'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#3d7dce'
                }
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#012b48'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#3d7dce'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#012b48'
                }
            }
        },
        series: [
            {
                name: '最高额度',
                type: 'line',
                data: [24, 440, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                smooth: true,
                symbolSize: 10,
                color: '#00f2f1',
                lineStyle: {
                    color: '#00f2f1'
                }
            },
            {
                name: '最低额度',
                type: 'line',
                data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                smooth: true,
                symbolSize: 10,
                color: '#c43938',
                lineStyle: {
                    color: '#c43938'
                }
            },
        ]
    };
    myChart.setOption(option)

    let data = [
        [
            [24, 440, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        [
            [123, 175, 112, 197, 221, 457, 98, 261, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        [
            [34, 87, 32, 176, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 398, 21, 56, 387, 43, 12, 443, 54, 12, 98]
        ],
        [
            [43, 73, 62, 354, 91, 54, 284, 43, 486, 43, 54, 53],
            [32, 54, 34, 87, 132, 45, 62, 268, 93, 54, 54, 24]
        ]
    ];

    // 4.设置销售额统计动画
    // 4.1 下标
    let saleIndex = 0
    // 4.2 .定时器动画
    setInterval(function () {
        saleIndex++
        if (saleIndex == $('.sale .title a').length) {
            saleIndex = 0
        }
        $('.sale .title a').eq(saleIndex).addClass('active').siblings('a').removeClass('active')

        // 替换数据
        option.series[0].data = data[saleIndex][0]
        option.series[1].data = data[saleIndex][1]
        myChart.setOption(option)
    }, 1500)
})

// 环形图
$(function () {
    let myChart = echarts.init($('.quarter .ring')[0])
    let option = {
        title: {
            text: '75%',
            left: '40%',
            top: '45%',
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        },
        legend: {
            orient: 'vertical',
            left: 10
        },
        series: [
            {
                width: 200,
                height: 130,
                startAngle: 180,
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: 35,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,// 表示渐变的方向，0001:从左到右,0010:从上到下
                                [{
                                    offset: 0,
                                    color: '#0063c2'
                                },
                                {
                                    offset: 1,
                                    color: '#00c3de'
                                }
                                ])
                        }
                    },
                    {
                        value: 15,
                        itemStyle: {
                            color: '#d0274d'
                        }
                    },
                    {
                        value: 50, itemStyle: {
                            color: 'transparent'
                        }
                    },
                ]
            }
        ]
    };
    myChart.setOption(option)
})

// 迁徙图

