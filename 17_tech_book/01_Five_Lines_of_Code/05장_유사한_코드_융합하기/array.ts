// before
// class ArrayMinimum {
//   constructor(private accumulator: number) {}

//   process(arr: number[]) {
//     for (let i = 0; i < arr.length; i += 1) {
//       if (this.accumulator > arr[i]) {
//         this.accumulator = arr[i];
//       }
//     }
    
//     return this.accumulator;
//   }
// }

// class ArraySum {
//   constructor(private accumulator: number) {}

//   process(arr: number[]) {
//     for (let i = 0; i < arr.length; i += 1) {
//       this.accumulator += arr[i];
//     }
    
//     return this.accumulator;
//   }
// }

// after
class ArrayMinimum {
  private processor: MinimumProcessor;
  constructor(accumulator: number) {
    this.processor = new MinimumProcessor(accumulator);
  }

  process(arr: number[]) {
    for (let i = 0; i < arr.length; i += 1) {
      this.processor.processElement(arr[i]);
    }
    
    return this.processor.getAccmulator();
  }
}

class ArraySum {
  private processor: SumProcessor;
  constructor(accumulator: number) {
    this.processor = new SumProcessor(accumulator);
  }

  process(arr: number[]) {
    for (let i = 0; i < arr.length; i += 1) {
      this.processor.processElement(arr[i]);
    }
    
    return this.processor.getAccmulator();
  }
}

class BatchProcessor {
  constructor(private processor: ElementProcessor) {}
  process(arr: number[]) {
    for (let i = 0; i < arr.length; i += 1) {
      this.processor.processElement(arr[i]);
    }
    return this.processor.getAccmulator();
  }
}

interface ElementProcessor {
  processElement(e: number): void;
  getAccmulator(): number;
}

class MinimumProcessor implements ElementProcessor {
  constructor(private accmulator: number) {}
  getAccmulator() {
    return this.accmulator;
  }
  processElement(e: number) {
    if (this.accmulator > e) {
      this.accmulator = e;
    }
  }
}

class SumProcessor implements ElementProcessor {
  constructor(private accmulator: number) {}
  getAccmulator() {
    return this.accmulator;
  }
  processElement(e: number) {
    if (this.accmulator > e) {
      this.accmulator += e;
    }
  }
}