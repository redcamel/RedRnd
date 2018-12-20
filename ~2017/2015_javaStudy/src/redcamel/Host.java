package redcamel;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import redcamel.red2D.display.RedRender;
import redcamel.red2D.display.RedSheet;
import redcamel.red2D.display.RedSprite;
import redcamel.red2D.display.RedStage;
import redcamel.red2D.event.RedMouseEvent;
import redcamel.red2D.event.RedMouseEventListener;
import redcamel.red2D.particle.RedParticaleEmiter;
import redcamel.red2D.tween.RedTween;
import redcamel.red2D.tween.RedTweenInfo;
import redcamel.red2D.utils.RedComponent;
import redcamel.red2D.utils.RedImageLoader;
import redcamel.red2D.utils.RedUtil;

import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.TimerTask;

/**
 * Created by psk on 2015-08-07.
 */
public class Host {
	private static int W = 1280;
	private static int H = 1024;

	private static int MARGIN_X = 5;
	private static int MARGIN_Y = 5;

	public static String assetPath = RedUtil.getAbsolutePath("src/redcamel/assets");
	public static TextArea fpsText;
	public static RedStage stage;
	public static JPanel container = new JPanel();
	public RedImageLoader imgLoader;

	public Host() {
		stage = new RedStage(W, H);
		container = new JPanel();
		container.setBounds(0, 0, 210, stage.getHeight());
		stage.add(container, 0);

		setTweenUI();
		setFPSUI();
		setFilesUI();
		setBufferSavesUI();
		setChildTest();
		setJSONTest();
		setParticle_UI();
		setKeyboardTest();
		stage.addLoop(new HostLoop(stage));

	}

	public void setChildTest() {
		int i, len;
		double scale;
		len = 1000;
		RedSprite tItem;
		RedSheet tSheet;
		imgLoader = new RedImageLoader(assetPath + "explosion.png", assetPath + "sheet.png", assetPath + "Test.png", assetPath + "sheet2.png");
		for (i = 0; i < len; i++) {
			if (i % 7 == 0) {
				scale = Math.random() * 2;
				tSheet = new RedSheet();
				tSheet.col = 29;
				tSheet.totalFrame = 29;
				tSheet.frame = (int) (Math.random() * tSheet.col);
				tSheet.image = imgLoader.get(0);
				tItem = tSheet;
			} else if (i % 9 == 0) {
				scale = Math.random() * 2;
				tSheet = new RedSheet();
				tSheet.col = 8;
				tSheet.totalFrame = 8;
				tSheet.frame = (int) (Math.random() * tSheet.col);
				tSheet.image = imgLoader.get(1);
				tItem = tSheet;
				tItem = tSheet;
			} else if (i % 5 == 0) {
				scale = Math.random() * 1.5;
				tItem = new RedSprite();
				tItem.image = imgLoader.get(2);
			} else {
				scale = Math.random() * 0.5;
				tItem = new RedSprite();
				tItem.width = (int) (200 * Math.random());
				tItem.height = (int) (200 * Math.random());
			}
			tItem.x = Math.random() * W;
			tItem.y = Math.random() * H;
			tItem.scaleX = tItem.scaleY = scale;
			tItem.rotate = Math.random();
			stage.addChild(tItem);
		}
		for (i = 0; i < 100; i++) {
			RedSheet target = new RedSheet();
			stage.addChild(target);
			target.x = 0.0;
			target.y = stage.getHeight() * Math.random();
			target.image = imgLoader.get(3);

			target.col = 5;
			target.row = 3;
			target.totalFrame = 15;
			double tScale = 0.7;
			target.width = target.image.getWidth(null) / target.col * tScale;
			target.height = target.image.getHeight(null) / target.row * tScale;

			RedTweenInfo tweenInfo = new RedTweenInfo();
			tweenInfo.put("time", 3000.0);
			tweenInfo.put("x", Math.random() * 1000);
			tweenInfo.put("y", Math.random() * H);
			tweenInfo.put("rotate", Math.random() * Math.PI * 2);
			tweenInfo.put("easing", RedTween.EASE_QUINT_OUT);
			RedTween.to(target, tweenInfo);

			target.addRedEventListener(new RedMouseEventListener() {
				@Override
				public void RedEventOccurred(RedMouseEvent e) {
					RedSprite target = (RedSprite) e.target;
					RedTweenInfo tweenInfo = new RedTweenInfo();
					tweenInfo.put("time", 1000.0);
					tweenInfo.put("x", (double) (Math.random() * W));
					tweenInfo.put("y", (double) stage.getHeight() * Math.random());
					tweenInfo.put("rotate", Math.random() * Math.PI * 2);
					tweenInfo.put("easing", RedTween.EASE_QUINT_OUT);
					RedTween.to(target, tweenInfo);
				}
			});
		}
		//
		for (int j = 0; j < 100; j++) {
			RedSprite target = new RedSprite();
			target.x = 0.0;
			target.y = stage.getHeight() * Math.random();
			stage.addChild(target);
			target.image = imgLoader.get(2);
			RedTweenInfo tweenInfo = new RedTweenInfo();
			tweenInfo.put("time", 2000.0);
			tweenInfo.put("x", Math.random() * W);
			tweenInfo.put("y", Math.random() * H);
			tweenInfo.put("rotate", Math.random() * Math.PI * 2);
			tweenInfo.put("easing", RedTween.EASE_QUINT_INOUT);
			RedTween.to(target, tweenInfo);
		}
	}

