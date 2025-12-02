function downloadAndRedirect() {
    const fileUrl = '/qads.dmg';
    const redirectUrl = 'thankyou.html';
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = '';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 500); 
}