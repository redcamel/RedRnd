"use strict";
var k, temp
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
temp = testGL.detect
Recard.Css('button:nth-child(odd)').S('background','#272530')
Recard.Css('button:nth-child(even)').S('background','#1d1c24')
for (k in temp) {
    console.log(k, temp[k])
    Recard.Css('button').S(
            'display', 'block',
            'width', '100%',
            'height', 30,
            'padding', 5,
            'text-align', 'left',
            'outline', 'none',
            'border', 0,
            'color','#a7a4b4',
            'border-bottom', '1px solid #100f17'
    )
    Recard.Dom('button').S(
            'html', '<b>' + k + '</b>' + ' : ' + temp[k],
            '<', 'body'
    )
}