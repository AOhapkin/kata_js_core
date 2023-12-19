// const throttle = (fn, throttleTime) => {
//   let lastCall = 0;
//   let timeOut;

//   return function() {
//     const now = Date.now();
//     if (now - lastCall >= throttleTime) {
//       fn();
//       lastCall = now;
//     } else {
//       clearTimeout(timeOut);
//       timeOut = setTimeout(() => {
//         fn();
//         lastCall = now;
//       }, (throttleTime - now - lastCall));
//     }

//   };
// };

const throttle = (fn, throttleTime) => {
  let flag = true;

  return function () {
    if (flag) {
      fn.call(this, ...arguments);
      flag = false;
      setTimeout(() => (flag = true), throttleTime);
    }
  };
};

let counter = 0;
const fn = () => {
  counter++;
};

const throttledFn = throttle(fn, 500); // функция может быть вызвана не чаще, чем раз в 500 мс

const intervalId = setInterval(throttledFn, 100);
setTimeout(() => clearInterval(intervalId), 1000); // удаляем интервал через 10 вызовов

setTimeout(() => {console.log('counter: ', counter)}, 2100)
console.log(counter); // 3