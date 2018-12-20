"use strict";
{
	let fn
	let t0,temp
	let classList = {
		color:class ColorMaterial {
			constructor(type,color = '#ffffff'){
				t0 = RedGL.UTIL.makeRGBA(color)
				this.r = t0[0], this.g = t0[1], this.b = t0[2], this.a = t0[3]
			}
		},
		skyBox:class SkyBoxMaterial {
			constructor(type,src){
				this.src = src
			}
		},
		bitmap:class BitmapMaterial {
			constructor(type,src){
				this.src = src
			}
		},
		colorPhongLight:class ColorPhongLightMaterial {
			constructor(type,color = '#ffffff',normalSrc = null,specularSrc = null){
				t0 = RedGL.UTIL.makeRGBA(color)
				this.r = t0[0], this.g = t0[1], this.b = t0[2], this.a = t0[3]
				this.normalSrc = normalSrc
				this.specularSrc = specularSrc
				this.shininess = 64
				this.specularPower = 1
				this.specularR = 1, this.specularG = 1, this.specularB = 1
			}

			set specularColor(color){
				t0 = RedGL.UTIL.makeRGBA(color)
				this.specularR = t0[0], this.specularG = t0[1], this.specularB = t0[2]
			}
		},
		bitmapPhongLight:class BitmapPhongLightMateria {
			constructor(type,src,normalSrc = null,specularSrc = null){
				this.src = src
				this.normalSrc = normalSrc
				this.specularSrc = specularSrc
				this.shininess = 64
				this.specularPower = 1
				this.specularR = 1, this.specularG = 1, this.specularB = 1
			}

			set specularColor(color){
				t0 = RedGL.UTIL.makeRGBA(color)
				this.specularR = t0[0], this.specularG = t0[1], this.specularB = t0[2]
			}
		}
	}
	class Material {
		constructor(type = 'color',...info){
			temp = new classList[type](type,...info)
			temp[RedGL.CONST.TYPE] = type
			return temp
		}
	}
	RedGL.cls('Material',Material)
	fn = RedGL.Material['fn']
}