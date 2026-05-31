const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

  const themeOverlay = document.createElement("div");
  themeOverlay.id = "theme-transition";
  document.body.appendChild(themeOverlay);

  const savedTheme =
    localStorage.getItem("theme") || "dark";

  document.documentElement.setAttribute(
    "data-theme",
    savedTheme
  );

  updateIcon();

  themeToggle.addEventListener("click", () => {

    themeOverlay.classList.add("active");

    setTimeout(() => {

      const currentTheme =
        document.documentElement.getAttribute("data-theme");

      const nextTheme =
        currentTheme === "light"
          ? "dark"
          : "light";

      document.documentElement.setAttribute(
        "data-theme",
        nextTheme
      );

      localStorage.setItem(
        "theme",
        nextTheme
      );

      updateIcon();

    }, 280);

    setTimeout(() => {

      themeOverlay.classList.remove("active");

    }, 280);

  });

}

function updateIcon() {

  const currentTheme =
    document.documentElement.getAttribute("data-theme");

  if (themeToggle) {
    themeToggle.textContent =
      currentTheme === "light"
        ? "☀️"
        : "🌙";
  }

  const oldIcon =
    document.getElementById("favicon");

  if (!oldIcon) return;

  const newIcon =
    document.createElement("link");

  newIcon.id = "favicon";
  newIcon.rel = "icon";

  newIcon.href =
    currentTheme === "light"
      ? "favicon-light.svg"
      : "favicon-dark.svg";

  document.head.removeChild(oldIcon);
  document.head.appendChild(newIcon);
}

// Counter animation
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + '+';
    }, 20);
  });
}



// Intersection observer for counters
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); observer.disconnect(); } });
}, { threshold: 0.3 });
const metricsEl = document.getElementById('metrics');
if (metricsEl) observer.observe(metricsEl);

// Defect card toggle
function toggleDefect(card) {
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.defect-card').forEach(c => c.classList.remove('open'));
  if (!wasOpen) card.classList.add('open');
}

// Bug report tabs
function switchBug(index, tab) {
  document.querySelectorAll('.bug-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.bug-content').forEach(c => c.classList.remove('active'));
  tab.classList.add('active');
  document.querySelectorAll('.bug-content')[index].classList.add('active');
}

// Scroll fade-in for sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1 });
document.querySelectorAll('section > *:not(.hero-grid-bg):not(.hero-glow)').forEach(el => {
  if (!el.classList.contains('fade-up')) {
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    sectionObserver.observe(el);
  }
});

const contactModal =
  document.getElementById("contact-modal");

const openContact =
  document.getElementById("open-contact");

if (openContact && contactModal) {
  openContact.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.classList.add("active");
  });
}

const closeContact =
document.getElementById("close-contact");

if(closeContact && contactModal){

  closeContact.addEventListener("click", () => {
    contactModal.classList.remove("active");
  });

  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
    }
  });

}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") === "#" + current
    ) {
      link.classList.add("active");
    }

  });

});

const resumeModal=document.getElementById("resume-modal");
const openResume=document.getElementById("open-resume");
const closeResume=document.getElementById("close-resume");

