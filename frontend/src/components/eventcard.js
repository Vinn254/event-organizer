// Event Card Component
class EventCard {
    constructor(event, app) {
        this.event = event;
        this.app = app;
    }

    render() {
        const eventDate = new Date(this.event.date);
        const isUpcoming = eventDate > new Date();
        const availableTickets = this.event.capacity - this.event.availableTickets;

        return `
            <div class="card event-card fade-in" data-event-id="${this.event._id}">
                ${this.event.image ? `
                    <div class="event-image-container">
                        <img src="${this.event.image}" alt="${this.event.title}" class="event-image">
                        <div class="event-badge ${isUpcoming ? 'badge-success' : 'badge-warning'}">
                            ${isUpcoming ? 'Upcoming' : 'Past Event'}
                        </div>
                    </div>
                ` : `
                    <div class="event-image-placeholder">
                        <i class="fas fa-calendar-alt fa-3x"></i>
                    </div>
                `}
                <div class="card-body">
                    <div class="event-category">
                        <span class="category-tag">${this.event.category || 'General'}</span>
                    </div>
                    <h3 class="event-title">${this.event.title}</h3>
                    <p class="event-description">${this.event.description}</p>

                    <div class="event-meta">
                        <div class="event-info">
                            <div class="event-date">
                                <i class="fas fa-calendar"></i>
                                ${eventDate.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </div>
                            <div class="event-time">
                                <i class="fas fa-clock"></i> ${this.event.time}
                            </div>
                            <div class="event-location">
                                <i class="fas fa-map-marker-alt"></i> ${this.event.location}
                            </div>
                        </div>
                        <div class="event-price-section">
                            <div class="event-price">$${this.event.price}</div>
                            <div class="event-tickets">
                                <i class="fas fa-ticket-alt"></i>
                                ${availableTickets}/${this.event.capacity} available
                            </div>
                        </div>
                    </div>

                    <div class="event-organizer">
                        <i class="fas fa-user"></i> by ${this.event.organizer?.name || 'Event Organizer'}
                    </div>

                    <div class="event-actions">
                        <button class="btn btn-outline" onclick="app.viewEvent('${this.event._id}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        ${isUpcoming ? `
                            <button class="btn btn-primary" onclick="${this.app.user ? `app.bookEvent('${this.event._id}')` : `app.navigateToPage('login')`}" ${availableTickets === 0 ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart"></i>
                                ${availableTickets === 0 ? 'Sold Out' : 'Book Now'}
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Static method to render multiple event cards
    static renderEventGrid(events, app) {
        return `
            <div class="events-grid">
                ${events.length > 0 ?
                    events.map(event => new EventCard(event, app).render()).join('') :
                    '<div class="no-events"><i class="fas fa-calendar-times fa-3x"></i><h3>No events found</h3><p>Check back later for upcoming events!</p></div>'
                }
            </div>
        `;
    }
}