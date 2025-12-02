import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzdgaW5iBX3zsk58lXUWdLlWQu0pv7Ico",
    authDomain: "qads-cloud.firebaseapp.com",
    projectId: "qads-cloud",
    storageBucket: "qads-cloud.firebasestorage.app",
    messagingSenderId: "436300161254",
    appId: "1:436300161254:web:a95d1bd995dcaa3530db27",
    measurementId: "G-XXSHBQLNMB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const urlParams = new URLSearchParams(window.location.search);
const utmSource = urlParams.get('utm_source');

if (utmSource && utmSource.startsWith('acct_')) {
    const userId = utmSource.replace('acct_', '').trim();
    
    console.log("Updating User ID:", userId);

    const userRef = doc(db, "users", userId);
    
    setDoc(userRef, { isPro: 1 }, { merge: true })
        .then(() => {
            console.log("Pro status activated for:", userId);
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    
    gsap.registerPlugin(ScrollTrigger);

    const heroTl = gsap.timeline({ 
        defaults: { ease: 'power4.out' } 
    });

    heroTl.from('.hero-logo', {
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)'
    }, 0.2)
    .from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.8
    }, '-=0.8')
    .from('.hero-title', {
        y: 50,
        opacity: 0,
        skewY: 2,
        duration: 1.2
    }, '-=0.6')
    .from('.hero-text', {
        y: 20,
        opacity: 0,
        duration: 1
    }, '-=1')
    .from('.hero-btns > *', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        clearProps: 'all'
    }, '-=0.8');

    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.feature-card',
            start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.feature-item', {
        scrollTrigger: {
            trigger: '.feature-card',
            start: 'top 75%',
        },
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.2
    });

    gsap.from('.feature-graphic', {
        scrollTrigger: {
            trigger: '.feature-card',
            start: 'top 75%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
    });

    gsap.from('.faq-header, .faq-sub', {
        scrollTrigger: {
            trigger: '.faq-header',
            start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1
    });

    gsap.from('.faq-item', {
        scrollTrigger: {
            trigger: '.faq-header', 
            start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power2.out'
    });

    document.querySelector('.anchor-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});