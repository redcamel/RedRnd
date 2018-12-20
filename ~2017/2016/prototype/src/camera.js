"use strict";
{
	let fn
	let t0,temp
	const MATRIX = RedGL.CONST.MATRIX
	const tArray = []
	const PI = Math.PI
	let lookAt
	lookAt = function (){
		// TODO LookAt구현해야함
	}
	let cameraList = {
		obit:class ObitCamera {
		},
		basic:class BasicCamera {
			constructor(type){
				this.x = 0, this.y = 0, this.z = 0
				this.rotationX = 0, this.rotationY = 0, this.rotationZ = 0
				this[MATRIX] = mat4.create()
			}
			get matrix(){
				mat4.identity(this[MATRIX])
				tArray[0] = this.x
				tArray[1] = this.y
				tArray[2] = -this.z
				mat4.translate(this[MATRIX],this[MATRIX],tArray)
				tArray[0] = this.rotationX
				tArray[1] = this.rotationY
				tArray[2] = this.rotationZ
				mat4.rotateX(this[MATRIX],this[MATRIX],this.rotationX/180*PI)
				mat4.rotateY(this[MATRIX],this[MATRIX],this.rotationY/180*PI)
				mat4.rotateZ(this[MATRIX],this[MATRIX],this.rotationZ/180*PI)
				//TODO 매트릭스 계산 어찌할지 결정해야함
				return this[MATRIX]
			}
		}
	}
	class Camera {
		constructor(type = 'basic',...info){
			temp = new cameraList[type](type,...info)
			temp[RedGL.CONST.TYPE] = type
			return temp
		}
	}
	RedGL.cls('Camera',Camera)
	fn = RedGL.Camera['fn']
}