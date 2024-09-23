// Array of the images
const images = [
    'images/bg/1.jpg',
    'images/bg/2.jpg',
    'images/bg/3.jpg',
    'images/bg/4.png',
    'images/bg/5.jpg',
    'images/bg/6.jpg',
    'images/bg/7.jpg',
    'images/bg/8.jpg',
    'images/bg/9.jpg',
    'images/bg/10.jpg'
];

// Function to set background image and store it in localStorage
function setBackgroundImage(image) {
    document.body.style.backgroundImage = `url(${image})`;
    localStorage.setItem('lastImage', image);
}

window.onload = function() {
    // Get the last image from localStorage
    const lastImage = localStorage.getItem('lastImage');
    setBackgroundImage(lastImage);

    // Start rotating images every 10 seconds
    let currentIndex = images.indexOf(lastImage);
    const intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        const nextImage = images[currentIndex];
        setBackgroundImage(nextImage);
    }, 10000);

    // Stop the rotation
    setTimeout(() => {
        clearInterval(intervalId);
    }, 60000);
};