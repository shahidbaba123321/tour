// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Carousel Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    function showSlide(index) {
        if(index >= totalSlides) currentSlide = 0;
        else if(index < 0) currentSlide = totalSlides -1;
        else currentSlide = index;

        const slidesContainer = document.querySelector('.slides');
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    prev.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    next.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Auto Slide
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Countdown Timers
    function initializeCountdown(id, endDate) {
        const countdown = document.getElementById(id);
        const endTime = new Date(endDate).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if(distance < 0){
                clearInterval(timer);
                countdown.innerHTML = "EXPIRED";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 *24));
            const hours = Math.floor((distance % (1000 * 60 *60 *24)) / (1000 * 60 *60));
            const minutes = Math.floor((distance % (1000 * 60 *60)) / (1000 *60));
            const seconds = Math.floor((distance % (1000 *60)) / 1000);

            countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    // Initialize Countdowns with desired end dates
    initializeCountdown('countdown1', 'December 31, 2024 23:59:59');
    initializeCountdown('countdown2', 'November 30, 2024 23:59:59');

    // Advanced Search Filtering
    let toursData = [];

    fetch('data/tours.json')
        .then(response => response.json())
        .then(data => {
            toursData = data;
            displayTours(toursData);
        })
        .catch(error => console.error('Error loading tours data:', error));

    function displayTours(tours) {
        const toursGrid = document.getElementById('toursGrid');
        toursGrid.innerHTML = '';

        if (tours.length === 0) {
            toursGrid.innerHTML = '<p>No tours found matching your criteria.</p>';
            return;
        }

        tours.forEach(tour => {
            const tourCard = document.createElement('div');
            tourCard.classList.add('tour-card', 'animate__animated', 'animate__fadeInUp');

            tourCard.innerHTML = `
                <img src="${tour.image}" alt="${tour.name}">
                <div class="tour-info">
                    <h3>${tour.name}</h3>
                    <p>${tour.description}</p>
                    <span class="price">$${tour.price}</span>
                    <div class="tour-actions">
                        <a href="tours.html" class="btn">Details</a>
                        <a href="booking.html" class="btn btn-secondary">Book Now</a>
                    </div>
                </div>
            `;
            toursGrid.appendChild(tourCard);
        });
    }

    document.getElementById('searchForm').addEventListener('submit', function(e){
        e.preventDefault();

        const destination = document.getElementById('destination').value.trim().toLowerCase();
        const duration = document.getElementById('duration').value;
        const priceRange = document.getElementById('price').value;

        let filteredTours = toursData;

        if(destination) {
            filteredTours = filteredTours.filter(tour => tour.destination.toLowerCase().includes(destination));
        }

        if(duration) {
            filteredTours = filteredTours.filter(tour => tour.duration === parseInt(duration));
        }

        if(priceRange) {
            if(priceRange === '2000+') {
                filteredTours = filteredTours.filter(tour => tour.price >= 2000);
            } else {
                const [min, max] = priceRange.split('-').map(Number);
                filteredTours = filteredTours.filter(tour => tour.price >= min && tour.price <= max);
            }
        }

        displayTours(filteredTours);
    });

    // Testimonials Loading
    let testimonialsData = [];

    fetch('data/testimonials.json')
        .then(response => response.json())
        .then(data => {
            testimonialsData = data;
            displayTestimonials(testimonialsData);
        })
        .catch(error => console.error('Error loading testimonials:', error));

    function displayTestimonials(testimonials) {
        const testimonialsGrid = document.getElementById('testimonialsGrid');
        testimonialsGrid.innerHTML = '';

        if (testimonials.length === 0) {
            testimonialsGrid.innerHTML = '<p>No testimonials available at the moment.</p>';
            return;
        }

        testimonials.forEach(testimonial => {
            const testimonialCard = document.createElement('div');
            testimonialCard.classList.add('testimonial-card', 'animate__animated', 'animate__fadeInUp');

            testimonialCard.innerHTML = `
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <p>"${testimonial.review}"</p>
                <span>- ${testimonial.name}</span>
            `;
            testimonialsGrid.appendChild(testimonialCard);
        });
    }

    // Blog Posts Loading
    let blogPostsData = [];

    fetch('data/blogposts.json')
        .then(response => response.json())
        .then(data => {
            blogPostsData = data;
            displayBlogPosts(blogPostsData);
        })
        .catch(error => console.error('Error loading blog posts:', error));

    function displayBlogPosts(posts) {
        const blogGrid = document.getElementById('blogGrid');
        blogGrid.innerHTML = '';

        if (posts.length === 0) {
            blogGrid.innerHTML = '<p>No blog posts available at the moment.</p>';
            return;
        }

        posts.forEach(post => {
            const blogPost = document.createElement('div');
            blogPost.classList.add('blog-post', 'animate__animated', 'animate__fadeInUp');

            blogPost.innerHTML = `
                <img src="${post.image}" alt="${post.title}">
                <h4>${post.title}</h4>
                <a href="blog.html" class="btn">Read More</a>
            `;
            blogGrid.appendChild(blogPost);
        });
    }

    // Newsletter Form Validation and Submission
    document.getElementById('newsletterForm').addEventListener('submit', function(e){
        e.preventDefault();

        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        const messageDiv = document.getElementById('newsletterMessage');

        if(!validateEmail(email)){
            messageDiv.textContent = 'Please enter a valid email address.';
            messageDiv.style.color = 'red';
            return;
        }

        // Simulate AJAX submission
        fetch('https://jsonplaceholder.typicode.com/posts', { // Placeholder URL
            method: 'POST',
            body: JSON.stringify({ email: email }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => {
            if(response.ok){
                messageDiv.textContent = 'Thank you for subscribing!';
                messageDiv.style.color = 'green';
                emailInput.value = '';
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            messageDiv.textContent = 'There was an error subscribing. Please try again later.';
            messageDiv.style.color = 'red';
            console.error('Error:', error);
        });
    });

    function validateEmail(email) {
        // Simple email regex
        const re = /^(([^<>()$$$$\\.,;:\s@"]+(\.[^<>()$$$$\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }

    // Search Form Real-time Validation
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('input', () => {
        const destination = document.getElementById('destination');
        const duration = document.getElementById('duration');
        const price = document.getElementById('price');

        if(destination.value && duration.value && price.value){
            searchForm.querySelector('.btn').disabled = false;
        } else {
            searchForm.querySelector('.btn').disabled = true;
        }
    });

});
