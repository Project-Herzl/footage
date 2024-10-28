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
                img.addEventListener('click', () => window.open(src, '_blank'));
                mediaFrame.appendChild(img);
            }
    
            grid.appendChild(mediaFrame);
        });
    
        contentDiv.appendChild(grid);
    }    