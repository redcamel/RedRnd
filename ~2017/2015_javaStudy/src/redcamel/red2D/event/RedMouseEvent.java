package redcamel.red2D.event;

import redcamel.red2D.display.RedDisplayObject;

import java.awt.event.MouseEvent;
import java.util.EventObject;

/**
 * Created by psk on 2015-08-12.
 */

public class RedMouseEvent extends EventObject {
	public RedDisplayObject target;
	public double x;
	public double y;

	public RedMouseEvent(MouseEvent source, RedDisplayObject v) {
		super(source);
		target = v;
		x = source.getX();
		y = source.getX();
	}
}

