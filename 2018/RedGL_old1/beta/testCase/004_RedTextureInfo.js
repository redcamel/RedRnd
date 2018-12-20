"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
var testTexture = Recard.Dom('canvas').S('width', 512, 'height', 512).__dom__
redSuite(
    "RedTextureInfo Test",
    redGroup(
        "RedTextureInfo Test",
        redTest("정의 테스트", function (unit) {
            var t0;
            t0 = RedTextureInfo(testGL, '../asset/crate.png')
            unit.run(t0 instanceof RedTextureInfo)
        }, true),
        redTest("정의 테스트 : RedGL", function (unit) {
            var t0;
            try {
                RedTextureInfo('test', '../asset/crate.png')
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("정의 테스트 : src - Canvas", function (unit) {
            var t0;
            t0 = true
            try {
                RedTextureInfo(testGL, testTexture)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, true),
        redTest("정의 테스트 : src - Number", function (unit) {
            var t0;
            t0 = true
            try {
                RedTextureInfo(testGL, 1)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("정의 테스트 : __targetIndex (기본값)", function (unit) {
            var t0;
            var t1;
            t0 = RedTextureInfo(testGL, '../asset/crate.png')
            t1 = setInterval(function () {
                if (t0['loaded']) {
                    unit.run(t0['__targetIndex'])
                    clearInterval(t1)
                }
            })
        }, RedTextureIndex.DIFFUSE),
        redTest("정의 테스트 : __targetIndex (정의값)", function (unit) {
            var t0;
            var t1;
            t0 = RedTextureInfo(testGL, '../asset/crate.png', RedTextureIndex.NORMAL)
            t1 = setInterval(function () {
                if (t0['loaded']) {
                    unit.run(t0['__targetIndex'])
                    clearInterval(t1)
                }
            })
        }, RedTextureIndex.NORMAL),
        redTest("정의 테스트 : __targetIndex (정의값)", function (unit) {
            var t0;
            var t1;
            t0 = RedTextureInfo(testGL, testTexture, RedTextureIndex.NORMAL)
            t1 = setInterval(function () {
                if (t0['loaded']) {
                    unit.run(t0['__targetIndex'])
                    clearInterval(t1)
                }
            })
        }, RedTextureIndex.NORMAL),
        redTest("정의 테스트 : updateTexture", function (unit) {
            var t0;
            var t1;
            t0 = RedTextureInfo(testGL, '../asset/crate.png', RedTextureIndex.NORMAL)
            t1 = setInterval(function () {
                if (t0['loaded']) {
                    clearInterval(t1)
                    t0.updateTexture('../asset/draft1.png')
                    t1 = setInterval(function () {
                        if (t0['loaded']) {
                            clearInterval(t1)
                            // console.log(t0['__img'])
                            unit.run(t0['__img'].src.indexOf('draft1.png') > -1)
                        }
                    })
                }
            })
        }, true)
    )
)
