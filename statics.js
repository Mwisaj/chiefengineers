
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    let started = false;

    const startCount = () => {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const speed = 80;

            const update = () => {
                const current = +counter.innerText;
                const increment = Math.ceil(target / speed);

                if (current < target) {
                    counter.innerText = current + increment;
                    setTimeout(update, 30);
                } else {
                    counter.innerText = target;
                }
            };

            update();
        });
    };

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            startCount();
        }
    }, { threshold: 0.4 });

    observer.observe(document.querySelector(".counter"));
});


    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
