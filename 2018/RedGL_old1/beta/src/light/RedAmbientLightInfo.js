"use strict";
var RedAmbientLightInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedAmbientLightInfo`,
        description : `
            - RedAmbientLightInfo 생성
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            test.createAmbientLight()
        `,
        return : 'RedAmbientLightInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedAmbientLightInfo = function (redGL) {
        if (!(this instanceof RedAmbientLightInfo)) return new RedAmbientLightInfo(redGL)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        // 저장공간확보
        if (!redGL['__datas']['RedAmbientLightInfo']) redGL['__datas']['RedAmbientLightInfo'] = {}
        tDatas = redGL['__datas']['RedAmbientLightInfo']
        /**DOC:
		{
            title :`color`,
            description : `
                - 라이트 컬러
                - 기본값 : new Float32Array([0.03, 0.03, 0.03, 1])
            `,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32Array(4)'
        }
        :DOC*/
        this['color'] = new Float32Array([0.03, 0.03, 0.03, 1])
        this['__UUID'] = REDGL_UUID++
        Object.seal(this)
    }
    RedAmbientLightInfo['TYPE'] = 'ambient'
    Object.freeze(RedAmbientLightInfo)
})();