// Register Page Component
import img2 from '../assets/img2.jpg';

class RegisterPage {
    constructor(app) {
        this.app = app;
        this.otpSent = false;
        this.userData = null;
    }

    render() {
        return `
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card register-card fade-in">
                        <div class="card-header">
                            <h3>
                                <i class="fas fa-user-plus text-primary"></i>
                                ${this.otpSent ? 'Verify Your Account' : 'Create Your Account'}
                            </h3>
                        </div>
                        <div class="card-body">
                            ${this.otpSent ? this.renderOTPForm() : this.renderRegistrationForm()}
                        </div>
                    </div>

                    <div class="card welcome-card fade-in">
                        <div class="card-body text-center">
                            <h3>Join EventHub Today!</h3>
                            <p>Create events, book tickets, and connect with amazing communities.</p>

                            <div class="features-list mt-4">
                                <div class="feature-item">
                                    <i class="fas fa-calendar-plus text-primary"></i>
                                    <span>Create & manage events</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-ticket-alt text-secondary"></i>
                                    <span>Book tickets instantly</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-users text-accent"></i>
                                    <span>Connect with communities</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-mobile-alt text-success"></i>
                                    <span>Mobile-friendly experience</span>
                                </div>
                            </div>

                            <div class="mt-4">
                                <img src="${img2}" alt="Join EventHub Today" class="auth-image">
                            </div>

                            <div class="login-prompt mt-4">
                                <p>Already have an account?
                                    <a href="#" data-page="login" class="auth-link">Login here</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderRegistrationForm() {
        return `
            <form id="register-form">
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-user"></i> Full Name
                    </label>
                    <input type="text" name="name" class="form-input" required
                           placeholder="Enter your full name">
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-envelope"></i> Email Address
                    </label>
                    <input type="email" name="email" class="form-input" required
                           placeholder="Enter your email address">
                    <small class="form-help">We'll send your verification code here</small>
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-phone"></i> Phone Number
                    </label>
                    <input type="tel" name="phone" class="form-input" required
                           placeholder="254XXXXXXXXX"
                           pattern="^254[0-9]{9}$"
                           title="Please enter a valid Kenyan phone number starting with 254">
                    <small class="form-help">For SMS notifications and M-Pesa payments</small>
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-lock"></i> Password
                    </label>
                    <input type="password" name="password" class="form-input" required
                           placeholder="Create a strong password"
                           minlength="6">
                    <small class="form-help">Minimum 6 characters</small>
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-user-tag"></i> Account Type
                    </label>
                    <select name="role" class="form-input" required>
                        <option value="user">Regular User - Book and attend events</option>
                        <option value="organizer">Event Organizer - Create and manage events</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-bell"></i> How would you like to receive your verification code?
                    </label>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input type="radio" name="otpMethod" value="email" checked>
                            <span><i class="fas fa-envelope"></i> Email</span>
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="otpMethod" value="sms">
                            <span><i class="fas fa-sms"></i> SMS</span>
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" name="terms" required>
                        <span>I agree to the <a href="#" data-page="terms" target="_blank">Terms of Service</a> and <a href="#" data-page="privacy" target="_blank">Privacy Policy</a></span>
                    </label>
                </div>

                <button type="submit" class="btn btn-primary w-full">
                    <i class="fas fa-user-plus"></i> Create Account
                </button>
            </form>
        `;
    }

    renderOTPForm() {
        const otpMethod = this.userData?.otpMethod || 'email';
        const contactInfo = otpMethod === 'email' ? this.userData?.email : this.userData?.phone;

        return `
            <div class="otp-verification">
                <div class="verification-notice mb-4">
                    <i class="fas fa-envelope-open-text fa-2x text-primary mb-3"></i>
                    <p>We've sent a verification code to your ${otpMethod}:</p>
                    <div class="contact-display">
                        <strong>${contactInfo}</strong>
                    </div>
                    <p class="text-light mt-2">Please enter the code below to complete your registration.</p>
                </div>

                <form id="otp-form">
                    <input type="hidden" name="email" value="${this.userData?.email || ''}">

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-key"></i> Verification Code
                        </label>
                        <input type="text" name="otp" class="form-input" required
                               maxlength="6" placeholder="Enter 6-digit code"
                               pattern="[0-9]{6}" title="Please enter a valid 6-digit code">
                        <small class="form-help">Check your ${otpMethod} for the verification code</small>
                    </div>

                    <div class="otp-actions">
                        <button type="button" class="btn btn-outline" onclick="registerPage.resendOTP()">
                            <i class="fas fa-redo"></i> Resend Code
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-check"></i> Verify Account
                        </button>
                    </div>

                    <div class="otp-footer mt-3">
                        <p class="text-light">
                            Didn't receive the code?
                            <a href="#" onclick="registerPage.changeMethod()">Try different method</a>
                        </p>
                    </div>
                </form>
            </div>
        `;
    }

    afterRender() {
        window.registerPage = this;
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (!this.otpSent) {
            const form = document.getElementById('register-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleRegistration(e.target);
                });
            }
        } else {
            const form = document.getElementById('otp-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleOTPVerification(e.target);
                });
            }
        }
    }

    async handleRegistration(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Remove the terms checkbox from data
        delete data.terms;

        try {
            this.showLoadingState(form);

            const response = await this.app.apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            this.userData = data;
            this.otpSent = true;

            this.app.showNotification('Registration successful! Please check your verification code.', 'success');

            // Re-render with OTP form
            this.renderPage();

        } catch (error) {
            this.resetFormState(form);
        }
    }

    async handleOTPVerification(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            this.showLoadingState(form, 'Verifying...');

            const response = await this.app.apiRequest('/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            this.app.user = response.user;
            this.app.setAuthToken(response.token);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            this.app.showNotification('Account verified successfully! Welcome to EventHub!', 'success');
            this.app.renderNavbar();
            this.app.navigateToPage('dashboard');

        } catch (error) {
            this.resetFormState(form);
        }
    }

    async resendOTP() {
        if (!this.userData) return;

        try {
            const response = await this.app.apiRequest('/auth/resend-otp', {
                method: 'POST',
                body: JSON.stringify({
                    email: this.userData.email,
                    method: this.userData.otpMethod
                }),
            });

            this.app.showNotification('Verification code sent successfully!', 'success');
        } catch (error) {
            // Error already handled in apiRequest
        }
    }

    changeMethod() {
        // Reset to registration form to allow changing OTP method
        this.otpSent = false;
        this.renderPage();
    }

    renderPage() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = this.render();
        this.afterRender();
    }

    showLoadingState(form, text = 'Creating Account...') {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;

        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => input.disabled = true);
    }

    resetFormState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = this.otpSent ?
            '<i class="fas fa-check"></i> Verify Account' :
            '<i class="fas fa-user-plus"></i> Create Account';

        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => input.disabled = false);
    }
}