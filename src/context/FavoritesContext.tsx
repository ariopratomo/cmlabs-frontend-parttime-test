"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { FavoriteItem } from "@/types/favorites";

const STORAGE_KEY = "cmlabs_favorites";

type FavoritesContextValue = {
  favorites: FavoriteItem[];
  toggle: (item: FavoriteItem) => void;
  isFavorited: (id: string, type: FavoriteItem["type"]) => boolean;
  mounted: boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw) as FavoriteItem[]);
    } catch {}

    // cross-tab sync only
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        setFavorites(e.newValue ? (JSON.parse(e.newValue) as FavoriteItem[]) : []);
      } catch {}
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id && f.type === item.type);
      const next = exists
        ? prev.filter((f) => !(f.id === item.id && f.type === item.type))
        : [...prev, item];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFavorited = useCallback(
    (id: string, type: FavoriteItem["type"]) =>
      favorites.some((f) => f.id === id && f.type === type),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorited, mounted }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavoritesContext must be used inside FavoritesProvider");
  return ctx;
}
