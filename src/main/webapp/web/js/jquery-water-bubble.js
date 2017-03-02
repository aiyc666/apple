;(function($) {
    // 默认配置
    var defaultOption = {
        // 百分比进度值，范围0 ~ 100
        value: 50,
        // 球体大小
        size: 225,
        // 球壁线条宽度，为0则不显示球壁
        lineWidth: 0,
        // 线条颜色
        lineColor: 'blue',
        // 水与球壁间隔
        margin: 0,
        // 波浪宽度，即正弦曲线一个周期的宽度，单位：像素
        waveWidth: 200,
        // 波浪高度，曲线谷底到波峰间的距离，单位：像素
        waveHeight: 20,
        // 波浪移动速度，即每帧动画平移的距离，单位：像素
        waveSpeed: 5,
        // 整个球体的背景填充色
        bgColor: 'none', // eg: 'rgba(255, 255, 255, 0.1)',
        // 水样式，纯色或渐变填充(从下至上渐变)
        waterColor: 'blue', // eg: waterColor: [['#08D9B0', .75]], // 渐变
        // 是否显示：百分比进度
        showPercent: true,
        // 字体颜色
        fontColor: 'rgba(255, 255, 255, 0.9)',
        // 字体样式类名，可在外部自定义字体样式
        fontClassName: 'water-bubble-percent'
    };

    // 验证value的值(四舍五入后取整)，有效范围：0~100
    function validateValue(value) {
        return (value = ~~(value + .5)) > 100 ? 100 : value < 0 ? 0 : value;
    }

    // 解析水的填充效果
    function parseWaterStyle(ctx, waterStyle, size) {
        if (typeof waterStyle !== 'string') {
            // 从下到上线性渐变
            var gradient = ctx.createLinearGradient(0, size, 0, 0);
            for (var i = 0; i < waterStyle.length; i++) {
                gradient.addColorStop(waterStyle[i][1], waterStyle[i][0]);
            }
            return gradient;
        }
        return waterStyle;
    }

    $.fn.waterBubble = function(option) {
        // 自定义配置
        var opt = $.extend(defaultOption, option);

        // 创建DOM元素。。。

        // 创建画布
        var canvas = $('<canvas>').prependTo(this)[0];

        // 创建缓冲区画布
        var canvasBuffer = $('<canvas>')[0];

        // 动画id
        var frameId;

        function draw() {
            var size = opt.size,
                lineWidth = opt.lineWidth,
                c = size / 2,   // 圆心
                r = (size - lineWidth) / 2, // 半径
                cr = size / 2 - lineWidth - opt.margin, // 截切半径
                xOffset = 0,        // 波浪x偏移量
                interimValue = 0,   // 渐变过程中的value值
                waveW = opt.waveWidth,
                waveH = opt.waveHeight,
                bufferWidth = size + waveW;    // 缓冲区画布的宽度

            // 画布上下文对象
            var ctx = canvas.getContext('2d'),
                ctxBuf = canvasBuffer.getContext('2d');

            // 画布大小
            canvas.width = canvas.height = canvasBuffer.height = size;
            canvasBuffer.width = bufferWidth;
            // 百分比值
            opt.value = validateValue(opt.value);
            // 解析水浪填充样式
            opt.waterStyle = parseWaterStyle(ctxBuf, opt.waterColor, size);

            // 画正弦波浪函数
            function drawWave(xOffset) {
                var x = 0, y,
                    yOffset = size - (size * interimValue / 100) - (waveH / 2);
                // 百分比进度数值为0则不绘制
                if (interimValue != 0) {
                    ctxBuf.beginPath();
                    ctxBuf.moveTo(0, yOffset);
                    // 根据波浪宽高的定义，在相应百分比进度yOffset处，绘制正弦曲线
                    for (; x < bufferWidth; x++) {
                        y = Math.sin((x - xOffset) * 2 * Math.PI / waveW) * waveH / 2 + yOffset;
                        ctxBuf.lineTo(x, y);
                    }
                    ctxBuf.lineTo(bufferWidth, size);
                    ctxBuf.lineTo(0, size);
                    ctxBuf.fillStyle = opt.waterStyle;
                    ctxBuf.fill();
                }
            }

            // 绘制缓冲区
            function renderCanvasBuffer() {
                ctxBuf.clearRect(0, 0, bufferWidth, size);
                // 背景色
                if (opt.bgColor != 'none') {
                    ctxBuf.fillStyle = opt.bgColor;
                    ctxBuf.beginPath();
                    ctxBuf.rect(0, 0, bufferWidth, size);
                    ctxBuf.fill();
                }
                // 背景波浪，透明度.8
                ctxBuf.globalAlpha = .8;
                drawWave(0);
                // 前景波浪
                ctxBuf.globalAlpha = 1;
                drawWave(waveW / 2);
            }

            // 圆形区域截切
            function clipCanvas() {
                if (lineWidth > 0) {
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = opt.lineColor;
                    ctx.beginPath();
                    ctx.arc(c, c, r, 0, Math.PI * 2);
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(c, c, cr, 0, Math.PI * 2);
                ctx.clip();
            }

            // 绘制画布
            function paintCanvas() {

            }

            // 更新百分比进度
            function updatePercent() {

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



            // 写百分比文本函数
            function drawText(){
                ctx.save();
                var fontSize = opt.fontSize == 'auto' ? 0.3 * r : opt.fontSize;
                ctx.font = fontSize + 'px ' + opt.fontFamily;
                ctx.textAlign = 'center';
                ctx.fillStyle = opt.fontColor;
                ctx.restore();
            }

            // 开始动画绘制
            function painting() {
                if (interimValue != opt.value) {
                    interimValue < opt.value && interimValue++;
                    interimValue > opt.value && interimValue--;
                    renderCanvasBuffer();
                }

                ctx.clearRect(0, 0, size, size);
                drawCircle();
                drawSin(xOffset += opt.waveSpeed);
                drawText();
                frameId = requestAnimationFrame(painting);
            }

            painting();
        }

        // 开始绘制
        draw();

        // 返回此水球对象
        return {
            // 设置水球百分比值
            setValue: function(value) {
                opt.value = validateValue(value);
            },

            // 更新水球配置选项
            setOption: function(option) {
                $.extend(opt, option);
                cancelAnimationFrame(frameId);
                draw();
            }
        }
    };
})(jQuery);