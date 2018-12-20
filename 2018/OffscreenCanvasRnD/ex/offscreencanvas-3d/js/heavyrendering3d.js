/**
 * Canvasにレンダリングを行う処理です。
 * メイン/Workerどちらのスレッドからでも使用できるようになっています。
 */
class HeavyRendering3D {

  /**
   * コンストラクタです。
   *
   * @param canvas Canvasオブジェクト、もしくはOffscreenCanvasオブジェクト
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.stageWidth = this.canvas.width;
    this.stageHeight = this.canvas.height;

    this.renderer = null;
    this.camera = null;
    this.scene = null;
    this.meshList = [];
    this.geometry = null;
    this.theta = 0.0;
    this.phi = 0.0;
    this.cameraTarget = null;

    if (!this.canvas.style) {
      // Three.jsは内部でCanvas要素のstyleにアクセスする
      // Workerスレッドで使用する場合、OffscreenCanvasにはstyleがないため明示的に設定する
      this.canvas.style = {width: 0, height: 0};
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setSize(this.stageWidth, this.stageHeight);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.stageWidth / this.stageHeight, 1, 10000);
    this.camera.position.set(0, 0, 1000);
    this.cameraTarget = new THREE.Vector3(0, 0, 0);

    this.geometry = new THREE.CubeGeometry(10, 10, 10, 1, 1, 1);
  };


  /**
   * レンダラーの設定を更新します。
   *
   * @param value 更新プロパティ
   */
  update(value) {
      console.log(' 업데이트1')
  }

  /**
   * 画面を描画します。
   */
  render() {
    console.log(' 렌더1')
  }
}

// HeavyRendering3Dクラスをスコープに展開する。
// selfはメインスレッドではWindow、WorkerスレッドではDedicatedWorkerGlobalScopeになる
self.HeavyRendering3D = HeavyRendering3D;