// Global variables
let currentDevice = "mobile"

// Smooth scroll to viewer section
function scrollToViewer() {
  document.getElementById("viewer").scrollIntoView({
    behavior: "smooth",
  })

  // Focus on URL input after scroll
  setTimeout(() => {
    document.getElementById("urlInput").focus()
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

  loadingOverlay.classList.add("show")

  // Load URL in appropriate iframe
  const iframe =
    currentDevice === "mobile" ? document.getElementById("mobileIframe") : document.getElementById("desktopIframe")

  // Update browser URL display for desktop
  if (currentDevice === "desktop") {
    document.getElementById("browserUrl").textContent = url
  }

  // Set iframe source
  iframe.src = url

  // Hide loading overlay after delay
  setTimeout(() => {
    loadingOverlay.classList.remove("show")
  }, 2000)

  // Handle iframe load error
  iframe.onerror = () => {
    loadingOverlay.classList.remove("show")
    alert("Unable to load the URL. The website may not allow embedding.")
  }
}

// Handle Enter key in URL input
document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("urlInput")

  urlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      loadURL()
    }
  })

  // Add scroll animations
  observeElements()

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form")
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = e.target.querySelector("input").value
    alert(`Thank you for subscribing with ${email}!`)
    e.target.reset()
  })
})

  alert(toolMessages[toolName] || "Tool launching...")

  // Scroll to viewer for demonstration
  scrollToViewer()
}

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
  const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

  // Create progress bar if it doesn't exist
  let progressBar = document.querySelector(".scroll-progress")
  if (!progressBar) {
    progressBar = document.createElement("div")
    progressBar.className = "scroll-progress"
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            z-index: 9999;
            transition: width 0.1s ease-out;
        `
    document.body.appendChild(progressBar)
  }

  progressBar.style.width = `${scrollProgress}%`
})

// Console message for developers
console.log("%c🚀 Mobile Viewer", "color: #00F0FF; font-size: 24px; font-weight: bold;")
console.log(
  "%cWelcome to Mobile Viewer! Built with ❤️ for developers and designers.",
  "color: #7B61FF; font-size: 14px;",
)
console.log(
  "%cNote: Some websites may not load due to X-Frame-Options restrictions.",
  "color: #FF006B; font-size: 12px;",
)
