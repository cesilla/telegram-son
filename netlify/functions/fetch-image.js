const fetch = require('node-fetch');

async function getDailyIslamicImage() {
    const response = await fetch('https://api.pexels.com/v1/search?query=islam&per_page=1', {
        headers: {
            Authorization: '3A9Be1YaDMwS45tYwr7tVwjrrpHtOql8MuzzvMSfCqmUbqYbrOBRnVgZ' // Buraya kendi Pexels API anahtarını yerleştir.
        }
    });
    const data = await response.json();
    return data.photos[0].src.original;
}
