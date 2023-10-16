import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoritesStore = defineStore(
  "favorites",
  () => {
    const favorites = ref([] as Array<{ id: string }>);
    function toggleFavorite(item: { id: string }) {
      if (
        !favorites.value.some(
          (favoriteItem: { id?: string }) => favoriteItem.id === item.id
        )
      ) {
        favorites.value = [...favorites.value, item];
      } else {
        favorites.value = favorites.value.filter(
          (favoriteItem: { id?: string }) => favoriteItem.id !== item.id
        );
      }
    }

    return { favorites, toggleFavorite };
  },
  {
    persist: true,
  }
);
