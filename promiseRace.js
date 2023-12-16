
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(item => {
      item.then((data) => {
        resolve(item);
      }).catch(e => {
        reject(e);
      });
    });
  });
}

const firstPromise = new Promise((resolve) =>
  setTimeout(() => resolve(300), 300)
);

const secondPromise = new Promise((resolve) =>
  setTimeout(() => resolve(200), 200)
);

const thirdPromise = new Promise((resolve) =>
  setTimeout(() => resolve(100), 100)
);

let result = promiseRace([firstPromise, secondPromise, thirdPromise]); // 100

console.clear()
console.log(result)