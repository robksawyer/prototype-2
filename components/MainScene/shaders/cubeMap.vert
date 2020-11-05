// Cube Texture
// Vertex Shader
// @see https://discourse.threejs.org/t/how-to-use-cubemape-with-samplercube-in-a-shader/16780/4
// @see https://jsfiddle.net/jh3gdx2f/
varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = vec3(-worldPosition.z, worldPosition.y, -worldPosition.x);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}