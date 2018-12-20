"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMeshInfo`,
        description : `
            - RedGL에서 사용할 재질정보를 정의
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
            RedMeshInfo(test, 'firstMesh',geometryInfo, materialInfo)
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
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key - 문자열만 허용됩니다.'
        if (!(geometryInfo instanceof RedGeometryInfo)) throw 'geometryInfo - RedGeometryInfo만 허용됩니다.'
        if (!(materialInfo instanceof RedMaterialInfo)) throw 'materialInfo - RedMaterialInfo만 허용됩니다.'
        tGL = redGL.gl
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedMeshInfo']) {
            redGL['__datas']['RedMeshInfo'] = {}
        }
        tDatas = redGL['__datas']['RedMeshInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) throw key + '는 이미 존재하는 RedMeshInfo 입니다.'
        // 메쉬생성!!
        /**DOC:
		{
            title :`uMVMatrix`,
            description : `
                - modelView Matrix를 반환
                - <span style="color:red"><b>uMVMatrix라는 키값은 쉐이더에서 사용되는 고정값이다.</b></span>
            `,
			example : `인스턴스.uMVMatrix`,
			return : 'mat4(Float32Array)'
        }
        :DOC*/
        this['uMVMatrix'] = mat4.create()
        /**DOC:
		{
            title :`position`,
            description : `
                - positionXYZ를 Float32Array로 가진다.
                - <span style="color:red"><b>강제로 일반 Array로 치환하지않도록 주의해야한다.</b></span>
            `,
			example : `인스턴스.position`,
			return : 'Float32Array(3)'
        }
        :DOC*/
        this['position'] = new Float32Array([0, 0, 0])
        /**DOC:
		{
            title :`rotation`,
            description : `
                - rotationXYZ를 Float32Array로 가진다.
                - <span style="color:red"><b>강제로 일반 Array로 치환하지않도록 주의해야한다.</b></span>
            `,
			example : `인스턴스.rotation`,
			return : 'Float32Array(3)'
        }
        :DOC*/
        this['rotation'] = new Float32Array([0, 0, 0])
        /**DOC:
		{
            title :`scale`,
            description : `
                - scaleXYZ를 Float32Array로 가진다.
                - <span style="color:red"><b>강제로 일반 Array로 치환하지않도록 주의해야한다.</b></span>
            `,
			example : `인스턴스.rotation`,
			return : 'Float32Array(3)'
        }
        :DOC*/
        this['scale'] = new Float32Array([1, 1, 1])
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
        /**DOC:
		{
            title :`drawMode`,
            description : `
                - 실제 메쉬를 그릴때 어떠한 방식으로 그릴지 결정
                - ex) gl.TRIANGLES
            `,
			example : `인스턴스.drawMode`,
			return : 'glConst'
        }
        :DOC*/
        this['drawMode'] = tGL.TRIANGLES //TODO: 그리기모드는 매쉬가 가지는것이 맞는가!.. 맞을걸 같아..
        /**DOC:
		{
            title :`children`,
            description : `
                - 자식노드리스트
            `,
			example : `인스턴스.children`,
			return : 'Array'
        }
        :DOC*/
        this['children'] = []
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
        // console.log(this)
    }
    Object.freeze(RedMeshInfo)
})();