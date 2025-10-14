// auth.js - Authentication functions for MongoDB backend
const API_BASE_URL = 'http://localhost:5500/api'; // Your backend is on port 5500 // Replace with your Render URL

class Auth {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    // Student Signup
    async studentSignUp(email, password, userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    ...userData
                })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    }

    // Student Login
    async studentLogin(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    }

    // Admin Login
    async adminLogin(email, password) {
        return await this.studentLogin(email, password); // Same endpoint, different role
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }

    // Check if user is admin
    isAdmin() {
        return this.user && this.user.role === 'admin';
    }

    // Logout
    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Get auth headers
    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };
    }
}

const auth = new Auth();