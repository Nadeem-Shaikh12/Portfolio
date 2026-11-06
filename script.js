/**
 * SHAIKH NADEEM - ANIMATED PORTFOLIO JAVASCRIPT
 */

document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------
    // 1. Dynamic Typewriter Effect for Hero Section
    // ----------------------------------------------------
    const typingElement = document.getElementById("typing-text");
    if (typingElement) {
        const roles = [
            "Frontend Websites",
            "Modern UI/UX Designs",
            "Python Applications",
            "Data Analytics Dashboards",
            "Responsive Web Apps"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const delayBetweenRoles = 1800;

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let nextTimeout = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentRole.length) {
                nextTimeout = delayBetweenRoles;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                nextTimeout = 400;
            }

            setTimeout(type, nextTimeout);
        }

        type();
    }

    // ----------------------------------------------------
    // 2. Scroll Progress Bar & Back-to-Top Button
    // ----------------------------------------------------
    const progressBar = document.getElementById("scroll-progress");
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", function () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        if (progressBar) {
            progressBar.style.width = scrollPercentage + "%";
        }

        if (backToTopBtn) {
            if (scrollTop > 350) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ----------------------------------------------------
    // Section Active Nav Link on Scroll & Scrolled Navbar
    // ----------------------------------------------------
    const mainNavbar = document.getElementById("main-navbar");
    const allSections = document.querySelectorAll("section[id]");
    const allNavLinks = document.querySelectorAll(".navbar-nav .nav-link");

    function updateNavOnScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        if (mainNavbar) {
            if (scrollY > 40) {
                mainNavbar.classList.add("scrolled-nav");
            } else {
                mainNavbar.classList.remove("scrolled-nav");
            }
        }

        const navOffset = 120;
        let activeSectionId = "";

        allSections.forEach(function (sec) {
            const secTop = sec.offsetTop - navOffset;
            const secHeight = sec.offsetHeight;
            if (scrollY >= secTop && scrollY < secTop + secHeight) {
                activeSectionId = sec.getAttribute("id");
            }
        });

        if (activeSectionId) {
            allNavLinks.forEach(function (link) {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + activeSectionId) {
                    link.classList.add("active");
                }
            });
        }
    }

    window.addEventListener("scroll", updateNavOnScroll);
    updateNavOnScroll();

    // ----------------------------------------------------
    // 3. Scroll Reveal Animation using IntersectionObserver
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-zoom");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active-reveal");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(function (el) {
            el.classList.add("active-reveal");
        });
    }

    // ----------------------------------------------------
    // 4. Animated Number Counters
    // ----------------------------------------------------
    const counterElements = document.querySelectorAll(".counter-number");
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counterElements.forEach(function (counter) {
            const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
            const duration = 1600; // ms
            const stepTime = 30; // ms
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            let current = 0;

            const timer = setInterval(function () {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + "+";
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + "+";
                }
            }, stepTime);
        });
    }

    const journeySection = document.getElementById("journey");
    if (journeySection && "IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            function (entries) {
                if (entries[0].isIntersecting) {
                    startCounters();
                }
            },
            { threshold: 0.25 }
        );
        counterObserver.observe(journeySection);
    } else {
        startCounters();
    }

    // ----------------------------------------------------
    // 5. Mobile Navbar Auto-Collapse on Link Click
    // ----------------------------------------------------
    const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (navbarCollapse) {
        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse && navbarCollapse.classList.contains("show")) {
                    bsCollapse.hide();
                }
            });
        });
    }

    // ----------------------------------------------------
    // 6. Project Category Filter
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                filterButtons.forEach(function (btn) {
                    btn.classList.remove("active", "btn-dark");
                    btn.classList.add("btn-outline-dark");
                });
                this.classList.add("active", "btn-dark");
                this.classList.remove("btn-outline-dark");

                const filterValue = this.getAttribute("data-filter");

                projectItems.forEach(function (item) {
                    const itemCategory = item.getAttribute("data-category");
                    if (filterValue === "all" || itemCategory === filterValue) {
                        item.style.display = "block";
                        setTimeout(function () {
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 50);
                    } else {
                        item.style.opacity = "0";
                        item.style.transform = "scale(0.85)";
                        setTimeout(function () {
                            item.style.display = "none";
                        }, 300);
                    }
                });
            });
        });
    }

    // ----------------------------------------------------
    // 7. Certificate Pagination & Modal Preview
    // ----------------------------------------------------
    const page1 = document.getElementById("certificate-page-1");
    const page2 = document.getElementById("certificate-page-2");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const pageIndicator = document.getElementById("page-indicator");

    if (nextBtn && prevBtn && page1 && page2) {
        nextBtn.addEventListener("click", function () {
            page1.classList.add("d-none");
            page2.classList.remove("d-none");
            nextBtn.classList.add("d-none");
            prevBtn.classList.remove("d-none");
            if (pageIndicator) pageIndicator.textContent = "Page 2 of 2";
        });

        prevBtn.addEventListener("click", function () {
            page2.classList.add("d-none");
            page1.classList.remove("d-none");
            prevBtn.classList.add("d-none");
            nextBtn.classList.remove("d-none");
            if (pageIndicator) pageIndicator.textContent = "Page 1 of 2";
        });
    }

    const certImages = document.querySelectorAll(".cert-img");
    const modalElement = document.getElementById("certificateModal");
    const modalImg = document.getElementById("modal-img");

    if (modalElement && modalImg) {
        const modal = new bootstrap.Modal(modalElement);
        certImages.forEach(function (img) {
            img.addEventListener("click", function () {
                modalImg.src = this.src;
                modal.show();
            });
        });
    }

    // ----------------------------------------------------
    // 8. Theme Toggle (Dark / Light Mode)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-icon");
    const currentTheme = localStorage.getItem("portfolio-theme") || "light";

    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            if (isDark) {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("portfolio-theme", "light");
                if (themeIcon) {
                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");
                }
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("portfolio-theme", "dark");
                if (themeIcon) {
                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");
                }
            }
        });
    }

    // ----------------------------------------------------
    // 9. Contact Form Real Email Delivery (Web3Forms + Mailto Fallback)
    // ----------------------------------------------------
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : "Send Message";
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");
            const keyInput = document.getElementById("web3forms-key");

            const senderName = nameInput ? nameInput.value.trim() : "Friend";
            const senderEmail = emailInput ? emailInput.value.trim() : "";
            const senderMessage = messageInput ? messageInput.value.trim() : "";
            const accessKey = keyInput ? keyInput.value.trim() : "";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-2"></i>Sending...';
            }

            let alertBox = document.getElementById("contact-feedback-alert");
            if (!alertBox) {
                alertBox = document.createElement("div");
                alertBox.id = "contact-feedback-alert";
                alertBox.className = "alert mt-3 rounded-3 shadow-sm border-0 d-flex align-items-center";
                contactForm.appendChild(alertBox);
            }

            function triggerMailto() {
                const subject = encodeURIComponent(`Portfolio Message from ${senderName}`);
                const body = encodeURIComponent(`Hi Nadeem,\n\n${senderMessage}\n\nFrom: ${senderName}\nEmail: ${senderEmail}`);
                const mailtoLink = `mailto:nadimshaikh74161@gmail.com?subject=${subject}&body=${body}`;

                alertBox.className = "alert alert-success mt-3 rounded-3 shadow-sm border-0 d-flex align-items-center";
                alertBox.innerHTML = `
                    <i class="fa-solid fa-circle-check fa-lg text-success me-2"></i>
                    <div>Thank you, <strong>${senderName}</strong>! Opening your email app to send directly to <strong>nadimshaikh74161@gmail.com</strong>. <a href="${mailtoLink}" class="alert-link text-decoration-underline ms-1">Click here if it didn't open automatically</a>.</div>
                `;
                alertBox.style.display = "flex";

                setTimeout(function () {
                    window.location.href = mailtoLink;
                }, 400);

                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }
            }

            // If a real Web3Forms key is provided (not the default placeholder)
            if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE") {
                try {
                    const formData = new FormData(contactForm);
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: formData
                    });
                    const json = await response.json();

                    if (json.success) {
                        alertBox.className = "alert alert-success mt-3 rounded-3 shadow-sm border-0 d-flex align-items-center";
                        alertBox.innerHTML = `
                            <i class="fa-solid fa-circle-check fa-lg text-success me-2"></i>
                            <div>Thank you, <strong>${senderName}</strong>! Your message has been sent directly to <strong>nadimshaikh74161@gmail.com</strong>. I'll get back to you shortly.</div>
                        `;
                        alertBox.style.display = "flex";
                        contactForm.reset();
                    } else {
                        triggerMailto();
                    }
                } catch (err) {
                    triggerMailto();
                }
            } else {
                // Pre-fills and opens email client directly to nadimshaikh74161@gmail.com
                triggerMailto();
            }

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
        });
    }
});
