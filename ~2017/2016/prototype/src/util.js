"use strict";
{
	RedGL.obj('UTIL',{
		makeRGBA:(function (){
			let co = [];
			return function (v = '#000000'){
				v = v==null ? '#fff' : v
				if(typeof v=='string' && v.charAt(0)=='#'){
					if(v.length==4){
						v = v.substr(1,3)
						v = '#'+v[0]+v[0]+v[1]+v[1]+v[2]+v[2]
					}
					co[0] = parseInt(v.substr(1,2),16)/255,
					co[1] = parseInt(v.substr(3,2),16)/255,
					co[2] = parseInt(v.substr(5,2),16)/255;
					if(v.length>7){
						co[3] = parseFloat(v.substr(7));
						if(co[3]>1) co[3] = 1;
					} else co[3] = 1;
				} else if('r' in v) co[0] = v.r, co[1] = v.g, co[2] = v.b, co[3] = 'a' in v ? v.a : 1;
				else co[0] = v[0], co[1] = v[1], co[2] = v[2], co[3] = '3' in v ? v[3] : 1;
				return co;
			}
		})()
	})
}