"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMaterialInfo`,
        description : `
            - 재질 생성기.
            - 타입키에 해당하는 <b>RedMaterialDefine</b> 정의가 존재하지않을경우 에러.
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            typeName : [
                {type:'String'},
                '- 재질 타입 지정'
            ],
            diffuseInfo : [
                {type:'RedTextureInfo'},
                '- DiffuseMap 지정'
            ],
            normalInfo : [
                 {type:'RedTextureInfo'},
                '- normalMap 지정'
            ],
            displacementInfo : [
                {type:'RedTextureInfo'},
                '- displacementMap 지정'
            ],
            specularInfo : [
                {type:'RedTextureInfo'},
                '- specularInfo 지정'
            ],
            reflectionInfo : [
                {type:'RedCubeTextureInfo'},
                '- reflectionInfo 지정'
            ],
            refractionInfo : [
                {type:'RedCubeTextureInfo'},
                '- refractionInfo 지정'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo('basic', RedProgramInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER, 쉐이더소스)
            // basic이라는 이름으로 프로그램을 만든다. 
            test.createProgramInfo(
                'basic',
                test.getShaderInfo('basic', RedProgramInfo.VERTEX_SHADER),
                test.getShaderInfo('basic', RedProgramInfo.FRAGMENT_SHADER)
            )
            // basic이라는 타입의 재질 정의한다.
            test.createMaterialDefine(test.getProgramInfo('basic'))
            // basic재질을 실제로 생성한다.
            test.createMaterialInfo('basic')
        `,
        return : 'RedMaterialInfo Instance'
    }