if(resumeModal&&openResume&&closeResume){

openResume.addEventListener("click",(e)=>{
e.preventDefault();
resumeModal.classList.add("active");
});

closeResume.addEventListener("click",()=>{
resumeModal.classList.remove("active");
});

resumeModal.addEventListener("click",(e)=>{
if(e.target===resumeModal){
resumeModal.classList.remove("active");
}
});

}
const principleData = {

  1: {
    title: "Test Early",
    content: `
<p>
Quality starts long before execution begins. I believe defects identified during requirement reviews, design discussions, and planning stages are significantly cheaper and easier to fix than defects discovered after development or production deployment.
</p>

<ul>
<li>Review requirements for gaps and ambiguities</li>
<li>Identify risks before development starts</li>
<li>Discuss edge cases with stakeholders</li>
<li>Create test scenarios early in the SDLC</li>
<li>Reduce rework and project delays</li>
</ul>

<p>
Finding a defect before coding begins saves development effort, testing effort, and production support costs.
</p>
`
  },

  2: {
    title: "Verify Business Logic",
    content: `
<p>
A feature can be technically correct and still fail the business objective. My focus is not only verifying functionality but also ensuring the application follows the intended business rules and processes.
</p>

<ul>
<li>Validate calculations and workflows</li>
<li>Verify business rules and validations</li>
<li>Confirm expected outcomes with stakeholders</li>
<li>Test real-world usage scenarios</li>
<li>Ensure user requirements are fulfilled</li>
</ul>

<p>
Quality means delivering the right solution, not just a working solution.
</p>
`
  },

  3: {
    title: "Validate Data",
    content: `
<p>
Data is one of the most critical assets in any system. I ensure that information displayed in the UI matches backend records, database values, and API responses.
</p>

<ul>
<li>Database validation using SQL</li>
<li>Cross-check UI against backend data</li>
<li>Verify API response accuracy</li>
<li>Check data consistency across systems</li>
<li>Identify missing or corrupted records</li>
</ul>

<p>
Reliable applications depend on reliable data.
</p>
`
  },

  4: {
    title: "User Impact First",
    content: `
<p>
The true severity of a defect is determined by its impact on users and business operations. I prioritize issues based on risk, usability, customer experience, and business consequences.
</p>

<ul>
<li>Assess business impact</li>
<li>Understand customer pain points</li>
<li>Prioritize critical workflows</li>
<li>Evaluate production risks</li>
<li>Focus on real-world consequences</li>
</ul>

<p>
A minor technical issue can become a major business problem if it affects customers.
</p>
`
  },

  5: {
    title: "Automate Wisely",
    content: `
<p>
Automation should provide value, not simply increase script count. I focus on automating repetitive, stable, and high-value test scenarios while preserving manual exploratory testing for complex investigations.
</p>

<ul>
<li>Automate repetitive validations</li>
<li>Reduce manual effort</li>
<li>Improve test coverage</li>
<li>Increase execution speed</li>
<li>Maintain reliable automation suites</li>
</ul>

<p>
Automation supports quality; it does not replace critical thinking.
</p>
`
  },

  6: {
    title: "Prevent Regression",
    content: `
<p>
Every resolved defect represents a learning opportunity. Once a defect is fixed, I ensure it becomes part of future validation activities to prevent the same issue from reappearing.
</p>

<ul>
<li>Add regression test coverage</li>
<li>Retest impacted areas</li>
<li>Validate related functionality</li>
<li>Monitor recurring defects</li>
<li>Strengthen release confidence</li>
</ul>

<p>
A bug fixed today should never become tomorrow's production issue.
</p>
`
  },

  7: {
    title: "Document Clearly",
    content: `
<p>
A defect report is only valuable if developers, analysts, and stakeholders can understand and reproduce the issue quickly. Clear documentation speeds up resolution and reduces communication gaps.
</p>

<ul>
<li>Provide clear reproduction steps</li>
<li>Include expected vs actual results</li>
<li>Attach supporting evidence</li>
<li>Specify environment details</li>
<li>Communicate impact effectively</li>
</ul>

<p>
Well-written documentation improves collaboration and accelerates defect resolution.
</p>
`
  }

};

const principleModal =
  document.getElementById("principle-modal");

function openPrinciple(id) {

  document.getElementById(
    "principle-title"
  ).innerHTML =
    principleData[id].title;

  document.getElementById(
    "principle-content"
  ).innerHTML =
    principleData[id].content;

  principleModal.classList.add(
    "active"
  );
}

const closePrinciple=document.getElementById("close-principle");

if(closePrinciple&&principleModal){

closePrinciple.addEventListener("click",()=>{
principleModal.classList.remove("active");
});

principleModal.addEventListener("click",(e)=>{
if(e.target===principleModal){
principleModal.classList.remove("active");
}
});

}

