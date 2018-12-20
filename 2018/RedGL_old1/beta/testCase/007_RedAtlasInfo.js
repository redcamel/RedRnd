"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
RedAtlasTextureManager(testGL, [
    '../asset/draft1.png',
    '../asset/draft2.png'
], function () {
    redSuite(
        "RedAtlasInfo Test",
        redGroup(
            "RedAtlasInfo Test",
            redTest("정의 테스트", function (unit) {
                var t0;
                t0 = true
                console.log(RedAtlasInfo(testGL, new Atlas()));
                try {
                    RedAtlasInfo(testGL, new Atlas())
                } catch (error) {
                    t0 = false
                }
                unit.run(t0)
            }, true),
            redTest("정의 테스트 :  redGL - RedGL", function (unit) {
                var t0;
                t0 = true
                try {
                    RedAtlasInfo(null, new Atlas())
                } catch (error) {
                    t0 = false
                }
                unit.run(t0)
            }, false),
            redTest("정의 테스트 : targetAtlas - Atlas", function (unit) {
                var t0;
                t0 = true
                try {
                    RedAtlasInfo(testGL, null)
                } catch (error) {
                    t0 = false
                }
                unit.run(t0)
            }, false),
            redTest("정의 테스트 : return parentAtlasInfo['textureInfo'] - RedTextureInfo", function (unit) {
                var t0;
                t0 = RedAtlasTextureManager.getByKey('../asset/draft1.png')['parentAtlasInfo']
                console.log(t0)
                unit.run(t0['textureInfo'] instanceof RedTextureInfo)
            }, true)
        )
    )
})