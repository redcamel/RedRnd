"use strict";
var RedSceneInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedSceneInfo`,
        description : `
            - RedGL에서 사용할 Scene정보를 생성
        `,
        params : {
            redGL : [
                {type:'RedGL Instance'},
                '- redGL 인스턴스'
            ],
            key : [
                {type:'String'},
                '- 존재하는 키일경우 에러.'
            ],
            camera : [
                {type:'RedBaseCamera'},
                '- 사용할 카메라 객체등록'
            ]
        },
        example : `
            var test;
            test = RedGL(Canvas Element)
            // firstScene 키로 Scene생성
            RedSceneInfo(test,'firstScene')
        `,
        return : 'RedSceneInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedSceneInfo = function (redGL, key, camera) {
        if (!(this instanceof RedSceneInfo)) return new RedSceneInfo(redGL, key, camera)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key는 문자열만 허용됩니다.'
        if (!(camera instanceof RedBaseCamera)) throw 'camera는 RedBaseCamera 인스턴스만 허용됩니다.'
        // 저장할 공간확보하고
        if (!redGL['__datas']['RedSceneInfo']) redGL['__datas']['RedSceneInfo'] = {}
        tDatas = redGL['__datas']['RedSceneInfo']
        // 기존에 등록된 녀석이면 퐈이어!
        if (tDatas[key]) throw key + '는 이미 존재하는 RedSceneInfo 입니다.'
        /**DOC:
		{
            title :`children`,
			description : `씬이 물고있는 Mesh리스트들`,
			example : `인스턴스.children`,
			return : 'Array'
        }
        :DOC*/
        this['children'] = []
        /**DOC:
		{
            title :`camera`,
			description : `씬이 가지고있는 카메라`,
			example : `인스턴스.camera`,
			return : 'RedBaseCamera'
        }
        :DOC*/
        this['camera'] = camera
        this['lights'] = {
            ambient : [],
            directional : [],
            point : [],
            spot : []
        }
        this['__UUID'] = REDGL_UUID++
        // 캐싱
        tDatas[key] = this
        Object.seal(RedSceneInfo)
    }
    RedSceneInfo.prototype = {
        /**DOC:
		{
            title :`setSkyBox`,
            description : `스카이박스 설정`,
            code:'FUNCTION',
			example : `인스턴스.setSkyBox`
        }
        :DOC*/
        setSkyBox: function (v) {
            this['skyBox'] = v
        },
        /**DOC:
		{
            title :`setGrid`,
            description : `그리드 설정`,
            code:'FUNCTION',
			example : `인스턴스.setGrid`
        }
        :DOC*/
        setGrid: function (v) {
            this['grid'] = v
        },
          /**DOC:
		{
            title :`addLight`,
            description : `라이트 설정`,
            code:'FUNCTION',
			example : `인스턴스.addLight`
        }
        :DOC*/
        addLight: (function () {
            var tDatas;
            return function (v) {
                if (v instanceof RedDirectionalLightInfo) {
                    tDatas = this['lights'][RedDirectionalLightInfo.TYPE]
                    if (tDatas.length == 16) throw '직사광 최대갯수는 16개입니다.'
                    else tDatas.push(v)
                }else if (v instanceof RedPointLightInfo) {
                    tDatas = this['lights'][RedPointLightInfo.TYPE]
                    if (tDatas.length == 16) throw '포인트라이트 최대갯수는 16개입니다.'
                    else tDatas.push(v)
                }else if (v instanceof RedSpotLightInfo) {
                    tDatas = this['lights'][RedSpotLightInfo.TYPE]
                    if (tDatas.length == 16) throw '스폿라이트 최대갯수는 16개입니다.'
                    else tDatas.push(v)
                } else throw '등록할수 없는 타입입니다.'
            }
        })()
    }
    Object.freeze(RedSceneInfo)
})();