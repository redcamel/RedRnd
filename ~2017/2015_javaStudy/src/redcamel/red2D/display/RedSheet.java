package redcamel.red2D.display;

/**
 * Created by psk on 2015-08-06.
 */
public class RedSheet extends RedSprite {
	public static String INSTANCE_NAME = "RedSheet_instance";
	public int col, row, frame, totalFrame;
	public double perW, perH;

	/**
	 * 생성자
	 */
	public RedSheet() {
		super();
		col = 1;
		row = 1;
		totalFrame = 1;
		frame = 0;
	}
}
