'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Search, Film, Tv, Star, Play, Info, ChevronLeft, ChevronRight, 
  TrendingUp, X, Heart, Filter, SlidersHorizontal, Clock, 
  Calendar, Volume2, VolumeX, Share2, ChevronDown, Menu, Sparkles
} from 'lucide-react';
import { useMovieStore } from '@/lib/store';
import { moviesData, genres } from '@/lib/movies';
import { MovieCardSkeleton, GridSkeleton } from '@/components/Skeleton';

export default function HomePage() {
  // Global state from Zustand
  const {
    favorites,
    toggleFavorite,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    voiceoverOnly,
    toggleVoiceoverOnly,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    selectedMovie,
    setSelectedMovie,
    isPlaying,
    setIsPlaying,
    addToHistory,
    resetFilters,
  } = useMovieStore();

  // Local state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);

  // Hero movies (top 3)
  const heroMovies = moviesData.filter(m => m.isTrending).slice(0, 3);
  const currentHero = heroMovies[currentSlide] || heroMovies[0];

  // Categories
  const categories = [
    { name: 'Головна', icon: Film },
    { name: 'Фільми', icon: Film },
    { name: 'Популярне', icon: TrendingUp },
    { name: 'Мій список', icon: Heart }
  ];

  // Filtered and sorted movies
  const filteredMovies = useMemo(() => {
    let filtered = [...moviesData];

    // Voice-over filter
    if (voiceoverOnly) {
      filtered = filtered.filter(m => m.hasVoiceover);
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(m => m.genre.includes(selectedGenre));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.titleEn.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
      );
    }

    // Favorites filter
    if (activeCategory === 'Мій список') {
      filtered = filtered.filter(m => favorites.includes(m.id));
    }

    // Trending filter
    if (activeCategory === 'Популярне') {
      filtered = filtered.filter(m => m.isTrending);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'trending':
          return (b.viewCount || 0) - (a.viewCount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [moviesData, voiceoverOnly, selectedGenre, searchQuery, sortBy, favorites, activeCategory]);

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return moviesData
      .filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroMovies.length]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Navigation functions
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroMovies.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);

  const handleMovieClick = (movie: typeof moviesData[0]) => {
    setSelectedMovie(movie);
    addToHistory(movie.id);
  };

  const handlePlayClick = (movie: typeof moviesData[0]) => {
    setSelectedMovie(movie);
    setIsPlaying(true);
    addToHistory(movie.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-gradient-to-br from-kino-yellow-400 via-kino-yellow-500 to-kino-yellow-600 p-3 rounded-lg animate-pulse">
              <Film className="w-8 h-8 text-black" strokeWidth={2.5} />
            </div>
          </div>
          <div className="text-xl font-bold text-white animate-pulse">Завантаження КІНО.UA...</div>
          <div className="flex justify-center space-x-2">
            {[0, 150, 300].map((delay) => (
              <div 
                key={delay}
                className="w-2 h-2 bg-kino-yellow-400 rounded-full animate-bounce" 
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-lg shadow-2xl border-b border-gray-800' : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4 md:space-x-8">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="bg-gradient-to-br from-kino-yellow-400 via-kino-yellow-500 to-kino-yellow-600 p-1.5 md:p-2 rounded-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-kino-yellow-500/50">
                  <Film className="w-5 h-5 md:w-6 md:h-6 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-xl md:text-2xl font-black font-bebas tracking-tight gradient-text">
                  КІНО.UA
                </span>
              </div>

              {/* Desktop Categories */}
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setActiveCategory(cat.name);
                        resetFilters();
                      }}
                      className={`flex items-center space-x-1.5 text-sm font-semibold transition-all duration-200 group relative ${
                        activeCategory === cat.name ? 'text-kino-yellow-400' : 'text-gray-300 hover:text-kino-yellow-400'
                      }`}
                    >
                      <Icon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>{cat.name}</span>
                      {activeCategory === cat.name && (
                        <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-kino-yellow-400 animate-scaleIn" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <div className={`flex items-center bg-white/10 backdrop-blur-md rounded-full px-3 md:px-4 py-1.5 md:py-2 transition-all duration-300 border ${
                  isSearchFocused 
                    ? 'bg-white/20 border-kino-yellow-400/50 w-48 md:w-80 shadow-lg shadow-kino-yellow-500/20' 
                    : 'border-white/20 w-32 md:w-64'
                }`}>
                  <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Пошук фільмів..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    className="bg-transparent outline-none text-white placeholder-gray-400 w-full text-xs md:text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Live Search Results */}
                {searchQuery && isSearchFocused && searchSuggestions.length > 0 && (
                  <div className="absolute top-full mt-2 w-full md:w-96 bg-gray-900/98 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl overflow-hidden animate-fadeIn z-50">
                    <div className="p-3 text-xs text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-800 flex items-center space-x-2">
                      <Sparkles className="w-3 h-3" />
                      <span>Результати пошуку</span>
                    </div>
                    {searchSuggestions.map(movie => (
                      <div
                        key={movie.id}
                        onClick={() => {
                          handleMovieClick(movie);
                          setSearchQuery('');
                        }}
                        className="p-3 hover:bg-gray-800/50 cursor-pointer transition-all flex items-center space-x-3 group"
                      >
                        <div 
                          className="w-12 h-16 rounded bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-transform"
                          style={{ background: movie.poster || movie.backdrop }}
                        >
                          <Film className="w-6 h-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white group-hover:text-kino-yellow-400 transition-colors">{movie.title}</div>
                          <div className="text-xs text-gray-400">{movie.year} • {movie.genre[0]}</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-kino-yellow-400 fill-kino-yellow-400" />
                          <span className="text-sm font-bold text-kino-yellow-400">{movie.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-2 border-t border-gray-800 pt-4 animate-fadeIn">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setMobileMenuOpen(false);
                      resetFilters();
                    }}
                    className={`flex items-center space-x-2 w-full p-3 rounded-lg transition-all ${
                      activeCategory === cat.name 
                        ? 'bg-kino-yellow-400/20 text-kino-yellow-400 border border-kino-yellow-400/30' 
                        : 'text-gray-300 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Slider */}
      <div className="relative h-screen overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            background: currentHero.backdrop,
            transform: `scale(${1 + currentSlide * 0.02})`
          }}
        >
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay noise" />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-2xl space-y-4 md:space-y-6 animate-fadeInUp">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <span className="bg-kino-yellow-500/20 backdrop-blur-sm border border-kino-yellow-500/30 text-kino-yellow-400 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>Українське кіно</span>
                </span>
                <span className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-kino-yellow-400/30">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-kino-yellow-400 fill-kino-yellow-400" />
                  <span className="font-bold text-base md:text-lg text-kino-yellow-400">{currentHero.rating}</span>
                </span>
                {currentHero.hasVoiceover && (
                  <span className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1">
                    <Volume2 className="w-3 h-3" />
                    <span>UA озвучка</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-7xl font-black font-bebas mb-2 leading-none tracking-tight">
                  <span className="gradient-text drop-shadow-2xl">
                    {currentHero.title}
                  </span>
                </h1>
                <p className="text-gray-400 text-sm md:text-xl font-light tracking-wide">
                  {currentHero.titleEn} • {currentHero.year}
                </p>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-300">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{currentHero.duration}</span>
                </span>
                <span>•</span>
                <span className="line-clamp-1">{currentHero.genre.join(', ')}</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-lg leading-relaxed max-w-xl line-clamp-3">
                {currentHero.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 pt-2 md:pt-4">
                <button 
                  onClick={() => handlePlayClick(currentHero)}
                  className="group flex items-center space-x-2 bg-gradient-to-r from-kino-yellow-400 to-kino-yellow-500 text-black px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:scale-105 transform transition-all duration-200 shadow-2xl hover:shadow-kino-yellow-500/50 text-sm md:text-base"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-black group-hover:scale-110 transition-transform" />
                  <span>Дивитись зараз</span>
                </button>
                <button 
                  onClick={() => handleMovieClick(currentHero)}
                  className="flex items-center space-x-2 glass border px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:bg-white/20 transition-all duration-200 text-sm md:text-base"
                >
                  <Info className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Детальніше</span>
                </button>
                <button
                  onClick={() => toggleFavorite(currentHero.id)}
                  className={`p-3 md:p-4 rounded-lg font-bold transition-all duration-200 border ${
                    favorites.includes(currentHero.id)
                      ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
                      : 'glass hover:bg-white/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 md:w-5 md:h-5 ${favorites.includes(currentHero.id) ? 'fill-red-400' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 glass border p-2 md:p-4 rounded-full hover:bg-black/60 transition-all duration-200 group z-10"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 glass border p-2 md:p-4 rounded-full hover:bg-black/60 transition-all duration-200 group z-10"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center space-x-2 md:space-x-3 z-10">
          {heroMovies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? 'bg-kino-yellow-400 w-8 md:w-12 h-1 md:h-1.5 shadow-lg shadow-kino-yellow-400/50'
                  : 'bg-white/30 w-6 md:w-8 h-1 md:h-1.5 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-gradient-to-b from-black to-kino-dark-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
            {/* Voice-over filter */}
            <button
              onClick={toggleVoiceoverOnly}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 border ${
                voiceoverOnly
                  ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                  : 'glass border-white/20 text-gray-400 hover:bg-white/20'
              }`}
            >
              {voiceoverOnly ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-sm">Тільки UA озвучка</span>
            </button>

            {/* Genre filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="glass border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors cursor-pointer"
              >
                <option value="all">Всі жанри</option>
                {genres.slice(1).map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Sort options */}
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="glass border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors cursor-pointer"
              >
                <option value="rating">За рейтингом</option>
                <option value="year">За роком</option>
                <option value="title">За назвою</option>
                <option value="trending">За популярністю</option>
              </select>
            </div>

            {/* Results count */}
            <div className="text-sm text-gray-400">
              Знайдено: <span className="font-bold text-kino-yellow-400">{filteredMovies.length}</span> {filteredMovies.length === 1 ? 'фільм' : 'фільмів'}
            </div>

            {/* Reset filters */}
            {(selectedGenre !== 'all' || !voiceoverOnly || sortBy !== 'rating' || searchQuery) && (
              <button
                onClick={() => {
                  resetFilters();
                  setSearchQuery('');
                }}
                className="text-sm text-gray-400 hover:text-kino-yellow-400 transition-colors flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Скинути</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="bg-kino-dark-900 min-h-screen py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-black font-bebas mb-2 gradient-text">
              {activeCategory === 'Мій список' ? 'Обране' : activeCategory}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-kino-yellow-400 to-kino-yellow-600 rounded-full" />
          </div>

          {filteredMovies.length === 0 ? (
            <div className="text-center py-16 md:py-20">
              <div className="text-gray-500 mb-4">
                <Film className="w-16 h-16 md:w-20 md:h-20 mx-auto opacity-20" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-400 mb-2">Нічого не знайдено</h3>
              <p className="text-gray-500 mb-4">Спробуйте змінити фільтри або пошуковий запит</p>
              <button
                onClick={() => {
                  resetFilters();
                  setSearchQuery('');
                }}
                className="bg-kino-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-kino-yellow-500 transition-colors"
              >
                Скинути фільтри
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
              {filteredMovies.map((movie, idx) => (
                <div
                  key={movie.id}
                  className="group cursor-pointer animate-fadeIn"
                  style={{ animationDelay: `${idx * 30}ms` }}
                  onClick={() => handleMovieClick(movie)}
                  onMouseEnter={() => setHoveredMovie(movie.id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[2/3] mb-3 border border-gray-800 group-hover:border-kino-yellow-400/50 transition-all duration-300">
                    {/* Movie poster */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110"
                      style={{ background: movie.poster || movie.backdrop }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Film className="w-12 h-12 md:w-16 md:h-16 text-white/20" />
                      </div>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                      <Play className="w-12 h-12 md:w-16 md:h-16 text-white transform scale-90 group-hover:scale-100 transition-transform mb-2" />
                      <p className="text-xs text-center line-clamp-2 text-gray-300">{movie.description}</p>
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1 border border-kino-yellow-400/30">
                      <Star className="w-3 h-3 text-kino-yellow-400 fill-kino-yellow-400" />
                      <span className="text-xs font-bold text-white">{movie.rating}</span>
                    </div>

                    {/* Favorite button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(movie.id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-black/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 transform duration-200 border border-white/20"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(movie.id) ? 'fill-red-400 text-red-400' : 'text-white'}`} />
                    </button>

                    {/* Voice-over badge */}
                    {movie.hasVoiceover && (
                      <div className="absolute bottom-2 left-2 bg-blue-500/80 backdrop-blur-sm px-2 py-1 rounded flex items-center space-x-1">
                        <Volume2 className="w-3 h-3 text-white" />
                        <span className="text-xs font-bold text-white">UA</span>
                      </div>
                    )}

                    {/* Trending badge */}
                    {movie.isTrending && (
                      <div className="absolute bottom-2 right-2 bg-kino-yellow-500/80 backdrop-blur-sm px-2 py-1 rounded flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-black" />
                        <span className="text-xs font-bold text-black">TOP</span>
                      </div>
                    )}
                  </div>

                  {/* Movie info */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm md:text-base text-white line-clamp-1 group-hover:text-kino-yellow-400 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span className="line-clamp-1">{movie.genre[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
          <div className="bg-kino-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl animate-scaleIn">
            {/* Header with backdrop */}
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
              <div 
                className="absolute inset-0"
                style={{ background: selectedMovie.backdrop || selectedMovie.poster }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-kino-dark-800 via-kino-dark-800/50 to-transparent" />
              </div>

              {/* Close button */}
              <button
                onClick={() => {
                  setSelectedMovie(null);
                  setIsPlaying(false);
                }}
                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors z-10 border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 className="text-3xl md:text-5xl font-black font-bebas mb-2 gradient-text drop-shadow-lg">{selectedMovie.title}</h2>
                <p className="text-gray-300 text-lg">{selectedMovie.titleEn}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Video Player Placeholder */}
              {isPlaying ? (
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Play className="w-20 h-20 text-kino-yellow-400 mx-auto animate-pulse" />
                      <p className="text-gray-400 font-semibold">🎬 Player Wrapper (iframe / HLS.js)</p>
                      <p className="text-sm text-gray-500">Інтеграція VideoCDN / Ashdi API</p>
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="bg-kino-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-kino-yellow-500 transition-colors"
                      >
                        Зупинити
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 flex items-center justify-center group hover:border-kino-yellow-400/50 transition-all"
                >
                  <div className="text-center">
                    <div className="bg-kino-yellow-400 p-6 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-kino-yellow-500/50">
                      <Play className="w-12 h-12 text-black fill-black" />
                    </div>
                    <p className="text-xl font-bold text-white">Дивитись фільм</p>
                    <p className="text-sm text-gray-400 mt-2">{selectedMovie.duration}</p>
                  </div>
                </button>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-kino-yellow-500/20 border border-kino-yellow-500/30 px-3 py-1.5 rounded-lg">
                  <Star className="w-4 h-4 text-kino-yellow-400 fill-kino-yellow-400" />
                  <span className="font-bold text-kino-yellow-400">{selectedMovie.rating}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedMovie.year}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{selectedMovie.duration}</span>
                </div>
                {selectedMovie.hasVoiceover && (
                  <div className="flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-lg text-blue-400">
                    <Volume2 className="w-4 h-4" />
                    <span className="font-semibold">Українська озвучка</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Жанри</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMovie.genre.map(g => (
                    <span key={g} className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-300 border border-white/20">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Опис</h3>
                <p className="text-gray-300 leading-relaxed">{selectedMovie.description}</p>
              </div>

              {/* Director & Cast */}
              {selectedMovie.director && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Режисер</h3>
                    <p className="text-white font-semibold">{selectedMovie.director}</p>
                  </div>
                  {selectedMovie.cast && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">У головних ролях</h3>
                      <p className="text-gray-300">{selectedMovie.cast.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800">
                <button
                  onClick={() => toggleFavorite(selectedMovie.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all border ${
                    favorites.includes(selectedMovie.id)
                      ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
                      : 'glass border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(selectedMovie.id) ? 'fill-red-400' : ''}`} />
                  <span>{favorites.includes(selectedMovie.id) ? 'В обраному' : 'Додати до обраного'}</span>
                </button>
                <button className="flex items-center space-x-2 glass border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span>Поділитися</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-kino-yellow-400 text-black rounded-full shadow-2xl hover:scale-110 transform transition-all duration-200 z-40 animate-fadeIn border-2 border-kino-yellow-500"
        >
          <ChevronDown className="w-6 h-6 rotate-180" />
        </button>
      )}
    </div>
  );
}
