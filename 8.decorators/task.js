// Задача 1

function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = md5(args);
    const objectInCache = cache.find(function (item) {
      return item.hash === hash;
    });

    if (objectInCache) {
      console.log('Из кеша: ' + objectInCache.value);
      return 'Из кеша: ' + objectInCache.value;
    }

    const result = func(...args);

    cache.push({
      hash: hash,
      value: result,
    });

    if (cache.length > 5) {
      cache.shift();
    }

    console.log('Вычисляем: ' + result);
    return 'Вычисляем: ' + result;
  }

  return wrapper;
}

// Задача 2

function debounceDecoratorNew(func, delay) {
  let timeoutId;
  let hasBeenCalled = false;

  function wrapper(...args) {
    wrapper.allCount++;

    if (!hasBeenCalled) {
      hasBeenCalled = true;
      func.apply(this, args);
      wrapper.count++;

      timeoutId = setTimeout(function () {
        timeoutId = null;
      }, delay);

      return;
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      func.apply(this, args);
      wrapper.count++;
      timeoutId = null;
    }.bind(this), delay);
  }

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
}