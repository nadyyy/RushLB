import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Review } from "@/data/activities";

type AppContextValue = {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  isWished: (id: number) => boolean;
  recentlyViewed: number[];
  addRecent: (id: number) => void;
  extraReviews: Record<number, Review[]>;
  addReview: (activityId: number, review: Review) => void;
  appReviews: Review[];
  addAppReview: (review: Review) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = "lebanon-rush-state-v1";

type Persisted = {
  wishlist: number[];
  recentlyViewed: number[];
  extraReviews: Record<number, Review[]>;
  appReviews: Review[];
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => {
    if (typeof window === "undefined") return { wishlist: [], recentlyViewed: [], extraReviews: {}, appReviews: [] };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { wishlist: [], recentlyViewed: [], extraReviews: {}, appReviews: [] };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const toggleWishlist = useCallback((id: number) => {
    setState((s) => ({
      ...s,
      wishlist: s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id],
    }));
  }, []);

  const isWished = useCallback((id: number) => state.wishlist.includes(id), [state.wishlist]);

  const addRecent = useCallback((id: number) => {
    setState((s) => ({
      ...s,
      recentlyViewed: [id, ...s.recentlyViewed.filter((x) => x !== id)].slice(0, 8),
    }));
  }, []);

  const addReview = useCallback((activityId: number, review: Review) => {
    setState((s) => ({
      ...s,
      extraReviews: { ...s.extraReviews, [activityId]: [review, ...(s.extraReviews[activityId] ?? [])] },
    }));
  }, []);

  const addAppReview = useCallback((review: Review) => {
    setState((s) => ({ ...s, appReviews: [review, ...s.appReviews] }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        wishlist: state.wishlist,
        toggleWishlist,
        isWished,
        recentlyViewed: state.recentlyViewed,
        addRecent,
        extraReviews: state.extraReviews,
        addReview,
        appReviews: state.appReviews,
        addAppReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
