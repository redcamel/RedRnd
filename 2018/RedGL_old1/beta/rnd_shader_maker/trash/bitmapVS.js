'use strict';
var VS_BITMAP_BASE_SET;
// 기본 정보
VS_BITMAP_BASE_SET = {
    type : 'vertex',
    define: {
        attributes: [
            ['attribute vec3 aVertexPosition'],
            ['attribute vec2 aTexcoord']

        ],
        uniforms: [
            ['uniform mat4 uMVMatrix'],
            ['uniform mat4 uCameraMatrix'],
            ['uniform mat4 uPMatrix'],
            ['uniform vec4 uAtlascoord'],
        ],
        varyings: [
            // 비트맵 코디네이트 값
            ['varying vec2 vTexcoord']

        ],
        vars: [
        ]
    },
    header: [],
    body: [],
    footer: [
        'gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(aVertexPosition, 1.0)',
        'vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw'
    ]
}
