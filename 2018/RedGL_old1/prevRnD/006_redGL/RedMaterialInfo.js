"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMaterialInfo`,
        description : `
            - RedGL에서 사용할 재질정보를 정의
            - 타입키에 해당하는 RedMaterialDefine 정의가 존재하지않을경우 에러
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            type : [
                {type:'String'},
                '- 재질 타입 지정'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo(test,'basic', RedProgramInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShaderInfo(test,'basic', RedProgramInfo.FRAGMENT_SHADER, 쉐이더소스)
            // basic이라는 이름으로 프로그램을 만든다. 
            test.createProgram(
                test,'basic',
                test.createShaderInfo(test,'basic', RedProgramInfo.VERTEX_SHADER),
                test.createShaderInfo(test,'basic', RedProgramInfo.FRAGMENT_SHADER)
            )
            // basic이라는 타입의 재질 정의한다.
            RedMaterialDefine(test, test.getProgramInfo('basic'))
            // basic재질을 실제로 생성한다.
            RedMaterialInfo(test,'basic')
        `,
        return : 'RedMaterialInfo Instance'
    }
:DOC*/
var RedMaterialInfo;
(function () {
    var tDefineMap
    var tData;
    var tUniform;
    var typeMAP;
    var k, t0;
    typeMAP = {
        f: {
            16: 'uniformMatrix4fv',
            12: 'uniformMatrix3fv',
            8: 'uniformMatrix2fv',
            4: 'uniform4fv',
            3: 'uniform3fv',
            2: 'uniform2fv',
            1: 'uniform1f'
        },
        i: {
            16: 'uniformMatrix4iv',
            12: 'uniformMatrix3iv',
            8: 'uniformMatrix2iv',
            4: 'uniform4iv',
            3: 'uniform3iv',
            2: 'uniform2iv',
            1: 'uniform1iv'
        }
    }
    RedMaterialInfo = function (redGL, typeName, diffuseInfo) {
        if (!(this instanceof RedMaterialInfo)) return new RedMaterialInfo(redGL, typeName,diffuseInfo)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof typeName != 'string') throw 'type은 문자열만 허용됩니다.'
        // 디파인더에서 재질정의를 찾고
        tDefineMap = redGL['__datas']['RedMaterialDefine']
        tData = tDefineMap[typeName]
        if (!tData) throw typeName + '재질은 존재하지않습니다.'
        /**DOC:
		{
            title :`programInfo`,
			description : `재질에 사용된 프로그램정보`,
			example : `인스턴스.programInfo`,
			return : 'RedProgramInfo'
        }
        :DOC*/
        this['programInfo'] = tData['programInfo']
        /**DOC:
		{
            title :`diffuseInfo`,
            description : `
                - diffuseInfo
            `,
			example : `인스턴스.diffuseInfo`,
			return : 'RedTextureInfo'
        }
        :DOC*/
        this['diffuseInfo'] = diffuseInfo
        /**DOC:
		{
            title :`uniforms`,
            description : `
                - 렌더링시 참고할 유니폼데이터
            `,
			example : `인스턴스.uniforms`,
			return : 'Object'
        }
        :DOC*/
        this['uniforms'] = tUniform = {}
        // 유니폼은 프로그램에 의하여 생성되고, 재질정보를 토대로 렌더시 참조
        tData['programInfo'].makeUniformValue(this)
        /**DOC:
		{
            title :`needUniformList`,
            description : `
                - 렌더링시 유니폼리스트를 다시 만들어야할지 여부
                - 시스템에서 자동으로 설정한다.
            `,
			example : `인스턴스.needUniformList`,
			return : 'Boolean'
        }
        :DOC*/
        this['needUniformList'] = true
        // 유니폼을 업데이트할 glMethod를 찾는다. 
        for (k in tUniform) {
            t0 = tUniform[k]
          
            if (t0 instanceof Float32Array || t0 instanceof Float64Array) {
                t0['__uniformMethod'] = typeMAP['f'][t0.length]
                t0['__isMatrix'] = t0['__uniformMethod'].length > 11
            } else if (
                t0 instanceof Uint8Array ||
                t0 instanceof Uint16Array ||
                t0 instanceof Uint32Array ||
                t0 instanceof Int8Array ||
                t0 instanceof Int16Array ||
                t0 instanceof Int32Array
            ) {
                t0['__uniformMethod'] = typeMAP['i'][t0.length]
                t0['__isMatrix'] = t0['__uniformMethod'].length > 11
            } else if(t0 instanceof RedTextureInfo) {
            }else if (t0 instanceof RedAtlasTextureInfo){
                this['uniforms']['uAtlascoord'] = t0['atlasUV']
                console.log('RedAtlasTextureInfo',t0,this)
            }else throw k + '는 올바르지 않은 타입입니다.'
        }
        this['__UUID'] = REDGL_UUID++
    }
    Object.freeze(RedMaterialInfo)
})();