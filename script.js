// Global variables
let currentDevice = "mobile"

// Smooth scroll to viewer section
function scrollToViewer() {
  const viewer = document.getElementById("viewer");
  if (viewer) {
    viewer.scrollIntoView({
      behavior: "smooth",
    })
  }

function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

// Load the components
loadComponent('header-placeholder', 'header.html');
loadComponent('footer-placeholder', 'footer.html');
 
  // Focus on URL input after scroll
  setTimeout(() => {
    const urlInput = document.getElementById("urlInput");
    if (urlInput) urlInput.focus();
  }, 800)
}

// Switch between mobile and desktop view
function switchDevice(device) {
  currentDevice = device

  // Update button states
  const buttons = document.querySelectorAll(".toggle-btn")
  buttons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.dataset.device === device) {
      btn.classList.add("active")
    }
  })

  // Update frame visibility
  const mobileFrame = document.getElementById("mobileFrame")
  const desktopFrame = document.getElementById("desktopFrame")

  if (device === "mobile") {
    mobileFrame.classList.add("active")
    desktopFrame.classList.remove("active")
  } else {
    desktopFrame.classList.add("active")
    mobileFrame.classList.remove("active")
  }
}

// Load URL in iframe
function loadURL() {
  let url = document.getElementById("urlInput").value.trim()

  // Validate URL
  if (!url) {
    alert("Please enter a valid URL")
    return
  }

  // Add https:// if no protocol specified
  if (!url.match(/^https?:\/\//i)) {
    url = "https://" + url
  }
  
  // Try to validate URL
  try {
    new URL(url)
  } catch (e) {
    alert("Please enter a valid URL (e.g., https://example.com)")
    return
  }

  // Show loading overlay
  const loadingOverlay =
    currentDevice === "mobile" ? document.getElementById("mobileLoading") : document.getElementById("desktopLoading")

  if (loadingOverlay) loadingOverlay.classList.add("show")

  // Load URL in appropriate iframe
  const iframe =
    currentDevice === "mobile" ? document.getElementById("mobileIframe") : document.getElementById("desktopIframe")

  // Update browser URL display for desktop
  if (currentDevice === "desktop") {
    const browserUrl = document.getElementById("browserUrl");
    if (browserUrl) browserUrl.textContent = url;
  }

  // Set iframe source
  if (iframe) {
    iframe.src = url

    // Hide loading overlay after delay
    setTimeout(() => {
      if (loadingOverlay) loadingOverlay.classList.remove("show")
    }, 2000)

    // Handle iframe load error
    iframe.onerror = () => {
      if (loadingOverlay) loadingOverlay.classList.remove("show")
      alert("Unable to load the URL. The website may not allow embedding.")
    }
  }
}

// Handle Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("urlInput")

  if (urlInput) {
    urlInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        loadURL()
      }
    })
  }

  // Add scroll animations
  observeElements()

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const emailInput = e.target.querySelector("input")
      const email = emailInput ? emailInput.value : ""
      alert(`Thank you for subscribing with ${email}!`)
      e.target.reset()
    })
  }
})

// Intersection Observer for scroll animations
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe tool cards and feature cards
  const cards = document.querySelectorAll(".tool-card, .feature-card, .step-card")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`
    observer.observe(card)
  })
}

// Add parallax effect to hero orbs
document.addEventListener("mousemove", (e) => {
  const orbs = document.querySelectorAll(".glow-orb")
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20
    const x = (mouseX - 0.5) * speed
    const y = (mouseY - 0.5) * speed
    orb.style.transform = `translate(${x}px, ${y}px)`
  })
})

// Add scroll progress indicator
window.addEventListener("scroll", () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;

  let progressBar = document.querySelector(".scroll-progress")
  if (!progressBar) {
    progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #00F0FF, #7B61FF);
            z-index: 9999;
            transition: width 0.1s ease-out;
        `
    document.body.appendChild(progressBar)
  }

  progressBar.style.width = `${scrollProgress}%`
})
