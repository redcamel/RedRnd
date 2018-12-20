package redcamel.red2D.display;

import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Date;
import java.util.TimerTask;

/**
 * Created by psk on 2015-08-06.
 */
public class RedStage extends JFrame {

	/**
	 * Stage 디멘션
	 */
	private Dimension _stageDimension = new Dimension();
	private RedCanvas _canvas;
	private RedRender _renderer;
	/**
	 * Stage 자식목록
	 */
	private ArrayList<RedSprite> _childList = new ArrayList<RedSprite>();

	public ArrayList<RedSprite> getChildList() {
		return _childList;
	}

	private ArrayList<TimerTask> _loopList = new ArrayList<TimerTask>();
	private BufferedImage _screenBuffer;
	private Graphics2D _screenBuffer2D;


	/**
	 * 생성자
	 *
	 * @param width  - Stage의 가로
	 * @param height - Stage의 가로
	 */
	public RedStage(int width, int height) {
		stageInit(width, height);
		setRender();
	}

	/**
	 * Stage를 초기화 함
	 *
	 * @param width  - Stage의 가로
	 * @param height - Stage의 세로
	 */
	public void stageInit(int width, int height) {
		_stageDimension.width = width;
		_stageDimension.height = height;
		_canvas = new RedCanvas(this);
		setPreferredSize(_stageDimension);
		add(_canvas);
		pack();
		setVisible(true);

	}

	public BufferedImage getBufferImage() {
		return _canvas.getMouseBuffer();
	}

	public BufferedImage getScreenBuffer() {
		if (_screenBuffer == null || (!(_screenBuffer.getWidth() == getWidth()) && !(_screenBuffer.getHeight() == getHeight()))) {
			_screenBuffer = new BufferedImage(getWidth(), getHeight(), BufferedImage.TYPE_4BYTE_ABGR);
			_screenBuffer2D = _screenBuffer.createGraphics();
		}
		this.paint(_screenBuffer2D);
		_screenBuffer.getData(new Rectangle(0, 0, _screenBuffer.getWidth(), _screenBuffer.getHeight()));
		_screenBuffer2D.dispose();
		return _screenBuffer;
	}

	/**
	 * 자식 추가
	 *
	 * @param v - 추가될 자식 객체
	 */
	public void addChild(RedSprite v) {
		_childList.add(v);
	}


	/**
	 * 렌더러
	 * 자동 설정됨
	 */
	private void setRender() {
		_renderer = new RedRender(this, _canvas);
	}

	public RedRender getRenderer() {
		return _renderer;
	}

	/**
	 * 루프추가
	 *
	 * @param v
	 */
	public void addLoop(TimerTask v) {
		_loopList.add(v);
	}

	public void updateLoop() {
		int i = _loopList.size();
		while (i-- > 0) {
			_loopList.get(i).run();
		}
	}
}
