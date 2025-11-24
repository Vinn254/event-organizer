// Organizer Dashboard Page Component
class OrganizerPage {
    constructor(app) {
        this.app = app;
        this.events = [];
    }

    render() {
        if (!this.app.user || this.app.user.role !== 'organizer') {
            this.app.navigateToPage('home');
            return '';
        }

        return `
            <section class="main-content">
                <div class="mb-4">
                    <h2>Organizer Dashboard</h2>
                    <p>Create and manage your events professionally</p>
                </div>

                <div class="organizer-actions mb-4">
                    <button class="btn btn-primary" onclick="app.showCreateEventForm()">
                        <i class="fas fa-plus-circle"></i> Create New Event
                    </button>
                    <button class="btn btn-outline" onclick="app.viewAnalytics()">
                        <i class="fas fa-chart-bar"></i> View Analytics
                    </button>
                    <button class="btn btn-outline" onclick="app.viewTickets()">
                        <i class="fas fa-ticket-alt"></i> View Tickets
                    </button>
                </div>

                <div class="grid grid-2">
                    <div class="card organizer-card fade-in">
                        <div class="card-body">
                            <h3>
                                <i class="fas fa-calendar-alt text-primary"></i> My Events
                            </h3>
                            <p>Manage your created events, update details, and track attendance</p>
                            <div class="event-stats mt-3">
                                <div class="stat-item">
                                    <span class="stat-number" id="totalEvents">0</span>
                                    <span class="stat-label">Total Events</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number" id="activeEvents">0</span>
                                    <span class="stat-label">Active Events</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number" id="totalAttendees">0</span>
                                    <span class="stat-label">Total Attendees</span>
                                </div>
                            </div>
                            <button class="btn btn-secondary mt-3" onclick="app.viewMyEvents()">
                                <i class="fas fa-list"></i> View All Events
                            </button>
                        </div>
                    </div>

                    <div class="card organizer-card fade-in">
                        <div class="card-body">
                            <h3>
                                <i class="fas fa-chart-line text-secondary"></i> Performance Analytics
                            </h3>
                            <p>Track your event performance, revenue, and audience engagement</p>
                            <div class="analytics-preview mt-3">
                                <div class="metric">
                                    <div class="metric-value" id="totalRevenue">$0</div>
                                    <div class="metric-label">Total Revenue</div>
                                </div>
                                <div class="metric">
                                    <div class="metric-value" id="avgRating">0.0</div>
                                    <div class="metric-label">Average Rating</div>
                                </div>
                            </div>
                            <button class="btn btn-secondary mt-3" onclick="app.viewAnalytics()">
                                <i class="fas fa-chart-bar"></i> View Analytics
                            </button>
                        </div>
                    </div>
                </div>

                <div class="recent-activity mt-4">
                    <h3>Recent Activity</h3>
                    <div class="activity-list" id="recentActivity">
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-spinner fa-spin"></i>
                            </div>
                            <div class="activity-content">
                                <p>Loading recent activity...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    afterRender() {
        this.loadOrganizerStats();
        this.loadRecentActivity();
    }

    async loadOrganizerStats() {
        try {
            // Load organizer's events
            const eventsResponse = await this.app.apiRequest('/events/my-events');
            this.events = eventsResponse;

            document.getElementById('totalEvents').textContent = this.events.length;

            const activeEvents = this.events.filter(event =>
                new Date(event.date) > new Date()
            );
            document.getElementById('activeEvents').textContent = activeEvents.length;

            // Calculate total attendees
            const totalAttendees = this.events.reduce((sum, event) =>
                sum + (event.attendees || 0), 0
            );
            document.getElementById('totalAttendees').textContent = totalAttendees;

            // Calculate total revenue
            const totalRevenue = this.events.reduce((sum, event) =>
                sum + (event.revenue || 0), 0
            );
            document.getElementById('totalRevenue').textContent = `$${totalRevenue}`;

            // Calculate average rating
            const ratedEvents = this.events.filter(event => event.rating);
            const avgRating = ratedEvents.length > 0
                ? (ratedEvents.reduce((sum, event) => sum + event.rating, 0) / ratedEvents.length).toFixed(1)
                : '0.0';
            document.getElementById('avgRating').textContent = avgRating;

        } catch (error) {
            console.error('Failed to load organizer stats:', error);
        }
    }

    async loadRecentActivity() {
        try {
            const activityResponse = await this.app.apiRequest('/organizer/activity');
            const activityList = document.getElementById('recentActivity');

            if (activityResponse.length === 0) {
                activityList.innerHTML = `
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-info-circle text-secondary"></i>
                        </div>
                        <div class="activity-content">
                            <p>No recent activity</p>
                            <small class="text-light">Create your first event to get started</small>
                        </div>
                    </div>
                `;
                return;
            }

            activityList.innerHTML = activityResponse.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${this.getActivityIcon(activity.type)} text-primary"></i>
                    </div>
                    <div class="activity-content">
                        <p>${activity.message}</p>
                        <small class="text-light">${new Date(activity.timestamp).toLocaleDateString()}</small>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Failed to load recent activity:', error);
            document.getElementById('recentActivity').innerHTML = `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas fa-exclamation-triangle text-warning"></i>
                    </div>
                    <div class="activity-content">
                        <p>Failed to load activity</p>
                        <small class="text-light">Please try again later</small>
                    </div>
                </div>
            `;
        }
    }

    getActivityIcon(type) {
        const icons = {
            'event_created': 'fa-plus-circle',
            'event_updated': 'fa-edit',
            'ticket_sold': 'fa-ticket-alt',
            'payment_received': 'fa-dollar-sign',
            'event_cancelled': 'fa-times-circle'
        };
        return icons[type] || 'fa-info-circle';
    }
}