// Dashboard Page Component
class DashboardPage {
    constructor(app) {
        this.app = app;
    }

    render() {
        if (!this.app.user) {
            this.app.navigateToPage('login');
            return '';
        }

        return `
            <section class="main-content">
                <div class="mb-4">
                    <h2>Welcome back, ${this.app.user.name}!</h2>
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

                <div class="dashboard-stats mt-4">
                    <div class="grid grid-4">
                        <div class="stat-card">
                            <div class="stat-number" id="totalTickets">0</div>
                            <div class="stat-label">Total Tickets</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="upcomingEvents">0</div>
                            <div class="stat-label">Upcoming Events</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="totalSpent">$0</div>
                            <div class="stat-label">Total Spent</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="accountAge">0</div>
                            <div class="stat-label">Account Age (days)</div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    afterRender() {
        this.loadDashboardStats();
    }

    async loadDashboardStats() {
        try {
            // Load user tickets
            const ticketsResponse = await this.app.apiRequest('/tickets/my-tickets');
            document.getElementById('totalTickets').textContent = ticketsResponse.length;

            // Load upcoming events count
            const eventsResponse = await this.app.apiRequest('/events');
            const upcomingEvents = eventsResponse.filter(event =>
                new Date(event.date) > new Date()
            );
            document.getElementById('upcomingEvents').textContent = upcomingEvents.length;

            // Load transaction total
            const transactionsResponse = await this.app.apiRequest('/transactions');
            const totalSpent = transactionsResponse.reduce((sum, transaction) =>
                sum + transaction.amount, 0
            );
            document.getElementById('totalSpent').textContent = `$${totalSpent}`;

            // Calculate account age
            const accountCreated = new Date(this.app.user.createdAt);
            const today = new Date();
            const accountAge = Math.floor((today - accountCreated) / (1000 * 60 * 60 * 24));
            document.getElementById('accountAge').textContent = accountAge;

        } catch (error) {
            console.error('Failed to load dashboard stats:', error);
        }
    }
}