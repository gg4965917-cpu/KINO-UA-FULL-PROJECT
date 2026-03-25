// TMDB API integration
const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';

export const fetchPopularMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.results;
};