const toolData = {

  1: {
    title: "Selenium WebDriver",
    content: `
<div class="tool-rating">★★★★☆ Intermediate</div>

<div class="tool-section">
<h4>What I Use It For</h4>
<ul>
<li>Web Automation Testing</li>
<li>Regression Testing</li>
<li>UI Validation</li>
<li>Functional Testing</li>
</ul>
</div>

<div class="tool-section">
<h4>Hands-on Experience</h4>
<ul>
<li>Created Selenium test scripts</li>
<li>Worked with XPath and CSS Selectors</li>
<li>Implemented Wait Strategies</li>
<li>Used TestNG for execution</li>
</ul>
</div>

<div class="tool-section">
<h4>Current Learning</h4>
<ul>
<li>Framework Architecture</li>
<li>Page Object Model</li>
<li>Reporting Integration</li>
</ul>
</div>
`
  },

  2: {
    title: "Manual Testing",
    content: `
<div class="tool-rating">★★★★★ Advanced</div>

<div class="tool-section">
<h4>Core Activities</h4>
<ul>
<li>Functional Testing</li>
<li>Regression Testing</li>
<li>Smoke Testing</li>
<li>Exploratory Testing</li>
</ul>
</div>

<div class="tool-section">
<h4>Experience</h4>
<ul>
<li>Test Case Design</li>
<li>Defect Reporting</li>
<li>Requirement Analysis</li>
<li>Root Cause Investigation</li>
</ul>
</div>
`
  },

  3: {
    title: "SQL",
    content: `
<div class="tool-rating">★★★★☆ Intermediate</div>

<div class="tool-section">
<h4>Database Validation</h4>
<ul>
<li>Data Verification</li>
<li>Backend Validation</li>
<li>Record Comparison</li>
<li>Business Data Analysis</li>
</ul>
</div>

<div class="tool-section">
<h4>Skills</h4>
<ul>
<li>SELECT</li>
<li>WHERE</li>
<li>JOIN</li>
<li>GROUP BY</li>
<li>ORDER BY</li>
</ul>
</div>
`
  },

  4: {
    title: "Postman",
    content: `
<div class="tool-rating">★★★★☆ Intermediate</div>

<div class="tool-section">
<h4>API Testing</h4>
<ul>
<li>Status Code Validation</li>
<li>Response Verification</li>
<li>Schema Validation</li>
<li>Environment Variables</li>
</ul>
</div>

<div class="tool-section">
<h4>Experience</h4>
<ul>
<li>REST API Testing</li>
<li>Collection Execution</li>
<li>Request Chaining</li>
<li>Regression Validation</li>
</ul>
</div>
`
  },

  5: {
    title: "Core Java",
    content: `
<div class="tool-rating">★★★☆☆ Intermediate</div>

<div class="tool-section">
<h4>Programming Concepts</h4>
<ul>
<li>OOP Concepts</li>
<li>Collections Framework</li>
<li>Exception Handling</li>
<li>Methods & Classes</li>
</ul>
</div>

<div class="tool-section">
<h4>Usage</h4>
<ul>
<li>Selenium Automation</li>
<li>Basic Utility Programs</li>
<li>Test Script Development</li>
</ul>
</div>
`
  }

};

const toolModal =
  document.getElementById("tool-modal");

function openTool(id) {
  document.getElementById("tool-title")
    .innerHTML = toolData[id].title;
  document.getElementById("tool-content")
    .innerHTML = toolData[id].content;
  toolModal.classList.add("active");
}

const closeTool=document.getElementById("close-tool");

if(closeTool&&toolModal){

closeTool.addEventListener("click",()=>{
toolModal.classList.remove("active");
});

toolModal.addEventListener("click",(e)=>{
if(e.target===toolModal){
toolModal.classList.remove("active");
}
});

}

