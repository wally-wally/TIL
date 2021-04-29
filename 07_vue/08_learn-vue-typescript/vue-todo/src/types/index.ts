/* eslint-disable @typescript-eslint/no-namespace */
export namespace VueEvent {
  export interface Input<T extends EventTarget> extends InputEvent {
    target: T;
  }

  export interface Keyboard<T extends EventTarget> extends KeyboardEvent {
    target: T;
  }

  export interface Mouse<T extends EventTarget> extends MouseEvent {
    target: T;
  }
}
