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
            // Keep breaks visible? Or hide breaks if filtering? 
            // Usually if I search for "React", I don't want to see "Lunch".
            // However, seeing "Lunch" might be confusing if it's out of context.
            // Let's filter EVERYTHING based on match.
            // But breaks have category ['Break'].
            
            // Allow breaks to show if search is empty.
            if (!searchTerm) return true;

            // Search logic: check category text
            // category is an array of strings
            const categoryMatch = event.category.some(cat => 
                cat.toLowerCase().includes(searchTerm)
            );
            
            // Optional: Search title too? Requirement says "search talks based on category".
            // I will stick to category ONLY as requested, but usually users expect title search too.
            // I'll stick to strict requirement: "search the talks based on category".
            
            return categoryMatch;
        });
        renderSchedule(filteredEvents);
    });

    function renderSchedule(events) {
        scheduleContainer.innerHTML = '';

        if (events.length === 0) {
            scheduleContainer.innerHTML = '<div class="no-results">No talks found matching that category.</div>';
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
