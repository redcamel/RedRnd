package redcamel.red2D.tween;

import redcamel.red2D.display.RedDisplayObject;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;

/**
 * Created by psk on 2015-08-07.
 */
public class RedTween {
	public static HashMap<RedDisplayObject, RedTweenInfo> tweenList = new HashMap<RedDisplayObject, RedTweenInfo>();
	public static ArrayList<RedDisplayObject> removeList = new ArrayList<RedDisplayObject>();
	private static String[] KEY_LISTS = {"x", "y", "scaleX", "scaleY", "width", "height", "rotate", "alpha"};
	private static String[] EASE_FUNC_KEY_LISTS = {"QuintIn", "QuintOut", "QuintInOut", "SineIn", "SineOut", "SineInOut", "ExpoIn", "ExpoOut", "ExpoInOut"};
	private static Boolean needInit = true;


	/**
	 * 트윈 생성
	 *
	 * @param v
	 * @param tween
	 */
	public static void to(RedDisplayObject v, RedTweenInfo tween) {
		if (needInit) {
			checkFuncsInit();
			needInit = false;
		}
		// 일단 트윈값을 입력하고..
		double startTime = (double) (new Date().getTime());

		try {
			RedTweenInfo newTween = new RedTweenInfo();
			for (int i = 0; i < KEY_LISTS.length; i++) {
				String key = KEY_LISTS[i];
				Field field = v.getClass().getField(key); // 필드를 찾아서 -_-
				double value = (double) field.get(v); // 값을 찾고..
				if (tween.get(key) != null) { // 있는놈만 트윈 정보에 추가..
					newTween.put(key, value);
					newTween.put("change_" + key, (double) tween.get(key) - value);
					//					System.out.print("\n추가" + "change_" + key + " : " + ((double) tween.get(key) - value));
				}
			}


			newTween.put("easing", tween.get("easing") == null ? 0.0 : tween.get("easing"));
			newTween.put("time", tween.get("time"));
			newTween.put("startTime", startTime);
			newTween.put("endTime", (double) startTime + (double) tween.get("time"));

			tweenList.put(v, newTween);


		} catch (Exception e) {
		}
	}

	public static void kill(RedDisplayObject v){
		removeList.add(v);
	}

	/**
	 * 트윈업데이트
	 */
	public static void updateTweens() {
		double currentTime, pastTime, duration;

		// 존재하는 트윈 전체를 순환
		try {
			Iterator<RedDisplayObject> loopList = tweenList.keySet().iterator();
			while (loopList.hasNext()) {
				RedDisplayObject target = loopList.next();
				// 해당 트윈을 검색하고
				RedTweenInfo tInfo = tweenList.get(target);
				currentTime = (double) new Date().getTime();
				pastTime = (double) currentTime - (double) tInfo.get("startTime");
				duration = (double) tInfo.get("time");
				if ((double) tInfo.get("endTime") < currentTime) {
					removeList.add(target);
				} else {
					try {
						Method cEaseFunc;
						Class cls = RedTween.class;
						cEaseFunc = cls.getDeclaredMethod(EASE_FUNCS.get(tInfo.get("easing")), Double.TYPE, Double.TYPE, Double.TYPE, Double.TYPE); // 이징 매서드를 찾고

						// 체크할 키값을 맹그러서...
						int i, len;
						len = KEY_LISTS.length;
						for (i = 0; i < len; i++) {
							String key = KEY_LISTS[i];
							//							System.out.print("\n" + i + " : " + key);
							//							System.out.print("\n" + key);
							if (tInfo.get(key) != null) {
								Field field = target.getClass().getField(key); // 필드를 찾아서 -_-
								field.set(target, cEaseFunc.invoke(RedTween.class, pastTime, tInfo.get(key), tInfo.get("change_" + key), duration));
							}
						}
					} catch (Exception e) {
						// e.printStackTrace();
					}
				}
			}
			int len = removeList.size();
			while (len-- > 0) {
				tweenList.remove(removeList.get(len));
				removeList.remove(len);
			}
		} catch (Exception e) {
		}


	}

	public static double EASE_QUINT_IN = 0.0;
	public static double EASE_QUINT_OUT = 1.0;
	public static double EASE_QUINT_INOUT = 2.0;
	public static double EASE_SINE_IN = 3.0;
	public static double EASE_SINE_OUT = 4.0;
	public static double EASE_SINE_INOUT = 5.0;
	public static double EASE_EXPO_IN = 6.0;
	public static double EASE_EXPO_OUT = 7.0;
	public static double EASE_EXPO_INOUT = 8.0;

	private static HashMap<Double, String> EASE_FUNCS = new HashMap<Double, String>();

	private static void checkFuncsInit() {
		int len = EASE_FUNC_KEY_LISTS.length;
		for (int i = 0; i < len; i++) {
			EASE_FUNCS.put(i * 1.0, EASE_FUNC_KEY_LISTS[i]);
		}
	}

	private static double QuintIn(double t, double b, double c, double d) {
		return c * (t /= d) * t * t * t * t + b;
	}

	private static double QuintOut(double t, double b, double c, double d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}

	private static double QuintInOut(double t, double b, double c, double d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}

	private static double SineIn(double t, double b, double c, double d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	}

	private static double SineOut(double t, double b, double c, double d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}

	private static double SineInOut(double t, double b, double c, double d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}

	private static double ExpoIn(double t, double b, double c, double d) {
		return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	}

	private static double ExpoOut(double t, double b, double c, double d) {
		return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	}

	private static double ExpoInOut(double t, double b, double c, double d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
}