/* eslint-disable prettier/prettier */
import { reactive } from "vue";

export const common = reactive({
  browserTransformRate: 1,
  setBrowserTransformRate(val: number) {
    this.browserTransformRate = val;
  },
});
