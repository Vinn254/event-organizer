// Home Page Component
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.PNG';

export class HomePage {
    constructor(app) {
        this.app = app;
    }

    render() {
        return `
            <section class="hero-section fade-in">
                <div class="hero-container">
                    <div class="hero-blue-box">
                        <div class="hero-content">
                            <h1 class="hero-title">
                                <i class="fas fa-calendar-alt"></i> Discover Amazing Events
                            </h1>
                            <p class="hero-subtitle">
                                Find and book tickets for the best events in your area. Connect with communities and create unforgettable memories.
                            </p>
                            <div class="hero-actions">
                                <a href="#" class="btn btn-orange-green btn-lg pulse" data-page="events">
                                    <i class="fas fa-search"></i> Explore Events
                                </a>
                                ${!this.app.user ? `
                                    <a href="#" class="btn btn-outline-orange-green btn-lg" data-page="register">
                                        <i class="fas fa-rocket"></i> Get Started
                                    </a>
                                ` : `
                                    <a href="#" class="btn btn-secondary btn-lg" data-page="organizer">
                                        <i class="fas fa-plus-circle"></i> Create Event
                                    </a>
                                `}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features-section">
                <div class="main-content">
                    <div class="section-header text-center mb-4">
                        <h2>Why Choose EventHub?</h2>
                        <p>Experience the future of event management with our cutting-edge platform</p>
                    </div>

                    <div class="grid grid-3">
                        <div class="card feature-card feature-booking fade-in">
                            <div class="card-body text-center">
                                <div class="feature-icon">
                                    <i class="fas fa-ticket-alt fa-3x"></i>
                                </div>
                                <h3>Easy Booking</h3>
                                <p>Book tickets in seconds with our optimized platform. No more waiting in lines or complicated processes.</p>
                            </div>
                        </div>

                        <div class="card feature-card feature-community fade-in">
                            <div class="card-body text-center">
                                <div class="feature-icon">
                                    <i class="fas fa-users fa-3x"></i>
                                </div>
                                <h3>Community</h3>
                                <p>Connect with event organizers and fellow attendees. Build lasting relationships through shared experiences.</p>
                            </div>
                        </div>

                        <div class="card feature-card feature-mobile fade-in">
                            <div class="card-body text-center">
                                <div class="feature-icon">
                                    <i class="fas fa-mobile-alt fa-3x"></i>
                                </div>
                                <h3>Mobile Friendly</h3>
                                <p>Access events and manage bookings on any device. Our responsive design works perfectly everywhere.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="testimonials-section">
                <div class="main-content">
                    <div class="section-header text-center mb-4">
                        <h2>What Our Users Say</h2>
                        <p>Real experiences from event organizers and attendees</p>
                    </div>

                    <div class="testimonials-container">
                        <div class="testimonials-slider">
                            <div class="testimonial-card">
                                <div class="testimonial-content">
                                    <img src="${img1}" alt="Sarah Johnson" class="testimonial-image" loading="lazy">
                                    <div class="testimonial-text">
                                        <p>"EventHub made organizing my tech conference seamless. The platform is intuitive and the support team is amazing!"</p>
                                        <cite>- Sarah Johnson, Tech Conference Organizer</cite>
                                    </div>
                                </div>
                            </div>
                            <div class="testimonial-card">
                                <div class="testimonial-content">
                                    <img src="${img2}" alt="Michael Chen" class="testimonial-image" loading="lazy">
                                    <div class="testimonial-text">
                                        <p>"As an attendee, I love how easy it is to discover and book events. The mobile experience is fantastic!"</p>
                                        <cite>- Michael Chen, Event Attendee</cite>
                                    </div>
                                </div>
                            </div>
                            <div class="testimonial-card">
                                <div class="testimonial-content">
                                    <img src="${img3}" alt="Emma Rodriguez" class="testimonial-image" loading="lazy">
                                    <div class="testimonial-text">
                                        <p>"The analytics and reporting features help me understand my audience better. Highly recommended for event organizers."</p>
                                        <cite>- Emma Rodriguez, Music Festival Organizer</cite>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="testimonials-stats">
                        <div class="stat-item">
                            <div class="stat-number">10,000+</div>
                            <div class="stat-label">Events Hosted</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">500,000+</div>
                            <div class="stat-label">Tickets Sold</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">50,000+</div>
                            <div class="stat-label">Happy Users</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">4.9/5</div>
                            <div class="stat-label">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="cta-section">
                <div class="main-content">
                    <div class="card cta-card fade-in">
                        <div class="card-body text-center">
                            <h3>Ready to Experience the Future of Events?</h3>
                            <p>Join thousands of users who trust EventHub for their event management needs.</p>
                            <div class="cta-buttons mt-3">
                                <a href="#" class="btn btn-primary" data-page="events">
                                    <i class="fas fa-calendar"></i> Browse Events
                                </a>
                                <a href="#" class="btn btn-outline" data-page="register">
                                    <i class="fas fa-user-plus"></i> Join Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    afterRender() {
        // Add any post-rendering logic here
        this.setupMobileMenu();
        this.addAnimations();
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.header-mobile-toggle');
        const nav = document.querySelector('.header-nav');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                toggle.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                    nav.classList.remove('active');
                    toggle.classList.remove('active');
                }
            });

            // Close menu when clicking a nav link
            const navLinks = nav.querySelectorAll('.header-nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('active');
                    toggle.classList.remove('active');
                });
            });
        }
    }

    addAnimations() {
        // Stagger animations for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }
}