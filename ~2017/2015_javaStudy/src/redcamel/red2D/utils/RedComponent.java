package redcamel.red2D.utils;

import javafx.beans.DefaultProperty;

import javax.swing.*;
import java.awt.*;

/**
 * Created by psk on 2015-08-13.
 */
public class RedComponent {
	public static JButton makeJButton(String title, int x, int y, int w, int h) {
		JButton result = new JButton();
		result.setText(title);
		result.setBounds(x, y, w, h);
		result.setPreferredSize(new Dimension(w, h));
		return result;
	}

	public static JComboBox makeJCombo(String[] list, int x, int y, int w, int h, int selected) {
		JComboBox result = new JComboBox(list);
		result.setSelectedIndex(selected);
		result.setBounds(x, y, w, h);
		result.setPreferredSize(new Dimension(w, h));
		return result;
	}



	public static JSlider makeJSlider(String tooltipText, int direction, int min, int max, int init, int x, int y, int w, int h, int spacing, int labelSpacing) {
		JSlider result = new JSlider(direction, min, max, init);
		result.addChangeListener(null);
		result.setBounds(x, y, w, h);
		result.setPreferredSize(new Dimension(w, h));
		result.setSize(new Dimension(w, h));
		result.setMajorTickSpacing(spacing);
		result.setToolTipText(tooltipText);
		result.setLabelTable(result.createStandardLabels(labelSpacing));
		result.setPaintLabels(true);
		return result;
	}


}
