"use strict";
var RedDirectionalLightInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedDirectionalLightInfo`,
        description : `
            - RedDirectionalLightInfo 생성
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ]
        },
        example : `
            testGL.createDirectionalLight()
        `,
        return : 'RedDirectionalLightInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedDirectionalLightInfo = function (redGL) {
        if (!(this instanceof RedDirectionalLightInfo)) return new RedDirectionalLightInfo(redGL)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        // 저장공간확보
        if (!redGL['__datas']['RedDirectionalLightInfo']) redGL['__datas']['RedDirectionalLightInfo'] = {}
        tDatas = redGL['__datas']['RedDirectionalLightInfo']

        /**DOC:
		{
            title :`color`,
            description : `
                - 라이트 컬러
                - 기본값 : new Float32Array([1, 1, 1, 1])
            `,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32(vec4)'
        }
        :DOC*/
        this['color'] = new Float32Array([1, 1, 1, 1])
        /**DOC:
       {
           title :`direction`,
           description : `
            - 라이트 디렉션
           `,
           code:'PROPERTY',
           example : `인스턴스.color`,
           return : 'Float32(vec3)'
       }
       :DOC*/
        this['direction'] = new Float32Array([0, 0, 0])
        this['__UUID'] = REDGL_UUID++
        Object.seal(this)
    }
    RedDirectionalLightInfo['TYPE'] = 'directional'
    Object.freeze(RedDirectionalLightInfo)
})();