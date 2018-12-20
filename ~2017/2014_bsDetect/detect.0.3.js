function DETECT(W, doc){
    var platform, app, agent, device,
        flash, browser, bVersion, os, osVersion, cssPrefix, stylePrefix, transform3D,
        b, bStyle, div, keyframe,
        v, a, c;
    agent = navigator.userAgent.toLowerCase(),
    platform = navigator.platform.toLowerCase(),
    app = navigator.appVersion.toLowerCase(),
    flash = 0, device = 'pc',
    (function(){
        var i;
        function ie(){
            if( agent.indexOf( 'msie' ) < 0 && agent.indexOf( 'trident' ) < 0 ) return;
            if( agent.indexOf( 'iemobile' ) > -1 ) os = 'winMobile';
            return browser = 'ie', bVersion = agent.indexOf( 'msie' ) < 0 ? 11 : parseFloat( /msie ([\d]+)/.exec( agent )[1] );
        }
        function chrome(){
            var i;
            if( agent.indexOf( i = 'chrome' ) < 0 && agent.indexOf( i = 'crios' ) < 0 ) return;
            return browser = 'chrome', bVersion = parseFloat( ( i == 'chrome' ? /chrome\/([\d]+)/ : /webkit\/([\d]+)/ ).exec( agent )[1] );
        }
        function firefox(){
            if( agent.indexOf( 'firefox' ) < 0 ) return;
            return browser = 'firefox', bVersion = parseFloat( /firefox\/([\d]+)/.exec( agent )[1] );
        }
        function safari(){
            if( agent.indexOf( 'safari' ) < 0 ) return;
            return browser = 'safari', bVersion = parseFloat( /version\/([\d]+)/.exec( agent )[1] );
        }
        function opera(){
            var i;
            if( agent.indexOf( i = 'opera' ) < 0 && agent.indexOf( i = 'opr' ) < 0 ) return;
            return browser = 'opera', bVersion = ( i == 'opera' ) ? parseFloat( /version\/([\d]+)/.exec( agent )[1] ) : parseFloat( /opr\/([\d]+)/.exec(agent)[1] );
        }
        function naver(){if( agent.indexOf( 'naver' ) > -1 ) return browser = 'naver';}
        if( agent.indexOf( 'android' ) > -1 ){
            browser = os = 'android';
            if( agent.indexOf( 'mobile' ) == -1 ) browser += 'Tablet', device = 'tablet';
            else device = 'mobile';
            i = /android ([\d.]+)/.exec( agent );
            if( i ) i = i[1].split('.'), osVersion = parseFloat( i[0] + '.' + i[1] );
            else osVersion = 0;
            i = /version\/([\d.]+)/.exec( agent );
            if( i ) bVersion = parseFloat( i[1] );
            naver() || opera() || chrome() || firefox();
        }else if( agent.indexOf( i = 'ipad' ) > -1 || agent.indexOf( i = 'iphone' ) > -1 ){
            device = i == 'ipad' ? 'tablet' : 'mobile', browser = os = i;
            if( i = /os ([\d_]+)/.exec( agent ) ) i = i[1].split('_'), osVersion = parseFloat( i[0] + '.' + i[1] );
            else osVersion = 0;
            if( i = /version\/([\S]+)/.exec( agent ) ) bVersion = parseFloat( i[1] );
            else if( i = /webkit\/([\d]+)/.exec( agent ) ) bVersion = parseFloat( i[1] );
            else bVersion = 0;
            naver() || opera() || chrome() || firefox() || safari();
        }else{
            if( platform.indexOf( 'win' ) > -1 ){
                os = 'win', i = 'windows nt ';
                if( agent.indexOf( i + '5.1' ) > -1 ) osVersion = 'xp';
                else if( agent.indexOf( i + '6.0' ) > -1 ) osVersion = 'vista';
                else if( agent.indexOf( i + '6.1' ) > -1 ) osVersion = '7';
                else if( agent.indexOf( i + '6.2' ) > -1 ) osVersion = '8';
                else if( agent.indexOf( i + '6.3' ) > -1 ) osVersion = '8.1';
                ie() || opera() || chrome() || firefox() || safari();
            }else if( platform.indexOf( 'mac' ) > -1 ){      
                os = 'mac';
                i = /os x ([\d._]+)/.exec(agent)[1].replace( '_', '.' ).split('.');
                osVersion = parseFloat( i[0] + '.' + i[1] );
                opera() || chrome() || firefox() || safari();
            }else{
                os = app.indexOf( 'x11' ) > -1 ? 'unix' : app.indexOf( 'linux' ) > -1 ? 'linux' : 0;
                osVersion = 0;
                chrome() || firefox();
            }
        }
    })(),
    (function(){
        var plug, t0;
        plug = navigator.plugins;
        if( browser == 'ie' ) try{t0 = new ActiveXObject( 'ShockwaveFlash.ShockwaveFlash' ).GetVariable( '$version' ).substr( 4 ).split( ',' ), flash = parseFloat( t0[0] + '.' + t0[1] );}catch( e ){}
        else if( ( t0 = plug['Shockwave Flash 2.0'] ) || ( t0 = plug['Shockwave Flash'] ) ) t0 = t0.description.split( ' ' )[2].split( '.' ), flash = parseFloat( t0[0] + '.' + t0[1] );
        else if( agent.indexOf( 'webtv' ) > -1 ) flash = agent.indexOf( 'webtv/2.6' ) > -1 ? 4 : agent.indexOf("webtv/2.5") > -1 ? 3 : 2;
    })(),
    b = doc.body, bStyle = b.style, div = doc.createElement( 'div' ),
    div.innerHTML = '<div style="opacity:.55;position:fixed;top:100px;visibility:hidden;-webkit-overflow-scrolling:touch">a</div>',
    div = div.getElementsByTagName( 'div' )[0],
    c = doc.createElement( 'canvas' ), c = 'getContext' in c ? c : null,
    a = doc.createElement( 'audio' ), a = 'canPlayType' in a ? a : null,
    v = doc.createElement( 'video' ), v = 'canPlayType' in v ? v : null;
    switch( browser ){
    case'ie': cssPrefix = '-ms-', stylePrefix = 'ms'; transform3D = bVersion > 9 ? 1 : 0;
        if( bVersion == 6 ) doc.execCommand( 'BackgroundImageCache', false, true ), b.style.position = 'relative';
        break;
    case'firefox': cssPrefix = '-moz-', stylePrefix = 'Moz'; transform3D = 1; break;
    case'opera': cssPrefix = '-o-', stylePrefix = 'O'; transform3D = 0; break;
    default: cssPrefix = '-webkit-', stylePrefix = 'webkit'; transform3D = os == 'android' ? ( osVersion < 4 ? 0 : 1 ) : 0;
    }
    if( keyframe = W['CSSRule'] ){
        if( keyframe.WEBKIT_KEYFRAME_RULE ) keyframe = '-webkit-keyframes';
        else if( keyframe.MOZ_KEYFRAME_RULE ) keyframe = '-moz-keyframes';
        else if( keyframe.KEYFRAME_RULE ) keyframe = 'keyframes';
        else keyframe = null;
    }
    return {
        'device':device, 'browser':browser, 'browserVer':bVersion, 'os':os, 'osVer':osVersion, 'flash':flash, 'sony':agent.indexOf( 'sony' ) > -1 ? 1 : 0,
        //dom
        root:b.scrollHeight ? b : doc.documentElement,
        scroll:doc.documentElement && typeof doc.documentElement.scrollLeft == 'number' ? 'scroll' : 'page',
        insertBefore:div.insertBefore ? 1 : 0, png:( browser == 'ie' && bVersion > 7 ) ? 1 : 0,
        opacity:div.style.opacity == '0.55' ? 1 : 0, text:div.textContent ? 'textContent' : div.innerText ? 'innerText' : 'innerHTML',
        cstyle:( doc.defaultView && doc.defaultView.getComputedStyle ) ? 1 : 0,
        //css3
        cssPrefix:cssPrefix, stylePrefix:stylePrefix, filterFix:browser == 'ie' && bVersion == 8 ? ';-ms-' : ';',
        transition:( stylePrefix + 'Transition' in bStyle || 'transition' in bStyle ) ? 1 : 0, transform3D:transform3D, keyframe:keyframe ? 1 : 0,
        transform:stylePrefix + ('Transform' in bStyle || 'transform' in bStyle ) ? 1 : 0,
        //html5
        canvas:c ? 1 : 0, canvasText:( c && c.getContext('2d').fillText ) ? 1 : 0,
        audio:a ? 1 : 0,
        audioMp3:a && a.canPlayType('audio/mpeg;').indexOf('no') < 0 ? 1 : 0,
        audioOgg:a && a.canPlayType('audio/ogg;').indexOf('no') < 0 ? 1 : 0,
        audioWav:a && a.canPlayType('audio/wav;').indexOf('no') < 0 ? 1 : 0,
        audioMp4:a && a.canPlayType('audio/mp4;').indexOf('no') < 0 ? 1 : 0,
        video:v ? 1 : 0,
        videoCaption:'track' in doc.createElement('track') ? 1 : 0,
        videoPoster:v && 'poster' in v ? 1 : 0,
        videoWebm:v && v.canPlayType( 'video/webm; codecs="vp8,mp4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
        videH264:v && v.canPlayType( 'video/mp4; codecs="avc1.42E01E,m4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
        videoTeora:v && v.canPlayType( 'video/ogg; codecs="theora,vorbis"' ).indexOf( 'no' ) == -1 ? 1 : 0,
        local:( W.localStorage && 'setItem' in localStorage ) ? 1 : 0,
        geo:( navigator.geolocation ) ? 1 : 0, worker:W.Worker ? 1 : 0, file:W.FileReader ? 1 : 0, message:W.postMessage ? 1 : 0,
        history:( 'pushState' in history ) ? 1 : 0, offline:W.applicationCache ? 1 : 0,
        db:W.openDatabase ? 1 : 0, socket:W.WebSocket ? 1 : 0
    };
}