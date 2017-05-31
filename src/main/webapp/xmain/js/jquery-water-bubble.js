;(function($) {
    // 默认配置
    var defaultOption = {
        // 百分比进度值，范围0 ~ 100
        value: 60,
        // 球体大小
        size: 200,
        // 球壁线条宽度，为0则不显示球壁
        lineWidth: 0,
        // 线条颜色
        lineColor: 'blue',
        // 水与球壁间隔
        margin: 5,
        // 波浪宽度，即正弦曲线一个周期的宽度，单位：像素
        waveWidth: 450,
        // 波浪高度，曲线谷底到波峰间的距离，单位：像素
        waveHeight: 20,
        // 波浪移动速度，即每帧动画平移的距离，单位：像素
        waveSpeed: 6,
        // 整个球体的背景填充色
        bgColor: 'rgba(1, 119, 157, 0.6)',
        // 水样式，可以为纯色、或渐变填充(从下至上渐变)
        waterColor: [ ['#9304FE', .05], ['#04BBFF', .75] ], // eg: 'blue'
        // 是否显示：百分比进度
        showPercent: true,
        // 字体颜色
        percentFontColor: 'rgba(255, 255, 255, 0.9)',
        // 字体样式类名，可在外部自定义字体样式
        percentClassName: 'water-bubble-percent',
        // 水球图片
        bubbleImage: '../img/ball.png',
        bubbleImageClassName: 'water-bubble-image'
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
        // 自定义配置项
        var opt = $.extend(defaultOption, option),
            frameId; // 动画帧id

        // 创建DOM元素
        var $container = $('<div>').css({position: 'relative', boxSizing: 'border-box', borderRadius: '100%', overflow: 'hidden'}),
            $bubbleImg = $('<div>').addClass(opt.bubbleImageClassName).css({position: 'absolute', width: '100%', height: '100%'}),
            $percentContainer = $('<div>').css({position: 'absolute', width: '100%', height: '100%', textAlign: 'center', fontFamily: 'arial'}),
            $percent = $('<span>').addClass(opt.percentClassName).css({marginLeft: .333 + 'em'}),
            $unit = $('<span>%</span>'),
            $canvas = $('<canvas>').css({position: 'absolute', borderRadius: '100%'}),
            canvas = $canvas[0],
            canvasBuffer = $('<canvas>')[0];

        // 插入文档树
        $container.append($canvas).append($bubbleImg).append($percentContainer.append($percent).append($unit)).prependTo(this);


        function draw() {
            var size = opt.size,
                lineWidth = opt.lineWidth,
                margin = opt.margin,
                waveW = opt.waveWidth,
                waveH = opt.waveHeight,
                speed = opt.waveSpeed,
                // 当前动画帧的波浪x偏移量
                xOffset = 0,
                // 渐变过程中的value值
                interimValue = 0,
                // 画布大小
                canvasSize = size - 2 * (lineWidth + margin),
                // 缓冲区画布的宽度
                bufferWidth = canvasSize + waveW,
                // 画布上下文对象
                ctx = canvas.getContext('2d'),
                ctxBuf = canvasBuffer.getContext('2d');

            // 元素样式
            $container.css({border: lineWidth + 'px solid ' + opt.lineColor, width: size + 'px', height: size + 'px'});
            $bubbleImg.css({background: opt.bubbleImage ? ('url(' + opt.bubbleImage + ') no-repeat 0 0/' + size + 'px ' + size + 'px') : 'none'});
            $percentContainer.css({color: opt.percentFontColor, lineHeight: (size - 2 * lineWidth) + 'px'})[opt.showPercent ? 'show' : 'hide']();
            $percent.css({fontSize: (.31 * canvasSize) + 'px'});
            $unit.css({fontSize: (.1 * canvasSize) + 'px'});
            $canvas.css({margin: margin + 'px', width: canvasSize + 'px', height: canvasSize + 'px'});

            // 画布大小
            canvas.width = canvas.height = canvasBuffer.height = size = canvasSize;
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
            function drawCanvasBuffer() {
                ctxBuf.clearRect(0, 0, bufferWidth, size);
                // 背景色
                if (opt.bgColor != 'none') {
                    ctxBuf.fillStyle = opt.bgColor;
                    ctxBuf.beginPath();
                    ctxBuf.rect(0, 0, bufferWidth, size);
                    ctxBuf.fill();
                }
                // 背景波浪，透明度.6
                ctxBuf.globalAlpha = .6;
                drawWave(0);
                // 前景波浪
                ctxBuf.globalAlpha = 1;
                drawWave(waveW / 3);
            }

            // 绘制可见画布
            function drawCanvas() {
                ctx.drawImage(canvasBuffer, (waveW - xOffset), 0, size, size, 0, 0, size, size);
            }

            // 更新百分比进度
            function updatePercent() {
                $percent.text(interimValue);
            }

            // 动画绘制
            function startPainting() {
                // 百分比渐变效果
                if (interimValue != opt.value) {
                    interimValue < opt.value && interimValue++;
                    interimValue > opt.value && interimValue--;
                    drawCanvasBuffer();
                    updatePercent();
                }
                // 计算当前动画帧xOffset偏移
                (xOffset += speed) > waveW && (xOffset -= waveW);
                ctx.clearRect(0, 0, size, size);
                drawCanvas();
                frameId = requestAnimationFrame(startPainting);
            }

            // 开始绘制
            drawCanvasBuffer();
            drawCanvas();
            startPainting();
        }

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