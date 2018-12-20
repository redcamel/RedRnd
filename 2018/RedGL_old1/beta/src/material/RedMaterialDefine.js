"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMaterialDefine`,
        description : `
            - RedGL에서 사용할 재질정보를 정의.
            - <b>유일키</b>만 지원.
            - <b>Object.freeze</b> 상태로 정의됨.
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            programInfo : [
                {type:'RedProgramInfo'},
                '- 재질과 바인딩될 RedProgramInfo 지정'
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
            // basic이라는 타입의 재질을 만든다.
            test.createMaterialDefine(test.getProgramInfo('basic'))
        `,
        return : 'RedMaterialDefine Instance'
    }
:DOC*/
var RedMaterialDefine;
(function () {
    var tDatas;
    var tKey;
    var tGL;
    var nullImage;
    var tProgramUniformLocationGroup
    var emptyCubeMap; // 큐브맵이 쉐이더에 존재할경우 사용할 초기화 큐브맵
    var emptyCube = {}; // emptyCubeMap을 중복 바인딩 하지않기 위한 정보
    nullImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzMxRDhBQzRFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxRDhBQzVFNUZFMTFFN0IxMDVGNEEzQjQ0RjAwRDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MzFEOEFDMkU1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MzFEOEFDM0U1RkUxMUU3QjEwNUY0QTNCNDRGMDBEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuojYFUAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC'
  
    RedMaterialDefine = function (redGL, programInfo) {
        if (!(this instanceof RedMaterialDefine)) return new RedMaterialDefine(redGL, programInfo)
        if (!(redGL instanceof RedGL)) throw 'RedMaterialDefine : RedGL 인스턴스만 허용됩니다.'
        if (!(programInfo instanceof RedProgramInfo)) throw 'RedMaterialDefine : RedProgramInfo 인스턴스만 허용됩니다.'
        // 저장공간확보
        if (!redGL['__datas']['RedMaterialDefine']) redGL['__datas']['RedMaterialDefine'] = {}
        tGL = redGL.gl
        tKey = programInfo['key']
        tDatas = redGL['__datas']['RedMaterialDefine']
        // 기존에 등록된 녀석이면 에러
        if (tDatas[tKey]) throw tKey + '는 이미 존재하는 RedMaterialDefine 입니다.'
        /**DOC:
		{
            title :`programInfo`,
			description : `실제 재질을 만들때 참고할 programInfo`,
			example : `인스턴스.programInfo`,
			return : 'RedProgramInfo'
        }
        :DOC*/
        this['programInfo'] = programInfo
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[tKey] = this
        Object.freeze(this)
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //TODO: 여기에 존재하는게 맞지는 않는듯한데
        // 큐브 샘플러가 쉐이더상에 존재할경우 워닝이 뜨지않도록 빈 큐브맵을 미리 딱 한번만 올려둔다.
        /*
         음 이건 ProgramInfo가 먹어도 될듯한데?
         복원할때 귀찮아 지려나....
         일단 둠 -0-;
        */
        tProgramUniformLocationGroup = this['programInfo']['uniforms']

        emptyCubeMap = emptyCubeMap ? emptyCubeMap : redGL.createCubeTextureInfo([nullImage, nullImage, nullImage, nullImage, nullImage, nullImage])
        if (tProgramUniformLocationGroup['uUseReflectionTexture']) {
            tGL.activeTexture(tGL.TEXTURE0 + RedTextureIndex.CUBE_REFLECTION)
            tGL.bindTexture(tGL.TEXTURE_CUBE_MAP, emptyCubeMap['texture'])
            tGL.uniform1i(tProgramUniformLocationGroup['uReflectionTexture']['location'], RedTextureIndex.CUBE_REFLECTION)
        }
        if (tProgramUniformLocationGroup['uReflectionTexture']) {
            tGL.activeTexture(tGL.TEXTURE0 + RedTextureIndex.CUBE_REFRACTION)
            tGL.bindTexture(tGL.TEXTURE_CUBE_MAP, emptyCubeMap['texture'])
            tGL.uniform1i(tProgramUniformLocationGroup['uRefractionTexture']['location'], RedTextureIndex.CUBE_REFRACTION)
        }
        console.log('큐브맵 초기바인딩 실행')


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    Object.freeze(RedMaterialDefine)
})();