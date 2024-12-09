function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

locomotiveAnimation();

let videocon = document.querySelector(".video-container");
let platbtn = document.querySelector(".play");



function videoanimation() {

    videocon.addEventListener("mouseenter", function () {

        gsap.to(platbtn, {
            opacity: 1,
            scale: 1,
        })

        // platbtn.style.opacity = 1
        // platbtn.style.scale = 1
    })
    videocon.addEventListener("mouseleave", function () {

        gsap.to(platbtn, {
            opacity: 0,
            scale: 0,
        })

        // platbtn.style.opacity = 0
        // platbtn.style.scale = 0
    })

    videocon.addEventListener("mousemove", function (dets) {
        gsap.to(platbtn, {
            left: dets.x - 70,
            top: dets.y - 80
        })
    })

}


// videoanimation()


function loadingAnimation() {
    gsap.from(".page1 h1", {
        y: 100,
        opacity: 0,
        // scale : 0,
        duration: 0.5,
        delay: 0.6,
        stagger: 0.2
    })

    gsap.from(videocon, {
        scale: 0.9,
        // y : 100,
        opacity: 0,
        // scale : 0,
        duration: 0.5,
        delay: 1.3,
    })
}

loadingAnimation()


function cursorAnimation() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y
        })
    })

    document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to("#cursor", {
                transform: "translate(-50%,-50%) scale(3)",
            })
        })
    })
    document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseleave", function () {
            gsap.to("#cursor", {
                transform: "translate(-50%,-50%) scale(0)",
            })
        })
    })

}

cursorAnimation()

function navAnimation() {

    // gsap.to("nav", {

    //     scrollTrigger: {
    //         trigger: ".page1",
    //         scroller: "#main",
    //         start: "top 0",
    //         end: "top -5%",
    //         scrub: true
    //     },
    //     backgroundColor: "rgba(255, 255, 255, 0.2)",
    //     // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    //     backdropFilter: "blur(5px)",
    //     WebkitBackdropFilter: "blur(5px)",
    //     // borderRadius: "10px",
    //     // border: "1px solid rgba(255, 255, 255, 0.18)"

    // }
    // )

gsap.to(".nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
        trigger: ".page1",
        scroller: "#main",
        // markers : true,
        start: "top 0",
        end: "top -5%",
        scrub: true
    }
})
gsap.to(".nav-part2 .links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
        trigger: ".page1",
        scroller: "#main",
        // markers : true,
        start: "top 0",
        end: "top -5%",
        scrub: true
    }
})

}

navAnimation()

function feedbackFormAnimation() {
    gsap.from("#feedback-form", {
        y: -20,
        opacity: 0,
        duration: 2,
        scrollTrigger: {
            trigger: ".page4 #feedback-form",
            scroller: "#main",
            start: "top 70%",
            // markers: true,
            // end :"top -5%",
            // scrub : true
        }
    })


    
}

feedbackFormAnimation()


// Feedback messages for each client
const feedbackMessages = {
    client1: " 'This website transformed my business. Highly recommended!'",
    client2: " 'Amazing products and great customer service!'",
    client3: " 'I love shopping here. A wonderful experience every time!'",
    client4: " 'The support team was so helpful. I’ll be back!'",
    client5: " 'Fantastic experience. I’m impressed!'",
    client6: " 'This site is a game-changer. Thank you!'",
    client7: " 'High-quality products at great prices!'",
    client8: " 'Easy to navigate and super helpful!'",
    client9: " 'I found exactly what I needed here.'",
    client10: "'Fast and reliable service. Highly recommend!'",
    client11: "  'A delightful shopping experience!'",
    client12: " 'This website exceeded my expectations.'",
    client13: " 'Professional and efficient services!'",
    client14: " 'I couldn’t ask for a better experience.'",
    client15: " 'Excellent quality and customer care!'"
};

// Select elements
const form = document.getElementById('feedback-form');
const feedbackDiv = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');

// Function to update feedback
const updateFeedback = (client) => {
    if (feedbackMessages[client]) {
        gsap.from("#feedback-text",{
            opacity: 0,
            y : 100,
            duration: 0.7,
            ease: "power3.inOut"
        })
        feedbackText.textContent = feedbackMessages[client];
        feedbackDiv.classList.remove('hidden');
    } else {
        feedbackText.textContent = '';
        feedbackDiv.classList.add('hidden');
    }
};

// Set default feedback on page load
document.addEventListener('DOMContentLoaded', () => {
    const defaultClient = form.querySelector('input[name="client"]:checked').value;
    updateFeedback(defaultClient);
});

// Event listener for radio buttons
form.addEventListener('change', (event) => {
    const selectedClient = event.target.value;
    updateFeedback(selectedClient);
});
