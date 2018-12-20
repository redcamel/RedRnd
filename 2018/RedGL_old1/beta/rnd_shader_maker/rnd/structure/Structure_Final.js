'use strict';
var Structure_Final;
(function () {
    var index;
    var parseFragment, parseVertex;
    var self;
    index = 0
    parseFragment = function (fragmentDefineInfo) {
        var resultStr;
        var k, tData;
        self = this;

        if (!fragmentDefineInfo) return ''
        resultStr = ''
        console.log(fragmentDefineInfo)
        resultStr += Structure_Final_FS_Info['define_fragment'];
        ['uniforms', 'varyings', 'vars', 'functions'].forEach(function (key) {
            tData = fragmentDefineInfo[key]
            // resultStr += '//define ' + key + ';\n'
            var tN;
            tN = ';\n'
            if (key == 'functions') tN = '\n'
            for (k in tData) {
                if (resultStr.indexOf(tData[k]) == -1) resultStr += tData[k] + tN
            }
        })
        resultStr += 'void main(void) {\n';
        resultStr += '    //define headers;\n';
        //////////////////////////////////////////////////////////////////////
        ['DIFFUSE', 'NORMAL', 'SPECULAR'].forEach(function (v) {
            var tInput;
            tInput = self['structureBase']['input']
            if (tInput[v] && tInput[v]['from']) {
                var tStr = '    vec4 texelColor_' + v + ' = ' + tInput[v]['from']['info']['sourceKey']
                if (fragmentDefineInfo['headers'].indexOf(tStr) == -1) {
                    fragmentDefineInfo['headers'].push(tStr)
                }
            }
        });
        fragmentDefineInfo['headers'].forEach(function (v) { resultStr += v + ';\n' })
        //////////////////////////////////////////////////////////////////////
        if (resultStr.indexOf('texelColor_DIFFUSE') == -1) resultStr += '    vec4 texelColor_DIFFUSE;\n'
        if (resultStr.indexOf('texelColor_NORMAL') == -1) resultStr += '    vec4 texelColor_NORMAL;\n'
        if (resultStr.indexOf('texelColor_SPECULAR') == -1) resultStr += '    vec4 texelColor_SPECULAR;\n'
        resultStr += Structure_Final_FS_Info['lightBase'];
        resultStr += '    //define bodys;\n'
        fragmentDefineInfo['bodys'].forEach(function (v) { resultStr += v + ';\n' })
        resultStr += '    //define footers;\n'
        fragmentDefineInfo['footers'].forEach(function (v) { resultStr += v + ';\n' })
        resultStr += Structure_Final_FS_Info['lightCalc'];
        resultStr += `
        
finalColor = la + ld + ls;
finalColor.a = texelColor_DIFFUSE.a;  
gl_FragColor = finalColor;   
`
        resultStr += '}\n'
        return resultStr
    }
    parseVertex = function (vertexDefineInfo) {
        var resultStr;
        var k, tData;
        self = this;
        resultStr = ''
        console.log(vertexDefineInfo)
        if (!vertexDefineInfo) return ''
        resultStr += Structure_Final_VS_Info['define_vertex'];
        ['uniforms', 'varyings', 'vars', 'functions'].forEach(function (key) {
            tData = vertexDefineInfo[key]
            // resultStr += '//define ' + key + ';\n'
            var tN;
            tN = ';\n'
            if (key == 'functions') tN = '\n'
            for (k in tData) {
                if (resultStr.indexOf(tData[k]) == -1) resultStr += tData[k] + tN
            }
        })
        resultStr += 'void main(void) {\n';
        resultStr += '    //define headers;\n';
        //////////////////////////////////////////////////////////////////////
        ['DISPLACEMENT'].forEach(function (v) {
            var tInput;
            tInput = self['structureBase']['input']
            if (tInput[v] && tInput[v]['from']) {
                var tStr = '    vec4 texelColor_' + v + ' = ' + tInput[v]['from']['info']['sourceKey']
                if (vertexDefineInfo['headers'].indexOf(tStr) == -1) {
                    vertexDefineInfo['headers'].push(tStr)
                }
            }
        });
        resultStr += `
        vertexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
        vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
        vNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
        vEyeVec = -vertexPositionEye4.xyz;
        vSystemTime = uSystemTime;
        vSystemResolution = uSystemResolution;
        vScreenXY = vec2(0.0);
        vScreenXY.x = (  vertexPositionEye4.x + 1.0 ) * vSystemResolution[0]  / 2.0;
	    vScreenXY.y = ( -vertexPositionEye4.y + 1.0 ) * vSystemResolution[1] / 2.0;
        
        `
        vertexDefineInfo['headers'].forEach(function (v) { resultStr += v + ';\n' })
        if (resultStr.indexOf('texelColor_DISPLACEMENT') == -1) resultStr += '    vec4 texelColor_DISPLACEMENT;\n'
        resultStr += `
        if(texelColor_DISPLACEMENT != nullVec4) {
            vertexPositionEye4.xyz += normalize(vNormal) * texelColor_DISPLACEMENT.x;
        }
        `
        //////////////////////////////////////////////////////////////////////
        resultStr += '    //define bodys;\n'
        vertexDefineInfo['bodys'].forEach(function (v) { resultStr += v + ';\n' })
        resultStr += `
         // 포지션 결정
        gl_Position = uPMatrix * uCameraMatrix *  vertexPositionEye4;
        `
        resultStr += '    //define footers;\n'
        vertexDefineInfo['footers'].forEach(function (v) { resultStr += v + ';\n' })
        resultStr += '}\n'
        return resultStr
    }
    Structure_Final = function () {
        var self;
        self = this;
        this['nodeType'] = 'Final'
        this['index'] = index
        this['structureBase'] = {
            input: {
                DIFFUSE: { dataType: 'vec4', from: null, shaderType: 'fragment' },
                NORMAL: { dataType: 'vec4', from: null, shaderType: 'fragment' },
                SPECULAR: { dataType: 'vec4', from: null, shaderType: 'fragment' },
                DISPLACEMENT: { dataType: 'vec4', from: null, shaderType: 'vertex' },
            }
        };
        ['functions', 'textureInfo', 'input', 'output'].forEach(function (k) {
            if (!self['structureBase'][k]) self['structureBase'][k] = {}
        });
        this['parse'] = function (vertexDefineInfo, fragmentDefineInfo) {
            return [
                parseVertex.apply(this, [vertexDefineInfo]),
                parseFragment.apply(this, [fragmentDefineInfo])
            ]
        }
        index++
        console.log(this)
    }
    Object.freeze(Structure_Final)
})();