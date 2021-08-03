“使用严格”；

var commonjsGlobal = typeof window！=='未定义'？window：typeof global！=='未定义'？全局：typeof自我！=='未定义'？自我：{};

函数createCommonjsModule（fn，module）{
	return module = {出口：{}}，fn（module，module.exports），module.exports;
}

var promise = createCommonjsModule（function（module）{
（函数（根）{

  //存储setTimeout引用，以便promise-polyfill不会受到以下影响
  //其他修改setTimeout的代码（例如sinon.useFakeTimers（））
  var setTimeoutFunc = setTimeout;

  函数noop（）{}
  
  // Function.prototype.bind的Polyfill
  函数bind（fn，thisArg）{
    返回函数（）{
      fn.apply（thisArg，arguments）;
    };
  }

  函数Promise（fn）{
    如果（typeof this！=='object'）抛出新的TypeError（'Promise必须通过new构造'）;
    如果（typeof fn！=='function'）抛出新的TypeError（'not a function'）;
    this._state = 0;
    this._handled = false;
    this._value =未定义;
    this._deferreds = [];

    doResolve（fn，this）;
  }

  函数句柄（自身，延迟）{
    而（self._state === 3）{
      自我= self._value;
    }
    如果（self._state === 0）{
      self._deferreds.push（deferred）;
      返回;
    }
    self._handled = true;
    Promise._immediateFn（function（）{
      var cb = self._state === 1吗？deferred.onFulfilled：deferred.onRejected;
      如果（cb === null）{
        （self._state === 1？resolve：拒绝）（deferred.promise，self._value）;
        返回;
      }
      var ret;
      尝试{
        ret = cb（self._value）;
      }抓住（e）{
        拒绝（deferred.promise，e）;
        返回;
      }
      解决（deferred.promise，ret）;
    }）;
  }

  函数resolve（self，newValue）{
    尝试{
      //承诺解决程序：https：//github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      如果（newValue === self）抛出新的TypeError（'一个Promise无法自身解决'）;
      如果（newValue &&（typeof newValue ==='object'|| typeof newValue ==='function'））{
        var then = newValue.then;
        如果（Promise的newValue实例）{
          self._state = 3;
          self._value = newValue;
          压轴（个体）；
          返回;
        } else if（typeof then ==='function'）{
          doResolve（bind（then，newValue），self）;
          返回;
        }
      }
      self._state = 1;
      self._value = newValue;
      压轴（个体）；
    }抓住（e）{
      拒绝（自己，e）；
    }
  }

  函数reject（self，newValue）{
    self._state = 2;
    self._value = newValue;
    压轴（个体）；
  }

  函数结局（自己）{
    如果（self._state === 2 && self._deferreds.length === 0）{
      Promise._immediateFn（function（）{
        如果（！self._handled）{
          Promise._unhandledRejectionFn（self._value）;
        }
      }）;
    }

    对于（var i = 0，len = self._deferreds.length; i <len; i ++）{
      处理（self，self._deferreds [i]）;
    }
    self._deferreds = null;
  }

  函数Handler（onFulfilled，onRejected，Promise）{
    this.onFulfilled = typeof onFulfilled ==='功能'吗？onFulfilled：null;
    this.onRejected = typeof onRejected ==='功能'吗？onRejected：null;
    this.promise =许诺；
  }

  / **
   *采取可能无法正常使用的解析器功能，并确保
   * onFulfilled和onRejected仅被调用一次。
   *
   *不保证异步。
   * /
  函数doResolve（fn，self）{
    var done = false;
    尝试{
      fn（函数（值）{
        如果（完成）返回；
        完成=真;
        解决（自我，价值）；
      }，函数（原因）{
        如果（完成）返回；
        完成=真;
        拒绝（自己，理由）；
      }）;
    } catch（ex）{
      如果（完成）返回；
      完成=真;
      拒绝（自我，前）；
    }
  }

  Promise.prototype ['catch'] =函数（onRejected）{
    返回this.then（null，onRejected）;
  };

  Promise.prototype.then =函数（onFulfilled，onRejected）{
    var prom = new（this.constructor）（noop）;

    句柄（this，new Handler（onFulfilled，onRejected，prom））;
    返回舞会
  };

  Promise.all =函数（arr）{
    var args = Array.prototype.slice.call（arr）;

    返回新的Promise（函数（解决，拒绝）{
      如果（args.length === 0）返回resolve（[]）;
      剩余的var = args.length;

      函数res（i，val）{
        尝试{
          if（val &&（typeof val ==='object'|| typeof val ==='function'））{
            var then = val.then;
            if（typeof then ==='function'）{
              then.call（val，function（val）{
                res（i，val）;
              }， 拒绝）;
              返回;
            }
          }
          args [i] = val;
          如果（-剩余=== 0）{
            解析（参数）;
          }
        } catch（ex）{
          拒绝（ex）;
        }
      }

      for（var i = 0; i <args.length; i ++）{
        res（i，args [i]）;
      }
    }）;
  };

  Promise.resolve =函数（值）{
    if（value && typeof value ==='object'&& value.constructor === Promise）{
      返回值
    }

    返回新的Promise（function（resolve）{
      resolve（值）;
    }）;
  };

  Promise.reject =函数（值）{
    返回新的Promise（函数（解决，拒绝）{
      拒绝（值）;
    }）;
  };

  Promise.race =函数（值）{
    返回新的Promise（函数（解决，拒绝）{
      for（var i = 0，len = values.length; i <len; i ++）{
        values [i] .then（resolve，reject）;
      }
    }）;
  };

  //将polyfill用于setImmediate以提高性能
  Promise._immediateFn =（typeof setImmediate ==='function'&& function（fn）{setImmediate（fn）;}）||
    函数（fn）{
      setTimeoutFunc（fn，0）;
    };

  Promise._unhandledRejectionFn =函数_unhandledRejectionFn（err）{
    if（typeof console！=='undefined'&& console）{
      console.warn（'可能的未处理的承诺拒绝：'，err）; // eslint-disable-line no-console
    }
  };

  / **
   *设置立即执行函数以执行回调
   * @param fn {function}要执行的函数
   * @已弃用
   * /
  Promise._setImmediateFn =函数_setImmediateFn（fn）{
    Promise._immediateFn = fn;
  };

  / **
   *更改功能以执行未处理的拒绝
   * @param {function} fn在未处理的拒绝上执行的函数
   * @已弃用
   * /
  Promise._setUnhandledRejectionFn =函数_setUnhandledRejectionFn（fn）{
    Promise._unhandledRejectionFn = fn;
  };
  
  if（'object'！=='undefined'&& module.exports）{
    module.exports =承诺；
  } else if（！root.Promise）{
    root.Promise =承诺;
  }

}）（commonjsGlobal）;
}）;