	public void setJSONTest() {
		JSONObject root = jsonCheck();
		System.out.print(root.get("q"));
		stage.setTitle("제목 : " + (String) root.get("q"));

		JSONObject items = (JSONObject) (((JSONObject) (((JSONArray) root.get("item")).get(0))).get("photo1"));
		System.out.print(items.get("content"));
		//TODO 스트림 이미지 리더를 맹그러야하는군
	}

	public void setKeyboardTest() {
		// TODO 키보드 버퍼 체킹 시스템도 맹그러야되는군....
		RedSheet tObj = new RedSheet();
		tObj.col = 29;
		tObj.totalFrame = 29;
		tObj.frame = (int) (Math.random() * tObj.col);
		tObj.image = imgLoader.get(0);
		tObj.width = 200;
		tObj.height = 200;
		stage.addChild(tObj);
		tObj.x = stage.getWidth() / 2;
		tObj.y = stage.getHeight() / 2;
		stage.setFocusable(true);
		stage.addKeyListener(new KeyAdapter() {
			@Override
			public void keyReleased(KeyEvent e) {
				super.keyReleased(e);
				System.out.print("\n" + e);
				if (e.getKeyChar() == 'r') {
					int i, len = stage.getChildList().size();
					RedSprite tItem;
					for (i = 0; i < len; i++) {
						tItem = stage.getChildList().get(i);
						RedTweenInfo tweenInfo = new RedTweenInfo();
						double scale = Math.random();
						tweenInfo.put("x", stage.getWidth() * Math.random());
						tweenInfo.put("y", stage.getHeight() * Math.random());
						tweenInfo.put("rotate", Math.random() * Math.PI * 2);
						tweenInfo.put("scaleX", scale);
						tweenInfo.put("scaleY", scale);
						tweenInfo.put("time", (double) 1000);
						tweenInfo.put("easing", 2.0);
						RedTween.to(tItem, tweenInfo);
					}
				}
			}


			@Override
			public void keyPressed(KeyEvent e) {
				super.keyPressed(e);
				if (e.getKeyChar() == 'd') {
					RedTweenInfo tweenInfo = new RedTweenInfo();
					tweenInfo.put("x", tObj.x + 100);
					tweenInfo.put("time", (double) 500);
					tweenInfo.put("easing", 2.0);
					RedTween.to(tObj, tweenInfo);
				}
				if (e.getKeyChar() == 'a') {
					RedTweenInfo tweenInfo = new RedTweenInfo();
					tweenInfo.put("x", tObj.x - 100);
					tweenInfo.put("time", (double) 500);
					tweenInfo.put("easing", 2.0);
					RedTween.to(tObj, tweenInfo);
				}

				if (e.getKeyChar() == 'w') {
					RedTweenInfo tweenInfo = new RedTweenInfo();
					tweenInfo.put("y", tObj.y - 100);
					tweenInfo.put("time", (double) 500);
					tweenInfo.put("easing", 2.0);
					RedTween.to(tObj, tweenInfo);
				}
				if (e.getKeyChar() == 's') {
					RedTweenInfo tweenInfo = new RedTweenInfo();
					tweenInfo.put("y", tObj.y + 100);
					tweenInfo.put("time", (double) 500);
					tweenInfo.put("easing", 2.0);
					RedTween.to(tObj, tweenInfo);
				}
			}
		});
	}

