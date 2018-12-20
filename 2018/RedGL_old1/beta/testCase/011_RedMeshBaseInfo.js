"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
var testObject;
redSuite(
    "Test_RedMeshBaseInfo Test",
    redGroup(
        "Test_RedMeshBaseInfo Test",
        redTest("인스턴스 생성 테스트 - 기본생성", function (unit) {
            var t0;
            t0 = true
            testObject = {}
            try {
                RedMeshBaseInfo.call(testObject, testGL)
            } catch (error) {
                t0 = false
            }
            console.log(testObject)
            unit.run(t0)
        }, true)
    ),
    redGroup(
        "생성값 테스트",
        redTest("geometryInfo - 키 등록확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject.hasOwnProperty('geometryInfo'))
        }, true),
        //
        redTest("materialInfo - 키 등록확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject.hasOwnProperty('materialInfo'))
        }, true),
        //
        redTest("drawMode - 키 등록확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject.hasOwnProperty('drawMode'))
        }, true),
        //
        redTest("cullFace - 키 등록확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject.hasOwnProperty('cullFace'))
        }, true),
        //
        redTest("children - 키 등록확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject.hasOwnProperty('children'))
        }, true),
        redTest("children - 형식확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject['children'] instanceof Array)
        }, true),
        //
        redTest("uMVMatrix - 키 등록확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject.hasOwnProperty('uMVMatrix'))
        }, true),
        redTest("uMVMatrix - 주소값수정불가확인", function (unit) {
            var t0;
            t0 = true
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            try {
                testObject['uMVMatrix'] = 1
            } catch (error) {
                t0 = false
            }
            console.log(testObject)
            unit.run(t0)
        }, false),
        redTest("uMVMatrix - 내용수정은 가능확인", function (unit) {
            var t0;
            t0 = true
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            testObject['uMVMatrix'][0] = 10000
            console.log(testObject)
            unit.run(testObject['uMVMatrix'][0])
        }, 10000),
        //
        redTest("position - 키 등록확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject.hasOwnProperty('position'))
        }, true),
        redTest("position - 형식확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject['position'] instanceof Float32Array)
        }, true),
        redTest("position - 초기값확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject['position'][0] == 0 && testObject['position'][1] == 0 && testObject['position'][2] == 0)
        }, true),
        redTest("position - 주소값수정불가확인", function (unit) {
            var t0;
            t0 = true
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            try {
                testObject['position'] = 1
            } catch (error) {
                t0 = false
            }
            console.log(testObject)
            unit.run(t0)
        }, false),
        redTest("position - 내용수정은 가능확인", function (unit) {
            var t0;
            t0 = true
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            testObject['position'][0] = 10000
            console.log(testObject)
            unit.run(testObject['position'][0])
        }, 10000),
        //
        redTest("rotation - 키 등록확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject.hasOwnProperty('rotation'))
        }, true),
        redTest("rotation - 형식확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject['rotation'] instanceof Float32Array)
        }, true),
        redTest("rotation - 초기값확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject['rotation'][0] == 0 && testObject['rotation'][1] == 0 && testObject['rotation'][2] == 0)
        }, true),
        redTest("rotation - 주소값수정불가확인", function (unit) {
            var t0;
            t0 = true
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            try {
                testObject['rotation'] = 1
            } catch (error) {
                t0 = false
            }
            console.log(testObject)
            unit.run(t0)
        }, false),
        redTest("rotation - 내용수정은 가능확인", function (unit) {
            var t0;
            t0 = true
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            testObject['rotation'][0] = 10000
            console.log(testObject)
            unit.run(testObject['rotation'][0])
        }, 10000),
        //
        redTest("scale - 키 등록확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject.hasOwnProperty('scale'))
        }, true),
        redTest("scale - 형식확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject['scale'] instanceof Float32Array)
        }, true),
        redTest("scale - 초기값확인", function (unit) {
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            unit.run(testObject['scale'][0] == 1 && testObject['scale'][1] == 1 && testObject['scale'][2] == 1)
        }, true),
        redTest("scale - 주소값수정불가확인", function (unit) {
            var t0;
            t0 = true
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            try {
                testObject['scale'] = 1
            } catch (error) {
                t0 = false
            }
            console.log(testObject)
            unit.run(t0)
        }, false),
        redTest("scale - 내용수정은 가능확인", function (unit) {
            var t0;
            t0 = true
            testObject = {}
            RedMeshBaseInfo.call(testObject, testGL)
            testObject['scale'][0] = 10000
            console.log(testObject)
            unit.run(testObject['scale'][0])
        }, 10000)
    )
)
