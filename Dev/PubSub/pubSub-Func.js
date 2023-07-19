let Event = (function () {
  let eventList = {},
    listen,
    trigger,
    remove

  listen = function (key, fn) {
    if (!eventList[key]) {
      eventList[key] = [];
    }
    eventList[key].push(fn)
  };

  trigger = function (key, ...args) {
    fns = eventList[key]
    if (!fns || fns.length === 0) {
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
      console.log('err');
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

Event.trigger('test', 'before listen', 'before listen');

Event.listen('test', callback1);
Event.listen('test1', callback2);

Event.trigger('test', 'value1', 'value2');
Event.trigger('test1', 'value1', 'value2');

Event.remove('test', callback1);
console.log('-------');
Event.trigger('test1', 'value3', 'value4');