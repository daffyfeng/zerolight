import { defineStore } from "pinia";
import { ref } from "vue";

export const groupStore = defineStore("group", {
  state: () => {
    return {
      groups: [] as any[],
      banners: [] as any[],
      tags: [] as any[],
    };
  },
  getters: {},
  actions: {
    setGroups(val: any[]) {
      this.groups = val;
    },
    setBanners(val: any[]) {
      this.banners = val;
    },
    setTags(val: any[]) {
      this.tags = val;
    },
  },
});
