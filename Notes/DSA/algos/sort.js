// Helper functions
const {swap} = require('./helpers');

// ArrayList 
module.exports = function ArrayList() {
  let array = [];

  const merge = (left, right) => {
    const result = [];
    let il = 0,
        ir = 0;

    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      }
      else {
        result.push(right[ir++]);
      }
    }

    while (il < left.length) {
      result.push(left[il++]);
    }

    while (ir < right.length) {
      result.push(right[ir++]);
    }

    return result;
  };

  const mergeSortRec = (array) => {
    const length = array.length;

    if (length === 1) {
      return array;
    }

    const mid = Math.floor(length / 2),
          left = array.slice(0, mid),
          right = array.slice(mid, length);

    return merge(mergeSortRec(left), mergeSortRec(right));
  };

  const partition = (array, left, right) => {
    let pivot = array[Math.floor((left + right) / 2)],
        i = left,
        j = right;

    while (i <= j) {
      while (array[i] < pivot) {
        i++;
      }
      while (array[j] > pivot) {
        j--;
      }
      if (i <= j) {
        swap(array, i, j);
        i++;
        j--;
      }
    }

    return i;
  };

  const quick = (array, left, right) => {
    let index;

    if (array.length > 1) {

      index = partition(array, left, right);

      if (left < index - 1) {
        quick(array, left, index - 1);
      }

      if (index < right) {
        quick(array, index, right);
      }
    }
  };

  this.insert = function(item) {
    array.push(item);
  };

  this.toString = function() {
    return array.join();
  };

  // Bubble sort -> O(n^2)
  this.bubbleSort = function() {
    const length = array.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1; j++) {
        if (array[j] > array[j + 1]) {
          swap(array, j, j + 1);
        }
      }
    }
  };

  this.improvedBubble = function() {
    const length = array.length;

    for (let i = 0; i < length; i++) {
      // Subtracting number of passes from inner loop allows for less comparisons
      // As each pass we sort one number, we need to sort one less number for each pass
      for (let j = 0; j < length - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          swap(array, j, j + 1);
        }
      }
    }
  };

  // Selection sort -> O(n^2)
  this.selectionSort = function() {
    let length = array.length,
        indexMin;

    for (let i = 0; i < length - 1; i++) {
      indexMin = i;

      for (let j = i; j < length; j++) {
        if (array[indexMin] > array[j]) {
          indexMin = j;
        }
      }

      if (i !== indexMin) {
        swap(array, i, indexMin);
      }
    }
  };

  // Insertion sort
  this.insertionSort = function() {
    let length = array.length,
        j, temp;

    for (let i = 1; i < length; i ++) {
      j = i;
      temp = array[i];

      while (j > 0 && array[j - 1] > temp) {
        array[j] = array[j - 1];
        j--;
      }

      array[j] = temp;
    }
  };

  // Merge sort -> O(n log n)
  this.mergeSort = function() {
    array = mergeSortRec(array);
  };

  // Quick sort -> O(n log n) 
  this.quickSort = function() {
    quick(array, 0, array.length - 1);
  };
}

