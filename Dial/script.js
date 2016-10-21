(function () {
    var Dial, dial, bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        };
    Dial = function () {
        Dial.prototype.raf = null;
        Dial.prototype.mdown = false;
        Dial.prototype.mPos = {
            x: 0,
            y: 0
        };
        Dial.prototype.elementPosition = {
            x: 0,
            y: 0
        };
        Dial.prototype.target = 0;
        Dial.prototype.steps = 60;
        Dial.prototype.radius = 150;
        Dial.prototype.maxDiff = 150;
        Dial.prototype.constraint = 360;
        Dial.prototype.currentVal = 0;
        function Dial($context) {
            var knobOffset;
            this.$context = $context;
            this.onMouseMove = bind(this.onMouseMove, this);
            this.onMouseUp = bind(this.onMouseUp, this);
            this.onMouseDown = bind(this.onMouseDown, this);
            this.$knob = this.$context.find('.knob');
            this.$handle = this.$context.find('.handle');
            this.$progress = this.$context.find('.progress');
            this.$center = this.$context.find('.center');
            this.$textOutput = this.$center.find('span');
            this.ctx = this.$progress.get(0).getContext('2d');
            knobOffset = this.$knob.offset();
            this.elementPosition = {
                x: knobOffset.left,
                y: knobOffset.top
            };
            this.centerX = this.$progress.width() / 2;
            this.centerY = this.$progress.height() / 2;
            this.canvasSize = this.$progress.width();
            this.addEventListeners();
            this.draw();
            return;
        }
        Dial.prototype.addEventListeners = function () {
            this.$context.on('mousedown', this.onMouseDown);
            this.$context.on('mousemove', this.onMouseMove);
            $('body').on('mouseup', this.onMouseUp);
        };
        Dial.prototype.setDialPosition = function () {
            this.$knob.css({ transform: 'rotate(' + this.target + 'deg)' });
            this.$handle.css({ transform: 'rotate(-' + this.target + 'deg)' });
            this.draw();
        };
        Dial.prototype.draw = function () {
            var i, j, ref;
            this.$progress.get(0).height = this.canvasSize;
            this.$progress.get(0).width = this.canvasSize;
            this.ctx.save();
            this.ctx.translate(this.centerX, this.centerY);
            this.ctx.rotate(-90 * (Math.PI / 180) - Math.PI * 2 / this.steps);
            for (i = j = 0, ref = this.steps - 1; j <= ref; i = j += 1) {
                if (window.CP.shouldStopExecution(1)) {
                    break;
                }
                this.ctx.beginPath();
                this.ctx.rotate(Math.PI * 2 / this.steps);
                this.ctx.lineWidth = 2;
                this.ctx.lineTo(160, 0);
                this.ctx.lineTo(170, 0);
                if (i <= Math.floor(this.currentVal)) {
                    this.ctx.shadowBlur = 10;
                    this.ctx.strokeStyle = '#fff';
                    this.ctx.shadowColor = '#fff';
                    if (i > this.steps * 0.75 && this.currentVal > this.steps * 0.75) {
                        this.ctx.strokeStyle = '#ff9306';
                        this.ctx.shadowColor = '#ff9306';
                    }
                    if (i > this.steps * 0.88 && this.currentVal > this.steps * 0.88) {
                        this.ctx.strokeStyle = '#ff0606';
                        this.ctx.shadowColor = '#ff0606';
                    }
                } else {
                    this.ctx.strokeStyle = '#444';
                    this.ctx.shadowBlur = 0;
                    this.ctx.shadowColor = '#fff';
                }
                this.ctx.stroke();
            }
            window.CP.exitedLoop(1);
            this.ctx.restore();
        };
        Dial.prototype.setMousePosition = function (event) {
            var atan, diff, target;
            this.mPos = {
                x: event.pageX - this.elementPosition.x,
                y: event.pageY - this.elementPosition.y
            };
            atan = Math.atan2(this.mPos.x - this.radius, this.mPos.y - this.radius);
            target = -atan / (Math.PI / 180) + 180;
            diff = Math.abs(target - this.target);
            if (diff < this.maxDiff && target < this.constraint) {
                this.target = target;
                this.currentVal = this.map(this.target, 0, 360, 0, this.steps);
                this.setDialPosition();
                this.updateOutput();
            }
        };
        Dial.prototype.updateOutput = function () {
            this.$textOutput.text(Math.round(this.currentVal));
        };
        Dial.prototype.onMouseDown = function (event) {
            this.mdown = true;
        };
        Dial.prototype.onMouseUp = function (event) {
            this.mdown = false;
        };
        Dial.prototype.onMouseMove = function (event) {
            if (this.mdown) {
                this.setMousePosition(event);
            }
        };
        Dial.prototype.map = function (value, low1, high1, low2, high2) {
            return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
        };
        return Dial;
    }();
    this.$dial = $('.dial');
    dial = new Dial(this.$dial);
}.call(this));