"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMeshInfo`,
        description : `
            <h2>RedMeshBaseInfo 상속객체</h2>
            - 타입키에 해당하는 정의가 존재하지않을경우 에러
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 고유키',
                '- <span style="color:red"><b>입력하지않으면 그냥 UUID를 생성해버릴까..</b></span>'
            ],
            geometryInfo : [
                {type:'RedGeometryInfo'},
                '- 지오메트리정보'
            ],
            materialInfo : [
                {type:'RedMaterialInfo'},
                '- 재질정보'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            test.createMeshInfo('firstMesh',geometryInfo, materialInfo)
        `,
        return : 'RedMeshInfo Instance'
    }
:DOC*/
var RedMeshInfo;
(function () {
    var tGL;
    var tDatas;
    RedMeshInfo = function (redGL, key, geometryInfo, materialInfo) {
        if (!(this instanceof RedMeshInfo)) return new RedMeshInfo(redGL, key, geometryInfo, materialInfo)
        if (!(redGL instanceof RedGL)) throw 'RedMeshInfo : RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'RedMeshInfo : key - 문자열만 허용됩니다.'
        if (!(geometryInfo instanceof RedGeometryInfo)) throw 'RedMeshInfo : geometryInfo - RedGeometryInfo만 허용됩니다.'
        if (!(materialInfo instanceof RedMaterialInfo)) throw 'RedMeshInfo : materialInfo - RedMaterialInfo만 허용됩니다.'
        tGL = redGL.gl
        // 저장공간확보
        if (!redGL['__datas']['RedMeshInfo']) redGL['__datas']['RedMeshInfo'] = {}
        tDatas = redGL['__datas']['RedMeshInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) throw key + '는 이미 존재하는 RedMeshInfo 입니다.'
        RedMeshBaseInfo.call(this, redGL)
        /**DOC:
		{
            title :`geometryInfo`,
            description : `
                - 메쉬가 소유하고있는 geometryInfo
            `,
			example : `인스턴스.geometryInfo`,
			return : 'RedGeometryInfo'
        }
        :DOC*/
        this['geometryInfo'] = geometryInfo
        /**DOC:
		{
            title :`materialInfo`,
            description : `
                - 메쉬가 소유하고있는 materialInfo
            `,
			example : `인스턴스.materialInfo`,
			return : 'RedMaterialInfo'
        }
        :DOC*/
        this['materialInfo'] = materialInfo
        // 캐싱
        tDatas[key] = this
    }
    Object.freeze(RedMeshInfo)
})();