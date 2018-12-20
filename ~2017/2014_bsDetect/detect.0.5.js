if (typeof bs == 'undefined') bs = {};

(function(){
var detectWindow, detectDOM;
detectWindow = function( W, detect ){
	var navi = W['navigator'], agent = navi.userAgent.toLowerCase(), platform = navi.platform.toLowerCase(), app = navi.appVersion.toLowerCase(), flash = 0, device = 'pc', browser, bv, os, osv, i, t0,
	ie = function(){
		if( agent.indexOf('msie') < 0 && agent.indexOf('trident') < 0 ) return;
		if( agent.indexOf('iemobile') > -1 ) os = 'winMobile';
		return browser = 'ie', bv = agent.indexOf('msie 7') > -1 && agent.indexOf('trident') > -1 ? -1 : agent.indexOf('msie') < 0 ? 11 : parseFloat(/msie ([\d]+)/.exec(agent)[1]);
	},
	chrome = function(){
		if( agent.indexOf( i = 'chrome' ) < 0 && agent.indexOf( i = 'crios' ) < 0 ) return;
		return browser = 'chrome', bv = parseFloat( ( i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/ ).exec(agent)[1] );
	},
    firefox = function(){return agent.indexOf('firefox') < 0 ? 0 : ( browser = 'firefox', bv = parseFloat(/firefox\/([\d]+)/.exec(agent)[1]) );},
	safari = function(){return agent.indexOf('safari') < 0 ? 0 : ( browser = 'safari', bv = parseFloat(/safari\/([\d]+)/.exec(agent)[1]) );},
    opera = function(){var i; return (agent.indexOf( i = 'opera') < 0 && agent.indexOf( i = 'opr' ) < 0 ) ? 0 : ( browser = 'opera', bv = ( i == 'opera' ) ? parseFloat(/version\/([\d]+)/.exec(agent)[1]) : parseFloat(/opr\/([\d]+)/.exec(agent)[1]) );},
	naver = function(){return agent.indexOf('naver') < 0 ? 0 : browser = 'naver';};
	if( !detect ) detect = {};
	if( agent.indexOf('android') > -1 ){
		browser = os = 'android', device = agent.indexOf('mobile') == -1 ? ( browser += 'Tablet', 'tablet' ) : 'mobile',
		osv = ( i = /android ([\d.]+)/.exec(agent) ) ? ( i = i[1].split('.'), parseFloat( i[0] + '.' + i[1] ) ) : 0,
		naver() || opera() || chrome() || firefox() || ( bv = i = /safari\/([\d.]+)/.exec(agent) ? parseFloat(i[1]) : 0 );
	}else if( agent.indexOf( i = 'ipad' ) > -1 || agent.indexOf( i = 'iphone' ) > -1 ){
		device = i == 'ipad' ? 'tablet' : 'mobile', browser = os = i, osv = ( i = /os ([\d_]+)/.exec(agent) ) ? ( i = i[1].split('_'), parseFloat( i[0] + '.' + i[1] ) ) : 0,
		naver() || opera() || chrome() || firefox() || ( bv = ( i = /mobile\/([\S]+)/.exec(agent) ) ? parseFloat(i[1]) : 0 );
	}else if( platform.indexOf('win') > -1 ){
		for( i in t0 = {'5.1':'xp', '6.0':'vista','6.1':'7','6.2':'8','6.3':'8.1','6.4':'10'} ){
			if( agent.indexOf( 'windows nt ' + i ) > -1 ){
				osv = t0[i];
				break;
			}
		}
		os = 'win', ie() || opera() || chrome() || firefox() || safari();
	}else if( platform.indexOf('mac') > -1 ) os = 'mac', i = /os x ([\d._]+)/.exec(agent)[1].replace( '_', '.' ).split('.'), osv = parseFloat( i[0] + '.' + i[1] ), opera() || chrome() || firefox() || safari();
	else os = app.indexOf('x11') > -1 ? 'unix' : app.indexOf('linux') > -1 ? 'linux' : 0, chrome() || firefox();
	(function(){
		var plug, t0;
		plug = navi.plugins;
		if( browser == 'ie' ) try{t0 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').substr(4).split(','), flash = parseFloat( t0[0] + '.' + t0[1] );}catch(e){}
		else if( ( t0 = plug['Shockwave Flash 2.0'] ) || ( t0 = plug['Shockwave Flash'] ) ) t0 = t0.description.split(' ')[2].split('.'), flash = parseFloat( t0[0] + '.' + t0[1] );
		else if( agent.indexOf('webtv') > -1 ) flash = agent.indexOf('webtv/2.6') > -1 ? 4 : agent.indexOf("webtv/2.5") > -1 ? 3 : 2;
	})();
	for( i in t0 = {
		file:W['FileReader'] ? 1 : 0, message:W['postMessage'] ? 1 : 0, local:( W['localStorage'] && 'setItem' in localStorage ) ? 1 : 0,
		xhr2:W['XMLHttpRequest'] && 'responseType' in new XMLHttpRequest ? 1 : 0,
		db:W['openDatabase'] ? 1 : 0, socket:W['WebSocket'] ? 1 : 0, geo:( navigator['geolocation'] ) ? 1 : 0, history:( 'pushState' in history ) ? 1 : 0, offline:W['applicationCache'] ? 1 : 0,
		device:device, browser:browser, browserVer:bv, os:os, osVer:osv, flash:flash, sony:agent.indexOf('sony') > -1 ? 1 : 0
	} ) if( t0.hasOwnProperty(i) ) detect[i] = t0[i];
	return detect;
},
detectDOM = function( W, detect ){
	var doc = W['document'], cssPrefix, stylePrefix, docMode = 0, b = doc.body, bStyle = b.style, div = doc.createElement('div'), t0, k;
	if( !detect ) detect = {};
	switch( detect.browser ){
	case'ie':
		cssPrefix = '-ms-', stylePrefix = 'ms', docMode = doc['documentMode'] || 0;
		if( detect.browserVer == 6 ) doc.execCommand( 'BackgroundImageCache', false, true ), bStyle.position = 'relative';
		else if( detect.browserVer == -1 ) detect.browserVer = !( t0 = doc.createElement('canvas') )['getContext'] ? 8 : !( 'msTransition' in bStyle ) && !( 'transition' in bStyle ) ? 9 : t0.getContext('webgl') ? 11 : 10;
		break;
	case'firefox': cssPrefix = '-moz-', stylePrefix = 'Moz';break;
	case'opera': cssPrefix = '-o-', stylePrefix = 'O';break;
	default: cssPrefix = '-webkit-', stylePrefix = 'webkit';
	}
	for( k in t0 = {
		root:b.scrollHeight ? b : doc.documentElement,
		scroll:doc.documentElement && typeof doc.documentElement.scrollLeft == 'number' ? 'scroll' : 'page',
		cstyle:( doc.defaultView && doc.defaultView.getComputedStyle ) ? 1 : 0,
		docMode:docMode, cssPrefix:cssPrefix, stylePrefix:stylePrefix
	} ) if( t0.hasOwnProperty(k) ) detect[k] = t0[k];
	(function(){
		var c = doc.createElement('canvas'), a = doc.createElement('audio'), v = doc.createElement('video'), r, re, gl, keys, t0, t1, i, j, k,
		c1 = c && c['getContext'] && c.getContext('2d') ? 1 : 0, a1 = a && a['canPlayType'] ? 1 : 0, v1 = v && v['canPlayType'] ? 1 : 0;
		for( k in t0 = {
			canvas:c1, audio:a1, video:v1, worker:W['Worker'] ? 1 : 0,
			canvasText:c1 && c.getContext('2d').fillText ? 1 : 0,
			videoCaption:'track' in doc.createElement('track') ? 1 : 0,
			videoPoster:v1 && 'poster' in v ? 1 : 0
		} ) if( t0.hasOwnProperty(k) ) detect[k] = t0[k];
		if( a1 ) for( k in t0 = {Mp3:'mpeg',Ogg:'ogg',Wav:'wav',Mp4:'mp4'} ) detect['audio' + k] = a.canPlayType( 'audio/' + t0[k] + ';' ).indexOf('no') < 0 ? 1 : 0;
		if( v1 ) for( k in t0 = {Webm:'/webm; codecs="vp8,mp4a.40.2"',H264:'mp4; codecs="avc1.42E01E,m4a.40.2"',Teora:'ogg; codecs="theora,vorbis"'} ) detect['video' + k] = a.canPlayType( 'video/' + t0[k] ).indexOf('no') < 0 ? 1 : 0;
		keys = {premultipliedAlpha:1,stencil:1,preserveDrawingBuffer:1}, c = doc.createElement('canvas');
		if( c1 && ( gl = c.getContext('webgl',keys) || c.getContext('experimental-webgl',keys) || c.getContext('webkit-3d',keys) || c.getContext('moz-webgl',keys) ) ){
			t0 = gl.getContextAttributes();
			detect.glEnabled = 1;
			t1 = 'alpha,antialias,depth,premultipliedAlpha,preserveDrawingBuffer,stencil'.split(',');
			for( i = 0, j = t1.length ; i < j ; i++ ) k = t1[i], detect['gl' + k.charAt(0).toUpperCase() + k.substr(1)] = t0[k];
			t0 = ( 'VENDOR,VERSION,SHADING_LANGUAGE_VERSION,RENDERER,MAX_VERTEX_ATTRIBS,MAX_VARYING_VECTORS,MAX_VERTEX_UNIFORM_VECTORS,'+
				'MAX_VERTEX_TEXTURE_IMAGE_UNITS,MAX_FRAGMENT_UNIFORM_VECTORS,MAX_TEXTURE_SIZE,MAX_CUBE_MAP_TEXTURE_SIZE,'+
				'MAX_COMBINED_TEXTURE_IMAGE_UNITS,MAX_TEXTURE_IMAGE_UNITS,MAX_RENDERBUFFER_SIZE,MAX_VIEWPORT_DIMS,'+
				'RED_BITS,GREEN_BITS,BLUE_BITS,ALPHA_BITS,DEPTH_BITS,STENCIL_BITS' ).split(',');
			r = /[_]\S/g, re = function(_0){return _0.charAt(1).toUpperCase();};
			for( i = 0, j = t0.length ; i < j ; i++ ) k = t0[i], t1 = k.toLowerCase().replace( r, re ), detect['gl' + t1.charAt(0).toUpperCase() + t1.substr(1)] = gl.getParameter(gl[k]);
		}else detect.glEnabled = 0;
	})();
	return detect;
},
// @test
bs.detectWindow = detectWindow;
bs.detectDOM = detectDOM;
})();