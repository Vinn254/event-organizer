// Navbar Component
class Navbar {
    constructor(app) {
        this.app = app;
    }

    render() {
        return `
            <nav class="navbar">
                <div class="navbar-container">
                    <a href="#" class="navbar-logo" data-page="home">
                        <i class="fas fa-calendar-alt"></i> EventHub
                    </a>
                    <ul class="navbar-menu">
                        <li><a href="#" class="navbar-link" data-page="home">
                            <i class="fas fa-home"></i> Home
                        </a></li>
                        <li><a href="#" class="navbar-link" data-page="events">
                            <i class="fas fa-calendar"></i> Events
                        </a></li>
                        ${this.app.user ? `
                            <li><a href="#" class="navbar-link" data-page="dashboard">
                                <i class="fas fa-tachometer-alt"></i> Dashboard
                            </a></li>
                            ${this.app.user.role === 'organizer' || this.app.user.role === 'admin' ? `
                                <li><a href="#" class="navbar-link" data-page="analytics">
                                    <i class="fas fa-chart-bar"></i> Analytics
                                </a></li>
                            ` : ''}
                            ${this.app.user.role === 'organizer' ? `
                                <li><a href="#" class="navbar-link" data-page="organizer">
                                    <i class="fas fa-cog"></i> Organizer
                                </a></li>
                            ` : ''}
                            <li><a href="#" class="navbar-link" onclick="app.logout()">
                                <i class="fas fa-sign-out-alt"></i> Logout
                            </a></li>
                        ` : `
                            <li><a href="#" class="navbar-link" data-page="login">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </a></li>
                            <li><a href="#" class="navbar-link btn btn-primary" data-page="register">
                                <i class="fas fa-user-plus"></i> Register
                            </a></li>
                        `}
                    </ul>
                    <div class="navbar-mobile-toggle">
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
            </nav>
        `;
    }

    update() {
        const navbarElement = document.getElementById('navbar');
        navbarElement.innerHTML = this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const toggle = document.querySelector('.navbar-mobile-toggle');
        const menu = document.querySelector('.navbar-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                toggle.querySelector('i').classList.toggle('fa-bars');
                toggle.querySelector('i').classList.toggle('fa-times');
            });
        }
    }
}