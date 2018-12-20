'use strict';
var lastCompiler;
lastCompiler = function () {
    console.log('라스트 파서!')
    var root;
    var tTarget
    var tCompileInfo, tLastCompileInfo
    var codeBox;
    var addStr = ""
    var resultStr = "";
    root = Recard.query('[nodeType="Result"]')
    codeBox = root.query('[codeBox]')
    codeBox.S('html', '')

    // 값이 있는 링크를 모드 찾는다.
    var tList;
    var lastCompileInfoList;
    var mergedUniformInfo;
    var mergedLastInfo;
    var tStr;
    var useLight;
    lastCompileInfoList = []
    tList = root.queryAll('[key]')
    tList = tList.filter(function (item) {
        if (item['prev']) return true
    })
    tList.forEach(function (v) {
        lastCompileInfoList.push(v['prev']['rootBox']['lastCompileInfo'])
    })
    console.log('병합할 정보들', lastCompileInfoList)
    mergedLastInfo = {
        uniforms: [],
        varyings: [],
        vars: [],
        header: [],
        body: [],
        footer: []
    }
    mergedUniformInfo = []
    lastCompileInfoList.forEach(function (v) {
        ('header,body,footer,uniforms,varyings,vars'.split(',')).forEach(function (key) {
            v[key].forEach(function (v2) {
                if (mergedLastInfo[key].indexOf(v2) == -1) mergedLastInfo[key].push(v2)
             
            })
        })
    })
    tList.forEach(function (v) {
        var tUniforms = v['prev']['rootBox']['compileInfo']['uniforms']
        for(var k in tUniforms){
            mergedUniformInfo.push(tUniforms[k])
        }
    })
    console.log('병합된 정보', mergedLastInfo)

    // 디퓨즈처리
    tTarget = root.query('[key="DIFFUSE"]')
    if (tTarget['prev']) {
        tTarget = tTarget['prev']
        console.log('//디퓨즈처리')
        console.log('타겟정보', tTarget)
        console.log('컴파일정보', tCompileInfo = tTarget['rootBox']['compileInfo'])
        console.log('최종컴파일정보', tLastCompileInfo = tTarget['rootBox']['lastCompileInfo'])
        var tName = 'uTexture_'+tCompileInfo['outLinkInfo']['COLOR'].split('_')[1]
        tStr = 'texelColor_DIFFUSE =' + tCompileInfo['outLinkInfo']['COLOR'] + ';\n'
        addStr += tStr
        mergedLastInfo['header'].push()
    }
    // 노말처리
    tTarget = root.query('[key="NORMAL"]')
    if (tTarget['prev']) {
        tTarget = tTarget['prev']
        console.log('//노말처리')
        console.log('타겟정보', tTarget)
        console.log('컴파일정보', tCompileInfo = tTarget['rootBox']['compileInfo'])
        console.log('최종컴파일정보', tLastCompileInfo = tTarget['rootBox']['lastCompileInfo'])
        tStr = 'texelColor_NORMAL =' + tCompileInfo['outLinkInfo']['COLOR'] + ';\n'
        addStr += tStr
    }
    // SPECULAR
    tTarget = root.query('[key="SPECULAR"]')
    if (tTarget['prev']) {
        tTarget = tTarget['prev']
        console.log('//SPECULAR처리')
        console.log('타겟정보', tTarget)
        console.log('컴파일정보', tCompileInfo = tTarget['rootBox']['compileInfo'])
        console.log('최종컴파일정보', tLastCompileInfo = tTarget['rootBox']['lastCompileInfo'])
        tStr = 'texelColor_SPECULAR =' + tCompileInfo['outLinkInfo']['COLOR'] + ';\n'
        addStr += tStr
    }

    mergedLastInfo['uniforms'].push('uniform int uUseNormalTexture;\n') // 노말텍스쳐 사용여부
    mergedLastInfo['uniforms'].push('uniform int uUseSpecularTexture;\n') // 노말텍스쳐 사용여부
    // 암비안트
    mergedLastInfo['uniforms'].push('uniform vec4 uAmbientLightColor;\n')
    //디렉셔널 리스트
    mergedLastInfo['uniforms'].push('uniform vec3 uDirectionnalLightDirection[DIRETIONAL_MAX];\n')
    mergedLastInfo['uniforms'].push('uniform vec4 uDirectionnalLightColor[DIRETIONAL_MAX];\n')
    mergedLastInfo['uniforms'].push('uniform int uDirectionalNum;\n')
    //포인트라이트
    mergedLastInfo['uniforms'].push('uniform vec4 uPointLightColor[POINT_MAX];\n')
    mergedLastInfo['uniforms'].push('uniform vec3 uPointLightPosition[POINT_MAX];\n')
    mergedLastInfo['uniforms'].push('uniform float uPointLightRadius[POINT_MAX];\n')
    mergedLastInfo['uniforms'].push('uniform int uPointNum;\n')
    mergedLastInfo['uniforms'].push('uniform float uShininess;\n')

    //베어링
    mergedLastInfo['varyings'].push('varying vec3 vEyeVec;\n')
    mergedLastInfo['varyings'].push('varying vec3 vNormal;\n')
    
    // 변수정의
    mergedLastInfo['varyings'].push('vec4 texelColor_DIFFUSE;\n') // 디퓨즈텍스쳐값
    mergedLastInfo['varyings'].push('vec4 texelColor_NORMAL;\n') // 노말텍스쳐값
    mergedLastInfo['varyings'].push('vec4 texelColor_SPECULAR;\n') // 스페큘러
    mergedLastInfo['varyings'].push('vec4 la;\n') // 암비언트
    mergedLastInfo['varyings'].push('vec4 ld;\n') // 디퓨즈
    mergedLastInfo['varyings'].push('vec4 ls;\n') // 스페큘러
    mergedLastInfo['varyings'].push('vec3 N;\n') // 노말벡터의 노말라이징
    mergedLastInfo['varyings'].push('vec3 L;\n') // 라이트 디렉션의 노말라이징
    mergedLastInfo['varyings'].push('vec3 R;\n') // 입사각에대한 반사값
    mergedLastInfo['varyings'].push('vec3 E;\n') // 아이벡터

    mergedLastInfo['varyings'].push('float lambertTerm;\n') // 램버트값
    mergedLastInfo['varyings'].push('float specular;\n') // 스페큘러값
    mergedLastInfo['varyings'].push('float specularTextureValue;\n') // 스페큘러 텍스쳐의 컬러값(r)

    mergedLastInfo['varyings'].push('vec3 pointDirection;\n') // 방향            
    mergedLastInfo['varyings'].push('float distanceLength;\n') // 거리
    mergedLastInfo['varyings'].push('float attenuation;\n')  // 감쇄

    mergedLastInfo['varyings'].push('vec4 finalColor;\n') // 최종컬러값

   
    // header추가
    mergedLastInfo['header']
    // body추가
    mergedLastInfo['body'].push(`
                    la = uAmbientLightColor;
                    ld = vec4(0.0, 0.0, 0.0, 1.0);
                    ls = vec4(0.0, 0.0, 0.0, 1.0);
                    if(texelColor_DIFFUSE.a==0.0) discard;
                    E = normalize(vEyeVec);
                    
                    if(uUseNormalTexture == 1) N = normalize(2.0 * (normalize(vNormal)+texelColor_NORMAL.rgb - 0.5));
                    else N = normalize(vNormal);
                
                    specularTextureValue = 1.0;
                    if(uUseSpecularTexture == 1) specularTextureValue = texelColor_SPECULAR.r ;

                   vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
                   if(uDirectionalNum>0){
                       for(int i=0;i<DIRETIONAL_MAX;i++){
                           if(i== uDirectionalNum) break;
                           L = normalize(uDirectionnalLightDirection[i]);
                           lambertTerm =dot(N,-L);
                           if(lambertTerm > 0.0){
                               ld += uDirectionnalLightColor[i] * texelColor_DIFFUSE * lambertTerm;
                               R = reflect(L, N);
                               specular = pow( max(dot(R, -L), 0.0), uShininess);
                               ls +=  specularLightColor * specular * specularTextureValue;
                           }
                       }
                   }               
                   for(int i=0;i<POINT_MAX;i++){
                       if(i== uPointNum) break;
                       pointDirection = -uPointLightPosition[i] -vEyeVec;
                       distanceLength = length(pointDirection);
                       if(uPointLightRadius[i]> abs(distanceLength)){
                           attenuation = 1.0 / (0.01 + 0.01 * distanceLength + 0.02 * distanceLength * distanceLength); 
                           L = normalize(pointDirection);
                           lambertTerm = dot(N,-L);
                           if(lambertTerm > 0.0){
                               ld += uPointLightColor[i] * texelColor_DIFFUSE * lambertTerm*attenuation;
                               R = reflect(L, N);
                               specular = pow( max(dot(R, -L), 0.0), uShininess);
                               ls +=  specularLightColor * specular * attenuation * specularTextureValue  ;
                           }
                       }
                   }     
                   `
    )
    // footer추가
    mergedLastInfo['footer'].push(
        'finalColor = la + ld + ls;\n',
        'finalColor.a = texelColor_DIFFUSE.a;\n',
        'gl_FragColor = finalColor;\n'
    )

    mergedLastInfo.header.push(addStr)

    console.log('mergedLastInfo',mergedLastInfo)
    
    resultStr +='precision lowp float;\n'
    resultStr +='const int DIRETIONAL_MAX = 16;\n'
    resultStr +='const int POINT_MAX = 16;\n'
    // resultStr += '//define uniforms;\n'
    resultStr += mergedLastInfo.uniforms.join('')
    // resultStr += '//define varyings;\n'
    resultStr += mergedLastInfo.varyings.join('')
    // resultStr += '//define vars;\n'
    resultStr += mergedLastInfo.vars.join('')
    // resultStr += '//define main \n'
    resultStr += 'void main(void){ \n'
    resultStr += mergedLastInfo.header.join('')
    resultStr += mergedLastInfo.body.join('')
    resultStr += mergedLastInfo.footer.join('')
    resultStr += '\n}'
    codeBox.S(
        'html', resultStr
    )
    Prism.highlightAll()

   

    var tUniforms = mergedLastInfo['uniforms']
    tUniforms.forEach(function(v){
        var t1= v.split(' ')
        mergedUniformInfo.push({
            type: t1[0],
            dataType: t1[1],
            varName: t1[2],
            varCompiledName : t1[2] 
        })
    })
    console.log('mergedUniformInfo',mergedUniformInfo)
    Recard.PREVIEW.setTest(null,resultStr,mergedUniformInfo)
}
