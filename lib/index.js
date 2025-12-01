// GSAP ANIMATIONS
document.addEventListener("DOMContentLoaded", (event) => {
gsap.registerPlugin(ScrollTrigger);

const heroTl = gsap.timeline();

heroTl.from("header", {
y: -100,
opacity: 0,
duration: 1,
ease: "power3.out"
})
.from(".hero-el", {
y: 50,
autoAlpha: 0,
duration: 1,
stagger: 0.15,
ease: "power3.out"
}, "-=0.5")
.to(".text-highlight", {
backgroundSize: "100% 100%",
duration: 1,
ease: "power2.out"
}, "-=0.5");

gsap.to(".anim-blob", {
x: "random(-40, 40)",
y: "random(-40, 40)",
scale: "random(0.9, 1.1)",
rotation: "random(-20, 20)",
duration: 6,
repeat: -1,
yoyo: true,
ease: "sine.inOut"
});

gsap.from(".bento-item", {
scrollTrigger: {
trigger: ".bento-item",
start: "top 80%",
toggleActions: "play none none reverse"
},
y: 100,
autoAlpha: 0,
duration: 0.8,
stagger: 0.2,
ease: "back.out(1.7)"
});

gsap.from(".tool-card", {
scrollTrigger: {
trigger: ".tool-card",
start: "top 85%"
},
y: 50,
autoAlpha: 0,
duration: 0.8,
stagger: 0.1,
ease: "power2.out"
});

gsap.utils.toArray('.gsap-reveal-up').forEach(elem => {
gsap.from(elem, {
scrollTrigger: {
trigger: elem,
start: "top 85%",
toggleActions: "play none none reverse"
},
y: 50,
autoAlpha: 0,
duration: 1,
ease: "power3.out"
});
});
});
