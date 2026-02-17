//Responsive-navbar

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Closes nav when a link is clicked
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});

//Navbar user dropdown and authentication
const userArea = document.getElementById("userArea");

function updateNavbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && userArea) {
    userArea.innerHTML = `
      <div class="user-dropdown">
        <span id="userName">${currentUser.name} ▾</span>
        <div class="dropdown-menu" id="dropdownMenu">
          <p id="logoutBtn">Logout</p>
        </div>
      </div>
    `;

    const userName = document.getElementById("userName");
    const dropdown = document.getElementById("dropdownMenu");

    userName.addEventListener("click", () => {
      dropdown.classList.toggle("show");
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      alert("Logged out successfully 👋");
      window.location.reload();
    });
  }
}

updateNavbar();

//Registration form

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    if (localStorage.getItem("user_" + email)) {
      alert("User already exists ❌");
      return;
    }

    const user = { name, email, password };
    localStorage.setItem("user_" + email, JSON.stringify(user));

    alert("Registration successful 🎉 Please login.");
    window.location.href = "login.html";
  });
}

//Login-form

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user_" + email));

    if (storedUser && storedUser.password === password) {
      localStorage.setItem("currentUser", JSON.stringify(storedUser));
      alert("Login successful ✅");
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password ❌");
    }
  });
}

//Reservation-form

const reservationForm = document.getElementById("reservationForm");
const resDateInput = document.getElementById("resDate");

// Date restrictions
if (resDateInput) {
  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  // Minimum date = today
  resDateInput.setAttribute("min", todayFormatted);

  // Maximum date = 31 December of current year
  const currentYear = today.getFullYear();
  const lastDateOfYear = `${currentYear}-12-31`;

  resDateInput.setAttribute("max", lastDateOfYear);
}

if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const selectedDate = document.getElementById("resDate").value;
    const selectedTime = document.getElementById("resTime").value;
    const guests = document.getElementById("resGuests").value;

    // Login check
    if (!currentUser) {
      alert("Please login first to reserve a table.");
      window.location.href = "login.html";
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const currentYear = new Date().getFullYear();
    const selectedYear = new Date(selectedDate).getFullYear();

    // Past date check
    if (selectedDate < today) {
      alert("You cannot reserve a past date ❌");
      return;
    }

    // Year limit check
    if (selectedYear !== currentYear) {
      alert("You can only book within the current year ❌");
      return;
    }

    alert(`Reservation Confirmed 🎉

Date: ${selectedDate}
Time: ${selectedTime}
Guests: ${guests}

See you soon, ${currentUser.name}!`);

    reservationForm.reset();
  });
}

// filter-full-menu
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    const category = button.getAttribute("data-category");

    menuCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

//Contact-form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;

    alert(`Thank you ${name}! 🎉Your message has been sent successfully.`);

    contactForm.reset();
  });
}

//Scroll-animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-show");
      }
    });
  },
  { threshold: 0.15 },
);

const animatedElements = document.querySelectorAll(
  "section, .auth-box, .reservation-container, .contact-form",
);

animatedElements.forEach((el) => {
  el.classList.add("fade-hidden");
  observer.observe(el);
});
