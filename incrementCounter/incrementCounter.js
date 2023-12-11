// В localStorage по ключу "counters" находится JSON c объектом, 
// полями которого являются имена счётчиков, 
// а значениями - числовое значение счётчика. 
// Напишите функцию incrementCounter, которой на вход первым параметром 
// передаётся counterName - имя счётчика.

// Задача функцции увеличить значение счётчика counterName на 1 
// и обновить данные в localStorage. 
// В localStorage может находится невалидный JSON, 
// чтение которого может првести к ошибке, 
// в этом случае функция должна записывать новые данные, 
// где у указанного счетчика будет значение 1. 
// В конце функция должна возвращать значение счетчика после инкремента.

// Пример использования:

// // в localStorage 1 счетчик: bannerClick = 5
// incrementCounter('bannerClick'); // 6
// incrementCounter('bannerClose'); // 1
// // в localStorage 2 счетчика: bannerClick = 6, bannerClose = 1
// Про работу с localStorage читаем тут: https://learn.javascript.ru/localstorage

function incrementCounter(counterName){
  let countersObj;

  try {
    const localCounters = localStorage.getItem('counters');
    countersObj = JSON.parse(localCounters);
    if (countersObj[counterName]) {
      countersObj[counterName] += 1;
    } else {
      countersObj[counterName] = 1;
    }
    localStorage.removeItem('counters');
    localStorage.setItem('counters', JSON.stringify(countersObj));
  } catch (e) {
    countersObj = {};
    countersObj[counterName] = 1;
    localStorage.removeItem('counters');
    localStorage.setItem('counters', JSON.stringify(countersObj));
  }

  return countersObj[counterName];
}

;
console.log(incrementCounter("bannerClick"))

