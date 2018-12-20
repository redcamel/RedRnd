"use strict";
var RedSpotLightInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedSpotLightInfo`,
        description : `
            - RedSpotLightInfo 생성
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
            // firstScene 키로 Scene생성
            RedSpotLightInfo(test)
        `,
        return : 'RedSpotLightInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedSpotLightInfo = function (redGL) {
        if (!(this instanceof RedSpotLightInfo)) return new RedSpotLightInfo(redGL)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedSpotLightInfo']) redGL['__datas']['RedSpotLightInfo'] = {}
        tDatas = redGL['__datas']['RedSpotLightInfo']
        /**DOC:
		{
            title :`color`,
            description : `라이트 컬러`,
            code:'PROPERTY',
            example : `인스턴스.color`,
            return : 'Float32Array(4)'
        }
        :DOC*/
        this['color'] = new Float32Array([255, 255, 255, 255])
         /**DOC:
		{
            title :`position`,
            description : `라이트 포지션`,
            code:'PROPERTY',
            example : `인스턴스.position`,
            return : 'Float32Array(3)'
        }
        :DOC*/
        this['position'] = new Float32Array([0, 0, 0])
        this['direction'] = new Float32Array([0, 0, 0])
        /**DOC:
		{
            title :`position`,
            description : `라이트 반경`,
            code:'PROPERTY',
            example : `인스턴스.radius`,
            return : 'Number'
        }
        :DOC*/
        this['spotCosCuttoff'] = 0.2
        this['spotExponent'] = 8
        this['useDebugMode'] = false
        this['__UUID'] = REDGL_UUID++
        this['__debugMesh'] = redGL.createMeshInfo(
            'RedSpotLightInfo__debugMesh' + this['__UUID'],
            RedPrimitive.cone(redGL,0.5,0.00001,0.5,8,8),
            redGL.createMaterialInfo('color')
        )
        
        this['__debugMesh'].drawMode = redGL.gl.LINE_STRIP

    }
    RedSpotLightInfo['TYPE'] = 'spot'
    Object.freeze(RedSpotLightInfo)
})();