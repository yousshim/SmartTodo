export default class PriorityQ {
  constructor(
    private data: number[] = [],
    public size: number = 0 // private reverseIndex: number[] = []
  ) {}

  private left(n: number): number {
    // return the index of the left child of the node at index n
    const leftChildIdx = n * 2 + 1;
    return leftChildIdx;
  }

  private right(n: number): number {
    // return the index of the right child of the node at index n
    const rightChildIdx = n * 2 + 2;
    return rightChildIdx;
  }

  private parent(n: number): number {
    // return the index of the parent of the node at index n
    const parentIdx = Math.floor((n - 1) / 2);
    return parentIdx;
  }

  pop(): number | undefined {
    // pop the top element of the heap
    const res = this.data[0];
    this.size -= 1;
    const last = this.data.pop();
    if (this.size == 0 || last === undefined) {
      return res;
    }
    this.data[0] = last;
    // Heapify
    var n = 0;
    var maxIdx = n;
    if (this.size > this.left(n) && this.size > this.right(n)) {
      maxIdx =
        this.data[this.left(n)] > this.data[this.right(n)]
          ? this.left(n)
          : this.right(n);
    } else if (this.size >= this.left(n)) {
      maxIdx = this.left(n);
    } else if (this.size >= this.right(n)) {
      maxIdx = this.right(n);
    }
    while (this.data[maxIdx] > this.data[n] && maxIdx >= 0) {
      [this.data[n], this.data[maxIdx]] = [this.data[maxIdx], this.data[n]];
      n = maxIdx;

      var maxIdx =
        this.data[this.left(n)] > this.data[this.right(n)]
          ? this.left(n)
          : this.right(n);
    }
    return res;
  }

  push(value: number) {
    // push a new element to the heap
    this.size += 1;
    this.data.push(value);
    // Heapify
    var n = this.size - 1;
    var pIdx = this.parent(n);
    while (this.data[n] > this.data[pIdx] && pIdx >= 0) {
      [this.data[n], this.data[pIdx]] = [this.data[pIdx], this.data[n]];
      n = pIdx;
      pIdx = this.parent(n);
    }
  }

  //   reduce(id: number) {
  //     throw new Error("Not Implimented");
  //   }
}
