"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedMaterialDefine`,
        description : `
            - RedGL에서 사용할 재질정보를 정의.
            - <b>유일키</b>만 지원하며 키 중복일경우 에러발생.
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
            RedMaterialDefine(test, test.getProgramInfo('basic'))
        `,
        return : 'RedMaterialDefine Instance'
    }
:DOC*/
var RedMaterialDefine;
(function () {
    var tDatas;
    var tKey;
    RedMaterialDefine = function (redGL, programInfo) {
        if (!(this instanceof RedMaterialDefine)) return new RedMaterialDefine(redGL, programInfo)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (!(programInfo instanceof RedProgramInfo)) throw 'RedProgramInfo 인스턴스만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedMaterialDefine']) redGL['__datas']['RedMaterialDefine'] = {}
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
    }
    Object.freeze(RedMaterialDefine)
})();