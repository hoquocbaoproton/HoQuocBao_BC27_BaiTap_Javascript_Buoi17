// DOM FUNCTIONAL
var inputIntBtn = document.querySelector('.inputInt-btn');
var inputRealBtn = document.querySelector('.inputReal-btn');
var inputDataView = document.getElementById('inputDataView');
var exportDataView = document.getElementById('exportDataView');

// DOM DATA
var inputIntNum = document.getElementById('inputIntNum');
var inputRealNum = document.getElementById('inputRealNum');

// find.addEventListener('click', function () {
//   console.log(123);
// });

// INITIAL
var intNums = [];
var realNums = [];
var nums = [];

var dataHandler = function () {
  // initialization
  var sumPosIntBtn = document.getElementById('sumPosInt');
  var find = document.getElementById('findBtn');

  var countIntBtn = document.getElementById('countInt');
  var swapBtn = document.getElementById('swapBtn');
  var sortBtn = document.getElementById('sortBtn');
  var compareBtn = document.getElementById('compareBtn');

  // guard clause
  if (inputIntNum.value === '') return;
  // --> nếu người dùng KHÔNG NHẬP, return ngay lập tức thay vì nhập vào giá trị 0

  //handler
  intNums.push(+inputIntNum.value);

  // render
  inputDataView.querySelector(
    '.intNum'
  ).innerHTML = `Mảng số nguyên đã nhập: [${intNums.join(', ')}]`;

  sumPosIntBtn.addEventListener('click', sumPosIntNums);
  countIntBtn.addEventListener('click', countPosIntNums);
  find.addEventListener('click', findFeatures);
  swapBtn.addEventListener('click', swapTwoNums);
  sortBtn.addEventListener('click', sortAscendant);
  inputRealBtn.addEventListener('click', dataRealHandler);
  compareBtn.addEventListener('click', comparePosNe);

  // clear input
  clearIntInput();
};

var dataRealHandler = function () {
  if (inputRealNum.value === '') return;
  var find = document.getElementById('findBtn');

  realNums.push(+inputRealNum.value);

  inputDataView.querySelector(
    '.realNum'
  ).innerHTML = `Mảng số thực đã nhập: [${realNums.join(', ')}]`;

  find.addEventListener('click', findFeatures);

  inputRealNum.value = '';
  inputRealNum.focus();
};

var clearIntInput = function () {
  inputIntNum.value = '';
  inputIntNum.focus();
};

///////////////
// _____________________
// FEATURES

// 1) sum positive integral numbers
var sumPosIntNums = function () {
  var sumNums = 0;
  // for (var i = 0; i < intNums.length; i++) {
  //   if (intNums[i] >= 0) {
  //     sumNums += intNums[i];
  //   }
  // }
  intNums.forEach(num => {
    if (num >= 0) sumNums += num;
  }); // can use reduce method
  exportDataView.innerHTML += `<p>Tổng các số nguyên dương: ${sumNums}</p>`;
};

// 2) count how many integral number
var countPosIntNums = function () {
  var count = 0;
  for (var i = 0; i < intNums.length; i++) {
    if (intNums[i] >= 0) {
      count++;
    }
  }
  exportDataView.insertAdjacentHTML(
    'beforeend',
    `<p>Số lượng số dương trong mảng số nguyên: ${count} số dương</p>`
  );
};

// FIND
var findFeatures = function () {
  var findFeatureValue = document.getElementById('findFeatures').value;
  switch (findFeatureValue) {
    case 'smallest':
      findSmallestNum();
      break;
    case 'smallestPos':
      findSmallestPosNum();
      break;
    case 'lastEvenNum':
      findLastEvenNum();
      break;
    case 'firstPrimeNum':
      findFirstPrime();
      break;
    case 'howManyInt':
      findInt();
    default:
      return;
  }
};

// 3) find smallest number
var findSmallestNum = function () {
  var smallest = intNums[0];
  for (var i = 1; i < intNums.length; i++) {
    if (intNums[i] < smallest) smallest = intNums[i];
  }
  // can use Math.min

  exportDataView.innerHTML += `<p> Số nhỏ nhất trong mảng là: ${smallest}</p>`;
};

