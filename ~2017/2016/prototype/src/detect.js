"use strict";
RedGL.obj("DETECT",(()=>{
	let result = {};
	let navi = window['navigator'],agent = navi.userAgent.toLowerCase(),platform = navi.platform.toLowerCase(),app = navi.appVersion.toLowerCase();
	let device = 'pc',isMobile = 0;
	let browser,bv,os,osv;
	let i,t0;
	let ie,chrome,firefox,safari,opera,naver;
	const REG_EDGE = /edge\/([\d]+)/
	const REG_IE = /msie ([\d]+)/
	const REG_CHROME = /chrome\/([\d]+)/
	const REG_CRIOS = /crios\/([\d]+)/
	const REG_FIREFOX = /firefox\/([\d]+)/
	const REG_SAFARI = /safari\/([\d]+)/
	{
		ie = ()=>{
			if(agent.includes('edge')){
				if(agent.includes('iemobile')) os = 'winMobile';
				return browser = 'edge', bv = (REG_EDGE.exec(agent)[1]);
			} else{
				if(!agent.includes('msie') && !agent.includes('trident')) return;
				if(agent.includes('iemobile')) os = 'winMobile';
				return browser = 'ie', bv = agent.includes('msie 7') && agent.includes('trident') ? -1 : agent.includes('msie') ? parseFloat(REG_IE.exec(agent)[1]) : 11;
			}
		},
		chrome = ()=>{
			if(!agent.includes(i = 'chrome') && !agent.includes(i = 'crios')) return;
			return browser = 'chrome', bv = parseFloat(( i=='chrome' ? REG_CHROME : REG_CRIOS ).exec(agent)[1]);
		},
		firefox = ()=>{ return agent.includes('firefox') ? ( browser = 'firefox', bv = parseFloat(REG_FIREFOX.exec(agent)[1]) ) : 0},
		safari = ()=>{ return agent.includes('safari') ? ( browser = 'safari', bv = parseFloat(REG_SAFARI.exec(agent)[1]) ) : 0 },
		opera = ()=>{
			var i;
			return (agent.includes(i = 'opera') && agent.includes(i = 'opr') ) ? ( browser = 'opera', bv = ( i=='opera' ) ? parseFloat(/version\/([\d]+)/.exec(agent)[1]) : parseFloat(/opr\/([\d]+)/.exec(agent)[1])) : 0;
		},
		naver = ()=>{ return agent.includes('naver') ? browser = 'naver' : 0 };
	}
	if(!result) result = {};
	if(agent.includes('android')){
		browser = os = 'android',
		device = agent.includes('mobile')== -1 ? 'mobile' : ( browser += 'Tablet', 'tablet' ),
		osv = ( i = /android ([\d.]+)/.exec(agent) ) ? ( i = i[1].split('.'), parseFloat(i[0]+'.'+i[1]) ) : 0,
		isMobile = 1,
		naver() || opera() || chrome() || firefox() || ( bv = i = /safari\/([\d.]+)/.exec(agent) ? parseFloat(i[1]) : 0 );
	} else if(agent.includes(i = 'ipad') || agent.includes(i = 'iphone')){
		device = i=='ipad' ? 'tablet' : 'mobile',
		browser = os = i,
		osv = ( i = /os ([\d_]+)/.exec(agent) ) ? ( i = i[1].split('_'), parseFloat(i[0]+'.'+i[1]) ) : 0,
		isMobile = 1,
		naver() || opera() || chrome() || firefox() || ( bv = ( i = /mobile\/([\S]+)/.exec(agent) ) ? parseFloat(i[1]) : 0 );
	} else if(platform.includes('win')){
		for(i in t0 = {'5.1':'xp','6.0':'vista','6.1':'7','6.2':'8','6.3':'8.1','10.0':10}){
			if(agent.includes('windows nt '+i)){
				osv = t0[i];
				break;
			}
		}
		os = 'win', ie() || opera() || chrome() || firefox() || safari();
	} else if(platform.includes('mac')){
		os = 'mac',
		i = /os x ([\d._]+)/.exec(agent)[1].replace('_','.').split('.'),
		osv = parseFloat(i[0]+'.'+i[1]), opera() || chrome() || firefox() || safari();
	}
	else os = app.includes('x11') ? 'unix' : app.includes('linux') ? 'linux' : 0, chrome() || firefox();
	for(i in t0 = {
		device:device,isMobile:isMobile,
		browser:browser,browserVer:bv,
		os:os,osVer:osv,
		root:document.body.scrollHeight ? document.body : document.documentElement,
		down:isMobile ? 'touchstart' : 'mousedown',
		move:isMobile ? 'touchmove' : 'mousemove',
		up:isMobile ? 'touchend' : 'mouseup',
		click:'click',
		over:'mouseover',out:'mouseout'
	}) if(t0.hasOwnProperty(i)) Object.defineProperty(result,i,{
		value:t0[i],
		enumerable:true
	});
	return result;
})());