const razorpayApiBase = "/.netlify/functions";
const razorpayOrderMinimumPaise = 4900;

function updatePaymentStatus(message, isError = false) {
  const statusEl = document.getElementById("payment-status");
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.style.color = isError ? "#ff6b35" : "#00e5a0";
  }
}

async function createOrder(amountPaise = razorpayOrderMinimumPaise) {
  if (amountPaise < razorpayOrderMinimumPaise) {
    throw new Error("Minimum amount is ₹1 (100 paise).");
  }

  const response = await fetch(`${razorpayApiBase}/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    })
  });

  if (response.status === 401) {
    throw new Error("Authentication failed while creating Razorpay order.");
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Order creation failed: ${errorText || response.statusText}`);
  }

  return await response.json();
}

async function verifyPayment(paymentId, orderId, signature) {
  const response = await fetch(`${razorpayApiBase}/verify-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_payment_id: paymentId,
      razorpay_order_id: orderId,
      razorpay_signature: signature
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Verification failed: ${errorText || response.statusText}`);
  }

  return await response.json();
}

function openRazorpayModal(order) {

  const publicKey = "rzp_test_Svu9aJQFAwzoXF";

  const options = {

    key: publicKey,
    amount: order.amount,
    currency: order.currency,
    order_id: order.order_id,

    name: "Vinay Nalavade",

    description:
      "Core Java Notes",

    handler: async function (response) {

      console.log(
        "RAZORPAY RESPONSE:",
        response
      );

      try {

        updatePaymentStatus(
          "Verifying payment..."
        );

        const verification =
          await verifyPayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );

        if (verification.success) {

          sessionStorage.setItem(
            "payment_verified",
            "true"
          );

          sessionStorage.setItem(
            "payment_id",
            response.razorpay_payment_id
          );

          sessionStorage.setItem(
            "order_id",
            response.razorpay_order_id
          );

          updatePaymentStatus(
            "Payment verified successfully. Redirecting..."
          );

          window.location.href =
            "customer-details.html";

        } else {

          updatePaymentStatus(
            "Payment verification failed.",
            true
          );

        }

      } catch (error) {

        console.error(
          "Payment verification error:",
          error
        );

        updatePaymentStatus(
          error.message ||
          "Payment verification failed.",
          true
        );

      }

    },

    modal: {

      ondismiss: function () {

        updatePaymentStatus(
          "Payment cancelled.",
          true
        );

      }

    },

    prefill: {
      name: "",
      email: "",
      contact: ""
    },

    readonly: {
      name: false,
      email: false,
      contact: false
    },

    theme: {
      color: "#00e5a0"
    }

  };

  const razorpay =
    new Razorpay(options);

  razorpay.on(
    "payment.failed",
    function (response) {

      updatePaymentStatus(
        response.error.description ||
        "Payment failed.",
        true
      );

    }
  );

  razorpay.open();

}

async function handleCheckoutButton() {
  try {
    updatePaymentStatus("Creating order...");
    const order = await createOrder(razorpayOrderMinimumPaise);
    openRazorpayModal(order);
  } catch (error) {
    console.error("Checkout error:", error);
    updatePaymentStatus(error.message || "Unable to create payment order.", true);
  }
}

  document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
      checkoutButton.addEventListener("click", handleCheckoutButton);
    }

    const modal = document.getElementById("previewModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close-modal");
    const previewCards = document.querySelectorAll(".preview-card");
    console.log("Modal:", modal);
    console.log("Modal Image:", modalImage);
    console.log("Cards Found:", previewCards.length);
    if (!modal || !modalImage || !closeBtn || !previewCards.length) {
      console.log("Preview modal setup failed");
      return;
    }
    previewCards.forEach(card => {
      card.addEventListener("click", () => {
        console.log("Card Clicked");
        const img = card.querySelector("img");
        console.log("Image:", img);
        console.log("Image Src:", img.src);
        modalImage.src = img.src;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });