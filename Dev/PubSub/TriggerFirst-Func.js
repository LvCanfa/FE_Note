let Event = (function () {
  let eventList = {},
      listen,
      trigger,
      remove,
      offLineStrack = {}

  listen = function (key, fn) {
    if (!eventList[key]) {
      eventList[key] = [];
    }
    eventList[key].push(fn);

    /**
     * 检验是否存在提前发布的事件数据
     */
    let offLineTriggerMess = offLineStrack[key];
    if(offLineTriggerMess) {
      for(let i = 0; i < offLineTriggerMess.length; i++) {
        fn.apply(this, offLineTriggerMess[i])
      }
    }
    offLineStrack[key] = []
  };

  trigger = function (key, ...args) {
    fns = eventList[key]
    /**
     * 建立一个存放离线事件的堆栈
     */
    if (!fns) {
      !offLineStrack[key] && (offLineStrack[key] = [])
      offLineStrack[key].push(arguments)
      return false;
    }

    if (fns.length === 0) {
      return false;
    }
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  }

  remove = function (key, fn) {
    let fns = eventList[key];
    let fnIndex = fns.indexOf(fn);
    if (fnIndex !== -1) {
      fns.splice(fnIndex, 1)
    }else {
      return false;
    }
  };

  return {
    listen,
    trigger,
    remove
  }
})();

const callback1 = (...args) => {
  console.log('callback1', ...args);
};

const callback2 = (...args) => {
  console.log('callback2', ...args);
};

Event.trigger('triggerFirst', 'before listen1', 'before listen value1');
Event.listen('triggerFirst', callback1);
Event.trigger('triggerFirst', 'before listen2', 'before listen value2');


Event.trigger('test', 'value1', 'value2');
Event.trigger('test1', 'value1', 'value2');

Event.listen('triggerFirst', callback2);
Event.listen('test', callback1);
Event.listen('test1', callback2);