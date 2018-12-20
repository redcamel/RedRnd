"use strict";
{
	const GL_LIST = new Set();
	const REAL_CLASS = RedGL.CONST.REAL_CLASS
	const UPDATE_LIST = RedGL.CONST.UPDATE_LIST
	const STYLE = RedGL.CONST.STYLE
	const CVS = RedGL.CONST.CVS
	const CTX = RedGL.CONST.CTX
	const UPDATER = RedGL.CONST.UPDATER
	const PROGRAM_LIST = RedGL.CONST.PROGRAM_LIST
	const GEOMETRY_LIST = RedGL.CONST.GEOMETRY_LIST
	const TEXTURE_LIST = RedGL.CONST.TEXTURE_LIST
	const VBO = RedGL.CONST.VBO
	const IBO = RedGL.CONST.IBO
	const UVBO = RedGL.CONST.UVBO
	const VNBO = RedGL.CONST.VNBO
	const TYPE = RedGL.CONST.TYPE
	const MATERIAL = RedGL.CONST.MATERIAL
	const GEOMETRY = RedGL.CONST.GEOMETRY
	const CHECK_LIST = 'webgl,experimental-webgl,webkit-3d,moz-webgl,3d'.split(',');
	const noImageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAAAAAB5Gfe6AAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAC4jAAAuIwF4pT92AABTAklEQVR42u19h19a2fbv+yff+92JwqGYnpnJ5GaSTE3viWmmWGLvvXfEBioqCFgRu7RzDk3ABpi31t6HZogmJnnXuZ+3khCBI5z13avuvfba/2vvC+kDPoTD+C8cClPa+0AIXwsFg1/6if9Z+l9HAQB5JtwKCETfJC/9p1n6zgDsRQBAZkPBUByF9xLh+EfQUQCgww7CHtxNIALCfz8AyHuIsL6znUg7u7soEf9plr4zAGEKwPb21tbm5tY+Agz+242gIPs7ASS/P7CPEIPQP0oLvggAwntwZyvg920kJx+Qf2tHcA/gMz78pxn8dgCgfwuHQPE3A74N7ycIQfD7N7d3gtQUHHv+vwCAIIxqcGfT7/d5PW6XOzl5PB4Awbvh39wJ/wOG/4sAAOXf3QTmgXsnzzsp8YScEXIBAQwut8e3uRvaoyHj8aYvACC47fe6CNdclFhC0acRNAABr38r+F8GwI7fTUac8O2IJzZKFAWX2+Vyun3bof8SAGjku+lzc8Agcgs828k/u0ARIAgUHE+khHf7d4JC1vCf5vIrAQiBOod3gCeH3Wa1UbLGky1CETAIDBzvAUMQ+vDhWIfHnwEAeP9weNvLEf4jZImnBCgEEFi4nHX7twGAY60InwVAKLzrAbZg3C3rAq3FU+TF9SgcgIMD0GKdvt29D3vHWQQ+AwDgP+hn14A15HuV0ko8rUYpAgfBAaWBDxxzX/AZAECGt8lbkLkY48vJKYoGAmGxgsTY3JvB4ywAnwVAOOi1rlkE1pcoLcbTUpQiMETkYd3Cbhzv7OhQAFCD/XYYeoHFBcLygjkZwXsLCwDHIsViaRmAsHBgBo4xHQ7Ah70dHsbUvAAETM4nkIlQ3AvxYBAYVtZZ/3GeI/kcFdiwrSwvEa6iLJvmklAiGIAXUY/lNW7rH6wCYMA22WWQfNN8PN+zlGYEmo1SDA5BHBYX59c2Qsc3LzwEAJz9cq8CJyaBbYHjaUpTlKYjFA8GFYn5RfPcIrfzn2bzaABgDBfa3bWbZ2ZNwDrleDKBjIRiz6eiRNAAGFBw1rzH1wocDsDO6hwwMztLxzuRc4OekDFK8VBEZMI0M88eX0dwoAp8gCBolzXNxLFuNFCinE/oJoB0+gTCt6NgTCMQswseOqF2DI3hQQCEcSJwa4kIvjHC+QQl3acJ3o3hQIRhZtq2E4aPC/7DANjDud0N0yTlPjLmlLSfJopBBAUCgWHZD+O/94+TgGBwL8hOIu/RMdeOUxpDoo/7CN6M4ECEAcRAr5txhsPBYzkxciAAu6EPWyuEd+14hNnReNJQGt1HAg4ECB1Igk6rtwaPpQIcogLB0J5nFpgA7qPMjiTQMKGRfRQBRcABgVjcAgU4juHQwSoQ2uMNwD+Me5Tz4cMpgoEgGZrR8YmxOf+HvWMZDx4EQCj0Ibg2PiKM+xCQmpJKpY7+hKROoCGBorIBQGgmHOHjuXR+oASEPuwujQ4LAz8UYR04HhyknA9SUiXQ0FA8BAIK45bQ8ZwYOdgN7m3Na4ADMvgCv/AwcDAJOKhVMYkYHh5dCwaPZfnMgaFwOByYHhoSxhpY6wfCh76+vn5CfZT6EyiKBIWLqsjQ0k7wHxcJfgiFfUZhwCm3vb29+K9X2SuQklBvAvXFYIkCMTho3g794yRgL7jnm6DMRJjtwX9xpCAU/0qP8iMsiNzMbgWPI/+HBEJ7fq0w2so4zhUHkzJKMRT6e6c3g8cyEjpYAj4ExruUAs9dlLoJdXXGU1cC0Su6FTHpUCoVnZM7x7N66BAANnVdhA1gSGC2Iwl1JoMjhgMCCACEj+X0+CE2YHuScoOctwN1tLe1E2pDoo9twksRSgSFIKHo7jDu/APnA0LhXVM3MhRlua2tNZ5aKCW81rofDYJCx+TuPxGAUGhZ0dIWx2qEmpviqTmeEuEQ5KOjfSa4dyxrKA/OBYLh9Z4mwnCUKMuNCdSUBI6WmHQQyZkLh/9xXgALAxy9DVHOCLP1lBqSUCIcFK5mqiAt7Uvh0LGcGT1kSizk09RFGSSc132aErER0KDyUK9gj2ccdJgNCO9MNkYYI7zXHkDJcBDkobbfc0yrBA6zAeGl1poIgzU11TXVB1ANpQQ4BBzqRrc+/PMACId3Q2Fbj8B0FVBlZWXVAZQAB8WMYlHbNBv6ED6OTuCQtUFI4T1jtZWEKoDKy8srPk2V8ZSARlW3LfwPBOAD5MOh3cU6yjQwXwZUfigJcMSLRoXKF0SF+k9z+4UA4NpQ+IO3s6ysFP4ilZSUlFIqI1SaQGUJJEgF/AVIJnEy4B8nAQJNVhcB40WUigUSnpUkPIunEgpWBSBRVtLkOI4Twp8LgKOjqLSosKiQkIBDYT6hAuFZwnsxqBCEspKyspJh/z8ZgN2JkoJC+BNHhfm5hPIoDnmU8gVU6CUEkuLC0uLCgtrl46j9nw3AHtucXVBUmBdPuQn0npLwLAYHAlFc/D6nf+M/zeZXARDaNZTlFuRH2IynnOyPKScODoChoPB9+XzwWNq/zwUgHPZ0vct9nxNP2VmfJuGS9zkIQt773DyF53g6gM8FYC8YXKx8k5v9LgvYzsS/mZmZ7yi9fbef3r6jMGRm5WZlv8/OzH5fad7d/UcDABHM1kQusJaZ/SYDOH4L9OYtoTevCb2hRJ+8pm8BEG8ys98CDupAaOcfbQR3IRxyD7x+lQlcv3pNGc14RSgjGQkwvMsAgN5kv622Hest5Z9TKRrcC4Xtzc9fvXrx6jVyCJy/fJGEXlISsHn18u3rN5kZ+cad4LFcF/8CAHb2QIlXy9OfvXqe8QoYfR6lZ+nx9IwSeefFs3RA63XGm8FA8FhOh38BALthsmnGXPTo2auXz4FDZPYpYfnpE0KPKT2lJMDxAqTl+fMGLrz7IfzPtgG0Xi64PZ1//9HTZ+nAIrD8KAk9SaD0l68ynhbM7QZDu8d0NuzzAdgjawQ703l3Hj57+vjJ44ePHt27fw/ovkDkpwcPHj58BILw8Ale8+jxs+dPsid2QPyPMftftHc4vDVXeu/BE2D23v0H9wjdjdI9igdA8+gBCAhIydPnTzI0/mM5E3xUAMLh1eoHt4HZB3dv3/2IAI5790AIUAqegHl4kf4SDOCxXBA9GgDgDkNha+tTYP7Wnbu34+nOnTsIATygHjx6BAIAGLzs9YeOcZ38lwMA3mx326vNu/Hn3zdu3qJ0kxAicAcBuIcAPHj09Omjh4+ed3rDu8H/HhUIhz6EP4S3w7uW9vQbN27evIFE+b95i0oB2AAc/4eP0588Sn/b5dzdDf83qQAMZhCj4pB/rvrBXzfi6RbVA+D/EbqBJ+lPnmS0Bna2wQH8p/n7hgDgDGmYVFCHvYbyW79f//uviATcITbwPgkFnj598fJZ+otWjhRGRntN0WCYfEAIbEkovEt25GErJngxjNuz8f3gZmBza3trCzvy4DxykLTpOiYAUBbg1oN7O3ZV3t2rf926geIfkf3HT9OfPX8BqUDmm9d1KxA67WxtBjawlUJgc4d2XaIREYElCNzubPn9m/6Nre3tna3tnYBvY8NLrg4ACvgiaUz0nRuRfHkfoQ/oDoKb7Gjujb+B+7tE75+kP3/xKuP1m3c4HZJfUtyzYls1TQxjaaV6ZEynnzGvODbQJdBeBEGMjra8bpfL4/ParJzHzfPs+qrFwbq8Pn/A78cGPQACQPC9o8gjdJKC+8eOUTu27pcQ86STQX/9NjM7531eflFJWUVdbUNtVX1jQ111dU19c0eXQtk/oBrWzq44XNvCzhkwjbgf2co6PT6fbWZ2aWFpYWpyZtFid7q9Gz7SpMcHKJDOTN8XgS9Xgb0PYTDvu9t7Qf/Q+8ys7Pc4C1pQVFxaVl4JHDc0Nrc1N9VW1tYC8wplX1//oEo9NKqdME6b5q3uLbIRKbj3YddhNq/YeNAQp0kzNDahGRzRzSyuOXiXB/u0uNwejxfVATE4TgCEsDFICMY/tLcTmqsrK8clwaqq6prauvqm5ubWtvb2tq7Wlrb2Dqyt6untBx0YGh4hAMzNoyJsB9HwfdiaHzPOLllY3um2jnd1dbe1KdXjU+Y1q93Bkh4U2IzEDfhs+ALHCQDsphMmSrztNXfV0ToIUg7S0tLe3tHZ2dUNf7sVPd1YM9o/AMOvHh7RjGl1euPktMm8uMYHwJuG9zZ0vRrd9KIFhpyfU1ZVVta0KgbGZxeXI/0HsAGBg3Qk8XxPJfiCLjLEbYWFbmq7rtn+pvpG4BvGvLUFRr6jE/52dSsUtFi2r59wP0R3Woxpx8e1uokZ0/zCqpXb3PkQZgc7+2HIF9bsvNMxWfk2u6C6sUOln51fXF5ajPQjoA0ZLJwPnEFwX/vKcAIl3Gh0rCLvhIUOiEkcyhe10qJNM8GFBbi5obbGpuZWwnhXB2Ed6wF7YuWxA4PI/zDdY4J7LkAMDCAFcwvL7MZWmFO2dveqx4zzK1aOnWt78zgjt7Sxd8Q4Z17AredkJz7dfr24aF51B8FyRBp3Hn6rCYQd0LDbIdkI+jUA0KAGINi0GXtb21uaW9qxBJCMubJXqCUXSsTR/Qk7BZCGcM8BWgLdhGFq1mReZwNsd1Vzh3JgeGJmYWV5qj/z+t3Hb8q7hyam50xzc6Z53IUOj3Sn9qR+ZQcSEWGwBbYSRj7hrdD+KwCCXTIxGwp+BQCkmw5GwusTfd1dnV2dnd09Qkm0UBotbBaI7BBA9iN7R9SDgwOD6uGhkdFxvXFqanbJtqYsqKxv7VT0D40bdMPK15ev/n47s1mtM8bvwMZt2lNTk1r13E5472Nh/1hNk2gFUZdQ6MPe1wLwAQscdv3r+v6eXmXvQC/w2ztANg0NCvto1GRXkbBXRhPdYod7joYAABUAMAzuwGCYnQEZ15SXllc3tLR3dCu725ve/XXtt7/Sq1U6w9R03Hb06alJg35CpdB7sFchoU1Kfko+SrSZn9DSzkPJ7XIJvc2QnE7PZuirVOAD6L7fOqPGzSODA+Deh8G0k+2U2gmyo3TCYCT7S+m2YbLbOLqp2oDv6406nR4vMRiME9qhlqK83OKquvrG+uqK/DdZBTmvMsqU4xQAYQv6pNGg12nHuqqbB4eHxoRta0NEpwTREvbvJOzfiBS2C8XK3d10E4Nqmt0KHRmAMObC7lXDsGZYjRKtGh4b6Qct6MZvaqc1xC2kjrSRFgliWWGsqK4KS4yqqrFipLyspKi0pCjvffab509fZOYVFhe8f/cQU8lbd3O7xw2TANw03YA+icBpR1VV795kZWflZWVn45pjwlK0sGSZuDBNl6YLI0UcpeUVpLarZcxxNADCGPzt7G07ZvVakOsR3EA2rFWVv3sXu5+Plsfzi4s+phIssikpgXsqKSrIBQQeP4T0+cHd27du3b537+aNdx2juBXdMGWkO9AnDdrxMXVbQU5xbUNjCzjbji66EaGnR9iNImzKoRu0hoS9nRrN6JhWOyHs7adb+Q0GdUPz9PZRACCeNxza5hen9OOo04CAZkzVVNLQP0x3SI6THcVaYfM43WUutBKYmkmkWdJ9AjRbOzrc215T+PbJw8cP7j968Q4G8d2LrKYh0CudPrJLX68d1Qz3NFQ0q/RTc+Adl5ZpNyPsUpTQxYv2+LKR7m4OG8ZQkT5vdtLdy+GwWc2D7VpX+KgA7AWdS1OGCWEL7cjYqLK+bXJd6B4mNJOLayrI81xCw73IzdA2ZOurywtz05N6TV9nfVFOTnZ2bmFpWUVFcXZmZR/4iXEt2aCv1WrH4KtU7dU1PeNTED6srQNfJFAmESIv9PZDivVzROLxR7crvs2ji+Nt+u5R15Ek4AO6AP/yrNGgA/knoz463N0ytGJjyae7XQkU+VbymNB5krYiZGE01laWFuandSMqZWttZVUNVqHWVJfnZ5V0qoZHR8fG6XZl/LYhZUNli0o3ZV5etdlZzkntumcfbVBfIDyjvU1jnU7xNZeLnewa4o+mAhBDbNpnpowTY8O4dxRie426u310nadOBr4x/mbi+qtGyRPxRVQ4bBYQ5JU5o1aj7u2k2zBaGuoqC7Pf17T3DKggXCCKNqQa6Fc0VVR2qidmFldWLSDjKGBxY+2Kfhv5l3ADsftACHwb/FTn0QAg/VQ980ajTjOihlBHhTGdpqdt1MJ7sYuu37/h3d9aN0oRAAR3jECAbHB267pl3WyamhhVDQz09yq6uzqaGmpLct9mFkKAqOiDqGIAIsvu9uaaktL6Po1hxrxsAbF3ufexGPmauO/a8PmFGQVCgU3aBdjLT/dojqQCOGO3bZky6seGVH2KbgWEP8Oakd52rdXpSeA3MTaJ3RH+JEiiWwDAYbWsr5nn56bAr4BjHezv7elsqa8oyn727G1BZUMLBJodbc2N1aV57/MqWlVjk7NmyBlAAYB3jzDgZHS99PPxW6Nf7d+M7/pM0IBLPdyMUuM8GgChkIsYALWys62lrVM5AKFAX5tuzekVZm4+QYRzegW9CxqhgSZwDpABMAOz4A8mtGOjECr2dQC/ha+fPE5/nZNfWl5eUpiXnfH8RWZZs2JIO2NeWrViaoztWimg0TEOBDZhkMnXbETnkj6+FwCgR3M0FQjvbVlmDLrx4f6ulobG5nZFH2Q6va3adddnAIB3KfwUDwBrp5bQNDczqYdgcnRY1dvZXFtR8C79/t37D9PTnz7GFejn2WVNPYNjBtPSisVO+CdTJD5B6ajcCePsi/T39n8KAOXRAAiH9jzzGAIMKdvqq2vqmjt6+gc/FwDfRkwf4gDgwZnZrZa1ZSIFECprx0ZU/Yq2hqri7FdPH967e+fO3QdPnmcWVDV19Q9PTJuX16wOKgBxAETULkD03B8Q0oTANwYgFAo6pkAARtU9zVWlZZV1LV3KfpWyRbvu3jgcAF9EDBIAcPIcekPL2sry4vzsNMQEujGNerCno6m2ojgv+83rjFevs/KKKuvbFAMj2snZhRgA3igAyL8w3oTp7wVAMORfMaKxUnXXl+QXllQ1tIMh7PlMAPx+wSInAgD+kLMjAmsri/OQ8oOPHdcMq/q62xprq8pLSyFcLq+ub+5Qqkd1hlnz8sqajQUHSKZKKQBR8Ydv8G8B14HNre8DwG7QOT+lGx8Z6u+ozoegraKurSsCgPezAKD3LADgpgBQNQAILKtLC+b52ZlJ3Tg4hEG0s82NkEk1NLd19vWrxvST0wtLq+tgAjmqATEAcOjB4sNPAgDfxwYEty0zMD7Dg4rWypzX794XVbd09g4om8esbq/vIP6Jb9oK+MFs+71evxftt8fthb/oC3knNqgGZ7C6vgKmYGFmGlJfiLT6e/uUuFe5p69vcHhkzDALQTDwb8cg0I2+zw1Y+rxo9n0BcPnAPzxsgvOLfm2CMRR+2vA6j+oFwv5FyALAB3S3VGQ9f/Uuv7IJAOhtHrW5vTHv/2kQAuidqPPa9HkI8zCQvAvMAPgC4H99fXVpackEeqCfGB8BjwhxAWR4QxAQavXTZtPK6poFYkAn/KbX5/Wh6SVy5ffipwfwnw+HIspygibQV33eDdf0UQFwzhoxCh7obi57+/T567wKCsCYze3xHYYAKgkRBLwHuH3ALLDp9WKmwGOmgJkMKMIKzgUvzM1OT03ptBBpj42O67TjOoPRBOKPWRBNA3g3iSkA0IAHTD+yB/K1ub29vbmJSCdIQIImwn04jwpA0ALJrVYDADSVvHrw6EVOeWOHUgAg5oo+LQGgBTsbK1Ms8QZ+fsEwaTTZPW4Xb58j3bggm56zrizrB/p7lD0KRZdaqzf0QerfPzE5o+8dGNSukCQA8XK51yHP5ogPNBmN+nXgdce3PjM5Pc/5tnxJAaBeyPsVAAQWJ/R6VM6uxuKXd+88ySxr6OiJAnAoAj7/tm+65O8zrX68WFvyp0Qi/S1XB4qw8DRFIhUzjOzMo+5lW5ZILpFKxeK0m4VaU7qESb2tmVnoOS1hfl+AfJ4skHhdziZGJi0CBDzuh0xaatOud3Ot7uE5keint13c9qcs8VcC4JwzTOg06oHezsai57euP3xb2tDeMwg2wEoA2PAdYge3Nvoun5BK7zu8Hlf7v08Al1LmX7+229xLL0UyuVQqkYlTz9ba8tLgZ5nkpEwkzZrOlEvFjyfMa4M/SqVXl1jCv9Pj9jgbAb7TTT5QracSuaxj22O4f4KRSqQS0Zms9cCnbsH/VSpgnZ4E26Tu6+kAAG7+ee9NSUMbAgAS4PYeBkAA1HXyklguF5/v83m6fhQzwL4MOL3Q4VzPEMGNi0QSRib+XV8Mr4pSRYyUkchbi9OkovSpZavmslj88yJHW/aDA+UaGTEjuzQe8HpfSGRyxc7cTbFMKhFLZBIpk8knvQOqDkcDAGfTffOTBt3YyFBfd0dD8cvr126/LmuEpL2ndXjd6aEpme8ACvjcTTKZ9HLHxGpg8jcxDPnJ0yflEgnz64w9RyQ9mTmsyjvDyM911shlotsDA6U/iWQpRdVnmJQHxnWr+pxEesHMcxw9xsPl7obhFjM3F/zOTJlE1h14LWYkqfIzp08Crmc6wTtgxUUkK45XA6/XOasc5b5wSiwEJpCfgTBwdBgBqC95df3qndelDR3K/p7WoTX+cAACG353LYjtTWvAs1Ull8hOPx9bmHmfJpbKa21ZKZKTjbzD+oSRnm2rl8tSXnCWpVyGYYoGfxZLz9RZzS8YsfjhKp0FAZ/h8vaKYawl0rcOb5ZUenZg6iIjld1WLpqar4mlolse38ZBAPR+MQDB0N6Oddo4QQFory/JuPHr7ddFde09CMD6ZwAAurc5flYqTWvzeNn0FFlajm3D77EWSuWSh5asVNnJZq/Hcl8sOqesl0tSXvJWAEAuqloplMqkl3qr0hjxWYWNIxIArtPlVQLDYDlPNnmKT8ovDDefZJhbM8D0luoXJuWXaayv2Qp8KwA+fAgGw/6lSRKmAwBt9aVvbvxy/VVhLWTECgCA+xwAfAG2RC4V/TgYMN+QMJd04Ao9fu0lmejXxdxUmTyjqyvntEh0w1yfJk653tZUeFEiPTdgn7x9QiK7dh4MZPYqJ0iAy+lGACSX06TSy8M1p5kLI/liqbRy0xvYCDjTf0iF7/ABFpvfDIC9UDDknDNCJqgZUgMAdaVv71z5/XlRbRsA0DK09hkAQOzj8duzZFLmz3nz3yLmsh6jQv/4JRHz6+J7UZpYdCJFJBb90u2rk4skEhF4RfHZ8qV1a+9PjIwB/n+bcLCCBDgpAOLyV1Jpyt/XZcxZTSEDqrSJQTH/9IT0Qv+ml0Rf3woALAmzTmGIPjIEiVorAPD47u9Pi+vbCQCr+wD4+NQteI3ErPN/p0pO1fEPTkhO1uB8lqtCIhHfsOakSiUSiUwqSqt2eKpl6ABkAMDrNbuVtVakSUEZLiiEqXY6/0wAqJ2/LUaHIT0/2iRnUp+A+wvsjF2SMJe1oAIYen8rGxAK722vGA2QCo+oEYDa0rcv3vz9uIgCoP4cACBr8fncM7fBWeeHy0AQfi4ycwsl56QyeYnl7QlJ2htdvlwmK+DdFXKZ+PpI3QUx88TMguNbeASGUlZI5oEddosjAoBMUu4ZvwiWQCI5rzb8LGZOvtZz9u4/AK3rNkwLAt/MCIZ2dsMeE07ajQIAkAvVlrx9VphxN6+mtV3R3ape4d0JM7T7D14jUwEQKxkq78gkzMmaLf0VsVRy+qefL8jFEubnKeurFImsOKC7xoh/NQSKGFnKY9Z6I5U53eVy8Hau6yeJ+I95p513Tta9u9bCun0ez0aHOE1axm10nAf+mXOq7WcihpGcv/jzGQgp5LV+XyT2/2g8PG5+VjnyZXFAcDcU5KYpAEQFGsqynhYX3smpb2lTdLeDCrgEAD558hxqAPeYKPNN04a77KQEQjwRA1HL6UrXSrpIIivk7W9APyp8xRKp6OEaX35SmvLWykHwr/xFlHpzhee5tUwIHltxDcDDN0G4VODwuwsggJScU4cmrorl0lSRCLyj5PFqXPbzEQAufrbnCwEIhcJblkmjfkI7rhkZHujpaK7MfVpcdz+zqq69uxNsQEQCNpKqAAUB4teekxLpiZsTGz4PW/PjCbFcIheJLlQ4/AiA/L3L33o2jbljfZ8iF99d5vQ/S9Muatw2h6v9HCP5fdrJ8dZ3ItkFnccDebALgipZEb/hXXoEn/Pj0LZv+PdUiC4lMpHkkdl/CABfKgGgLxuLBiOu/UPSNqLq7ajNf5bT8+xNaVXXYHfj4IrTcwAAfjoRBLm/9YXs75JpcIj+DVfv68snTogvvurlvL7lB/9zQvTa7Tb/8X9S07qy/4f5nxtmp+VpSuoPBXaO9TRIT5y4PObkXFO/SZkXa5BJuL3OerH4hzyn3+Od+CM15Yx6x785m/+nXJxy+lHNqv9bA7D3IcTPGbFIgfTVHhtSNhVnvFa9ftaomtAPNg8s855DJYCsYCyopr1+vAwutk/09faNW7CImJtQ9vbqvS73uLK3e3pGqVSMQcwzo+zp0dmdPDer7OlVrbm9tpdSyRUNXRPymvv6B2bdvg33xtTAwJAtENgKuk3D6sGRZf/2Nwfgw96ObQYLPWi5hn5M1V6e9bS3uUK7tDwz1DKwxLoONILkJnzeDfRNLohSPS4ICrx4Uike2QgDurkFgZvH7fWC74JwAS718uDrPX4vThu6wIxugO9f+SP1Wp8Hw0CPayOwtbmN2Z3Hg4XEO7go4guEQrs7m4HYZOi3sgF74a01UrBCTkqYmdRpFLX5T5XLs8uzk9qBpr5Fu/MAALw0C/V60AJ7iUps4Hyg1+0GTiGR9GJ+i6aNLJfhGXU8GBU3ZDx4niE8QvLHc7yLVzwac8EveABuN5lQRFjx28icKK4H+ba2wf5vkwli30ESwH2ZDQgHFgxTM7Pk6BTz/LRR29/W1GM0GbUjfZ29Lf3LEQkQVOBjHPbfhjAxLvyUsMztJst++06yFKaPOaHcyUOudwueh8yK+32RpJeU2W9tEFVL4pO8Tn5eOcR+YSC0YTLOzAknx5hmp/Ujas3U1Hh/Z2tddXvjZwCw8REAXgqANzkA+0/wjK9wcEXFJR4AYVXM74McyBfY3A5sCUulH2F/JACc05Ozc8KBQvNzs1MG49TEUE9bXUVhQXMCABH2oggkDw1ouYJXEIU4/lEJUAL2AUALLmLFAAiBJ4IA2VmAOgC8bgZwHRwIYSGLpYF9R+MeCYCgXW+YmYseqoQHregHOxpry4rzc1uaBpYjgVA8e58yiRuJF0XYj4iCm6x6epMBEKs5iRb9YUlGZF2SysDmJvyAQ4/rBWRSPOBPEIIjAbC7PjpuQB0wkVOWZqenJoaVrXUVBbmZmc3gBfaFwp8FgICBAIA3btThNzz7RSBRE5y0HIf+JtbFkOk+MIVbm3RtmFjFrc3NSGHAVwOwOjQ0DlZwbn5hccm8MGfUjfR3NdWUvc949KS6aXCJOwiAAxGIGACy0kPHmmjGgQCgZ8DVEfKrKDAbvujKMLGCW5v+TZyFD8Sc4T4AvjAb3F3u79foJ6dm5xeWlszmWYiF+jsayvIyHv51o7yxf38cEBXpuEqlSH1IxCiC5m5ERp38qici6YQjL+EN7b077nRjFxl9cAcuUl9CrIGHVgrAcJOvIAUhxBgQ9n2R+fBYkY6TNymHv0wCPoRWertUI+NYo7ewaJ7W63Wa/o6msrcPb/1+vaqld8nBu6IWCYgct4uGKlI6hauBHrg3nycyDBD/+f3AGrkUgyPIb9ykrM1DVr4RD9xL5XW6Pc6oISAiADGBE/Bx8k5IkF3AEDhHL4Q/m6ALhGeyOEYWizEJI75hI3ZGttMFMeaw44sACO9xqhbF4PDYxOQsOIHJiQlEoLs258mtP25VNimXOFqxESFBPamx8kDosgHce70kOBEA8KObJmc3CwDg0MCg8i4vcQJOL4Z86BTcPBs1hR4PVtg5ebjG7QKdwY/wuDm31y8M95awEERlP+D3bgTompzfF7u5LwdgJ7w5Xt/a06/WTExOgwPQ6SenJyeGu2uyn964UdGiXLCTOjlPHAAuorHUafMwWCjdOPyCIfdg1IbRDpnlB6mEy1nWbneCNUHWca3QwfLwh+XxNyNGH0DhUAs4s7L0/v279zI6x6wOokRb4AnJvFtcRIFIQkCENUNe71cBEAwutVa1dPeqRieMU4YJnWFmftE8pVW3lTz6vaS9z2zjXPE64I44Lbz3hYwrv/129epvv5ZxG77R29d+A7qWaycrxXh4N4zz6vur8NrVqzeMbpQAF55VbE3/9eq1a9d+vW1yR+NC4AnEiXWxQ68un5Wliv51QnL2x+uVi/BL6Ot3O/74jdC1a78Tgu/9S0PWi2kpwZEB2NsNBsara1raFapR7YRWq58yLa2uLppNOmXun/mtgwsO3insb6MAuKMu2+mZ+zuVSRWlpp7Itns3Bs6nikVAp0b9mBMRAJxe9VkmBV4UnxrxYESBuu1WXUiViFLEYnkDXuaJGAH3hs89nfszI2YkUplcLhGJGPmNPhtRr+1aKX5MamqqSAwEPzIiWQsmIpiLeL5CAnAHimOgrLqhTTk4PDqmNcwsrK6vr62vzE20PnnfOGC2kqIFdwwAUgpKhX3+NiOXSqUyppDz+IYviSVI0lxcTHISANyWV7iox0ilZzUwvMQbOJz5UrlUxMjkkvtrYO9oXOBxsiDX+htiuVyGC2Ey+CC4jDlXaQPtCmy1nGVkMplUiquOSPD2qVovLUnweb7CCIbCe6Fda39JRV2zUq3W6LBgeXV13bK6OK9rrKrrmV5zYNpGnJKwRcMZWcXymG7iaEklqQWsxz92WYzzvxLxzxMbuMSJZQHOsfPIPUBwbsyNuuRyc9zinVQJI5JIJeILPRtcxA16QUUMtxgJoCgWS6XwAwMoyCSnq1iPz7/TcVYCTxicVBZIKstxgw0Ay+CNU4FZ5dAXqgDu7Q46e8sKa1oV6lH9DCQECytYsL6yPKfp7deaVtaxVJwV4lRyLj3Z8QgAmO/hjTBMSpHDHdBdoQBIZXlg0CDLhQvt2VJ6t8zPWg9aONbJebrOSggfUqnotYN+LEoG7zbfBR7FwKQc0EEYGFAF5o8Z4G+77wIuqYrEUhkllLt0F01IYkGKkzMp1V8OQDAc9KiKi6taBscmpmamZ+YWl5ZXVpZXLatmSI1m5pdWsH6Hco110Czd8sm7l9LhTsRimbjC6dow/k4BkKRemwb/DXLDsuO/RAbsssHDgwl0wS/npeLoo+iIf9P7hMUAN+hMrkzKiHEZXCZjQNER2lQ5k+WA/GG7/0eQGZx3FUgE791z+jZI2u35GgBwn9VuOOwZL8tv7B/TGQwTesP0DMQE81i3tL5kmpuZmjEvLa1ZrHYHR7hn6fnzvGvxCYNjJRfVgf5O/iEShjutlFzntNuy0wRxlV6d9GHY4+Jc03+nUmHGafQ6lzsiAv7RSyJQfqlMzKRduHTx55/SRDDKkptTEGL5NnElFTRCKv3x4s9IFy9d/Om5JxDAsOsrJSD4AXzh7t72ZFVpt2YMz9wiJ4dNTBimZkyLi5AgTuqNM6allTWLjRV2MrDkwbnwUISKKklpAmukjwAgTfl7micXGa9JhJckf0z7cSYIfECbmKDGyCRSkfiOyc0LcwF8phhggffEZ9+MWRw2Q/mNU1Lmmi6AEUBgBNABe8pcnI7s2LDzPM6aeeN89FEACAe3cccqBEQ7pq6WoRHN8NDIMDlmSj2EW8b0eAKldmTMMGdeXAFFsNFz58nZ8/ziU7TxYnFKp8/tNQgAMHJJWpPLwYG8FMkiGiC+ObcBKgDx7VoGTu+DlEslIglzesBDAXD6tb+KJaAAcuanFpZkDL7l4h9/7cHiMIg0R/8tlgM+kutcbEXWt+nDWTeIJTxHByCEp62F9nZ3wRBYR1V42tTQUJ+yR9HT29uvHlKrRzSjWs3A4IhhZta8BBCQ3TMsosByy6/AY4EsiwcCzo3Z6xQAUGHm6SKMP2f4LTUKwI2ZDaeLZ51uw7/BxonBpyF2UnGO1UW3ngSa0C6CjKc1Qvwf8GNEzPUPOcEFwM/oY8BBMOLfOOqNXG5MOTZcXrI9IUECviwZovuOQQY+QFRoGRwc6O/r6+3uwtNGOsiu0d6+frV6oK93RI/mcG3dYkEMCAwIAEilRCZSb/EbMxEAGLHkTAfPObgaOSgxOnOA6ME8egGQ3CZwi3JJ6tV7aWAJpdLLk16a9zne/cCgCRA/sWBHDrIzxrvlc5No1+PXXxUjZOILo3QiChjfQN3wCpOI1EfzLABgP8qmqb0wHr/NDfb3wuB3A/ttLc0tbW10r3hvf39PR79Ga4QgaY1AQOWAW3pBAJBKhgJO78yNiA0AT/ZylePm7orSGIa4Bpn46aIbs0GX5TGxAKLskV/FaApldU7CgXf5cQqWhcgkvRuYCnnIpLDb7cMfIcEyXEklZSOyy6St061bN288GvdEmI+kVDw7d3QA9sK73IBSqcCtLe1treSIETxMBEDo7uls7uwf0RpNiyvgEslGNixrW3pJATg1vOFyz92iABBr/ZOadzWlkcAN7CQTAcDjmbiADl7yUxf78Ad4kxHfW3XhrIBv7kYq4iH9eTLgJpMpmFL6tzY3d3c2N7wBw1URfpMYQm8SEp9ITZHiess3AyC0Fw4HnQNduEu0ow3Gn+wOxcYJLa0t7Z2tdc2KQQiT5heXl6MIRACQnNHAHc/dpABglCJjXtvmIUoiJgArfigAEB6XgSmDOPAvk6cSXj4pF58bgrzf49pADtE//DXlddHVAe96h1o/Oj4+pltz+wxXQQFSRCRCJmIGxnLF6/6GAIThj2ugraOjvbO9lfBfTw5OqG9samxubahs6OwbgUDZvLiEZb3EEjiiAIz63d7ZiAqIMUo7P9YqgWhfhO5eDnEtBcC99reE2Lp3Hs/YRaymk8qycRnEvYHL6hD7iG+aYFydG26W2xj6JRXXhMVpnW6P7ooIYyywkhJ0lhhG/b4a3cn2LQCAeDDsGWhubWttb21G/uvq6oXjNuoa6qtKatp6h3HeaH4BIoL1dbJxczEKAPi4iBE8S1IVyfXfwP4x0mtXwHZLBQCc7sFzjBRG+lyfx7n+VyrkPVLRFTCPHo9v6g8MfRnmmhHXSCAzYD3jv6JbkElPdjk9E1fAceDwU5Bx8f2+xenaN7/4FQAEsY+cd6CxpbW5raUJ+a+lOx2rKyuraypL8qtaFCqNVj9rMi8urxEEbPYFwQacHXU6XNNUApjnlyHGYYg+SyUXqm6JMIsRAPC/AzRkTOoVGDzvO7hEzIjPtnmcYNBNt8ToQGVnx8FXYGDAeqbA8MErUnm7EySAFA8KsSYB4MWqg3d/MwBIM4Lt4aqm5vZWyn91DR44UlVZXl5WXJybXd7UrRrVGSFGXiRtP0AE7OYXWAEKN6aCXJdKgJTJL5ZhKpeGhZLi+9rreLNS0UMzznqZfhdhES3zbBU0KEdGVFr0mIU7dy0/SUVRkTE14F5waHnP8vUUEhqcVrk8E78i86BPp8+ePX363NnTZ9MyliEYBXvBRddVnE7HXK/adiQAqBhMVDU0teBZQ/W1NXigCvBPtsLnZ2eVN3YNaiIAoDcEAOafEQCkogE35zb+RQAQl+iuAAwyOWi0TNpo/FNKwv6H8y4r6+04T6YHJKd+unjx4ikRFgHJRb9o/Jgm56XIMUeQ/DnvdXC4kOrkHqWQET+tcXvGLyO4UvGVGQtkqkuLi3MdAy7MsHFXQmw/sWO272sACM3X1xDTV19XU42tgyorgP/S4sKctzkVAMAIqAAxAgIApicCAINuh1P3J5WAovUiERFSsP6/LUA6QIKj2yaPjbVlYEpHroILRFIx/AUTUYQzgr6ONCyHBk3PXoJAByccdl6lgHgx4tPDTu/IL6hVEsltJ9YEO3G+hSWTyh4MpNzfCICwvb2sGkxeHfJfQZgvLSkpKsh7m5FX1dQ1AADMzJmiADhm74twvoM50e+2cdo/KAB57PCPcsxnYbyKnRP/pgDcmHezHu1luB41AgJoUjcPVk8mS7kzDwmBZ+52Khp4ePP5wJrXv8XPjPyFIiEWnRpxe3t/AvcCX/CH2weRM293OFk75OYuDIlxmvnbALC3oS6pqAX9B/7L8XSRkuKiosK891mvXhfWtCgGNfsAmLpNeT7RybGu0WtiCoANvSMyKj477B37UULCoeszTpurPk0GY8xgxI8gSIi1lIrPKFwOJ+euwDor9HKpZ5/k5BVm3jwvlsM1IAEjro2uc3SW7MyAm06bu3AOHXe2u78lALumytJKVP+qijIY++KigoL8/Jys188zS+ralOpRAgDkRCvECDomr6MXkEpSm8EeD12mAOSs8a1pmBMx4vRFr+YsxntSyRWtk1t+CjZORDIeKU18GRIppWSucuBGTDfAETI4sciknDiRkpKCLOMzsAEbLWckJAaQXnr0+Mnjx0+ePHr0+EUP5+DRAH4zFdj7wDYWlxLdL4fRLyzML8jPy8188+J5TmlDR9/w2ASWEoAfXKESYPiTACBlmiE3Vv1bTIQ9e50zkqiYOdnKu0ZOEQDEl7S8R/OzBIMdyI5EJ06IxSJxKokipMxVndsJ1lx5AXVCSuI8nGwlSo+jPuz2NZwiRpARiU/86wfAB0gkq2YtnJOs3HwrAMI7ExUFpSVFMPaFRYW5Odnv32dnZjx5+raosrVnUDNumCJGcJVGQtzEFRHeplTcZreyg5cYMl2bvcqxpeDgpak3pjnnIPoCiVxyadzpqEO4QOl/vnbl2m/Xrv32269nMPiTyURNuGnexdWeRi8pI0KC6kFspRQCIdZZISezJQQQqaBBp5tZq513uvkoALx9tldl/QojuBN2KnLyS/Lz8nOzs97nZL598/rls/T01wXVjZ19QxAGTBMBQAAgG+C0l/GuxIyozWHluy+Q8WIyLaxj4o9UmZzJd9jdfSTHkzDnRz3mJyJiAZkW1sE5II5iZx8yqZA7iJknKy4e4kFH5QWRXJ6KVpIRkZBZhpOjp9pYd4lULIknEm4rWAvr4t3R9hZfDcDe7nbQ2vg6Oy83Kysr4/mL9CePHtx78PRNQU1rVx+EQSAA82ZiAwkAvOaCnMzPptbaLK6ec2IcIwCAgyAHoqOLKrfDPZCKCi+WnB31aM6Bb4Aw8JLGjY7eCQ8VqVTLz2nh5nmPh227JkIVweiKpM0YGYlPN/LuksjIRwgE60cta+cgvnJ5v5UE7AV3dneX615lvMl49uTxg9u3bt66c+9ZVnFtq2IAx39qxkS7vKxTAEbOSDH1k4kqrFZnzzkiAZJ363YHP36JSUm3cLxzABwCyvlpDVeN0TzI9sMZFkwXTutt9J2FTAl/rZzH4jB4VZd3WUpCJ9R38KUpAN7JataTL44tiRDMAKHfVtARuj181At8PQAAwc5y86t79+/9+dv127fuPHqVW1rT1KEYwOXjGZIIEAtIVUB3FSfu09JOtXKsV3lBJpfJ0+RgA2x2+yvpuTY3x/LDJ09CLiCX/jRuzZDLTsnTTkpKcToRZ9cdvOm+5KREmpYme24D7t2YMDoMrdk3iVydvv/2XXNfddZfp8q5DVxNomsCcvoAT5/bnJwLomin55tJQDgMKdE2r6t5fvvmvVdg/9/mV7d0KPrVGi1ZPkcHQPlfx2xwfcqo12qNhql11uFcJi2NDPpF1m61sZNldYtwf/ya3jhhmJicmrQ65oyGyUnjhHGFwx1yOHHuYk3Ym0tvmDFB/O/kIQfkWDdnWYAXp6aMC6srnNuxPm9Y4uwL+Muk85bQfUg/VDvJYyQEYEZtgPPrASCNHUNcd05uZW1laUFBTVdv7+DI+IRxEsSfTgbQdpAIAAdj7GRxgyw2NSJdf7BzxoqF5Vi7xWLF+Wu4Q4hYcAMty+JSO0SxtEEQvAqS4HR6cJGJIzGNx8VioyIHBLkQ4XncTvgcZJLnHZw7FvITXjnWgo9OHn7VFWcElYNfA4AAQ9Az1N5WV1NZVl7UOjAM4Q9gPzcP/m95ZT3S3MlGtnrarXa6UMDixkfySP7hf3Y7y8J9criIAP/zLo5ciJP62GuIzu+zpE4ANw3SzjmEJY6sq9EOSsJ1HBtbkuFir/N0nTbawsg2oxy0fAMAHH1tLZAPVFSVdWmwVers7CzWUC2vrFriAXCwDruNdJFio/fL2mEQWWQZF4ec9DWOlLzw9OZ5jpoAZJrFocdHAQBcUOPxCYdSEekhlUgxcL4bAKHV7rbmxpqaqpqq3okpCP7m5004Gbi6tr4PAM5hs8EDaXsVuT8cehggB0WBAsCzKMh02FjsKkB4QCBYfAoWgLICKkNhibWl2ocC+RBn9Mu+CwB7IXNHR0tzXXVVbc2AEUz/woJ5fnmNKP9+AFgCQGS1kGyUZ4kEoIKwDk4QYzqiTiLrOMxkjZmj6+wsHXOebpykKoJVUqjeTudH/JP36FcJv/TNAfiwO9PZ0drcUF1VVzuI1WNLS4tYNrH+EQDAIgw33hH5n9wDyjkrDDon9BZDAYfnPLX+dNyE9wRJYIXRZMHakaso++QXE8SfykyM/+8iAX5DR1trfVNtTUO9ahonQIBw+OM73BEjyDvsDpaN7/wGtw0aAQ/gItyESYoAiXyc5MFFXAJyyNJXOCL1AgIUHwoAEZV4S0C/gPzidwXAM9bZ2lLfVFfXVD80u7CMrm9tPSoBtK0f9QIAAMdG2uxRa453h71TWE4wckTUcVyxtIYMHimwQQw4wSlEpAftJhUHJzWERNp5VrAeAvcEuwj/CQCwtpneb6ECvKqzrbWpoa6uuW5ofnl1ZTVm/mh3QRvpYIh+jhAoA0/kAMce2cG/iIENEnaQBXjT6XAg8yjXxOIh2w5kleUjjhJ+cKAXcYLpwKf4BEQMZYwMOBgLlnwNx7uJ/fyIQCFn+wfXv14C2P52AKARAKgfml9ZX0tQfmuMf0cEACLyOKA2zg4M8KQURJBiNAmQtDqxygY0nNQPYrsgFz6FcBgudKPmo/lA/cb6SdxbgmYTcHBRDYJ3XcQ2sk7y0dz3BCBsUeDqSFM9ADBsXo01tRRaWwr8RyIgtHgOdrXsxu1HOogLWKf+1t1bJauc05R56/aDHrgvlz799u3cNayWXHlx6+5tpa351p1br5Y4BwGHdzuKbt96rHXB2Hqq8VwXSMMe1Wl4l+r+7Rv39W64jne8owed3Lx1c8RtpwEGx30fAIILXW3tbS0RAOIaekYBoPzHALDz2l9TROIcEAHOpUlJPQEZvlN/5YdUeQ2wxdaJxT+cH0YRX/zlRIqoYS0/RZzy+wKpI0EXOflLquhE3hp8oPf9Dz/AB0kY5tQv9daONPGJUyNujJltt06cSElNFYslPzRi/P8dAfiwPYnrwy2N9fUtVAKsMc2PAhDHP3H+dYxcIro6DWPqHpbIJC/Xndzk3yLmfJuHcy7fgzQ47T3mQKt/QqbXbKuSSJk7yzz5CM7urj8FOfHvExARefJxtjj1hxTIB6/o1OcY6aVxN1oBx0NIvMUp4hPifxU7UOu+IwCBse6uNgpAA1UByyEA8K6F+yK5WHyqkrfxzm5I13MsHDd/WyT+UQHCqkmTpknEV2bhfpdvSWTiVrZWLJXcXXLjLYP9tNwnO22b4Km3WC4VXXz14ulPEklK+/BZmfSSFsyAg7c/BYz+fvniZcbLLpszkhF8DQDhpASJwAePugdEoLmhvoFIAPV9thgJ8h9VAAdnc6jPQJbOpN5ZAvPULpGK8yw8t35PxFwcdPG29zgpJjmJ2rB8l5FKFHwLk8Y8XmWdJIjk1ZdFEqlcfG+JdbiqTsn+9WprY/mORMx0jJ2VSa7qACeWtT0XS0V1G9hRC0wAz3JJEGAdts8HILFLe1y79h1wAj0dne0gAI2tdUMLQkmIPUYx3oV+uixrLZYyF6+eYs4qwEa3gBTnrjv4xZvi1EsajjVfYZjff2ZE9xZYduWZRCIZcHYwclzcxKwR7EexVH7md5H4VB/4wKqTUtEvL54/Oi9lbk/pz0tFfxp5oicvQDWupD9//vKtgehcXGYYIdZum/l6AHZDln5FR0d7UzwAtn0AJBLHL/7OME/Lz0hEr1c5XvuLRHp3lXf1/1sifrjEOdvSRPLmpyLmbAfvWHvBSBm1u5ORRgHgZ26mMo/aJRJxuoXDugmxOCVVLGV+7OQMZ5nUPw0IAGt7IZNLmNSU1JTzQy6OTQ6A46sBCIbDwZ2FXgCgralBAECoCfo0AHA3XWfksjrTLyLJlXEPa89JlZzWOLhChjnTAfYqXSb+01B/Upr6FmsqRHKp2tMllkgAABJDOztPieUNUzcY8YVJzlOTJsWFkRRGJr1rmr7AiK5PEgDsz3GaPEUsTr2qg0DqOwIQ3pxSKsALNDfGA2A/SAJY+ws5c0Xrfi2VMTWs3T1wXirP5qdviZjrZodd97NUlMkZLzGSq3rnyjNGxgx4ulJlEQD4tcwTzE8zfG6K5FSlg69Ok0jOg7M/zUhTaw0/MZIbUwIAUkZ8Cc9+y1kg8dV3AiAU2vOPK7o7SSAkALCP/48AsDsMP6WKLxc3AQyiW7NOdi0jVfbLZGcaI29irXyZTCJ60NZ4SSSV1LArDxmJWOFqE8kkz1fsWHfp1F+VSH+s7XiWKmX+XOSrTslFz108WyRlRG/VF8SSv43Ym9RheyGVnKjxgqFnaUT4fWzALgCwMdLd3dnW0tJURwGwJgEgAQreXXGKYZh/pWD94+lennX2/SROy3qTKr1jdtqX7sB7qSewDlj8aH7pllQm6uSawOu9spJJMLYZm2SlnBAxYuanTnexTCp67nGy5WlS0ZueswxzfRq3VbhABSSiPIiMnbjrguW+kwSEg8GgY7i7q6OtuampvqG1gRhBMAHWBAjsce3WgVYf4poPuHYs/Xu3Am7xlVh67kepvMfpcPX9jCuechlOZJ8ZWL0tk6Y02mqlUumlJ0/TnzzJnU2n9TQ41y9+yeVI05ifnqZDHCAVlQ2cY5hz95+lpz95qXsC/vPio/Snz58WLUXnBxOmCXFSYm5QZQntP6fj8wHAafGd5UEEoAUBaEMA1hAAS6IQCBMiVAOc6l/E8pPnzp47d0Yil/5b77BzfRdBGsSPFiE0fi8Gxi+cPXdaDuFBrukO8FG3Wo5rKKkiccqJv/rOyKWnzp0/d/60/GTqr1P5kjSZJDUFAgPRxeH+MxAeiFIgTj4z+FgiA12C3znxYN7JOpICYHPMqVSWIGXmKACQg2dNvQpUAbAB9a31akEC9gMQC4cAgAIw2q9Nc6algVMpKeJKK4xEDoSz8m5Iiw1/nxCfV5jm52dyU1JO/DIC+YG4djnvBLACKiNKefBedCIlc8pkMvX8/EPqieo3/1sEuUAqI5JdrLG2ysWpuBOJSbk2fveHlBRIBlLFP2StYsJ8GABHkgCwAeHtSUV3F+ZCTXUIAESCSQCI5MOE1stv33+hwoh4qeT+vftVFjvL6Z7ev5u/4LBy2ox7996uOyCb1z64d/ex6t29+496V5vvP4Bn9+ChsvThvVtDTmy9mnf3wa268lsPHty9f/f+/Xdah12V/uDefTwA927+fOE94fTfO212h/1wCTgSALvbu2GfrrsTNaChoa6upU41nxQAioEtGgkBf3Ybh11BwQRyVgdZ+yHzQnayUEBm0MF8kblQzO44nsTzTmF2EC6D1zDvRbOIu1NYjv6NTJ+CraWzPnacY3LYvhMAOzshp4ZYgIa6+tra5o8AiB0nAYYxAoCdlI+DDbaTjQQcucxqxYUTXAe3Qe7GklUEeLRb8QoHgGe1Wew23IpjwWk1TIvseLqEFdeUbJBewMfhxXb8VLuDE27AZoFfga+Lj8Ud7DdTgdBu0KZG/hvrauoAgNpPAeDAozSiAOCCv8PJ22xkOgwFlHpOeAHnxx2oMDY8dAH5RImwo/TAWzb06uhhWDx0DTQGHSz+Pu4tteHqgtWBE+0x4OECDldjjgJA8tAnnkK7u0GzAmKgRjw+p6a2qXlofpVWhZKTTdashCtrLDeMbB9xkENOBOUkw0an+sjv0aFzxMxmQlBBwiFqVaizpQCwZKaVmntO+IefTa6N5KMOujohTKmCUM2rh9e/CIBgIu3s7sx2tTQ21GOlWEVdc4vKtErcANwVHpwS4ZvOCpM7Fc59wdNVIq6BcmG1xAyHjW6yEHgmJmHf2SwJI5pgaqO/JoRdwgQwVX36n2AKnPb1+XGD/asACG5OYh5Yh0WiZdUNLaqZFUskG+R40EAqDcLRM6jT61bBKdrjPANczIKg2NkIy/H8xeZW9s80YhtyJFyBWFtbx9N2YrQST8uLi0tAK/jq8tLyMs7dry4uL0yMmDZCXwWAX9faSAoFKyrKyqqbBowL5MwfXBWxkHNT6AlA67i1cnV1aXl1aXEZb2VxYQkbRy+Y8Qw9s9m8tIRH6ZkTaH6OEj1lTThpjJ5VZKQnJunJwV4TunFCmsjBW4RUlOixSwP0zDfhDKbBQRWedDcyNjY+wwWPAsCuQDshz2gTmH9aJFxWXt2u1gm3hocCTYxrteRsHPwPbm9Yhaex4HmLeDQY3CluN1ORnUe9fX1KZV9fN6X4g8FwPxJSG6VmQlig3NgItrceqK6xOZ7ode30kxTCsXeUccI3ObNHC7hNzZjWfcGvBMA1REtlqyrLS8tKisvr8EixBryrupra5hY8aIwQOYcTbGVjfVFOXl5+QSGlAvihqKi4uKSouKiwrLmHUi8dKTU9mVBDT6gTjqui4mAipy4uLO9bgSTKYY+3DJFqiOhBNNhUZ1M4pQ6Prw1tfx0A/CDukyB14mV4WNj77MzMd2/fvn33JuNlsXp6ft5MT4kE9Vtds1psrLn2ecbrt5k573Pf5+YXkHPPKqtr65ogkuqZ5WPtprDdhXA8RORuqeeJp/CHJEdORt5LoNgL5CfCCTndOrRzGACJWi8wLtB22NoDKlBTQ1QAq0UL8vPzAIXsrHfv0ps3Nnfo9ZF7D+9ubQ08y3iXlZefVwjMl1VUVAP3DbjVqK2l07y1m/D5SZ4kfSvy3qEUTEaJkB4CQOJdAAAWBQJQHQGgCKQaEcjJfvfmuWI7QpHLt7c3g4bXL95m5eYiAHjoHTmdF88qbWtunwvsbAvXxf1a4mf8MwDIycl6+ypDE9yOaBul7c3tzdBaXvqb7Pfv81AAyisra4gANLe0trd2zAS2P007B9D/OwB24gcF/ksCABWAzDcvsmfD21vkQuGkk63g1k5g112d/jor530B8l9RVUXHv6WtraOtw+jbpkAJtJXwLBkah2OTCNRXAJAw9NE7DK0rGhMBEDQg8/XzEmtwM/FQUMADxlj54nU2AFBSWlZRWVVTV9/QRE4q7mzvmNjY+jQdIByfjcA3ACDxi7eC693JAMjOfpfxota7FTnpSTjhA3u6BcL6N28yc3ILiQDQk8nxWO6Oro5OrTfB7m8lPNk+Gn01APFebzdu7Okdhta6cccI8QKl8QBkZrzs2tyMNDKmKATw8CNfcOF9xrv3+UX0ZPZaYgDxhO6uzq5R92YcXkIDtMDm/1sAwuEIALGhJ2aGiL4g/lv07vyB8HJXQx3ZM1VRXkJ2zFANyM5+8cq4tZXsgKMAW/P0HURCKADoAUACWkEAOjuUPWo26XEIiWJBgN/6Yl1JYis/hUNSAOJUn8omPb0uuNzZKORCuGkEJSAvDwDIevc8y7wdSNpc3dP96i1IQHk5tQAQA+DB9N2dCoXakRyABLH4CI3PNBYfI/DFAEREfzPCv98fXOrE03RrKQARL5CTlfXmWal105e0cV5gPAsAKMYYoLaeakBHl6KnCwCwJgMsXo0CCUZlMykoByjD1wEgDH9EN8lJJbuLFAAQgQq6a6ygAAEAJ9DE+5O3MvXPFb7NKyiJcwEdnd1KpaJHoVpNhlgiDknQ2IfKAebgqwBIZJ+2qPNtL3Q2052zZOMY0YH83OxMiAP7XdizIVlXxbWqN/n5JeACagn/rWAAFXhOu3Jw4QAA9p3T8WkAkioE+f+rAIjwL5xcKTQn3DZ3Njc3khkBYeccmEEA4G1Gus69ET3zNJH4ppfv3xcLLoAendzT2z/Q39tvOqDn5FcCkASBTwIgpE0x/x/T/8hxTZE+xQETSABOCRI/ABAUoRnMyXz3KmPG+xH3kV3bioycvOIKkgU1t7a245n1fQM4MTDpJv11k/bkPEAhEvUiEYOo4Y7ziYcBEIuAotFfxPgJkh9tBOqe7Wxpbm0h4TBoARhCzAbycrJeFphJD8TE495pS1x+OCe7qLgcLEA9CADwr+zrHxiE7H9onHei1LhIs499Jwkna0vq+5R9+IS7SIwNEkH4JACRNA7Z3xTYj/Sj87qmIILFdSEwhFXC3vEiBCCjdMXjTDzoGbdo0GLVsfdZ4Aar0QQSD9CL/A+NjAyPW0i/RWcCbNG+uZEW1IcYSAGChCjqUwB8jgRQ/rc2o705seel0J1ng9d3dZK10ebGehCBSpwWKSnKz8l+XW11f1SeKRQqOQ35mXnFAAAe1woGUNk/iAcrj42PaZdpxXekY2wSOkgQYmh8wjAcEQD8nU1B9wXJF8jnGO9WKGmBRCOZGyfOoOB99psGu8sRXYRKXJ12ThVm5ZUgAE2tHd3I/xAesI4ziWasao1UMzsTtv0kCsIBfXoTRSIBh60jAUBjX3/skLYIAC6nd03T2zfQ39eD64OIQW0NGoLC3Oy3jRZnkuoYujQ4U5RdUFpRXd/Y3NYF9g/Uf2RcpzcajYZZa/wGF2c8fQEO8RAcDMBn2ADB/gcE4adNgoUWFA5+cVilHsbWUVQMGok3KCvMzXnbsMrbrI64lY7Y6hA7W/QeAkEEoL0L7f+wZpQAYDBML7OxtXzOmYRcLuF8yn0AJPqLuAAyPp/4MgmI5v/bJKuJnpFKjDtdp7Wb8HzE0ZHhIfUgyEFne0sjyEB5cX5eZvUCrgIlXdSwa4sgEq6qqY8KAJ5fP6JBNZhepN0I6TaSeBKkwBlnHZM4iU/4y0DMEnwUFh8EgBADb9GG7UL/a7wJJy27tMwZDHrt6JBarRro71f2KDpbQA0qS4sKcsqMdoewcJNI65b1vuJCAKC2obWzp7cXABhS48nqg8PjEwbj1NzC0sq6zRHpxBdZzuL4GABUCA4BIEEVvgoAEgBGBIC2iSUm3eGwrpqmJo06zdDgQF+PQtHd09PV2tzcUFNeUpRXol6zklWhOKJLVmvzbUVFeIRwY0unAjRgcBC5HxzE7cbYtNy8gB0HaP8xYV8h7Un5sTVIisC3BmBbEADsRekR2McbgvFdXZqfm5026rWaYVV/Tyd4tO6O9vaWhury0uKS9oX1pZVE/pcpjVcXlZRW1oIPAAD6hYWrQTU27CZd63ElYWnVEldXxAqbjJxCi9qPw4Q4BL45AGgBAoIBENqkkjXLdTweeWF+Znp2EtVgoKcLgnoMCprqqiE5rptcJTtnPwLA1FNaXFZZXYc+AADo7+vr74dIYJjsN58zgQAsAgiLK5bEQuu4UmdntLdqMgS+NQBbggAQ/XfSnW54PvT66soSjJR5bm5uGgyBBhHABb2OtuaGuprK0soRsgoao+Ulspy1pG8oKyuvAQFoaQcAIAvshUhQPaQBCzA5TXpuLMybTbPzq8KaslBqH7cNlI/XhIgwfC8AqAvAjuQUAMI/GPg1XGk2LwIAJtO00TAxNqLuVyq62tvbWzEwrigu65lfMM9/RKaFkbKqigpIA5ohDVAolWQtUDWkGdWCCZwmRmB+bn7WOLVoiUMgvrZHEIJ9UdK3BwDDAGoCqABg5IP847KjdXVpEde4yRq2aZYeFT88CBFRRzsExiACFSVdpkUAhyxv0yVuuBCv7SdTIQ0tbSAAvSAAkAlBMKGBSAB8wDRAMIsnGem1U8vrQjfG6JabWIAUlYI4hxjnCPZPJcXNFsXSwWTZIJkUTQRgJwYA3cIK/FvWlsxgrYF9E1nABwAmtGMaDIi6Ozs725rq6yrLe2bnp4GZmenpaXicQdampman9D0VlTV1CEBHV09vX1/fAPBPAdCTTf/T01NGvX5iVLcQBSACQTwAfASAZJ4wPhomcWAsFzg4HSbT4ocCYFtD8z9LxheHdmbKSAAYGuzv7enugnioqaGqbsA4bTROYnxnJK0MgDc8oUvbXQZBIPjANjoRQAAYogBANEjLH7RanUZjoptv4mTgKADEzxB8CwCQf9uKaRoZIsMKD1OTBgRgdATjQaUCWyzWV7WoIbLT6pAmSA8HIO3Y2JhGUVlaXlMPJhCnQtENYt3CCACgm5ig3R4mtBrN2LB62rJOAbBG6quOAEDc+H9DAJamSSsLHC0ytnj8nHZ8VDOkAhlQgAo0VFU0Y4yrGR3FzssAghYIroCguaeuuKi8pq4ZbYASpwJQAEZG8SIdrSwZHwNEVKpp3IMZ3YR2ZADiJkW+HgB0AQjApM6g103oQbpBZkHICQBgBtXoCjpb6qpKyxrAxA1gRQyWpIyP4diPaEaGVAM9DaWFRSUVdZgKYTEIAIBlIONaLKrBjwFRUkFsPDK7skI24Qqbj48IQPyk0LcAgNQ8Lhq1IM86AQLknxxAiFlRf4+ivbG6pKSyqbOnf1BNERgd1Wg08ObICHiKrsaqkrzcYgiFmtu74RrhIqwnGkf+4dphFUSHoyZSzbW6bvkKACj/8QvNXwKAkA5jKIRHduA2XqzNtK4vTY5pDXoYM0TAIFRFgRUEEcDDmCsrKutbu/vQuFPOxgghDMNqDJqbayvKSopLymua28l00NAw1lKBoJB/I0ODqgHlgM60QLqwCFvQ7bFwMBYEfMR6LA6IUwEBhEMnApICsEsB8JNEQABgbWl6bFSrHR0nEETKwsYJf8q2+uqaxrZORb8aU1zgCARFS0hHx3dkWNWn6GhtqCX9RxvbAKkhUgkFmbVGg2eZDvT1Krr6dbNm0pFVsAFCMBiLhF37pwUS8+CEObGvAYBmQ37MBCET4MACWFZX5sBLaah2o+ISAgnWqJTtDfWNHb0g1xqUaa0gJITQJ4KxAD0fGxkCXeluh6yhpq6xTdEPdhDA0qCNhMRaCQF116Buxowt+62RredxTTD2zQh4DwAgjv+EgpIvAIBEw35y6BUA4LBh/eO8XkMnMRAGKuA4foOK1qaWrj71iGZMR5QDTCQENugrkTAqot2NAAcQhmGVsht320BS0IvRkAqdCG5Dbe9QDI4ZTUvAfyQpJlOF5HQplzs2MZZ0TpAcsOiP8R8fAiLzXw4AmRKj555hUb9tfWXegLMgtCRziJbzDakHeyEM7BnU4LBPItvT0yZyMuO8UPlJzugzQaxvAigQCYMOoydAob2rW4EzCtinvaO9s081ZpzD3uxWmyMi+HEp8CcGPXFufDNSZPFRCLx7NABIPuhx41Eg1rWF6YnxETJkUYK0Vtk7qNFBSgdBL/K8sLC4HEdLcT8uYcpLImmMorQ4pdLf14u96ftVI2M644x5eXXNao+cMR7LfiMn0iVbHkgEIL6UIMnq+OcDICREeH45OZ0A92vYVs1zM/oxPF5gUCjAxRmNMeyhOTc3v7iETcRIGy1ayEzLl4XWEuv0yQq5ZHVxAXNkcnCfcXIKUyYzWD5SCE83iPDOSLrrPmTiL3HNeOsj959cAD5dIhO5gFpCWhawQVf4sP+IZW0FT5yEiBAcAUQDMziXhVpLmLQlzAbbk1D8hGl02lSohU9YGPHEfPunigYOWBVNWA5MxnIc5/sqRfcDgAj46coASYzJPhDL+jqWga+RgC2O08QtGlwSSrqVL2FFJNHGJ6ua+Ixl4W8AQCweIpNjfjI7QuxBrCNNbMYyWbeSxM5uETpgvSOZd/vEQvDHC1/JqqOSArCvFcIBAARjJQKoClubgvYJp4vSAzuwxyO2OfS46Y/xDCVb5EsavkWORIn4M19CUP/JGqGkPCdbCk8c9M8DIFYoF6uT8NOjTSP3F3eOZSwaj7fSH9dJeD3CkEad9ycrYA6ue4h7lpTzBAA+KfUJtB+AuFJJYaU4UilFSyVIvQg97BNuM+CLZ+GAcgZ/pNSGeu1Da8CSCnjCs90DKBkAe4cAEL0w3hrSehvhq+mqQbR2BpfedrYSeAhEgpKPS7o+r7TrUzqdAMDOoQAEjwIApXBCzrhzKB3OyUEMHU4CRweJ+6eT3a8HINk3HZGTI3L+2fTNAEhQg8O/9xtylPTypDcSPJS+GoB95uAbiMXXjejRWD4KAHuxvUafAuBzQfliho4hAEkp2Rd/kyFNuDzxyw66g28MQAIMSdFI9r1fOl6fPaJfCkD40/RFACTS4egeFwofzsz/B+D/A7CP/i98jHl68aq2YwAAACF0RVh0Q3JlYXRpb24gVGltZQAyMDE1OjAxOjIwIDExOjA0OjAwLJlQLgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wNy0xNFQxODo1NjoyMiswMDowMEamXMoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDctMTRUMTg6NTY6MjIrMDA6MDA3++R2AAAAPHRFWHRpY2M6Y29weXJpZ2h0AENvcHlyaWdodCBJbnRlcm5hdGlvbmFsIENvbG9yIENvbnNvcnRpdW0sIDIwMDnjKSpBAAAALnRFWHRpY2M6ZGVzY3JpcHRpb24Ac1JHQiBJRUM2MTk2Ni0yLTEgYmxhY2sgc2NhbGVk/lUMSwAAAC90RVh0aWNjOm1hbnVmYWN0dXJlcgBzUkdCIElFQzYxOTY2LTItMSBibGFjayBzY2FsZWSBHjWnAAAAN3RFWHRpY2M6bW9kZWwASUVDIDYxOTY2LTItMSBEZWZhdWx0IFJHQiBDb2xvdXIgU3BhY2UgLSBzUkdCF2AWHwAAAABJRU5ErkJggg=='
	let fn;
	let debugPannel
	debugPannel = document.createElement('div')
	debugPannel.style.cssText = "position:absolute;bottom:10px;left:10px;font-size:11px;background: white;padding:10px;border:1px solid #666;z-index:10000"
	debugPannel.style.display = 'none'
	document.body.appendChild(debugPannel)
	class World {
		constructor(query,background = "#000000"){
			let t0,t1,i
			if(query instanceof Element) t0 = query
			else t0 = document.querySelector(query)
			i = CHECK_LIST.length
			while(i--){
				if(t1 = t0.getContext(CHECK_LIST[i],{
							alpha:true,
							depth:true,
							stencil:false,
							antialias:true,
							premultipliedAlpha:true,
							preserveDrawingBuffer:false
						}
					)){
					t1.contextWORD = CHECK_LIST[i], GL_LIST.add(this);
					this[STYLE] = t0.style
					this[CVS] = t0
					this[CTX] = t1
					this.background = background
					this[CTX][PROGRAM_LIST] = {}
					this[CTX][GEOMETRY_LIST] = {}
					this[TEXTURE_LIST] = {}
					this.camera = RedGL.Camera('basic')
					RedGL.SHADER.init(this[CTX])
					break
				}
			}
			if(t1) console.log('WebGL 초기화 성공')
			else throw new Error('WebGL을 지원하지 않습니다.')
		}

		set background(hexColor){
			this[CTX].clearColor(...RedGL.UTIL.makeRGBA(hexColor))
		}

		set updater(v){
			this[UPDATER] = v
		}
	}
	RedGL.cls('World',World)
	fn = RedGL.World['fn']
	fn('setSize',function (w,h){
			//console.log(w,h)
			this[STYLE].width = w.toString().includes('%') ? w : w+'px'
			this[STYLE].height = h.toString().includes('%') ? h : h+'px'
			this[CVS].width = w
			this[CVS].height = h
			setTimeout(()=>{
				this[CTX].w = this[CVS].clientWidth
				this[CTX].h = this[CVS].clientHeight
				this[CTX].viewport(0,0,this[CTX].w,this[CTX].h)
			},1)
		}
	)
	//////////////////////////////
	{
		let tProgram
		let tVBO,tIBO,tUVBO,tVNBO,tGEO
		let tTexture,pTexture
		let tSpecularTexture,pSpecularTexture
		let tNormalTexture,pNormalTexture
		let uVS = new Float32Array(27)
		let uFS = new Float32Array(23)
		let uPARENT = new Float32Array(64)
		let uPMatrix = mat4.create();
		let uNormalMatrix = mat4.create();
		let tick;
		let tGL,tGEOMETRY_LIST,tPROGRAM_LIST,tTEXTURE_LIST;
		let prevTime = Date.now()
		//mat3.scale(uNormalMatrix,uNormalMatrix,[5,5,5]) // 노말 강도설정
		let tMesh,tMat
		let i
		let tProgramSortList
		let PER_PI = Math.PI/180
		let makeTexture,render
		let tParent
		let drawCallNum,triangleNum,totalDrawCallNum,totalTriangleNum
		makeTexture = function (tGL,tMat,srcStr,tTEXTURE_LIST){
			let t0;
			let texture
			let tMaterial
			t0 = new Image();
			tMaterial = tMat
			if(tMaterial[srcStr]==null) return
			texture = tGL.createTexture();
			t0.src = tMaterial[srcStr]
			t0.onload = (function (){
				texture.image = t0;
				let targetGL = tGL
				let targetSrcStr = srcStr
				let targetTEXTURE_LIST = tTEXTURE_LIST
				return function (){
					//TODO 노말은 밉맵을 생성하지말까?
					targetGL.pixelStorei(targetGL.UNPACK_FLIP_Y_WEBGL,true);
					targetGL.bindTexture(targetGL.TEXTURE_2D,texture);
					targetGL.texImage2D(targetGL.TEXTURE_2D,0,targetGL.RGBA,targetGL.RGBA,targetGL.UNSIGNED_BYTE,texture.image);
					if(targetSrcStr=='src'){
						targetGL.generateMipmap(targetGL.TEXTURE_2D);
						targetGL.texParameteri(targetGL.TEXTURE_2D,targetGL.TEXTURE_MAG_FILTER,targetGL.LINEAR);
						targetGL.texParameteri(targetGL.TEXTURE_2D,targetGL.TEXTURE_MIN_FILTER,targetGL.LINEAR);
					} else{
						targetGL.texParameteri(targetGL.TEXTURE_2D,targetGL.TEXTURE_MAG_FILTER,targetGL.LINEAR);
						targetGL.texParameteri(targetGL.TEXTURE_2D,targetGL.TEXTURE_MIN_FILTER,targetGL.LINEAR);
					}
					targetGL.bindTexture(targetGL.TEXTURE_2D,null);
					targetTEXTURE_LIST[tMaterial[targetSrcStr]]['loaded'] = true
				}
			})()
			tTEXTURE_LIST[tMaterial[srcStr]] = texture
		}
		let makeCubeTexture
		makeCubeTexture = function (tGL,tMat,srcStrList,tTEXTURE_LIST){
			(function (){
				let targetGL = tGL
				let cubeTexture = targetGL.createTexture();

				function loadCubemapFace(gl,target,texture,url){
					var image = new Image();
					image.onload = function (){
						gl.bindTexture(gl.TEXTURE_CUBE_MAP,texture);
						gl.texImage2D(target,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
						gl.bindTexture(gl.TEXTURE_CUBE_MAP,null);
						cubeTexture.loadeNum++
						if(cubeTexture.loadeNum==6) cubeTexture.loaded = true
					}
					image.src = url;
				};
				cubeTexture.loadeNum = 0
				targetGL.generateMipmap(targetGL.TEXTURE_2D);
				targetGL.bindTexture(targetGL.TEXTURE_CUBE_MAP,cubeTexture);
				targetGL.texParameteri(targetGL.TEXTURE_CUBE_MAP,targetGL.TEXTURE_MAG_FILTER,targetGL.LINEAR);
				targetGL.texParameteri(targetGL.TEXTURE_CUBE_MAP,targetGL.TEXTURE_MIN_FILTER,targetGL.LINEAR);
				loadCubemapFace(targetGL,targetGL.TEXTURE_CUBE_MAP_POSITIVE_X,cubeTexture,tMat[srcStrList][0]);
				loadCubemapFace(targetGL,targetGL.TEXTURE_CUBE_MAP_NEGATIVE_X,cubeTexture,tMat[srcStrList][1]);
				loadCubemapFace(targetGL,targetGL.TEXTURE_CUBE_MAP_POSITIVE_Y,cubeTexture,tMat[srcStrList][2]);
				loadCubemapFace(targetGL,targetGL.TEXTURE_CUBE_MAP_NEGATIVE_Y,cubeTexture,tMat[srcStrList][3]);
				loadCubemapFace(targetGL,targetGL.TEXTURE_CUBE_MAP_POSITIVE_Z,cubeTexture,tMat[srcStrList][4]);
				loadCubemapFace(targetGL,targetGL.TEXTURE_CUBE_MAP_NEGATIVE_Z,cubeTexture,tMat[srcStrList][5]);
				tTEXTURE_LIST[tMat[srcStrList]] = cubeTexture
			})()
		}
		render = function (tScene){
			// 스카이박스 렌더
			if(tScene['skyBox']){
				tGL.cullFace(tGL.FRONT);
				tGL.depthFunc(tGL.ALWAYS)
				//console.log(tScene['skyBox'])
				tProgram = tPROGRAM_LIST['skyBox']
				tGEO = tGEOMETRY_LIST['skyBox_1_1_1']
				tGL.useProgram(tProgram);
				tMesh = tScene['skyBox']
				tMat = tMesh[MATERIAL]
				// VBO 바인딩
				if(tVBO!=tGEO['vbo']){
					tVBO = tGEO['vbo']
					tGL.bindBuffer(tGL.ARRAY_BUFFER,tVBO);
					tGL.vertexAttribPointer(tProgram.aVertexPosition,tVBO.itemSize,tGL.FLOAT,false,0,0);
				}
				///////////////////////////////////////////////////////////////////////////////
				// UVBO 바인딩
				if(tProgram['useTextureCoord'] && tUVBO!=tGEO['uvbo']){
					tUVBO = tGEO['uvbo']
					if(!tProgram.aTextureCoord_enabled){
						tGL.enableVertexAttribArray(tProgram.aTextureCoord)
						tProgram.aTextureCoord_enabled = true
					}
					tGL.bindBuffer(tGL.ARRAY_BUFFER,tUVBO);
					tGL.vertexAttribPointer(tProgram.aTextureCoord,tUVBO.itemSize,tGL.FLOAT,false,0,0);
				} else tUVBO = null
				// diffuseMap 바인딩
				if(tProgram['useDiffuseMap']){
					if(tTEXTURE_LIST[tMat.src]) tTexture = tTEXTURE_LIST[tMat.src]
					else makeCubeTexture(tGL,tMat,'src',tTEXTURE_LIST)
				} else tTexture = null
				///////////////////////////////////////////////////////////////////////////////
				// IBO 바인딩
				if(tIBO!=tGEO['ibo']) tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER,tIBO = tGEO['ibo']);
				uPARENT[0] = 0.0
				tGL.uniform1fv(tProgram.uPARENT,uPARENT);
				///////////////////////////////////////////////////////////////////////////////
				///////////////////////////////////////////////////////////////////////////////
				// 기본 VS 프로퍼티 바인딩
				uVS[0] = 50000, uVS[1] = 50000, uVS[2] = 50000
				uVS[3] = 0, uVS[4] = 0, uVS[5] = 0
				uVS[6] = 0, uVS[7] = 0 , uVS[8] = 0
				tGL.uniform1fv(tProgram.uVS,uVS);
				///////////////////////////////////////////////////////////////////////////////
				// 기본 FS 프로퍼티 바인딩
				uFS[0] = tNormalTexture && tNormalTexture['loaded'] ? 1.0 : 0
				uFS[1] = tSpecularTexture && tSpecularTexture['loaded'] ? 1.0 : 0
				uFS[2] = tMat.shininess, uFS[3] = tMat.specularPower
				uFS[4] = tMat.specularR, uFS[5] = tMat.specularG, uFS[6] = tMat.specularB  // SpecularLight : r,g,b
				uFS[18] = tMat.r, uFS[19] = tMat.g, uFS[20] = tMat.b, uFS[21] = tMat.a // r,g,b,a
				tGL.uniform1fv(tProgram.uFS,uFS);
				if(tProgram['useDiffuseMap']){
					if(!tProgram.uCubeSampler) tProgram.uCubeSampler = tGL.getUniformLocation(tProgram,"uCubeSampler");
					tGL.activeTexture(tGL.TEXTURE0);
					//tGL.bindTexture(tGL.TEXTURE_2D,tTexture);
					tGL.bindTexture(tGL.TEXTURE_CUBE_MAP,tTexture);
					tGL.uniform1i(tProgram.uCubeSampler,0);
				} else tTexture = null
				if(tTexture && tTexture['loaded']) tGL.drawElements(tGL.TRIANGLES,tIBO.numItems,tGL.UNSIGNED_SHORT,0);
				triangleNum += tIBO.triangleNum
				drawCallNum++
				totalTriangleNum += tIBO.triangleNum
				totalDrawCallNum++
				//tGL.drawElements(tGL.LINES,tIBO.numItems,tGL.UNSIGNED_SHORT,0);
				pTexture = tTexture
				pSpecularTexture = tSpecularTexture
				pNormalTexture = tNormalTexture
				tGL.cullFace(tGL.BACK);
				tGL.depthFunc(tGL.LESS)
			}
			// 메쉬 렌더
			for(const tProgramType in tScene['typeList']){
				///////////////////////////////////////////////////////////////////////////////
				// 프로그램 바인딩
				if(tProgram!=tPROGRAM_LIST[tProgramType]){
					tProgram = tPROGRAM_LIST[tProgramType]
					tGL.useProgram(tProgram);
					//TODO 라이트도 씬이 먹어야하고...
					// AmbientLight : r,g,b, intensity
					uFS[7] = tScene.ambientLight.r
					uFS[8] = tScene.ambientLight.g
					uFS[9] = tScene.ambientLight.b
					uFS[10] = tScene.ambientLight.a
					// DirectionalLight : r,g,b
					uFS[11] = tScene.directionalLight.r, uFS[12] = tScene.directionalLight.g, uFS[13] = tScene.directionalLight.b
					// DirectionalLight : intensity
					uFS[14] = tScene.directionalLight.intensity
					// DirectionalLight : x,y,z
					uFS[15] = tScene.directionalLight.x, uFS[16] = tScene.directionalLight.y, uFS[17] = tScene.directionalLight.z
				}
				tProgramSortList = tScene['typeList'][tProgramType]
				for(const tGeoType in tProgramSortList){
					tGEO = tGEOMETRY_LIST[tGeoType]
					i = tProgramSortList[tGeoType].length
					while(i--){
						tMesh = tProgramSortList[tGeoType][i]
						tMat = tMesh[MATERIAL]
						///////////////////////////////////////////////////////////////////////////////
						// VBO 바인딩
						if(tVBO!=tGEO['vbo']){
							tVBO = tGEO['vbo']
							tGL.bindBuffer(tGL.ARRAY_BUFFER,tVBO);
							tGL.vertexAttribPointer(tProgram.aVertexPosition,tVBO.itemSize,tGL.FLOAT,false,0,0);
						}
						///////////////////////////////////////////////////////////////////////////////
						// UVBO 바인딩
						if(tProgram['useTextureCoord'] && tUVBO!=tGEO['uvbo']){
							tUVBO = tGEO['uvbo']
							if(!tProgram.aTextureCoord_enabled){
								tGL.enableVertexAttribArray(tProgram.aTextureCoord)
								tProgram.aTextureCoord_enabled = true
							}
							tGL.bindBuffer(tGL.ARRAY_BUFFER,tUVBO);
							tGL.vertexAttribPointer(tProgram.aTextureCoord,tUVBO.itemSize,tGL.FLOAT,false,0,0);
						} else tUVBO = null
						///////////////////////////////////////////////////////////////////////////////
						// VNBO 바인딩
						if(tProgram['useNormal'] && tVNBO!=tGEO['vnbo']){
							tVNBO = tGEO['vnbo']
							if(!tProgram.aVertexNormal_enabled){
								tGL.enableVertexAttribArray(tProgram.aVertexNormal),
									tProgram.aVertexNormal_enabled = true
							}
							tGL.bindBuffer(tGL.ARRAY_BUFFER,tVNBO);
							tGL.vertexAttribPointer(tProgram.aVertexNormal,tVNBO.itemSize,tGL.FLOAT,false,0,0);
						} else tVNBO = null
						///////////////////////////////////////////////////////////////////////////////
						// diffuseMap 바인딩
						if(tProgram['useDiffuseMap']){
							if(tTEXTURE_LIST[tMat.src]) tTexture = tTEXTURE_LIST[tMat.src]['loaded'] ? tTEXTURE_LIST[tMat.src] : tTEXTURE_LIST[noImageSrc]
							else makeTexture(tGL,tMat,'src',tTEXTURE_LIST)
						} else tTexture = null
						///////////////////////////////////////////////////////////////////////////////
						// normalMap 바인딩
						if(tProgram['useNormalMap']){
							if(tTEXTURE_LIST[tMat.normalSrc]) tNormalTexture = tTEXTURE_LIST[tMat.normalSrc]['loaded'] ? tTEXTURE_LIST[tMat.normalSrc] : null
							else makeTexture(tGL,tMat,'normalSrc',tTEXTURE_LIST)
						} else tNormalTexture = null
						///////////////////////////////////////////////////////////////////////////////
						// specularMap 바인딩
						if(tProgram['useSpecularMap']){
							if(tTEXTURE_LIST[tMat.specularSrc]) tSpecularTexture = tTEXTURE_LIST[tMat.specularSrc]['loaded'] ? tTEXTURE_LIST[tMat.specularSrc] : null
							else makeTexture(tGL,tMat,'specularSrc',tTEXTURE_LIST)
						} else tSpecularTexture = null
						///////////////////////////////////////////////////////////////////////////////
						// IBO 바인딩
						if(tIBO!=tGEO['ibo']) tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER,tIBO = tGEO['ibo']);
						///////////////////////////////////////////////////////////////////////////////
						///////////////////////////////////////////////////////////////////////////////
						// 기본 uPARENT 프로퍼티 바인딩
						tParent = tMesh.parent
						if(tParent){
							uPARENT[0] = 1.0
							uPARENT[1] = tParent.x, uPARENT[2] = tParent.y , uPARENT[3] = tParent.z
							uPARENT[4] = tParent.rotationX, uPARENT[5] = tParent.rotationY , uPARENT[6] = tParent.rotationZ
							uPARENT[7] = tParent.scaleX, uPARENT[8] = tParent.scaleY , uPARENT[9] = tParent.scaleZ
							tParent = tParent.parent
							if(tParent){
								uPARENT[0] = 2.0
								uPARENT[10] = tParent.x, uPARENT[11] = tParent.y , uPARENT[12] = tParent.z
								uPARENT[13] = tParent.rotationX, uPARENT[14] = tParent.rotationY , uPARENT[15] = tParent.rotationZ
								uPARENT[16] = tParent.scaleX, uPARENT[17] = tParent.scaleY , uPARENT[18] = tParent.scaleZ
								tParent = tParent.parent
								if(tParent){
									uPARENT[0] = 3.0
									uPARENT[19] = tParent.x, uPARENT[20] = tParent.y , uPARENT[21] = tParent.z
									uPARENT[22] = tParent.rotationX, uPARENT[23] = tParent.rotationY , uPARENT[24] = tParent.rotationZ
									uPARENT[25] = tParent.scaleX, uPARENT[26] = tParent.scaleY , uPARENT[27] = tParent.scaleZ
									tParent = tParent.parent
									if(tParent){
										uPARENT[0] = 4.0
										uPARENT[28] = tParent.x, uPARENT[29] = tParent.y , uPARENT[30] = tParent.z
										uPARENT[31] = tParent.rotationX, uPARENT[32] = tParent.rotationY , uPARENT[33] = tParent.rotationZ
										uPARENT[34] = tParent.scaleX, uPARENT[35] = tParent.scaleY , uPARENT[36] = tParent.scaleZ
									}
								}
							}
						} else uPARENT[0] = 0.0
						tGL.uniform1fv(tProgram.uPARENT,uPARENT);
						///////////////////////////////////////////////////////////////////////////////
						///////////////////////////////////////////////////////////////////////////////
						// 기본 VS 프로퍼티 바인딩
						uVS[0] = tMesh.scaleX, uVS[1] = tMesh.scaleY, uVS[2] = tMesh.scaleZ
						uVS[3] = tMesh.x, uVS[4] = tMesh.y, uVS[5] = tMesh.z
						uVS[6] = tMesh.rotationX, uVS[7] = tMesh.rotationY , uVS[8] = tMesh.rotationZ
						tGL.uniform1fv(tProgram.uVS,uVS);
						///////////////////////////////////////////////////////////////////////////////
						// 기본 FS 프로퍼티 바인딩
						uFS[0] = tNormalTexture && tNormalTexture['loaded'] ? 1.0 : 0
						uFS[1] = tSpecularTexture && tSpecularTexture['loaded'] ? 1.0 : 0
						uFS[2] = tMat.shininess, uFS[3] = tMat.specularPower
						uFS[4] = tMat.specularR, uFS[5] = tMat.specularG, uFS[6] = tMat.specularB  // SpecularLight : r,g,b
						uFS[18] = tMat.r, uFS[19] = tMat.g, uFS[20] = tMat.b, uFS[21] = tMat.a // r,g,b,a
						tGL.uniform1fv(tProgram.uFS,uFS);
						if(tProgram['useDiffuseMap']){
							///////////////////////////////////////////////////////////////////////////////
							// TEXTURE 바인딩
							if(tTexture && tTexture['loaded'] && pTexture!=tTexture){
								if(!tProgram.uSampler) tProgram.uSampler = tGL.getUniformLocation(tProgram,"uSampler");
								tGL.activeTexture(tGL.TEXTURE0);
								tGL.bindTexture(tGL.TEXTURE_2D,tTexture);
								tGL.uniform1i(tProgram.uSampler,0);
							}
						} else tTexture = null
						if(tProgram['useNormal']){
							if(tProgram['useNormalMap']){
								///////////////////////////////////////////////////////////////////////////////
								// normalTexture 바인딩
								if(pNormalTexture!=tNormalTexture){
									if(!tProgram.uSamplerNormal) tProgram.uSamplerNormal = tGL.getUniformLocation(tProgram,"uSamplerNormal");
									tGL.activeTexture(tGL.TEXTURE1);
									tGL.bindTexture(tGL.TEXTURE_2D,tNormalTexture);
									tGL.uniform1i(tProgram.uSamplerNormal,1);
								}
							} else tNormalTexture = null
							if(tProgram['useSpecularMap']){
								///////////////////////////////////////////////////////////////////////////////
								// SpecularTexture 바인딩
								if(pSpecularTexture!=tSpecularTexture){
									if(!tProgram.uSamplerSpecular) tProgram.uSamplerSpecular = tGL.getUniformLocation(tProgram,"uSamplerSpecular");
									tGL.activeTexture(tGL.TEXTURE2);
									tGL.bindTexture(tGL.TEXTURE_2D,tSpecularTexture);
									tGL.uniform1i(tProgram.uSamplerSpecular,2);
								}
							} else tSpecularTexture = null
						} else tNormalTexture = null, tSpecularTexture = null
						tGL.drawElements(tGL.TRIANGLES,tIBO.numItems,tGL.UNSIGNED_SHORT,0);
						triangleNum += tIBO.triangleNum
						drawCallNum++
						totalTriangleNum += tIBO.triangleNum
						totalDrawCallNum++
						//tGL.drawElements(tGL.LINES,tIBO.numItems,tGL.UNSIGNED_SHORT,0);
						pTexture = tTexture
						pSpecularTexture = tSpecularTexture
						pNormalTexture = tNormalTexture
					}
				}
			}
		}
		tick = function (v){
			//console.log(parseInt(v-prevTime))
			debugPannel.innerHTML = ""
			totalDrawCallNum = 0, totalTriangleNum = 0
			prevTime = v
			for(const tWorld of GL_LIST){
				drawCallNum = 0, triangleNum = 0
				tGL = tWorld[CTX]
				tGEOMETRY_LIST = tGL[GEOMETRY_LIST]
				tPROGRAM_LIST = tGL[PROGRAM_LIST]
				tTEXTURE_LIST = tWorld[TEXTURE_LIST]
				if(tWorld[UPDATER]) tWorld[UPDATER]()
				/*
				 TODO 페이스 컬링 결정여부는 재질이 먹어야하는군...
				 TODO 그렇게되면 최초정렬단계가 컬링방향으로 나뉘어지는군
				 */
				tGL.enable(tGL.CULL_FACE);
				tGL.cullFace(tGL.BACK);
				/*
				 TODO 블렌딩은 어쩔꺼냐...그냥 매번 처리할까?
				 */
				tGL.blendFunc(tGL.SRC_ALPHA,tGL.ONE_MINUS_SRC_ALPHA);
				tGL.enable(tGL.BLEND);
				// 뎁스테스트
				tGL.enable(tGL.DEPTH_TEST);
				tGL.depthFunc(tGL.LESS)
				tGL.clear(tGL.COLOR_BUFFER_BIT|tGL.DEPTH_BUFFER_BIT);
				///////////////////////////////////////////////////////////////////////////////
				// 퍼스펙티브는 아마도 월드가 먹고 Scene도 분기해줘야할듯
				mat4.identity(uPMatrix);
				mat4.perspective(uPMatrix,PER_PI*45,((tGL.w)/(tGL.h)),0.1,100000.0);
				///////////////////////////////////////////////////////////////////////////////
				for(const k in tPROGRAM_LIST){
					tProgram = tPROGRAM_LIST[k]
					tGL.useProgram(tProgram);
					tProgram.uVS = tGL.getUniformLocation(tProgram,"uVS");
					tProgram.uFS = tGL.getUniformLocation(tProgram,"uFS");
					tProgram.uPARENT = tGL.getUniformLocation(tProgram,"uPARENT");
					// 퍼스펙티브 매트릭스 설정
					tProgram.uPMatrix = tGL.getUniformLocation(tProgram,"uPMatrix");
					tGL.uniformMatrix4fv(tProgram.uPMatrix,false,uPMatrix);
					// 노말 메트릭스 설정
					if(tGL.getUniformLocation(tProgram,"uNormalMatrix")){
						tProgram.uNormalMatrix = tGL.getUniformLocation(tProgram,"uNormalMatrix");
						tGL.uniformMatrix4fv(tProgram.uNormalMatrix,false,uNormalMatrix);
					}
					// 카메라 메트릭스 설정
					// TODO 카메라 팩토리작성
					tProgram.uCameraMatrix = tGL.getUniformLocation(tProgram,"uCameraMatrix");
					tGL.uniformMatrix4fv(tProgram.uCameraMatrix,false,tWorld.camera.matrix);
					// 노이미지 제너레이팅
					if(!tTEXTURE_LIST[noImageSrc]){
						console.log('노이미지 한번만 생성되는지 체크')
						let t0 = new Image();
						let texture = tGL.createTexture();
						t0.src = noImageSrc
						tGL.pixelStorei(tGL.UNPACK_FLIP_Y_WEBGL,true);
						tGL.bindTexture(tGL.TEXTURE_2D,texture);
						tGL.texImage2D(tGL.TEXTURE_2D,0,tGL.RGBA,tGL.RGBA,tGL.UNSIGNED_BYTE,t0);
						tGL.generateMipmap(tGL.TEXTURE_2D);
						// TODO 텍스쳐 필터도 재질이 먹어야겠네...
						tGL.texParameteri(tGL.TEXTURE_2D,tGL.TEXTURE_MAG_FILTER,tGL.LINEAR);
						tGL.texParameteri(tGL.TEXTURE_2D,tGL.TEXTURE_MIN_FILTER,tGL.LINEAR_MIPMAP_LINEAR);
						tTEXTURE_LIST[noImageSrc] = texture
					}
				}
				///////////////////////////////////////////////////////////////////////////////
				// 업데이트된 지오메트리 업로드
				for(const geo of RedGL.Geometry[REAL_CLASS][UPDATE_LIST]){
					if(!tGEOMETRY_LIST[geo[TYPE]]){
						tGEO = tGEOMETRY_LIST[geo[TYPE]] = {}
						tVBO = tGL.createBuffer();
						tGL.bindBuffer(tGL.ARRAY_BUFFER,tVBO);
						tGL.bufferData(tGL.ARRAY_BUFFER,geo[VBO],tGL.STATIC_DRAW);
						tVBO['itemSize'] = geo[VBO].itemSize
						tVBO['numItems'] = geo[VBO].numItems
						tGEO['vbo'] = tVBO
						tVNBO = tGL.createBuffer();
						tGL.bindBuffer(tGL.ARRAY_BUFFER,tVNBO);
						tGL.bufferData(tGL.ARRAY_BUFFER,geo[VNBO],tGL.STATIC_DRAW);
						tVNBO['itemSize'] = geo[VNBO].itemSize
						tVNBO['numItems'] = geo[VNBO].numItems
						tGEO['vnbo'] = tVNBO
						tIBO = tGL.createBuffer();
						tGL.bindBuffer(tGL.ELEMENT_ARRAY_BUFFER,tIBO);
						tGL.bufferData(tGL.ELEMENT_ARRAY_BUFFER,new Uint16Array(geo[IBO]),tGL.STATIC_DRAW);
						tIBO['itemSize'] = geo[IBO].itemSize
						tIBO['numItems'] = geo[IBO].numItems
						tIBO['triangleNum'] = geo[IBO].triangleNum
						tGEO['ibo'] = tIBO
						tUVBO = tGL.createBuffer();
						tGL.bindBuffer(tGL.ARRAY_BUFFER,tUVBO);
						tGL.bufferData(tGL.ARRAY_BUFFER,geo[UVBO],tGL.STATIC_DRAW);
						tUVBO['itemSize'] = geo[UVBO].itemSize
						tUVBO['numItems'] = geo[UVBO].numItems
						tGEO['uvbo'] = tUVBO
					}
				}
				///////////////////////////////////////////////////////////////////////////////
				tVBO = null, tIBO = null, tUVBO = null, tVNBO = null
				tTexture = null, pTexture = null
				pSpecularTexture = null, tSpecularTexture = null
				pNormalTexture = null, tNormalTexture = null
				if(tWorld.scene) render(tWorld.scene)
				tWorld.scene.renderInfo = {
					drawCallNum:drawCallNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),
					triangleNum:triangleNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
				}
				//console.log('drawCallNum :',drawCallNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),'/ triangleNum :',triangleNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))
				if(RedGL.debug){
					debugPannel.innerHTML += '<b>Scene : UUID('+tWorld.scene[Symbol.for('UUID')]+') --------------------------------------<br></b>'
					debugPannel.innerHTML += 'drawCallNum : '+tWorld.scene.renderInfo.drawCallNum+'<br>'
					debugPannel.innerHTML += 'triangleNum : '+tWorld.scene.renderInfo.triangleNum+'<br>'
				}
			}
			RedGL.Geometry[REAL_CLASS][UPDATE_LIST].length = 0
			if(RedGL.debug) debugPannel.style.display = "block"
			requestAnimationFrame(tick)
			//console.log('totalDrawCallNum :',totalDrawCallNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),'/ totalTriangleNum :',totalTriangleNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))
		}
		requestAnimationFrame(tick)
		//setInterval(tick,16)
	}
}
