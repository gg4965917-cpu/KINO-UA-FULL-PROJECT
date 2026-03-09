import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Movie {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  rating: number;
  year: number;
  duration: string;
  genre: string[];
  backdrop?: string;
  poster?: string;
  director?: string;
  cast?: string[];
  hasVoiceover: boolean;
  trailer?: string;
  viewCount?: number;
  isTrending?: boolean;
}

interface MovieStore {
  // Favorites
  favorites: number[];
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;

  // Watch History
  watchHistory: number[];
  addToHistory: (id: number) => void;
  clearHistory: () => void;

  // Filters
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  sortBy: 'rating' | 'year' | 'title' | 'trending';
  setSortBy: (sort: 'rating' | 'year' | 'title' | 'trending') => void;
  voiceoverOnly: boolean;
  toggleVoiceoverOnly: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // UI State
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;

  // Notifications
  notifications: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;

  // Continue Watching
  continueWatching: Array<{ movieId: number; progress: number; timestamp: number }>;
  updateProgress: (movieId: number, progress: number) => void;
  
  // Reset
  resetFilters: () => void;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      // Favorites
      favorites: [],
      addToFavorites: (id) => set((state) => ({ 
        favorites: [...state.favorites, id] 
      })),
      removeFromFavorites: (id) => set((state) => ({ 
        favorites: state.favorites.filter(fav => fav !== id) 
      })),
      toggleFavorite: (id) => {
        const state = get();
        if (state.favorites.includes(id)) {
          state.removeFromFavorites(id);
          state.addNotification('Видалено з обраного', 'info');
        } else {
          state.addToFavorites(id);
          state.addNotification('Додано до обраного ❤️', 'success');
        }
      },
      isFavorite: (id) => get().favorites.includes(id),

      // Watch History
      watchHistory: [],
      addToHistory: (id) => set((state) => {
        const newHistory = [id, ...state.watchHistory.filter(h => h !== id)].slice(0, 20);
        return { watchHistory: newHistory };
      }),
      clearHistory: () => set({ watchHistory: [] }),

      // Filters
      selectedGenre: 'all',
      setSelectedGenre: (genre) => set({ selectedGenre: genre }),
      sortBy: 'rating',
      setSortBy: (sort) => set({ sortBy: sort }),
      voiceoverOnly: true,
      toggleVoiceoverOnly: () => set((state) => ({ voiceoverOnly: !state.voiceoverOnly })),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // UI State
      activeCategory: 'Головна',
      setActiveCategory: (category) => set({ activeCategory: category }),
      selectedMovie: null,
      setSelectedMovie: (movie) => set({ selectedMovie: movie }),
      isPlaying: false,
      setIsPlaying: (playing) => set({ isPlaying: playing }),

      // Notifications
      notifications: [],
      addNotification: (message, type) => {
        const id = Date.now().toString();
        set((state) => ({
          notifications: [...state.notifications, { id, message, type }]
        }));
        // Auto-remove after 3 seconds
        setTimeout(() => {
          get().removeNotification(id);
        }, 3000);
      },
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),

      // Continue Watching
      continueWatching: [],
      updateProgress: (movieId, progress) => set((state) => {
        const existing = state.continueWatching.findIndex(cw => cw.movieId === movieId);
        if (existing !== -1) {
          const updated = [...state.continueWatching];
          updated[existing] = { movieId, progress, timestamp: Date.now() };
          return { continueWatching: updated };
        }
        return {
          continueWatching: [
            ...state.continueWatching,
            { movieId, progress, timestamp: Date.now() }
          ].slice(0, 10)
        };
      }),

      // Reset
      resetFilters: () => set({
        selectedGenre: 'all',
        sortBy: 'rating',
        voiceoverOnly: true,
        searchQuery: ''
      }),
    }),
    {
      name: 'kino-ua-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        watchHistory: state.watchHistory,
        continueWatching: state.continueWatching,
        voiceoverOnly: state.voiceoverOnly,
      }),
    }
  )
);
