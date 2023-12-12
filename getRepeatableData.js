
class AttemptsLimitExceeded extends Error {
  constructor(){
    super('Max attempts limit exceed');
    this.name = 'AttemptsLimitExceeded';
  }
}

class NotFoundError extends Error {
  constructor(){
    super('Not found');
    this.name = 'NotFoundError';
  }
}

class TemporaryError extends Error {
  constructor(){
    super('TemporaryError');
    this.name = 'TemporaryError';
  }
}

function getRepeatableData(getData, key, maxRequestsNumber) {
  try {
    getData(key);
  } catch (e) {
    if (e.name === 'NotFoundError') {
      throw new NotFoundError();
    } else if (e.name === 'TemporaryError') {
      if (maxRequestsNumber === 1) {
        throw new AttemptsLimitExceeded();
      }
    }
  }

  if (maxRequestsNumber === undefined) {
    getRepeatableData(getData, key);
  }

  return maxRequestsNumber > 1 ? getRepeatableData(getData, key, maxRequestsNumber -1) : key;
}

const getData = (key) => 'hello' + key;
const res = getRepeatableData(getData, '1', 3); // 'hello1'