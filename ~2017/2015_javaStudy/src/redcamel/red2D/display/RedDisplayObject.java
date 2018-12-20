package redcamel.red2D.display;


import redcamel.red2D.event.RedMouseEvent;
import redcamel.red2D.event.RedMouseEventListener;

import javax.swing.event.EventListenerList;
import java.awt.*;
import java.util.HashMap;

/**
 * 디스플레이 오브젝트 베이스
 * Created by psk on 2015-08-06.
 */
public class RedDisplayObject {
	protected static int UUID = 0;
	public Integer uuid = 0;
	public String name;
	public double x = 0, y = 0, rotate = 0, scaleX = 1, scaleY = 1;
	public double alpha = 1;
	public double width = 32, height = 32;
	public Color color = new Color((int) (Math.random() * 255), (int) (Math.random() * 255), (int) (Math.random() * 255), 100);

	public static HashMap<Integer, RedDisplayObject> colorMaps = new HashMap<Integer, RedDisplayObject>();

	public Color getUniqueColor() {
		return _uniqueColor;
	}

	private Color _uniqueColor;
	/**
	 * 어셋이미지
	 */
	public Image image;

	/**
	 * 생성자
	 */
	public RedDisplayObject() {
		UUID++;
		this.uuid = UUID;
		_uniqueColor = new Color((int) (Math.random() * 255), (int) (Math.random() * 255), (int) (Math.random() * 255));
		colorMaps.put(_uniqueColor.getRGB(), this);
	}

	protected EventListenerList listenerList = new EventListenerList();

	public void addRedEventListener(RedMouseEventListener listener) {
		listenerList.add(RedMouseEventListener.class, listener);
	}

	public void removeRedEventListener(RedMouseEventListener listener) {
		listenerList.remove(RedMouseEventListener.class, listener);
	}

	public void fireRedEvent(RedMouseEvent evt) {
		Object[] listeners = listenerList.getListenerList();
		for (int i = 0; i < listeners.length; i = i + 2) {
			if (listeners[i] == RedMouseEventListener.class) {
				((RedMouseEventListener) listeners[i + 1]).RedEventOccurred(evt);
			}
		}
	}

	public boolean equals(Object obj) {
		if (!(obj instanceof RedDisplayObject)) return false;
		RedDisplayObject temp = (RedDisplayObject) obj;
		return color.equals(temp.color) ? true : false;
	}

	public int hashCode() {
		return color.hashCode();
	}
}
