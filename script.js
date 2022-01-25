const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash
const count = 10;
const apiKey = 'ZQzA23zxoaEeDJ-3 -UgPJFIaE_uu0P4EKxN2W79VlC4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded in photosArray
function imageLoaded(){
    imagesLoaded += 1;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


//Helper Function to Set Attributes on DOM Elements
function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}


// Create elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //For each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href : photo.links.html,
            target : '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src : photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener to indicate object is finish loading
        img.addEventListener('load',imageLoaded);
        //Put <img> inside <a>, then put into image-container
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// Get photos using Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        //Error
    }
    
}

// Scroll event near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready = false;
    }
});


getPhotos();