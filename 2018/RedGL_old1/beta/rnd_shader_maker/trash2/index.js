'use strict';

Recard.static('INDEX', (function () {
    var result;
    var svgList = []
    result = {
        getLineList : function(){
            return svgList
        },
        init: function () {
            Recard.Css('body').S(
                'background', 'url(grid.png)',
                'font-size', 12,
                'color', '#fff',
                'user-select', 'none'
            )
            Recard.Css('.inputItem').S(
                'position', 'relative',
                'text-align', 'left',
                'padding-left', 10,
                'height', 20,
                'color', 'rgb(242, 169, 113)',
                'font-size', 11,
                'line-height', 20
            )
            Recard.Css('.outputItem').S(
                'position', 'relative',
                'text-align', 'right',
                'padding-right', 10,
                'height', 20,
                'font-size', 11,
                'color', 'rgb(242, 169, 113)',
                'line-height', 20
            )
            /////////////////////////////////////
            var info;
            info = {}
            info['structure'] = {
                title: null,
                output: {
                    TEXTURE: null,
                    R: null,
                    G: null,
                    B: null,
                    A: null
                },
                input: {
                    UV: null,
                    TEST: null
                }
            }
            info.src = ''
            /////////////////////////////////////
            var diffuse, normal;
            diffuse = new Structure_Texture(info)
            normal = new Structure_Texture(info)
            console.log(diffuse)

            diffuse['next']['UV'] = {
                target: normal,
                targetKey : 'TEXTURE'
            }
            normal['prev']['TEXTURE'] = {
                target: diffuse,
                targetKey : 'UV'
            }
            diffuse.S('left', 100)
            normal.S('left', 400)
            
            Recard.UPDATER.init()
            

            Recard.Dom('button').S(
                'position','absolute',
                'bottom',10,
                'left',10,
                'z-index',1,
                'padding',10,
                'background','#5b52aa',
                'color','#fff',
                'outline','none',
                'border',0,
                'cursor','pointer',
                'html','텍스쳐추가',
                '<','body',
                'on',['down',function(){
                    console.log('test'),
                    (new Structure_Texture(info)).S(
                        '<','body'
                    )
                }]
            )

            Recard.Dom('body').S(
                '>', diffuse,
                '>', normal
            )
        }
    }
    return result
})())