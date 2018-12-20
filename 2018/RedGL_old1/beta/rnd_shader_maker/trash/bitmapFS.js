'use strict';
var FS_BITMAP_BASE_SET;
// 기본 정보
FS_BITMAP_BASE_SET = {
    type : 'fragment',
    define: {
        uniforms: [
            // 디퓨즈텍스쳐
            ['uniform sampler2D uDiffuseTexture']
        ],
        varyings: [
            // 비트맵 코디네이트 값
            ['varying vec2 vTexcoord']

        ],
        vars: [
            // 최종컬러값
            ['vec4 finalColor']
        ]
    },
    header: [],
    body: [],
    footer: [
        'finalColor = texture2D(uDiffuseTexture, vTexcoord)'
    ]
}
