const { getUserInfo, getUsersIds } = db;

// function getUsersInfo(onLoad) {
//   const result = [];

//   function callBack(arr, fn) {
//     if (arr.length > 0) {
//       fn(arr[0], (userInfo) => {
//         result.push(userInfo);
//         callBack(arr.slice(1), getUserInfo);
//       });
//     } else {
//       onLoad(result);
//     }
//   }

//   getUsersIds((ids) => {
//     callBack(ids, getUserInfo);
//   });
// }

function getUsersInfo(onLoad) {
  getUsersIds((ids) => {
    const users = [...ids];
    let counter = 0;
    for (let id of ids) {
      getUserInfo(id, (info) => {
        let i = ids.indexOf(id);
        users[i] = info;
        counter++;
        if (counter === ids.length) {
          onLoad(users);
        }
      })
    }
  });
}