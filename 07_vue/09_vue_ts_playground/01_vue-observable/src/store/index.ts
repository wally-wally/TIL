import Vue from "vue";
import { number } from "@/utils/number";

// state
const state = Vue.observable({
  value: 1,
});

// mutations
const mutations = {
  addValue(): void {
    const addValue = state.value + 1;

    if (!number.validNumber(addValue, 1, 1000)) {
      return;
    }

    state.value = addValue;
  },

  subtractValue(): void {
    const subtractValue = state.value - 1;

    if (!number.validNumber(subtractValue, 1, 1000)) {
      return;
    }

    state.value = subtractValue;
  },

  multipleValue(): void {
    const multipleValue = state.value * 2;

    if (!number.validNumber(multipleValue, 1, 1000)) {
      return;
    }

    state.value = multipleValue;
  },

  changeValue(value: number): void {
    if (!number.validNumber(value, 1, 1000)) {
      return;
    }

    state.value = value;
  },
};

export { mutations };

export default state;
