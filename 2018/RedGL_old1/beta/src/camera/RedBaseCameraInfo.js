"use strict";
var RedBaseCameraInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedBaseCameraInfo`,
        description : `
            - RedBaseCameraInfo 가장 기본적인 카메라 생성기
        `,
        example : `
            testGL.createBaseCameraInfo('testCamera')
        `,
        return : 'RedBaseCameraInfo Instance'
    }
:DOC*/
(function () {
    var tDatas;
    RedBaseCameraInfo = function (redGL, key) {
        if (!(this instanceof RedBaseCameraInfo)) return new RedBaseCameraInfo(redGL, key)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (typeof key != 'string') throw 'key는 문자열만 허용됩니다.'
        var aspect
        // 저장공간확보
        if (!redGL['__datas']['RedBaseCameraInfo']) redGL['__datas']['RedBaseCameraInfo'] = {}
        tDatas = redGL['__datas']['RedBaseCameraInfo']
        // 기존에 등록된 녀석이면 퐈이어!
        if (tDatas[key]) throw key + '는 이미 존재하는 RedBaseCameraInfo 입니다.'
        /**DOC:
            {
                title :`uPMatrix`,
                code : 'PROPERTY',
                description : `
                    - 퍼스펙티브 매트릭스
                    - 고정유니폼으로서 쉐이더내에 uPMatrix 유니폼과 연동된다.
                `,
                return : 'mat4(Float32Arrat)'
            }
        :DOC*/
        Object.defineProperty(this, 'uPMatrix', {
            value: mat4.create(),
            enumerable: true
        })
        /**DOC:
            {
                title :`uCameraMatrix`,
                description : `
                    - 카메라 매트릭스
                    - 고정유니폼으로서 쉐이더내에 uCameraMatrix 유니폼과 연동된다.
                `,
                return : 'mat4(Float32Arrat)'
            }
        :DOC*/
        Object.defineProperty(this, 'uCameraMatrix', {
            value: mat4.create(),
            enumerable: true
        })
        /**DOC:
            {
                title :`fov`,
                description : `
                    - 카메라 fov
                    - 기본값 45(실제 연산시에는 라디안으로 적용해서 계산됨)
                `,
                return : 'Number'
            }
        :DOC*/
        this['fov'] = 45
        /**DOC:
            {
                title :`aspect`,
                description : `- 카메라 aspect`,
                return : 'Number'
            }
        :DOC*/
        this['aspect'] = 0.1;
        /**DOC:
            {
                title :`near`,
                description : `
                    - 카메라 near
                    - 기본값 0.1
                `,
                return : 'Number'
            }
        :DOC*/
        this['near'] = 0.1
        /**DOC:
            {
                title :`far`,
                description : `
                    - 카메라 far
                    - 기본값 1000.0
                `,
                return : 'Number'
            }
        :DOC*/
        this['far'] = 10000.0
        Object.defineProperty(this, '__desiredCoords', {
            value: new Float32Array([0, 0, 0]),
            enumerable: true
        })
        Object.defineProperty(this, '__desiredRotation', {
            value: new Float32Array([0, 0, 0]),
            enumerable: true
        })
        this['__UUID'] = REDGL_UUID++
        this['__canvas'] = redGL.__canvas
        this.update()
        // 캐싱
        tDatas[key] = this
    }
    RedBaseCameraInfo.prototype = {
        /**DOC:
            {
                title :`setPosition`,
                code : 'FUNCTION',
                description : `
                    - 포지션 설정매서드.
                `,
                params : {
                    x : [
                        {type:'Number'},
                        `x포지션`
                    ],
                    y : [
                        {type:'Number'},
                        `y포지션`
                    ],
                    z : [
                        {type:'Number'},
                        `z포지션`
                    ]
                },
                return : 'RedBaseCameraInfo Instance'
            }
        :DOC*/
        setPosition: function (x, y, z) {
            this['__desiredCoords'][0] = x
            this['__desiredCoords'][1] = y
            this['__desiredCoords'][2] = z
            return this
        },
        /**DOC:
            {
                title :`moveForward`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 앞으로 이동
                `,
                return : 'RedBaseCameraInfo Instance'
            }
        :DOC*/
        moveForward: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveBack`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 뒤로 이동
                `,
                return : 'RedBaseCameraInfo Instance'
            }
        :DOC*/
        moveBack: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveLeft`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 왼쪽으로 이동
                `,
                return : 'RedBaseCameraInfo Instance'
            }
        :DOC*/
        moveLeft: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveRight`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 오른쪽으로 이동
                `,
                return : 'RedBaseCameraInfo Instance'
            }
        :DOC*/
        moveRight: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveUp`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 위로 이동
                `,
                return : 'RedBaseCameraInfo Instance'
            }
        :DOC*/
        moveUp: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`moveDown`,
                code : 'FUNCTION',
                description : `
                    - TODO: 카메라 시점에서 아래로 이동
                `,
                return : 'RedBaseCameraInfo Instance'
            }
        :DOC*/
        moveDown: function (v) {
            //TODO:
        },
        /**DOC:
            {
                title :`lookAt`,
                code : 'FUNCTION',
                description : `
                    - 카메라가 targetPosition을 바라보게 설정함.
                `,
                params : {
                    targetPosition : [
                        {type:'position vec3(Float32Array)'},
                        `바라볼 포지션`
                    ]
                },
                return : 'RedBaseCameraInfo Instance'
            }
        :DOC*/
        lookAt: (function () {
            var up = new Float32Array([0, 1, 0]);
            return function (targetPosition) {
                //out, eye, center, up
                mat4.lookAt(this['uCameraMatrix'], this['__desiredCoords'], targetPosition, up);
            }
        })(),
        /**DOC:
            {
                title :`update`,
                code : 'FUNCTION',
                description : `
                    - 퍼스팩티브업데이트
                `,
                return : 'RedBaseCameraInfo Instance'
            }
        :DOC*/
        update: (function () {
            return function () {
                // 퍼스펙티브만 관여
                this['aspect'] = this['__canvas'].width / this['__canvas'].height
                mat4.identity(this['uPMatrix'])
                mat4.perspective(this['uPMatrix'], this['fov'] * Math.PI / 180, this['aspect'], this['near'], this['far'])
                return this
            }
        })()
    }
    Object.freeze(RedBaseCameraInfo)
})();