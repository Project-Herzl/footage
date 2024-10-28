// Main page: Populate grid and set click event to open detail page.
fetch('data.json')
    .then(response => response.json())
    .then(data => populateGrid(data.data))
    .catch(error => console.error('Error loading JSON:', error));

function populateGrid(items) {
    const grid = document.getElementById('footage-grid');

    items.forEach(item => {
        const { title, image } = item;

        const card = document.createElement('div');
        card.className = 'footage-card';

        const img = document.createElement('img');
        img.src = image;
        img.alt = title;
        img.draggable = false;
        img.addEventListener('contextmenu', event => event.preventDefault());

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = title;

        card.appendChild(img);
        card.appendChild(cardTitle);
        grid.appendChild(card);

        card.addEventListener('click', () => {
            const category = encodeURIComponent(title);
            window.location.href = `detail.html?category=${category}`;  // Redirect to detail page with query param.
        });
    });
}