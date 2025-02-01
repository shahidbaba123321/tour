// script.js

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------
    // Carousel Functionality with Infinite Loop (Same as Homepage)
    // -----------------------
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let currentSlide = 1; // Start from the first actual slide

    console.log(`Total Slides: ${totalSlides}`);

    if (totalSlides <= 1) {
        console.warn('Not enough slides to create a carousel.');
        return;
    }

    // Initial Position
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Transition End Event for Infinite Looping
    slidesContainer.addEventListener('transitionend', () => {
        if (currentSlide === 0) {
            slidesContainer.style.transition = 'none';
            currentSlide = totalSlides - 2;
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            setTimeout(() => {
                slidesContainer.style.transition = 'transform 1s ease';
            }, 0);
        }
        if (currentSlide === totalSlides - 1) {
            slidesContainer.style.transition = 'none';
            currentSlide = 1;
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            setTimeout(() => {
                slidesContainer.style.transition = 'transform 1s ease';
            }, 0);
        }
    });

    function showSlide(index) {
        currentSlide = index;
        slidesContainer.style.transition = 'transform 1s ease';
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        console.log(`Showing slide: ${currentSlide}`);
    }

    prev.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    next.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Auto Slide
    let autoSlideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    carousel.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
        }
    });

    // -----------------------
    // Dynamic Content Loading (Targeted for About Us Page)
    // -----------------------

    // 1. Load Team Members (Only on About Us Page)
    if (document.getElementById('teamGrid')) {
        let teamData = [];

        fetch('data/team.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                teamData = data;
                displayTeamMembers(teamData);
            })
            .catch(error => {
                console.error('Error loading team data:', error);
                const teamGrid = document.getElementById('teamGrid');
                if (teamGrid) {
                    teamGrid.innerHTML = '<p>Failed to load team members. Please try again later.</p>';
                }
            });

        function displayTeamMembers(team) {
            const teamGrid = document.getElementById('teamGrid');
            if (!teamGrid) {
                console.error('teamGrid element not found in the DOM.');
                return;
            }

            console.log('Loading team members...');

            teamGrid.innerHTML = '';

            if (team.length === 0) {
                teamGrid.innerHTML = '<p>No team members found.</p>';
                return;
            }

            team.forEach(member => {
                console.log(`Adding team member: ${member.name}`);
                const teamMember = document.createElement('div');
                teamMember.classList.add('team-member', 'animate__animated', 'animate__fadeInUp');

                teamMember.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.position}</p>
                    <p>${member.bio}</p>
                `;
                teamGrid.appendChild(teamMember);
            });
        }
    }

    // 2. Load Customer Testimonials (Same as Homepage)
    let testimonialsData = [];

    fetch('data/testimonials.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            testimonialsData = data;
            displayTestimonials(testimonialsData);
        })
        .catch(error => {
            console.error('Error loading testimonials:', error);
            const testimonialsGrid = document.getElementById('testimonialsGrid');
            if (testimonialsGrid) {
                testimonialsGrid.innerHTML = '<p>Failed to load testimonials. Please try again later.</p>';
            }
        });

    function displayTestimonials(testimonials) {
        const testimonialsGrid = document.getElementById('testimonialsGrid');
        if (!testimonialsGrid) return; // Exit if not on the page

        testimonialsGrid.innerHTML = '';

        if (testimonials.length === 0) {
            testimonialsGrid.innerHTML = '<p>No testimonials available at the moment.</p>';
            return;
        }

        testimonials.forEach(testimonial => {
            console.log(`Adding testimonial: ${testimonial.name}`);
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

    // 3. Load Blog Posts (Same as Homepage)
    let blogPostsData = [];

    fetch('data/blogposts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            blogPostsData = data;
            displayBlogPosts(blogPostsData);
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            const blogGrid = document.getElementById('blogGrid');
            if (blogGrid) {
                blogGrid.innerHTML = '<p>Failed to load blog posts. Please try again later.</p>';
            }
        });

    function displayBlogPosts(posts) {
        const blogGrid = document.getElementById('blogGrid');
        if (!blogGrid) return; // Exit if not on the page

        blogGrid.innerHTML = '';

        if (posts.length === 0) {
            blogGrid.innerHTML = '<p>No blog posts available at the moment.</p>';
            return;
        }

        posts.forEach(post => {
            console.log(`Adding blog post: ${post.title}`);
            const blogPost = document.createElement('div');
            blogPost.classList.add('blog-post', 'animate__animated', 'animate__fadeInUp');

            blogPost.innerHTML = `
                <img src="${post.image}" alt="${post.title}">
                <h4>${post.title}</h4>
                <a href="${post.link}" class="btn">Read More</a>
            `;
            blogGrid.appendChild(blogPost);
        });
    }

    // -----------------------
    // Search Functionality (Homepage)
    // -----------------------
    // Ensure that the search functionality only runs on the homepage by checking for 'searchForm'
    if (document.getElementById('searchForm')) {
        let toursData = [];

        fetch('data/tours.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                toursData = data;
                displayTours(toursData);
            })
            .catch(error => {
                console.error('Error loading tours data:', error);
                const toursGrid = document.getElementById('toursGrid');
                if (toursGrid) {
                    toursGrid.innerHTML = '<p>Failed to load tours. Please try again later.</p>';
                }
            });

        function displayTours(tours) {
            const toursGrid = document.getElementById('toursGrid');
            if (!toursGrid) return; // Exit if not on the page

            toursGrid.innerHTML = '';

            if (tours.length === 0) {
                toursGrid.innerHTML = '<p>No tours found matching your criteria.</p>';
                return;
            }

            tours.forEach(tour => {
                console.log(`Adding tour: ${tour.name}`);
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

        // Search Form Event Listener
        document.getElementById('searchForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const destination = document.getElementById('destination').value.trim().toLowerCase();
            const duration = document.getElementById('duration').value;
            const priceRange = document.getElementById('price').value;

            let filteredTours = toursData;

            if (destination) {
                filteredTours = filteredTours.filter(tour => tour.destination.toLowerCase().includes(destination));
            }

            if (duration) {
                filteredTours = filteredTours.filter(tour => tour.duration === parseInt(duration));
            }

            if (priceRange) {
                if (priceRange === '2000+') {
                    filteredTours = filteredTours.filter(tour => tour.price >= 2000);
                } else {
                    const [min, max] = priceRange.split('-').map(Number);
                    filteredTours = filteredTours.filter(tour => tour.price >= min && tour.price <= max);
                }
            }

            displayTours(filteredTours);
        });

        // Search Form Real-time Validation
        const searchForm = document.getElementById('searchForm');
        searchForm.addEventListener('input', () => {
            const destination = document.getElementById('destination');
            const duration = document.getElementById('duration');
            const price = document.getElementById('price');

            if (destination.value && duration.value && price.value) {
                searchForm.querySelector('.btn').disabled = false;
            } else {
                searchForm.querySelector('.btn').disabled = true;
            }
        });

        // Initialize Search Button as Disabled
        searchForm.querySelector('.btn').disabled = true;
    }

    // -----------------------
    // Newsletter Form Validation and Submission (Same for Homepage and About Us)
    // -----------------------
    // Handle forms with id="newsletterForm"
    if (document.getElementById('newsletterForm')) {
        document.getElementById('newsletterForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput.value.trim();
            const messageDiv = document.getElementById('newsletterMessage');

            if (!validateEmail(email)) {
                messageDiv.textContent = 'Please enter a valid email address.';
                messageDiv.style.color = 'red';
                return;
            }

            // Simulate AJAX submission (Replace with actual backend endpoint)
            fetch('https://jsonplaceholder.typicode.com/posts', { // Placeholder URL
                method: 'POST',
                body: JSON.stringify({ email: email }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(response => {
                    if (response.ok) {
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
    }
});
