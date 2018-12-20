var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var gap = require('gulp-append-prepend');
var stripDebug = require('gulp-strip-debug');
var textTransformation = require('gulp-text-simple');
var dt = new Date();
require('date-utils');
var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');
var fs = require('fs')
var rename = require("gulp-rename");
var name1 = 'recard';
/////////////////////////////////////////////////////////////
var transformString = function (s) {
	var reg = /\/\*\*DOC\:[\s\S]+?\:\DOC\*\//g;
	var list = s.match(reg)
	var dedent = function (callSite, ...args) {
		function format(str) {
			let size = -1;
			return str.replace(/\n(\s+)/g, (m, m1) => {
				if (size < 0)
					size = m1.replace(/\t/g, "    ").length;
				return "\n" + m1.slice(Math.min(m1.length, size));
			});
		}
		if (typeof callSite === "string") return format(callSite);
		if (typeof callSite === "function") return (...args) => format(callSite(...args));
		let output = callSite
			.slice(0, args.length + 1)
			.map((text, i) => (i === 0 ? "" : args[i - 1]) + text)
			.join("");
		return format(output);
	}
	if (list) {
		list.forEach(function (v, index) {
			v = v.replace('/**DOC:', '').trim()
			list[index] = dedent(v.replace(':DOC*/', '').trim()).trim()
		})
	} else {
		list = []
	}
	list.forEach(function (v, index) {
		v=v.replace(/\$\{[\s\S]+\}/g,'')
		var docParser = new Function('v', `return ${v}`);
		var result = docParser()
		if (result) list[index] = result
	})
	list.sort(function (a, b) {
		a = a['title'].toLowerCase()
		b = b['title'].toLowerCase()
		if (a > b) return 1
		if (a < b) return -1
		return 0
	})
	return list
};
var myTransformation = textTransformation(transformString);
gulp.task('make-doc', function () {
	console.log('-------------------------------------------');
	console.log('시작!');
	return gulp.src([
		'redGL.js',
		'RedGLDetect.js',
		'RedBufferInfo.js',
        'RedGeometryInfo.js',
		'RedMaterialInfo.js', 
		'RedMaterialDefine.js',
        'RedMeshInfo.js',
		'RedProgramInfo.js',
		'RedTextureInfo.js',
        'RedRender.js',
        'RedSceneInfo.js',
        'RedShaderInfo.js'
	])
		.pipe(myTransformation()) // 병합한다.
		.pipe(rename(function(path){
			path.extname = ".json"
		}))
		.pipe(gulp.dest('redDoc/docs'))
});
gulp.task('default', ['make-doc'], function () {
	console.log('-------------------------------------------');
	console.log('성공!');
	console.log('-------------------------------------------');
});