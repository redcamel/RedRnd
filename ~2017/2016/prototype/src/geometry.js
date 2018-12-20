"use strict";
{
	let fn
	let list = {}
	let updateList = []
	const VBO = RedGL.CONST.VBO
	const IBO = RedGL.CONST.IBO
	const UVBO = RedGL.CONST.UVBO
	const VNBO = RedGL.CONST.VNBO
	let calcNormal
	{
		let sqr,v1,v2;
		sqr = Math.sqrt, v1 = {x:0,y:0,z:0}, v2 = {x:0,y:0,z:0};
		calcNormal = function calcNormal(ns,pos,idx){
			var i,j,k,ti;
			for(ns.length = 0, i = 0, j = pos.length; i<j; i++) ns[i] = 0.0;
			for(i = 0, j = idx.length; i<j; i += 3){
				k = 3*idx[i+1],
				ti = 3*idx[i],
				v1.x = pos[k]-pos[ti],
				v1.y = pos[k+1]-pos[ti+1],
				v1.z = pos[k+2]-pos[ti+2],
				ti = 3*idx[i+2],
				v2.x = pos[ti]-pos[k],
				v2.y = pos[ti+1]-pos[k+1],
				v2.z = pos[ti+2]-pos[k+2];
				for(k = 0; k<3; k++){
					ti = 3*idx[i+k],
					ns[ti] += v1.y*v2.z-v1.z*v2.y,
					ns[ti+1] += v1.z*v2.x-v1.x*v2.z,
					ns[ti+2] += v1.x*v2.y-v1.y*v2.x;
				}
			}
			for(i = 0, j = pos.length; i<j; i += 3){
				v1.x = ns[i],
				v1.y = ns[i+1],
				v1.z = ns[i+2],
				k = sqr(v1.x*v1.x+v1.y*v1.y+v1.z*v1.z) || 0.00001,
				ns[i] = v1.x/k,
				ns[i+1] = v1.y/k,
				ns[i+2] = v1.z/k;
			}
			return ns;
		}
	}
	class Geometry {
		constructor(name,vbo,ibo,uvbo){
			if(list[name]) return list[name]
			this[RedGL.CONST.TYPE] = name
			// vertex
			this[VBO] = new Float32Array(vbo)
			this[VBO].itemSize = 3
			this[VBO].numItems = this[VBO].length/3
			// uv
			this[UVBO] = new Float32Array(uvbo)
			this[UVBO].itemSize = 2
			this[UVBO].numItems = this[UVBO].length/2
			// normal
			this[VNBO] = new Float32Array(calcNormal([],vbo,ibo))
			this[VNBO].itemSize = 3
			this[VNBO].numItems = this[VNBO].length/3
			// index
			this[IBO] = new Uint16Array(ibo)
			this[IBO].itemSize = 1
			this[IBO].numItems = this[IBO].length
			this[IBO].triangleNum = this[IBO].length/3
			list[name] = this
			updateList.push(this)
		}
	}
	Geometry[RedGL.CONST.UPDATE_LIST] = updateList
	RedGL.cls('Geometry',Geometry)
	fn = RedGL.Geometry['fn']
}