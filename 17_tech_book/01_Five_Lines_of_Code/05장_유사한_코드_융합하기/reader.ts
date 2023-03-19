class Cacher<T> {
  private data: T;
  constructor(private mutator: () => T) {
    this.data = this.mutator();
  }
  get() {
    return this.data;
  }
  next() {
    this.data = this.mutator();
  }
}

class Reader {
  private data: string[];
  private current: number;
  nextLine() {
    this.current ++;
  }
  readLine() {
    return this.data[this.current] || null;
  }
}

// let br = new Reader();
// for (;br.readLine() !== null; br.nextLine()) {
//   let line = br.readLine();
//   console.log(line);
// }

let tmpBr = new Reader();
let br = new Cacher(() => tmpBr.readLine());
for (; br.get() !== null; br.next()) {
  let line = br.get();
  console.log(line);
}