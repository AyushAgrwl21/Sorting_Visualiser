export function getMergeSortAnimations(array) {
    const animationsMS = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animationsMS);
    return animationsMS;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animationsMS,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animationsMS);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animationsMS);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animationsMS);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animationsMS,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animationsMS.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animationsMS.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animationsMS.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animationsMS.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animationsMS.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animationsMS.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animationsMS.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animationsMS.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animationsMS.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animationsMS.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }