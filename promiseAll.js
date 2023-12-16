// function promiseAll(promises) {
//   const results = [];
//   let counter = 0;
//   return new Promise((resolve, reject) => {

//     promises.forEach((promise, i) => {
//       Promise.resolve(promise).then(result => {
//         results[i] = result;
//         counter++;
//         if (counter === promises.length) {
//           resolve(results);
//         }
//       }).catch(e => {
//         reject(e);
//       });
//     });
//     resolve(results);
//   });
// }

function promiseAll(promises) {
  const resolvedPromiseResult=[];
  let resolvedPromiseCount=0;
  return new Promise((resolve,reject)=>{
    if (promises.length === 0) {
      resolve([]);
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((response)=>{
          resolvedPromiseResult[index]=response;
          resolvedPromiseCount+=1;
          if(resolvedPromiseCount===promises.length){
            resolve(resolvedPromiseResult)
          }
        }).catch((err)=>{
          reject(err)
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

promiseAll([firstPromise, secondPromise, thirdPromise])
  .then(console.log); // [300, 200, 100]

promiseAll([])
  .then(console.log);