// 4) find smallest positive number
var findSmallestPosNum = function () {
  // mình có thể dùng forEach hoặc vòng for, nhưng vì ở trên (line 56 - 61) đã có rồi nên mình tập sử dụng filter
  var posNums = intNums.filter(num => num >= 0);
  var smallest = posNums[0];
  for (var i = 1; i < posNums.length; i++) {
    if (posNums[i] < smallest) smallest = posNums[i];
  }
  // var smallest = Math.min(...posNums)

  if (posNums.length === 0) {
    exportDataView.innerHTML = 'Mảng không có số dương';
  } else {
    exportDataView.innerHTML += `<p> Số dương nhỏ nhất trong mảng là: ${smallest}</p>`;
  }
};

// 5) find the last even number
var findLastEvenNum = function () {
  var evenNums = intNums.filter(num => num % 2 === 0);
  if (evenNums.length === 0) {
    exportDataView.innerHTML += `<p>Không có số chẵn</p>`;
    return -1;
  } else {
    exportDataView.innerHTML += `<p> Số chẵn cuối cùng trong mảng là: ${
      evenNums[evenNums.length - 1]
    }</p>`;
  }
};

// 6) swap two number
var swapTwoNums = function () {
  // DOM DATA
  var posi1 = +document.querySelector('.posi1').value;
  var posi2 = +document.querySelector('.posi2').value;

  // guard clause
  if (posi1 === 0 || posi2 === 0) return;

  // swap
  var swappedNums = intNums.slice();

  var swapA = swappedNums[posi1 - 1];
  var swapB = swappedNums[posi2 - 1];
  swappedNums[posi1 - 1] = swapB;
  swappedNums[posi2 - 1] = swapA;

  //render
  exportDataView.innerHTML += `<p>Mảng đã hoán đổi vị trí: [${swappedNums.join(
    ', '
  )}]</p>`;

  document.querySelector('.posi1').value = '';
  document.querySelector('.posi2').value = '';
};

// 7) Sort ascendance
var sortAscendant = function () {
  var compareAs = function (a, b) {
    return a - b;
  };

  intNums.sort(compareAs);
  exportDataView.innerHTML += `<p>Mảng đã sắp xếp: [${intNums.join(', ')}]</p>`;
};

// 8) find first Prime number
var findFirstPrime = function () {
  function checkPrime(number) {
    if (number <= 1) {
      return false;
    } else {
      for (let i = 2; i < number; i++) {
        if (number % i == 0) {
          return false;
        }
      }
      return true;
    }
  }

  for (var i = 0; i < intNums.length; i++) {
    var isPrime = checkPrime(intNums[i]);
    if (isPrime) {
      exportDataView.innerHTML += `<p>Số nguyên tố đầu tiên trong mảng: ${intNums[i]}</p>`;
      break;
    }
  }
};

// 9) how many int in real numbers array
var findInt = function () {
  var newIntNums = realNums.filter(num => Number.isInteger(num));

  if (newIntNums.length === 0) {
    exportDataView.innerHTML += `<p>Không tìm thấy mảng số nguyên</p>`;
  } else {
    exportDataView.innerHTML += `<p>Mảng số nguyên tìm được là: [${newIntNums.join(
      ', '
    )}]</p>`;
  }
};

// 10) compare positive and negative numbers
var comparePosNe = function () {
  var posNums = [];
  var neNums = [];

  for (var i = 0; i < intNums.length; i++) {
    if (intNums[i] >= 0) {
      posNums.push(intNums[i]);
    } else {
      neNums.push(intNums[i]);
    }
  }

  console.log(posNums, neNums);

  if (posNums.length < neNums.length) {
    exportDataView.innerHTML += `<p>Dương < âm</p>`;
  } else if (posNums.length > neNums.length) {
    exportDataView.innerHTML += `<p>Dương > âm</p>`;
  } else {
    exportDataView.innerHTML += `<p>Dương = âm</p>`;
  }
};

// //////
inputIntBtn.addEventListener('click', dataHandler);
inputRealBtn.addEventListener('click', dataRealHandler);

// test case
const sammpel = [22, 22, 33, 13, -4, -5, -6, -5];
const sample = [7654, 3, 125, 7];

const realnumsss = [1.2, 42, 5, 5.234, -123, -12.2, 94.5];
