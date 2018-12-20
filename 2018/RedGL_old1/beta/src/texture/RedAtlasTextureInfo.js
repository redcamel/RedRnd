"use strict";
var RedAtlasTextureInfo;
(function () {
    var checkMap;;
    checkMap = {}
    /**DOC:
        {
            constructorYn : true,
            title :`RedAtlasTextureInfo`,
            description : `
                - <b>RedAtlasTextureManager</b>에 의해 자동 생성된 <b>RedAtlasTextureInfo</b>.
                - 고유값으로 캐싱되며, 사용자 생성은 금지한다.
                - Object.freeze 상태로 반환.
            `,
            params : {
                atlasUVInfo : [
                    {type:'Array'},
                    `
                        - 아틀라스상의 Rect정보.
                    `
                ],
                parentAtlasInfo : [
                    {type:'Atlas instance'},
                    `
                        - Atlas 인스턴스 객체.
                    `
                ]
            },
            return : 'RedAtlasTextureInfo Instance'
        }
    :DOC*/
    var t0;
    var tKey;
    var setAtlasUVInfo
    setAtlasUVInfo = function (atlasUVInfo) {
        t0 = [
            atlasUVInfo[0][0],
            1.0 - atlasUVInfo[2][1],
            (atlasUVInfo[1][0] - atlasUVInfo[0][0]),
            (atlasUVInfo[2][1] - atlasUVInfo[0][1])
        ]
        tKey = t0.toString()
        if (checkMap[tKey]) atlasUVInfo = checkMap[tKey]
        else atlasUVInfo = checkMap[tKey] = RedAtlasUVInfo(t0)
        return atlasUVInfo
    }
    RedAtlasTextureInfo = (function () {

        return function (atlasUVInfo, parentAtlasInfo) {
            if (!(this instanceof RedAtlasTextureInfo)) return new RedAtlasTextureInfo(atlasUVInfo, parentAtlasInfo)
            if (!(atlasUVInfo instanceof Array)) throw 'atlasUVInfo는 Array만 허용합니다.'
            if (!(parentAtlasInfo instanceof RedAtlasInfo)) throw 'parentAtlasInfo는 RedAtlasInfo  인스턴스만 허용합니다.'
            atlasUVInfo = setAtlasUVInfo(atlasUVInfo)
            console.log(atlasUVInfo)
            /**DOC:
                {
                    title :`atlasUVInfo`,
                    code : 'PROPERTY',
                    description : `
                        - atlasUVInfo 반환
                    `,
                    example : `
                        인스턴스.atlasUVInfo
                    `,
                    return : 'RedAtlasUVInfo Instance'
                }
            :DOC*/
            this['atlasUVInfo'] = atlasUVInfo
            /**DOC:
                {
                    title :`parentAtlasInfo`,
                    code : 'PROPERTY',
                    description : `
                        - parentAtlasInfo 반환
                    `,
                    example : `
                        인스턴스.parentAtlasInfo
                    `,
                    return : 'RedAtlasInfo Instance'
                }
            :DOC*/
            this['parentAtlasInfo'] = parentAtlasInfo
            this['__webglAtlasTexture'] = 1
            this['__webglTextureYn'] = 1
            Object.freeze(this)
            console.log(this)
        }
    })()
    RedAtlasTextureInfo.prototype.setAtlasUVInfo = setAtlasUVInfo
})();