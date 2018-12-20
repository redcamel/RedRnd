"use strict";
{
	let fn
	const MATERIAL = RedGL.CONST.MATERIAL
	const GEOMETRY = RedGL.CONST.GEOMETRY
	// TODO 시트는 음 메쉬의 확장이고
	// TODO 맵은 비트맵관련모든것을 쓸 수 있도록 한다.
	// TODO 렌더링 설정값은 객체가 먹어야하는군...
	class Sheet extends Mesh{
		constructor(geometry,material,maxRows = 1,maxCols = 1,totalFrame = 1,startFrame = 0,time = 1,x = 0,y = 0,z = -10){
			super(geometry,material,x,y,z)
			this.maxRow = maxRows
			this.maxCols = maxCols
			this.totalFrame = totalFrame
			this.startFrame = startFrame
			this.time = time
		}

		set material(v){
			this[MATERIAL] = v
		}

		set geometry(v){
			this[GEOMETRY] = v
		}
	}
	RedGL.cls('Sheet',Sheet)
	fn = RedGL.Sheet['fn']
}