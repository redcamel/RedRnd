'use strict';
var dataMaker;
(function () {
    dataMaker = function () {
        this['comfileInfo'] = new Structure_Texture()
        console.log('start 데이터 메이커 ---------------------------------------------------')
        console.log('this.info', this.info)
        console.log('this.info.structure.output', this.info.structure.output)
        console.log('this.comfileInfo', this.comfileInfo)
        var outputList;
        var self = this
        outputList = this.queryAll('[key]')
        outputList = outputList.filter(function (item) {
            if (item['next']) {
                // define: {
                //     uniforms: [
                //         // 디퓨즈텍스쳐
                //         'uniform sampler2D uDiffuseTexture'
                //     ],
                //     varyings: [
                //         // 비트맵 코디네이트 값
                //         'varying vec2 vTexcoord'

                //     ],
                //     vars: [
                //         // 최종컬러값
                //         'vec4 textureColor'
                //     ]
                // },
                // header: [],
                // body: [],
                // footer: [
                //     'textureColor = texture2D(uDiffuseTexture, vTexcoord)'
                // ]
                // console.log(item['next'])
                for (var k in item['next']) {
                    var tNextItem;
                    tNextItem = item['next'][k]
                    if (item.S('@key') == 'COLOR') {
                        var t0, t1
                        // 유니폼
                        t1 = 'uniform sampler2D uDiffuseTexture'
                        t1 = t1.split(' ')
                        t0 = {
                            type: t1[0],
                            dataType: t1[1],
                            varName: t1[2],
                            resultDst: tNextItem
                        }
                        self.comfileInfo['define']['uniforms'][t1[2] + '_' + shaderIndex] = t0
                        // 베어링
                        t1 = 'varying vec2 vTexcoord'
                        t1 = t1.split(' ')
                        t0 = {
                            type: t1[0],
                            dataType: t1[1],
                            varName: t1[2],
                            resultDst: tNextItem
                        }
                        self.comfileInfo['define']['varyings'][t1[2]] = t0
                        // 변수
                        t1 = 'vec4 textureColor'
                        t1 = t1.split(' ')
                        t0 = {
                            type: null,
                            dataType: t1[0],
                            varName: t1[1],
                            resultDst: tNextItem
                        }
                        self.comfileInfo['define']['vars'][t1[1] + '_' + shaderIndex] = t0
                        shaderIndex++
                    }
                }
            }
        })
        console.log(this.comfileInfo['define'])
        console.log('end 데이터 메이커 ---------------------------------------------------')
    }
})()