	public void setParticle_UI() {
		RedImageLoader particleImages = new RedImageLoader(assetPath + "particle.png", assetPath + "particle2.png", assetPath + "particle3.png", assetPath + "particle4.png");
		ArrayList<RedParticaleEmiter> list = new ArrayList<RedParticaleEmiter>();
		RedParticaleEmiter emiter;
		int i = 10;
		while (i-- > 0) {
			emiter = new RedParticaleEmiter(100, 3000, particleImages);
			emiter.x = stage.getWidth() / 2 + Math.random() * 400 - 200;
			emiter.y = stage.getHeight() / 2 + stage.getHeight() / 3 + Math.random() * 400 - 200;
			emiter.rotate = Math.random();
			list.add(emiter);
			stage.addChild(emiter);
		}

		addTitle("파티클 테스트");
		JSlider particleNum = RedComponent.makeJSlider("particleNum", JSlider.HORIZONTAL, 0, 500, 100, MARGIN_X, MARGIN_Y, 200, 50, 1, 100);
		container.add(particleNum, 0);
		MARGIN_Y += particleNum.getHeight() + 1;

		particleNum.addChangeListener(new ChangeListener() {
			@Override
			public void stateChanged(ChangeEvent e) {
				int i = list.size();
				RedParticaleEmiter emiter;
				while (i-- > 0) {
					emiter = list.get(i);
					emiter.num = particleNum.getValue();
				}
			}
		});
		addSeperator();


	}

	public JSONObject jsonCheck() {
		// TODO Http 통신도 맹그러야되네..
		JSONObject root = null;
		URL url = null;
		URLConnection urlConnerction = null;

		try {
			url = new URL("https://apis.daum.net/contents/movie?apikey=69c0baaedf70766a0bb35f5041e03b64&q=%EB%AF%B8%EC%83%9D&output=json");
		} catch (MalformedURLException me) {
		}

		try {
			urlConnerction = url.openConnection();
		} catch (IOException io) {
		}

		urlConnerction.setDoOutput(true);  // 스트림 출력 설정
		urlConnerction.setDoInput(true);    // 스트림 입력 설정 -- 기본적으로 입력 스트림
		OutputStream out = null;
		BufferedReader in = null;
		try {
			//TODO 인코딩 형식도 체크해야하는군
			in = new BufferedReader(new InputStreamReader(urlConnerction.getInputStream(), "UTF-8"));
			String str = "";
			while (true) {
				int data = in.read();
				if (data == -1) break;
				char ch = (char) data;
				str += ch;
			}
			JSONParser parser = new JSONParser();
			try {
				JSONObject data = (JSONObject) parser.parse(str);
				root = (JSONObject) data.get("channel");
				return root;
			} catch (Exception e) {
			}
		} catch (IOException ie) {
		}
		return root;
	}


