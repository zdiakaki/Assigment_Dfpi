module.exports = `
precision mediump float;

uniform float uTime;
uniform vec3 uTranslate;

void main() {
 
  
  vec3 finalColor = (uTranslate/5.0) * .5 + .5;
  finalColor = finalColor + sin(uTime)*0.8;///not only the mouseX control the colours--here I also change the color and do a fade out 
  
  gl_FragColor = vec4(finalColor, 1.0);
}`
