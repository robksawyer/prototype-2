// Cube Texture
// Fragment Shader
// @see https://discourse.threejs.org/t/how-to-use-cubemape-with-samplercube-in-a-shader/16780/4
// @see https://jsfiddle.net/jh3gdx2f/
precision mediump float;
uniform samplerCube cubemap;
varying vec3 vWorldPosition;

void main(){
    vec3 normalizedVWorldPosition = normalize(vWorldPosition);
    vec3 outcolor = textureCube(cubemap, normalizedVWorldPosition).rgb;

    gl_FragColor = vec4(outcolor, 1.0);
}