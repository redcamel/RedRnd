"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
redSuite(
    "RedAtlasTextureManager Test",
    redGroup(
        "RedAtlasTextureManager Test",
        redTest("정의 테스트 : srcList - Array", function (unit) {
            RedAtlasTextureManager(testGL, [
                '../asset/draft1.png'
            ], function (list) {
                unit.run(list[0])
            })
        }, '../asset/draft1.png'),
        redTest("정의 테스트 : srcList - String", function (unit) {
            RedAtlasTextureManager(testGL, '../asset/draft1.png', function (list) {
                unit.run(list[0])
            })
        }, '../asset/draft1.png'),
        redTest("정의 테스트 : srcList", function (unit) {
            var t0;
            try {
                RedAtlasTextureManager(testGL, 1)
            } catch (error) {
                t0 = false
            }
            unit.run(t0)
        }, false),
        redTest("getByKey : return RedAtlasTextureInfo instance", function (unit) {
            RedAtlasTextureManager(testGL, [
                '../asset/draft1.png'
            ], function (list) {
                console.log(RedAtlasTextureManager.getByKey('../asset/draft1.png'))
                unit.run(RedAtlasTextureManager.getByKey('../asset/draft1.png') instanceof RedAtlasTextureInfo)
            })
        }, true),
        redTest("getByKey().atlasUVInfo : return RedAtlasUVInfo instance", function (unit) {
            RedAtlasTextureManager(testGL, [
                '../asset/draft1.png'
            ], function (list) {
                console.log(RedAtlasTextureManager.getByKey('../asset/draft1.png'))
                unit.run(RedAtlasTextureManager.getByKey('../asset/draft1.png')['atlasUVInfo'] instanceof RedAtlasUVInfo)
            })
        }, true),
        redTest("getByKey().parentAtlasInfo : return RedAtlasInfo instance", function (unit) {
            RedAtlasTextureManager(testGL, [
                '../asset/draft1.png'
            ], function (list) {
                console.log(RedAtlasTextureManager.getByKey('../asset/draft1.png'))
                unit.run(RedAtlasTextureManager.getByKey('../asset/draft1.png')['parentAtlasInfo'] instanceof RedAtlasInfo)
            })
        }, true)

    )
)
