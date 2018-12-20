<html>

<head>
    <meta charset="UTF-8">
    <title>방향광테스트</title>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi"
    />
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden
        }
    </style>
    <script id="shader-fs-bitmap-light" type="x-shader/x-fragment">
        precision lowp float;
        varying vec2 vTexcoord;
        uniform sampler2D uTexture;

        varying vec3 vEyeVec;
        varying vec3 vNormal;

        //디렉셔널 리스트
        const int DIRETIONAL_MAX = 16;
        uniform vec3 uDirectionnalLightDirection[DIRETIONAL_MAX];
        uniform vec4 uDirectionnalLightColor[DIRETIONAL_MAX];
        uniform int uDirectionalNum;

        //포인트라이트
        const int POINT_MAX = 16;
        uniform vec4 uPointLightColor[POINT_MAX];      
        uniform vec3 uPointLightPosition[POINT_MAX];
        uniform float uPointLightRadius[POINT_MAX];
        uniform int uPointNum;

        //스팟
        const int SPOT_MAX = 16;
        uniform vec4 uSpotLightColor[SPOT_MAX];      
        uniform vec3 uSpotLightPosition[SPOT_MAX];
        uniform vec3 uSpotLightDirection[SPOT_MAX];
        uniform int uSpotNum;
        uniform float uSpotCosCuttoff[SPOT_MAX];  // 한계치설정
        uniform float uSpotExponent[SPOT_MAX];// 경계면을 부드럽게
        

        uniform float uShininess;
        
        void main(void) {
            vec4 la = vec4(0.03, 0.03, 0.03, 1.0);
            vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);
            vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);
            vec4 texelColor = texture2D(uTexture, vTexcoord);
            vec3 N = normalize(vNormal);
            vec3 L;
            vec3 R;
            vec3 E = normalize(vEyeVec);
            float lambertTerm;
            float specular;
            vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
            // 디렉셔널
            if(uDirectionalNum>0){
                for(int i=0;i<DIRETIONAL_MAX;i++){
                    if(i== uDirectionalNum) break;
                    L = normalize(uDirectionnalLightDirection[i]);
                    lambertTerm = dot(N,-L);
                    if(lambertTerm > 0.0){
                        ld += uDirectionnalLightColor[i] * texelColor * lambertTerm;
                        R = reflect(L, N);
                        specular = pow( max(dot(R, -L), 0.0), uShininess);
                        ls +=  specularLightColor * specular;
                    }
                }
            }
            // 점광
            vec3 pointLightDirection; // 방향            
            float distance; // 거리
            float attenuation;  // 감쇄
            if(uPointNum>0){
                for(int i=0;i<POINT_MAX;i++){
                    if(i== uPointNum) break;
                    pointLightDirection = -uPointLightPosition[i] -vEyeVec;
                    distance = length(pointLightDirection);
                    if(distance<0.0) distance = 0.0;
                    attenuation = 1.0 / (0.01 + 0.01 * distance + 0.02 * distance * distance); 
                    L = normalize(pointLightDirection);
                    lambertTerm = dot(N,-L);
                    if(lambertTerm > 0.0){
                        ld += uPointLightColor[i] * texelColor * lambertTerm * attenuation;
                        R = reflect(L/distance/distance * uPointLightRadius[i], N);
                        specular = pow( max(dot(R, -L), 0.0), uShininess);
                        ls +=  specularLightColor * specular * attenuation ;
                    }
                }      
            }
            // 스폿
      
            vec3 tempDistance; // 조명과 표면사이의 거리
            if(uSpotNum>0){
                for(int i=0;i<SPOT_MAX;i++){
                    if(i== uSpotNum) break;
                    // 거리
                    tempDistance = -uSpotLightPosition[i]-vEyeVec;
                    distance = length(tempDistance); ;
                    if(distance<0.0) distance = 0.0;
                    // 감쇄 구하고            
                    // TODO: 실제거리간의 보간을 어떻게 지정할껀지...결정해야함...
                    attenuation = 1.0 / (0.01 + 0.01 * distance + 0.02 * distance * distance) *distance; 

                    // 표면과 라이트의 방향을 구함
                    L = normalize(tempDistance);
                    float spotEffect = dot(normalize(uSpotLightDirection[i]),L);
                 

                    lambertTerm = dot(N,-L);
                    if(lambertTerm > 0.0 ){
                        if(spotEffect > uSpotCosCuttoff[i]){
                            spotEffect = pow(spotEffect,uSpotExponent[i]);
                            attenuation *=spotEffect;
                            R = reflect(L, N);
                            specular = pow( max(dot(R, -normalize(uSpotLightDirection[i])), 0.0), uShininess);
                            ld += uSpotLightColor[i] * texelColor * lambertTerm * attenuation;
                            ls +=  specularLightColor * specular * attenuation ;
                        }
                    }
                }
            }
        
            //
            vec4 finalColor = la + ld + ls;
            finalColor.a = 1.0;            
            gl_FragColor = finalColor;   
        }
    </script>
    <script id="shader-vs-bitmap-light" type="x-shader/x-vertex">
            attribute vec3 aVertexPosition;
            attribute vec3 aVertexNormal;
            attribute vec2 aTexcoord;
            // 기본유니폼
            uniform mat4 uMVMatrix;
            uniform mat4 uNMatrix;
            uniform mat4 uCameraMatrix;            
            uniform mat4 uPMatrix;
            uniform vec4 uAtlascoord;
            // 베어링들
            varying vec2 vTexcoord;  
            
            varying vec3 vEyeVec;
            varying vec3 vNormal;


            void main(void) {
                vec4 vectexPositionEye4 = uMVMatrix * vec4(aVertexPosition, 1.0);
                vTexcoord = uAtlascoord.xy + aTexcoord*uAtlascoord.zw;
                vNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0)); 
                vEyeVec = -vectexPositionEye4.xyz;
                
                // 포지션 결정
                gl_Position = uPMatrix * uCameraMatrix *  vectexPositionEye4;
            }
    </script>
    <script id="shader-fs-skybox" type="x-shader/x-fragment">
        precision lowp float;
        varying vec3 vCubeCoord;
        uniform samplerCube uSkybox;
        void main() {
            gl_FragColor = textureCube(uSkybox, vCubeCoord);
        }
</script>
<script id="shader-vs-skybox" type="x-shader/x-vertex">
        attribute vec3 aVertexPosition;
        uniform mat4 uMVMatrix;
        uniform mat4 uCameraMatrix;   
        uniform mat4 uPMatrix;
        varying vec3 vCubeCoord;  
        void main(void) {
            gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
            vec4 cubeNormal =  uMVMatrix *vec4(-aVertexPosition, 0.0);
            vCubeCoord = cubeNormal.xyz;
        }
</script>
    <script id="shader-fs" type="x-shader/x-fragment">
                    precision lowp float;
                    uniform vec3 uColor;
                    void main(void) {
                        gl_FragColor = vec4(uColor, 1.0);
                    }
            </script>
    <script id="shader-vs" type="x-shader/x-vertex">
                    attribute vec3 aVertexPosition;     
                    uniform mat4 uMVMatrix;
                    uniform mat4 uCameraMatrix;
                    uniform mat4 uPMatrix;         
                    void main(void) {
                        gl_Position = uPMatrix * uCameraMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
                    }
            </script>
            <script type="text/javascript" src="lib/gl-matrix-min.js"></script>
            <script src="RedShaderInfo.js"></script>
            <script src="RedProgramInfo.js"></script>
            <script src="RedBaseCamera.js"></script>
            <script src="RedCubeTextureInfo.js"></script>    
            <script src="RedBufferInfo.js"></script>
            <script src="RedFixedAttributeKey.js"></script>
            <script src="RedGeometryInfo.js"></script>
            <script src="RedMeshInfo.js"></script>
            <script src="RedMeshBaseInfo.js"></script>    
            <script src="RedPrimitive.js"></script>    
            <script src="RedDirectionalLightInfo.js"></script>       
            <script src="RedPointLightInfo.js"></script>
            <script src="RedSpotLightInfo.js"></script>            
            <script src="RedMaterialInfo.js"></script>
            <script src="RedMaterialDefine.js"></script>
            <script src="RedSceneInfo.js"></script>
            <script src="RedTextureInfo.js"></script>
            <script src="RedAtlasUVInfo.js"></script>
            <script src="RedAtlasInfo.js"></script>
            <script src="RedAtlasTextureManager.js"></script>
            <script src="RedAtlasTextureInfo.js"></script>
            <script src="RedRender.js"></script>
            <script src="RedGLDetect.js"></script>
            <script src="RedSkyBoxInfo.js"></script>
            <script src="redGL.js"></script>
            <script src="Atlas.js"></script>

</head>

<body>
        
    <canvas id="test" style="border: none;background:red" width="1280" height="768"></canvas>
    <script src="index4.js"></script>
</body>

</html>