"use strict";
var testGL = RedGL(Recard.Dom('canvas').S('width', 1000, 'height', 1000).__dom__)
redSuite(
    "RedPrimitive Test",
    redGroup(
        "RedPrimitive Test",
        redTest("생성 테스트 : 캐싱", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL)
            t1 = RedPrimitive.sphere(testGL)
            console.log(t0)
            console.log(t1)
            unit.run(t0 == t1)
        }, true),
        redTest("생성 테스트 : 캐싱2", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL,2)
            t1 = RedPrimitive.sphere(testGL,2)
            console.log(t0)
            console.log(t1)
            unit.run(t0 == t1)
        }, true),
        redTest("생성 테스트 : attributes['vertexPosition'] 타입체크", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL,2)
            console.log(t0['attributes']['vertexPosition'])
            unit.run(t0['attributes']['vertexPosition'] instanceof RedBufferInfo)
        }, true),
        redTest("생성 테스트 : attributes['vertexPosition'] 타입체크2", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL,2)
            unit.run(t0['attributes']['vertexPosition']['bufferType'] == RedBufferInfo.ARRAY_BUFFER)
        }, true),
        redTest("생성 테스트 : attributes['texcoord'] 타입체크", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL,2)
            console.log(t0['attributes']['texcoord'])
            unit.run(t0['attributes']['texcoord'] instanceof RedBufferInfo)
        }, true),
        redTest("생성 테스트 : attributes['texcoord'] 타입체크2", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL,2)
            unit.run(t0['attributes']['texcoord']['bufferType'] == RedBufferInfo.ARRAY_BUFFER)
        }, true),
        redTest("생성 테스트 : attributes['normal'] 타입체크", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL,2)
            console.log(t0['attributes']['normal'])
            unit.run(t0['attributes']['normal'] instanceof RedBufferInfo)
        }, true),
        redTest("생성 테스트 : attributes['normal'] 타입체크2", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL,2)
            unit.run(t0['attributes']['normal']['bufferType'] == RedBufferInfo.ARRAY_BUFFER)
        }, true),
        redTest("생성 테스트 : indices 타입체크", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL,2)
            console.log(t0['indices'])
            unit.run(t0['indices'] instanceof RedBufferInfo)
        }, true),
        redTest("생성 테스트 : indices 타입체크2", function (unit) {
            var t0,t1;
            t0 = RedPrimitive.sphere(testGL,2)
            unit.run(t0['indices']['bufferType'] == RedBufferInfo.ELEMENT_ARRAY_BUFFER)
        }, true),
    )
)
