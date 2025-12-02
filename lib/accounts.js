import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

let createdUserId = null;
let isPasswordValid = false;

const accountTypeSelect = document.getElementById('account-type');
const businessNameContainer = document.getElementById('business-name-container');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-message');
const signupSection = document.getElementById('signup-section');
const upgradeSection = document.getElementById('upgrade-section');

accountTypeSelect.addEventListener('change', (e) => {
    const isBusiness = e.target.value === 'business';
    businessNameContainer.style.display = isBusiness ? 'block' : 'none';
    const busInput = document.getElementById('business-name');
    if (isBusiness) busInput.setAttribute('required', 'true');
    else busInput.removeAttribute('required');
});

document.getElementById('toggle-password').addEventListener('click', () => {
    const isPass = passwordInput.type === 'password';
    passwordInput.type = isPass ? 'text' : 'password';
    document.getElementById('eye-icon').classList.toggle('hidden', !isPass);
    document.getElementById('eye-slash-icon').classList.toggle('hidden', isPass);
});

const reqs = {
    length: { regex: /.{8,}/, el: document.getElementById('req-length') },
    capital: { regex: /[A-Z]/, el: document.getElementById('req-capital') },
    number: { regex: /[0-9]/, el: document.getElementById('req-number') },
    special: { regex: /[^A-Za-z0-9]/, el: document.getElementById('req-special') }
};

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let allMet = true;
    for (const key in reqs) {
        const req = reqs[key];
        const met = req.regex.test(val);
        const icon = req.el.querySelector('.check-icon');
        if (met) {
            req.el.className = "flex items-center gap-2 transition-colors duration-200 text-green-400";
            icon.classList.remove('opacity-0');
        } else {
            req.el.className = "flex items-center gap-2 transition-colors duration-200 text-gray-500";
            icon.classList.add('opacity-0');
            allMet = false;
        }
    }
    isPasswordValid = allMet;
});

document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.add('hidden');

    if (!isPasswordValid) {
        errorMsg.textContent = "Password Requirements Not Met";
        errorMsg.classList.remove('hidden');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Creating Account...";

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const userData = {
        accountType: document.getElementById('account-type').value,
        businessName: document.getElementById('business-name').value,
        taxId: document.getElementById('tax-id').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: email,
        phone: document.getElementById('phone').value,
        createdAt: new Date(),
        plan: 'pending_selection'
    };

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        createdUserId = userCredential.user.uid;

        await setDoc(doc(db, "users", createdUserId), userData);

        Toastify({
            text: "Account Created Successfully",
            duration: 3000,
            style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
        }).showToast();

        signupSection.classList.add('hidden');
        upgradeSection.classList.remove('hidden');
        setTimeout(() => upgradeSection.classList.add('fade-enter-active'), 50);

    } catch (error) {
        console.error("Registration Error:", error);
        
        let message = error.message;
        if (message.includes("email-already-in-use")) message = "This email is already registered.";
        else if (message.includes("permission-denied")) message = "Database Error: Permission Denied. Contact Support.";
        
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
        
        submitBtn.disabled = false;
        submitBtn.textContent = "Continue";
    }
});

document.getElementById('upgrade-pro-btn').addEventListener('click', () => {
    if (createdUserId) {
        window.location.href = `https://buy.stripe.com/cNifZicQQ9pcba09u90Fi0a?utm_source=acct_${createdUserId}`;
    } else {
        alert("Session error. Please refresh and try logging in.");
    }
});
