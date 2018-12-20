precision mediump float;
uniform vec4 uColor;
void main(void) {   
    gl_FragColor = uColor;
    gl_FragColor.rgb *= uColor.a;
}