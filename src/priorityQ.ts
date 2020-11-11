interface PQinterface<T> {
  id: string;
  isGreaterThan: (a: T) => boolean;
}

const left = (n: number): number => n * 2 + 1;
const right = (n: number): number => n * 2 + 2;
const parent = (n: number): number => Math.floor((n - 1) / 2);

type KeyMap = { [key: string]: number };

export default class PriorityQ<T extends PQinterface<T>> {
  constructor(
    public data: T[] = [],
    public size: number = 0,
    private keyMap: KeyMap = {}
  ) {}

  private swap(i: number, j: number) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    this.keyMap[this.data[i].id] = j;
    this.keyMap[this.data[j].id] = i;
  }

  pop(): T | undefined {
    if (this.size == 0) {
      return undefined;
    }
    const res = this.data[0];
    delete this.keyMap[res.id];
    this.data[0] = this.data[--this.size];
    this.keyMap[this.data[0].id] = 0;

    var n = 0;
    while (left(n) < this.size) {
      if (
        right(n) >= this.size ||
        this.data[left(n)].isGreaterThan(this.data[right(n)])
      ) {
        if (this.data[left(n)].isGreaterThan(this.data[n])) {
          this.swap(left(n), n);
          n = left(n);
        } else {
          break;
        }
      } else {
        if (this.data[right(n)].isGreaterThan(this.data[n])) {
          this.swap(right(n), n);
          n = right(n);
        } else {
          break;
        }
      }
    }
    return res;
  }

  push(val: T) {
    this.data[this.size] = val;
    this.keyMap[val.id] = this.size++;

    var n = this.size - 1;
    while (n > 0 && this.data[n].isGreaterThan(this.data[parent(n)])) {
      this.swap(n, parent(n));
      n = parent(n);
    }
  }
}
