"use strict";
var RedSkyBoxInfo;
/**DOC:
    {
        constructorYn : true,
        title :`RedSkyBoxInfo`,
        description : `
            <h2>RedMeshBaseInfo 상속객체</h2>
            - 기본 스카이박스 생성기
        `,
        params:{
            redGL : [
                {type:'Red Instance'},
                'redGL 인스턴스'
            ],
            srcList : [
                {type:'Array'},
                `
                    tGL.TEXTURE_CUBE_MAP_POSITIVE_X<br>
                    tGL.TEXTURE_CUBE_MAP_NEGATIVE_X<br>
                    tGL.TEXTURE_CUBE_MAP_POSITIVE_Y<br>
                    tGL.TEXTURE_CUBE_MAP_NEGATIVE_Y<br>
                    tGL.TEXTURE_CUBE_MAP_POSITIVE_Z<br>
                    tGL.TEXTURE_CUBE_MAP_NEGATIVE_Z<br>
                순으로 입력
                `
            ]
        },
        return : 'RedSkyBoxInfo Instance'
    }
:DOC*/
(function () {
    RedSkyBoxInfo = function (redGL, srcList) {
        if (!(this instanceof RedSkyBoxInfo)) return new RedSkyBoxInfo(redGL, srcList)
        if (!(redGL instanceof RedGL)) throw 'RedGL 인스턴스만 허용됩니다.'
        if (!(srcList instanceof Array)) throw 'srcList는 Array만 허용됩니다.'
        if (srcList.length != 6) throw 'srcList는 6개여야 합니다.'
        RedMeshBaseInfo.call(this, redGL)
        this['materialInfo'] = RedMaterialInfo(redGL, 'skybox', RedCubeTextureInfo(redGL, srcList))
        this['geometryInfo'] = RedPrimitive.cube(redGL)
        this['scale'][0] = 1000//TODO: 카메라 far 물어야함
        this['scale'][1] = 1000
        this['scale'][2] = 1000
        this['cullFace'] = redGL.gl.FRONT
    }
    Object.freeze(RedSkyBoxInfo)
})();