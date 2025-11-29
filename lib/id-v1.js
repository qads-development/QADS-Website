(function(window, document) {
    'use strict';

    const CONFIG = {
        iframeSrc: 'https://qads.cloud/id-frame.html',
        containerId: 'qads-captcha-container',
        targetOrigin: 'https://qads.cloud',
        tokenInputName: 'qads_verification_token'
    };

    let isVerified = false;
    let widgetIframe = null;
    let targetForm = null;
    let submitButtons = [];

    function init() {
        const container = document.getElementById(CONFIG.containerId);
        if (!container) return;

        targetForm = container.closest('form');
        if (!targetForm) return;

        submitButtons = Array.from(targetForm.querySelectorAll('button[type="submit"], input[type="submit"]'));

        injectWidget(container);
        lockForm();
        setupMessageListener();
        setupFormInterception();
    }

    function injectWidget(container) {
        widgetIframe = document.createElement('iframe');
        widgetIframe.src = CONFIG.iframeSrc;
        widgetIframe.title = "Verification";
        
        widgetIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups'); 
        
        widgetIframe.style.width = '300px';
        widgetIframe.style.height = '65px';
        widgetIframe.style.border = 'none';
        widgetIframe.style.overflow = 'hidden';
        widgetIframe.style.display = 'block';
        
        container.appendChild(widgetIframe);
    }

    function lockForm() {
        submitButtons.forEach(btn => {
            btn.disabled = true;
            btn.dataset.originalText = btn.innerText || btn.value;
        });

        targetForm.addEventListener('submit', handleFormSubmit, true);
    }

    function unlockForm(token) {
        isVerified = true;

        submitButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.cursor = 'pointer';
            btn.style.opacity = '1';
        });

        let tokenInput = targetForm.querySelector(`input[name="${CONFIG.tokenInputName}"]`);
        if (!tokenInput) {
            tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = CONFIG.tokenInputName;
            targetForm.appendChild(tokenInput);
        }
        tokenInput.value = token;
    }

    function handleFormSubmit(e) {
        if (!isVerified) {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            const container = document.getElementById(CONFIG.containerId);
            if(container) {
                container.style.transition = "transform 0.1s";
                container.style.transform = "translateX(-5px)";
                setTimeout(() => container.style.transform = "translateX(5px)", 100);
                setTimeout(() => container.style.transform = "translateX(0)", 200);
            }
            return false;
        }
    }

    function setupMessageListener() {
        window.addEventListener('message', function(event) {
            if (event.origin !== CONFIG.targetOrigin) {
                return; 
            }

            if (!event.data || !event.data.action) return;

            if (event.data.action === 'QADS_VERIFY_SUCCESS') {
                const token = event.data.token;
                unlockForm(token);
            }

            if (event.data.action === 'QADS_RESIZE') {
                if(widgetIframe) {
                    widgetIframe.style.height = event.data.height + 'px';
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(window, document);
