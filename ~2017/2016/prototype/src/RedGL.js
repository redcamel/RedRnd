"use strict";
var RedGL;
{
	if(!window['Symbol']){
		{
			let SYMBOL = function (){}
			let table = {}
			window.Symbol = function (){
				return new SYMBOL()
			}
			window.Symbol.for = function (key){
				if(table[key]) return table[key]
				else table[key] = new SYMBOL()
			}
		}
	}
	let GL,fn;
	const SB_UUID = Symbol.for('UUID')
	const WIN = window,DOC = document,DOC_EL = DOC.documentElement,BODY = DOC.body,HEAD = DOC.head;
	/*
	 Alucard defineProperty Func
	 */
	const DEFINE = function (k,v,type){
		switch (type){
			case 'obj' :
				Object.defineProperty(GL,k,{
					enumerable:true,
					value:v
				})
				Object.seal((GL[k]))
				break
			case 'cls' :
				Object.defineProperty(GL,k,{
					enumerable:true,
					value:v
				})
				Object.seal((GL[k]))
				break
			default :
				Object.defineProperty(GL,k,{
					enumerable:true,
					value:v
				})
				Object.freeze((GL[k]))
				break
		}
	};
	/*
	 기본 폴리필
	 */
	Object.defineProperty(WIN,'requestAnimationFrame',(function (){return WIN.requestAnimationFrame || WIN.webkitRequestAnimationFrame || WIN.mozRequestAnimationFrame || function (callback){WIN.setTimeout(callback,1000/60)}})())
	Object.defineProperty(WIN,'cancelAnimationFrame',(function (){ return WIN.cancelAnimationFrame || clearInterval})())
	/*
	 Alucard Define
	 */
	GL = function (hostCode,...modules){
		let t0 = GL.version ? GL.version : 'dev'
		delete GL.version
		Object.defineProperty(GL,'version',{enumerable:true,value:t0})
		console.log(`
		RedGL Version: ${GL.version}
		Author : Paik Seonki
		support : ie9~
		`)
		/*
		 문서상태를 추적하고
		 아카드를 초기화 시도함
		 */
		{
			let t0,prevKey,startTime;
			startTime = Date.now()
			t0 = setInterval(() =>{
				if(prevKey!=DOC.readyState){
					console.log(`document.readyState : ${DOC.readyState} : ${Date.now()-startTime}ms`)
					startTime = Date.now()
				}
				prevKey = DOC.readyState
				switch (DOC.readyState){
					case'complete':
					case'loaded':
						break;
					case'interactive':
						if(DOC_EL.doScroll) try{
							DOC_EL.doScroll('left')
						} catch (e){ return;}
					default:
						return
				}
				clearInterval(t0)
				{
					/*
					 아카드 의존성을 기본 초기화함
					 */
					GL.ajaxGet(...modules).then(
						function (v){
							let script
							for(let k of v){
								script = DOC.createElement('script')
								script.innerHTML = k
								HEAD.appendChild(script)
								HEAD.removeChild(script)
							}
							hostCode()
						}
					)
				}
			},1)
		}
	}
	GL[Symbol.for('UUID')] = 0
	/*
	 Basic Core
	 */
	{
		let t;
		let errMessage,coreError,makeFn;
		/*
		 대상 오프젝트에 공식적인 fn을 추가용 매서드
		 이놈을 통해 정의하면 수정도 삭제도 안되서 안전함
		 */
		makeFn = (classObject)=>{
			let funcStr,i
			Object.defineProperty(classObject['prototype'],'fn',{
				enumerable:true,
				value:function (...arg){
					funcStr = arg.pop(), i = arg.length
					while(i--){
						Object.defineProperty(classObject['prototype'],arg[i],{
								enumerable:false,
								writable:typeof funcStr!='function',
								value:funcStr
							}
						)
					}
				}
			})
		}
		coreError = (type,idx,k)=>{ throw Error(`${errMessage[type][idx]} : ${k}`) }
		errMessage = {
			method:[
				'exist method name!',
				'Method name must start with lowerCase character.'
			],
			cls:[
				'exist class name!',
				'Class name must start with upperCase character.'
			],
			obj:[
				'exist obj object name!',
				'Static object name must use only upperCase letters.'
			]
		}
		DEFINE(
			'method',
			(k,v)=>{
				if((t = k.charAt(0))==t.toLowerCase()) GL[k] ? coreError('method',0,k) : DEFINE(k,v)
				else coreError('method',1,k)
			}
		)
		/*
		 k : 클래스명
		 v : 실제클래스
		 factory : 팩토리를 지정안하면 기본 팩토리로 돌아감
		 */
		DEFINE('cls',(k,v,factory)=>{
			if((t = k.charAt(0))==t.toUpperCase()){
				if(GL[k]) coreError('cls',0,k)
				else{
					let temp = (function (){
						let clsFactory,fn;
						let cls = v
						makeFn(v)
						//TODO userData도 해결해야하네..
						//////////////////////////////////
						// 클래스 팩토리
						{
							if(factory) clsFactory = factory
							else clsFactory = (...k)=>{
								let t = new cls(...k)
								t[SB_UUID] = GL[SB_UUID]++
								return t
							}
							clsFactory[Symbol.for('REAL_CLASS')] = cls
						}
						// uuid 자동생성
						Object.defineProperty(cls.prototype,'uuid',{
							get (){ return `${this[SB_UUID]}:${cls.name}`}
						})
						Object.defineProperty(cls.prototype,'userData',{
							enumerable:true,
							value:{}
						})
						//////////////////////////////////
						// 프로토타입 확장 정의
						fn = v.prototype['fn']
						// 외부 유출용 프로토타입 정의
						Object.defineProperty(clsFactory,'fn',{enumerable:true,value:fn})
						//////////////////////////////////
						// 팩토리 리턴
						return clsFactory
					})();
					DEFINE(k,temp,'cls')
				}
			}
			else coreError('cls',1,k)
		})
		/*
		 k : 오브젝트명
		 v : 실제 오브젝트정의
		 */
		DEFINE('obj',(k,v)=>{
			if(k==k.toUpperCase()) GL[k] ? coreError('obj',0,k) : DEFINE(k,v,'obj')
			else coreError('obj',1,k)
		})
		fn = GL['method']
	}
	/*
	 Ajax Core
	 Promise를 기반으로 함.
	 */
	{
		let promise,makePromise;
		promise = function*(...urls){
			let i,len
			i = 0, len = urls.length
			for(i; i<len; i++) yield urls[i]
		}
		makePromise = (mode,url)=>{
			return new Promise((resolve,reject)=>{
				let rq,param;
				mode = mode.toLowerCase()
				url += (url.includes('?') ? '&' : '?')+'_='+Date.now()
				param = url.split('?');
				if(param[1]) param[1] = encodeURIComponent(param[1])
				rq = new XMLHttpRequest()
				rq.open(mode,mode=='get' ? url : param[0],true)
				rq.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8")
				rq.addEventListener('load',function (){
					if(this.status==200) resolve(rq.responseText)
					else reject([rq.statusText,rq['responseURL']])
				})
				rq.addEventListener('error',function (){reject(this.statusText)})
				rq.send(mode=='get' ? null : param[1])
			})
		}
		fn('ajax',(mode = 'GET',...urls)=>{
			let urlList,promiseList;
			urlList = promise(...urls)
			promiseList = [];
			for(let url of urlList) promiseList.push(makePromise(mode,url));
			console.log(`ajax start - mode : ${mode} / urls : ${urls.join(',')}`)
			return Promise.all(promiseList).then(
				function (v){ return v }
			)
		})
		fn("ajaxGet",(...v)=>{ return RedGL.ajax('get',...v) })
		fn("ajaxPost",(...v)=>{ return RedGL.ajax('post',...v) })
		fn("ajaxScript",(...v)=>{
			let t
			return RedGL.ajax('get',...v).then(function (v){
				v = v.join('')
				t = document.createElement('script')
				t.type = 'text/javascript', t.charset = 'utf-8'
				HEAD.appendChild(t)
				t.innerHTML = v
			})
		})
		{
			let uuid
			fn("jsonp",(url)=>{
				return new Promise((resolve,reject)=>{
						let t,data;
						t = document.createElement('script');
						uuid++, WIN['____emptyFunc'+uuid] = function (v){ data = v }
						t.type = 'text/javascript', t.charset = 'utf-8', t.src = url+'____emptyFunc'+uuid
						t.addEventListener('load',function (){
							t.onload = null
							resolve(data)
						})
						t.addEventListener('error',function (e){reject(e)})
						HEAD.appendChild(t)
					}
				)
			})
		}
		///////////////////////////////////////////////////////
		// WebGL
		///////////////////////////////////////////////////////
		{
			fn('getGL',function (query,w,h,background){
				let t = RedGL.World(query,w,h,background)
				return t
			})
		}
	}
	RedGL = GL
}