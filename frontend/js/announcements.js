// Announcements Page Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Sample announcements data
    const announcements = [
        {
            id: 1,
            title: "New Course Launch: Data Science Specialization",
            content: "We're excited to announce our new Data Science specialization course starting next month. Register now for early bird discounts and get access to exclusive learning materials.",
            date: "2025-03-15",
            category: "courses",
            priority: true,
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=300&h=200&fit=crop"
        },
        {
            id: 2,
            title: "Platform Maintenance Schedule",
            content: "Our platform will undergo scheduled maintenance this weekend to improve performance and add new features. Services may be temporarily unavailable.",
            date: "2025-03-10",
            category: "maintenance",
            priority: false,
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop"
        },
        {
            id: 3,
            title: "Scholarship Applications Now Open",
            content: "Applications for our 2025 scholarship program are now being accepted. Don't miss this opportunity to get financial support for your education.",
            date: "2025-03-05",
            category: "scholarship",
            priority: true,
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop"
        }
    ];

    // DOM Elements
    const announcementsGrid = document.getElementById('announcementsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    // Display announcements
    function displayAnnouncements(announcementsToShow) {
        announcementsGrid.innerHTML = '';
        
        if (announcementsToShow.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        announcementsToShow.forEach((announcement, index) => {
            const card = document.createElement('div');
            card.className = `announcement-card ${announcement.priority ? 'priority' : ''}`;
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <img src="${announcement.image}" alt="${announcement.title}" class="announcement-image">
                <div class="announcement-content">
                    <div class="announcement-header">
                        <div>
                            <h3 class="announcement-title">${announcement.title}</h3>
                            <p class="announcement-date">${formatDate(announcement.date)}</p>
                        </div>
                        <span class="announcement-category">${announcement.category}</span>
                    </div>
                    <p class="announcement-description">${announcement.content}</p>
                    <div class="announcement-meta">
                        <span style="color: #888;">Priority: ${announcement.priority ? 'High' : 'Medium'}</span>
                        <button class="btn" onclick="viewAnnouncement(${announcement.id})">Read More</button>
                    </div>
                </div>
            `;
            announcementsGrid.appendChild(card);
        });
    }

    // Filter functionality
    function filterAnnouncements(filter, searchTerm = '') {
        let filtered = announcements;
        
        if (filter !== 'all') {
            filtered = filtered.filter(announcement => announcement.category === filter);
        }
        
        if (searchTerm) {
            filtered = filtered.filter(announcement => 
                announcement.title.toLowerCase().includes(searchTerm) ||
                announcement.content.toLowerCase().includes(searchTerm) ||
                announcement.category.toLowerCase().includes(searchTerm)
            );
        }
        
        displayAnnouncements(filtered);
    }

    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Event Listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.textContent.toLowerCase();
            filterAnnouncements(filter === 'all announcements' ? 'all' : filter);
        });
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').textContent.toLowerCase();
        filterAnnouncements(activeFilter === 'all announcements' ? 'all' : activeFilter, searchTerm);
    });

    // Initialize
    displayAnnouncements(announcements);
});

// Global function to view announcement details
function viewAnnouncement(id) {
    alert(`Viewing announcement ${id}\nThis would open a detailed view or modal.`);
    // window.location.href = `announcement-detail.html?id=${id}`;
}