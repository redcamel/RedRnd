'use strict';
var Structure_Multiply;
(function () {
    var index;
    index = 0
    Structure_Multiply = function () {
        this['nodeType'] = 'Multiply'
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
        
        index++
        console.log(this)
    }
    Object.freeze(Structure_Multiply)
})();