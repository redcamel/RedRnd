'use strict';
var dataMaker;
(function () {
    var makeTextureBase
    makeTextureBase = function (self) {
        var t0, t1
        // 유니폼
        t1 = 'uniform sampler2D uTexture'
        t1 = t1.split(' ')
        t0 = {
            type: t1[0],
            dataType: t1[1],
            varName: t1[2],
            varCompiledName : t1[2] + '_' + shaderIndex
        }
        // 아웃풋 링크정보
        self.compileInfo['outLinkInfo']['COLOR'] = 'textureColor_' + shaderIndex
        self.compileInfo['uniforms'][t1[2] + '_' + shaderIndex] = t0
        // 텍스쳐 코드생성
        self.compileInfo['header'].push(
            'textureColor_' + shaderIndex + '= texture2D(' + t1[2] + '_' + shaderIndex + ',vTexcoord);\n'
        )
        // 베어링
        t1 = 'varying vec2 vTexcoord'
        t1 = t1.split(' ')
        t0 = {
            type: t1[0],
            dataType: t1[1],
            varName: t1[2],
            varCompiledName : t1[2] + '_' + shaderIndex
        }
        self.compileInfo['varyings'][t1[2]] = t0
        // 변수
        t1 = 'vec4 textureColor'
        t1 = t1.split(' ')
        t0 = {
            type: null,
            dataType: t1[0],
            varName: t1[1],
            varCompiledName : t1[1] + '_' + shaderIndex
        }
        self.compileInfo['vars'][t1[1] + '_' + shaderIndex] = t0
        shaderIndex++
    }
    dataMaker = function () {
        this['compileInfo'] = new Structure_Texture()
        console.log('start 데이터 메이커 ---------------------------------------------------')
        console.log('this.info', this.info)
        console.log('this.info.structure.output', this.info.structure.output)
        console.log('this.compileInfo', this.compileInfo)
        var inoutputList;
        var self = this
        //
        makeTextureBase(self)
        inoutputList = this.queryAll('.outputItem [key]')
        inoutputList = inoutputList.filter(function (item) {
            if (item['next']) {
                for (var k in item['next']) {
                    var tNextItem;
                    var tKEY
                    tNextItem = item['next'][k]
                    tKEY = item.S('@key')
                    console.log(tKEY)
                    switch (tKEY) {
                        case 'RGB':
                            self.compileInfo['header'].push(self.compileInfo['outLinkInfo']['COLOR'] + '.rgb;\n')
                            self.compileInfo['outLinkInfo']['RGB'] = self.compileInfo['outLinkInfo']['COLOR']+'.rgb'
                        break
                        case 'R':
                            self.compileInfo['header'].push(self.compileInfo['outLinkInfo']['COLOR'] + '.r;\n')
                            self.compileInfo['outLinkInfo']['R'] = self.compileInfo['outLinkInfo']['COLOR']+'.r'
                            break
                        case 'G':
                            self.compileInfo['header'].push(self.compileInfo['outLinkInfo']['COLOR'] + '.g;\n')
                            self.compileInfo['outLinkInfo']['G'] = self.compileInfo['outLinkInfo']['COLOR']+'.g'
                            break
                        case 'B':
                            self.compileInfo['header'].push(self.compileInfo['outLinkInfo']['COLOR'] + '.b;\n')
                            self.compileInfo['outLinkInfo']['B'] = self.compileInfo['outLinkInfo']['COLOR']+'.b'
                            break
                        case 'A':
                            self.compileInfo['header'].push(self.compileInfo['outLinkInfo']['COLOR'] + '.a;\n')
                            self.compileInfo['outLinkInfo']['A'] = self.compileInfo['outLinkInfo']['COLOR']+'.a'
                            break
                    }
                }
            }
        })

        console.log(this.compileInfo)
        console.log('end 데이터 메이커 ---------------------------------------------------')
    }
})()