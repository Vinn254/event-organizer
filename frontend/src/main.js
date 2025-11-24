// Event Management System Frontend
import { HomePage } from './pages/home.js';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import './components/navbar.js';
import './components/eventcard.js';
import './components/footer.js';
import './pages/dashboard.js';
import './pages/login.js';
import './pages/register.js';
import './pages/organizer.js';
import './pages/payment.js';
import './pages/events.js';
import { AnalyticsPage } from './pages/analytics.js';

class EventApp {
    constructor() {
        this.currentPage = 'home';
        this.user = null;
        this.events = [];
        this.apiBase = 'http://localhost:5000/api';
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        if (this.user) {
            this.currentPage = 'dashboard';
        }
        this.setupEventListeners();
        this.renderNavbar();
        this.renderFooter();
        this.navigateToPage(this.currentPage);
    }

    loadUserFromStorage() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user && user !== 'undefined' && user !== null) {
            try {
                this.user = JSON.parse(user);
                this.setAuthToken(token);
            } catch (error) {
                // Clear corrupted data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                console.warn('Cleared corrupted user data from localStorage');
            }
        }
    }

    setAuthToken(token) {
        this.authToken = token;
    }

    setupEventListeners() {
        // Handle navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page]')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.navigateToPage(page);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            if (e.target.id === 'login-form') {
                this.handleLogin(e.target);
            } else if (e.target.id === 'register-form') {
                this.handleRegister(e.target);
            } else if (e.target.id === 'event-form') {
                this.handleCreateEvent(e.target);
            } else if (e.target.id === 'otp-form') {
                this.handleOTPVerification(e.target);
            }
        });
    }

    async apiRequest(endpoint, options = {}) {
        const url = `${this.apiBase}${endpoint}`;
        
        // Check if body is FormData
        const isFormData = options.body instanceof FormData;
        
        const config = {
            headers: {
                ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
                ...options.headers,
            },
            ...options,
        };

        if (this.authToken) {
            config.headers.Authorization = `Bearer ${this.authToken}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            this.showNotification(error.message, 'error');
            throw error;
        }
    }

    formatCurrency(amount) {
        const n = Number(amount) || 0;
        try {
            return `Ksh ${n.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
        } catch (e) {
            return `Ksh ${n.toFixed(2)}`;
        }
    }

    navigateToPage(page) {
        this.currentPage = page;
        this.updateNavbar();
        this.renderPage(page);
        window.history.pushState({ page }, page, `#${page}`);
    }

    updateNavbar() {
        const navbar = document.getElementById('navbar');
        const navLinks = navbar.querySelectorAll('.navbar-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    setupNavbarEvents() {
        const toggle = document.querySelector('.navbar-mobile-toggle');
        const menu = document.querySelector('.navbar-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });

            // Close menu when clicking a nav link
            const navLinks = menu.querySelectorAll('.navbar-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            });
        }
    }

    renderNavbar() {
        const navbar = document.getElementById('navbar');
        navbar.innerHTML = `
            <nav class="navbar">
                <div class="navbar-container">
                    <a href="#" class="navbar-logo" data-page="home">
                        <i class="fas fa-calendar-alt"></i> EventHub
                    </a>
                    <ul class="navbar-menu">
                        <li><a href="#" class="navbar-link" data-page="home">Home</a></li>
                        <li><a href="#" class="navbar-link" data-page="events">Events</a></li>
                        ${this.user ? `
                            <li><a href="#" class="navbar-link" data-page="dashboard">Dashboard</a></li>
                            ${this.user.role === 'organizer' ? '<li><a href="#" class="navbar-link" data-page="organizer">Organizer</a></li>' : ''}
                            <li><a href="#" class="navbar-link" onclick="app.logout()">Logout</a></li>
                        ` : `
                            <li><a href="#" class="navbar-link" data-page="login">Login</a></li>
                        `}
                    </ul>
                    <button class="navbar-mobile-toggle" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
        `;
        this.setupNavbarEvents();
    }

    renderFooter() {
        const footer = document.getElementById('footer');
        footer.innerHTML = `
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-grid">
                        <div class="footer-section">
                            <h3>EventHub</h3>
                            <p>Your premier event management platform for creating unforgettable experiences.</p>
                        </div>
                        <div class="footer-section">
                            <h3>Quick Links</h3>
                            <a href="#" data-page="home">Home</a>
                            <a href="#" data-page="events">Events</a>
                            <a href="#" data-page="about">About</a>
                            <a href="#" data-page="contact">Contact</a>
                        </div>
                        <div class="footer-section">
                            <h3>Support</h3>
                            <a href="#" data-page="help">Help Center</a>
                            <a href="#" data-page="privacy">Privacy Policy</a>
                            <a href="#" data-page="terms">Terms of Service</a>
                        </div>
                        <div class="footer-section">
                            <h3>Connect</h3>
                            <div class="social-links">
                                <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2024 EventHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }

    renderPage(page) {
        console.log('Rendering page:', page);
        const mainContent = document.getElementById('main-content');
        if (!mainContent) {
            console.error('main-content element not found!');
            return;
        }

        mainContent.innerHTML = '<div class="loading"></div>';

        switch (page) {
            case 'home':
                console.log('Rendering home page');
                this.renderHomePage();
                break;
            case 'events':
                console.log('Rendering events page');
                this.renderEventsPage();
                break;
            case 'login':
                console.log('Rendering login page');
                this.renderLoginPage();
                break;
            case 'register':
                console.log('Rendering register page');
                this.renderRegisterPage();
                break;
            case 'dashboard':
                console.log('Rendering dashboard page');
                this.renderDashboardPage();
                break;
            case 'organizer':
                console.log('Rendering organizer page');
                this.renderOrganizerPage();
                break;
            case 'payment':
                console.log('Rendering payment page');
                this.renderPaymentPage();
                break;
            case 'analytics':
                console.log('Rendering analytics page');
                this.renderAnalyticsPage();
                break;
            default:
                console.log('Rendering default home page');
                this.renderHomePage();
        }
    }

    renderHomePage() {
        const mainContent = document.getElementById('main-content');
        const homePage = new HomePage(this);
        mainContent.innerHTML = homePage.render();
        homePage.afterRender();
    }

    async renderEventsPage() {
        try {
            const events = await this.apiRequest('/events');
            this.events = events;

            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = `
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Upcoming Events</h2>
                        <p>Discover exciting events happening soon</p>
                    </div>

                    <div class="grid grid-2">
                        ${events.map(event => this.renderEventCard(event)).join('')}
                    </div>
                </section>
            `;
        } catch (error) {
            this.showNotification('Failed to load events', 'error');
        }
    }

    renderEventCard(event) {
        const imageUrl = event.image ? (event.image.startsWith('http') ? event.image : `http://localhost:5000${event.image}`) : '';
        return `
            <div class="card event-card fade-in" data-event-id="${event._id}">
                ${imageUrl ? `<img src="${imageUrl}" alt="${event.title}" class="event-image">` : ''}
                <div class="card-body">
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-meta">
                        <div class="event-date">
                            <i class="fas fa-calendar"></i> ${new Date(event.date).toLocaleDateString()}
                            <br>
                            <i class="fas fa-clock"></i> ${event.time}
                        </div>
                        <div class="event-price">${this.formatCurrency(event.price)}</div>
                    </div>
                    <div class="event-location mb-3">
                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                    </div>
                    <div class="event-actions">
                        <button class="btn btn-primary" onclick="app.viewEvent('${event._id}')">View Details</button>
                        ${this.user ? `<button class="btn btn-secondary" onclick="app.bookEvent('${event._id}')">Book Now</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    renderLoginPage() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Login to Your Account</h3>
                        </div>
                        <div class="card-body">
                            <form id="login-form">
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" name="password" class="form-input" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Login</button>
                            </form>
                            <div class="mt-3 text-center">
                                <p>Don't have an account? <a href="#" data-page="register">Register here</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body text-center">
                            <h3>Welcome Back!</h3>
                            <p>Sign in to access your dashboard and manage your events.</p>
                            <div class="mt-4">
                                <img src="${img1}" alt="Welcome Back" class="auth-image">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderRegisterPage() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Create Your Account</h3>
                        </div>
                        <div class="card-body">
                            <form id="register-form">
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input type="text" name="name" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input type="tel" name="phone" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" name="password" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Account Type</label>
                                    <select name="role" class="form-input" required>
                                        <option value="user">Regular User</option>
                                        <option value="organizer">Event Organizer</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">How would you like to receive your OTP?</label>
                                    <div class="radio-group">
                                        <label class="radio-label">
                                            <input type="radio" name="otpMethod" value="email" checked>
                                            <span>Email</span>
                                        </label>
                                        <label class="radio-label">
                                            <input type="radio" name="otpMethod" value="sms">
                                            <span>SMS</span>
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Register</button>
                            </form>
                            <div class="mt-3 text-center">
                                <p>Already have an account? <a href="#" data-page="login">Login here</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body text-center">
                            <h3>Join EventHub Today!</h3>
                            <p>Create events, book tickets, and connect with amazing communities.</p>
                            <div class="mt-4">
                                <img src="${img2}" alt="Join EventHub Today" class="auth-image">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async renderDashboardPage() {
        // Always check user authentication
        if (!this.user) {
            console.log('No user found, redirecting to login');
            this.navigateToPage('login');
            return;
        }

        console.log('Rendering dashboard for user:', this.user.name);

        const mainContent = document.getElementById('main-content');
        
        // Fetch recent transactions
        let recentTransactions = [];
        try {
            const transactions = await this.apiRequest('/payments/my');
            recentTransactions = transactions.slice(0, 3); // Get last 3 transactions
        } catch (error) {
            console.warn('Could not fetch transactions:', error);
        }

        mainContent.innerHTML = `
            <section class="main-content">
                <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 2rem; border-radius: 1rem; margin-bottom: 2rem; text-align: center;">
                    <h1 style="margin: 0; font-size: 2.5rem;">DASHBOARD</h1>
                    <p style="margin: 1rem 0 0 0; font-size: 1.2rem;">Welcome back, ${this.user.name}! You are now logged in.</p>
                </div>
                <div class="mb-4">
                    <h2>Welcome back, ${this.user.name}!</h2>
                    <p>Manage your events and bookings from your personalized dashboard</p>
                </div>

                <div class="grid grid-3">
                    <div class="card dashboard-card fade-in">
                        <div class="card-body text-center">
                            <div class="dashboard-icon">
                                <i class="fas fa-ticket-alt fa-3x text-primary"></i>
                            </div>
                            <h3>My Tickets</h3>
                            <p>View and manage your booked event tickets</p>
                            <button class="btn btn-primary mt-3" onclick="app.viewMyTickets()">
                                <i class="fas fa-eye"></i> View Tickets
                            </button>
                        </div>
                    </div>

                    <div class="card dashboard-card fade-in">
                        <div class="card-body text-center">
                            <div class="dashboard-icon">
                                <i class="fas fa-history fa-3x text-secondary"></i>
                            </div>
                            <h3>Transaction History</h3>
                            <p>Check your payment history and receipts</p>
                            <button class="btn btn-secondary mt-3" onclick="app.viewTransactions()">
                                <i class="fas fa-receipt"></i> View History
                            </button>
                        </div>
                    </div>

                    <div class="card dashboard-card fade-in">
                        <div class="card-body text-center">
                            <div class="dashboard-icon">
                                <i class="fas fa-user fa-3x text-accent"></i>
                            </div>
                            <h3>Profile Settings</h3>
                            <p>Update your account information and preferences</p>
                            <button class="btn btn-outline mt-3" onclick="app.viewProfile()">
                                <i class="fas fa-cog"></i> Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Recent Transaction History Section -->
                ${recentTransactions.length > 0 ? `
                <div class="mt-5">
                    <h3 style="margin-bottom: 1.5rem; border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem;">Recent Transactions</h3>
                    <div class="grid grid-1">
                        ${recentTransactions.map(transaction => `
                            <div class="card transaction-card fade-in" style="display: flex; align-items: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1));">
                                <div style="flex: 1;">
                                    <h4 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">Transaction #${transaction.transactionId}</h4>
                                    <p style="margin: 0.25rem 0; color: var(--text-secondary);"><strong>Amount:</strong> $${transaction.amount}</p>
                                    <p style="margin: 0.25rem 0; color: var(--text-secondary);"><strong>Date:</strong> ${new Date(transaction.createdAt).toLocaleDateString()}</p>
                                    <p style="margin: 0.25rem 0; color: var(--text-secondary);"><strong>Payment Method:</strong> ${transaction.paymentMethod}</p>
                                </div>
                                <div style="text-align: right;">
                                    <span style="display: inline-block; padding: 0.5rem 1rem; border-radius: 0.5rem; background-color: ${transaction.status === 'completed' ? 'var(--success-color)' : 'var(--warning-color)'}; color: white; font-weight: 600; margin-bottom: 0.5rem;">${transaction.status.toUpperCase()}</span>
                                    <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="app.viewTransactions()">View All</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </section>
        `;
    }

    renderOrganizerPage() {
        if (!this.user || this.user.role !== 'organizer') {
            this.navigateToPage('home');
            return;
        }

        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="main-content">
                <div class="mb-4">
                    <h2>Organizer Dashboard</h2>
                    <p>Create and manage your events</p>
                </div>

                <div class="mb-4">
                    <button class="btn btn-primary" onclick="app.showCreateEventForm()">Create New Event</button>
                </div>

                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-body">
                            <h3>My Events</h3>
                            <p>Manage your created events</p>
                            <button class="btn btn-secondary mt-3" onclick="app.viewMyEvents()">View Events</button>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body">
                            <h3>Analytics</h3>
                            <p>View event performance and statistics</p>
                            <button class="btn btn-secondary mt-3" onclick="app.viewAnalytics()">View Analytics</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async renderPaymentPage() {
        if (!this.selectedEventId) {
            this.showNotification('No event selected for payment', 'error');
            this.navigateToPage('events');
            return;
        }

        try {
            const event = await this.apiRequest(`/events/${this.selectedEventId}`);
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = `
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Book Tickets</h2>
                        <p>Complete your booking for ${event.title}</p>
                    </div>

                    <div class="grid grid-2">
                        <div class="card fade-in">
                            <div class="card-header">
                                <h3>Event Details</h3>
                            </div>
                            <div class="card-body">
                                <div class="event-summary">
                                    <h4>${event.title}</h4>
                                    <p><i class="fas fa-calendar"></i> ${new Date(event.date).toLocaleDateString()} at ${event.time}</p>
                                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                                    <p><i class="fas fa-dollar-sign"></i> $${event.price} per ticket</p>
                                    <p><i class="fas fa-users"></i> ${event.availableTickets} tickets available</p>
                                </div>
                            </div>
                        </div>

                        <div class="card fade-in">
                            <div class="card-header">
                                <h3>Payment Details</h3>
                            </div>
                            <div class="card-body">
                                <form id="payment-form">
                                    <div class="form-group">
                                        <label class="form-label">Number of Tickets</label>
                                        <input type="number" name="quantity" class="form-input" min="1" max="${event.availableTickets}" value="1" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Phone Number (M-Pesa)</label>
                                        <input type="tel" name="phoneNumber" class="form-input" placeholder="254XXXXXXXXX" value="${this.user.phone || ''}" required>
                                    </div>
                                    <div class="payment-summary">
                                        <p><strong>Total: $<span id="total-amount">${event.price}</span></strong></p>
                                    </div>
                                    <button type="submit" class="btn btn-success w-full">
                                        <i class="fas fa-mobile-alt"></i> Pay with M-Pesa
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            `;

            // Add event listener for quantity change
            const quantityInput = document.querySelector('input[name="quantity"]');
            const totalAmount = document.getElementById('total-amount');

            quantityInput.addEventListener('input', (e) => {
                const quantity = parseInt(e.target.value) || 1;
                totalAmount.textContent = (quantity * event.price).toFixed(2);
            });

            // Add form submission handler
            const form = document.getElementById('payment-form');
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handlePaymentSubmission(event);
            });

        } catch (error) {
            this.showNotification('Failed to load event details', 'error');
            this.navigateToPage('events');
        }
    }

    renderAnalyticsPage() {
        const mainContent = document.getElementById('main-content');
        const analyticsPage = new AnalyticsPage(this);
        mainContent.innerHTML = analyticsPage.render();
        analyticsPage.afterRender();
    }

    // Event Handlers
    async handleLogin(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await this.apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            console.log('Login response:', response);

            // Check if user needs verification
            if (response.requiresVerification) {
                this.showNotification('Please verify your account first.', 'info');
                this.showOTPForm(response.user.email);
                return;
            }

            this.user = response.user;
            this.setAuthToken(response.token);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            console.log('Login successful, user set:', this.user);
            console.log('Rendering dashboard directly...');

            this.showNotification('Login successful!', 'success');
            this.currentPage = 'dashboard';
            this.renderDashboardPage();
            this.renderNavbar();
            window.history.pushState({ page: 'dashboard' }, 'dashboard', '#dashboard');
        } catch (error) {
            // Error already handled in apiRequest
        }
    }

    async handleRegister(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await this.apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            this.showNotification('Registration successful! Use the OTP shown below.', 'success');
            this.showOTPForm(data.email, response.otp);
        } catch (error) {
            // Error already handled in apiRequest
        }
    }

    showOTPForm(email, otp = null) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Verify Your Account</h3>
                        </div>
                        <div class="card-body">
                            <p>Please enter the OTP to verify your account.</p>
                            ${otp ? `<div class="otp-display"><strong>Your OTP: <span class="otp-code">${otp}</span></strong></div>` : ''}
                            <form id="otp-form">
                                <input type="hidden" name="email" value="${email}">
                                <div class="form-group">
                                    <label class="form-label">OTP Code</label>
                                    <input type="text" name="otp" class="form-input" required maxlength="6" ${otp ? `value="${otp}"` : ''}>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Verify OTP</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async handleOTPVerification(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await this.apiRequest('/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            this.user = response.user;
            this.setAuthToken(response.token);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            this.showNotification('Account verified successfully!', 'success');
            this.currentPage = 'dashboard';
            this.renderDashboardPage();
            this.renderNavbar();
            window.history.pushState({ page: 'dashboard' }, 'dashboard', '#dashboard');
        } catch (error) {
            // Error already handled in apiRequest
        }
    }

    async handleCreateEvent(form) {
        const formData = new FormData(form);

        try {
            // Check if we're editing an existing event
            if (this.editingEventId) {
                await this.apiRequest(`/events/${this.editingEventId}`, {
                    method: 'PUT',
                    body: formData
                });
                this.showNotification('Event updated successfully!', 'success');
                this.editingEventId = null;
            } else {
                // Creating a new event
                await this.apiRequest('/events', {
                    method: 'POST',
                    body: formData
                });
                this.showNotification('Event created successfully!', 'success');
            }
            
            this.navigateToPage('organizer');
        } catch (error) {
            // Error already handled in apiRequest
        }
    }

    // Additional methods for event interactions
    viewEvent(eventId) {
        // Fetch the specific event details
        this.apiRequest(`/events/${eventId}`)
            .then(event => {
                const imageUrl = event.image ? (event.image.startsWith('http') ? event.image : `http://localhost:5000${event.image}`) : '';
                const mainContent = document.getElementById('main-content');
                mainContent.innerHTML = `
                    <section class="main-content">
                        <div class="event-detail-header">
                            ${imageUrl ? `<img src="${imageUrl}" alt="${event.title}" class="event-detail-image">` : ''}
                            <div class="event-detail-info">
                                <h1>${event.title}</h1>
                                <p class="event-description">${event.description}</p>
                                <div class="event-meta">
                                    <div class="event-date">
                                        <i class="fas fa-calendar"></i> ${new Date(event.date).toLocaleDateString()}
                                        <br>
                                        <i class="fas fa-clock"></i> ${event.time}
                                    </div>
                                    <div class="event-price">$${event.price}</div>
                                </div>
                                <div class="event-location">
                                    <i class="fas fa-map-marker-alt"></i> ${event.location}
                                </div>
                                <div class="event-capacity">
                                    <i class="fas fa-users"></i> ${event.availableTickets} tickets available out of ${event.capacity}
                                </div>
                                ${this.user ? `
                                    <button class="btn btn-primary" onclick="app.bookEvent('${event._id}')">
                                        <i class="fas fa-ticket-alt"></i> Book Tickets
                                    </button>
                                ` : `
                                    <p>Please <a href="#" data-page="login">login</a> to book tickets.</p>
                                `}
                            </div>
                        </div>
                    </section>
                `;
            })
            .catch(error => {
                this.showNotification('Failed to load event details', 'error');
            });
    }

    async bookEvent(eventId) {
        // Store event ID for payment page
        this.selectedEventId = eventId;
        this.navigateToPage('payment');
    }

    async handlePaymentSubmission(event) {
        const formData = new FormData(document.getElementById('payment-form'));
        const data = Object.fromEntries(formData);
        const quantity = parseInt(data.quantity);
        const phoneNumber = data.phoneNumber;

        try {
            // Show loading
            const submitBtn = document.querySelector('#payment-form button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            // Simulate M-Pesa payment prompt
            alert(`M-Pesa payment prompt sent to ${phoneNumber}\nAmount: $${(quantity * event.price).toFixed(2)}\nPlease complete the payment on your phone.`);

            // For demo purposes, we'll create the ticket immediately
            // In production, this would wait for M-Pesa callback
            const ticketData = {
                eventId: event._id,
                quantity: quantity,
                phoneNumber: phoneNumber
            };

            const ticket = await this.apiRequest(`/events/${event._id}/book`, {
                method: 'POST',
                body: JSON.stringify({ quantity: quantity }),
            });

            // Show success and ticket details
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = `
                <section class="main-content">
                    <div class="text-center mb-4">
                        <i class="fas fa-check-circle fa-4x text-success"></i>
                        <h2>Payment Successful!</h2>
                        <p>Your tickets have been booked successfully.</p>
                    </div>

                    <div class="grid grid-2">
                        <div class="card fade-in">
                            <div class="card-header">
                                <h3>Ticket Details</h3>
                            </div>
                            <div class="card-body">
                                <div class="ticket-info">
                                    <h4>${event.title}</h4>
                                    <p><strong>Ticket Number:</strong> ${ticket.ticketNumber}</p>
                                    <p><strong>Quantity:</strong> ${quantity}</p>
                                    <p><strong>Total Price:</strong> $${ticket.totalPrice}</p>
                                    <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()} at ${event.time}</p>
                                    <p><strong>Location:</strong> ${event.location}</p>
                                    <p><strong>Phone:</strong> ${phoneNumber}</p>
                                </div>
                                <div class="mt-4 flex gap-2">
                                    <button class="btn btn-primary flex-1" onclick="app.downloadTicket('${ticket._id}', '${event.title}', '${ticket.ticketNumber}')">
                                        <i class="fas fa-download"></i> Download Ticket
                                    </button>
                                    <button class="btn btn-secondary flex-1" onclick="app.downloadReceipt('${ticket._id}', '${event.title}', '${ticket.ticketNumber}', ${ticket.totalPrice}, '${phoneNumber}')">
                                        <i class="fas fa-receipt"></i> Download Receipt
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="card fade-in">
                            <div class="card-body text-center">
                                <h3>Next Steps</h3>
                                <p>Keep this ticket information safe. You'll need to show it at the event entrance.</p>
                                <div class="mt-4">
                                    <button class="btn btn-primary" onclick="app.navigateToPage('dashboard')">
                                        <i class="fas fa-home"></i> Go to Dashboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;

        } catch (error) {
            this.showNotification('Payment failed. Please try again.', 'error');
            // Re-enable button
            const submitBtn = document.querySelector('#payment-form button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-mobile-alt"></i> Pay with M-Pesa';
            submitBtn.disabled = false;
        }
    }

    showNotification(message, type = 'info') {
        // Simple notification implementation
        alert(`${type.toUpperCase()}: ${message}`);
    }

    // Dashboard methods
    async viewMyTickets() {
        try {
            const tickets = await this.apiRequest('/events/tickets/my');
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = `
                <section class="main-content">
                    <div class="mb-4">
                        <h2>My Tickets</h2>
                        <p>View and manage your booked event tickets</p>
                    </div>

                    ${tickets.length === 0 ? '<p>No tickets found.</p>' : `
                    <div class="grid grid-1">
                        ${tickets.map(ticket => `
                            <div class="card ticket-card fade-in">
                                <div class="card-body">
                                    <h3>${ticket.event.title}</h3>
                                    <p><strong>Ticket Number:</strong> ${ticket.ticketNumber}</p>
                                    <p><strong>Quantity:</strong> ${ticket.quantity}</p>
                                    <p><strong>Total Price:</strong> $${ticket.totalPrice}</p>
                                    <p><strong>Date:</strong> ${new Date(ticket.event.date).toLocaleDateString()} at ${ticket.event.time}</p>
                                    <p><strong>Location:</strong> ${ticket.event.location}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    `}
                </section>
            `;
        } catch (error) {
            this.showNotification('Failed to load tickets', 'error');
        }
    }

    async viewTransactions() {
        try {
            const transactions = await this.apiRequest('/payments/my');
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = `
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Transaction History</h2>
                        <p>Check your payment history and receipts</p>
                    </div>

                    ${transactions.length === 0 ? '<p>No transactions found.</p>' : `
                    <div class="grid grid-1">
                        ${transactions.map(transaction => `
                            <div class="card transaction-card fade-in">
                                <div class="card-body">
                                    <h3>Transaction ID: ${transaction.transactionId}</h3>
                                    <p><strong>Amount:</strong> $${transaction.amount}</p>
                                    <p><strong>Status:</strong> ${transaction.status}</p>
                                    <p><strong>Payment Method:</strong> ${transaction.paymentMethod}</p>
                                    <p><strong>Date:</strong> ${new Date(transaction.createdAt).toLocaleDateString()}</p>
                                    ${transaction.mpesaReceiptNumber ? `<p><strong>M-Pesa Receipt:</strong> ${transaction.mpesaReceiptNumber}</p>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    `}
                </section>
            `;
        } catch (error) {
            this.showNotification('Failed to load transactions', 'error');
        }
    }

    viewProfile() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Edit Profile</h3>
                        </div>
                        <div class="card-body">
                            <form id="profile-form">
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input type="text" name="name" class="form-input" value="${this.user.name}" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" class="form-input" value="${this.user.email}" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input type="tel" name="phone" class="form-input" value="${this.user.phone}" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Update Profile</button>
                            </form>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body text-center">
                            <h3>Update Your Information</h3>
                            <p>Keep your profile up to date for better event experiences.</p>
                            <div class="mt-4">
                                <i class="fas fa-user-edit fa-4x text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Add event listener for the form
        const form = document.getElementById('profile-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                try {
                    const response = await this.apiRequest('/auth/profile', {
                        method: 'PUT',
                        body: JSON.stringify(data),
                    });
                    this.user = response.user;
                    localStorage.setItem('user', JSON.stringify(response.user));
                    this.showNotification('Profile updated successfully!', 'success');
                } catch (error) {
                    // Error already handled
                }
            });
        }
    }

    // Organizer methods
    showCreateEventForm() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Create New Event</h3>
                        </div>
                        <div class="card-body">
                            <form id="event-form">
                                <div class="form-group">
                                    <label class="form-label">Event Title</label>
                                    <input type="text" name="title" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Description</label>
                                    <textarea name="description" class="form-input" rows="4" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Date</label>
                                    <input type="date" name="date" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Time</label>
                                    <input type="time" name="time" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Location</label>
                                    <input type="text" name="location" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Category</label>
                                    <select name="category" class="form-input" required>
                                        <option value="">Select Category</option>
                                        <option value="conference">Conference</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="concert">Concert</option>
                                        <option value="sports">Sports</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Price ($)</label>
                                    <input type="number" name="price" class="form-input" min="0" step="0.01" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Capacity</label>
                                    <input type="number" name="capacity" class="form-input" min="1" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Event Image (optional)</label>
                                    <input type="file" name="image" class="form-input" accept="image/*">
                                    <small class="text-light">Upload an image for your event (JPG, PNG, GIF)</small>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Create Event</button>
                            </form>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body text-center">
                            <h3>Create Amazing Events</h3>
                            <p>Fill in the details to create a new event for attendees to book.</p>
                            <div class="mt-4">
                                <img src="${img1}" alt="Create Events" class="auth-image">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async viewMyEvents() {
        try {
            const events = await this.apiRequest('/events/my-events');
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = `
                <section class="main-content">
                    <div class="mb-4">
                        <h2>My Events</h2>
                        <p>Manage your created events</p>
                    </div>

                    ${events.length === 0 ? '<p>No events created yet.</p>' : `
                    <div class="grid grid-2">
                        ${events.map(event => `
                            <div class="card event-card fade-in" data-event-id="${event._id}">
                                <div class="card-body">
                                    <h3 class="event-title">${event.title}</h3>
                                    <p class="event-description">${event.description}</p>
                                    <div class="event-meta">
                                        <div class="event-date">
                                            <i class="fas fa-calendar"></i> ${new Date(event.date).toLocaleDateString()}
                                            <br>
                                            <i class="fas fa-clock"></i> ${event.time}
                                        </div>
                                        <div class="event-price">$${event.price}</div>
                                    </div>
                                    <div class="event-location mb-3">
                                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                                    </div>
                                    <div class="event-actions">
                                        <button class="btn btn-secondary" onclick="app.editEvent('${event._id}')">Edit</button>
                                        <button class="btn btn-danger" onclick="app.deleteEvent('${event._id}')">Delete</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    `}
                </section>
            `;
        } catch (error) {
            this.showNotification('Failed to load events', 'error');
        }
    }

    async viewAnalytics() {
        try {
            const analytics = await this.apiRequest('/events/analytics');
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = `
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Event Analytics</h2>
                        <p>View event performance and statistics</p>
                    </div>

                    <div class="grid grid-3">
                        <div class="card analytics-card fade-in">
                            <div class="card-body text-center">
                                <div class="analytics-icon">
                                    <i class="fas fa-calendar-alt fa-3x text-primary"></i>
                                </div>
                                <h3>Total Events</h3>
                                <p class="analytics-number">${analytics.totalEvents}</p>
                            </div>
                        </div>

                        <div class="card analytics-card fade-in">
                            <div class="card-body text-center">
                                <div class="analytics-icon">
                                    <i class="fas fa-ticket-alt fa-3x text-secondary"></i>
                                </div>
                                <h3>Tickets Sold</h3>
                                <p class="analytics-number">${analytics.totalTicketsSold}</p>
                            </div>
                        </div>

                        <div class="card analytics-card fade-in">
                            <div class="card-body text-center">
                                <div class="analytics-icon">
                                    <i class="fas fa-dollar-sign fa-3x text-success"></i>
                                </div>
                                <h3>Total Revenue</h3>
                                <p class="analytics-number">$${analytics.totalRevenue}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <h3>Event Breakdown</h3>
                        <div class="grid grid-1">
                            ${analytics.events.map(event => `
                                <div class="card fade-in">
                                    <div class="card-body">
                                        <h4>${event.title}</h4>
                                        <p><strong>Tickets Sold:</strong> ${event.ticketsSold}</p>
                                        <p><strong>Revenue:</strong> $${event.revenue}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
        } catch (error) {
            this.showNotification('Failed to load analytics', 'error');
        }
    }

    async viewTickets() {
        try {
            const tickets = await this.apiRequest('/events/tickets/sold');
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = `
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Sold Tickets</h2>
                        <p>View tickets sold for your events</p>
                    </div>

                    ${tickets.length === 0 ? '<p>No tickets sold yet.</p>' : `
                    <div class="grid grid-1">
                        ${tickets.map(ticket => `
                            <div class="card ticket-card fade-in">
                                <div class="card-body">
                                    <h3>${ticket.event.title}</h3>
                                    <p><strong>Ticket Number:</strong> ${ticket.ticketNumber}</p>
                                    <p><strong>Quantity:</strong> ${ticket.quantity}</p>
                                    <p><strong>Total Price:</strong> $${ticket.totalPrice}</p>
                                    <p><strong>Buyer:</strong> ${ticket.user.name} (${ticket.user.email})</p>
                                    <p><strong>Date:</strong> ${new Date(ticket.event.date).toLocaleDateString()} at ${ticket.event.time}</p>
                                    <p><strong>Location:</strong> ${ticket.event.location}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    `}
                </section>
            `;
        } catch (error) {
            this.showNotification('Failed to load tickets', 'error');
        }
    }

    async editEvent(eventId) {
        try {
            const event = await this.apiRequest(`/events/${eventId}`);
            this.editingEventId = eventId;
            
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = `
                <section class="main-content">
                    <div class="form-container">
                        <div class="card fade-in">
                            <div class="card-body">
                                <h2>Edit Event</h2>
                                <p class="text-muted">Update your event details</p>
                                <form id="event-form" class="mt-4">
                                    <div class="form-group">
                                        <label class="form-label">Event Title</label>
                                        <input type="text" name="title" class="form-input" value="${event.title}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Description</label>
                                        <textarea name="description" class="form-input" rows="4" required>${event.description}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Date</label>
                                        <input type="date" name="date" class="form-input" value="${new Date(event.date).toISOString().split('T')[0]}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Time</label>
                                        <input type="time" name="time" class="form-input" value="${event.time}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Location</label>
                                        <input type="text" name="location" class="form-input" value="${event.location}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Category</label>
                                        <select name="category" class="form-input" required>
                                            <option value="">Select Category</option>
                                            <option value="conference" ${event.category === 'conference' ? 'selected' : ''}>Conference</option>
                                            <option value="workshop" ${event.category === 'workshop' ? 'selected' : ''}>Workshop</option>
                                            <option value="concert" ${event.category === 'concert' ? 'selected' : ''}>Concert</option>
                                            <option value="sports" ${event.category === 'sports' ? 'selected' : ''}>Sports</option>
                                            <option value="other" ${event.category === 'other' ? 'selected' : ''}>Other</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Price ($)</label>
                                        <input type="number" name="price" class="form-input" value="${event.price}" min="0" step="0.01" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Capacity</label>
                                        <input type="number" name="capacity" class="form-input" value="${event.capacity}" min="1" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Event Image (optional)</label>
                                        <input type="file" name="image" class="form-input" accept="image/*">
                                        <small class="text-light">Upload a new image to change it</small>
                                        ${event.image ? `<p class="mt-2"><img src="${event.image}" alt="Event" style="max-width: 200px; max-height: 200px;"></p>` : ''}
                                    </div>
                                    <div class="form-group flex gap-2">
                                        <button type="submit" class="btn btn-primary flex-1">Update Event</button>
                                        <button type="button" class="btn btn-secondary flex-1" onclick="app.viewMyEvents()">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        } catch (error) {
            this.showNotification('Failed to load event for editing', 'error');
        }
    }

    async deleteEvent(eventId) {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                await this.apiRequest(`/events/${eventId}`, {
                    method: 'DELETE',
                });
                this.showNotification('Event deleted successfully!', 'success');
                this.viewMyEvents(); // Refresh the list
            } catch (error) {
                this.showNotification('Failed to delete event', 'error');
            }
        }
    }

    downloadTicket(ticketId, eventTitle, ticketNumber) {
        // Create a professional ticket HTML
        const ticketHTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; padding: 20px; }
        .ticket-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .ticket-header {
            background: linear-gradient(135deg, #4f46e5, #3730a3);
            padding: 30px;
            text-align: center;
            border-bottom: 3px dashed rgba(255,255,255,0.3);
        }
        .ticket-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .ticket-header p {
            font-size: 14px;
            opacity: 0.9;
        }
        .ticket-body {
            padding: 40px 30px;
        }
        .ticket-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .ticket-row:last-child {
            border-bottom: none;
        }
        .ticket-label {
            font-size: 12px;
            text-transform: uppercase;
            opacity: 0.8;
            letter-spacing: 1px;
        }
        .ticket-value {
            font-size: 18px;
            font-weight: bold;
            text-align: right;
        }
        .ticket-number {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
        }
        .ticket-footer {
            background: rgba(0,0,0,0.1);
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            border-top: 3px dashed rgba(255,255,255,0.3);
        }
        .barcode {
            text-align: center;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            letter-spacing: 3px;
        }
        @media print {
            body { padding: 0; }
            .ticket-container { box-shadow: none; max-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="ticket-container">
        <div class="ticket-header">
            <h1>🎫 EVENT TICKET</h1>
            <p>Your admission pass to the event</p>
        </div>
        <div class="ticket-body">
            <div class="ticket-row">
                <div class="ticket-label">Event Name</div>
                <div class="ticket-value">${eventTitle}</div>
            </div>
            <div class="ticket-number">
                Ticket #${ticketNumber}
            </div>
            <div class="barcode">
                || |||| || || || ||||
            </div>
            <div class="ticket-row">
                <div class="ticket-label">Issued Date</div>
                <div class="ticket-value">${new Date().toLocaleDateString()}</div>
            </div>
            <div class="ticket-row">
                <div class="ticket-label">Issued Time</div>
                <div class="ticket-value">${new Date().toLocaleTimeString()}</div>
            </div>
        </div>
        <div class="ticket-footer">
            <p>✓ Please present this ticket at the venue entrance</p>
            <p>✓ One ticket per person - Not transferable</p>
            <p>✓ Keep this ticket safe and secure</p>
        </div>
    </div>
</body>
</html>
        `;

        // Create and download the HTML as a document
        const blob = new Blob([ticketHTML], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Ticket_${ticketNumber}_${new Date().getTime()}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        this.showNotification('Ticket downloaded successfully!', 'success');
    }

    downloadReceipt(ticketId, eventTitle, ticketNumber, totalPrice, phoneNumber) {
        // Create a professional receipt HTML
        const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; padding: 20px; }
        .receipt-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            color: #333;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .receipt-header {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .receipt-header h1 {
            font-size: 28px;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .receipt-header p {
            font-size: 13px;
            opacity: 0.9;
        }
        .receipt-body {
            padding: 30px;
        }
        .receipt-section {
            margin-bottom: 25px;
        }
        .receipt-section-title {
            font-size: 12px;
            text-transform: uppercase;
            color: #10b981;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
            letter-spacing: 1px;
        }
        .receipt-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
        }
        .receipt-label {
            font-weight: 600;
            color: #555;
        }
        .receipt-value {
            text-align: right;
            color: #333;
        }
        .receipt-row.total {
            background: linear-gradient(135deg, #f0fdf4, #dcfce7);
            padding: 12px;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 15px;
        }
        .receipt-row.total .receipt-label {
            color: #059669;
        }
        .receipt-row.total .receipt-value {
            color: #059669;
            font-size: 18px;
            font-weight: bold;
        }
        .receipt-footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e5e7eb;
        }
        .receipt-confirmation {
            text-align: center;
            padding: 20px;
            background: #dcfce7;
            color: #059669;
            font-weight: bold;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .receipt-id {
            text-align: center;
            font-size: 11px;
            color: #999;
            margin-top: 10px;
            font-family: 'Courier New', monospace;
        }
        @media print {
            body { padding: 0; }
            .receipt-container { box-shadow: none; max-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="receipt-header">
            <h1>✓ PAYMENT RECEIPT</h1>
            <p>Official transaction receipt</p>
        </div>
        <div class="receipt-body">
            <div class="receipt-confirmation">
                ✓ PAYMENT SUCCESSFUL
            </div>
            
            <div class="receipt-section">
                <div class="receipt-section-title">Event Information</div>
                <div class="receipt-row">
                    <span class="receipt-label">Event Name:</span>
                    <span class="receipt-value">${eventTitle}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Ticket Number:</span>
                    <span class="receipt-value">#${ticketNumber}</span>
                </div>
            </div>
            
            <div class="receipt-section">
                <div class="receipt-section-title">Payment Details</div>
                <div class="receipt-row">
                    <span class="receipt-label">Amount Paid:</span>
                    <span class="receipt-value">${this.formatCurrency(totalPrice)}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Payment Method:</span>
                    <span class="receipt-value">M-Pesa</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Phone Number:</span>
                    <span class="receipt-value">${phoneNumber}</span>
                </div>
                <div class="receipt-row total">
                    <span class="receipt-label">Total Amount:</span>
                    <span class="receipt-value">$${totalPrice.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="receipt-section">
                <div class="receipt-section-title">Transaction Information</div>
                <div class="receipt-row">
                    <span class="receipt-label">Date:</span>
                    <span class="receipt-value">${new Date().toLocaleDateString()}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Time:</span>
                    <span class="receipt-value">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Status:</span>
                    <span class="receipt-value" style="color: #10b981; font-weight: bold;">COMPLETED</span>
                </div>
            </div>
        </div>
        <div class="receipt-footer">
            <p>Thank you for your purchase!</p>
            <p>Keep this receipt for your records.</p>
            <p>For support, contact our customer service team.</p>
            <div class="receipt-id">Receipt ID: ${ticketId}</div>
        </div>
    </div>
</body>
</html>
        `;

        // Create and download the HTML as a document
        const blob = new Blob([receiptHTML], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Receipt_${ticketNumber}_${new Date().getTime()}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        this.showNotification('Receipt downloaded successfully!', 'success');
    }

    logout() {
        this.user = null;
        this.authToken = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.renderNavbar();
        this.navigateToPage('home');
        this.showNotification('Logged out successfully', 'success');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EventApp();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        window.app.navigateToPage(e.state.page);
    }
});