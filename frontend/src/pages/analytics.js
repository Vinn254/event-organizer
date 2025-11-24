// Analytics Page Component
export class AnalyticsPage {
    constructor(app) {
        this.app = app;
    }

    render() {
        if (!this.app.user || (this.app.user.role !== 'organizer' && this.app.user.role !== 'admin')) {
            this.app.navigateToPage('home');
            return '';
        }

        return `
            <section class="main-content">
                <div class="mb-4">
                    <h2>Analytics Dashboard</h2>
                    <p>Comprehensive insights into event performance and platform metrics</p>
                </div>

                <div class="analytics-filters mb-4">
                    <div class="grid grid-3">
                        <div class="form-group">
                            <label class="form-label">Time Period</label>
                            <select id="analyticsPeriod" class="form-input">
                                <option value="all">All Time</option>
                                <option value="month">This Month</option>
                                <option value="week">This Week</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Event Type</label>
                            <select id="analyticsType" class="form-input">
                                <option value="all">All Events</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past Events</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary w-full" onclick="analyticsPage.refreshAnalytics()">
                                <i class="fas fa-refresh"></i> Refresh
                            </button>
                        </div>
                    </div>
                </div>

                <div class="loading-analytics text-center">
                    <div class="loading-spinner"></div>
                    <p>Loading analytics...</p>
                </div>

                <div class="analytics-content" id="analyticsContent" style="display: none;">
                    <!-- Analytics content will be loaded here -->
                </div>
            </section>
        `;
    }

    afterRender() {
        window.analyticsPage = this;
        this.loadAnalytics();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const periodSelect = document.getElementById('analyticsPeriod');
        const typeSelect = document.getElementById('analyticsType');

        periodSelect.addEventListener('change', () => this.loadAnalytics());
        typeSelect.addEventListener('change', () => this.loadAnalytics());
    }

    async loadAnalytics() {
        try {
            this.showLoading();

            const period = document.getElementById('analyticsPeriod').value;
            const type = document.getElementById('analyticsType').value;

            const endpoint = this.app.user.role === 'admin' ? '/admin/analytics' : '/events/analytics';
            const analytics = await this.app.apiRequest(`${endpoint}?period=${period}&type=${type}`);

            this.renderAnalytics(analytics);
        } catch (error) {
            console.error('Failed to load analytics:', error);
            this.showError('Failed to load analytics. Please try again later.');
        }
    }

    renderAnalytics(data) {
        const content = document.getElementById('analyticsContent');
        const loading = document.querySelector('.loading-analytics');

        loading.style.display = 'none';
        content.style.display = 'block';

        content.innerHTML = `
            <div class="analytics-overview mb-4">
                <div class="grid grid-4">
                    <div class="card analytics-card fade-in">
                        <div class="card-body text-center">
                            <div class="analytics-icon">
                                <i class="fas fa-calendar-alt fa-3x text-primary"></i>
                            </div>
                            <h3>Total Events</h3>
                            <p class="analytics-number">${data.totalEvents || 0}</p>
                        </div>
                    </div>

                    <div class="card analytics-card fade-in">
                        <div class="card-body text-center">
                            <div class="analytics-icon">
                                <i class="fas fa-ticket-alt fa-3x text-secondary"></i>
                            </div>
                            <h3>Tickets Sold</h3>
                            <p class="analytics-number">${data.totalTicketsSold || 0}</p>
                        </div>
                    </div>

                    <div class="card analytics-card fade-in">
                        <div class="card-body text-center">
                            <div class="analytics-icon">
                                <i class="fas fa-dollar-sign fa-3x text-success"></i>
                            </div>
                            <h3>Total Revenue</h3>
                            <p class="analytics-number">$${data.totalRevenue || 0}</p>
                        </div>
                    </div>

                    <div class="card analytics-card fade-in">
                        <div class="card-body text-center">
                            <div class="analytics-icon">
                                <i class="fas fa-users fa-3x text-accent"></i>
                            </div>
                            <h3>Total Users</h3>
                            <p class="analytics-number">${data.totalUsers || 0}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="analytics-charts mb-4">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Events by Category</h3>
                        </div>
                        <div class="card-body">
                            <div id="categoryChart" class="chart-container">
                                <canvas id="categoryChartCanvas"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Revenue Trend</h3>
                        </div>
                        <div class="card-body">
                            <div id="revenueChart" class="chart-container">
                                <canvas id="revenueChartCanvas"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="analytics-details">
                <div class="card fade-in">
                    <div class="card-header">
                        <h3>Top Performing Events</h3>
                    </div>
                    <div class="card-body">
                        ${data.topEvents && data.topEvents.length > 0 ? `
                            <div class="table-responsive">
                                <table class="analytics-table">
                                    <thead>
                                        <tr>
                                            <th>Event Name</th>
                                            <th>Tickets Sold</th>
                                            <th>Revenue</th>
                                            <th>Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${data.topEvents.map(event => `
                                            <tr>
                                                <td>${event.title}</td>
                                                <td>${event.ticketsSold || 0}</td>
                                                <td>$${event.revenue || 0}</td>
                                                <td>${event.rating ? event.rating.toFixed(1) : 'N/A'}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : '<p>No event data available.</p>'}
                    </div>
                </div>
            </div>
        `;

        this.renderCharts(data);
    }

    renderCharts(data) {
        // Simple chart rendering (you can enhance with Chart.js or similar)
        if (data.categoryData) {
            this.renderCategoryChart(data.categoryData);
        }
        if (data.revenueTrend) {
            this.renderRevenueChart(data.revenueTrend);
        }
    }

    renderCategoryChart(categoryData) {
        const ctx = document.getElementById('categoryChartCanvas');
        if (!ctx) return;

        // Simple bar chart representation
        const categories = Object.keys(categoryData);
        const values = Object.values(categoryData);

        ctx.parentElement.innerHTML = `
            <div class="simple-chart">
                ${categories.map((cat, index) => `
                    <div class="chart-bar">
                        <div class="bar-label">${cat}</div>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: ${(values[index] / Math.max(...values)) * 100}%"></div>
                        </div>
                        <div class="bar-value">${values[index]}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderRevenueChart(revenueTrend) {
        const ctx = document.getElementById('revenueChartCanvas');
        if (!ctx) return;

        // Simple line chart representation
        const months = Object.keys(revenueTrend);
        const revenues = Object.values(revenueTrend);

        ctx.parentElement.innerHTML = `
            <div class="simple-chart">
                ${months.map((month, index) => `
                    <div class="chart-point">
                        <div class="point-label">${month}</div>
                        <div class="point-value">$${revenues[index]}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    refreshAnalytics() {
        this.loadAnalytics();
    }

    showLoading() {
        document.querySelector('.loading-analytics').style.display = 'block';
        document.getElementById('analyticsContent').style.display = 'none';
    }

    showError(message) {
        document.querySelector('.loading-analytics').style.display = 'none';
        document.getElementById('analyticsContent').style.display = 'block';
        document.getElementById('analyticsContent').innerHTML = `<p class="error-message">${message}</p>`;
    }
}