var startX = 0, startY = 0, sourceX = 0, sourceY = 0;
var transform = getTransform();
var _Target = document.getElementById("box");

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
function getStyle(elem, property) {
    return getComputedStyle ? getComputedStyle(elem).getPropertyValue(property) : elem.getCurrentStyle(property);
}
function getTargetPos(elem) {
    var pos = {
        x: 0,
        y: 0
    };
    if(transform) {
        var transVal = getStyle(_Target, transform);
        if(transVal === "none") {
            elem.style[transform] = "translate(0,0)";
        } else {
            var tmp = getStyle(_Target, transform).match(/-?\d+/g);
            pos = {
                x: parseInt(tmp[4].trim()),
                y: parseInt(tmp[5].trim())
            }
        }
    } else {
        if(getStyle(_Target, "position") === "static") {
            elem.style.position = "relative";
        } else {
            var x = parseInt(getStyle(_Target, "left") ? getStyle(_Target, "left") : "0");
            var y = parseInt(getStyle(_Target, "top") ? getStyle(_Target, "top") : "0");
            pos = {
                x: x,
                y: y
            }
        }
    }
    return pos;
}

function setTargetPos(elem, pos) {
    if(transform) {
        elem.style[transform] = "translate(" + pos.x + "px," + pos.y + "px)";
    } else {
        elem.style.left = pos.x + "px";
        elem.style.top = pos.y + "px";
    }
}

_Target.addEventListener("mousedown", start, false);
function start() {
    startX = event.clientX;
    startY = event.clientY;
    var pos = getTargetPos(_Target);
    sourceX = pos.x;
    sourceY = pos.y;
    document.addEventListener("mousemove", move, false);
    document.addEventListener("mouseup", end, false);
}

function move() {
    var disX = event.clientX - startX;
    var disY = event.clientY - startY;
    var pos = {
        x: disX + sourceX,
        y: disY + sourceY
    }
    setTargetPos(_Target, pos);
}

function end() {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", end);
}