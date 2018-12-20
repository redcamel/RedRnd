package redcamel.red2D.display;

import redcamel.red2D.tween.RedTween;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by psk on 2015-08-06.
 */
public class RedRender {
	private static long GAP = 1000 / 60;
	public int fps = 60;
	public double avgFPS = 60;
	public int frame = 0;

	// TODO 렌더러가 스테이지를 몰라야되는건 아닌가...
	// 뭔가 역활이 중복임....

	/**
	 * 생성자
	 *
	 * @param v1
	 * @param v2
	 */
	public RedRender(RedStage v1, RedCanvas v2) {
		Tick tick = new Tick();
		tick.initialize(this, v1, v2);
		Timer timer = new Timer();
		timer.schedule(tick, 0, GAP);
	}
}

/**
 * 단위 실행 명령
 */
class Tick extends TimerTask {
	private RedRender _tRenderer;
	private RedCanvas _tCanvas;
	private RedStage _tStage;
	private long _prevTime = 0;
	private long _currentTime = 0;
	private int _totalFPS = 0;

	/**
	 * 초기화
	 *
	 * @param v0
	 * @param v1
	 * @param v2
	 */
	public void initialize(RedRender v0, RedStage v1, RedCanvas v2) {
		_tRenderer = v0;
		_tStage = v1;
		_tCanvas = v2;
		_prevTime = new Date().getTime();
	}

	/**
	 * 실제 루프
	 */
	public void run() {
		//TODO 음 렌더 동기화 체크는 어떻게 하지?
		_currentTime = new Date().getTime();
		_tRenderer.fps = (int) (1000f / (_currentTime - _prevTime));
		if (_currentTime - _prevTime > 8) {
			// 시스템업데이트
			_tStage.updateLoop();
			// 트윈 업데이트
			RedTween.updateTweens();
			// 렌더업데이트
			_tCanvas.repaint();
			_tRenderer.frame++;
			_prevTime = new Date().getTime();
			_totalFPS += _tRenderer.fps;
			_tRenderer.avgFPS = (_totalFPS / _tRenderer.frame);
		}

	}
}
