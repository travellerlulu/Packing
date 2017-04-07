var _List = document.getElementById("list"),
    _Prev = document.getElementById("prev"),
    _Next = document.getElementById("next"),
    _Buttons = document.getElementById("jump").children,
    _Animated = false,
    _Ind = 0,
    _Len = 4,
    _maxLen = _Len * 500;
function move(offset) {
    var left = parseInt(_List.style.left) + offset,
        time = 500,
        interval = 10,
        speed = offset / (time / interval);
    _Animated = true;
    function go() {
        if (speed > 0 && (parseInt(_List.style.left) < left) || speed < 0 && (parseInt(_List.style.left) > left)) {
            _List.style.left = parseInt(_List.style.left) + speed + "px";
            setTimeout(go, interval);
        } else {
            _List.style.left = left + "px";
            if (left < -_maxLen) {
                _List.style.left = -500 + "px";
            }
            if (left > -200) {
                _List.style.left = -_maxLen + "px";
            }
            _Animated = false;
        }
    }

    go();
    showButton(_Buttons);

}
_Prev.addEventListener("click", function () {
    if (_Animated) {
        return;
    }
    _Ind = _Ind <= 0 ? 3 : _Ind - 1;
    move(500);
}, false);
_Next.addEventListener("click", function () {
    if (_Animated) {
        return;
    }
    _Ind = _Ind >= 3 ? 0 : _Ind + 1;
    move(-500);
}, false);
for (var j = 0; j < _Buttons.length; j++) {
    _Buttons[j].addEventListener("click", function () {
        if (_Animated) {
            return;
        }
        if (this.className === "on") {
            return;
        }
        var curIndex = parseInt(this.getAttribute("index"));
        var offset = -500 * (curIndex - _Ind);
        _Ind = curIndex;
        move(offset);
    }, false);
}

//移除类名
function showButton(arr) {
    var len = arr.length, k = 0;
    for (; k < len; k++) {
        if (arr[k].className !== "") {
            arr[k].className = "";
            break;
        }
    }
    arr[_Ind].className = "on";
}
