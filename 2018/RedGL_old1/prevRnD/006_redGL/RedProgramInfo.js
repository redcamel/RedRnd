"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedProgramInfo`,
        description : `
            - RedProgramInfo 인스턴스 생성자
            - <b>유일키</b>만 지원하며 키 중복일경우 기존 캐싱된 프로그램 정보를 반환함.
            - 프로그램 정보는 <b>Object.freeze</b> 상태로 반환됨.
        `,
        params : {
            redGL : [
                {type:'Red Instance'},
                'redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 등록될 키명'
            ],
            vShaderInfo : [
                {type:'RedShaderInfo'}
            ],
            fShaderInfo : [
                {type:'RedShaderInfo'}
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // basic이라는 이름으로 버텍스 쉐이더를 만든다. 
            test.createShaderInfo(test,'basic', RedProgramInfo.VERTEX_SHADER, 쉐이더소스)
            test.createShaderInfo(test,'basic', RedProgramInfo.FRAGMENT_SHADER, 쉐이더소스)
            test.createProgram(
                test,'basic',
                test.createShaderInfo(test,'basic', RedProgramInfo.VERTEX_SHADER),
                test.createShaderInfo(test,'basic', RedProgramInfo.FRAGMENT_SHADER)
            )
        `,
        return : 'RedProgramInfo Instance'
    }
:DOC*/
var RedProgramInfo;
(function () {
    var tGL;
    var tDatas;
    var tProgram;
    var info;
    var self;
    var tList;
    tList = []
    RedProgramInfo = function (redGL, key, vShaderInfo, fShaderInfo, makeUniformValue) {
        if (!(this instanceof RedProgramInfo)) return new RedProgramInfo(redGL, key, vShaderInfo, fShaderInfo,makeUniformValue)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key - 문자열만 허용됩니다.'
        if (!vShaderInfo instanceof RedShaderInfo) throw 'vShaderInfo - RedShaderInfo만 허용됩니다.'
        if (!fShaderInfo instanceof RedShaderInfo) throw 'fShaderInfo - RedShaderInfo만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedProgramInfo']) {
            redGL['__datas']['RedProgramInfo'] = {}
        }
        tDatas = redGL['__datas']['RedProgramInfo']
        // 기존에 등록된 녀석이면 기존 데이터 리턴
        if (tDatas[key]) return console.log('캐싱프로그램 리턴!', key), tDatas[key]
        tGL = redGL.gl
        /**DOC:
		{
            title :`key`,
			description : `고유키`,
			example : `인스턴스.key`,
			return : 'String'
		}
	    :DOC*/
        this['key'] = key
        /**DOC:
		{
            title :`attributes`,
			description : `쉐이더에 등록된 attribute 정보들`,
			example : `인스턴스.attributes`,
			return : 'Object'
		}
	    :DOC*/
        this['attributes'] = {}
        /**DOC:
		{
            title :`uniforms`,
			description : `쉐이더에 등록된 uniform 정보들`,
			example : `인스턴스.uniforms`,
			return : 'Object'
		}
	    :DOC*/
        this['uniforms'] = {}
        self = this;
        // 프로그램생성!
        tProgram = tGL.createProgram();
        tGL.attachShader(tProgram, vShaderInfo['shader'])
        tGL.attachShader(tProgram, fShaderInfo['shader'])
        tGL.linkProgram(tProgram)
        // 프로그램 링크 확인
        if (!tGL.getProgramParameter(tProgram, tGL.LINK_STATUS)) throw "프로그램을 초기화 할 수 없습니다."
        tGL.useProgram(tProgram);
        info = {}
        tList.length = 0
        tList.push(vShaderInfo, fShaderInfo)
        tList.forEach(function (data) {
            if (data['parseData']) {
                data['parseData'].forEach(function (v) {
                    var tInfo;
                    tInfo = {}
                    v = v.split(' ')
                    if (v[0] == 'attribute') {
                        tInfo['location'] = tGL.getAttribLocation(tProgram, v[2]);
                        self['attributes'][v[2]] = tInfo
                    } else {
                        tInfo['location'] = tGL.getUniformLocation(tProgram, v[2]);
                        self['uniforms'][v[2]] = tInfo
                    }
                })
            }
        });
        /**DOC:
		{
            title :`program`,
			description : `실제 프로그램`,
			example : `인스턴스.uniforms`,
			return : 'WebGLProgram'
		}
	    :DOC*/
        this['program'] = tProgram
        /**DOC:
		{
            title :`shaderInfos`,
			description : `프로그램에 사용된 RedShaderInfo정보`,
			example : `인스턴스.shaderInfos`,
			return : 'Object'
		}
	    :DOC*/
        this['shaderInfos'] = {
            vShaderInfo: vShaderInfo,
            fShaderInfo: fShaderInfo
        }
        this['__UUID'] = REDGL_UUID++
         /**DOC:
		{
            title :`shaderInfos`,
            description : `
             //TODO: 이놈을 외부에서 주입해야하는구만..
             아마도 재질마다...필요한 유니폼들이 있을것이고..
             해당하는 경우만 본인이 따로 재징등에...적용해 줄수있어야한다.
             결국 프로그램이 유니폼에대한 정의를 내린다.
            `,
			example : `인스턴스.shaderInfos`,
			return : 'Object'
		}
	    :DOC*/
        this['makeUniformValue'] = makeUniformValue
        // 캐싱
        tDatas[key] = this
        Object.freeze(this)
        // console.log(this)
    }

    Object.freeze(RedProgramInfo)
})();