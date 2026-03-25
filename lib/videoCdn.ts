// VideoCDN API Integration for Ukrainian Movies

const axios = require('axios');

class VideoCDN {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.videocdn.com/';
    }

    async getMoviesByLanguage(language = 'uk') {
        try {
            const response = await axios.get(`${this.baseURL}movies`, {
                headers: { 'Authorization': `Bearer ${this.apiKey}`},
                params: { language } // Filter for Ukrainian language
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw error;
        }
    }

    async getMovieDetails(movieId) {
        try {
            const response = await axios.get(`${this.baseURL}movies/${movieId}`, {
                headers: { 'Authorization': `Bearer ${this.apiKey}`}
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching details for movie ID ${movieId}:`, error);
            throw error;
        }
    }
}

module.exports = VideoCDN;
