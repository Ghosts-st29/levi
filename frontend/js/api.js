// api.js - API functions for MongoDB backend
// REMOVED duplicate API_BASE_URL declaration

class API {
    // Get announcements
    async getAnnouncements() {
        try {
            const response = await fetch('/api/announcements');
            return await response.json();
        } catch (error) {
            console.error('Error fetching announcements:', error);
            return [];
        }
    }

    // Create announcement (Admin only)
    async createAnnouncement(announcementData) {
        try {
            const response = await fetch('/api/announcements', {
                method: 'POST',
                headers: auth.getAuthHeaders(),
                body: JSON.stringify(announcementData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating announcement:', error);
            return { success: false, error: 'Network error' };
        }
    }

    // Get events
    async getEvents() {
        try {
            const response = await fetch('/api/events');
            return await response.json();
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }

    // Create event (Admin only)
    async createEvent(eventData) {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: auth.getAuthHeaders(),
                body: JSON.stringify(eventData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating event:', error);
            return { success: false, error: 'Network error' };
        }
    }
}

const api = new API();