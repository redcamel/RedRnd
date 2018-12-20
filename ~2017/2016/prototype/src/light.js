"use strict";
{
	let fn
	let t0,temp
	const tArray = []
	const PI = Math.PI
	let lightList = {
		// TODO 라이팅에도 알파값을 인정할껀가 판단해야됨
		directional:class DirectionalLight {
			constructor(type,color = "#fff",x = 0,y = 0,z = 1){
				t0 = RedGL.UTIL.makeRGBA(color)
				this.r = t0[0], this.g = t0[1], this.b = t0[2], this.a = t0[3]
				this.x = 0, this.y = 0, this.z = 1
				this.intensity = 1
			}
		},
		ambient:class AmbientLight {
			constructor(type,color = "#111111"){
				t0 = RedGL.UTIL.makeRGBA(color)
				this.r = t0[0], this.g = t0[1], this.b = t0[2], this.a = t0[3]
				this.intensity = 1
			}
		},
		spot:class SpotLight {
			constructor(type,color = "#fff"){
				// TODO SpotLight 구현해야함
			}
		},
		point:class SpotLight {
			constructor(type,color = "#fff"){
				// TODO PointLight 구현해야함
				// 포인트 라이트는 몇개나 허용할건가?
				// 무한대로 하면 어짜피안되고..
				// 미니멈 유니폼 갯수로 통제해야하나?
			}
		}
	}
	class Light {
		constructor(type = 'directional',...info){
			temp = new lightList[type](type,...info)
			temp[RedGL.CONST.TYPE] = type
			return temp
		}
	}
	RedGL.cls('Light',Light)
	fn = RedGL.Light['fn']
}