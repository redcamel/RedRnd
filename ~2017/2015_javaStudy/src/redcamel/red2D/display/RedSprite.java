package redcamel.red2D.display;

import java.awt.*;

/**
 * Created by psk on 2015-08-06.
 */
public class RedSprite extends RedDisplayObject {
	public static String INSTANCE_NAME = "RedSprite_instance";
	public static Shape shape = new Rectangle(1, 1);


	/**
	 * 생성자
	 */
	public RedSprite() {
		super();
		name = INSTANCE_NAME + UUID;
	}


}
