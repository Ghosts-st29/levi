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

    // Delete announcement (Admin only) - ADD THIS
    async deleteAnnouncement(announcementId) {
        try {
            const response = await fetch(`/api/announcements/${announcementId}`, {
                method: 'DELETE',
                headers: auth.getAuthHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting announcement:', error);
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

    // Delete event (Admin only) - ADD THIS
    async deleteEvent(eventId) {
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
                headers: auth.getAuthHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting event:', error);
            return { success: false, error: 'Network error' };
        }
    }
}

const api = new API();