"use strict";
{
	let fn
	let t0
	class Plane {
		constructor(type,splitX = 1,splitY = 1){
			let vs,uvs,is,x,y,t0,tw;
			let index,index2,numIndices;
			let xi,yi
			if(splitX==0 || splitY==0) this.error(0);
			tw = splitX+1, index = 0, index2 = 0, numIndices = 0, vs = [], is = [], uvs = [];
			for(yi = 0; yi<=splitY; ++yi){
				for(xi = 0; xi<=splitX; ++xi){
					x = (xi/splitX-.5), //w;
						y = (yi/splitY-.5), //h;
						vs[index++] = -x, vs[index++] = y, vs[index++] = 0, // x,y,z
						uvs[index2++] = (xi/splitX), uvs[index2++] = yi/splitY; // u,v
					if(xi!=splitX && yi!=splitY){
						t0 = xi+yi*tw;
						is[numIndices++] = t0, is[numIndices++] = (t0+tw), is[numIndices++] = (t0+tw+1), is[numIndices++] = t0, is[numIndices++] = (t0+tw+1), is[numIndices++] = (t0+1);
					}
				}
			}
			return RedGL.Geometry(`${type}_${splitX}_${splitY}`,vs,is,uvs)
		}
	}
	class Cube {
		constructor(type,segmentsW = 1,segmentsH = 1,segmentsD = 1){
			let vs,is,uvs;
			let tl,tr,bl,br,i,j,inc = 0;
			let vidx,vidx2,fidx; // is
			let hw,hh,hd; // halves
			let dw,dh,dd; // deltas
			let outer_pos;
			let u_tile_dim,v_tile_dim,u_tile_step,v_tile_step;
			let tl0u,tl0v,tl1u,tl1v,du,dv;
			vs = [], is = [], uvs = []
			vidx = 0, vidx2 = 0, fidx = 0,// is
				hw = 1/2, hh = 1/2, hd = 1/2,// half cube dimensions
				dw = 1/segmentsW, dh = 1/segmentsH, dd = 1/segmentsD,// Segment dimensions
				u_tile_dim = 1, v_tile_dim = 1, u_tile_step = 0, v_tile_step = 0;
			tl0u = u_tile_step, tl0v = v_tile_step, tl1u = 2*u_tile_step, tl1v = 0, du = u_tile_dim/segmentsW, dv = v_tile_dim/segmentsH;
			if(segmentsW==0 && segmentsH==0, segmentsD==0) this.error(0);
			for(i = 0; i<=segmentsW; i++){
				outer_pos = -hw+i*dw;
				for(j = 0; j<=segmentsH; j++){
					// front
					vs[vidx++] = outer_pos, vs[vidx++] = -hh+j*dh, vs[vidx++] = -hd,
					uvs[vidx2++] = 1-( tl0u+i*du ), uvs[vidx2++] = ( tl0v+(v_tile_dim-j*dv)),
					// back
					vs[vidx++] = outer_pos, vs[vidx++] = -hh+j*dh, vs[vidx++] = hd,
					uvs[vidx2++] = 1-( tl1u+(u_tile_dim-i*du)), uvs[vidx2++] = ( tl1v+(v_tile_dim-j*dv));
					if(i && j){
						tl = 2*((i-1)*(segmentsH+1)+(j-1)), tr = 2*(i*(segmentsH+1)+(j-1)), bl = tl+2, br = tr+2, is[fidx++] = tl, is[fidx++] = bl, is[fidx++] = br, is[fidx++] = tl, is[fidx++] = br, is[fidx++] = tr, is[fidx++] = tr+1, is[fidx++] = br+1, is[fidx++] = bl+1, is[fidx++] = tr+1, is[fidx++] = bl+1, is[fidx++] = tl+1;
					}
				}
			}
			inc += 2*(segmentsW+1)*(segmentsH+1), tl0u = u_tile_step, tl0v = 0, tl1u = 0, tl1v = 0, du = u_tile_dim/segmentsW, dv = v_tile_dim/segmentsD;
			for(i = 0; i<=segmentsW; i++){
				outer_pos = -hw+i*dw;
				for(j = 0; j<=segmentsD; j++){
					// top
					vs[vidx++] = outer_pos, vs[vidx++] = hh, vs[vidx++] = -hd+j*dd,
					uvs[vidx2++] = 1-( tl0u+i*du), uvs[vidx2++] = ( tl0v+(v_tile_dim-j*dv)),
					// bottom
					vs[vidx++] = outer_pos, vs[vidx++] = -hh, vs[vidx++] = -hd+j*dd,
					uvs[vidx2++] = 1-( tl1u+i*du), uvs[vidx2++] = ( tl1v+j*dv);
					if(i && j) tl = inc+2*((i-1)*(segmentsD+1)+(j-1)), tr = inc+2*(i*(segmentsD+1)+(j-1)), bl = tl+2, br = tr+2, is[fidx++] = tl, is[fidx++] = bl, is[fidx++] = br, is[fidx++] = tl, is[fidx++] = br, is[fidx++] = tr, is[fidx++] = tr+1, is[fidx++] = br+1, is[fidx++] = bl+1, is[fidx++] = tr+1, is[fidx++] = bl+1, is[fidx++] = tl+1;
				}
			}
			inc += 2*(segmentsW+1)*(segmentsD+1), tl0u = 0, tl0v = v_tile_step, tl1u = 2*u_tile_step, tl1v = v_tile_step, du = u_tile_dim/segmentsD, dv = v_tile_dim/segmentsH;
			for(i = 0; i<=segmentsD; i++){
				outer_pos = hd-i*dd;
				for(j = 0; j<=segmentsH; j++){
					// left
					vs[vidx++] = -hw, vs[vidx++] = -hh+j*dh, vs[vidx++] = outer_pos,
					uvs[vidx2++] = 1-( tl0u+i*du), uvs[vidx2++] = ( tl0v+(v_tile_dim-j*dv));
					// right
					vs[vidx++] = hw, vs[vidx++] = -hh+j*dh, vs[vidx++] = outer_pos;
					uvs[vidx2++] = 1-( tl1u+(u_tile_dim-i*du)), uvs[vidx2++] = ( tl1v+(v_tile_dim-j*dv));
					if(i && j) tl = inc+2*((i-1)*(segmentsH+1)+(j-1)), tr = inc+2*(i*(segmentsH+1)+(j-1)), bl = tl+2, br = tr+2, is[fidx++] = tl, is[fidx++] = bl, is[fidx++] = br, is[fidx++] = tl, is[fidx++] = br, is[fidx++] = tr, is[fidx++] = tr+1, is[fidx++] = br+1, is[fidx++] = bl+1, is[fidx++] = tr+1, is[fidx++] = bl+1, is[fidx++] = tl+1;
				}
			}
			//console.log(vs)
			//console.log(is)
			//console.log(uvs)
			return RedGL.Geometry(`${type}_${segmentsW}_${segmentsH}_${segmentsD}`,vs,is,uvs);
		}
	}
	const SIN = Math.sin
	const COS = Math.cos
	const PI = Math.PI
	class Sphere {
		constructor(type,splitLatitude,splitLongitude){
			if(splitLatitude==0 || splitLongitude==0) this.error(0);
			if(!splitLatitude || !splitLongitude) splitLatitude = 8 , splitLongitude = 8;
			let vs = [],uvs = [],is = []
			let radius = 1.0;
			let latNumber,longNumber
			let theta,sinTheta,cosTheta
			let phi,sinPhi,cosPhi
			let x,y,z,u,v
			for(latNumber = 0; latNumber<=splitLatitude; ++latNumber){
				theta = latNumber*PI/splitLatitude;
				sinTheta = SIN(theta), cosTheta = COS(theta);
				for(longNumber = 0; longNumber<=splitLongitude; ++longNumber){
					phi = longNumber*2*PI/splitLongitude;
					sinPhi = SIN(phi), cosPhi = COS(phi);
					x = cosPhi*sinTheta, y = cosTheta, z = sinPhi*sinTheta;
					u = 1-longNumber/splitLongitude, v = 1-latNumber/splitLatitude;
					vs.push(radius*x,radius*y,radius*z);
					uvs.push(u,v)
				}
			}
			let first,second
			for(latNumber = 0; latNumber<splitLatitude; ++latNumber){
				for(longNumber = 0; longNumber<splitLongitude; ++longNumber){
					first = latNumber*(splitLongitude+1)+longNumber;
					second = first+splitLongitude+1;
					is.push(second,first,first+1,second+1,second,first+1);
				}
			}
			return RedGL.Geometry(`${type}_${splitLatitude}_${splitLongitude}`,vs,is,uvs);
		}
	}
	// TODO 지오데식
	// TODO 폴리곤
	// TODO 라인
	// TODO 스카이박스는 프리미티브로 들어가나?
	class Primitive {
		constructor(type = 'plane',...info){
			switch (type){
				case 'plane' :
					return new Plane(type,...info)
					break
				case 'cube' :
					return new Cube(type,...info)
					break
				case 'skyBox' :
					return new Cube('skyBox',1,1,1)
					break
				case 'sphere' :
					return new Sphere(type,...info)
					break
			}
		}
	}
	RedGL.cls('Primitive',Primitive)
	fn = RedGL.Primitive['fn']
}