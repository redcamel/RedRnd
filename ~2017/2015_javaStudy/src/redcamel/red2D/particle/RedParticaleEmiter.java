package redcamel.red2D.particle;

import redcamel.red2D.utils.RedImageLoader;
import redcamel.red2D.display.RedSheet;
import redcamel.red2D.display.RedSprite;
import redcamel.red2D.tween.RedTween;
import redcamel.red2D.tween.RedTweenInfo;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by psk on 2015-08-11.
 */
public class RedParticaleEmiter extends RedSprite {
	private ArrayList<RedSheet> _list = new ArrayList<RedSheet>();
	public int num;
	public int life;
	public RedImageLoader imageLoader;
	private long _prevTime = new Date().getTime();

	public RedParticaleEmiter(int num, int life, RedImageLoader imageLoader) {
		this.num = num;
		this.life = life;
		this.imageLoader = imageLoader;
	}

	//TODO 임의의 트윈을 구축할수 있어야함..
	public void run() {

		if ((new Date().getTime() - _prevTime) > 8) {
			if (_list.size() < num) {
				RedSheet particle = new RedSheet();
				particle.image = imageLoader.get((int) Math.floor(imageLoader.size() * Math.random()));
				particle.col = 1;
				particle.totalFrame = 1;
				particle.scaleX = particle.scaleY = 2.0;
				particle.alpha = Math.random();
				double tScale = Math.random() * 5 + 3;
				_list.add(particle);
				// TODO 이놈은 풀링구현해야겠군
				RedTweenInfo info = new RedTweenInfo();
				info.put("x", Math.random() * 400 - 200);
				info.put("y", -300.0 + Math.random() * 200 - 100);
				info.put("alpha", 0.0);
				info.put("scaleX", tScale);
				info.put("scaleY", tScale);
				info.put("time", (double) life);
				info.put("easing", 1.0);
				// TODO 이걸 뺴줘야하는군?
				RedTween.to(particle, info);
			} else {
				if (_list.size() > 0) {
					RedTween.kill(_list.remove(0));

				}
			}
			_prevTime = new Date().getTime();
		}
	}

	public ArrayList<RedSheet> getList() {
		return _list;
	}
}
