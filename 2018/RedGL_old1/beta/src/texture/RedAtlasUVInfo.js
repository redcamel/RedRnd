"use strict";
/**DOC:
    {
        constructorYn : true,
        title :`RedAtlasUVInfo`,
        description : `
            - <b>RedAtlasTextureManager</b>에 의해 자동 생성된 <b>RedAtlasUVInfo</b>.
            - <span style="color:red">렌더링시 고정 유니폼인 <b>uAtlascoord</b>에 사용된다.</span>
            - 사용자 생성은 금지한다.
            - Object.freeze 상태로 반환.
        `,
        params : {
            uvArray : [
                {type:'Array'},
                '- 생성초기값'
            ]
        },
        return : 'RedAtlasUVInfo instance'
    }
:DOC*/
var RedAtlasUVInfo;
RedAtlasUVInfo = (function(){
    var t0;
    t0 = [0, 0, 1, 1].toString();
    return function (uvArray) {
        if (!(this instanceof RedAtlasUVInfo)) return new RedAtlasUVInfo(uvArray)
        if (!(uvArray instanceof Array)) throw 'uvArray는 Array만 허용합니다.'
       
        this['value'] = new Float32Array(uvArray)
        this['value']['__UUID'] = this['__UUID'] = uvArray.toString() == t0 ? 1 : REDGL_UUID++
        Object.freeze(this)
    }
})()