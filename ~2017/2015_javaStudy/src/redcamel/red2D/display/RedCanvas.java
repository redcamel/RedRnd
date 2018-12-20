package redcamel.red2D.display;

import redcamel.red2D.event.RedMouseEvent;
import redcamel.red2D.particle.RedParticaleEmiter;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.util.ArrayList;

/**
 * Created by psk on 2015-08-06.
 */
public class RedCanvas extends JComponent {
	protected RedStage _targetStage;
	protected Graphics2D _context2D;
	protected AffineTransform identity = new AffineTransform();
	protected double _col;
	protected double _row;

	public BufferedImage getMouseBuffer() {
		return _mouseBuffer;
	}

	private BufferedImage _mouseBuffer;
	private Graphics2D _mouseOffScreen2D;

	private BufferedImage _postBuffer;
	private Graphics2D _postOffScreen2D;

	private MouseEvent _mouse;

	/**
	 * 생성자
	 *
	 * @param v
	 */
	public RedCanvas(RedStage v) {
		_targetStage = v;
		_targetStage.addMouseListener(new MouseAdapter() {
			public void mouseReleased(MouseEvent e) {
				_mouse = e;
			}
		});
	}

	private void initMouseBuffer() {
		if (_mouseBuffer == null) {
			_mouseBuffer = new BufferedImage(getWidth(), getHeight(), BufferedImage.TYPE_3BYTE_BGR);
			_postBuffer = (BufferedImage) createImage(getWidth(), getHeight());
		}
		_mouseOffScreen2D = _mouseBuffer.createGraphics();
		_postOffScreen2D = _postBuffer.createGraphics();
	}

	//	public Color printPixelARGB(int pixel) {
	//		int alpha = (pixel >> 24) & 0xff;
	//		int red = (pixel >> 16) & 0xff;
	//		int green = (pixel >> 8) & 0xff;
	//		int blue = (pixel) & 0xff;
	//		return new Color(red,green,blue,alpha);
	//	}

	/**
	 * 이놈이 업데이트인데 오버라이드해서 써야되네 -_-;;
	 *
	 * @param v
	 */

