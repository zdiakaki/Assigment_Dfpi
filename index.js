const regl = require('regl')()
const strVertex = require('./shaders/vert.js')////import the vertex shader
const strFrag = require('./shaders/frag.js')////import the frag shader
const loadObj = require('./utils/loadObj.js') 

const glm = require('gl-matrix')///import the camera library
var mat4 = glm.mat4//create initial matix

var projectionMatrix = mat4.create()///create a mat 4x4
var fov = 75 * Math.PI / 180//transform from radians to degrees
var aspect = window.innerWidth / window.innerHeight///define the ratio
mat4.perspective(projectionMatrix, fov, aspect, 0.01, 1000.0)

var viewMatrix = mat4.create()//create a mat 4x4
mat4.lookAt(viewMatrix, [0, 0, 2], [0, 0, 0], [0, 1, 0])

///declare the mouseX/Y var
var mouseX = 0
var mouseY = 0

window.addEventListener('mousedown', function (e) {/// e for event-- event handlerer

})
window.addEventListener('mousemove', function (e) {
  var percentX = e.clientX / window.innerWidth // 0 ~ 1
  var percentY = e.clientY / window.innerHeight // 0 ~ 1

  percentX = percentX * 2 - 1 // -1 ~ 1
  percentY = percentY * 2 - 1 // -1 ~ 1

  var moveRange =10//define the range of the camera
  mouseX = -percentX * moveRange
  mouseY = percentY * moveRange
})

var drawCube////define the draw cube

loadObj('./assets/test.obj' , function(obj){////import the obj file from c4d
  //console.log('Model Loaded',obj)
 
 
//create the attributes-buffers
 var attributes = {
  aPosition: regl.buffer(obj.positions),
  aUV: regl.buffer(obj.uvs)
 }

 //create my draw call
drawCube = regl(/// this is the object in which put attributes-uniforms-shaders etc
  {//draw call
      
      uniforms: {////// define the uniforms
          uTime: regl.prop('time'),
          uProjectionMatrix :regl.prop('projection'),
          uViewMatrix : regl.prop('view'),
          uTranslate : regl.prop('translate')
         
      },
     
      
      vert: strVertex, //define the shader you use
      frag: strFrag,//define the shader you use
      attributes : attributes,//define the attributes you use
     
      //define how many objects will draw  
      count:obj.count
    })

})

//console.log('loadObj')



var currTime = 0

const clear = () => {
  regl.clear({
    color: [0, 0, 0, 1]//// set the colour of the background
  })
}


function render () {
  currTime += 0.01
  
  mat4.lookAt(viewMatrix, [mouseX, mouseY,1], [0, 0, 0], [0, 1, 0])///define the control of the camera through the mouse
 

  clear()
  if(drawCube!= undefined){////It takes some time to load the object and so to define it. That's why I write that if the drawCube is undefined-->draw this


    var num=5;//set the number of the curves

    for (var i=0; i<num;i++){
      
     for (var h=0; h<num;h++){
        
      for (var k=0; k<2;k++){
      
      var obj = {////create an object in which I define all the uniforms from the shaders
        time : currTime,
        view : viewMatrix,
        projection:projectionMatrix,
        translate: [i*2 -5,h*2 -5,k*2 + mouseX]   ///with mouseX I change the colour of the curves
      }
    
      
      drawCube(obj)///draw the object
       }
    }
   }
  }
  window.requestAnimationFrame(render)
}

render()
