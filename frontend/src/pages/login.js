// Login Page Component
import img1 from '../assets/img1.jpg';

class LoginPage {
    constructor(app) {
        this.app = app;
        this.showOTPForm = false;
        this.pendingUser = null;
    }

    render() {
        return `
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card login-card fade-in">
                        <div class="card-header">
                            <h3>
                                <i class="fas fa-sign-in-alt text-primary"></i>
                                ${this.showOTPForm ? 'Verify Your Account' : 'Login to Your Account'}
                            </h3>
                        </div>
                        <div class="card-body">
                            ${this.showOTPForm ? this.renderOTPForm() : this.renderLoginForm()}
                        </div>
                    </div>

                    <div class="card welcome-card fade-in">
                        <div class="card-body text-center">
                            <h3>Welcome Back!</h3>
                            <p>Sign in to access your dashboard and manage your events.</p>

                            <div class="features-list mt-4">
                                <div class="feature-item">
                                    <i class="fas fa-tachometer-alt text-primary"></i>
                                    <span>Access your dashboard</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-ticket-alt text-secondary"></i>
                                    <span>Manage your tickets</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-calendar-plus text-accent"></i>
                                    <span>Create new events</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-history text-success"></i>
                                    <span>View transaction history</span>
                                </div>
                            </div>

                            <div class="mt-4">
                                <img src="${img1}" alt="Welcome Back" class="auth-image">
                            </div>

                            <div class="register-prompt mt-4">
                                <p>Don't have an account?
                                    <a href="#" data-page="register" class="auth-link">Register here</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderLoginForm() {
        return `
            <form id="login-form">
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-envelope"></i> Email Address
                    </label>
                    <input type="email" name="email" class="form-input" required
                           placeholder="Enter your email address">
                </div>

                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-lock"></i> Password
                    </label>
                    <div class="password-input-container">
                        <input type="password" name="password" class="form-input" required
                               placeholder="Enter your password" id="password-input">
                        <button type="button" class="password-toggle" onclick="loginPage.togglePassword()">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>

                <div class="form-options">
                    <label class="checkbox-label">
                        <input type="checkbox" name="remember">
                        <span>Remember me</span>
                    </label>
                    <a href="#" class="forgot-password" onclick="loginPage.forgotPassword()">Forgot password?</a>
                </div>

                <button type="submit" class="btn btn-primary w-full">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>

                <div class="divider">
                    <span>or</span>
                </div>

                <div class="social-login">
                    <button type="button" class="social-btn btn btn-outline" onclick="loginPage.loginWithGoogle()">
                        <i class="fab fa-google"></i> Continue with Google
                    </button>
                </div>
            </form>
        `;
    }

    renderOTPForm() {
        const email = this.pendingUser?.email || '';

        return `
            <div class="otp-verification">
                <div class="verification-notice mb-4">
                    <i class="fas fa-shield-alt fa-2x text-warning mb-3"></i>
                    <p>Your account needs verification. We've sent a code to:</p>
                    <div class="contact-display">
                        <strong>${email}</strong>
                    </div>
                    <p class="text-light mt-2">Please enter the verification code to continue.</p>
                </div>

                <form id="otp-form">
                    <input type="hidden" name="email" value="${email}">

                    <div class="form-group">
                        <label class="form-label">
                            <i class="fas fa-key"></i> Verification Code
                        </label>
                        <input type="text" name="otp" class="form-input" required
                               maxlength="6" placeholder="Enter 6-digit code"
                               pattern="[0-9]{6}" title="Please enter a valid 6-digit code">
                        <small class="form-help">Check your email for the verification code</small>
                    </div>

                    <div class="otp-actions">
                        <button type="button" class="btn btn-outline" onclick="loginPage.resendOTP()">
                            <i class="fas fa-redo"></i> Resend Code
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-check"></i> Verify & Login
                        </button>
                    </div>

                    <div class="otp-footer mt-3">
                        <p class="text-light">
                            <a href="#" onclick="loginPage.backToLogin()">← Back to login</a>
                        </p>
                    </div>
                </form>
            </div>
        `;
    }

    afterRender() {
        window.loginPage = this;
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (!this.showOTPForm) {
            const form = document.getElementById('login-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleLogin(e.target);
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

    async handleLogin(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            this.showLoadingState(form);

            const response = await this.app.apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            // Check if user needs verification
            if (response.requiresVerification) {
                this.pendingUser = response.user;
                this.showOTPForm = true;
                this.app.showNotification('Please verify your account first.', 'info');
                this.renderPage();
                return;
            }

            // Successful login
            this.app.user = response.user;
            this.app.setAuthToken(response.token);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            this.app.showNotification('Login successful!', 'success');
            this.app.renderNavbar();
            this.app.navigateToPage('dashboard');

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

            this.app.showNotification('Account verified and login successful!', 'success');
            this.app.renderNavbar();
            this.app.navigateToPage('dashboard');

        } catch (error) {
            this.resetFormState(form);
        }
    }

    async resendOTP() {
        if (!this.pendingUser?.email) return;

        try {
            await this.app.apiRequest('/auth/resend-otp', {
                method: 'POST',
                body: JSON.stringify({
                    email: this.pendingUser.email,
                    method: 'email'
                }),
            });

            this.app.showNotification('Verification code sent successfully!', 'success');
        } catch (error) {
            // Error already handled in apiRequest
        }
    }

    backToLogin() {
        this.showOTPForm = false;
        this.pendingUser = null;
        this.renderPage();
    }

    togglePassword() {
        const passwordInput = document.getElementById('password-input');
        const toggleBtn = document.querySelector('.password-toggle i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.classList.remove('fa-eye');
            toggleBtn.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleBtn.classList.remove('fa-eye-slash');
            toggleBtn.classList.add('fa-eye');
        }
    }

    forgotPassword() {
        // For now, just show a notification
        this.app.showNotification('Password reset functionality coming soon. Please contact support.', 'info');
    }

    loginWithGoogle() {
        // For now, just show a notification
        this.app.showNotification('Google login functionality coming soon.', 'info');
    }

    renderPage() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = this.render();
        this.afterRender();
    }

    showLoadingState(form, text = 'Logging in...') {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;

        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.disabled = true);
    }

    resetFormState(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = this.showOTPForm ?
            '<i class="fas fa-check"></i> Verify & Login' :
            '<i class="fas fa-sign-in-alt"></i> Login';

        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.disabled = false);
    }
}