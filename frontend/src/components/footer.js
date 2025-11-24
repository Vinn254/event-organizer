// Footer Component
class Footer {
    constructor(app) {
        this.app = app;
    }

    render() {
        return `
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-grid">
                        <div class="footer-section">
                            <h3>
                                <i class="fas fa-calendar-alt"></i> EventHub
                            </h3>
                            <p>Your premier event management platform for creating unforgettable experiences. Connect with organizers, discover amazing events, and book tickets seamlessly.</p>
                            <div class="social-links">
                                <a href="#" class="social-link" aria-label="Facebook">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" class="social-link" aria-label="Twitter">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="social-link" aria-label="Instagram">
                                    <i class="fab fa-instagram"></i>
                                </a>
                                <a href="#" class="social-link" aria-label="LinkedIn">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>

                        <div class="footer-section">
                            <h3>Quick Links</h3>
                            <a href="#" data-page="home">
                                <i class="fas fa-home"></i> Home
                            </a>
                            <a href="#" data-page="events">
                                <i class="fas fa-calendar"></i> Events
                            </a>
                            <a href="#" data-page="about">
                                <i class="fas fa-info-circle"></i> About Us
                            </a>
                            <a href="#" data-page="contact">
                                <i class="fas fa-envelope"></i> Contact
                            </a>
                        </div>

                        <div class="footer-section">
                            <h3>For Users</h3>
                            <a href="#" data-page="how-it-works">
                                <i class="fas fa-question-circle"></i> How It Works
                            </a>
                            <a href="#" data-page="faq">
                                <i class="fas fa-question"></i> FAQ
                            </a>
                            <a href="#" data-page="support">
                                <i class="fas fa-headset"></i> Support
                            </a>
                            <a href="#" data-page="feedback">
                                <i class="fas fa-comments"></i> Feedback
                            </a>
                        </div>

                        <div class="footer-section">
                            <h3>For Organizers</h3>
                            <a href="#" data-page="create-event">
                                <i class="fas fa-plus-circle"></i> Create Event
                            </a>
                            <a href="#" data-page="organizer-guide">
                                <i class="fas fa-book"></i> Organizer Guide
                            </a>
                            <a href="#" data-page="pricing">
                                <i class="fas fa-dollar-sign"></i> Pricing
                            </a>
                            <a href="#" data-page="resources">
                                <i class="fas fa-tools"></i> Resources
                            </a>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <div class="footer-bottom-content">
                            <p>&copy; 2024 EventHub. All rights reserved.</p>
                            <div class="footer-links">
                                <a href="#" data-page="privacy">
                                    <i class="fas fa-shield-alt"></i> Privacy Policy
                                </a>
                                <span class="separator">|</span>
                                <a href="#" data-page="terms">
                                    <i class="fas fa-file-contract"></i> Terms of Service
                                </a>
                                <span class="separator">|</span>
                                <a href="#" data-page="cookies">
                                    <i class="fas fa-cookie-bite"></i> Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    update() {
        const footerElement = document.getElementById('footer');
        footerElement.innerHTML = this.render();
    }
}