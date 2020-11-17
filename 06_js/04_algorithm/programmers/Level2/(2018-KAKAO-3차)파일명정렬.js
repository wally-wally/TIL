function solution(files) {
  let fileInfo = [];
  let numberReg = /(\d+)/g;
  for (let i = 0; i < files.length; i++) {
    let splitFileName = files[i].split(numberReg);
    fileInfo.push({
      head: splitFileName[0].toLowerCase(),
      number: Number(splitFileName[1]),
      fileIndex: i
    });
  }
  let sortedFiles = fileInfo.sort((a, b) => {
    if (a.head < b.head) {
      return -1;
    } else if (a.head > b.head) {
      return 1;
    } else {
      if (a.number < b.number) {
        return -1;
      } else if (a.number > b.number) {
        return 1;
      } else {
        return a.fileIndex < b.fileIndex ? -1 : 1;
      }
    }
  })
  return sortedFiles.map(info => files[info.fileIndex]);
}

console.log(solution([
  'img12.png',
  'img10.png',
  'img02.png',
  'img1.png',
  'IMG01.GIF',
  'img2.JPG']));
console.log(solution([
  'F-5 Freedom Fighter',
  'B-50 Superfortress',
  'A-10 Thunderbolt II',
  'F-14 Tomcat']));