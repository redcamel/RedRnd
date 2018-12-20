var Point = (function () {
    'use strict';
    // var geometry, material, pointSize;
    var pointsize;
    
    // geometry = {},
    // material = {},
    pointsize = {};
      
    $setPrivate('Point', {
        // geometry : geometry,
        // material : material,
        pointsize : pointsize
    });
    // return Matrix.extend('Point',{
    return Mesh.extend('Point',{
        description:"점을 이루는 Mesh",
        param:[
        ],
        sample:[
            "var pt1 = new Point(geometry, material);",
            "//팩토리함수로도 사용가능",
            "var pt5 = Point(geometry, material);"
        ],
        value:function Point(geometry, material) {
            // this.geometry = geometry;
            // this.material = material;
            pointsize[this] = 1;
        }
    })
    .field('pointsize', {
        description: "점의 크기",
        sample: [
            '// 미구현상태임'
        ],
        defaultValue: 1,
        get:$getter(pointsize),
        set:function pointsizeSet(v) {
            pointsize[this] = v;
        }
    })
    // .field('geometry', {
    //     description: "이 Point의 기하구조 정보를 가지는 [Geometry](Geometry.md) 객체",
    //     sample: [
    //         ""
    //     ],
    //     exception: "* 'Mesh.geometrySet:0' - geometry 아닌 값를 필드에 입력하려는 경우",
    //     get:$getter(geometry),
    //     set:function geometrySet(v) {
    //         if (v instanceof Geometry) {
    //             geometry[this] = v;
    //             this.dispatch('changed')
    //         } else {
    //             this.error(0);
    //         }
    //     }
    // })
    // .field('material', {
    //     description: "이 Point의 재질을 표현하는 [Material](Material.md) 객체",
    //     sample: [
    //         ""
    //     ],
    //     exception:"* 'Mesh.materialSet:0' - material객체가 아닌 값를 필드에 입력하려는 경우",
    //     get:$getter(material),
    //     set:function materialSet(v) {
    //         if (v instanceof Material) {
    //             material[this] = v;
    //             this.dispatch('changed')
    //         } else {
    //             this.error(0);
    //         }
    //     }
    // })
    .build();
})();