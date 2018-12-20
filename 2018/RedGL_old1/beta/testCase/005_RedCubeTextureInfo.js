"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
var testTexture = Recard.Dom('canvas').S('width', 512, 'height', 512).__dom__
redSuite(
    "RedCubeTextureInfo Test",
    redGroup(
        "RedCubeTextureInfo Test",
        redTest("정의 테스트", function (unit) {
            var t0;
            t0 = RedCubeTextureInfo(testGL, [
                '../asset/crate.png',
                '../asset/crate.png',
                '../asset/crate.png',
                '../asset/crate.png',
                '../asset/crate.png',
                '../asset/crate.png'
            ])
            unit.run(t0 instanceof RedCubeTextureInfo)
        }, true),
        redTest("정의 테스트 : RedGL", function (unit) {
            var t0;
            try {
                RedCubeTextureInfo('noRedGLInstance', [
                    '../asset/crate.png',
                    '../asset/crate.png',
                    '../asset/crate.png',
                    '../asset/crate.png',
                    '../asset/crate.png',
                    '../asset/crate.png'
                ])
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("정의 테스트 : srcList type - Array", function (unit) {
            var t0;
            try {
                RedCubeTextureInfo('noRedGLInstance', 'noArray')
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("정의 테스트 : srcList type - Array2", function (unit) {
            var t0;
            try {
                RedCubeTextureInfo('noRedGLInstance', new Float32Array(6))
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("정의 테스트 : src - Canvas", function (unit) {
            var t0;
            t0 = true
            try {
                RedCubeTextureInfo(testGL, [
                    testTexture,
                    testTexture,
                    testTexture,
                    testTexture,
                    testTexture,
                    testTexture
                ])
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, true),
        redTest("정의 테스트 : src - Number", function (unit) {
            var t0;
            t0 = true
            try {
                RedCubeTextureInfo(testGL, 1)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("정의 테스트 : __targetIndex (기본값)", function (unit) {
            var t0;
            var t1;
            t0 = RedCubeTextureInfo(testGL, [
                testTexture,
                testTexture,
                testTexture,
                testTexture,
                testTexture,
                testTexture
            ])
            t1 = setInterval(function () {

                if (t0['loaded']) {
                    unit.run(t0['__targetIndex'])
                    clearInterval(t1)
                }
            })
        }, RedTextureIndex.CUBE_CREATE)
    ),

)