	public void setTweenUI() {
		addTitle("트윈 테스트");
		JSlider slider_time = RedComponent.makeJSlider("TweenTime", JSlider.HORIZONTAL, 1000, 5000, 1000, MARGIN_X, MARGIN_Y, 200, 50, 1000, 1000);
		container.add(slider_time, 0);
		MARGIN_Y += slider_time.getHeight() + 1;
		JSlider slider_scale = RedComponent.makeJSlider("TweenScale", JSlider.HORIZONTAL, 0, 4, 1, MARGIN_X, MARGIN_Y, 200, 50, 1, 1);
		container.add(slider_scale, 0);
		MARGIN_Y += slider_scale.getHeight() + 1;
		String[] list = {"EASE_QUINT_IN", "EASE_QUINT_OUT", "EASE_QUINT_INOUT", "EASE_SINE_IN", "EASE_SINE_OUT", "EASE_SINE_INOUT", "EASE_EXPO_IN", "EASE_EXPO_OUT", "EASE_EXPO_INOUT"};
		JComboBox easeing = RedComponent.makeJCombo(list, MARGIN_X, MARGIN_Y, 200, 30, 2);
		container.add(easeing, 0);
		MARGIN_Y += easeing.getHeight() + 1;
		JButton bt_startTween = RedComponent.makeJButton("TweenStart", MARGIN_X, MARGIN_Y, 200, 30);
		container.add(bt_startTween, 0);
		MARGIN_Y += bt_startTween.getHeight() + 1;
		bt_startTween.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseReleased(MouseEvent e) {
				super.mouseReleased(e);
				stage.setFocusableWindowState(true);
				int i, len = stage.getChildList().size() - 1;
				RedSprite tItem;
				for (i = 0; i < len; i++) {
					tItem = stage.getChildList().get(i);
					RedTweenInfo tweenInfo = new RedTweenInfo();
					double scale = Math.random();
					tweenInfo.put("x", stage.getWidth() * Math.random());
					tweenInfo.put("y", stage.getHeight() * Math.random());
					tweenInfo.put("rotate", Math.random() * Math.PI * 2);
					tweenInfo.put("scaleX", (double) slider_scale.getValue());
					tweenInfo.put("scaleY", (double) slider_scale.getValue());
					tweenInfo.put("time", (double) slider_time.getValue());
					tweenInfo.put("easing", easeing.getSelectedIndex() * 1.0);
					RedTween.to(tItem, tweenInfo);
				}
			}
		});
		addSeperator();
	}

	public void setBufferSavesUI() {
		addTitle("버퍼저장 테스트");
		JButton bt_saveMouseBuffer = RedComponent.makeJButton("MouseBuffer ScreenShot", MARGIN_X, MARGIN_Y, 200, 30);
		container.add(bt_saveMouseBuffer, 0);
		MARGIN_Y += bt_saveMouseBuffer.getHeight() + 1;
		bt_saveMouseBuffer.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseReleased(MouseEvent e) {
				super.mouseReleased(e);
				JFileChooser browser = new JFileChooser();
				browser.setDialogType(JFileChooser.SAVE_DIALOG);
				browser.setDialogTitle("마우스버퍼 저장해보자!");
				browser.setCurrentDirectory(new File("D:/"));
				browser.addActionListener(new ActionListener() {
					@Override
					public void actionPerformed(ActionEvent e) {
						String src = browser.getSelectedFile().toString();
						System.out.print("\n" + src + "파일이 저장됩니다.");
						RedUtil.saveImage(stage.getBufferImage(), src);
					}
				});
				browser.showSaveDialog(null);
			}
		});

		JButton bt_saveScreenBuffer = RedComponent.makeJButton("ScreenBuffer ScreenShot", MARGIN_X, MARGIN_Y, 200, 30);
		container.add(bt_saveScreenBuffer, 0);
		MARGIN_Y += bt_saveScreenBuffer.getHeight() + 1;
		bt_saveScreenBuffer.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseReleased(MouseEvent e) {
				super.mouseReleased(e);
				JFileChooser browser = new JFileChooser();
				browser.setDialogType(JFileChooser.SAVE_DIALOG);
				browser.setDialogTitle("스크린버퍼저장 저장해보자!");
				browser.setCurrentDirectory(new File("D:/"));
				browser.addActionListener(new ActionListener() {
					@Override
					public void actionPerformed(ActionEvent e) {
						String src = browser.getSelectedFile().toString();
						System.out.print("\n" + src + "파일이 저장됩니다.");
						RedUtil.saveImage(stage.getScreenBuffer(), src);
					}
				});
				browser.showSaveDialog(null);
			}
		});
		addSeperator();
	}

	public void setFPSUI() {
		addTitle("FPS 테스트");
		fpsText = new TextArea("", 5, 1, TextArea.SCROLLBARS_NONE);
		fpsText.setFont(new Font("나눔고딕", Font.PLAIN, 11));
		fpsText.setBounds(MARGIN_X, MARGIN_Y, 200, 100);
		container.add(fpsText);
		MARGIN_Y += fpsText.getHeight() + 1;

	}

	public void setFilesUI() {
		addTitle("파일저장 테스트");
		JButton bt = RedComponent.makeJButton("Save Data", MARGIN_X, MARGIN_Y, 200, 30);
		container.add(bt, 0);
		MARGIN_Y += bt.getHeight() + 1;
		bt.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseReleased(MouseEvent e) {
				super.mouseReleased(e);
				JFileChooser browser = new JFileChooser();
				browser.setDialogType(JFileChooser.SAVE_DIALOG);
				browser.setCurrentDirectory(new File("D:/"));
				browser.addActionListener(new ActionListener() {
					@Override
					public void actionPerformed(ActionEvent e) {
						File file = browser.getSelectedFile().getAbsoluteFile();
						FileWriter writer = null;
						try {
							writer = new FileWriter(file);
							writer.write(RedUtil.getStageDataToJSON(stage));
						} catch (IOException e2) {

						} finally {
							try {
								writer.close();
							} catch (Exception e3) {

							}
						}
					}
				});
				browser.showSaveDialog(null);
			}
		});
		addSeperator();
	}

	public void addSeperator() {
		JSeparator result = new JSeparator(SwingConstants.HORIZONTAL);
		MARGIN_Y += 5;
		result.setBounds(MARGIN_X, MARGIN_Y, 200, 2);
		MARGIN_Y += 5;
		container.add(result, 0);
		MARGIN_Y += result.getHeight();
	}

	public void addTitle(String v) {
		JLabel result = new JLabel(v);
		result.setBounds(MARGIN_X, MARGIN_Y, 200, 30);
		container.add(result, 0);
		MARGIN_Y += result.getHeight();
	}
}

class HostLoop extends TimerTask {
	private RedStage _targetStage;
	private double cnt = 0;
	private ArrayList<RedSprite> _childList;
	private RedSprite tItem;

	public HostLoop(RedStage v) {
		_targetStage = v;
	}

	public void run() {
		_childList = _targetStage.getChildList();
		cnt += Math.PI / 180 * 2.0;
		int i, len = _childList.size() - 200;
		for (i = 0; i < len; i++) {
			tItem = _childList.get(i);
			tItem.rotate += 0.05;
		}

		RedRender renderer = _targetStage.getRenderer();
		Host.fpsText.setText("정확한 FPS추출은 어떻게 하지 -_-? : " +
				"\nFPS : " + String.valueOf(renderer.fps) +
				"\n평균 FPS : " + String.valueOf(renderer.avgFPS) +
				"\nCurrent Frame : " + String.valueOf(renderer.frame) +
				"\n역시 타입에서 먼가 헤깔리는구나...");
		Host.container.setBounds(0, 0, 210, Host.stage.getHeight());
	}
}