var  Test = function(canvas){

//////////////////////////////////////////
    const offscreenCanvas = canvas.transferControlToOffscreen();
    const offscreenDocument = document.transferControlToOffscreen();

// Workerを作成し、OffscreenCanvasを渡す
    const worker = new Worker('worker.js');
    var state = 'init'
    worker.postMessage({canvas: offscreenCanvas, type: state}, [offscreenCanvas]);

    worker.onmessage = function (e) {
        console.log(e)
        state = e.data.state
        worker.postMessage({type: state});
    }
}