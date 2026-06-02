// REVEAL ANIMATIONS

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
},{
    threshold:0.15
});

reveals.forEach(item => observer.observe(item));


// FAQ ACCORDION

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {

    button.addEventListener("click", () => {

        const answer = button.nextElementSibling;

        if(answer.style.maxHeight){
            answer.style.maxHeight = null;
        }else{
            answer.style.maxHeight =
            answer.scrollHeight + "px";
        }
    });

});


// COUNTERS

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.dataset.target;

            let current = 0;

            const updateCounter = () => {

                const increment = target / 100;

                if(current < target){
                    current += increment;
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                }else{
                    counter.innerText = target;
                }
            };

            updateCounter();

            counterObserver.unobserve(counter);
        }
    });

});

counters.forEach(counter => {
    counterObserver.observe(counter);
});


// CONTACT FORM VALIDATION

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const errors = document.querySelectorAll(".error");

    errors.forEach(error => error.innerText = "");

    let valid = true;

    if(name.value.trim().length < 2){
        errors[0].innerText = "Please enter your name.";
        valid = false;
    }

    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email.value)){
        errors[1].innerText = "Enter a valid email.";
        valid = false;
    }

    if(message.value.trim().length < 10){
        errors[2].innerText =
        "Message must contain at least 10 characters.";
        valid = false;
    }

    if(valid){
        alert("Message sent successfully!");
        form.reset();
    }

});
