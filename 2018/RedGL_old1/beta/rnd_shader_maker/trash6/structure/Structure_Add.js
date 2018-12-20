'use strict';
var Structure_Add;
(function () {
    var index;
    index = 0
    Structure_Add = function () {
        this['nodeType'] = 'Add'
        this['index'] = index
        this['structure'] = {
            input: {
                INPUT1: {
                    dataType: null,
                    from: null
                },
                INPUT2: {
                    dataType: null,
                    from: null
                }
            },
            output: {
                OUTPUT: { dataType: null, to: {} }
            }
        }
        this['compileInfo'] = new CompileInfo()
        index++
        console.log(this)
    }
    Object.freeze(Structure_Add)
})();