// Fetch data and display details
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const item = data.data.find(el => el.title === decodeURIComponent(category));
        if (item) displayDetails(item);
        else document.getElementById('detail-title').textContent = 'Item not found.';
    })
    .catch(error => console.error('Error loading JSON:', error));

// Function to display details including images
function displayDetails(item) {
    const { title, description, attachments } = item;
    document.getElementById('detail-title').textContent = "Footages: " + title;

    const contentDiv = document.getElementById('detail-content');

    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'description-container';

    const descParagraph = document.createElement('p');
    descParagraph.textContent = description;

    descriptionContainer.appendChild(descParagraph);
    contentDiv.appendChild(descriptionContainer);

    const grid = document.createElement('div');
    grid.className = 'media-grid';

    attachments.forEach(src => {
        const mediaFrame = document.createElement('div');
        mediaFrame.className = 'media-frame';

        if (src.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.preload = 'metadata';
            video.addEventListener('click', () => {
                if (video.requestFullscreen) video.requestFullscreen();
                else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
                else if (video.msRequestFullscreen) video.msRequestFullscreen();
            });

            mediaFrame.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.addEventListener('click', function () {
                openModal(this.src);
            });
            mediaFrame.appendChild(img);
        }

        grid.appendChild(mediaFrame);
    });

    contentDiv.appendChild(grid);
}

// Function to open modal
function openModal(src) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const goBackButton = document.getElementById('go-back-button');

    modal.style.display = "flex"; // Show modal as a flex container
    modalImage.src = src; // Set image source

    // Reset the scale for zooming
    modalImage.style.transform = "scale(1)";
    modalImage.dataset.scale = 1;

    // Add scroll event listener for zooming
    modalImage.onwheel = function (event) {
        event.preventDefault(); // Prevent default scrolling
        const scaleFactor = 0.1; // Factor to zoom in/out
        let newScale = parseFloat(modalImage.dataset.scale);

        if (event.deltaY < 0) {
            // Zoom in
            newScale += scaleFactor;
        } else {
            // Zoom out
            newScale -= scaleFactor;
            if (newScale < 1) newScale = 1; // Prevent scaling below original size
        }

        modalImage.style.transform = `scale(${newScale})`; // Apply new scale
        modalImage.dataset.scale = newScale; // Update the scale in the data attribute
    };
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.close');

    // When the user clicks on <span> (x), close the modal
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Close the modal if the user clicks anywhere outside of the image
    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Automatically open the warning image modal when the page loads
    openModal('warning.jpg');
});

// Handle the question mark button click to open a sidebar
document.getElementById('questionmark-button').addEventListener('click', () => {
    // Create the sidebar element if it doesn't exist
    let sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        sidebar = document.createElement('div');
        sidebar.id = 'sidebar';
        sidebar.classList.add('sidebar');
        
        const sidebarContent = document.createElement('p');
        sidebarContent.textContent = 'if you facing errors in the loading of some of the videos, try clicking right click on the video (on phone its a long tap) and then try "open in new window". if you cant use this option, try "copy video/image link" and then paste it yourself in new tab.';
        
        sidebar.appendChild(sidebarContent);
        document.body.appendChild(sidebar);
    }

    // Toggle sidebar visibility
    sidebar.classList.toggle('visible');
});