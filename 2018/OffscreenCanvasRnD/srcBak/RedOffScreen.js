var RedOffScreen;
RedOffScreen = function (canvas, w, h, redGLSrc, workerSrc, hostSrc) {
    var self = this;
    self['htmlCanvas'] = canvas
    self['workerSrc'] = workerSrc
    self['redGLSrc'] = redGLSrc;
    fetch(hostSrc)
        .then(function (v) {
            // console.log('성공', v)
            v.text().then(function (v2) {
                self['hostCode'] = '' +
                    "\ncanvas.tagName = 'CANVAS';" +
                    "\nreturn RedGL(canvas, function (v) {\n" +
                    'var _host_ = ' + v2 + ';\n' +
                    '_host_.call(this);\n' +
                    "\n});"
                self.setSize(w, h)
            })
        })
        .catch(function (v) {
            console.log('실패', v)
        })

}
RedOffScreen.prototype['updatePostMessage'] = function (run) {
    if (!run) throw 'RedOffScreen.prototype[\'updatePostMessage\'] - run을 정의해야합니다.' + run
    if (!run['name']) throw 'RedOffScreen.prototype[\'updatePostMessage\'] - run객체의 name을 정의해야합니다.' + run['name']
    this['worker'].postMessage({
        state: 'update',
        run: run
    });
}
// 이놈을 문자열화해서 내포하고싶은데...-_- importScripts이 말썽...
var test = `
    var window = self; // 반드시 정의해야함
    console.log(window)
    var WorkerMain // 호스트 문자열을 함수로 생성
    var WorkerMainInstance // 인스턴스 (실제론 RedGL 인스턴스)

    onmessage = (event) => {
        console.log('~~~~~~~~',event)
        switch (event.data.state) {
            case 'init':
                if (!WorkerMain) {
                    console.log(event.data.redGLSrc)
                    importScripts(event.data.redGLSrc)
                    WorkerMain = new Function('canvas', event.data.hostCode);
                }
                console.log(WorkerMain)
                WorkerMainInstance = new WorkerMain(event.data.canvas)
                break;
            case 'update':
                console.log('여기로오겠지', WorkerMainInstance)
                console.log(event.data.run)
                // RedGLInstance내에 userInterface를 정의하고 이에 접근함
                var tArg = event.data.run['args']
                WorkerMainInstance.userInterface[event.data.run['name']][typeof tArg == 'array' ? 'apply' : 'call'](WorkerMainInstance, event.data.run['args'])
                break;
            case 'mousemove':
                var evt = new Event('mousemove')
                var e = event.data.event
                for (var k in e) {
                    evt[k] = e[k]
                }
                console.log(evt)
                WorkerMainInstance['_canvas'].dispatchEvent(evt)
                // mousemove(event.data.event)
                break
            case 'mousedown':
                var evt = new Event('mousedown')
                var e = event.data.event
                for (var k in e) {
                    evt[k] = e[k]
                }
                console.log(evt)
                WorkerMainInstance['_canvas'].dispatchEvent(evt)
                // mousemove(event.data.event)
                break
            case 'mouseup':
                var evt = new Event('mouseup')
                var e = event.data.event
                for (var k in e) {
                    evt[k] = e[k]
                }
                console.log(evt)
                self.dispatchEvent(evt)
                // mousemove(event.data.event)
                break
            case 'wheel':
                var evt = new Event('wheel')
                var e = event.data.event
                for (var k in e) {
                    evt[k] = e[k]
                }
                console.log(evt)
                WorkerMainInstance['_canvas'].dispatchEvent(evt)
                break
            case 'keydown':
                var evt = new Event('keydown')
                var e = event.data.event
                for (var k in e) {
                    evt[k] = e[k]
                }
                console.log(evt)
                self.dispatchEvent(evt)
                break
            case 'keyup':
                var evt = new Event('keyup')
                var e = event.data.event
                for (var k in e) {
                    evt[k] = e[k]
                }
                console.log(evt)
                self.dispatchEvent(evt)
                break
            case 'keypress':
                var evt = new Event('keypress')
                var e = event.data.event
                for (var k in e) {
                    evt[k] = e[k]
                }
                console.log(evt.type)
                self.dispatchEvent(evt)
                break
            default:
                break;
        }
    }
`;
test = new Blob([test.trim()], {type: 'application/javascript'})
console.log(test)
RedOffScreen.prototype._init = function (canvas, w, h) {
    var self = this;
    if (this['worker']) this['worker'].terminate()
    console.log(canvas.cloneNode())
    var tParentNode = this['htmlCanvas'].parentNode
    console.log(tParentNode)
    var newNode = canvas.cloneNode(true)
    tParentNode.replaceChild(newNode, this['htmlCanvas'])
    this['htmlCanvas'] = newNode
    var MOUSE_KEY_LIST = 'x,y,clientX,clientY,pageX,pageY,screenX,screenY,layerX,layerY,detail,shiftKey,altKey,ctrlKey,movementX,movementY,button,type,which,deltaX,deltaY,deltaZ,timeStamp'.split(',')
    var KEY_LIST = 'shiftKey,altKey,ctrlKey,key,keyCode,location,code,charCode,detail,timeStamp,which,type'.split(',')
    var mouseEventList = 'mousemove,mousedown,mouseup,wheel'.split(',');
    var keyEvnetList = 'keydown,keyup,keypress'.split(',');
    mouseEventList.forEach(function (v) {
        self['htmlCanvas'].addEventListener(v, function (e) {
            console.log(e)
            var customEvent = {}
            MOUSE_KEY_LIST.forEach(function (v) {
                customEvent[v] = e[v]
            })
            self['worker'].postMessage({
                state: e.type,
                event: customEvent
            });
        })
    });
    keyEvnetList.forEach(function (v) {
        window.addEventListener(v, function (e) {
            console.log(e)
            var customEvent = {}
            KEY_LIST.forEach(function (v) {
                customEvent[v] = e[v]
            })
            self['worker'].postMessage({
                state: e.type,
                event: customEvent
            });
        })
    });

    this['offScreenCanvas'] = this['htmlCanvas'].transferControlToOffscreen();
    this['offScreenCanvas'].width = w
    this['offScreenCanvas'].height = h
    //
    this['worker'] = null
    this['worker'] = new Worker(URL.createObjectURL(test));
    console.log(this['worker'])

    var url = document.location.pathname.split('/')
    if (url[url.length - 1].indexOf('.') > -1) url.pop()
    url = document.location.origin + url.join('/') + '/'
    this['worker'].postMessage({
        canvas: this['offScreenCanvas'],
        state: 'init',
        localURL: document.location.host,
        redGLSrc: url + this['redGLSrc'],
        hostCode: this['hostCode'].toString()
    }, [this['offScreenCanvas']]);
}

