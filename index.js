fetch('data.json')
    .then(response => response.json())
    .then(data => populateGrid(data.data)) // Access the 'data' array inside the JSON
    .catch(error => console.error('Error loading JSON:', error));

function populateGrid(items) {
    const grid = document.getElementById('footage-grid');

    items.forEach(item => {
        const { title, image } = item; // Destructure 'title' and 'image' from each object

        const card = document.createElement('div');
        card.className = 'footage-card';

        const img = document.createElement('img');
        img.src = image;
        img.alt = title;
        img.draggable = false; // Prevent image dragging
        img.addEventListener('contextmenu', event => event.preventDefault()); // Disable right-click on image

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = title;

        card.appendChild(img);
        card.appendChild(cardTitle);
        grid.appendChild(card);

        card.addEventListener('click', () => {
            const category = title.replace(/\s+/g, '-');
            window.location.href = `index.html?category=${category}`;
        });
    });
}