;(function($) {
    // 默认配置
    var defaultOption = {
        // 百分比，范围0 ~ 100
        value: 50,
        // 球体大小
        size: 225,
        // 球体轮廓线条宽度
        lineWidth: 0,
        // 线条颜色
        lineColor: 'blue',
        // 水与球体间隔
        margin: 0,
        // 波浪宽度，即正弦曲线每周期宽度，单位：像素
        waveWidth: 200,
        // 波浪高度，谷底到波峰的距离，单位：像素
        waveHeight: 20,
        // 波浪速度，即每帧动画平移n个像素
        waveSpeed: 5,
        // 整个球体的背景填充色
        bgColor: 'none', // eg: 'rgba(255, 255, 255, 0.1)',
        // 水填充样式，纯色或渐变填充(从下至上)
        waterColor: 'blue', // eg: waterColor: [['#08D9B0', .75]], // 渐变
        // 字体相关样式(百分比进度)
        fontSize: '70', // eg: 'auto'(自动调整大小)
        fontWeight: 'bold',
        fontFamily: 'Arial',
        fontColor: 'rgba(255, 255, 255, 0.9)'
    };

    // 验证value的值(向下取整)，有效范围：0~100
    function validateValue(value) {
        return (value = ~~value) > 100 ? 100 : value < 0 ? 0 : value;
    }

    $.fn.waterBubble = function(option) {
        // 本实例配置
        var opt = $.extend(defaultOption, option);

        // 创建画布对象
        var canvas = $('<canvas>').prependTo(this)[0];

        // 画布上下文对象
        var ctx = canvas.getContext('2d');

        // 动画id
        var animationId;

        function startAnimation() {
            // 画布大小
            canvas.width = canvas.height = opt.size;
            // 终止值
            opt.value = validateValue(opt.value);
            // 渐变过程中的value值
            var tmpValue = 0;
            // 圆心
            var c = opt.size / 2;
            // 半径
            var r = (opt.size - opt.lineWidth) / 2;
            // 截切半径
            var cr = opt.size / 2 - opt.lineWidth - opt.margin;
            // x轴取值范围
            var xMax = opt.size;
            // 波浪x偏移量
            var xOffset = 0;

            // 解析水浪填充效果
            var wc = opt.waterColor;
            if (typeof wc !== 'string') {
                // 从下到上线性渐变
                var gradient = ctx.createLinearGradient(0, opt.size, 0, 0);
                for (var i = 0; i < wc.length; i++)
                    gradient.addColorStop(wc[i][1], wc[i][0]);
                opt.waterFillStyle = gradient;
            } else {
                opt.waterFillStyle = opt.waterColor;
            }

            // 画圈函数
            function drawCircle() {
                if ((ctx.lineWidth = opt.lineWidth) > 0) {
                    ctx.beginPath();
                    ctx.strokeStyle = opt.lineColor;
                    ctx.arc(c, c, r, 0, 2 * Math.PI);
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(c, c, cr, 0, 2 * Math.PI);
                ctx.clip();
                ctx.fillStyle = opt.bgColor;
                ctx.fillRect(0, 0, opt.size, opt.size);
            }

            // 画sin曲线函数
            function drawSin(xOffset) {
                // sin曲线的起点
                var point = {},
                    x = 0,
                    y,
                    yOffset = opt.size * (1 - tmpValue / 100);

                ctx.save();
                ctx.beginPath();

                // 在整个轴长上取点
                for (; x < xMax; x += 1) {
                    // 此处坐标(x, y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
                    y = -Math.sin(x * opt.waveWidth + xOffset);
                    y = yOffset + y * opt.waveHeight;
                    if (point.x === undefined) {
                        point.x = x;
                        point.y = y;
                    }
                    ctx.lineTo(x, y);
                }

                //封闭路径
                ctx.lineTo(xMax, opt.size);
                ctx.lineTo(0, opt.size);
                ctx.lineTo(point.x, point.y);

                ctx.fillStyle = opt.waterFillStyle;
                ctx.fill();
                ctx.restore();
            }

            // 写百分比文本函数
            function drawText(){
                ctx.save();
                var fontSize = opt.fontSize == 'auto' ? 0.4 * r : opt.fontSize;
                ctx.font = fontSize + 'px ' + opt.fontFamily;
                ctx.textAlign = 'center';
                ctx.fillStyle = opt.fontColor;
                ctx.restore();
            }

            // var count = 0;
            // 绘图
            function render() {
                // console.log(count++);
                tmpValue < opt.value && tmpValue++;
                tmpValue > opt.value && tmpValue--;
                ctx.clearRect(0, 0, opt.size, opt.size);
                drawCircle();
                drawSin(xOffset += opt.waveSpeed);
                drawText();
                animationId = requestAnimationFrame(render);
            }

            render();
        }

        // 启动
        startAnimation();

        // 返回此水球对象
        return {
            // 更新水球百分比值
            setValue: function(value) {
                opt.value = validateValue(value);
            },

            // 更新水球配置项
            setOption: function(option) {
                $.extend(opt, option);
                cancelAnimationFrame(animationId);
                startAnimation();
            }
        }
    };
})(jQuery);