RedOffScreen.prototype['setSize'] = (function () {
    var W, H;
    var prevW, prevH;
    var ratio;
    var tCVS;
    prevW = 0, prevH = 0;
    return function (width, height, force) {
        if (width == undefined) RedGLUtil.throwFunc('RedGL setSize : width가 입력되지 않았습니다.');
        if (height == undefined) RedGLUtil.throwFunc('RedGL setSize : height가 입력되지 않았습니다.');
        W = this['_width'] = width;
        H = this['_height'] = height;
        if (typeof W != 'number') {
            if (W.indexOf('%') > -1) W = (document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth) * parseFloat(W) / 100;
            else RedGLUtil.throwFunc('RedGL setSize : width는 0이상의 숫자나 %만 허용.', W);
        }
        if (typeof H != 'number') {
            if (H.indexOf('%') > -1) H = window.innerHeight * parseFloat(H) / 100;
            else RedGLUtil.throwFunc('RedGL setSize : height는 0이상의 숫자나 %만 허용.', H);
        }
        ratio = window['devicePixelRatio'] || 1;
        tCVS = this['_canvas'];
        if (prevW != W || prevH != H || force) {
            prevW = W;
            prevH = H;
        }
        this._init(this['htmlCanvas'], W * ratio, H * ratio)
    }
})()
