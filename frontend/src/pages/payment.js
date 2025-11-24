// Payment Page Component
class PaymentPage {
    constructor(app) {
        this.app = app;
        this.eventData = null;
        this.bookingData = null;
    }

    render() {
        if (!this.bookingData) {
            return this.renderError('No booking data found. Please try booking again.');
        }

        const event = this.eventData;
        const booking = this.bookingData;

        return `
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card payment-card fade-in">
                        <div class="card-header">
                            <h3>
                                <i class="fas fa-credit-card text-primary"></i> Complete Your Payment
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="payment-details mb-4">
                                <h4>Booking Summary</h4>
                                <div class="booking-info">
                                    <div class="info-row">
                                        <span class="label">Event:</span>
                                        <span class="value">${event.title}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="label">Date:</span>
                                        <span class="value">${new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="label">Time:</span>
                                        <span class="value">${event.time}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="label">Location:</span>
                                        <span class="value">${event.location}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="label">Tickets:</span>
                                        <span class="value">${booking.quantity}</span>
                                    </div>
                                    <div class="info-row total-row">
                                        <span class="label">Total Amount:</span>
                                        <span class="value total-amount">$${booking.totalAmount}</span>
                                    </div>
                                </div>
                            </div>

                            <form id="payment-form" class="payment-form">
                                <div class="payment-method">
                                    <h4>Payment Method</h4>
                                    <div class="method-selector">
                                        <div class="method-option active" data-method="mpesa">
                                            <div class="method-icon">
                                                <i class="fas fa-mobile-alt"></i>
                                            </div>
                                            <div class="method-details">
                                                <div class="method-name">M-Pesa</div>
                                                <div class="method-desc">Pay with your M-Pesa mobile money</div>
                                            </div>
                                            <div class="method-check">
                                                <i class="fas fa-check"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">
                                        <i class="fas fa-phone"></i> M-Pesa Phone Number
                                    </label>
                                    <input type="tel" name="phoneNumber" class="form-input"
                                           placeholder="254XXXXXXXXX" required
                                           pattern="^254[0-9]{9}$"
                                           title="Please enter a valid Kenyan phone number starting with 254">
                                    <small class="form-help">Enter your M-Pesa registered phone number</small>
                                </div>

                                <div class="payment-notice">
                                    <div class="notice-icon">
                                        <i class="fas fa-info-circle"></i>
                                    </div>
                                    <div class="notice-content">
                                        <p><strong>Important:</strong> You will receive an M-Pesa prompt on your phone. Enter your PIN to complete the payment.</p>
                                        <p>Payment is processed securely through M-Pesa's systems.</p>
                                    </div>
                                </div>

                                <div class="payment-actions">
                                    <button type="button" class="btn btn-outline" onclick="paymentPage.goBack()">
                                        <i class="fas fa-arrow-left"></i> Back to Event
                                    </button>
                                    <button type="submit" class="btn btn-success w-full">
                                        <i class="fas fa-mobile-alt"></i> Pay with M-Pesa
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="card payment-summary fade-in">
                        <div class="card-body text-center">
                            <div class="summary-icon mb-3">
                                <i class="fas fa-shield-alt fa-4x text-success"></i>
                            </div>
                            <h3>Secure Payment</h3>
                            <p>Your payment is processed securely through M-Pesa's trusted platform.</p>

                            <div class="security-features mt-4">
                                <div class="feature-item">
                                    <i class="fas fa-lock text-primary"></i>
                                    <span>SSL Encrypted</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-mobile text-success"></i>
                                    <span>Mobile Money</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-check-circle text-accent"></i>
                                    <span>Instant Confirmation</span>
                                </div>
                            </div>

                            <div class="payment-promise mt-4">
                                <h4>Our Promise</h4>
                                <ul class="promise-list">
                                    <li>✓ Secure transaction processing</li>
                                    <li>✓ Instant ticket delivery</li>
                                    <li>✓ 24/7 customer support</li>
                                    <li>✓ Refund guarantee</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    afterRender() {
        window.paymentPage = this;
        this.setupPaymentForm();
    }

    setBookingData(eventData, bookingData) {
        this.eventData = eventData;
        this.bookingData = bookingData;
    }

    setupPaymentForm() {
        const form = document.getElementById('payment-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processPayment(e.target);
            });
        }
    }

    async processPayment(form) {
        const formData = new FormData(form);
        const paymentData = {
            phoneNumber: formData.get('phoneNumber'),
            bookingId: this.bookingData.id,
            amount: this.bookingData.totalAmount
        };

        try {
            // Show processing state
            this.showProcessingState();

            const response = await this.app.apiRequest('/payments/initiate', {
                method: 'POST',
                body: JSON.stringify(paymentData)
            });

            // Show success state
            this.showSuccessState(response);

        } catch (error) {
            console.error('Payment failed:', error);
            this.showErrorState(error.message || 'Payment failed. Please try again.');
        }
    }

    showProcessingState() {
        const form = document.getElementById('payment-form');
        const submitBtn = form.querySelector('button[type="submit"]');

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';

        // Disable form inputs
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.disabled = true);
    }

    showSuccessState(response) {
        const mainContent = document.getElementById('main-content');

        mainContent.innerHTML = `
            <section class="main-content">
                <div class="payment-success">
                    <div class="success-card card fade-in">
                        <div class="card-body text-center">
                            <div class="success-icon mb-4">
                                <i class="fas fa-check-circle fa-5x text-success"></i>
                            </div>
                            <h2 class="text-success mb-3">Payment Successful!</h2>
                            <p class="mb-4">Your tickets have been booked successfully. Check your M-Pesa messages for confirmation.</p>

                            <div class="booking-details mb-4">
                                <h4>Booking Details</h4>
                                <div class="details-grid">
                                    <div class="detail-item">
                                        <span class="label">Booking ID:</span>
                                        <span class="value">${response.bookingId || 'N/A'}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="label">Amount Paid:</span>
                                        <span class="value">$${this.bookingData.totalAmount}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="label">Tickets:</span>
                                        <span class="value">${this.bookingData.quantity}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="label">Event:</span>
                                        <span class="value">${this.eventData.title}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="success-actions">
                                <button class="btn btn-primary" onclick="app.viewMyTickets()">
                                    <i class="fas fa-ticket-alt"></i> View My Tickets
                                </button>
                                <button class="btn btn-outline" onclick="app.navigateToPage('events')">
                                    <i class="fas fa-calendar"></i> Browse More Events
                                </button>
                            </div>

                            <div class="next-steps mt-4">
                                <h4>What happens next?</h4>
                                <div class="steps">
                                    <div class="step">
                                        <i class="fas fa-envelope text-primary"></i>
                                        <span>You'll receive ticket details via email/SMS</span>
                                    </div>
                                    <div class="step">
                                        <i class="fas fa-mobile text-success"></i>
                                        <span>M-Pesa confirmation sent to your phone</span>
                                    </div>
                                    <div class="step">
                                        <i class="fas fa-calendar-check text-accent"></i>
                                        <span>Add to calendar and enjoy the event!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.app.showNotification('Payment completed successfully!', 'success');
    }

    showErrorState(message) {
        const form = document.getElementById('payment-form');
        const submitBtn = form.querySelector('button[type="submit"]');

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-mobile-alt"></i> Pay with M-Pesa';

        // Re-enable form inputs
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.disabled = false);

        this.app.showNotification(message, 'error');
    }

    renderError(message) {
        return `
            <section class="main-content">
                <div class="error-card card fade-in">
                    <div class="card-body text-center">
                        <div class="error-icon mb-4">
                            <i class="fas fa-exclamation-triangle fa-4x text-danger"></i>
                        </div>
                        <h3 class="text-danger mb-3">Payment Error</h3>
                        <p class="mb-4">${message}</p>
                        <button class="btn btn-primary" onclick="app.navigateToPage('events')">
                            <i class="fas fa-arrow-left"></i> Back to Events
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    goBack() {
        // Navigate back to the event details or events page
        if (this.eventData && this.eventData._id) {
            // Ideally, we'd navigate to event details, but for now go to events
            this.app.navigateToPage('events');
        } else {
            this.app.navigateToPage('events');
        }
    }
}