:DOC*/
var RedMaterialInfo;
(function () {
    var tMaterialDefineMap
    var tMaterialDefineData;
    var GL_METHOD_MAP;
    var k, t0;
    var tGL;
   
    GL_METHOD_MAP = {
        f: {
            16: 'uniformMatrix4fv',
            12: 'uniformMatrix3fv',
            8: 'uniformMatrix2fv',
            4: 'uniform4fv',
            3: 'uniform3fv',
            2: 'uniform2fv',
            1: 'uniform1fv'
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
    //TODO: 재질을 명시적으로 나눌지 텍스쳐 인자를 옵션맵으로 받을지 고민해봐야함...
    RedMaterialInfo = function (redGL, typeName, diffuseTexture, normalTexture, displacementTexture, specularTexture, reflectionTexture, refractionTexture) {
        if (!(this instanceof RedMaterialInfo)) return new RedMaterialInfo(redGL, typeName, diffuseTexture, normalTexture, displacementTexture, specularTexture, reflectionTexture, refractionTexture)
        if (!(redGL instanceof RedGL)) throw 'RedMaterialInfo : RedGL 인스턴스만 허용됩니다.'
        if (typeof typeName != 'string') throw 'RedMaterialInfo : typeName은 문자열만 허용됩니다.'
        // 디파인더에서 재질정의를 찾고
        tMaterialDefineMap = redGL['__datas']['RedMaterialDefine']
        tMaterialDefineData = tMaterialDefineMap[typeName]
        tGL = redGL.gl
        if (!tMaterialDefineData) throw typeName + '재질은 존재하지않습니다.'
        /**DOC:
		{
            title :`programInfo`,
			description : `재질에 사용된 프로그램정보`,
			example : `인스턴스.programInfo`,
			return : 'RedProgramInfo'
        }
        :DOC*/
        this['programInfo'] = tMaterialDefineData['programInfo']
        /**DOC:
		{
            title :`diffuseInfo`,
            description : `
                - diffuseInfo
            `,
			example : `인스턴스.diffuseInfo`,
			return : 'RedTextureInfo or RedCubeTextureInfo'
        }
        :DOC*/
        if (diffuseTexture) this[RedMaterialInfo.DIFFUSE_TEXTURE] = diffuseTexture
        if (normalTexture) this[RedMaterialInfo.NORMAL_TEXTURE] = normalTexture
        if (displacementTexture) this[RedMaterialInfo.DISPLACEMENT_TEXTURE] = displacementTexture
        if (specularTexture) this[RedMaterialInfo.SPECULAR_TEXTURE] = specularTexture
        if (reflectionTexture) this[RedMaterialInfo.REFLECTION_TEXTURE] = reflectionTexture
        if (refractionTexture) this[RedMaterialInfo.REFRACTION_TEXTURE] = refractionTexture
        /**DOC:
		{
            title :`materialUniforms`,
            description : `
                - 렌더링시 참고할 유니폼데이터
            `,
			example : `인스턴스.materialUniforms`,
			return : 'Object'
        }
        :DOC*/
        this['materialUniforms'] = {}
        // 재질에 초기유니폼정의를 반영함
        this['programInfo'].onInitUniformValue(this) //TODO: 이놈은 텍스쳐 형식을 못받도록 개선이 필요함
        /**DOC:
		{
            title :`needUniformList`,
            description : `
                - 렌더링시 유니폼리스트를 다시 만들어야할지 여부
                - 실제론 텍스쳐 변경시 textureUpdated의 의미를 가진다.
            `,
			example : `인스턴스.needUniformList`,
			return : 'Boolean'
        }
        :DOC*/
        this['needUniformList'] = true
        this.updateUniformList()
        this['__UUID'] = REDGL_UUID++

        
     
        
    }
    RedMaterialInfo.prototype.updateUniformList = function () {
        console.log('RedMaterialInfo : updateUniformList - ' + this['programInfo']['key'])
        // 텍스쳐 정보를 일단 업데이트 한다.
        if (this['programInfo'].onDefineTexture) this['programInfo'].onDefineTexture(this) //TODO: 이놈은 텍스쳐 형식만 받도록 개선이 필요함
        ////////////////////////////////////////////////////////////////////////////////////////
        /*
            - materialUniforms에서 렌더러에서 받아주지않는 타입이 정의되어있는지 확인한다.
            - Matrix나 vec형태의 경우 glMethod(ex: uniformMatrix2fv)여부를 추가정보로 입력
            - RedAtlasTextureInfo의 경우 적절한 AtlasUV정보를 추가정보로 입력한다.
        */
        for (k in this['materialUniforms']) {
            t0 = this['materialUniforms'][k]
            if (t0 instanceof Float32Array || t0 instanceof Float64Array) {
                t0['__uniformMethod'] = GL_METHOD_MAP['f'][t0.length]
                t0['__isMatrix'] = t0['__uniformMethod'].length > 11
            } else if (
                t0 instanceof Uint8Array ||
                t0 instanceof Uint16Array ||
                t0 instanceof Uint32Array ||
                t0 instanceof Int8Array ||
                t0 instanceof Int16Array ||
                t0 instanceof Int32Array
            ) {
                t0['__uniformMethod'] = GL_METHOD_MAP['i'][t0.length]
                t0['__isMatrix'] = t0['__uniformMethod'].length > 11
            } else if (t0 == null) {
            } else if (typeof t0 == 'number') {
            } else if (t0 instanceof RedAtlasUVInfo) {
            } else if (t0 instanceof RedTextureInfo || t0 instanceof RedCubeTextureInfo) {
            } else if (t0 instanceof RedAtlasTextureInfo) {
                this['materialUniforms']['uAtlascoord'] = t0['atlasUVInfo']
            } else throw 'RedMaterialInfo : ' + k + '는 올바르지 않은 타입입니다.'
        }
        ////////////////////////////////////////////////////////////////////////////////////////
        // 프로그램 정보를 처리
        // if (this['needUniformList']) {
        this['__uniformList'] = []
        var tUniformGroup = this['materialUniforms'] // 재질에 정의 된 유니폼정보
        var tUniformLocationGroup = this['programInfo']['uniforms'] // 프로그램상에 정의된 유니폼정보
        var tRenderType;
        var tCheckType;
        for (k in tUniformGroup) {
            // console.log('//////////////////////////////////////')
            // console.log(k)
            // console.log(tUniformLocationGroup)
            // console.log(tUniformLocationGroup[k])
            // console.log(tUniformLocationGroup[k]['type'])
            // console.log(tUniformGroup[k])
            // console.log(tUniformLocationGroup[k]['location'])
            // console.log(tUniformLocationGroup)
            // console.log('//////////////////////////////////////')
            tRenderType = undefined
            if (!tUniformLocationGroup.hasOwnProperty(k)) throw 'RedMaterialInfo : 유니폼명 : ' + k + ' / 쉐이더에 정의되지 않은 유니폼에 접근하려고합니다.'
            tCheckType = tUniformLocationGroup[k]['type']
            // 렌더러에서 참고할 형식을 찾는다.
            if (tCheckType == 'samplerCube' || tCheckType == 'sampler2D') tRenderType = RedConst.SAMPLER
            if (tCheckType == 'vec2' || tCheckType == 'vec3' || tCheckType == 'vec4') tRenderType = RedConst.VEC
            if (tCheckType == 'mat2' || tCheckType == 'mat3' || tCheckType == 'mat4') tRenderType = RedConst.MAT
            if (k == 'uAtlascoord') tRenderType = RedConst.ATLASCOORD
            if (tCheckType == 'int') tRenderType = RedConst.INT
            if (tCheckType == 'float') tRenderType = RedConst.FLOAT
            // 실제 렌더링시 참고해야할 유니폼 리스트를 최종 결정한다.
            this['__uniformList'].push({
                key: k,
                type: tCheckType,
                renderType: tRenderType,
                value: tUniformGroup[k],
                location: tUniformLocationGroup[k]['location']
            })
            this[k] = tUniformGroup[k]
        }
        this['needUniformList'] = false
        // }
    }
    /**DOC:
		{
            title :`setTexture`,
            code :`FUNCTION`,
            description : `
                - 텍스쳐 변경 매서드
                - 텍스쳐 변경후 자동으로 needUniformList=true를 반영하여 렌더링시 유니폼리스트를 재생성한다.
            `,
			example : `인스턴스.setTexture('uDiffuseTexture',RedTextureInfo instance)`,
			return : 'void'
        }
        :DOC*/
    RedMaterialInfo.prototype.setTexture = function (key, texture) {
        if (
            texture instanceof RedTextureInfo 
            || texture instanceof RedCubeTextureInfo 
            || texture instanceof RedAtlasUVInfo
            || texture == null  //삭제에 해당하는경우
            || texture == undefined //삭제에 해당하는경우
        ) {
            this[key] = texture
            this.updateUniformList()
        } else throw 'RedMaterialInfo : setTexture - ' + texture + '은 텍스쳐 형식이 아닙니다.'
    }
    /**DOC:
		{
            title :`DIFFUSE_TEXTURE`,
            code : 'CONST',
            description : `
                - 디퓨즈 텍스쳐 유니폼 상수
            `,
			example : `인스턴스.DIFFUSE_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.DIFFUSE_TEXTURE = 'uDiffuseTexture'
    /**DOC:
		{
            title :`NORMAL_TEXTURE`,
            code : 'CONST',
            description : `
                - NORMAL_TEXTURE 유니폼 상수
            `,
			example : `인스턴스.NORMAL_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.NORMAL_TEXTURE = 'uNormalTexture'
    /**DOC:
		{
            title :`DISPLACEMENT_TEXTURE`,
            code : 'CONST',
            description : `
                - DISPLACEMENT_TEXTURE 유니폼 상수
            `,
			example : `인스턴스.DISPLACEMENT_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.DISPLACEMENT_TEXTURE = 'uDisplacementTexture'
    /**DOC:
		{
            title :`SPECULAR_TEXTURE`,
            code : 'CONST',
            description : `
                - SPECULAR_TEXTURE 유니폼 상수
            `,
			example : `인스턴스.SPECULAR_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.SPECULAR_TEXTURE = 'uSpecularTexture'
    /**DOC:
		{
            title :`REFLECTION_TEXTURE`,
            code : 'CONST',
            description : `
                - REFLECTION_TEXTURE 유니폼 상수
            `,
			example : `인스턴스.REFLECTION_TEXTURE`,
			return : 'String'
        }
    :DOC*/
    RedMaterialInfo.REFLECTION_TEXTURE = 'uReflectionTexture'
    /**DOC:
       {
           title :`REFLECTION_TEXTURE`,
           code : 'CONST',
           description : `
               - REFLECTION_TEXTURE 유니폼 상수
           `,
           example : `인스턴스.REFLECTION_TEXTURE`,
           return : 'String'
       }
   :DOC*/
    RedMaterialInfo.REFRACTION_TEXTURE = 'uRefractionTexture'

    Object.freeze(RedMaterialInfo)
})();