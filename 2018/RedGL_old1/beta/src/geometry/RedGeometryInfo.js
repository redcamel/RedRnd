"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedGeometryInfo`,
        description : `
            - RedGeometryInfo 인스턴스 생성자
            - <b>유일키</b>만 지원하며 키 중복일경우 에러발생         
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 등록될 키명'
            ],
            verticesBufferInfo : [
                {type:'RedBufferInfo'},
                '- 버텍스버퍼정보',
                '- RedBufferInfo.ARRAY_BUFFER 타입만가능'
            ],
            indicesBufferInfo : [
                {type:'RedBufferInfo'},
                '- 인덱스버퍼정보',
                '- RedBufferInfo.ELEMENT_ARRAY_BUFFER 타입만가능'
            ],
            texcoordBufferInfo : [
                {type:'RedBufferInfo'},
                '- UV버퍼정보',
                '- RedBufferInfo.ARRAY_BUFFER 타입만가능'
            ],
            normalBufferInfo : [
                {type:'RedBufferInfo'},
                '- normal버퍼정보',
                '- RedBufferInfo.ARRAY_BUFFER 타입만가능'
            ]
        },
        example : `
            RedGeometryInfo(RedGL인스턴스, key, verticesBuffer, indicesBuffer, texcoordBuffer, normalBuffer)
        `,
        return : 'RedGeometryInfo Instance'
    }
:DOC*/
var RedGeometryInfo;
(function () {
    var tGL;
    var tDatas;
    var k;
    RedGeometryInfo = function (redGL, key, verticesBufferInfo, indicesBufferInfo, texcoordBufferInfo, normalBufferInfo) {
        if (!(this instanceof RedGeometryInfo)) return new RedGeometryInfo(redGL, key, verticesBufferInfo, indicesBufferInfo, texcoordBufferInfo, normalBufferInfo)
        if (!(redGL instanceof RedGL)) throw 'RedGeometryInfo : RedGL 인스턴스만 허용됩니다.'
        if (verticesBufferInfo && !(verticesBufferInfo instanceof RedBufferInfo)) throw 'RedGeometryInfo : verticesBufferInfo는 RedBufferInfo만 가능합니다.'
        if (indicesBufferInfo && !(indicesBufferInfo instanceof RedBufferInfo)) throw 'RedGeometryInfo : indicesBufferInfo는 RedBufferInfo만 가능합니다.'
        if (texcoordBufferInfo && !(texcoordBufferInfo instanceof RedBufferInfo)) throw 'RedGeometryInfo : texcoordBufferInfo는 RedBufferInfo만 가능합니다.'
        if (normalBufferInfo && !(normalBufferInfo instanceof RedBufferInfo)) throw 'RedGeometryInfo : normalBufferInfo는 RedBufferInfo만 가능합니다.'
        //
        if (verticesBufferInfo && verticesBufferInfo.bufferType != RedBufferInfo.ARRAY_BUFFER) throw 'RedGeometryInfo : verticesBufferInfo는 ARRAY_BUFFER만 가능합니다.'
        if (indicesBufferInfo && indicesBufferInfo.bufferType != RedBufferInfo.ELEMENT_ARRAY_BUFFER) throw 'RedGeometryInfo : indicesBufferInfo는 ELEMENT_ARRAY_BUFFER만 가능합니다.'
        if (texcoordBufferInfo && texcoordBufferInfo.bufferType != RedBufferInfo.ARRAY_BUFFER) throw 'RedGeometryInfo : texcoordBufferInfo는 ARRAY_BUFFER만 가능합니다.'
        if (normalBufferInfo && normalBufferInfo.bufferType != RedBufferInfo.ARRAY_BUFFER) throw 'RedGeometryInfo : normalBufferInfo는 ARRAY_BUFFER만 가능합니다.'
        // 저장공간확보
        if (!redGL['__datas']['RedGeometryInfo']) {
            redGL['__datas']['RedGeometryInfo'] = {}
        }
        tDatas = redGL['__datas']['RedGeometryInfo']
        // 기존에 등록된 녀석이면 재생성X
        if (tDatas[key]) throw 'RedGeometryInfo : ' + key + '는 이미 존재하는 RedGeometryInfo 입니다.'
        tGL = redGL.gl
        // 지오메트리생성!!
        /**DOC:
		{
            title :`attributes`,
            description : `
                - attribute Buffer 정보들
                - vertexPosition, texcoord, normal 정보를 가진다.(존재하지 않을경우 키 자체가 없다.)
            `,
			example : `인스턴스.attributes`,
			return : 'Object'
        }
        :DOC*/
        this.attributes = {
            // vertexPosition: null, //이넘 고유키값
            // texcoord: null, //이넘 고유키값
            // normal : null //이넘 고유키값
        }
        /**DOC:
		{
            title :`indices`,
			description : `indices Buffer 정보`,
			example : `인스턴스.indices`,
			return : 'RedbufferInfo'
        }
        :DOC*/
        this.indices = null
        /**DOC:
		{
            title :`key`,
			description : `고유키`,
			example : `인스턴스.key`,
			return : 'String'
		}
	    :DOC*/
        this['key'] = key
        if (verticesBufferInfo) {
            if (verticesBufferInfo['shaderPointerKey'] == RedFixedAttributeKey['aVertexPosition']) this['attributes']['vertexPosition'] = verticesBufferInfo // 버텍스버퍼
            else throw 'RedGeometryInfo : verticesBufferInfo의 shaderPointerKey는 aVertexPosition만 가질수있습니다.'
        }
        if (texcoordBufferInfo) {
            if (texcoordBufferInfo['shaderPointerKey'] == RedFixedAttributeKey['aTexcoord']) this['attributes']['texcoord'] = texcoordBufferInfo // 코디네이트버퍼
            else throw 'RedGeometryInfo : texcoordBufferInfo의 shaderPointerKey는 aTexcoord만 가질수있습니다.'
        }
        if (normalBufferInfo) {
            if (normalBufferInfo['shaderPointerKey'] == RedFixedAttributeKey['aVertexNormal']) this['attributes']['normal'] = normalBufferInfo // 노말버퍼
            else throw 'RedGeometryInfo : normalBufferInfo의 shaderPointerKey는 aVertexNormal만 가질수있습니다.'
        }
        //
        this['__attributeList'] = []
        for (k in this['attributes']) {
            this['__attributeList'].push(this['attributes'][k])
        }
        //
        this['indices'] = indicesBufferInfo
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
    }
    Object.freeze(RedGeometryInfo)
})();