// api.js - API functions for MongoDB backend
const API_BASE_URL = 'http://localhost:5500/api'; // Your backend is on port 5500 // Replace with your Render URL

class API {
    // Get announcements
    async getAnnouncements() {
        try {
            const response = await fetch(`${API_BASE_URL}/announcements`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching announcements:', error);
            return [];
        }
    }

    // Create announcement (Admin only)
    async createAnnouncement(announcementData) {
        try {
            const response = await fetch(`${API_BASE_URL}/announcements`, {
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
            const response = await fetch(`${API_BASE_URL}/events`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }

    // Create event (Admin only)
    async createEvent(eventData) {
        try {
            const response = await fetch(`${API_BASE_URL}/events`, {
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

    // Create admin (run once)
    async createAdmin() {
        try {
            const response = await fetch(`${API_BASE_URL}/create-admin`, {
                method: 'POST'
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating admin:', error);
            return { success: false, error: 'Network error' };
        }
    }
}

const api = new API();