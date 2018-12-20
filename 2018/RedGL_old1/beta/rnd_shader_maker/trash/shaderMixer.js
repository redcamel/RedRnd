'use strict';
var shaderMixer;
(function () {
    var makeStr;
    makeStr = function (v,result) {
        var resultStr;
        
        console.log(v);
        // 정의를 일단 분석해
        ['uniforms', 'varyings', 'vars'].forEach(function (key) {
            var tData = v['define'][key]
            console.log(tData)
            tData.forEach(function (v2, index2) {
                var t0 = v2[0].split(' ')
                console.log(t0)
                if (t0.length == 2) t0.reverse(), t0.push(null), t0.reverse()
                t0 = {
                    type: t0[0],
                    dataType: t0[1],
                    name: t0[2],
                    origin: v2
                }
                v['define'][key][index2] = t0
                if (result['define'][key][t0['name']]) throw '이미존재하는 유니폼값입니다.'
                result['define'][key][t0['name']] = t0
            })
            console.log(tData)
        });
        // 헤더, 바디, 푸터도 분석해
        ['header', 'body', 'footer'].forEach(function (key) {
            if (v[key].length) result[key] = result[key].concat(v[key])
        })
        console.log(result)
        // 최종문자열 병합해..
        resultStr = '';
        ['uniforms', 'varyings', 'vars'].forEach(function (key) {
            var tData = result['define'][key]
            console.log(tData)
            resultStr += '\n'
            resultStr += '// define : ' + key + ';\n'
            for (var k in tData) {
                console.log(tData[k])
                resultStr += tData[k]['origin'] + ';\n'
            }
        });
        ['header', 'body', 'footer'].forEach(function (key) {
            if (result[key].length) resultStr += result[key].join(';\n') + ';'
        })
        return resultStr
    }
    shaderMixer = function (list) {
        var resultVs,resultFs;
        resultVs = {
            define: {
                uniforms: {},
                varyings: {},
                vars: {}
            },
            header: [],
            body: [],
            footer: []
        };
        resultFs = {
            define: {
                uniforms: {},
                varyings: {},
                vars: {}
            },
            header: [],
            body: [],
            footer: []
        };
        list.forEach(function (v) {
            var t0;
            t0 = makeStr(v,v['type']=='vertex' ? resultVs : resultFs)
        })
        console.log(resultVs)
        console.log(resultFs)
        return 
    }
})()