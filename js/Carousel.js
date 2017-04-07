(function () {
    //主体
    function Carousel(option) {
        this._Index = 0;
        this._List = typeof option.list === "object" ? option.list : document.getElementById(option.list);
        this._Buttons = typeof option.buttons === "object" ? option.buttons : document.getElementById(option.buttons);
        this._Prev = typeof option.prev === "object" ? option.prev : document.getElementById(option.prev);
        this._Next = typeof option.next === "object" ? option.next : document.getElementById(option.next);
        this.curClassName = option.curClassName;
        this.width = option.width;
        this._Len = option.len;
        this.maxLen = option.len * option.width;
        this.btnsLen = this._Buttons.length;
        this._Animated = false;
        this.init();
    }

    Carousel.prototype = {
        constructor: Carousel,
        init: function () {
            this.setCarousel();
        },
        move: function (offset) {
            var left = parseInt(this._List.style.left) + offset,
                time = 500,
                interval = 50,
                speed = offset / (time / interval),
                self = this;
            this._Animated = true;
            function go() {
                if (speed < 0 && (parseInt(self._List.style.left) > left ) || speed > 0 && (parseInt(self._List.style.left) < left)) {
                    self._List.style.left = parseInt(self._List.style.left) + speed + "px";
                    setTimeout(go, interval);
                } else {
                    self._List.style.left = left + "px";
                    if (left < -self.maxLen) {
                        self._List.style.left = -self.width + "px";
                    }
                    if (left > -200) {
                        self._List.style.left = -self.maxLen + "px";
                    }
                    self._Animated = false;
                }
            }

            go();
            this.showButtons();
        },
        showButtons: function () {
            var k = 0;
            for (; k < this.btnsLen; k++) {
                if (this._Buttons[k].className !== "") {
                    this._Buttons[k].className = "";
                }
            }
            this._Buttons[this._Index].className = this.curClassName;
        },
        setCarousel: function () {
            var self = this;
            this._Prev.addEventListener("click", function () {
                if (self._Animated) {
                    return;
                }
                self._Index = self._Index <= 0 ? self._Len - 1 : self._Index - 1;
                self.move(self.width);
            }, false);
            this._Next.addEventListener("click", function () {
                if (self._Animated) {
                    return;
                }
                self._Index = self._Index >= self._Len - 1 ? 0 : self._Index + 1;
                self.move(-self.width);
            }, false);
            for (var j = 0; j < this.btnsLen; j++) {
                this._Buttons[j].addEventListener("click", function () {
                    if (self._Animated) {
                        return;
                    }
                    if (this.className === "on") {
                        return;
                    }
                    var curIndex = parseInt(this.getAttribute("index"));
                    var offset = -500 * (curIndex - self._Index);
                    self._Index = curIndex;
                    self.move(offset);
                }, false);
            }
        }
    }
    //暴露接口
    window.Carousel = Carousel;
})();
