"use strict";
{
	let fn
	const MATERIAL = RedGL.CONST.MATERIAL
	const GEOMETRY = RedGL.CONST.GEOMETRY
	const PARENT_SCENE = RedGL.CONST.PARENT_SCENE
	class Mesh {
		constructor(geometry,material,x = 0,y = 0,z = -10){
			this.x = x
			this.y = y
			this.z = z
			this.rotationX = this.rotationY = this.rotationZ = 0
			this.scaleX = this.scaleY = this.scaleZ = 1
			this[MATERIAL] = material
			this[GEOMETRY] = geometry
			this.parent = null
			this.children = []
		}

		addChild(mesh){
			mesh.parent = this
			if(this.children.indexOf(mesh)==-1){
				this.children.push(mesh)
				if(this[PARENT_SCENE]) this[PARENT_SCENE]._updateByAddChild(this.children)
			}

		}


		removeChild(mesh){
			mesh.parent = null
			this.children.splice(this.children.indexOf(mesh),1)
			if(mesh[PARENT_SCENE]) mesh[PARENT_SCENE]._updateByRemoveChild(mesh)
		}

		// TODO 메쉬 타입만 받아줄꺼고...
		// TODO 하이라키의 경우 매트릭스를 어떻게 태울것인가 생각해야함
		// 음 그러면 카메라도 메쉬라고 봐야하나...
		// 즉 씬에 있는 업데이트 리스트에 업데이트 해야함
		set material(v){
			// 기존꺼 삭제
			if(this[PARENT_SCENE]) this[PARENT_SCENE]._deleteTypeList(this)
			// 다시 추가
			this[MATERIAL] = v
			if(this[PARENT_SCENE]) this[PARENT_SCENE]._addTypeList(this)
		}

		get material(){
			return this[MATERIAL]
		}

		set geometry(v){
			// 기존꺼 삭제
			if(this[PARENT_SCENE]) this[PARENT_SCENE]._deleteTypeList(this)
			// 다시 추가
			this[GEOMETRY] = v
			if(this[PARENT_SCENE]) this[PARENT_SCENE]._addTypeList(this)
		}

		get geometry(){
			return this[GEOMETRY]
		}
	}
	RedGL.cls('Mesh',Mesh)
	fn = RedGL.Mesh['fn']
}