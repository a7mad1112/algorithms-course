const sizes = [
  500, 1000, 5000, 10000, 20000, 50000, 80000, 100000, 120000, 140000, 150000,
  200000,
];

const sortingAlgorithms = {
  'Bubble Sort': bubbleSortAlgo,
  'Selection Sort': SelectionSortAlgo,
  'Merge Sort': mergeSort,
  'Quick Sort': quickSort,
};

for (let size of sizes) {
  const data = generateTestData(size, 'random');
  console.log(`Problem size: ${size}`);
  for (let algoName in sortingAlgorithms) {
    const startTime = performance.now();
    if (algoName === 'Selection Sort') {
      sortingAlgorithms[algoName](data.slice(), (a, b) => a - b);
    } else if (algoName === 'Merge Sort') {
      sortingAlgorithms[algoName](data.slice());
    } else {
      sortingAlgorithms[algoName](data.slice());
    }
    const executionTime = performance.now() - startTime;
    console.log(`${algoName}: ${Math.floor(executionTime)}\n\n`);
  }
}

function generateTestData(size, scenario) {
  let testData = [];
  const generateRandomData = () => {
    for (let i = 0; i < size; i++) {
      testData.push(Math.floor(Math.random() * size));
    }
  };

  const generatePartiallySortedData = () => {
    for (let i = 0; i < size; i++) {
      testData.push(i);
    }
    const shuffleIndex = Math.floor(Math.random() * size);
    const temp = testData[shuffleIndex];
    testData[shuffleIndex] = testData[0];
    testData[0] = temp;
  };

  const generateReverseOrderData = () => {
    for (let i = size; i > 0; i--) {
      testData.push(i);
    }
  };

  switch (scenario) {
    case 'random':
      generateRandomData();
      break;
    case 'partially_sorted':
      generatePartiallySortedData();
      break;
    case 'reverse_order':
      generateReverseOrderData();
      break;
    default:
      console.error('not valid scenario');
  }
  return testData;
}

function swap(arr, firstIndex, secondIndex) {
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}
function bubbleSortAlgo(arraaytest) {
  let len = arraaytest.length,
    i,
    j,
    stop;
  for (i = 0; i < len; i++) {
    for (j = 0, stop = len - i; j < stop; j++) {
      if (arraaytest[j] > arraaytest[j + 1]) {
        swap(arraaytest, j, j + 1);
      }
    }
  }
  return arraaytest;
}

function SelectionSortAlgo(array, compare_Function) {
  function comp(a, b) {
    return a - b;
  }
  let min = 0;
  let index = 0;
  let temp = 0;
  compare_Function = compare_Function || comp;
  for (let i = 0; i < array.length; i += 1) {
    index = i;
    min = array[i];
    for (let j = i + 1; j < array.length; j += 1) {
      if (compare_Function(min, array[j]) > 0) {
        min = array[j];
        index = j;
      }
    }
    temp = array[i];
    array[i] = min;
    array[index] = temp;
  }
  return array;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  let sortedArr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  return [...sortedArr, ...left, ...right];
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
}
