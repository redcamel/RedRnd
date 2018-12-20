var bs = bs || {};

( function(){
var detectWindow, detectDOM;
detectWindow = function( W, detect ){
    var navi = W['navigator'], agent = navi.userAgent.toLowerCase(),
        platform = navi.platform.toLowerCase(),
        app = navi.appVersion.toLowerCase(),
        flash = 0, device = 'pc', browser, bv, os, osv, i, t0,
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
        browser = os = 'android';
        if( agent.indexOf('mobile') == -1 ) browser += 'Tablet', device = 'tablet';
        else device = 'mobile';
        if( i = /android ([\d.]+)/.exec(agent) ) i = i[1].split('.'), osv = parseFloat( i[0] + '.' + i[1] );
        else osv = 0;
        if( i = /safari\/([\d.]+)/.exec(agent) ) bv = parseFloat(i[1]);
        naver() || opera() || chrome() || firefox();
    }else if( agent.indexOf( i = 'ipad' ) > -1 || agent.indexOf( i = 'iphone' ) > -1 ){
        device = i == 'ipad' ? 'tablet' : 'mobile', browser = os = i;
        if( i = /os ([\d_]+)/.exec(agent) ) i = i[1].split('_'), osv = parseFloat( i[0] + '.' + i[1] );
        else osv = 0;
        if( i = /mobile\/([\S]+)/.exec(agent) ) bv = parseFloat(i[1]);
        naver() || opera() || chrome() || firefox();
    }else{
        if( platform.indexOf('win') > -1 ){
            os = 'win', i = 'windows nt ';
            if( agent.indexOf( i + '5.1' ) > -1 ) osv = 'xp';
            else if( agent.indexOf( i + '6.0' ) > -1 ) osv = 'vista';
            else if( agent.indexOf( i + '6.1' ) > -1 ) osv = '7';
            else if( agent.indexOf( i + '6.2' ) > -1 ) osv = '8';
            else if( agent.indexOf( i + '6.3' ) > -1 ) osv = '8.1';
            ie() || opera() || chrome() || firefox() || safari();
        }else if( platform.indexOf('mac') > -1 ){
            os = 'mac',
                i = /os x ([\d._]+)/.exec(agent)[1].replace( '_', '.' ).split('.'),
                osv = parseFloat( i[0] + '.' + i[1] ),
                opera() || chrome() || firefox() || safari();
        }else{
            os = app.indexOf('x11') > -1 ? 'unix' : app.indexOf('linux') > -1 ? 'linux' : 0,
                chrome() || firefox();
        }
    }
    (function(){
        var plug, t0;
        plug = navi.plugins;
        if( browser == 'ie' ) try{t0 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').substr(4).split(','), flash = parseFloat( t0[0] + '.' + t0[1] );}catch(e){}
        else if( ( t0 = plug['Shockwave Flash 2.0'] ) || ( t0 = plug['Shockwave Flash'] ) ) t0 = t0.description.split(' ')[2].split('.'), flash = parseFloat( t0[0] + '.' + t0[1] );
        else if( agent.indexOf('webtv') > -1 ) flash = agent.indexOf('webtv/2.6') > -1 ? 4 : agent.indexOf("webtv/2.5") > -1 ? 3 : 2;
    })();
    for( i in t0 = {
        'device':device, 'browser':browser, 'browserVer':bv, 'os':os, 'osVer':osv, 'flash':flash, 'sony':agent.indexOf('sony') > -1 ? 1 : 0
    } ) if( t0.hasOwnProperty(i) ) detect[i] = t0[i];
    return detect;
},
detectDOM = function( W, detect ){
    var doc = W['document'], cssPrefix, stylePrefix, transform3D, keyframe = W['CSSRule'], docMode = 0,
        b = doc.body, bStyle = b.style, div = doc.createElement('div'),
        c = doc.createElement('canvas'), a = doc.createElement('audio'), v = doc.createElement('video'), k, t0;
    if( !detect ) detect = {};
    if( !doc ) return detect;
    div.innerHTML = '<div data-test-ok="234">a</div>',
        div = div.getElementsByTagName( 'div' )[0];
    switch( detect.browser ){
        case'ie':
            if( detect.browserVer == -1 ) detect.browserVer = !c['getContext'] ? 8 : !( 'msTransition' in bStyle ) && !( 'transition' in bStyle ) ? 9 : c.getContext('webgl') || c.getContext('experimental-webgl') ? 11 : 10;
            cssPrefix = '-ms-', stylePrefix = 'ms'; transform3D = detect.browserVer > 9 ? 1 : 0;
            docMode = doc['documentMode'] || 0;
            if( detect.browserVer == 6 ) doc.execCommand( 'BackgroundImageCache', false, true ), bStyle.position = 'relative';
            break;
        case'firefox': cssPrefix = '-moz-', stylePrefix = 'Moz'; transform3D = 1; break;
        case'opera': cssPrefix = '-o-', stylePrefix = 'O'; transform3D = 1; break;
        default: cssPrefix = '-webkit-', stylePrefix = 'webkit'; transform3D = detect.os == 'android' ? ( detect.osv < 4 ? 0 : 1 ) : 1;
    }
    if( keyframe ){
        if( keyframe.WEBKIT_KEYFRAME_RULE ) keyframe = '-webkit-keyframes';
        else if( keyframe.MOZ_KEYFRAME_RULE ) keyframe = '-moz-keyframes';
        else if( keyframe.KEYFRAME_RULE ) keyframe = 'keyframes';
        else keyframe = null;
    }
    for( k in t0 = {
        //dom
        root:b.scrollHeight ? b : doc.documentElement,
        scroll:doc.documentElement && typeof doc.documentElement.scrollLeft == 'number' ? 'scroll' : 'page', insertBefore:div.insertBefore ? 1 : 0,
        text:div.textContent ? 'textContent' : div.innerText ? 'innerText' : 'innerHTML',
        cstyle:( doc.defaultView && doc.defaultView.getComputedStyle ) ? 1 : 0,
        customData:( div.dataset && div.dataset.testOk == '234' ) ? 1 : 0,
        docMode:docMode,
        //css3
        cssPrefix:cssPrefix, stylePrefix:stylePrefix,
        transition:( stylePrefix + 'Transition' in bStyle || 'transition' in bStyle ) ? 1 : 0, transform3D:transform3D, keyframe:keyframe ? 1 : 0,
        transform:( stylePrefix + 'Transform' in bStyle || 'transform' in bStyle ) ? 1 : 0,
        //html5
        canvas:c ? 1 : 0, canvasText:c && c['getContext'] && c.getContext('2d').fillText,
        audio:a ? 1 : 0,
        audioMp3:a && a['canPlayType'] && a.canPlayType('audio/mpeg;').indexOf('no') < 0 ? 1 : 0,
        audioOgg:a && a['canPlayType'] && a.canPlayType('audio/ogg;').indexOf('no') < 0 ? 1 : 0,
        audioWav:a && a['canPlayType'] && a.canPlayType('audio/wav;').indexOf('no') < 0 ? 1 : 0,
        audioMp4:a && a['canPlayType'] && a.canPlayType('audio/mp4;').indexOf('no') < 0 ? 1 : 0,
        video:v ? 1 : 0,
        videoCaption:'track' in doc.createElement('track') ? 1 : 0,
        videoPoster:v && 'poster' in v ? 1 : 0,
        videoWebm:v && v['canPlayType'] && v.canPlayType( 'video/webm; codecs="vp8,mp4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
        videH264:v && v['canPlayType'] && v.canPlayType( 'video/mp4; codecs="avc1.42E01E,m4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
        videoTeora:v && v['canPlayType'] && v.canPlayType( 'video/ogg; codecs="theora,vorbis"' ).indexOf( 'no' ) == -1 ? 1 : 0,
        local:( W['localStorage'] && 'setItem' in localStorage ) ? 1 : 0,
        geo:( navigator['geolocation'] ) ? 1 : 0, worker:W['Worker'] ? 1 : 0, file:W['FileReader'] ? 1 : 0, message:W['postMessage'] ? 1 : 0,
        history:( 'pushState' in history ) ? 1 : 0, offline:W['applicationCache'] ? 1 : 0,
        db:W['openDatabase'] ? 1 : 0, socket:W['WebSocket'] ? 1 : 0
    } ) if( t0.hasOwnProperty(k) ) detect[k] = t0[k];
	//gpu
    var gl,keys = {premultipliedAlpha:1,stencil:1,preserveDrawingBuffer:1},t1, i, r,j
    c = doc.createElement('canvas');
    if( gl = c.getContext('webgl',keys) || c.getContext('experimental-webgl',keys) || c.getContext('webkit-3d',keys) || c.getContext('moz-webgl',keys) ){
		t0 = gl.getContextAttributes();
		detect.glEnabled = 1;
		t1 = 'alpha,antialias,depth,premultipliedAlpha,preserveDrawingBuffer,stencil'.split(',');

		for( i = 0, j = t1.length ; i < j ; i++ ) k = t1[i], detect['gl' + k.charAt(0).toUpperCase() + k.substr(1)] = t0[k];
		t0 = ( 'VENDOR,VERSION,SHADING_LANGUAGE_VERSION,RENDERER,MAX_VERTEX_ATTRIBS,MAX_VARYING_VECTORS,MAX_VERTEX_UNIFORM_VECTORS,'+
			'MAX_VERTEX_TEXTURE_IMAGE_UNITS,MAX_FRAGMENT_UNIFORM_VECTORS,MAX_TEXTURE_SIZE,MAX_CUBE_MAP_TEXTURE_SIZE,'+
			'MAX_COMBINED_TEXTURE_IMAGE_UNITS,MAX_TEXTURE_IMAGE_UNITS,MAX_RENDERBUFFER_SIZE,MAX_VIEWPORT_DIMS,'+
			'RED_BITS,GREEN_BITS,BLUE_BITS,ALPHA_BITS,DEPTH_BITS,STENCIL_BITS' ).split(',');
		r = /[_]\S/g, re = function(_0){return _0.charAt(1).toUpperCase();};
        detect['glVERTEX_HIGH_FLOAT']=gl.getShaderPrecisionFormat(gl.VERTEX_SHADER,gl.HIGH_FLOAT).precision != 0 ? 1 : 0, detect['glFRAGMENT_HIGH_FLOAT']=gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER,gl.HIGH_FLOAT).precision != 0 ? 1 : 0
		for( i = 0, j = t0.length ; i < j ; i++ ) k = t0[i], t1 = k.toLowerCase().replace( r, re ), detect['gl' + t1.charAt(0).toUpperCase() + t1.substr(1)] = gl.getParameter(gl[k]);
	}else detect.glEnabled = 0;
    return detect;
};

// @test
bs.detectWindow = detectWindow;
bs.detectDOM = detectDOM;
} )();