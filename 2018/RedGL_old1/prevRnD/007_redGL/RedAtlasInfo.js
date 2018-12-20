"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedAtlasInfo`,
        description : `
            - <b>RedAtlasTextureManager</b>에 의해 자동 생성된 <b>RedAtlasInfo</b>.
            - 고유값으로 캐싱되며, 사용자 생성은 금지한다.
            - 하드웨어가 지원하는 최대크기(최대 4096*4096으로 제한)의 <b>Atlas</b>객체를 가진다.
            - 소스맵을 기반으로 <b>RedAtlasTextureInfo</b>를 내부적으로 가진다.
            - <b>Atlas</b>정보가 업데이트되면 자동 갱신된다.
            - Object.seal 상태로 반환.
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                `
                    - RedGL 객체.
                `
            ],
            targetAtlas : [
                {type:'Atlas instance'},
                `
                    - Atlas 인스턴스 객체를 주입.
                `
            ]
        },
        return : 'RedAtlasInfo Instance'
    }
:DOC*/
var RedAtlasInfo;
RedAtlasInfo = function (redGL, targetAtlas) {
    if (!(this instanceof RedAtlasInfo)) return new RedAtlasInfo(redGL, targetAtlas)
    if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
    /**DOC:
    {
        title :`RedAtlasInfo`,
        code : 'PROPERTY',
        description : `
            Atlas정보(Atlas).
        `,
        example : `
            인스턴스.atlas
        `,
        return : 'Atlas Instance'
    }
    :DOC*/
    this['atlas'] = targetAtlas
    /**DOC:
    {
        title :`textureInfo`,
        code : 'PROPERTY',
        description : `
            텍스쳐 정보(RedAtlasTextureInfo)
        `,
        example : `
            인스턴스.textureInfo
        `,
        return : 'RedAtlasTextureInfo를 Instance'
    }
    :DOC*/
    this['textureInfo'] = null
    Object.seal(this)
}