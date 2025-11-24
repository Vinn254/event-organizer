(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const d="/assets/img1-D1INHdv0.jpg",p="/assets/img2-C0Ui1XO1.jpg",m="/assets/img3-xJAiWA13.PNG";class u{constructor(e){this.app=e}render(){return`
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
                                ${this.app.user?`
                                    <a href="#" class="btn btn-secondary btn-lg" data-page="organizer">
                                        <i class="fas fa-plus-circle"></i> Create Event
                                    </a>
                                `:`
                                    <a href="#" class="btn btn-outline-orange-green btn-lg" data-page="register">
                                        <i class="fas fa-rocket"></i> Get Started
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
                                    <img src="${d}" alt="Sarah Johnson" class="testimonial-image" loading="lazy">
                                    <div class="testimonial-text">
                                        <p>"EventHub made organizing my tech conference seamless. The platform is intuitive and the support team is amazing!"</p>
                                        <cite>- Sarah Johnson, Tech Conference Organizer</cite>
                                    </div>
                                </div>
                            </div>
                            <div class="testimonial-card">
                                <div class="testimonial-content">
                                    <img src="${p}" alt="Michael Chen" class="testimonial-image" loading="lazy">
                                    <div class="testimonial-text">
                                        <p>"As an attendee, I love how easy it is to discover and book events. The mobile experience is fantastic!"</p>
                                        <cite>- Michael Chen, Event Attendee</cite>
                                    </div>
                                </div>
                            </div>
                            <div class="testimonial-card">
                                <div class="testimonial-content">
                                    <img src="${m}" alt="Emma Rodriguez" class="testimonial-image" loading="lazy">
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
        `}afterRender(){this.setupMobileMenu(),this.addAnimations()}setupMobileMenu(){const e=document.querySelector(".header-mobile-toggle"),t=document.querySelector(".header-nav");e&&t&&(e.addEventListener("click",()=>{t.classList.toggle("active"),e.classList.toggle("active")}),document.addEventListener("click",i=>{!e.contains(i.target)&&!t.contains(i.target)&&(t.classList.remove("active"),e.classList.remove("active"))}),t.querySelectorAll(".header-nav-link").forEach(i=>{i.addEventListener("click",()=>{t.classList.remove("active"),e.classList.remove("active")})}))}addAnimations(){document.querySelectorAll(".feature-card").forEach((t,a)=>{t.style.animationDelay=`${a*.2}s`})}}class g{constructor(e){this.app=e}render(){return!this.app.user||this.app.user.role!=="organizer"&&this.app.user.role!=="admin"?(this.app.navigateToPage("home"),""):`
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
        `}afterRender(){window.analyticsPage=this,this.loadAnalytics(),this.setupEventListeners()}setupEventListeners(){const e=document.getElementById("analyticsPeriod"),t=document.getElementById("analyticsType");e.addEventListener("change",()=>this.loadAnalytics()),t.addEventListener("change",()=>this.loadAnalytics())}async loadAnalytics(){try{this.showLoading();const e=document.getElementById("analyticsPeriod").value,t=document.getElementById("analyticsType").value,a=this.app.user.role==="admin"?"/admin/analytics":"/events/analytics",i=await this.app.apiRequest(`${a}?period=${e}&type=${t}`);this.renderAnalytics(i)}catch(e){console.error("Failed to load analytics:",e),this.showError("Failed to load analytics. Please try again later.")}}renderAnalytics(e){const t=document.getElementById("analyticsContent"),a=document.querySelector(".loading-analytics");a.style.display="none",t.style.display="block",t.innerHTML=`
            <div class="analytics-overview mb-4">
                <div class="grid grid-4">
                    <div class="card analytics-card fade-in">
                        <div class="card-body text-center">
                            <div class="analytics-icon">
                                <i class="fas fa-calendar-alt fa-3x text-primary"></i>
                            </div>
                            <h3>Total Events</h3>
                            <p class="analytics-number">${e.totalEvents||0}</p>
                        </div>
                    </div>

                    <div class="card analytics-card fade-in">
                        <div class="card-body text-center">
                            <div class="analytics-icon">
                                <i class="fas fa-ticket-alt fa-3x text-secondary"></i>
                            </div>
                            <h3>Tickets Sold</h3>
                            <p class="analytics-number">${e.totalTicketsSold||0}</p>
                        </div>
                    </div>

                    <div class="card analytics-card fade-in">
                        <div class="card-body text-center">
                            <div class="analytics-icon">
                                <i class="fas fa-dollar-sign fa-3x text-success"></i>
                            </div>
                            <h3>Total Revenue</h3>
                            <p class="analytics-number">$${e.totalRevenue||0}</p>
                        </div>
                    </div>

                    <div class="card analytics-card fade-in">
                        <div class="card-body text-center">
                            <div class="analytics-icon">
                                <i class="fas fa-users fa-3x text-accent"></i>
                            </div>
                            <h3>Total Users</h3>
                            <p class="analytics-number">${e.totalUsers||0}</p>
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
                        ${e.topEvents&&e.topEvents.length>0?`
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
                                        ${e.topEvents.map(i=>`
                                            <tr>
                                                <td>${i.title}</td>
                                                <td>${i.ticketsSold||0}</td>
                                                <td>$${i.revenue||0}</td>
                                                <td>${i.rating?i.rating.toFixed(1):"N/A"}</td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        `:"<p>No event data available.</p>"}
                    </div>
                </div>
            </div>
        `,this.renderCharts(e)}renderCharts(e){e.categoryData&&this.renderCategoryChart(e.categoryData),e.revenueTrend&&this.renderRevenueChart(e.revenueTrend)}renderCategoryChart(e){const t=document.getElementById("categoryChartCanvas");if(!t)return;const a=Object.keys(e),i=Object.values(e);t.parentElement.innerHTML=`
            <div class="simple-chart">
                ${a.map((s,n)=>`
                    <div class="chart-bar">
                        <div class="bar-label">${s}</div>
                        <div class="bar-container">
                            <div class="bar-fill" style="width: ${i[n]/Math.max(...i)*100}%"></div>
                        </div>
                        <div class="bar-value">${i[n]}</div>
                    </div>
                `).join("")}
            </div>
        `}renderRevenueChart(e){const t=document.getElementById("revenueChartCanvas");if(!t)return;const a=Object.keys(e),i=Object.values(e);t.parentElement.innerHTML=`
            <div class="simple-chart">
                ${a.map((s,n)=>`
                    <div class="chart-point">
                        <div class="point-label">${s}</div>
                        <div class="point-value">$${i[n]}</div>
                    </div>
                `).join("")}
            </div>
        `}refreshAnalytics(){this.loadAnalytics()}showLoading(){document.querySelector(".loading-analytics").style.display="block",document.getElementById("analyticsContent").style.display="none"}showError(e){document.querySelector(".loading-analytics").style.display="none",document.getElementById("analyticsContent").style.display="block",document.getElementById("analyticsContent").innerHTML=`<p class="error-message">${e}</p>`}}class h{constructor(){this.currentPage="home",this.user=null,this.events=[],this.apiBase="http://localhost:5000/api",this.init()}init(){this.loadUserFromStorage(),this.user&&(this.currentPage="dashboard"),this.setupEventListeners(),this.renderNavbar(),this.renderFooter(),this.navigateToPage(this.currentPage)}loadUserFromStorage(){const e=localStorage.getItem("token"),t=localStorage.getItem("user");if(e&&t&&t!=="undefined"&&t!==null)try{this.user=JSON.parse(t),this.setAuthToken(e)}catch{localStorage.removeItem("token"),localStorage.removeItem("user"),console.warn("Cleared corrupted user data from localStorage")}}setAuthToken(e){this.authToken=e}setupEventListeners(){document.addEventListener("click",e=>{if(e.target.matches("[data-page]")){e.preventDefault();const t=e.target.getAttribute("data-page");this.navigateToPage(t)}}),document.addEventListener("submit",e=>{e.preventDefault(),e.target.id==="login-form"?this.handleLogin(e.target):e.target.id==="register-form"?this.handleRegister(e.target):e.target.id==="event-form"?this.handleCreateEvent(e.target):e.target.id==="otp-form"&&this.handleOTPVerification(e.target)})}async apiRequest(e,t={}){const a=`${this.apiBase}${e}`,s={headers:{...t.body instanceof FormData?{}:{"Content-Type":"application/json"},...t.headers},...t};this.authToken&&(s.headers.Authorization=`Bearer ${this.authToken}`);try{const n=await fetch(a,s),o=await n.json();if(!n.ok)throw new Error(o.message||"API request failed");return o}catch(n){throw console.error("API Error:",n),this.showNotification(n.message,"error"),n}}formatCurrency(e){const t=Number(e)||0;try{return`Ksh ${t.toLocaleString("en-KE",{minimumFractionDigits:2})}`}catch{return`Ksh ${t.toFixed(2)}`}}navigateToPage(e){this.currentPage=e,this.updateNavbar(),this.renderPage(e),window.history.pushState({page:e},e,`#${e}`)}updateNavbar(){document.getElementById("navbar").querySelectorAll(".navbar-link").forEach(a=>{a.classList.remove("active"),a.getAttribute("data-page")===this.currentPage&&a.classList.add("active")})}setupNavbarEvents(){const e=document.querySelector(".navbar-mobile-toggle"),t=document.querySelector(".navbar-menu");e&&t&&(e.addEventListener("click",()=>{t.classList.toggle("active"),e.classList.toggle("active");const i=e.querySelector("i");i&&(i.classList.toggle("fa-bars"),i.classList.toggle("fa-times"))}),document.addEventListener("click",i=>{if(!e.contains(i.target)&&!t.contains(i.target)){t.classList.remove("active"),e.classList.remove("active");const s=e.querySelector("i");s&&(s.classList.remove("fa-times"),s.classList.add("fa-bars"))}}),t.querySelectorAll(".navbar-link").forEach(i=>{i.addEventListener("click",()=>{t.classList.remove("active"),e.classList.remove("active");const s=e.querySelector("i");s&&(s.classList.remove("fa-times"),s.classList.add("fa-bars"))})}))}renderNavbar(){const e=document.getElementById("navbar");e.innerHTML=`
            <nav class="navbar">
                <div class="navbar-container">
                    <a href="#" class="navbar-logo" data-page="home">
                        <i class="fas fa-calendar-alt"></i> EventHub
                    </a>
                    <ul class="navbar-menu">
                        <li><a href="#" class="navbar-link" data-page="home">Home</a></li>
                        <li><a href="#" class="navbar-link" data-page="events">Events</a></li>
                        ${this.user?`
                            <li><a href="#" class="navbar-link" data-page="dashboard">Dashboard</a></li>
                            ${this.user.role==="organizer"?'<li><a href="#" class="navbar-link" data-page="organizer">Organizer</a></li>':""}
                            <li><a href="#" class="navbar-link" onclick="app.logout()">Logout</a></li>
                        `:`
                            <li><a href="#" class="navbar-link" data-page="login">Login</a></li>
                        `}
                    </ul>
                    <button class="navbar-mobile-toggle" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
        `,this.setupNavbarEvents()}renderFooter(){const e=document.getElementById("footer");e.innerHTML=`
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-grid">
                        <div class="footer-section">
                            <h3>EventHub</h3>
                            <p>Your premier event management platform for creating unforgettable experiences.</p>
                        </div>
                        <div class="footer-section">
                            <h3>Quick Links</h3>
                            <a href="#" data-page="home">Home</a>
                            <a href="#" data-page="events">Events</a>
                            <a href="#" data-page="about">About</a>
                            <a href="#" data-page="contact">Contact</a>
                        </div>
                        <div class="footer-section">
                            <h3>Support</h3>
                            <a href="#" data-page="help">Help Center</a>
                            <a href="#" data-page="privacy">Privacy Policy</a>
                            <a href="#" data-page="terms">Terms of Service</a>
                        </div>
                        <div class="footer-section">
                            <h3>Connect</h3>
                            <div class="social-links">
                                <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2024 EventHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `}renderPage(e){console.log("Rendering page:",e);const t=document.getElementById("main-content");if(!t){console.error("main-content element not found!");return}switch(t.innerHTML='<div class="loading"></div>',e){case"home":console.log("Rendering home page"),this.renderHomePage();break;case"events":console.log("Rendering events page"),this.renderEventsPage();break;case"login":console.log("Rendering login page"),this.renderLoginPage();break;case"register":console.log("Rendering register page"),this.renderRegisterPage();break;case"dashboard":console.log("Rendering dashboard page"),this.renderDashboardPage();break;case"organizer":console.log("Rendering organizer page"),this.renderOrganizerPage();break;case"payment":console.log("Rendering payment page"),this.renderPaymentPage();break;case"analytics":console.log("Rendering analytics page"),this.renderAnalyticsPage();break;default:console.log("Rendering default home page"),this.renderHomePage()}}renderHomePage(){const e=document.getElementById("main-content"),t=new u(this);e.innerHTML=t.render(),t.afterRender()}async renderEventsPage(){try{const e=await this.apiRequest("/events");this.events=e;const t=document.getElementById("main-content");t.innerHTML=`
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Upcoming Events</h2>
                        <p>Discover exciting events happening soon</p>
                    </div>

                    <div class="grid grid-2">
                        ${e.map(a=>this.renderEventCard(a)).join("")}
                    </div>
                </section>
            `}catch{this.showNotification("Failed to load events","error")}}renderEventCard(e){const t=e.image?e.image.startsWith("http")?e.image:`http://localhost:5000${e.image}`:"";return`
            <div class="card event-card fade-in" data-event-id="${e._id}">
                ${t?`<img src="${t}" alt="${e.title}" class="event-image">`:""}
                <div class="card-body">
                    <h3 class="event-title">${e.title}</h3>
                    <p class="event-description">${e.description}</p>
                    <div class="event-meta">
                        <div class="event-date">
                            <i class="fas fa-calendar"></i> ${new Date(e.date).toLocaleDateString()}
                            <br>
                            <i class="fas fa-clock"></i> ${e.time}
                        </div>
                        <div class="event-price">${this.formatCurrency(e.price)}</div>
                    </div>
                    <div class="event-location mb-3">
                        <i class="fas fa-map-marker-alt"></i> ${e.location}
                    </div>
                    <div class="event-actions">
                        <button class="btn btn-primary" onclick="app.viewEvent('${e._id}')">View Details</button>
                        ${this.user?`<button class="btn btn-secondary" onclick="app.bookEvent('${e._id}')">Book Now</button>`:""}
                    </div>
                </div>
            </div>
        `}renderLoginPage(){const e=document.getElementById("main-content");e.innerHTML=`
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Login to Your Account</h3>
                        </div>
                        <div class="card-body">
                            <form id="login-form">
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" name="password" class="form-input" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Login</button>
                            </form>
                            <div class="mt-3 text-center">
                                <p>Don't have an account? <a href="#" data-page="register">Register here</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body text-center">
                            <h3>Welcome Back!</h3>
                            <p>Sign in to access your dashboard and manage your events.</p>
                            <div class="mt-4">
                                <img src="${d}" alt="Welcome Back" class="auth-image">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `}renderRegisterPage(){const e=document.getElementById("main-content");e.innerHTML=`
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Create Your Account</h3>
                        </div>
                        <div class="card-body">
                            <form id="register-form">
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input type="text" name="name" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input type="tel" name="phone" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" name="password" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Account Type</label>
                                    <select name="role" class="form-input" required>
                                        <option value="user">Regular User</option>
                                        <option value="organizer">Event Organizer</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">How would you like to receive your OTP?</label>
                                    <div class="radio-group">
                                        <label class="radio-label">
                                            <input type="radio" name="otpMethod" value="email" checked>
                                            <span>Email</span>
                                        </label>
                                        <label class="radio-label">
                                            <input type="radio" name="otpMethod" value="sms">
                                            <span>SMS</span>
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Register</button>
                            </form>
                            <div class="mt-3 text-center">
                                <p>Already have an account? <a href="#" data-page="login">Login here</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body text-center">
                            <h3>Join EventHub Today!</h3>
                            <p>Create events, book tickets, and connect with amazing communities.</p>
                            <div class="mt-4">
                                <img src="${p}" alt="Join EventHub Today" class="auth-image">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `}async renderDashboardPage(){if(!this.user){console.log("No user found, redirecting to login"),this.navigateToPage("login");return}console.log("Rendering dashboard for user:",this.user.name);const e=document.getElementById("main-content");let t=[];try{t=(await this.apiRequest("/payments/my")).slice(0,3)}catch(a){console.warn("Could not fetch transactions:",a)}e.innerHTML=`
            <section class="main-content">
                <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 2rem; border-radius: 1rem; margin-bottom: 2rem; text-align: center;">
                    <h1 style="margin: 0; font-size: 2.5rem;">DASHBOARD</h1>
                    <p style="margin: 1rem 0 0 0; font-size: 1.2rem;">Welcome back, ${this.user.name}! You are now logged in.</p>
                </div>
                <div class="mb-4">
                    <h2>Welcome back, ${this.user.name}!</h2>
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

                <!-- Recent Transaction History Section -->
                ${t.length>0?`
                <div class="mt-5">
                    <h3 style="margin-bottom: 1.5rem; border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem;">Recent Transactions</h3>
                    <div class="grid grid-1">
                        ${t.map(a=>`
                            <div class="card transaction-card fade-in" style="display: flex; align-items: center; padding: 1.5rem; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(16, 185, 129, 0.1));">
                                <div style="flex: 1;">
                                    <h4 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">Transaction #${a.transactionId}</h4>
                                    <p style="margin: 0.25rem 0; color: var(--text-secondary);"><strong>Amount:</strong> $${a.amount}</p>
                                    <p style="margin: 0.25rem 0; color: var(--text-secondary);"><strong>Date:</strong> ${new Date(a.createdAt).toLocaleDateString()}</p>
                                    <p style="margin: 0.25rem 0; color: var(--text-secondary);"><strong>Payment Method:</strong> ${a.paymentMethod}</p>
                                </div>
                                <div style="text-align: right;">
                                    <span style="display: inline-block; padding: 0.5rem 1rem; border-radius: 0.5rem; background-color: ${a.status==="completed"?"var(--success-color)":"var(--warning-color)"}; color: white; font-weight: 600; margin-bottom: 0.5rem;">${a.status.toUpperCase()}</span>
                                    <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="app.viewTransactions()">View All</button>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                `:""}
            </section>
        `}renderOrganizerPage(){if(!this.user||this.user.role!=="organizer"){this.navigateToPage("home");return}const e=document.getElementById("main-content");e.innerHTML=`
            <section class="main-content">
                <div class="mb-4">
                    <h2>Organizer Dashboard</h2>
                    <p>Create and manage your events</p>
                </div>

                <div class="mb-4">
                    <button class="btn btn-primary" onclick="app.showCreateEventForm()">Create New Event</button>
                </div>

                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-body">
                            <h3>My Events</h3>
                            <p>Manage your created events</p>
                            <button class="btn btn-secondary mt-3" onclick="app.viewMyEvents()">View Events</button>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body">
                            <h3>Analytics</h3>
                            <p>View event performance and statistics</p>
                            <button class="btn btn-secondary mt-3" onclick="app.viewAnalytics()">View Analytics</button>
                        </div>
                    </div>
                </div>
            </section>
        `}async renderPaymentPage(){if(!this.selectedEventId){this.showNotification("No event selected for payment","error"),this.navigateToPage("events");return}try{const e=await this.apiRequest(`/events/${this.selectedEventId}`),t=document.getElementById("main-content");t.innerHTML=`
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Book Tickets</h2>
                        <p>Complete your booking for ${e.title}</p>
                    </div>

                    <div class="grid grid-2">
                        <div class="card fade-in">
                            <div class="card-header">
                                <h3>Event Details</h3>
                            </div>
                            <div class="card-body">
                                <div class="event-summary">
                                    <h4>${e.title}</h4>
                                    <p><i class="fas fa-calendar"></i> ${new Date(e.date).toLocaleDateString()} at ${e.time}</p>
                                    <p><i class="fas fa-map-marker-alt"></i> ${e.location}</p>
                                    <p><i class="fas fa-dollar-sign"></i> $${e.price} per ticket</p>
                                    <p><i class="fas fa-users"></i> ${e.availableTickets} tickets available</p>
                                </div>
                            </div>
                        </div>

                        <div class="card fade-in">
                            <div class="card-header">
                                <h3>Payment Details</h3>
                            </div>
                            <div class="card-body">
                                <form id="payment-form">
                                    <div class="form-group">
                                        <label class="form-label">Number of Tickets</label>
                                        <input type="number" name="quantity" class="form-input" min="1" max="${e.availableTickets}" value="1" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Phone Number (M-Pesa)</label>
                                        <input type="tel" name="phoneNumber" class="form-input" placeholder="254XXXXXXXXX" value="${this.user.phone||""}" required>
                                    </div>
                                    <div class="payment-summary">
                                        <p><strong>Total: $<span id="total-amount">${e.price}</span></strong></p>
                                    </div>
                                    <button type="submit" class="btn btn-success w-full">
                                        <i class="fas fa-mobile-alt"></i> Pay with M-Pesa
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            `;const a=document.querySelector('input[name="quantity"]'),i=document.getElementById("total-amount");a.addEventListener("input",n=>{const o=parseInt(n.target.value)||1;i.textContent=(o*e.price).toFixed(2)}),document.getElementById("payment-form").addEventListener("submit",async n=>{n.preventDefault(),await this.handlePaymentSubmission(e)})}catch{this.showNotification("Failed to load event details","error"),this.navigateToPage("events")}}renderAnalyticsPage(){const e=document.getElementById("main-content"),t=new g(this);e.innerHTML=t.render(),t.afterRender()}async handleLogin(e){const t=new FormData(e),a=Object.fromEntries(t);try{const i=await this.apiRequest("/auth/login",{method:"POST",body:JSON.stringify(a)});if(console.log("Login response:",i),i.requiresVerification){this.showNotification("Please verify your account first.","info"),this.showOTPForm(i.user.email);return}this.user=i.user,this.setAuthToken(i.token),localStorage.setItem("token",i.token),localStorage.setItem("user",JSON.stringify(i.user)),console.log("Login successful, user set:",this.user),console.log("Rendering dashboard directly..."),this.showNotification("Login successful!","success"),this.currentPage="dashboard",this.renderDashboardPage(),this.renderNavbar(),window.history.pushState({page:"dashboard"},"dashboard","#dashboard")}catch{}}async handleRegister(e){const t=new FormData(e),a=Object.fromEntries(t);try{const i=await this.apiRequest("/auth/register",{method:"POST",body:JSON.stringify(a)});this.showNotification("Registration successful! Use the OTP shown below.","success"),this.showOTPForm(a.email,i.otp)}catch{}}showOTPForm(e,t=null){const a=document.getElementById("main-content");a.innerHTML=`
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Verify Your Account</h3>
                        </div>
                        <div class="card-body">
                            <p>Please enter the OTP to verify your account.</p>
                            ${t?`<div class="otp-display"><strong>Your OTP: <span class="otp-code">${t}</span></strong></div>`:""}
                            <form id="otp-form">
                                <input type="hidden" name="email" value="${e}">
                                <div class="form-group">
                                    <label class="form-label">OTP Code</label>
                                    <input type="text" name="otp" class="form-input" required maxlength="6" ${t?`value="${t}"`:""}>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Verify OTP</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `}async handleOTPVerification(e){const t=new FormData(e),a=Object.fromEntries(t);try{const i=await this.apiRequest("/auth/verify-otp",{method:"POST",body:JSON.stringify(a)});this.user=i.user,this.setAuthToken(i.token),localStorage.setItem("token",i.token),localStorage.setItem("user",JSON.stringify(i.user)),this.showNotification("Account verified successfully!","success"),this.currentPage="dashboard",this.renderDashboardPage(),this.renderNavbar(),window.history.pushState({page:"dashboard"},"dashboard","#dashboard")}catch{}}async handleCreateEvent(e){const t=new FormData(e);try{this.editingEventId?(await this.apiRequest(`/events/${this.editingEventId}`,{method:"PUT",body:t}),this.showNotification("Event updated successfully!","success"),this.editingEventId=null):(await this.apiRequest("/events",{method:"POST",body:t}),this.showNotification("Event created successfully!","success")),this.navigateToPage("organizer")}catch{}}viewEvent(e){this.apiRequest(`/events/${e}`).then(t=>{const a=t.image?t.image.startsWith("http")?t.image:`http://localhost:5000${t.image}`:"",i=document.getElementById("main-content");i.innerHTML=`
                    <section class="main-content">
                        <div class="event-detail-header">
                            ${a?`<img src="${a}" alt="${t.title}" class="event-detail-image">`:""}
                            <div class="event-detail-info">
                                <h1>${t.title}</h1>
                                <p class="event-description">${t.description}</p>
                                <div class="event-meta">
                                    <div class="event-date">
                                        <i class="fas fa-calendar"></i> ${new Date(t.date).toLocaleDateString()}
                                        <br>
                                        <i class="fas fa-clock"></i> ${t.time}
                                    </div>
                                    <div class="event-price">$${t.price}</div>
                                </div>
                                <div class="event-location">
                                    <i class="fas fa-map-marker-alt"></i> ${t.location}
                                </div>
                                <div class="event-capacity">
                                    <i class="fas fa-users"></i> ${t.availableTickets} tickets available out of ${t.capacity}
                                </div>
                                ${this.user?`
                                    <button class="btn btn-primary" onclick="app.bookEvent('${t._id}')">
                                        <i class="fas fa-ticket-alt"></i> Book Tickets
                                    </button>
                                `:`
                                    <p>Please <a href="#" data-page="login">login</a> to book tickets.</p>
                                `}
                            </div>
                        </div>
                    </section>
                `}).catch(t=>{this.showNotification("Failed to load event details","error")})}async bookEvent(e){this.selectedEventId=e,this.navigateToPage("payment")}async handlePaymentSubmission(e){const t=new FormData(document.getElementById("payment-form")),a=Object.fromEntries(t),i=parseInt(a.quantity),s=a.phoneNumber;try{const n=document.querySelector('#payment-form button[type="submit"]'),o=n.innerHTML;n.innerHTML='<i class="fas fa-spinner fa-spin"></i> Processing...',n.disabled=!0,alert(`M-Pesa payment prompt sent to ${s}
Amount: $${(i*e.price).toFixed(2)}
Please complete the payment on your phone.`);const l={eventId:e._id,quantity:i,phoneNumber:s},r=await this.apiRequest(`/events/${e._id}/book`,{method:"POST",body:JSON.stringify({quantity:i})}),v=document.getElementById("main-content");v.innerHTML=`
                <section class="main-content">
                    <div class="text-center mb-4">
                        <i class="fas fa-check-circle fa-4x text-success"></i>
                        <h2>Payment Successful!</h2>
                        <p>Your tickets have been booked successfully.</p>
                    </div>

                    <div class="grid grid-2">
                        <div class="card fade-in">
                            <div class="card-header">
                                <h3>Ticket Details</h3>
                            </div>
                            <div class="card-body">
                                <div class="ticket-info">
                                    <h4>${e.title}</h4>
                                    <p><strong>Ticket Number:</strong> ${r.ticketNumber}</p>
                                    <p><strong>Quantity:</strong> ${i}</p>
                                    <p><strong>Total Price:</strong> $${r.totalPrice}</p>
                                    <p><strong>Date:</strong> ${new Date(e.date).toLocaleDateString()} at ${e.time}</p>
                                    <p><strong>Location:</strong> ${e.location}</p>
                                    <p><strong>Phone:</strong> ${s}</p>
                                </div>
                                <div class="mt-4 flex gap-2">
                                    <button class="btn btn-primary flex-1" onclick="app.downloadTicket('${r._id}', '${e.title}', '${r.ticketNumber}')">
                                        <i class="fas fa-download"></i> Download Ticket
                                    </button>
                                    <button class="btn btn-secondary flex-1" onclick="app.downloadReceipt('${r._id}', '${e.title}', '${r.ticketNumber}', ${r.totalPrice}, '${s}')">
                                        <i class="fas fa-receipt"></i> Download Receipt
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="card fade-in">
                            <div class="card-body text-center">
                                <h3>Next Steps</h3>
                                <p>Keep this ticket information safe. You'll need to show it at the event entrance.</p>
                                <div class="mt-4">
                                    <button class="btn btn-primary" onclick="app.navigateToPage('dashboard')">
                                        <i class="fas fa-home"></i> Go to Dashboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `}catch{this.showNotification("Payment failed. Please try again.","error");const o=document.querySelector('#payment-form button[type="submit"]');o.innerHTML='<i class="fas fa-mobile-alt"></i> Pay with M-Pesa',o.disabled=!1}}showNotification(e,t="info"){alert(`${t.toUpperCase()}: ${e}`)}async viewMyTickets(){try{const e=await this.apiRequest("/events/tickets/my"),t=document.getElementById("main-content");t.innerHTML=`
                <section class="main-content">
                    <div class="mb-4">
                        <h2>My Tickets</h2>
                        <p>View and manage your booked event tickets</p>
                    </div>

                    ${e.length===0?"<p>No tickets found.</p>":`
                    <div class="grid grid-1">
                        ${e.map(a=>`
                            <div class="card ticket-card fade-in">
                                <div class="card-body">
                                    <h3>${a.event.title}</h3>
                                    <p><strong>Ticket Number:</strong> ${a.ticketNumber}</p>
                                    <p><strong>Quantity:</strong> ${a.quantity}</p>
                                    <p><strong>Total Price:</strong> $${a.totalPrice}</p>
                                    <p><strong>Date:</strong> ${new Date(a.event.date).toLocaleDateString()} at ${a.event.time}</p>
                                    <p><strong>Location:</strong> ${a.event.location}</p>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    `}
                </section>
            `}catch{this.showNotification("Failed to load tickets","error")}}async viewTransactions(){try{const e=await this.apiRequest("/payments/my"),t=document.getElementById("main-content");t.innerHTML=`
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Transaction History</h2>
                        <p>Check your payment history and receipts</p>
                    </div>

                    ${e.length===0?"<p>No transactions found.</p>":`
                    <div class="grid grid-1">
                        ${e.map(a=>`
                            <div class="card transaction-card fade-in">
                                <div class="card-body">
                                    <h3>Transaction ID: ${a.transactionId}</h3>
                                    <p><strong>Amount:</strong> $${a.amount}</p>
                                    <p><strong>Status:</strong> ${a.status}</p>
                                    <p><strong>Payment Method:</strong> ${a.paymentMethod}</p>
                                    <p><strong>Date:</strong> ${new Date(a.createdAt).toLocaleDateString()}</p>
                                    ${a.mpesaReceiptNumber?`<p><strong>M-Pesa Receipt:</strong> ${a.mpesaReceiptNumber}</p>`:""}
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    `}
                </section>
            `}catch{this.showNotification("Failed to load transactions","error")}}viewProfile(){const e=document.getElementById("main-content");e.innerHTML=`
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Edit Profile</h3>
                        </div>
                        <div class="card-body">
                            <form id="profile-form">
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input type="text" name="name" class="form-input" value="${this.user.name}" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" class="form-input" value="${this.user.email}" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Phone</label>
                                    <input type="tel" name="phone" class="form-input" value="${this.user.phone}" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Update Profile</button>
                            </form>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body text-center">
                            <h3>Update Your Information</h3>
                            <p>Keep your profile up to date for better event experiences.</p>
                            <div class="mt-4">
                                <i class="fas fa-user-edit fa-4x text-primary"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;const t=document.getElementById("profile-form");t&&t.addEventListener("submit",async a=>{a.preventDefault();const i=new FormData(t),s=Object.fromEntries(i);try{const n=await this.apiRequest("/auth/profile",{method:"PUT",body:JSON.stringify(s)});this.user=n.user,localStorage.setItem("user",JSON.stringify(n.user)),this.showNotification("Profile updated successfully!","success")}catch{}})}showCreateEventForm(){const e=document.getElementById("main-content");e.innerHTML=`
            <section class="main-content">
                <div class="grid grid-2">
                    <div class="card fade-in">
                        <div class="card-header">
                            <h3>Create New Event</h3>
                        </div>
                        <div class="card-body">
                            <form id="event-form">
                                <div class="form-group">
                                    <label class="form-label">Event Title</label>
                                    <input type="text" name="title" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Description</label>
                                    <textarea name="description" class="form-input" rows="4" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Date</label>
                                    <input type="date" name="date" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Time</label>
                                    <input type="time" name="time" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Location</label>
                                    <input type="text" name="location" class="form-input" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Category</label>
                                    <select name="category" class="form-input" required>
                                        <option value="">Select Category</option>
                                        <option value="conference">Conference</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="concert">Concert</option>
                                        <option value="sports">Sports</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Price ($)</label>
                                    <input type="number" name="price" class="form-input" min="0" step="0.01" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Capacity</label>
                                    <input type="number" name="capacity" class="form-input" min="1" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Event Image (optional)</label>
                                    <input type="file" name="image" class="form-input" accept="image/*">
                                    <small class="text-light">Upload an image for your event (JPG, PNG, GIF)</small>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Create Event</button>
                            </form>
                        </div>
                    </div>
                    <div class="card fade-in">
                        <div class="card-body text-center">
                            <h3>Create Amazing Events</h3>
                            <p>Fill in the details to create a new event for attendees to book.</p>
                            <div class="mt-4">
                                <img src="${d}" alt="Create Events" class="auth-image">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `}async viewMyEvents(){try{const e=await this.apiRequest("/events/my-events"),t=document.getElementById("main-content");t.innerHTML=`
                <section class="main-content">
                    <div class="mb-4">
                        <h2>My Events</h2>
                        <p>Manage your created events</p>
                    </div>

                    ${e.length===0?"<p>No events created yet.</p>":`
                    <div class="grid grid-2">
                        ${e.map(a=>`
                            <div class="card event-card fade-in" data-event-id="${a._id}">
                                <div class="card-body">
                                    <h3 class="event-title">${a.title}</h3>
                                    <p class="event-description">${a.description}</p>
                                    <div class="event-meta">
                                        <div class="event-date">
                                            <i class="fas fa-calendar"></i> ${new Date(a.date).toLocaleDateString()}
                                            <br>
                                            <i class="fas fa-clock"></i> ${a.time}
                                        </div>
                                        <div class="event-price">$${a.price}</div>
                                    </div>
                                    <div class="event-location mb-3">
                                        <i class="fas fa-map-marker-alt"></i> ${a.location}
                                    </div>
                                    <div class="event-actions">
                                        <button class="btn btn-secondary" onclick="app.editEvent('${a._id}')">Edit</button>
                                        <button class="btn btn-danger" onclick="app.deleteEvent('${a._id}')">Delete</button>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    `}
                </section>
            `}catch{this.showNotification("Failed to load events","error")}}async viewAnalytics(){try{const e=await this.apiRequest("/events/analytics"),t=document.getElementById("main-content");t.innerHTML=`
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Event Analytics</h2>
                        <p>View event performance and statistics</p>
                    </div>

                    <div class="grid grid-3">
                        <div class="card analytics-card fade-in">
                            <div class="card-body text-center">
                                <div class="analytics-icon">
                                    <i class="fas fa-calendar-alt fa-3x text-primary"></i>
                                </div>
                                <h3>Total Events</h3>
                                <p class="analytics-number">${e.totalEvents}</p>
                            </div>
                        </div>

                        <div class="card analytics-card fade-in">
                            <div class="card-body text-center">
                                <div class="analytics-icon">
                                    <i class="fas fa-ticket-alt fa-3x text-secondary"></i>
                                </div>
                                <h3>Tickets Sold</h3>
                                <p class="analytics-number">${e.totalTicketsSold}</p>
                            </div>
                        </div>

                        <div class="card analytics-card fade-in">
                            <div class="card-body text-center">
                                <div class="analytics-icon">
                                    <i class="fas fa-dollar-sign fa-3x text-success"></i>
                                </div>
                                <h3>Total Revenue</h3>
                                <p class="analytics-number">$${e.totalRevenue}</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <h3>Event Breakdown</h3>
                        <div class="grid grid-1">
                            ${e.events.map(a=>`
                                <div class="card fade-in">
                                    <div class="card-body">
                                        <h4>${a.title}</h4>
                                        <p><strong>Tickets Sold:</strong> ${a.ticketsSold}</p>
                                        <p><strong>Revenue:</strong> $${a.revenue}</p>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </section>
            `}catch{this.showNotification("Failed to load analytics","error")}}async viewTickets(){try{const e=await this.apiRequest("/events/tickets/sold"),t=document.getElementById("main-content");t.innerHTML=`
                <section class="main-content">
                    <div class="mb-4">
                        <h2>Sold Tickets</h2>
                        <p>View tickets sold for your events</p>
                    </div>

                    ${e.length===0?"<p>No tickets sold yet.</p>":`
                    <div class="grid grid-1">
                        ${e.map(a=>`
                            <div class="card ticket-card fade-in">
                                <div class="card-body">
                                    <h3>${a.event.title}</h3>
                                    <p><strong>Ticket Number:</strong> ${a.ticketNumber}</p>
                                    <p><strong>Quantity:</strong> ${a.quantity}</p>
                                    <p><strong>Total Price:</strong> $${a.totalPrice}</p>
                                    <p><strong>Buyer:</strong> ${a.user.name} (${a.user.email})</p>
                                    <p><strong>Date:</strong> ${new Date(a.event.date).toLocaleDateString()} at ${a.event.time}</p>
                                    <p><strong>Location:</strong> ${a.event.location}</p>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    `}
                </section>
            `}catch{this.showNotification("Failed to load tickets","error")}}async editEvent(e){try{const t=await this.apiRequest(`/events/${e}`);this.editingEventId=e;const a=document.getElementById("main-content");a.innerHTML=`
                <section class="main-content">
                    <div class="form-container">
                        <div class="card fade-in">
                            <div class="card-body">
                                <h2>Edit Event</h2>
                                <p class="text-muted">Update your event details</p>
                                <form id="event-form" class="mt-4">
                                    <div class="form-group">
                                        <label class="form-label">Event Title</label>
                                        <input type="text" name="title" class="form-input" value="${t.title}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Description</label>
                                        <textarea name="description" class="form-input" rows="4" required>${t.description}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Date</label>
                                        <input type="date" name="date" class="form-input" value="${new Date(t.date).toISOString().split("T")[0]}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Time</label>
                                        <input type="time" name="time" class="form-input" value="${t.time}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Location</label>
                                        <input type="text" name="location" class="form-input" value="${t.location}" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Category</label>
                                        <select name="category" class="form-input" required>
                                            <option value="">Select Category</option>
                                            <option value="conference" ${t.category==="conference"?"selected":""}>Conference</option>
                                            <option value="workshop" ${t.category==="workshop"?"selected":""}>Workshop</option>
                                            <option value="concert" ${t.category==="concert"?"selected":""}>Concert</option>
                                            <option value="sports" ${t.category==="sports"?"selected":""}>Sports</option>
                                            <option value="other" ${t.category==="other"?"selected":""}>Other</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Price ($)</label>
                                        <input type="number" name="price" class="form-input" value="${t.price}" min="0" step="0.01" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Capacity</label>
                                        <input type="number" name="capacity" class="form-input" value="${t.capacity}" min="1" required>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Event Image (optional)</label>
                                        <input type="file" name="image" class="form-input" accept="image/*">
                                        <small class="text-light">Upload a new image to change it</small>
                                        ${t.image?`<p class="mt-2"><img src="${t.image}" alt="Event" style="max-width: 200px; max-height: 200px;"></p>`:""}
                                    </div>
                                    <div class="form-group flex gap-2">
                                        <button type="submit" class="btn btn-primary flex-1">Update Event</button>
                                        <button type="button" class="btn btn-secondary flex-1" onclick="app.viewMyEvents()">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            `}catch{this.showNotification("Failed to load event for editing","error")}}async deleteEvent(e){if(confirm("Are you sure you want to delete this event?"))try{await this.apiRequest(`/events/${e}`,{method:"DELETE"}),this.showNotification("Event deleted successfully!","success"),this.viewMyEvents()}catch{this.showNotification("Failed to delete event","error")}}downloadTicket(e,t,a){const i=`
<!DOCTYPE html>
<html>
<head>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; padding: 20px; }
        .ticket-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .ticket-header {
            background: linear-gradient(135deg, #4f46e5, #3730a3);
            padding: 30px;
            text-align: center;
            border-bottom: 3px dashed rgba(255,255,255,0.3);
        }
        .ticket-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .ticket-header p {
            font-size: 14px;
            opacity: 0.9;
        }
        .ticket-body {
            padding: 40px 30px;
        }
        .ticket-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .ticket-row:last-child {
            border-bottom: none;
        }
        .ticket-label {
            font-size: 12px;
            text-transform: uppercase;
            opacity: 0.8;
            letter-spacing: 1px;
        }
        .ticket-value {
            font-size: 18px;
            font-weight: bold;
            text-align: right;
        }
        .ticket-number {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
        }
        .ticket-footer {
            background: rgba(0,0,0,0.1);
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            border-top: 3px dashed rgba(255,255,255,0.3);
        }
        .barcode {
            text-align: center;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            letter-spacing: 3px;
        }
        @media print {
            body { padding: 0; }
            .ticket-container { box-shadow: none; max-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="ticket-container">
        <div class="ticket-header">
            <h1>🎫 EVENT TICKET</h1>
            <p>Your admission pass to the event</p>
        </div>
        <div class="ticket-body">
            <div class="ticket-row">
                <div class="ticket-label">Event Name</div>
                <div class="ticket-value">${t}</div>
            </div>
            <div class="ticket-number">
                Ticket #${a}
            </div>
            <div class="barcode">
                || |||| || || || ||||
            </div>
            <div class="ticket-row">
                <div class="ticket-label">Issued Date</div>
                <div class="ticket-value">${new Date().toLocaleDateString()}</div>
            </div>
            <div class="ticket-row">
                <div class="ticket-label">Issued Time</div>
                <div class="ticket-value">${new Date().toLocaleTimeString()}</div>
            </div>
        </div>
        <div class="ticket-footer">
            <p>✓ Please present this ticket at the venue entrance</p>
            <p>✓ One ticket per person - Not transferable</p>
            <p>✓ Keep this ticket safe and secure</p>
        </div>
    </div>
</body>
</html>
        `,s=new Blob([i],{type:"text/html"}),n=window.URL.createObjectURL(s),o=document.createElement("a");o.href=n,o.download=`Ticket_${a}_${new Date().getTime()}.html`,document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(n),this.showNotification("Ticket downloaded successfully!","success")}downloadReceipt(e,t,a,i,s){const n=`
<!DOCTYPE html>
<html>
<head>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; padding: 20px; }
        .receipt-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            color: #333;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .receipt-header {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .receipt-header h1 {
            font-size: 28px;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .receipt-header p {
            font-size: 13px;
            opacity: 0.9;
        }
        .receipt-body {
            padding: 30px;
        }
        .receipt-section {
            margin-bottom: 25px;
        }
        .receipt-section-title {
            font-size: 12px;
            text-transform: uppercase;
            color: #10b981;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
            letter-spacing: 1px;
        }
        .receipt-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
        }
        .receipt-label {
            font-weight: 600;
            color: #555;
        }
        .receipt-value {
            text-align: right;
            color: #333;
        }
        .receipt-row.total {
            background: linear-gradient(135deg, #f0fdf4, #dcfce7);
            padding: 12px;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 15px;
        }
        .receipt-row.total .receipt-label {
            color: #059669;
        }
        .receipt-row.total .receipt-value {
            color: #059669;
            font-size: 18px;
            font-weight: bold;
        }
        .receipt-footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e5e7eb;
        }
        .receipt-confirmation {
            text-align: center;
            padding: 20px;
            background: #dcfce7;
            color: #059669;
            font-weight: bold;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .receipt-id {
            text-align: center;
            font-size: 11px;
            color: #999;
            margin-top: 10px;
            font-family: 'Courier New', monospace;
        }
        @media print {
            body { padding: 0; }
            .receipt-container { box-shadow: none; max-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="receipt-header">
            <h1>✓ PAYMENT RECEIPT</h1>
            <p>Official transaction receipt</p>
        </div>
        <div class="receipt-body">
            <div class="receipt-confirmation">
                ✓ PAYMENT SUCCESSFUL
            </div>
            
            <div class="receipt-section">
                <div class="receipt-section-title">Event Information</div>
                <div class="receipt-row">
                    <span class="receipt-label">Event Name:</span>
                    <span class="receipt-value">${t}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Ticket Number:</span>
                    <span class="receipt-value">#${a}</span>
                </div>
            </div>
            
            <div class="receipt-section">
                <div class="receipt-section-title">Payment Details</div>
                <div class="receipt-row">
                    <span class="receipt-label">Amount Paid:</span>
                    <span class="receipt-value">${this.formatCurrency(i)}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Payment Method:</span>
                    <span class="receipt-value">M-Pesa</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Phone Number:</span>
                    <span class="receipt-value">${s}</span>
                </div>
                <div class="receipt-row total">
                    <span class="receipt-label">Total Amount:</span>
                    <span class="receipt-value">$${i.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="receipt-section">
                <div class="receipt-section-title">Transaction Information</div>
                <div class="receipt-row">
                    <span class="receipt-label">Date:</span>
                    <span class="receipt-value">${new Date().toLocaleDateString()}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Time:</span>
                    <span class="receipt-value">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="receipt-row">
                    <span class="receipt-label">Status:</span>
                    <span class="receipt-value" style="color: #10b981; font-weight: bold;">COMPLETED</span>
                </div>
            </div>
        </div>
        <div class="receipt-footer">
            <p>Thank you for your purchase!</p>
            <p>Keep this receipt for your records.</p>
            <p>For support, contact our customer service team.</p>
            <div class="receipt-id">Receipt ID: ${e}</div>
        </div>
    </div>
</body>
</html>
        `,o=new Blob([n],{type:"text/html"}),l=window.URL.createObjectURL(o),r=document.createElement("a");r.href=l,r.download=`Receipt_${a}_${new Date().getTime()}.html`,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(l),this.showNotification("Receipt downloaded successfully!","success")}logout(){this.user=null,this.authToken=null,localStorage.removeItem("token"),localStorage.removeItem("user"),this.renderNavbar(),this.navigateToPage("home"),this.showNotification("Logged out successfully","success")}}document.addEventListener("DOMContentLoaded",()=>{window.app=new h});window.addEventListener("popstate",c=>{c.state&&c.state.page&&window.app.navigateToPage(c.state.page)});
