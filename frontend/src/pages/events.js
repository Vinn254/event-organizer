// Events Page Component
class EventsPage {
    constructor(app) {
        this.app = app;
        this.events = [];
        this.filteredEvents = [];
        this.currentFilter = 'all';
        this.currentSort = 'date';
        this.searchQuery = '';
    }

    render() {
        return `
            <section class="main-content">
                <div class="events-header mb-4">
                    <div class="events-title">
                        <h2>Discover Amazing Events</h2>
                        <p>Find and book tickets for the best events in your area</p>
                    </div>

                    <div class="events-controls">
                        <div class="search-box">
                            <input type="text" id="eventSearch" placeholder="Search events..." class="form-input">
                            <button class="btn btn-outline" onclick="eventsPage.clearSearch()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>

                        <div class="filter-controls">
                            <select id="eventFilter" class="form-input">
                                <option value="all">All Events</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="past">Past Events</option>
                                <option value="free">Free Events</option>
                                <option value="paid">Paid Events</option>
                            </select>

                            <select id="eventSort" class="form-input">
                                <option value="date">Sort by Date</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Sort by Name</option>
                                <option value="popularity">Most Popular</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="events-stats mb-4">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-number" id="totalEvents">0</div>
                            <div class="stat-label">Total Events</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="upcomingCount">0</div>
                            <div class="stat-label">Upcoming</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="freeEvents">0</div>
                            <div class="stat-label">Free Events</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="thisMonth">0</div>
                            <div class="stat-label">This Month</div>
                        </div>
                    </div>
                </div>

                <div class="events-content">
                    <div class="loading-events">
                        <div class="loading-spinner"></div>
                        <p>Loading events...</p>
                    </div>
                    <div class="events-grid" id="eventsGrid" style="display: none;">
                        <!-- Events will be loaded here -->
                    </div>

                    <div class="no-events" id="noEvents" style="display: none;">
                        <div class="no-events-content">
                            <i class="fas fa-calendar-times fa-4x text-light mb-3"></i>
                            <h3>No events found</h3>
                            <p id="noEventsMessage">Check back later for upcoming events!</p>
                            <button class="btn btn-primary mt-3" onclick="eventsPage.clearFilters()">
                                <i class="fas fa-refresh"></i> Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    afterRender() {
        // Store reference for event handlers
        window.eventsPage = this;

        this.setupEventListeners();
        this.loadEvents();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('eventSearch');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Filter functionality
        const filterSelect = document.getElementById('eventFilter');
        filterSelect.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.applyFilters();
        });

        // Sort functionality
        const sortSelect = document.getElementById('eventSort');
        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });
    }

    async loadEvents() {
        try {
            this.showLoading();

            const events = await this.app.apiRequest('/events');
            this.events = events;
            this.filteredEvents = [...events];

            this.updateStats();
            this.applyFilters();

        } catch (error) {
            console.error('Failed to load events:', error);
            this.showError('Failed to load events. Please try again later.');
        }
    }

    updateStats() {
        const now = new Date();
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const totalEvents = this.events.length;
        const upcomingCount = this.events.filter(event => new Date(event.date) > now).length;
        const freeEvents = this.events.filter(event => event.price === 0 || event.price === '0').length;
        const thisMonthEvents = this.events.filter(event => new Date(event.date) >= thisMonth).length;

        document.getElementById('totalEvents').textContent = totalEvents;
        document.getElementById('upcomingCount').textContent = upcomingCount;
        document.getElementById('freeEvents').textContent = freeEvents;
        document.getElementById('thisMonth').textContent = thisMonthEvents;
    }

    applyFilters() {
        let filtered = [...this.events];

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(this.searchQuery) ||
                event.description.toLowerCase().includes(this.searchQuery) ||
                event.location.toLowerCase().includes(this.searchQuery) ||
                (event.category && event.category.toLowerCase().includes(this.searchQuery))
            );
        }

        // Apply category filter
        const now = new Date();
        switch (this.currentFilter) {
            case 'upcoming':
                filtered = filtered.filter(event => new Date(event.date) > now);
                break;
            case 'past':
                filtered = filtered.filter(event => new Date(event.date) <= now);
                break;
            case 'free':
                filtered = filtered.filter(event => event.price === 0 || event.price === '0');
                break;
            case 'paid':
                filtered = filtered.filter(event => event.price > 0);
                break;
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'date':
                    return new Date(a.date) - new Date(b.date);
                case 'price-low':
                    return parseFloat(a.price || 0) - parseFloat(b.price || 0);
                case 'price-high':
                    return parseFloat(b.price || 0) - parseFloat(a.price || 0);
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'popularity':
                    return (b.attendees || 0) - (a.attendees || 0);
                default:
                    return 0;
            }
        });

        this.filteredEvents = filtered;
        this.renderEvents();
    }

    renderEvents() {
        const eventsGrid = document.getElementById('eventsGrid');
        const noEvents = document.getElementById('noEvents');
        const loading = document.querySelector('.loading-events');

        loading.style.display = 'none';

        if (this.filteredEvents.length === 0) {
            eventsGrid.style.display = 'none';
            noEvents.style.display = 'block';

            const message = document.getElementById('noEventsMessage');
            if (this.searchQuery || this.currentFilter !== 'all') {
                message.textContent = 'No events match your current filters. Try adjusting your search or filters.';
            } else {
                message.textContent = 'No events available at the moment. Check back later!';
            }
        } else {
            noEvents.style.display = 'none';
            eventsGrid.style.display = 'grid';

            eventsGrid.innerHTML = this.filteredEvents.map(event =>
                this.app.renderEventCard(event)
            ).join('');
        }
    }

    clearSearch() {
        document.getElementById('eventSearch').value = '';
        this.searchQuery = '';
        this.applyFilters();
    }

    clearFilters() {
        document.getElementById('eventSearch').value = '';
        document.getElementById('eventFilter').value = 'all';
        document.getElementById('eventSort').value = 'date';

        this.searchQuery = '';
        this.currentFilter = 'all';
        this.currentSort = 'date';
        this.applyFilters();
    }

    showLoading() {
        document.querySelector('.loading-events').style.display = 'block';
        document.getElementById('eventsGrid').style.display = 'none';
        document.getElementById('noEvents').style.display = 'none';
    }

    showError(message) {
        document.querySelector('.loading-events').style.display = 'none';
        document.getElementById('eventsGrid').style.display = 'none';
        document.getElementById('noEvents').style.display = 'block';

        document.getElementById('noEventsMessage').textContent = message;
    }
}