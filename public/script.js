document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('searchInput');
    let allEvents = [];

    // Fetch Schedule
    fetch('/api/schedule')
        .then(response => response.json())
        .then(data => {
            allEvents = data;
            renderSchedule(allEvents);
        })
        .catch(err => {
            console.error('Error fetching schedule:', err);
            scheduleContainer.innerHTML = '<div class="no-results">Failed to load schedule. Please try again later.</div>';
        });

    // Search Input Listener
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredEvents = allEvents.filter(event => {
            // Allow breaks to show if search is empty.
            if (!searchTerm) return true;

            // 1. Check Category (Array of strings)
            const categoryMatch = event.category && event.category.some(cat => 
                cat.toLowerCase().includes(searchTerm)
            );

            // 2. Check Title (String)
            const titleMatch = event.title && event.title.toLowerCase().includes(searchTerm);

            // 3. Check Speakers (Array of strings)
            const speakerMatch = event.speakers && event.speakers.some(speaker => 
                speaker.toLowerCase().includes(searchTerm)
            );

            return categoryMatch || titleMatch || speakerMatch;
        });
        renderSchedule(filteredEvents);
    });

    function renderSchedule(events) {
        scheduleContainer.innerHTML = '';

        if (events.length === 0) {
            scheduleContainer.innerHTML = '<div class="no-results">No talks found matching your search.</div>';
            return;
        }

        events.forEach(event => {
            const card = document.createElement('div');
            
            if (event.type === 'break') {
                card.className = 'card break-card';
                card.innerHTML = `
                    <div class="time-badge">${event.startTime} - ${event.endTime}</div>
                    <h3>☕ ${event.title}</h3>
                `;
            } else {
                card.className = 'card';
                
                const categoriesHtml = event.category
                    .map(cat => `<span class="tag">${cat}</span>`)
                    .join('');

                const speakersHtml = event.speakers.join(', ');

                card.innerHTML = `
                    <div class="time-badge">${event.startTime} - ${event.endTime}</div>
                    <h3>${event.title}</h3>
                    <div class="speakers">🗣️ ${speakersHtml}</div>
                    <div class="category-tags">${categoriesHtml}</div>
                    <p class="description">${event.description}</p>
                `;
            }

            scheduleContainer.appendChild(card);
        });
    }
});
