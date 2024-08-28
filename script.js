const slider = document.getElementById('scaleSlider');
const objects = document.querySelectorAll('.object');

// Set slider initial value to the middle (50)
slider.value = 50;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Assign a random color to each line using the ::before pseudo-element
objects.forEach(object => {
    const randomColor = getRandomColor();
    object.style.setProperty('--line-color', randomColor);  // Set CSS variable for color
});


slider.addEventListener('input', function () {
    const value = slider.value;

    let scaleFactor;
    if (value > 50) {
        scaleFactor = 1 - ((value - 50) / 50);  // Zoom out
    } else {
        scaleFactor = 1 + ((50 - value) / 5);  // Zoom in
    }

    objects.forEach((object) => {
        const img = object.querySelector('img');

        // Get the original dimensions from the HTML attributes
        const originalWidth = img.getAttribute('width').replace('px', '');
        const originalHeight = img.getAttribute('height').replace('px', '');

        // Calculate new dimensions based on the scale factor
        const newWidth = originalWidth * scaleFactor;
        const newHeight = originalHeight * scaleFactor;

        // Apply the new dimensions to the image
        img.style.width = `${newWidth}px`;
        img.style.height = `${newHeight}px`;
    });
});