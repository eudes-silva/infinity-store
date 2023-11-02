import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = useStorage(
    "favorites",
    [] as Array<{
      id: number;
      name: string;
      price: number;
      photo_url: string;
    }>
  );
  function toggleFavorite(item: {
    id: number;
    name: string;
    price: number;
    photo_url: string;
  }) {
    if (
      !favorites.value.some(
        (favoriteItem: {
          id?: number;
          name: string;
          price: number;
          photo_url: string;
        }) => favoriteItem.id === item.id
      )
    ) {
      favorites.value = [...favorites.value, item];
    } else {
      favorites.value = favorites.value.filter(
        (favoriteItem: {
          id?: number;
          name: string;
          price: number;
          photo_url: string;
        }) => favoriteItem.id !== item.id
      );
    }
  }

  function removeFavorite(id: number) {
    favorites.value = favorites.value.filter((favorite) => favorite.id !== id);
  }

  return { favorites, toggleFavorite, removeFavorite };
});
