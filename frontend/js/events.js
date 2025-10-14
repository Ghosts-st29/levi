// Events Page Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Sample events data
    const events = [
        {
            id: 1,
            title: "Web Development Workshop",
            description: "Join our hands-on workshop to learn modern web development techniques. Perfect for beginners and intermediate developers looking to enhance their skills.",
            date: "2025-04-15",
            category: "workshop",
            image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
            seats: 30,
            registered: 25
        },
        {
            id: 2,
            title: "Career Fair 2025",
            description: "Connect with top employers looking for skilled graduates. Prepare your portfolio and resume for this exclusive networking event with industry leaders.",
            date: "2025-05-03",
            category: "career",
            image: "https://images.unsplash.com/photo-1551830417-bc0f77d6753a?w=400&h=300&fit=crop",
            seats: 100,
            registered: 78
        },
        {
            id: 3,
            title: "AI & Machine Learning Conference",
            description: "Industry leaders will share insights on the latest trends in AI and machine learning. Network with professionals and discover cutting-edge technologies.",
            date: "2025-06-10",
            category: "conference",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
            seats: 200,
            registered: 145
        }
    ];

    const eventsGrid = document.querySelector('.events-grid');

    // Display events
    function displayEvents() {
        eventsGrid.innerHTML = '';
        
        events.forEach((event, index) => {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            const availableSeats = event.seats - event.registered;
            const isFull = availableSeats <= 0;
            
            card.innerHTML = `
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-content">
                    <div class="event-date">${formatDate(event.date)}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-meta">
                        <span class="event-category">${event.category}</span>
                        <div class="event-stats">
                            <span class="seats-info ${isFull ? 'full' : ''}">
                                ${isFull ? 'FULL' : `${availableSeats} seats left`}
                            </span>
                            <button class="btn ${isFull ? 'disabled' : ''}" 
                                    onclick="registerForEvent(${event.id})" 
                                    ${isFull ? 'disabled' : ''}>
                                ${isFull ? 'Waitlist' : 'Register Now'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            eventsGrid.appendChild(card);
        });
    }

    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Initialize
    displayEvents();
});

// Global function to register for events
function registerForEvent(eventId) {
    alert(`Registering for event ${eventId}\nThis would integrate with your backend.`);
    
    // Simulate registration
    const btn = event.target;
    btn.textContent = 'Registered!';
    btn.disabled = true;
    btn.style.background = '#28a745';
}