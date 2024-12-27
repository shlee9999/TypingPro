export const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear() % 2000;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
};

export const getFormattedTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
};

// 인덱스 랜덤 반환
export const getShuffledIndexArray = (inputArr) => {
  let arr = Array.from({ length: inputArr.length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const chunkArray = (array, chunkSize) => {
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export const getLevelInfo = (level) => {
  let columns = -1;
  let timeLimit = -1;
  switch (level) {
    case 1:
      columns = 3;
      timeLimit = 6;
      break;
    case 2:
      columns = 5;
      timeLimit = 6;
      break;
    case 3:
      columns = 6;
      timeLimit = 5;
      break;
    case 4:
      columns = 7;
      timeLimit = 5;
      break;
    case 5:
      columns = 8;
      timeLimit = 5;
      break;
    default:
      throw new Error('Level Missing');
  }
  return { columns, timeLimit, interval: timeLimit / columns };
};
