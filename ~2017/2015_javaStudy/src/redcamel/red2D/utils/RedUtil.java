package redcamel.red2D.utils;

import redcamel.red2D.display.RedSprite;
import redcamel.red2D.display.RedStage;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by psk on 2015-08-11.
 */
public class RedUtil {

	/**
	 * 스크린샷 저장하기
	 *
	 * @param v
	 * @param src
	 */
	public static void saveImage(BufferedImage v, String src) {
		try {
			ImageIO.write(v, "png", new File(src));
		} catch (IOException e) {
			//			System.out.print(e);
		}
	}

	/**
	 * 절대경로 만들기
	 *
	 * @param v
	 * @return
	 */
	public static String getAbsolutePath(String v) {
		File _file = new File(v);
		return _file.getAbsolutePath() + "\\";
	}

	public static String getStageDataToJSON(RedStage v) {
		int i;
		ArrayList<RedSprite> child = v.getChildList();
		RedSprite tItem;
		String result = "\r\n{";
		result += "\r\n \"child\" : [";
		i = child.size();
		while (i-- > 0) {
			tItem = child.get(i);
			result += "\r\n{";
			result += "\r\n \"class\" : \"" + tItem.getClass().getName() + "\",";
			result += "\r\n \"x\" : \"" + tItem.x + "\",";
			result += "\r\n \"y\" : \"" + tItem.y + "\",";
			result += "\r\n \"rotate\" : \"" + tItem.rotate + "\",";
			result += "\r\n \"scaleX\" : \"" + tItem.scaleX + "\",";
			result += "\r\n \"scaleY\" : \"" + tItem.scaleY + "\",";
			result += "\r\n \"width\" : \"" + tItem.width + "\",";
			result += "\r\n \"height\" : \"" + tItem.height + "\"";
			if(i>0) result += "\r\n},";
			else result += "\r\n}";
		}
		result += "\r\n]";
		result += "\r\n{";
		return result;
	}

}