/ **
 *分析客户端用户代理
 * 1.检测客户端类型
 * 2.收集必要的信息
 * /

函数ua（）{
  var APP = ['eleme'，'napos']
  var OS = ['windows'，'android'，'iphone_os'，'ios']
  var REGX_ID = / ^ [a-f0-9] {8}-[a-f0-9] {4}-[34] [a-f0-9] {3}-[89ab] [a-f0-9 ] {3}-[a-f0-9] {12} $ /
  var REGX_VER = / ^（\ d +）（？：\。（\ d +）|）（？：\。（\ d +）|）（？:-( alpha | beta | rc）（\ d *）|）（ ？：-（（dev）|）$ /
  var UA = navigator.userAgent
    .toLowerCase（）
    .replace（/ \ s + / g，''）
    .split（';'）[0]
    。分裂（' '）

  var info = {isClient：false}

  var uaCore = UA.map（function（str）{
    var sp = str.indexOf（'/'）
    返回[str.substr（0，sp），str.substr（sp + 1）]
  }）
  如果（uaCore.length <5）{
    info.uaNotRecognized ='INFO_SHORTAGE'
    返回信息
  }

  var hasRomInfo = uaCore.length> = 6
  如果（hasRomInfo）{
    而（uaCore.length> 6）{
      uaCore.splice（4，1）
    }
  }

  var ref = uaCore.pop（）;
  var键= ref [0];
  var appId = ref [1];
  if（key！=='id'||！REGX_ID.test（appId））{
    info.uaNotRecognized ='ILLEGAL_APPID'
    返回信息
  }
  info.id = appId

  var ref $ 1 = uaCore.pop（）;
  var appName = ref $ 1 [0];
  var appVersion = ref $ 1 [1];
  如果（APP.indexOf（appName）=== -1 ||！REGX_VER.test（appVersion））{
    info.uaNotRecognized ='UNKNOWN_APP'
    返回信息
  }
  info.app = {名称：appName，版本：appVersion}

  info.display = hasRomInfo？uaCore.pop（）[1]：null

  var ref $ 2 = uaCore.pop（）;
  var osName = ref $ 2 [0];
  var osVersion = ref $ 2 [1];
  如果（OS.indexOf（osName）=== -1）{
    info.uaNotRecognized ='UNKNOWN_OS'
    返回信息
  }
  info.os = {
    名称：osName ==='iphone_os'吗？'ios'：osName，
    版本：osVersion
  }

  var ref $ 3 = uaCore.pop（）;
  var deviceName = ref $ 3 [0];
  var deviceModel = ref $ 3 [1];
  info.device = {
    名称：deviceName，
    型号：deviceName ==='pc'吗？''：deviceModel
  }

  info.isClient = true
  返回信息
}

var ua $ 1 = ua（）

功能错误（条件，消息）{
  如果（！条件）{
    typeof控制台！=='undefined'&& console.error（（“ [eleme-openApi-jssdk]” +消息））
  }
}

函数isFunction（fn）{
  返回typeof fn ==='函数'
}

函数isObject（obj）{
  返回typeof obj ==='object'
}

函数generateUTID（oneDirection）{
  if（oneDirection === void 0）oneDirection = false;

  var UTID_CHAR_ARRAY ='0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split（''）
  var UTID_CHAR_COUNT = UTID_CHAR_ARRAY.length
  var UTID_LENGTH = 16
  var str =''
  如果（！oneDirection）{
    对于（var i = 0; i <UTID_LENGTH; i ++）{
      var index = Math.floor（Math.random（）* UTID_CHAR_COUNT）
      str + = UTID_CHAR_ARRAY [index]
    }
  }
  返回str
}

函数isNeedleView（）{
  返回navigator.userAgent.indexOf（'NEEDLE'）！== -1 || navigator.userAgent.indexOf（'Needle'）！== -1
}

var FakeNativeApi =函数FakeNativeApi（）{};

FakeNativeApi.prototype.requestToClient =函数requestToClient（requestJson）{
  var request = JSON.parse（requestJson）
  var fnName = request.functionName
  var args = request ['arguments']
  var utid = request.utid
  var错误= null
  var结果= []

  开关（fnName）{
    案例“ browser.dismiss”：
      window.history.back（）
      打破

    案例“获取”：
      开关（args [0]）{
        案例'runtime.topbar.title'：
          结果= [window.document.title]
          打破

        案例'runtime.browser.isAppInstalled'：
          结果= [true]
          打破

        案例'runtime.auth.ksid'：
        案例'runtime.restaurant.restaurantId'：
          错误= {代码：-1，消息：'不支持的方法'}
          打破
      }
      打破

    案例“设置”：
      开关（args [0]）{
        案例'runtime.topbar.title'：
          if（typeof args [1]！='string'）{
            错误= {代码：-2，消息：'无效的参数，＃1应该是字符串'};
          }其他{
            window.document.title = args [1];
            结果= [true];
          }
          打破;
        }
        打破;

    默认：
      错误= {代码：-1，消息：'无效的函数名称“'+ fnName +'”'}
      打破
  }

  setTimeout（function（）{
    window .__ napos__respondToBrowser __（{utid：utid，错误：错误，结果：结果}）
  }，200）
};

FakeNativeApi.prototype.respondToClient = function responseToClient（）{};

var requestToClient = function（）{}
var responseToClient = function（）{}
如果（！isNeedleView（））{
  如果（！ua $ 1.isClient）{
    var fakeApi =新的FakeNativeApi（）
    requestToClient = fakeApi.requestToClient.bind（fakeApi）
    responseToClient = fakeApi.respondToClient.bind（fakeApi）
  } else if（ua $ 1.os.name ==='android'）{
    如果（isObject（window .__ napos__））{
      如果（isFunction（window .__ napos __。requestToClient））{
        requestToClient = window .__ napos __。requestToClient.bind（window .__ napos__）
      }其他{
        错误（错误，“无法检测到窗口。__napos __。requestToClient函数”）
      }

      如果（isFunction（window .__ napos __。respondToClient））{
        responseToClient = window .__ napos __。respondToClient.bind（window .__ napos__）
      }其他{
        错误（错误，“无法检测到窗口。__napos __。respondToClient函数”）
      }
    }其他{
      错误（错误，“无法检测到window .__ napos__对象”）
    }
  } else if（ua $ 1.os.name ==='ios'）{
    var loadUrl =函数（方案，网址）{
      var ifr = document.createElement（'iframe'）
      ifr.setAttribute（'src'，scheme +'：//'+ encodeURIComponent（url））
      ifr.setAttribute（'style'，'display：none'）
      ifr.setAttribute（'height'，'0px'）
      ifr.setAttribute（'width'，'0px'）
      ifr.setAttribute（'frameborder'，'0'）
      document.body.appendChild（ifr）
      ifr.parentNode.removeChild（ifr）
      ifr =空
    }
    requestToClient = loadUrl.bind（null，'napos-request-to-client'）
  }
}

//本机-> Web（本机请求，Web响应）
var handlers = {}

函数doRespondToClient（utid，错误，结果）{
  responseToClient（JSON.stringify（{utid：utid，错误：错误，结果：结果}））
}

如果（ua $ 1.os && ua $ 1.os.name！=='windows'）{
  window .__ napos__requestToBrowser__ =函数（请求）{
    var functionName = request [0];
    var utid = request [1];
    var handler = handlers [functionName]
    如果（isFunction（handler））{
      var args = request ['arguments']
      如果（utid）{
        args.push（doRespondToClient.bind（null，utid））
      }
      handler.apply（void 0，args）
    }
  }
}

// Web-> Native（Web请求，本机响应）
var回调= {}

函数doRequestToClient（oneDirection，functionName，args，cb）{
  if（args === void 0）args = [];

  var _utid = generateUTID（oneDirection）
  如果（！oneDirection && isFunction（cb））{
    回调[_utid] = cb
  }
  requestToClient（JSON.stringify（{
    utid：_utid，
    functionName：functionName，
    '参数'：args
  }））
}

如果（ua $ 1.os && ua $ 1.os.name！=='windows'）{
  window .__ napos__respondToBrowser__ =函数（已响应）{
    var utid = response.utid;
    var结果= response.results;
    var错误= response.error;
    var cb =回调[utid]
    如果（isFunction（cb））{
      var _r =结果|| []
      cb.apply（无效0，[错误] .concat（_r））
    }
  }
}

var lib = createCommonjsModule（函数（模块，导出）{
;（function（root，factory）{
  如果（typeof undefined ==='function'&& undefined.amd）{
    undefined（[]，factory）;
  } else if（'object'==='object'）{
    module.exports = factory（）;
  }其他{}
}（commonjsGlobal，function（）{
  如果（typeof weex ==='object'）{
    窗口= {
      导航器：{
        userAgent：weex.config.env.platform +'Needle / Weex'
      }
    };
  }

  / **
   * @命名空间针
   * @版本0.3.0
   * @全球
   * @作者hongju.wang@ele.me，jianxiang.jin@ele.me
   * /
  var callQueue = [];
  var eventMap = {};
  var stashedEvents = [];

  / **
   *鍒ゆ柇鏄惁鏄疉ndroid骞冲彴
   * @return {布尔}
   * @功能
   * @memberof针
   * @return {布尔}
   * /
  函数isAndroid（）{
    var ua = window.navigator.userAgent.toLowerCase（）;
    返回ua.indexOf（'android'）> -1;
  }

  / **
   *鍒ゆ柇鏄惁鏄湪针镄刉ebView鐜
   * @return {布尔}
   * @功能
   * @memberof针
   * @return {布尔}
   * /
  函数isNeedle（）{
    var ua = window.navigator.userAgent.toLowerCase（）;
    返回ua.indexOf（'needle'）> -1;
  }

  / **
   *鍒ゆ柇鏄惁鏄酸OS骞冲彴
   * @return {布尔}
   * @功能
   * @memberof针
   * @return {布尔}
   * /
  函数isIOS（）{
    var ua = window.navigator.userAgent.toLowerCase（）;
    返回ua.indexOf（'iphone'）> -1;
  }

  / **
   *鍒ゆ柇鏄惁鏄.Weex鐜
   * @return {布尔}
   * @功能
   * @memberof针
   * @return {布尔}
   * /
  函数isWeex（）{
    weex返回typeof ==='object';
  }

  如果（isWeex（））{
    var globalEvent = weex.requireModule（'globalEvent'）;
    globalEvent.addEventListener（'_ needleEvent'，函数（事件）{
      var eventName = event.eventName;
      var eventData = event.data;
      如果（typeof event.data ==='对象'）{
        eventData = event.data;
      }其他{
        尝试{
          eventData = JSON.parse（event.data）;
        }抓住（e）{}
      }
      var callback = eventAndCallbackMap [eventName];
      setTimeout（function（）{
        !! callback && callback（eventData）;
      }，0）;
    }）;

    globalEvent.addEventListener（'_ needleCall'，函数（事件）{
      var response = event.data;
      如果（typeof event.data ==='对象'）{
        响应= event.data;
      }其他{
        尝试{
          响应= JSON.parse（event.data）;
        }抓住（e）{}
      }
      var callback = callingAndCallbackMap [response.id];
      响应= response.result;
      setTimeout（function（）{
        if（!! callback && !! response）{
          如果（!!（response.err））{
            callback（response.err，null）;
          }其他{
            callback（null，response.res）;
          }
        }
        删除callingAndCallbackMap [response.id];
      }，0）;
    }）;
  }

  //仅适用于Android
  var uniqueId = 0; //璇锋眰璋幂敤镄 消息ID
  varcallingAndCallbackMap = {}; //璋幂敤浠ュ强锲炶皟镄勫搴斿叧绯。
  var eventAndCallbackMap = {}; //浜嬩欢钖嶅瓧浠ュ强浜嬩欢锲炶皟镄勫搴斿叧绯。
  如果（！isWeex（））{
    window .__ needleBrowserTunnel = {
      / **
       *从Android读取数据
       * {id，params，结果}
       * /
      读取：函数（responseString）{
        var response = JSON.parse（responseString）;
        var callback = callingAndCallbackMap [response.id];
        响应= response.result;
        setTimeout（function（）{
          if（!! callback && !! response）{
            如果（!!（response.err））{
              callback（response.err，null）;
            }其他{
              callback（null，response.res）;
            }
          }
          删除callingAndCallbackMap [response.id];
        }，0）;
      }，
      on：函数（eventName，数据）{
        / **
         *从Android接收事件和事件数据
         * /
        var eventData =数据；
        尝试{
          eventData = JSON.parse（data）;
        }抓住（e）{
        }
        var callback = eventAndCallbackMap [eventName];
        setTimeout（function（）{
          !! callback && callback（eventData）;
        }，0）;
      }
    };
  }

  / **
   *镙规嵁鎻掍欢钖嶅瓧璋幂敤
   * @功能
   * @memberof针
   * @param {String}名称鎻掍欢钖嶅瓧（镊畾涔夋彃浠跺悕瀛楅渶瑕佷笌瀹㈡埛绔紑鍙戜竴璧峰岗鍟。，鍐呯疆鎻掍欢钖嶅瓧鍧囧凡针澶€澶达纴涓纴涓姟畾涔夋彃浠跺彲娣诲姞历历历历锻悕鍐悕鍐
   * @param {对象}参数鍙傛暟
   * @param {function}回调锲炶皟鍑芥暟，鍑芥暟绛惧悕callback（err，res），绗竴涓€槸槸err，绗簩涓弬鏁版槸姝e父响应锛堜笌Node.js锲炶皟绫任意技锛。
   * /
  函数execute（name，params，callback）{
    如果（isWeex（））{
      var id ='msg_'+（uniqueId ++）+'_'+ new Date（）。getTime（）;
      CallingAndCallbackMap [id] =回调；
      weex.requireModule（'NeedleNativeModule'）。execute（{id：id，name：name，params：params}）;
      返回;
    }

    如果（isAndroid（）&& !! window .__ needleClientTunnel）{
      var id ='msg_'+（uniqueId ++）+'_'+ new Date（）。getTime（）;
      CallingAndCallbackMap [id] =回调；
      window .__ needleClientTunnel.read（JSON.stringify（{id：id，name：name，params：params}））;
    }其他{
      如果（!! window.WebViewJavascriptBridge）{
        _doCall（name，params，callback）;
      }其他{
        callQueue.push（{name：name，params：params，callback：callback}）;
      }
    }
  }

  / **
   *鍒ゆ柇鏄惁准备好了
   * @功能
   * @memberof针
   * @return {Boolean}真ㄧず针鍒濆鍖栧畲姣。
   * /
  函数isReady（）{
    返回!! window.WebViewJavascriptBridge || !! window .__ needleClientTunnel || isWeex（）;
  }

  函数_doCall（name，params，callback）{
    !! window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler（name，params，function（res）{
      var response = isAndroid（）吗？JSON.parse（res）：res;
      if（!! callback && !! response）{
        如果（!!（response.err））{
          callback（response.err，null）;
        }其他{
          callback（null，response.res）;
          if（window .__ needle__debug）{
            console.log（'插件名称：'，名称，'，参数：'，参数，'，响应：'，响应）;
          }
        }
      }
    }）;
  }

  / **
   *娉ㄥ唽浜嬩欢鐩戝惉
   * @功能
   * @memberof针
   * @param {String} eventName浜嬩欢钖嶅瓧
   * @param {function}回调浜嬩欢鍙戠敓镞剁殑锲炶皟
   * /
  函数on（eventName，callback）{
    如果（isWeex（））{
      eventAndCallbackMap [eventName] =回调；
      返回;
    }

    如果（isAndroid（）&& !! window .__ needleClientTunnel）{
      eventAndCallbackMap [eventName] =回调；
      返回;
    }

    eventMap [eventName] = {eventName：eventName，callback：callback};
    如果（!! window.WebViewJavascriptBridge）{
      WebViewJavascriptBridge.registerHandler（eventName，function（data）{
        _doFlushEventListeners（eventName，data）;
      }）;
    }其他{
      stashedEvents.push（{eventName：eventName，callback：callback}）;
    }
  }

  函数_doFlushEventListeners（eventName，data）{
    var event = eventMap [eventName];
    如果（!! event）{
      event.callback（data）;
    }
  }

  / **
   *璁惧鐩稿叧镄API
   *@namespaceneedle.app
   * @ memberof针
   * /
  var app = {
    / **
     *銮峰彇璁惧淇℃伅
     * @示例
     ##杩斿洖链 
     {
       appId：“ me.ele.needle”，
       appVersion：“ 1.0”，
       buildNumber：1，
       deviceId：“ 2146F58E-97A2-4D94-A18A-3C72B6C68BFB”，
       平台：枚举（'Android'，'iOS'）
       分辨率：640x1136，
       systemVersion：“ 10.1”，
       networkType：枚举（'2G'，'3G'，'4G'，'WIFI'，'UNKNOW'），
       userAgent：“ Mozilla / 5.0（iP ...
       sdkVersion：“ 0.1.12”
      }
     * @功能
     * @ memberofneedle.app
     * @param {function}回调锲炶皟鍑芥暟
     * /
    getEnvInfo：函数（回调）{
      execute（'needle.app.env'，{}，回调）;
    }，

    / **
     *鎺㈡祴瀹夸富镓嬫満镆 APP鏄惁瀹夎
     * @功能
     * @ memberofneedle.app
     * @param {Object} param-{package：String，schemeUrl：String}，Android id id package锛宨OS scheme schemeUrl
     * @param {function}回调锲炶皟鍑芥暟-res：{isAppInstalled：Boolean}
     * /
    isAppInstalled：函数（参数，回调）{
      execute（'needle.app.installation'，param，callback）;
    }，

    / **
     *缂栬緫鐭俊鍒板彂阃佺煭淇￠〉闱㈢瓑寰呯敤鎴风'璁ゅ彂阃。
     * @示例
     ##璋幂敤
     var option = {
            电话：13857702077，
            消息：“这是一封短信”。
        };
     needle.app.sendSMS（option，function（err，res）{
        if（！err）{
           ;
        }
      }）;
     * @功能
     * @ memberofneedle.app
     * @param {Object}参数-{tel：字符串，消息：String}
     * @param {function}回调锲炶皟鍑芥暟
     * /
    sendSMS：函数（参数，回调）{
      execute（'needle.app.sms'，param，callback）;
    }，

    / **
     *銮峰彇瀹氢綅淇℃伅
     * @示例
     * needle.app.getLocation（function（err，res）{
     *如果（！err）{
     * res = {
                “经度”：89.33，
                “纬度”：101.11
            }
     *}
     *}）;
     * @示例
     ##鎴愬姛鍝嶅簲
     {
       “经度”：89.33，
       “纬度”：101.11
     }
     * @功能
     * @ memberofneedle.app
     * @param {function}回调锲炶皟鍑芥暟
     * /
    getLocation：函数（回调）{
      execute（'needle.app.location'，{}，回调）;
    }，

    / **
     *鍦ㄦ柊镄WebView U Uri
     * @功能
     * @示例
     * //鍙傛暟
     * {
     *网址：“ http://www.google.com”
     *外部：true
     *}
     * @ memberofneedle.app
     * @param {Object} param {url：字符串，外部：布尔}，外部鏄惁浣跨敤绯荤粺娴忚鍣ㄦ墦寮€
     * @param {function}回调锲炶皟鍑芥暟
     * /
    openUri：函数（参数，回调）{
      execute（'needle.app.uri'，param，callback）;
    }，

    / **
     *娓呴櫎webview缂揿瓨
     *添加：安卓：0.1.2
     *添加：iOS：0.1.0
     * @功能
     * @ memberofneedle.app
     * @param {function}回调锲炶皟鍑芥暟
     * /
    clearWebsiteCache：函数（回调）{
      execute（'needle.app.web.cache.clear'，{}，回调）;
    }
  };

  / **
   * WebView浠ュ强镓€浜涚浉鍏虫搷浣
   * @命名空间needle.container
   * @ memberof针
   * /
  var container = {
    / **
     *鏄剧ず吐司
     * @示例
     ##璋幂敤
     {
       讯息：味精，
       持续时间：1000
       偏移：0
     }
     * @功能
     * @ memberofneedle.container
     * /
    吐司：功能（参数）{
      execute（'needle.container.toast'，param，null）;
    }，

    / **
     *鍏抽棴褰揿墠椤甸溃锛圢ative椤甸溃锛。
     * @功能
     * @ memberofneedle.container
     * /
    关闭：function（）{
      execute（'needle.container.window'，{type：'close'}，null）;
    }，

    / **
     *重新加载缃戦〉锛屽彲浠URL
     * @功能
     * @示例
     ## param绀轰緥
     {
       网址：“ http://www.google.com”
     }
     * @ memberofneedle.container
     * @param {function}回调锲炶皟鍑芥暟
     * /
    重新加载：函数（参数，回调）{
      var param = param || {};
      param.type ='重新加载';
      execute（'needle.container.window'，param，callback）;
    }，

    / **
     *褰揿墠缃戦〉锲为€€
     * @功能
     * @ memberofneedle.container
     * @param {function}回调锲炶皟鍑芥暟
     * /
    goBack：函数（回调）{
      execute（'needle.container.window'，{type：'back'}，回调）;
    }，

    / **
     *鏄剧ずloading
     * @功能
     * @ memberofneedle.container
     * /
    showLoading：function（）{
      execute（'needle.container.loading'，{type：'show'}，null）;
    }，

    / **
     *闅愯棌正在加载
     * @功能
     * @ memberofneedle.container
     * /
    hideLoading：函数（）{
      execute（'needle.container.loading'，{type：'hide'}，null）;
    }，

    / **
     *璁剧疆瀵艰埅镙忕殑镙回埅镙忕殑镙
     * @功能
     * @示例
     ## param绀轰緥
     {
       标题：“桦鑸爮镙回”
     }
     * @ memberofneedle.container
     * @param param瑙佺ず渚 
     * @param {function}回调锲炶皟鍑芥暟
     * /
    setTitle：函数（参数，回调）{
      var param = param || {};
      param.type ='设置';
      execute（'needle.container.title'，param，null）;
    }，

    / **
     *銮峰彇瀵艰埅镙忕殑镙回
     * @功能
     * @示例
     ##回调资源
     “ {
       标题：'銮峰彇鍒扮殑镙回'
     “}
     * @ memberofneedle.container
     * @param {function}回调锲炶皟鍑芥暟
     * /
    getTitle：函数（回调）{
      execute（'needle.container.title'，{type：'get'}，回调）;
    }，

    / **
     *鏄剧ず铡熺敓瀵艰苦埅镙
     * @功能
     * @ memberofneedle.container
     * @param {function}回调锲炶皟鍑芥暟
     * /
    showTitleBar：函数（回调）{
      execute（'needle.container.titleBar'，{type：'show'}，回调）;
    }，

    / **
     *闅愯棌铡熺敓瀵
     * @功能
     * @ memberofneedle.container
     * @param {function}回调锲炶皟鍑芥暟
     * /
    hideTitleBar：函数（回调）{
      execute（'needle.container.titleBar'，{type：'hide'}，回调）;
    }，

    / **
     *璁剧疆铡熺敓瀵艰埅镙忓彸涓婅菜单埅镙忓彸涓婅con
     * @功能
     * @示例
     ## param绀轰緥
     {
       图标：“ http：// icon_url” //
     }
     @例
     ##璋幂敤绀轰緥
     needle.container.registerMenu（{图标：'http://avatar.csdn.net/7/A/A/1_qq_19711823.jpg'}，函数（）{
            toast（“菜单单击：”）;
     }）;
     * @ memberofneedle.container
     * @param {Object} param {icon：字符串}
     * @param {function} onclick菜单镣瑰向浼氲Е鍙戞回调
     * /
    registerMenu：函数（参数，onclick）{
      execute（'needle.container.menu'，param，null）;
      on（'needle.container.menu.onclick'，onclick）;
    }，

    / **
     *璁剧本搴曢儴寮瑰嚭菜单镄 图标锛屾枃瀛，键
     * @功能
     * @示例
     ## param绀轰緥
     菜单：[{
                        图标：“”，
                        文字：“，
                        键：” //鍞竴镙堆栈鍞竴镙
                    }]
     ## callback res绀轰緥
     {
       图标：“”，
       文字：“，
       关键：''
     }
     * @ memberofneedle.container
     * @param {Object}参数-瑙佺ず渚。
     * @param {function}回调锲炶皟鍑芥暟
     * /
    registerBottomMenu：函数（参数，回调）{
      execute（'needle.container.bottomMenu'，param，null）;
      on（'needle.container.bottomMenu.onclick'，回调）;
    }
  };

  / **
   *锲剧墖阃夋嫨浠ュ强锲剧墖棰勮鐩稿叧API
   * @命名空间needle.image
   * @ memberof针
   * /
  var image = {
    / **
     *阃夋嫨锲剧墖
     * @示例
     ## param绀轰緥
     {
      类型：enum（'camera'，'album'），
      选项：{
        maxSize：数字，// b，姣斿1024 * 50 = 50 Kb
        宽度：数字，
        高度：
      }
     }
     @例
     ## callback res绀轰緥
     {
       base64：'base64编码'
     }
     * @功能
     * @ memberofneedle.image
     * @param {对象} param瑙佺ず渚 
     * @param {function}回调锲炶皟鍑芥暟
     * /
    选择：函数（参数，回调）{
      execute（'needle.image.picker'，param，callback）;
    }，

    / **
     *棰勮锲剧墖
     * @功能
     @例
     ## param绀轰緥
     {images：[{uri：'uri'}]}
     * @ memberofneedle.image
     * @param {Object} param {images：[{uri：'url'}]}
     * @param {function}回调锲炶皟鍑芥暟
     * /
    预览：函数（参数，回调）{
      execute（'needle.image.previewer'，param，callback）;
    }，

    / **
     *淇濆瓨锲剧墖鍒扮郴缁熺浉鍐。
     *添加：安卓0.1.5
     *添加：iOS？
     * @功能
     @例
     ## param绀轰緥
     {base64：'base64字符串'}
     * @ memberofneedle.image
     * @param {Object} param {base64：String}
     * @param {function}回调锲炶皟鍑芥暟
     * /
    保存：函数（参数，回调）{
      execute（'needle.image.save'，param，callback）;
    }
  };

  / **
   *鍙WebView鍏变韩镄KV瀛桦偍API锛。
   *娉细涓嶅悓HOST涔嬮棿镞犳硶鍏变韩Cache銆备件緥濡needle.ele.me和needle.elenet.me镞犳硶鍏变韩Cache銆。
   * @命名空间needle.cache
   * @ memberof针
   * /
  var cache = {
    / **
     *璁剧疆KV，鐩稿悓镄键key瑕浼氲
     * @功能
     * @示例
     ## param绀轰緥
     {键：“键”，值：“值”}
     * @ memberofneedle.cache
     * @param {Object} param {key：字符串，值：字符串}
     * @param {function}回调锲炶皟鍑芥暟
     * /
    设置：函数（参数，回调）{
      var param = param || {};
      param.method ='设置';
      execute（'needle.cache'，param，callback）;
    }，

    / **
     *銮峰彇键瀵瑰簲链。
     * @功能
     * @示例
     ## param绀轰緥
     {key：'key'}
     * @ memberofneedle.cache
     * @param {Object} param {key：字符串}
     * @param {function}回调锲炶皟鍑芥暟
     * /
    get：function（param，callback）{
      var param = param || {};
      param.method ='获取';
      execute（'needle.cache'，param，callback）;
    }，

    / **
     *删除密钥瀵瑰簲链。
     *添加：安卓0.1.3
     *添加：iOS：0.1.0
     * @功能
     * @示例
     ## param绀轰緥
     {key：'key'}
     * @ memberofneedle.cache
     * @param {Object} param {key：字符串}
     * @param {function}回调锲炶皟鍑芥暟
     * /
    删除：函数（参数，回调）{
      var param = param || {};
      param.method ='删除';
      execute（'needle.cache'，param，callback）;
    }，

    / **
     *鍒犻櫎钥匙链key钥匙链。
     *添加：安卓0.1.3
     *添加：iOS：0.1.0
     * @功能
     * @ memberofneedle.cache
     * @param {function}回调锲炶皟鍑芥暟
     * /
    deleteAll：函数（回调）{
      var param = param || {};
      param.method ='清除';
      execute（'needle.cache'，param，callback）;
    }
  };

  如果（！isWeex（））{
    如果（window.WebViewJavascriptBridge）{
      initJS（）;
    }其他{
      // WebViewJavascriptBridgeReady浜嬩Web鐢卞涓JavaScript瑙﹀彂
      document.addEventListener（'WebViewJavascriptBridgeReady'，initJS，false）;
    }
  }

  函数_flushQueue（）{
    callQueue.forEach（功能（项目）{
      _doCall（item.name，item.params，item.callback）;
    }）;
    callQueue = [];
  }

  函数_flushEventListener（）{
    stashedEvents.forEach（函数（事件）{
      !! WebViewJavascriptBridge && WebViewJavascriptBridge.registerHandler（event.eventName，function（data）{
        _doFlushEventListeners（event.eventName，data）
      }）;
    }）;
    stashedEvents = [];
  }

  函数initJS（）{
    _flushEventListener（）;
    _flushQueue（）;
    varneedleReadyEvent = document.createEvent（'Events'）;
    needleReadyEvent.initEvent（'needleReady'）;
    document.dispatchEvent（needleReadyEvent）;
  }

  返回{
    版本：“ 0.3.0”，
    isAndroid：isAndroid，
    isIOS：isIOS，
    isNeedle：isNeedle，
    isWeex：isWeex，
    isReady：isReady，
    执行：执行，
    上：上，
    应用：应用，
    容器：容器，
    图片：图片，
    缓存：缓存，
  };
}））;
}）;

函数版本LowerThen730（version）{
  if（！version || typeof version！=='string'）{
    返回真
  }
  //榛樿鐗堟湰瑙勫垯涓新兴细瓒呰绷10，钖屾椂淇濊愈链変袱浣嶅皬鏁。
  返回parseInt（version.split（'。'）。join（''））<730
}
var Mobile = function Mobile（）{
  this.platform ='移动'
  this.isNeddle = isNeedleView（）
  this.callbacks = []
};

Mobile.prototype._get =函数_get（key，cb）{
  doRequestToClient（false，'get'，[key]，cb）
};

Mobile.prototype._set =函数_set（key，val，cb）{
  doRequestToClient（false，'set'，[key，val]，cb）
};

Mobile.prototype._setUserId =函数_setUserId（val，cb）{
    var this $ 1 = this;

  返回新的Promise（函数（解决，拒绝）{
    如果（！this $ 1.isNeddle）{
      this $ 1._set（'runtime.browser.userId'，val，function（error，userId）{
        错误？reject（error）：解析（userId）
      }）
    }其他{
      this $ 1.execute（'napos.setUserId'，val，function（err，res）{
        如果（错误）{
          拒绝（错误）
        }其他{
          解析
        }
      }）
    }
  }）
};

Mobile.prototype.execute =函数执行（名称，参数，cb）{
  lib.execute（名称，参数，cb）
};

//函数公开给第三部分
Mobile.prototype.dismiss =函数dismiss（）{
  doRequestToClient（true，'browser.dismiss'）
};

Mobile.prototype.goForwardWithBrowser =函数goForwardWithBrowser（url）{
  doRequestToClient（true，'browser.goForwardWithBrowser'，[url]）
};

Mobile.prototype.openNaposFileChooser =函数openNaposFileChooser（cb）{
  doRequestToClient（false，'browser.openNaposFileChooser'，[]，cb）
};

Mobile.prototype.isAppInstalled =函数isAppInstalled（packageId，cb）{
  doRequestToClient（false，'get'，['runtime.browser.isAppInstalled'，packageId]，cb）
};

Mobile.prototype.printOrder =函数printOrder（orderJsonString）{
  doRequestToClient（true，'browser.printOrder'，[orderJsonString]）
};

Mobile.prototype.picture =功能图片（uploadUrl，cb）{
  doRequestToClient（false，'browser.picture'，[uploadUrl]，cb）
};

Mobile.prototype.hideActionBar =函数hideActionBar（）{
  doRequestToClient（true，'browser.hideActionBar'）
};

Mobile.prototype.showActionBar =函数showActionBar（）{
  doRequestToClient（true，'browser.showActionBar'）
};

Mobile.prototype.showToast =函数showToast（内容）{
  doRequestToClient（true，'browser.showToast'，[content]）
};

Mobile.prototype.hideLoading =函数hideLoading（）{
  doRequestToClient（true，'browser.hideLoading'）
};

Mobile.prototype.showLoading =函数showLoading（）{
  doRequestToClient（true，'browser.showLoading'）
};

Mobile.prototype.getUserId =函数getUserId（）{
    var this $ 1 = this;

  返回新的Promise（函数（解决，拒绝）{
    如果（！this $ 1.isNeddle）{
      this $ 1._get（'runtime.browser.userId'，function（error，userId）{
        错误？reject（error）：解析（userId）
      }）
    }其他{
      this $ 1.execute（'napos.getUserId'，{}，function（err，res）{
        如果（错误）{
          拒绝（错误）
        }其他{
          解析
        }
      }）
    }
  }） 
};

Mobile.prototype.getCurrentShopId =函数getCurrentShopId（cb）{
    var this $ 1 = this;

  函数resolveSync（）{
    返回（window .__ napos__ && window .__ napos __。getNaposRSTid）吗？window .__ napos __。getNaposRSTid（）：null
  }
  如果（！this.isNeddle）{
    返回新的Promise（函数（解决，拒绝）{
      this $ 1._get（'runtime.restaurant.restaurantId'，function（error，shopId）{
        错误？resolve（resolveSync（））：resolve（shopId）
      }）
    }）
  }其他{
    返回新的Promise（函数（解决，拒绝）{
      this $ 1.execute（'napos.getShopId'，{}，function（err，res）{
        如果（错误）{
          拒绝（错误）
        }其他{
          解析
        }
      }）
    }）
  }
    
};

Mobile.prototype.setTitle =函数setTitle（标题）{
  如果（！this.isNeddle）{
    this._set（'runtime.topbar.title'，标题）
  }其他{
    lib.container.setTitle（{title：title}）
  }
};

Mobile.prototype.nativeAuth =函数nativeAuth（config）{
    var this $ 1 = this;

  var appinfo = ua $ 1
  var version = appinfo && appinfo.app && appinfo.app.version
  如果（versionLowerThen730（version））{
    return Promise.reject（'璇ョ増链笉鏀寔native鎺堟潈，璇蜂娇鐢╳eb椤甸溃鎺堟潈'）
  }
  var键= ['clientId'，'state'，'redirectUrl'，'scope']
  keys.forEach（function（key）{
    如果（！config [key]）{
      抛出错误（键+'不能为空'）
    }
  }）
  如果（typeof config.isProduction！=='布尔值'）{
    抛出错误（'isProduction必须为布尔值'）
  }
  返回新的Promise（函数（解决，拒绝）{
    this $ 1.execute（'napos.native.auth'，config，function（err，res）{
      如果（错误）{
        拒绝（错误）
      }其他{
        解析
      }
    }）
  }）
};

// iframe->旋律（消息：{utid，类型，方法，参数}）
var callbacks $ 1 = {}
函数requestToContainer（方法，参数）{
  if（params === void 0）params = [];

  var _utid = generateUTID（）
  返回新的Promise（函数（解决，拒绝）{
    如果（window.parent === window）{
      拒绝（“运行环境不是iframe！”）
    }其他{
      window.top.postMessage（{
        utid：_utid，
        类型：“ jssdk-request”，
        方法：方法，
        参数：params
      }，“ *”）
      callbacks $ 1 [_utid] = {解决：解决，拒绝：拒绝}
    }
  }）
}

如果（！ua $ 1.isClient ||（ua $ 1.os && ua $ 1.os.name ==='windows'））{
  window.addEventListener（'message'，function（event）{
    var ref = event.data;
    var utid = ref.utid;
    var type = ref.type;
    var结果=参考结果；
    var error = ref.error;
    如果（类型！=='jssdk-response'）{
      返回
    }
    如果（callbacks $ 1 [utid]）{
      var ref $ 1 = callbacks $ 1 [utid];
      var resolve = ref $ 1.resolve;
      var reject = ref $ 1.reject;
      如果（错误）{
        拒绝（错误）
      }其他{
        解决（结果）
      }
    }
  }，是的）
}

var Pc =函数Pc（）{
  this.platform ='pc'
};

Pc.prototype._setAppId =函数_setAppId（appId）{
  返回requestToContainer（'setAppId'，appId）
};

//函数公开给第三部分
Pc.prototype.getContainerLocation =函数getContainerLocation（）{
  返回requestToContainer（'getLocation'）
};

Pc.prototype.getUserId =函数getUserId（）{
  返回requestToContainer（'getUserId'）
};

Pc.prototype.getCurrentShopId =函数getCurrentShopId（）{
  返回requestToContainer（'getCurrentShopId'）
};

Pc.prototype.getChainRestaurantId =函数getChainRestaurantId（）{
  返回requestToContainer（'getChainRestaurantId'） 
};

Pc.prototype.getCodeForIdentity =函数getCodeForIdentity（参数）{
  var键= ['appKey']
  keys.forEach（function（key）{
    如果（！params [key]）{
      抛出错误（键+'不能为空'）
    }
  }）
  如果（typeof params.isProduction ==='未定义'）{
    params.isProduction = true
  }
  返回requestToContainer（'getCodeForIdentity'，params）
};

如果（！window.Promise）{
  window.Promise =许诺
}
var Client =（ua $ 1.isClient && ua $ 1.os && ua $ 1.os.name！=='windows'）手机：个人电脑

var Main =（function（Client）{
  函数Main（）{
    Client.call（此）
    this.userAgent = ua $ 1
  }

  如果（Client）Main .__ proto__ = Client;
  Main.prototype = Object.create（Client && Client.prototype）;
  Main.prototype.constructor = Main;

  Main.prototype.getUserAgent =函数getUserAgent（）{
    返回this.userAgent
  };

  Main.prototype.hasMethod =函数hasMethod（methodName）{
    返回!! this [methodName]
  };

  返回Main;
}（客户））;

var main = new Main（）

//删除开发人员的私有函数
var _proto = Object.getPrototypeOf（main）
对于（_proto中的var键）{
  如果（key.charAt（0）==='_'）{
    删除_proto [key]
  }
}

window.eleme =主要