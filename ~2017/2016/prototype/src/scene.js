"use strict";
{
	let fn
	let tProgram,tGeometry
	let tIndex
	let setTypeList
	const SKY_BOX = RedGL.CONST.SKY_BOX
	class Scene {
		constructor(){
			this.children = []
			this.typeList = {}
			this.directionalLight = RedGL.Light('directional')
			this.ambientLight = RedGL.Light('ambient')
			this.renderInfo={
				drawCallNum:0,
				triangleNum:0
			}
		}

		// 자식추가
		addChild(mesh){
			// 일단 본인을 업데이트
			mesh.parent = null
			if(this.children.indexOf(mesh)== -1){
				this.children.push(mesh)
				this._addTypeList(mesh)
				// 자식을 업데이트
				this._updateByAddChild(mesh.children,this)
			}
		}

		// 자식제거
		removeChild(mesh){
			// 일단 본인을 업데이트
			this.children.splice(this.children.indexOf(mesh),1)
			this._deleteTypeList(mesh)
			// 자식을 업데이트
			this._updateByRemoveChild(mesh,this)
		}

		// 렌더리스트 추가
		_updateByAddChild(children,scene){
			let i,tMesh
			scene = scene ? scene : this
			i = children.length
			while(i--){
				tMesh = children[i]
				scene._addTypeList(tMesh)
				scene._updateByAddChild(tMesh.children,scene)
			}
		}

		// 렌더리스트 제거
		_updateByRemoveChild(mesh,scene){
			let i,tMesh,tChildren
			tChildren = mesh.children
			i = tChildren.length
			scene = scene ? scene : this
			scene._deleteTypeList(mesh)
			while(i--){
				tMesh = tChildren[i]
				scene._deleteTypeList(tMesh)
				scene._updateByRemoveChild(tMesh,scene)
			}
			console.log(scene)
		}

		// 실제 렌더리스트에서 제거
		_deleteTypeList(v){
			tProgram = v[RedGL.CONST.MATERIAL][RedGL.CONST.TYPE]
			tGeometry = v[RedGL.CONST.GEOMETRY][RedGL.CONST.TYPE]
			if(this){
				if(this['typeList'][tProgram]){
					if(this['typeList'][tProgram][tGeometry]){
						tIndex = this['typeList'][tProgram][tGeometry].indexOf(v)
						if(tIndex> -1) this['typeList'][tProgram][tGeometry].splice(tIndex,1)
					}
				}
			}
		}

		// 실제 렌더리스트에 추가
		_addTypeList(v){
			this._deleteTypeList(v)
			tProgram = v[RedGL.CONST.MATERIAL][RedGL.CONST.TYPE]
			tGeometry = v[RedGL.CONST.GEOMETRY][RedGL.CONST.TYPE]
			this['typeList'][tProgram] = this['typeList'][tProgram] ? this['typeList'][tProgram] : {}
			this['typeList'][tProgram][tGeometry] = this['typeList'][tProgram][tGeometry] ? this['typeList'][tProgram][tGeometry] : []
			this['typeList'][tProgram][tGeometry].push(v)
			v[RedGL.CONST.PARENT_SCENE] = this
		}
	}
	RedGL.cls('Scene',Scene)
	fn = RedGL.Scene['fn']
}