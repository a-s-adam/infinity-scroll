
// Unsplash
const count = 10;
const apiKey = 'ZQzA23zxoaEeDJ-3-UgPJFIaE_uu0P4EKxN2W79VlC4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos using Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

    } catch (error){
        //Error
    }
    
}

getPhotos();