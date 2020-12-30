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
        { name: "巧乐兹", num: "6,080" },
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
                startAngle: 180,
                type: 'pie',
                radius: ['70%', '90%'],
                center: ['50%', '65%'],
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

$(function () {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.querySelector('.map .geo'));
    // 指定图表的配置项和数据
    let geoCoordMap = {
        '新疆玛纳斯基地': [86.22, 44.30],
        '九江': [116.00, 29.70],
        '新乡': [116.402217, 35.311657],
        ' ': [79.92, 37.12],
        '  ': [86.85, 47.70],
        '若羌县': [88.17, 39.02],
        '上海': [121.4648, 31.2891],
        '东莞': [113.8953, 22.901],
        '东营': [118.7073, 37.5513],
        '中山': [113.4229, 22.478],
        '临汾': [111.4783, 36.1615],
        '临沂': [118.3118, 35.2936],
        '丹东': [124.541, 40.4242],
        '丽水': [119.5642, 28.1854],
        '乌鲁木齐': [87.9236, 43.5883],
        '佛山': [112.8955, 23.1097],
        '保定': [115.0488, 39.0948],
        '兰州': [103.5901, 36.3043],
        '包头': [110.3467, 41.4899],
        '北京': [116.4551, 40.2539],
        '北海': [109.314, 21.6211],
        '南京': [118.8062, 31.9208],
        '南宁': [108.479, 23.1152],
        '南昌': [116.0046, 28.6633],
        '南通': [121.1023, 32.1625],
        '厦门': [118.1689, 24.6478],
        '台州': [121.1353, 28.6688],
        '合肥': [117.29, 32.0581],
        '呼和浩特': [111.4124, 40.4901],
        '咸阳': [108.4131, 34.8706],
        '哈尔滨': [127.9688, 45.368],
        '唐山': [118.4766, 39.6826],
        '嘉兴': [120.9155, 30.6354],
        '大同': [113.7854, 39.8035],
        '大连': [122.2229, 39.4409],
        '天津': [117.4219, 39.4189],
        '太原': [112.3352, 37.9413],
        '威海': [121.9482, 37.1393],
        '宁波': [121.5967, 29.6466],
        '宝鸡': [107.1826, 34.3433],
        '宿迁': [118.5535, 33.7775],
        '常州': [119.4543, 31.5582],
        '广州': [113.5107, 23.2196],
        '廊坊': [116.521, 39.0509],
        '延安': [109.1052, 36.4252],
        '张家口': [115.1477, 40.8527],
        '徐州': [117.5208, 34.3268],
        '德州': [116.6858, 37.2107],
        '惠州': [114.6204, 23.1647],
        '成都': [103.9526, 30.7617],
        '扬州': [119.4653, 32.8162],
        '承德': [117.5757, 41.4075],
        '拉萨': [91.1865, 30.1465],
        '无锡': [120.3442, 31.5527],
        '日照': [119.2786, 35.5023],
        '昆明': [102.9199, 25.4663],
        '杭州': [119.5313, 29.8773],
        '枣庄': [117.323, 34.8926],
        '柳州': [109.3799, 24.9774],
        '株洲': [113.5327, 27.0319],
        '武汉': [114.3896, 30.6628],
        '汕头': [117.1692, 23.3405],
        '江门': [112.6318, 22.1484],
        '沈阳': [123.1238, 42.1216],
        '沧州': [116.8286, 38.2104],
        '河源': [114.917, 23.9722],
        '泉州': [118.3228, 25.1147],
        '泰安': [117.0264, 36.0516],
        '泰州': [120.0586, 32.5525],
        '济南': [117.1582, 36.8701],
        '济宁': [116.8286, 35.3375],
        '海口': [110.3893, 19.8516],
        '淄博': [118.0371, 36.6064],
        '淮安': [118.927, 33.4039],
        '深圳': [114.5435, 22.5439],
        '清远': [112.9175, 24.3292],
        '温州': [120.498, 27.8119],
        '渭南': [109.7864, 35.0299],
        '湖州': [119.8608, 30.7782],
        '湘潭': [112.5439, 27.7075],
        '滨州': [117.8174, 37.4963],
        '潍坊': [119.0918, 36.524],
        '烟台': [120.7397, 37.5128],
        '玉溪': [101.9312, 23.8898],
        '珠海': [113.7305, 22.1155],
        '盐城': [120.2234, 33.5577],
        '盘锦': [121.9482, 41.0449],
        '石家庄': [114.4995, 38.1006],
        '福州': [119.4543, 25.9222],
        '秦皇岛': [119.2126, 40.0232],
        '绍兴': [120.564, 29.7565],
        '聊城': [115.9167, 36.4032],
        '肇庆': [112.1265, 23.5822],
        '舟山': [122.2559, 30.2234],
        '苏州': [120.6519, 31.3989],
        '莱芜': [117.6526, 36.2714],
        '菏泽': [115.6201, 35.2057],
        '营口': [122.4316, 40.4297],
        '葫芦岛': [120.1575, 40.578],
        '衡水': [115.8838, 37.7161],
        '衢州': [118.6853, 28.8666],
        '西宁': [101.4038, 36.8207],
        '西安': [109.1162, 34.2004],
        '贵阳': [106.6992, 26.7682],
        '连云港': [119.1248, 34.552],
        '邢台': [114.8071, 37.2821],
        '邯郸': [114.4775, 36.535],
        '郑州': [113.4668, 34.6234],
        '鄂尔多斯': [108.9734, 39.2487],
        '重庆': [107.7539, 30.1904],
        '金华': [120.0037, 29.1028],
        '铜川': [109.0393, 35.1947],
        '银川': [106.3586, 38.1775],
        '镇江': [119.4763, 31.9702],
        '长春': [125.8154, 44.2584],
        '长沙': [113.0823, 28.2568],
        '长治': [112.8625, 36.4746],
        '阳泉': [113.4778, 38.0951],
        '青岛': [120.4651, 36.3373],
        '韶关': [113.7964, 24.7028]
    };

    let BJData = [
        [{
            name: '新乡'
        }, {
            name: '新乡',
            value: 200
        }],
        [{
            name: '新乡'
        }, {
            name: '呼和浩特',
            value: 90
        }],
        [{
            name: '新乡'
        }, {
            name: '哈尔滨',
            value: 90
        }],
        [{
            name: '新乡'
        }, {
            name: '石家庄',
            value: 90
        }],
        [{
            name: '新乡'
        }, {
            name: '昆明',
            value: 30
        }],
        [{
            name: '新乡'
        }, {
            name: '北京',
            value: 100
        }],
        [{
            name: '新乡'
        }, {
            name: '长春',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '重庆',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '贵阳',
            value: 50
        }],
        [{
            name: '新乡'
        }, {
            name: '南宁',
            value: 30
        }],
        [{
            name: '新乡'
        }, {
            name: '济南',
            value: 10
        }],
        [{
            name: '新乡'
        }, {
            name: '太原',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '西安',
            value: 60
        }],
        [{
            name: '新乡'
        }, {
            name: '武汉',
            value: 50
        }],
        [{
            name: '新乡'
        }, {
            name: '合肥',
            value: 40
        }],
        [{
            name: '新乡'
        }, {
            name: '南京',
            value: 30
        }],
        [{
            name: '新乡'
        }, {
            name: '沈阳',
            value: 20
        }],
        [{
            name: '新乡'
        }, {
            name: '成都',
            value: 10
        }]
    ];

    let SHData = [
        [{
            name: '九江'
        }, {
            name: '九江',
            value: 200
        }],

        [{
            name: '九江'
        }, {
            name: '长沙',
            value: 95
        }],
        [{
            name: '九江'
        }, {
            name: '武汉',
            value: 30
        }],
        [{
            name: '九江'
        }, {
            name: '南昌',
            value: 20
        }],
        [{
            name: '九江'
        }, {
            name: '合肥',
            value: 70
        }],
        [{
            name: '九江'
        }, {
            name: '南京',
            value: 60
        }],
        [{
            name: '九江'
        }, {
            name: '福州',
            value: 50
        }],
        [{
            name: '九江'
        }, {
            name: '上海',
            value: 100
        }],
        [{
            name: '九江'
        }, {
            name: '深圳',
            value: 100
        }],

    ];

    let GZData = [
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '新疆玛纳斯基地',
            value: 200
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '  ',
            value: 90
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: ' ',
            value: 40
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '呼和浩特',
            value: 90
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '昆明',
            value: 40
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '成都',
            value: 10
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '兰州',
            value: 95
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '银川',
            value: 90
        }],
        [{
            name: '新疆玛纳斯基地'
        }, {
            name: '西宁',
            value: 80
        }],

    ];

    let planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';

    let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
            let dataItem = data[i];
            let fromCoord = geoCoordMap[dataItem[0].name];
            let toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord
                }, {
                    coord: toCoord
                }]);
            }
        }
        return res;
    };

    let color = ['#3ed4ff', '#ffa022', '#a6c84c'];
    let series = [];
    [
        ['新乡', BJData],
        ['九江', SHData],
        ['新疆', GZData]
    ].forEach(function (item, i) {
        series.push({
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top10',
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top10',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            })
        });
    });

    option = {
        backgroundColor: '#080a20',
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: ['北京 Top10', '上海 Top10', '广州 Top10'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'single'
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false,
            itemStyle: {
                normal: {
                    areaColor: '#132937',
                    borderColor: '#0692a4'
                },
                emphasis: {
                    areaColor: '#0b1c2d'
                }
            }
        },
        series: series
    };
    myChart.setOption(option);
});