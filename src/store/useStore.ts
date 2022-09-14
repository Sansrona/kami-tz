import { defineStore } from "pinia";
import { Product } from "@/composables/types";

export const useStore = defineStore("main", {
  state: () => ({
    items: [] as Product[],
  }),
  getters: {
    getPrice: (state) => {
      return (itemId: number) => {
        const myItem = state.items.find((item) => item.key === itemId);
        if (myItem?.price) {
          return Math.max(...myItem?.price);
        }
      };
    },
    getItem: (state) => {
      return (itemId: number) => {
        return state.items.find((item) => item.key === +itemId);
      };
    },
  },
  actions: {
    addItem(newItem: Product): void {
      this.items.push(newItem);
    },
    removeItem(key: number) {
      this.items = this.items.filter((item) => item.key !== key);
    },
    updateItem(itemId: number | undefined, newItem: Product) {
      const myIndex = this.items.findIndex((item) => item.key === itemId);
      this.items[myIndex] = newItem;
         
    },
  },
});
