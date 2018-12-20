package redcamel.red2D.utils;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;


public class RedImageLoader {

	private ArrayList<Image> _images = new ArrayList<Image>();

	private ArrayList<File> _files = new ArrayList<File>();

	public int size() {
		return _images.size();
	}

	public RedImageLoader(String... arguments) {

		int i, len;
		len = arguments.length;
		for (i = 0; i < len; i++) {
			_files.add(new File(arguments[i]));
		}
		try {
			len = _files.size();
			for (i = 0; i < len; i++) {
				_images.add(ImageIO.read(_files.get(i)));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public Image get(int index) {
		return _images.get(index);
	}
}
