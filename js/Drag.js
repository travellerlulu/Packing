"use strict";

;(function () {
    //私有属性
    var transform = getTransform();

    function Drag(selector) {
        this.elem = typeof selector === "object" ? selector : document.getElementById(selector);
        this.startX = 0;
        this.startY = 0;
        this.sourceX = 0;
        this.sourceY = 0;
        this.init();
    }

    Drag.prototype = {
        constructor: Drag,
        init: function () {
            this.setDrag();
        },
        //获取对应属性的属性值
        getStyle: function (property) {
            return getComputedStyle ? getComputedStyle(this.elem).getPropertyValue(property) : this.elem.getCurrentStyle(property);
        },
        //获取位置
        getPosition: function () {
            var pos = {
                x: 0,
                y: 0
            };
            if (transform) {
                var transVal = this.getStyle(transform);
                if (transVal === "none") {
                    this.elem.style[transform] = "translate(0,0)";
                } else {
                    var tmp = this.getStyle(transform).match(/-?\d+/g);
                    pos = {
                        x: parseInt(tmp[4].trim()),
                        y: parseInt(tmp[5].trim())
                    }
                }
            } else {
                if (this.getStyle("position") === "static") {
                    this.elem.style.position = "relative";
                } else {
                    var x = parseInt(this.getStyle("left") ? this.getStyle("left") : "0");
                    var y = parseInt(this.getStyle("top") ? this.getStyle("top") : "0");
                    pos = {
                        x: x,
                        y: y
                    }
                }
            }
            return pos;
        },
        //设置位置
        setPosition: function (pos) {
            if (transform) {
                this.elem.style[transform] = "translate(" + pos.x + "px," + pos.y + "px)";
            } else {
                this.elem.style.left = pos.x + "px";
                this.elem.style.top = pos.y + "px";
            }
        },
        //初始化，绑定事件
        setDrag: function () {
            var self = this;
            this.elem.addEventListener("mousedown", start, false);
            function start() {
                self.startX = event.clientX;
                self.startY = event.clientY;
                var pos = self.getPosition();
                self.sourceX = pos.x;
                self.sourceY = pos.y;
                document.addEventListener("mousemove", move, false);
                document.addEventListener("mouseup", end, false);
            }

            function move() {
                var disX = event.clientX - self.startX;
                var disY = event.clientY - self.startY;
                var pos = {
                    x: disX + self.sourceX,
                    y: disY + self.sourceY
                }
                self.setPosition(pos);
            }

            function end() {
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", end);
            }
        }
    }
    //私有方法，检测transform兼容性
    function getTransform() {
        var transArr = ["transform", "webkitTransform", "MozTransform", "msTransform", "OTransform"],
            len = transArr.length,
            div = document.createElement("div"),
            divStyle = div.style,
            transform = "";
        for (var i = 0; i < len; i++) {
            if (transArr[i] in divStyle) {
                return transform = transArr[i];
            }
        }
        return transform;
    }

    window.Drag = Drag;
})();
/*jQuery 扩展插件
 (function($) {
    $.fn.extend({
        myDrag: function() {
            new Drag(this[0]);
            return this; //为了实现jquery链式调用，每个方法的最后都会返回this即jquery实例
        }
    })
 })(jQuery);
 * */