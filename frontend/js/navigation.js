// navigation.js - Dynamic navigation based on login status
class Navigation {
    constructor() {
        this.auth = auth;
    }

    // Update navigation based on login status
    updateNavigation() {
        const navButtons = document.querySelector('.nav-buttons');
        
        if (!navButtons) return;

        if (this.auth.isAuthenticated()) {
            const user = this.auth.user;
            navButtons.innerHTML = `
                <div class="user-info">
                    <span>Welcome, ${user.firstName}!</span>
                    ${this.auth.isAdmin() ? '<span class="admin-badge">Admin</span>' : ''}
                    <button class="btn btn-logout" onclick="auth.logout(); window.location.reload();">Logout</button>
                </div>
            `;
        } else {
            navButtons.innerHTML = `
                <button class="btn" onclick="window.location.href='signup.html'">Sign Up</button>
                <button class="btn" onclick="window.location.href='login.html'">Log In</button>
            `;
        }
    }

    // Initialize navigation on page load
    init() {
        this.updateNavigation();
    }
}

const navigation = new Navigation();

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    navigation.init();
});