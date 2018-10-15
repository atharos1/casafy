qSort = function (data, comparator) {
    qSortRec(data, comparator, 0, data.length - 1);
}

qSortRec = function (data, comparator, minIndex, maxIndex) {
    if (maxIndex - minIndex <= 0) return;
    let pivotIndex = generateRandomPivot(minIndex, maxIndex);
    let k = minIndex;
    swap(data, k, pivotIndex);
    for (let i = minIndex + 1; i <= maxIndex; i++) {
        if (comparator(data[i], data[minIndex]) <= 0) {
            swap(data, k + 1, i);
            k = k + 1;
        }
    }
    swap(data, k, minIndex);
    qSortRec(data, comparator, minIndex, k - 1);
    qSortRec(data, comparator, k + 1, maxIndex);
}

generateRandomPivot = function (minIndex, maxIndex) {
    let retValue = Math.random() * (maxIndex - minIndex + 1) + minIndex;
    return Math.floor(retValue);
}

swap = function (data, i, j) {
    let aux = data[i];
    data[i] = data[j];
    data[j] = aux;
}

compareElements = function(element1, element2) {
  let element1meta = JSON.parse(element1["meta"]);
  let element2meta = JSON.parse(element2["meta"]);
  let element1IsFavorite = element1meta["isFavorite"];
  let element2IsFavorite = element2meta["isFavorite"];
  if ((element1IsFavorite && element2IsFavorite) || (!element1IsFavorite && !element2IsFavorite)) {
    return function(a, b) {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() === b.toLowerCase()) return 0;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
    }(element1["name"], element2["name"]);
  }
  if (element1IsFavorite) return -1;
  if (element2IsFavorite) return 1;
}
