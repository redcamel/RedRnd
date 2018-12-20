"use strict";
{
	//////////////////////////////////////////////////////////////////////////
	// 상수세팅
	const uPMatrix = 'uPMatrix'
	const uNormalMatrix = 'uNormalMatrix'
	const uCameraMatrix = 'uCameraMatrix'
	const aVertexPosition = 'aVertexPosition'
	const aVertexNormal = 'aVertexNormal'
	const aTextureCoord = 'aTextureCoord'
	const uVS = 'uVS'
	const uFS = 'uFS'
	const uPARENT = 'uPARENT'
	const vTextureCoordinate = 'vTextureCoordinate'
	const uSampler = 'uSampler'
	const uSamplerSpecular = 'uSamplerSpecular'
	const uSamplerNormal = "uSamplerNormal"
	//////////////////////////////////////////////////////////////////////////
	// 광원상수 세팅
	const vLight = 'vLight'
	const vTransformedNormal = 'vTransformedNormal'
	//////////////////////////////////////////////////////////////////////////
	// 상수선언세팅
	const C_uPMatrix = `uniform mat4 ${uPMatrix};`
	const C_uNormalMatrix = `uniform mat4 ${uNormalMatrix};`
	const C_uCameraMatrix = `uniform mat4 ${uCameraMatrix};`
	const C_aVertexPosition = `attribute vec3 ${aVertexPosition};`
	const C_aVertexNormal = `attribute vec3 ${aVertexNormal};`
	const C_aTextureCoord = `attribute vec2 ${aTextureCoord};`
	const C_uVS = `uniform float ${uVS}[30];`
	const C_uFS = `uniform float ${uFS}[30];`
	const C_uPARENT = `uniform float ${uPARENT}[64];`
	const C_vTextureCoordinate = `varying vec2 ${vTextureCoordinate};`
	const C_vLight = `varying vec3 ${vLight};`
	const C_vTransformedNormal = `varying vec3 ${vTransformedNormal};`
	const C_uSampler = `uniform sampler2D ${uSampler};`
	const C_uSamplerSpecular = `uniform sampler2D ${uSamplerSpecular};`
	const C_uSamplerNormal = `uniform sampler2D ${uSamplerNormal};`
	const C_precision = 'precision highp float;' // 기본 precision 선언
	//////////////////////////////////////////////////////////////////////////
	// 기본 함수 선언
	const VS_FUNC = `
	mat4 positionMTX( float x, float y, float z){
       return mat4( 1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1 );
    }
    mat4 scaleMTX( float x, float y, float z){
       return mat4( x,0,0,0, 0,y,0,0, 0,0,z,0, 0,0,0,1 );
    }
    mat4 rotationMTX( float x, float y, float z){
       x = radians(x);
       y = radians(y);
       z = radians(z);
       float s = sin(x);
       float c = cos(x);
       mat4 m1 = mat4( 1,0,0,0,   0,c,s,0,   0,-s,c,0,  0,0,0,1);
       s = sin(y);c = cos(y);
       mat4 m2 = mat4( c,0,-s,0,  0,1,0,0,   s,0,c,0,   0,0,0,1);
       s = sin(z);c = cos(z);
       mat4 m3 = mat4( c,s,0,0,   -s,c,0,0,   0,0,1,0,  0,0,0,1);
       return m3*m2*m1;
    }

    `
	//////////////////////////////////////////////////////////////////////////
	// 기본 MVP 계산식
	const BASE_MVP_CAL = `
		positionMTX( ${uVS}[3], ${uVS}[4], ${uVS}[5] )
        * rotationMTX( ${uVS}[6], ${uVS}[7], ${uVS}[8] )
        * scaleMTX( ${uVS}[0], ${uVS}[1], ${uVS}[2] )
	`
	const BASE_POSITION_ROTATION_MTX_CAL = `
		positionMTX( ${uVS}[3], ${uVS}[4], ${uVS}[5] ) * rotationMTX( ${uVS}[6], ${uVS}[7], ${uVS}[8] )
	`
	const BASE_PARENT_POSITION_ROTATION_CAL1 = `
		positionMTX( ${uPARENT}[1], ${uPARENT}[2], ${uPARENT}[3] )
        * rotationMTX( ${uPARENT}[4], ${uPARENT}[5], ${uPARENT}[6] )
	`
	const BASE_PARENT_POSITION_ROTATION_CAL2 = `
		positionMTX( ${uPARENT}[10], ${uPARENT}[11], ${uPARENT}[12] )
        * rotationMTX( ${uPARENT}[13], ${uPARENT}[14], ${uPARENT}[15] )
	`
	const BASE_PARENT_POSITION_ROTATION_CAL3 = `
		positionMTX( ${uPARENT}[19], ${uPARENT}[20], ${uPARENT}[21] )
        * rotationMTX( ${uPARENT}[22], ${uPARENT}[23], ${uPARENT}[24] )
	`
	const BASE_PARENT_POSITION_ROTATION_CAL4 = `
		positionMTX( ${uPARENT}[28], ${uPARENT}[29], ${uPARENT}[30] )
        * rotationMTX( ${uPARENT}[31], ${uPARENT}[32], ${uPARENT}[33] )
	`
	const BASE_PARENT_POSITION_ROTATION_CAL5 = `
		positionMTX( ${uPARENT}[37], ${uPARENT}[38], ${uPARENT}[39] )
        * rotationMTX( ${uPARENT}[40], ${uPARENT}[41], ${uPARENT}[42] )
	`
	const ALL_MVP_CAL = `
		mat4 parentMVP;
        // 이걸 사원수로 해야하나...
        if(${uPARENT}[0]==0.0) parentMVP = mat4( 1,0,0,0,   0,1,0,0,   0,0,1,0,  0,0,0,1);
        else if(${uPARENT}[0]==1.0) parentMVP = ${BASE_PARENT_POSITION_ROTATION_CAL1};
        else if(${uPARENT}[0]==2.0) parentMVP = ${BASE_PARENT_POSITION_ROTATION_CAL2}
                                              * ${BASE_PARENT_POSITION_ROTATION_CAL1};
        else if(${uPARENT}[0]==3.0) parentMVP = ${BASE_PARENT_POSITION_ROTATION_CAL3}
                                              * ${BASE_PARENT_POSITION_ROTATION_CAL2}
                                              * ${BASE_PARENT_POSITION_ROTATION_CAL1};
        else if(${uPARENT}[0]==4.0) parentMVP = ${BASE_PARENT_POSITION_ROTATION_CAL4}
                                              * ${BASE_PARENT_POSITION_ROTATION_CAL3}
                                              * ${BASE_PARENT_POSITION_ROTATION_CAL2}
                                              * ${BASE_PARENT_POSITION_ROTATION_CAL1};
        else if(${uPARENT}[0]==4.0) parentMVP = ${BASE_PARENT_POSITION_ROTATION_CAL5}
						                      * ${BASE_PARENT_POSITION_ROTATION_CAL4}
						                      * ${BASE_PARENT_POSITION_ROTATION_CAL3}
						                      * ${BASE_PARENT_POSITION_ROTATION_CAL2}
						                      * ${BASE_PARENT_POSITION_ROTATION_CAL1};
        gl_Position = ${uPMatrix} * ${uCameraMatrix} * parentMVP * ${BASE_MVP_CAL} * vec4( ${aVertexPosition}, 1.0 );
	`
	// FLAT LIGHT 계산식
	// TODO 라이트 값은 어떻게 받을지 고민좀 해봐야함
	// TODO 이번에도 spot이 지랄일껀데 -_-
	//vAmbientLight = vec4(${uVS}[15],${uVS}[16],${uVS}[17],${uVS}[18]);
	//vDirectionalLight = vec4(${uVS}[19],${uVS}[20],${uVS}[21],${uVS}[22]);
	//vDirectionalLightPosition = vec3(${uVS}[23],${uVS}[24],${uVS}[25]);
	const FLAT_LIGHT_CAL = `
	    // 환경광 컬러 세팅
		vec3 ambientLight = vec3(${uVS}[15],${uVS}[16],${uVS}[17]) * ${uVS}[18];
	    // 방향광 컬러 세팅
	    vec3 directionalLightColor = vec3(${uVS}[19],${uVS}[20],${uVS}[21]) * ${uVS}[22];
	    // 방향광 방향세팅
	    vec3 directionalLightPosition = normalize(vec3(${uVS}[23],${uVS}[24],${uVS}[25]));
	    // 노말 정규화
	    vec4 transformedNormal = positionMTX( ${uVS}[3], ${uVS}[4], ${uVS}[5] ) * rotationMTX( ${uVS}[6], ${uVS}[7], ${uVS}[8] ) *  vec4( ${aVertexNormal}, 0.0 );
	    // directionalLight 광량 확정
	    float directionalLightAmount = max( dot( transformedNormal.xyz, directionalLightPosition ), 0.0);
    `
	/*
	 uPARENT 정의표
	 useParent,   // 부모사용여부
	 x , y , z,   // 부모
	 rX, rY, rZ,  // 부모
	 sX, sY, sZ   // 부모
	 */
	/*
	 uVS 정의표
	 rX, rY, rZ,
	 x , y , z,
	 sX, sY, sZ
	 */
	/*
	 fVS 정의표
	 useNormalMap,
	 useSpecularMap,
	 shininess,
	 specularPower,
	 r,g,b,// vSpecularLight
	 r , g , b , intensity // AmbientLight
	 r , g , b , intensity // DirectionalLight
	 x , y , z // DirectionalLight,
	 r , g , b , a
	 */
	let baseShaderStr = {
		skyBox:{
			useTextureCoord:true,
			useDiffuseMap:true,
			vs:`
				${VS_FUNC}
				${C_aVertexPosition}
			    ${C_aTextureCoord}
			    ${C_uVS}
			    ${C_uPMatrix}
			    ${C_uCameraMatrix}
	            ${C_vTextureCoordinate}
	            ${C_vTransformedNormal}
			    void main(void) {
			        gl_Position = ${uPMatrix} * ${uCameraMatrix} * ${BASE_MVP_CAL} *  vec4( ${aVertexPosition}, 1.0 );
		            ${vTransformedNormal} = normalize(vec4(-${aVertexPosition}, 0.0)).xyz;
	                ${vTextureCoordinate} = ${aTextureCoord};
			    }
			`,
			fs:`
				${C_precision}
			    uniform samplerCube uCubeSampler;
				${C_vTextureCoordinate}
		        ${C_vTransformedNormal}
			    void main(void) {
			        gl_FragColor = textureCube(uCubeSampler, ${vTransformedNormal});
			    }
			`
		},
		bitmapPhongLight:{
			useNormal:true,
			useTextureCoord:true,
			useDiffuseMap:true,
			useNormalMap:true,
			useSpecularMap:true,
			vs:`
				${VS_FUNC}
				${C_aVertexPosition}
				${C_aVertexNormal}
			    ${C_aTextureCoord}
			    ${C_uVS}
			    ${C_uPARENT}
			    ${C_uPMatrix}
			    ${C_uCameraMatrix}
			    ${C_uNormalMatrix}
	            ${C_vTextureCoordinate}
	            ${C_vTransformedNormal}
			    void main(void) {
			        // 버텍스 계산
			        ${ALL_MVP_CAL}
			        // 노말계산
			        ${vTransformedNormal} = (parentMVP * ${BASE_POSITION_ROTATION_MTX_CAL} * vec4( ${aVertexNormal}, 0.0 )).xyz;
	                ${vTextureCoordinate} = ${aTextureCoord};
			    }
			`,
			fs:`
				${C_precision}
				${C_uFS}
			    ${C_uSampler}
			    ${C_uSamplerSpecular}
                ${C_uSamplerNormal}
				${C_vTextureCoordinate}
		        ${C_vTransformedNormal}
			    void main(void) {
		            vec4 AmbientLight = vec4(${uFS}[7],${uFS}[8],${uFS}[9],${uFS}[10]); //  r , g , b , intensity // AmbientLight
	                vec4 DirectionalLight = vec4(${uFS}[11],${uFS}[12],${uFS}[13],${uFS}[14]); //  r , g , b , intensity // DirectionalLight
	                vec3 DirectionalLightPosition = normalize(vec3(${uFS}[15],${uFS}[16],${uFS}[17])); //  x , y , z // DirectionalLight
			        /////////////////////////////////////////////////////////
			        // 환경광 세팅
					vec3 ambientLightColor = AmbientLight.rgb; // 컬러 세팅
					float ambientLightIntensity =  AmbientLight.a;
					/////////////////////////////////////////////////////////
					// 방향광 세팅
				    vec3 directionalLightColor = DirectionalLight.rgb; // 컬러 세팅
				    float directionalLightIntensity =  DirectionalLight.a;
				    float directionalLightAmount = max( dot( ${vTransformedNormal}, DirectionalLightPosition ), 0.0); // 방향광 광량 확정
					/////////////////////////////////////////////////////////
					// 반사광 세팅
				    vec3 specularLightColor = vec3(${uFS}[4],${uFS}[5],${uFS}[6]); // 컬러 세팅
			        // ---  노멀판정
				    vec3 normal = normalize(${vTransformedNormal});
			        if(${uFS}[0]==1.0) {
			            normal = 2.0 * (${vTransformedNormal}+texture2D(${uSamplerNormal}, vec2(${vTextureCoordinate}.s, ${vTextureCoordinate}.t)).rgb) - 1.0;
						normal = normalize (normal);
					}
				    vec3 eyeDirection = normalize(-${vTransformedNormal});
				    vec3 reflectionDirection = reflect(DirectionalLightPosition, normal); // 반사광 방향
				    // --- 스페큘라 판정
				    float tShininess = ${uFS}[2];
				    float specularLightAmount;  // 반사광량 확정
				    if(${uFS}[1]==1.0) {
				        tShininess = texture2D(${uSamplerSpecular}, vec2(${vTextureCoordinate}.s, ${vTextureCoordinate}.t)).r*255.0 ;
				        if(tShininess < 255.0) specularLightAmount = pow(max(dot(reflectionDirection, eyeDirection), 0.0), tShininess) * ${uFS}[3]; // 반사광량 확정
				    }else specularLightAmount = pow(max(dot(reflectionDirection, eyeDirection), 0.0), tShininess) * ${uFS}[3]; // 반사광량 확정
					/////////////////////////////////////////////////////////
					// 최종광량 확정
			        vec3 vLight = ( ambientLightColor * ambientLightIntensity ) +
			                      ( directionalLightAmount * directionalLightColor * directionalLightIntensity )+
		                          ( specularLightAmount * specularLightColor );
			        gl_FragColor = texture2D(${uSampler}, vec2(${vTextureCoordinate}.s, ${vTextureCoordinate}.t)) * vec4(vLight,1.0);
			    }
			`
		},
		bitmap:{
			useTextureCoord:true,
			useDiffuseMap:true,
			vs:`
				${VS_FUNC}
				${C_aVertexPosition}
			    ${C_aTextureCoord}
			    ${C_uVS}
			    ${C_uPMatrix}
			    ${C_uCameraMatrix}
	            ${C_vTextureCoordinate}
			    void main(void) {
			        gl_Position = ${uPMatrix} * ${uCameraMatrix} * ${BASE_MVP_CAL} * vec4( ${aVertexPosition}, 1.0 );
	                ${vTextureCoordinate} = ${aTextureCoord};
			    }
			`,
			fs:`
				${C_precision}
			    ${C_uSampler}
				${C_vTextureCoordinate}
			    void main(void) {
			        gl_FragColor = texture2D(${uSampler}, vec2(${vTextureCoordinate}.s, ${vTextureCoordinate}.t));
			    }
			`
		},
		colorPhongLight:{
			useNormal:true,
			useTextureCoord:true,
			useDiffuseMap:false,
			useNormalMap:true,
			useSpecularMap:true,
			vs:`
				${VS_FUNC}
				${C_aVertexPosition}
				${C_aVertexNormal}
			    ${C_aTextureCoord}
			    ${C_uVS}
		        ${C_uPARENT}
				${C_uPMatrix}
				${C_uCameraMatrix}
				${C_uNormalMatrix}
		        ${C_vLight}
	            ${C_vTextureCoordinate}
	            ${C_vTransformedNormal}
			    void main(void) {
			        // 버텍스 계산
			        ${ALL_MVP_CAL}
			        // 노말계산
			         ${vTransformedNormal} = (parentMVP * ${BASE_POSITION_ROTATION_MTX_CAL} * vec4( ${aVertexNormal}, 0.0 )).xyz;
	                ${vTextureCoordinate} = ${aTextureCoord};
			    }
			`,
			fs:`
				${C_precision}
				${C_uFS}
			    ${C_uSamplerSpecular}
                ${C_uSamplerNormal}
				${C_vTextureCoordinate}
		        ${C_vTransformedNormal}
			    void main(void) {
		            vec4 AmbientLight = vec4(${uFS}[7],${uFS}[8],${uFS}[9],${uFS}[10]); //  r , g , b , intensity // AmbientLight
	                vec4 DirectionalLight = vec4(${uFS}[11],${uFS}[12],${uFS}[13],${uFS}[14]); //  r , g , b , intensity // DirectionalLight
	                vec3 DirectionalLightPosition = normalize(vec3(${uFS}[15],${uFS}[16],${uFS}[17])); //  x , y , z // DirectionalLight
			        /////////////////////////////////////////////////////////
			        // 환경광 세팅
					vec3 ambientLightColor = AmbientLight.rgb; // 컬러 세팅
					float ambientLightIntensity =  AmbientLight.a;
					/////////////////////////////////////////////////////////
					// 방향광 세팅
				    vec3 directionalLightColor = DirectionalLight.rgb; // 컬러 세팅
				    float directionalLightIntensity =  DirectionalLight.a;
				    float directionalLightAmount = max( dot( ${vTransformedNormal}, DirectionalLightPosition ), 0.0); // 방향광 광량 확정
					/////////////////////////////////////////////////////////
					// 반사광 세팅
				    vec3 specularLightColor = vec3(${uFS}[4],${uFS}[5],${uFS}[6]); // 컬러 세팅
			        // ---  노멀판정
				    vec3 normal = normalize(${vTransformedNormal});
					if(${uFS}[0]==1.0) {
			            normal = 2.0 * (${vTransformedNormal} + texture2D(${uSamplerNormal}, vec2(${vTextureCoordinate}.s, ${vTextureCoordinate}.t)).rgb) - 1.0;
						normal = normalize (normal);
					}
				    vec3 eyeDirection = normalize(-${vTransformedNormal});
				    vec3 reflectionDirection = reflect(DirectionalLightPosition, normal); // 반사광 방향
				    // --- 스페큘라 판정
				    float tShininess = ${uFS}[2];
				    float specularLightAmount;  // 반사광량 확정
				    if(${uFS}[1]==1.0) {
				        tShininess = texture2D(${uSamplerSpecular}, vec2(${vTextureCoordinate}.s, ${vTextureCoordinate}.t)).r*255.0 ;
				        if(tShininess < 255.0) specularLightAmount = pow(max(dot(reflectionDirection, eyeDirection), 0.0), tShininess) * ${uFS}[3]; // 반사광량 확정
				    }else specularLightAmount = pow(max(dot(reflectionDirection, eyeDirection), 0.0), tShininess) * ${uFS}[3]; // 반사광량 확정
					/////////////////////////////////////////////////////////
					// 최종광량 확정
			        vec3 vLight = ( ambientLightColor * ambientLightIntensity ) +
			                      ( directionalLightAmount * directionalLightColor * directionalLightIntensity )+
		                          ( specularLightAmount * specularLightColor );
			        gl_FragColor = vec4(${uFS}[18],${uFS}[19],${uFS}[20],${uFS}[21]) * vec4(vLight,1.0);
			    }
			`
		},
		color:{
			useNormal:false,
			useTextureCoord:false,
			useSpecularMap:false,
			vs:`
				${VS_FUNC}
				${C_aVertexPosition}
			    ${C_uVS}
			    ${C_uPARENT}
				${C_uPMatrix}
				${C_uCameraMatrix}
			    void main(void) {
			         ${ALL_MVP_CAL}
			    }
			`,
			fs:`
				${C_precision}
				${C_uFS}
			    void main(void) {
			        gl_FragColor = vec4(${uFS}[18],${uFS}[19],${uFS}[20],${uFS}[21]);
			    }
			`
		}
	}
	//console.log(baseShaderStr.color.vs)
	//TODO 이걸 월드로 옮기자
	let vertexShader,fragmentShader,tProgram
	let t0,tLocation
	RedGL.obj('SHADER',{
			init:function (gl){
				for(const k in baseShaderStr){
					vertexShader = gl.createShader(gl.VERTEX_SHADER)
					gl.shaderSource(vertexShader,baseShaderStr[k]['vs']);
					gl.compileShader(vertexShader);
					fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
					gl.shaderSource(fragmentShader,baseShaderStr[k]['fs']);
					gl.compileShader(fragmentShader);
					tProgram = gl.createProgram();
					gl.attachShader(tProgram,vertexShader);
					gl.attachShader(tProgram,fragmentShader);
					gl.linkProgram(tProgram);
					if(!gl.getProgramParameter(tProgram,gl.LINK_STATUS))alert("Could not initialise shaders");
					gl.useProgram(tProgram);
					tProgram.aVertexPosition = gl.getAttribLocation(tProgram,aVertexPosition);
					gl.enableVertexAttribArray(tProgram[aVertexPosition]);
					///////////////////////////////////////////////////////////////
					// 어트리뷰트 활성화 체크
					tLocation = gl.getAttribLocation(tProgram,aTextureCoord)
					tProgram.uSampler = gl.getUniformLocation(tProgram,"uSampler");
					gl.activeTexture(gl.TEXTURE0);
					// aTextureCoord 활성화
					tLocation = gl.getAttribLocation(tProgram,aTextureCoord)
					if(tLocation>0) tProgram[aTextureCoord] = tLocation
					// aVertexNormal 활성화
					tLocation = gl.getAttribLocation(tProgram,aVertexNormal)
					if(tLocation>0) tProgram[aVertexNormal] = tLocation
					tProgram.name = k
					// 옵션 사용여부
					for(const k2 in baseShaderStr[k]) if(k2!="vs" && k2!='fs') tProgram[k2] = baseShaderStr[k][k2]
					gl[RedGL.CONST.PROGRAM_LIST][k] = tProgram
					//TODO 이걸 테스트기반을 한번더해야겠군
				}
			}
		}
	)
}