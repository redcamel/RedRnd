"use strict"


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// 정보맵을 생성하고..
var a = new Float32Array(256)
var i = 0, len = 256
for (i = 0; i < len; i++) {
    a[i] = Math.random()+Math.random()*256
}
// 던지기 위한 데이터 형식으로 변환
var testClamp = new Uint8ClampedArray(a.buffer)
console.log(a)
console.log(testClamp)
// 결과값을 확인해보면
var bD = new DataView(testClamp.buffer)
i=0

for(i;i<1;i++){
    console.log(bD.getFloat32(i,i+4));     
    var a,b,c,d;
    a = testClamp[0], b = testClamp[1], c = testClamp[2], d = testClamp[3]
    console.log(a,b,c,d)
    console.log(a << 24)
    console.log(b << 16)
    console.log(c << 8)
    console.log(d)
    i+=3
}

function check() {
    // 캔버스에 해당 이미지를 그린다.
    var test = ctx.createImageData(256, 256)   
    test.data.set(testClamp)
    
    ctx.putImageData(test, 0, 0);

};
check()


