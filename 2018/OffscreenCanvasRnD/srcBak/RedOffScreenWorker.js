// 이놈을 문자열화해서 내포하고싶은데...-_- importScripts이 말썽...

var window = self; // 반드시 정의해야함
console.log(window)
var WorkerMain // 호스트 문자열을 함수로 생성
var WorkerMainInstance // 인스턴스 (실제론 RedGL 인스턴스)
var mousemove;
mousemove = function (v) {
    console.log(v)
}
onmessage = (event) => {
    console.log(event)
    switch (event.data.state) {
        case 'init':
            if (!WorkerMain) {
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
};