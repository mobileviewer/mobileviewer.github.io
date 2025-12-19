/**
 * Responsive Viewport Resizer Logic
 * Handles dynamic iframe resizing and URL loading
 */

function updateIframeUrl() {
    const urlInput = document.getElementById('resizerUrl').value;
    const iframe = document.getElementById('resizerIframe');
    
    if (urlInput) {
        // Simple protocol check
        let targetUrl = urlInput;
        if (!urlInput.startsWith('http://') && !urlInput.startsWith('https://')) {
            targetUrl = 'https://' + urlInput;
        }
        
        iframe.src = targetUrl;
        console.log("Loading URL:", targetUrl);
    } else {
        alert("Please enter a valid URL");
    }
}

function resizeTo(width, height) {
    const wrapper = document.getElementById('frameWrapper');
    const dimsText = document.getElementById('dims');
    
    // Update CSS dimensions
    wrapper.style.width = width + 'px';
    wrapper.style.height = height + 'px';
    
    // Update Display Text
    dimsText.innerText = `${width}px × ${height}px`;
    
    // Handle Active Button State
    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Find the clicked button by matching text (simpler for this context)
    const event = window.event;
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Allow pressing "Enter" to load URL
document.getElementById('resizerUrl').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        updateIframeUrl();
    }
});
