// Archives Page Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Archive data structure
    const archiveData = {
        'course-materials': [
            { name: "Web Development Courses", type: "pdf", size: "2.4 MB", downloads: 1542 },
            { name: "Data Science Programs", type: "pdf", size: "3.1 MB", downloads: 987 },
            { name: "Business & Management", type: "pdf", size: "1.8 MB", downloads: 765 },
            { name: "Creative Arts", type: "pdf", size: "4.2 MB", downloads: 543 }
        ],
        'exam-papers': [
            { name: "2024 Final Exams", type: "zip", size: "15.2 MB", downloads: 2100 },
            { name: "2023 Semester Tests", type: "zip", size: "12.8 MB", downloads: 1876 },
            { name: "Practice Questions", type: "pdf", size: "5.6 MB", downloads: 3210 },
            { name: "Solution Sets", type: "pdf", size: "8.9 MB", downloads: 1543 }
        ],
        'webinars': [
            { name: "2024 Webinar Recordings", type: "mp4", size: "245 MB", downloads: 876 },
            { name: "2023 Workshop Materials", type: "zip", size: "89 MB", downloads: 654 },
            { name: "Guest Speaker Sessions", type: "mp4", size: "187 MB", downloads: 432 },
            { name: "Conference Presentations", type: "pdf", size: "34 MB", downloads: 765 }
        ]
    };

    // Add download functionality to all archive links
    document.querySelectorAll('.archive-list a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const fileName = this.textContent;
            const fileType = this.closest('.archive-card').querySelector('h3').textContent;
            
            // Simulate download
            simulateDownload(fileName, fileType);
        });
    });

    // Add search functionality
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search archives...';
    searchInput.className = 'search-box';
    searchInput.style.cssText = `
        width: 100%;
        padding: 1rem;
        border: 2px solid #ddd;
        border-radius: 5px;
        margin-bottom: 2rem;
        font-size: 1rem;
    `;

    // Insert search at the top of archives
    const firstSection = document.querySelector('.archives-section');
    firstSection.parentNode.insertBefore(searchInput, firstSection);

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const allLinks = document.querySelectorAll('.archive-list a');
        
        let found = false;
        allLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            const listItem = link.closest('li');
            
            if (text.includes(searchTerm)) {
                listItem.style.display = 'flex';
                found = true;
            } else {
                listItem.style.display = 'none';
            }
        });
        
        // Show/hide sections based on results
        document.querySelectorAll('.archives-section').forEach(section => {
            const visibleItems = section.querySelectorAll('.archive-list li[style=""]');
            if (visibleItems.length === 0 && searchTerm) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    });

    // Add file type icons based on file names
    document.querySelectorAll('.archive-list a').forEach(link => {
        const text = link.textContent.toLowerCase();
        let icon = '📄'; // Default icon
        
        if (text.includes('video') || text.includes('recording') || text.includes('mp4')) {
            icon = '🎥';
        } else if (text.includes('zip') || text.includes('package')) {
            icon = '📦';
        } else if (text.includes('exam') || text.includes('test')) {
            icon = '📝';
        } else if (text.includes('report') || text.includes('analysis')) {
            icon = '📊';
        }
        
        link.innerHTML = `${icon} ${link.textContent}`;
    });
});

// Simulate file download
function simulateDownload(fileName, fileType) {
    alert(`Downloading: ${fileName}\nType: ${fileType}\n\nThis would trigger actual file download in production.`);
    
    // You can add actual download logic here
    // For example: window.location.href = `/download/${encodeURIComponent(fileName)}`;
}

// View archive category details
function viewCategory(categoryName) {
    alert(`Viewing category: ${categoryName}\nThis could show more details or filter view.`);
}