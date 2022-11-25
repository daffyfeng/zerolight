/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import { ref } from "vue";

export const authStore = defineStore("auth", () => {
  const user = ref(null);

  function setUser(val: any) {
    user.value = val;
  }

  return { user, setUser };
});