	public void paintComponent(Graphics v) {
		super.paintComponent(v); // <-- 반드시 호출
		initMouseBuffer();
		_mouseOffScreen2D.clearRect(0, 0, getWidth(), getHeight());
		_postOffScreen2D.clearRect(0, 0, getWidth(), getHeight());
		int i, num;
		RedSheet tSheet;
		RedSprite tItem;
		ArrayList<RedSprite> _tList = _targetStage.getChildList();

		// 2D로 할떄는 컨텍스트를 따로 얻어야하는구만..
		_context2D = (Graphics2D) v;
		//		_context2D = (Graphics2D) v;
		_context2D.setBackground(new Color(0, 0, 0));
		_context2D.clearRect(0, 0, _targetStage.getWidth(), _targetStage.getHeight());
		// TODO 앨리어싱 옵션을 좀더 알아봐야겠군..
		RenderingHints rh;
		rh = new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		_context2D.addRenderingHints(rh);
		rh = new RenderingHints(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		_context2D.addRenderingHints(rh);
		// 블렌드 모드는...이렇게하는거니.
		AlphaComposite alpha100 = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 1.0f);
		num = _tList.size();
		for (i = 0; i < num; i++) {
			tItem = _tList.get(i);
			/////////////////////////////////////////////////
			// TODO 아핀은 객체가 먹는게 맞겠군..
			// 음 필요없을려나..
			_context2D.setTransform(identity);
			//////////////////////////////////////////////////////////////////////////////
			// 상태머신 기본 아핀 변환
			_context2D.translate(tItem.x, tItem.y);
			_context2D.rotate(tItem.rotate);
			_context2D.translate(-(tItem.width * tItem.scaleX * 0.5), -(tItem.height * tItem.scaleY * 0.5));
			//////////////////////////////////////////////////////////////////////////////
			if (tItem instanceof RedParticaleEmiter) {
				((RedParticaleEmiter) tItem).run();
				ArrayList<RedSheet> tList = ((RedParticaleEmiter) tItem).getList();
				int j = 0;
				int j2 = tList.size();
				AffineTransform prev = _context2D.getTransform();
				for (j = 0; j < j2; j++) {
					RedSheet particle = tList.get(j);
					_context2D.translate(particle.x, particle.y);
					_context2D.rotate(particle.rotate);
					_context2D.translate(-(particle.width * particle.scaleX * 0.5), -(particle.height * particle.scaleY * 0.5));
					//					_context2D.scale(particle.scaleX * particle.width / particle.image.getWidth(null), particle.scaleY * particle.height / particle.image.getHeight(null));
					//					AlphaComposite ac = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, (float) particle.alpha);
					//					_context2D.setComposite(ac);
					//					_context2D.drawImage(particle.image, 0, 0, null);


					int W, H;
					W = particle.image.getWidth(null);
					H = particle.image.getHeight(null);
					_context2D.scale(particle.scaleX, particle.scaleY);
					particle.perW = W / particle.col;
					particle.perH = H / particle.row;
					particle.frame++;
					particle.frame = particle.frame == (particle.totalFrame) ? 0 : particle.frame;
					_col = particle.frame % particle.col;
					_row = Math.floor(particle.frame / particle.col);
					float tAlpha = (float) particle.alpha;
					if (tAlpha > 1.0) tAlpha = 1.0f;
					if (tAlpha < 0.0) tAlpha = 0.0f;
					AlphaComposite ac = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, tAlpha);
					_context2D.setComposite(ac);
					_context2D.drawImage(particle.image, 0, 0, (int) particle.width, (int) particle.height, (int) (particle.perW * _col), (int) (particle.perH * _row), (int) (particle.perW * (_col + 1)), (int) (particle.perH * (_row + 1)), this);

					_context2D.setTransform(prev);
				}
			} else {
				_context2D.setComposite(alpha100);
			}
			// Sheet
			if (tItem instanceof RedSheet) {
				tSheet = (RedSheet) tItem;
				// 스케일을 1로 정규화하고
				int W, H;
				W = tItem.image.getWidth(null);
				H = tItem.image.getHeight(null);

				_context2D.scale(tItem.scaleX, tItem.scaleY);

				tSheet.perW = W / tSheet.col;
				tSheet.perH = H / tSheet.row;
				tSheet.frame++;
				tSheet.frame = tSheet.frame == (tSheet.totalFrame) ? 0 : tSheet.frame;

				_col = tSheet.frame % tSheet.col;
				_row = Math.floor(tSheet.frame / tSheet.col);

				_context2D.drawImage(tSheet.image, 0, 0, (int) tSheet.width, (int) tSheet.height, (int) (tSheet.perW * _col), (int) (tSheet.perH * _row), (int) (tSheet.perW * (_col + 1)), (int) (tSheet.perH * (_row + 1)), this);
			}
			//////////////////////////////////////////////////////////////////////////////
			// Sprite
			else if (tItem instanceof RedSprite) {
				if (tItem.image == null) {
					// Color
					_context2D.setColor(tItem.color);
					_context2D.scale(tItem.scaleX * tItem.width, tItem.scaleY * tItem.height);
					_context2D.fill(tItem.shape);
				} else {
					// Image
					_context2D.scale(tItem.scaleX * tItem.width / tItem.image.getWidth(null), tItem.scaleY * tItem.height / tItem.image.getHeight(null));
					_context2D.drawImage(tItem.image, 0, 0, null);
				}
			}
			// TODO 이벤트있는녀석만 그리기
			_mouseOffScreen2D.setTransform(identity);
			// 상태머신 기본 아핀 변환
			_mouseOffScreen2D.translate(tItem.x, tItem.y);
			_mouseOffScreen2D.rotate(tItem.rotate);
			_mouseOffScreen2D.translate(-(tItem.width * tItem.scaleX * 0.5), -(tItem.height * tItem.scaleY * 0.5));
			_mouseOffScreen2D.setColor(tItem.getUniqueColor());
			_mouseOffScreen2D.scale(tItem.scaleX * tItem.width, tItem.scaleY * tItem.height);
			_mouseOffScreen2D.fill(tItem.shape);
		}
		_mouseOffScreen2D.dispose();
		_mouseOffScreen2D.setTransform(identity);
		_context2D.setTransform(identity);


		// TODO 마우스 이벤트 시스템도 만들어야되는군 -_-^
		if (_mouse != null) {
			int tColor = _mouseBuffer.getRGB(_mouse.getX(), _mouse.getY());
			RedDisplayObject checkItem = RedDisplayObject.colorMaps.get(tColor);
			if (checkItem != null) {
				System.out.print("\n" + "클릭되었어!" + checkItem.name);
				RedMouseEvent evt = new RedMouseEvent(_mouse, checkItem);
				checkItem.fireRedEvent(evt);
			}
			_mouse = null;
		}

	}
}