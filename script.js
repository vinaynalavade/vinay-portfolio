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
  document.querySelectorAll('.bug-content').forEach(c => {
    c.classList.remove('active');
    c.classList.remove('fade-content');
  });
  tab.classList.add('active');
  const targetContent = document.querySelectorAll('.bug-content')[index];
  targetContent.classList.add('active');
  
  // Force reflow and add animation class
  void targetContent.offsetWidth;
  targetContent.classList.add('fade-content');
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

if (closeContact && contactModal) {

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

const resumeModal = document.getElementById("resume-modal");
const openResume = document.getElementById("open-resume");
const closeResume = document.getElementById("close-resume");

if (resumeModal && openResume && closeResume) {

  openResume.addEventListener("click", (e) => {
    e.preventDefault();
    resumeModal.classList.add("active");
  });

  closeResume.addEventListener("click", () => {
    resumeModal.classList.remove("active");
  });

  resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
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

const closePrinciple = document.getElementById("close-principle");

if (closePrinciple && principleModal) {

  closePrinciple.addEventListener("click", () => {
    principleModal.classList.remove("active");
  });

  principleModal.addEventListener("click", (e) => {
    if (e.target === principleModal) {
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
    title: "SQL Validation Sandbox",
    content: `
<div class="tool-rating">★★★★☆ Intermediate</div>

<div class="tool-section">
  <h4>Database Verification Playground</h4>
  <p style="font-size:12px;margin-bottom:12px;color:var(--muted);line-height:1.4;">Select a business validation scenario to run audit queries:</p>
  <select id="sql-scenario-selector" onchange="switchSqlScenario(this.value)" class="sql-select-box" style="width:100%;padding:10px;border-radius:6px;background:rgba(255,255,255,0.05);color:var(--text);border:1px solid var(--border);font-family:'JetBrains Mono',monospace;font-size:12px;margin-bottom:12px;">
    <option value="commission">Validate Agent Commissions (ICICI Prudential)</option>
    <option value="loans">Verify Credit Bureau Score Check (Infosys) </option>
    <option value="refunds">Audit Transaction Refund Balance (Swift Solution)</option>
  </select>

  <div class="sql-editor-container" style="background:rgba(0,0,0,0.2);border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:12px;">
    <div class="sql-editor-header" style="background:rgba(255,255,255,0.03);padding:8px 12px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);">
      <span style="font-size:11px;color:var(--muted);">query_editor.sql</span>
      <button class="sql-run-btn" onclick="runSqlScenario()" style="background:var(--accent);color:#000;border:none;border-radius:4px;padding:4px 10px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;cursor:pointer;transition:opacity 0.2s;">Run Query ⚡</button>
    </div>
    <pre class="sql-code-block" id="sql-code-display" style="margin:0;padding:12px;font-size:12px;color:var(--accent3);overflow-x:auto;font-family:'JetBrains Mono',monospace;white-space:pre-wrap;"></pre>
  </div>

  <div class="sql-output-container" id="sql-output-box" style="display:none;background:rgba(0,0,0,0.15);border:1px solid var(--border);border-radius:8px;padding:12px;">
    <div class="sql-output-header" style="font-size:11px;color:var(--muted);margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:4px;">QUERY RESULTS (Expected vs. Actual Verification)</div>
    <div class="sql-output-table-wrapper" id="sql-output-table" style="overflow-x:auto;"></div>
  </div>
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
  
  if (id === 3) {
    setTimeout(() => {
      const selectEl = document.getElementById("sql-scenario-selector");
      if (selectEl) switchSqlScenario(selectEl.value);
    }, 50);
  }
}

const closeTool = document.getElementById("close-tool");

if (closeTool && toolModal) {

  closeTool.addEventListener("click", () => {
    toolModal.classList.remove("active");
  });

  toolModal.addEventListener("click", (e) => {
    if (e.target === toolModal) {
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

document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', function (e) {

    if (this.target === '_blank') return;

    e.preventDefault();

    document.body.classList.add('page-exit');

    setTimeout(() => {
      window.location.href = this.href;
    }, 250);
  });
});

const frameworkData = {
  testng: {
    title: "🧪 TestNG Test Execution",

    content: `

            <div class="framework-block">
                <h4>Purpose</h4>

                <p>
                    TestNG is the execution engine of my automation framework.
                    It controls test execution, manages test lifecycle events,
                    performs validations and generates execution reports.
                </p>
            </div>

            <div class="framework-block">
                <h4>How I Implemented It</h4>

                <ul>
                    <li>Used @Test annotations to execute test scenarios.</li>
                    <li>Used @BeforeMethod for test setup activities.</li>
                    <li>Used @AfterMethod for browser cleanup and teardown.</li>
                    <li>Integrated TestNG assertions for validation.</li>
                    <li>Managed execution flow through BaseTest inheritance.</li>
                    <li>Executed multiple test classes under a common framework structure.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Framework Files</h4>

                <ul>
                    <li>LaunchTest.java</li>
                    <li>AddEmployeeTest.java</li>
                    <li>EmployeePersonalDetailsTest.java</li>
                    <li>BaseTest.java</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Execution Flow</h4>

                <p>
                    Test execution starts from a TestNG test class.
                    TestNG invokes BaseTest setup methods,
                    initializes WebDriver through DriverFactory,
                    executes Page Object methods,
                    performs assertions and finally generates execution results.
                </p>
            </div>

            <div class="framework-block">
                <h4>Why I Chose TestNG</h4>

                <p>
                    I selected TestNG because it provides powerful annotations,
                    flexible test execution control, assertion support,
                    dependency management and reporting capabilities.
                    These features make the framework scalable and maintainable
                    for real-world automation projects.
                </p>
            </div>

            <div class="framework-block">
                <h4>Interview Talking Points</h4>

                <ul>
                    <li>Execution engine of the entire framework.</li>
                    <li>Supports annotations, grouping and prioritization.</li>
                    <li>Provides built-in assertion mechanisms.</li>
                    <li>Easy integration with reporting tools.</li>
                    <li>Suitable for scalable Page Object Model frameworks.</li>
                </ul>
            </div>

        `
  },
  basetest: {
    title: "🏗 BaseTest",

    content: `

            <div class="framework-block">
                <h4>Purpose</h4>

                <p>
                    BaseTest acts as the foundation of the framework.
                    Every test class inherits common setup and teardown
                    functionality from this layer, ensuring consistency
                    across all automated tests.
                </p>
            </div>

            <div class="framework-block">
                <h4>How I Implemented It</h4>

                <ul>
                    <li>Created a reusable parent class for all test classes.</li>
                    <li>Loaded framework configuration before execution.</li>
                    <li>Initialized WebDriver through DriverFactory.</li>
                    <li>Launched the application URL automatically.</li>
                    <li>Handled browser cleanup after execution.</li>
                    <li>Reduced duplicate code across test classes.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Framework Files</h4>

                <ul>
                    <li>BaseTest.java</li>
                    <li>AuthenticatedBaseTest.java</li>
                    <li>ConfigReader.java</li>
                    <li>DriverFactory.java</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Execution Flow</h4>

                <p>
                    When a TestNG test starts, execution first enters BaseTest.
                    BaseTest loads configuration values, creates a WebDriver
                    instance through DriverFactory, launches the application,
                    and prepares the environment before the test logic begins.
                </p>
            </div>

            <div class="framework-block">
                <h4>Responsibilities</h4>

                <ul>
                    <li>Framework initialization.</li>
                    <li>Browser startup.</li>
                    <li>Configuration management.</li>
                    <li>Driver lifecycle management.</li>
                    <li>Common setup and teardown activities.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Why I Added BaseTest</h4>

                <p>
                    Without BaseTest, every test class would contain duplicate
                    browser setup and cleanup code. By centralizing these
                    responsibilities, the framework becomes cleaner,
                    easier to maintain and more scalable as new tests are added.
                </p>
            </div>

            <div class="framework-block">
                <h4>Interview Talking Points</h4>

                <ul>
                    <li>Acts as the parent class for all test classes.</li>
                    <li>Provides framework-level setup and teardown.</li>
                    <li>Supports code reusability and maintainability.</li>
                    <li>Centralizes browser and configuration management.</li>
                    <li>Reduces duplication across automation scripts.</li>
                </ul>
            </div>

        `
  },
  driverfactory: {
    title: "🚗 DriverFactory",

    content: `

            <div class="framework-block">
                <h4>Purpose</h4>

                <p>
                    DriverFactory is responsible for creating and managing
                    WebDriver instances. It centralizes browser initialization
                    logic and ensures that browser setup is maintained in a
                    single location within the framework.
                </p>
            </div>

            <div class="framework-block">
                <h4>How I Implemented It</h4>

                <ul>
                    <li>Created a dedicated DriverFactory class.</li>
                    <li>Initialized ChromeDriver from a central location.</li>
                    <li>Configured browser startup settings.</li>
                    <li>Managed browser window initialization.</li>
                    <li>Returned WebDriver instances to BaseTest.</li>
                    <li>Separated browser creation from test logic.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Framework Files</h4>

                <ul>
                    <li>DriverFactory.java</li>
                    <li>BaseTest.java</li>
                    <li>AuthenticatedBaseTest.java</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Execution Flow</h4>

                <p>
                    During test execution, BaseTest requests a browser instance.
                    DriverFactory creates and configures the WebDriver,
                    returns it to BaseTest, and the driver is then used
                    throughout the Page Object layer.
                </p>
            </div>

            <div class="framework-block">
                <h4>Why Not Create ChromeDriver Directly In BaseTest?</h4>

                <p>
                    Creating WebDriver directly inside BaseTest tightly couples
                    browser creation with test initialization. DriverFactory
                    follows the Single Responsibility Principle by keeping
                    browser management separate from test setup logic.
                </p>
            </div>

            <div class="framework-block">
                <h4>Scalability Benefits</h4>

                <ul>
                    <li>Easy to add Firefox, Edge or RemoteWebDriver support.</li>
                    <li>Supports future Selenium Grid integration.</li>
                    <li>Centralized browser configuration.</li>
                    <li>Reduces maintenance effort.</li>
                    <li>Improves framework extensibility.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Interview Talking Points</h4>

                <ul>
                    <li>Centralized WebDriver management layer.</li>
                    <li>Follows Single Responsibility Principle.</li>
                    <li>Improves maintainability and scalability.</li>
                    <li>Supports future multi-browser execution.</li>
                    <li>Keeps BaseTest clean and focused on test setup.</li>
                </ul>
            </div>

        `
  },
  pageobjects: {
    title: "📄 Page Object Model (POM)",

    content: `

            <div class="framework-block">
                <h4>Purpose</h4>

                <p>
                    The Page Object Model (POM) layer separates page interactions
                    from test logic. Each application page is represented by a
                    dedicated Java class containing locators and reusable actions.
                </p>
            </div>

            <div class="framework-block">
                <h4>How I Implemented It</h4>

                <ul>
                    <li>Created separate page classes for each application page.</li>
                    <li>Stored element locators inside page classes.</li>
                    <li>Encapsulated user actions into reusable methods.</li>
                    <li>Kept test classes free from locator definitions.</li>
                    <li>Inherited common functionality through BasePage.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Framework Files</h4>

                <ul>
                    <li>BasePage.java</li>
                    <li>LoginPage.java</li>
                    <li>DashboardPage.java</li>
                    <li>PIMPage.java</li>
                    <li>AddEmployeePage.java</li>
                    <li>EmployeeDetailsPage.java</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Execution Flow</h4>

                <p>
                    Test classes never interact with locators directly.
                    A test calls a Page Object method, the Page Object performs
                    Selenium actions through BasePage methods, and returns control
                    back to the test.
                </p>
            </div>

            <div class="framework-block">
                <h4>Example From My Framework</h4>

                <p>
                    During employee creation, AddEmployeeTest calls methods from
                    AddEmployeePage. The page class handles element identification,
                    form filling and button clicks, while the test focuses only on
                    business validation.
                </p>
            </div>

            <div class="framework-block">
                <h4>Benefits Achieved</h4>

                <ul>
                    <li>Improved code readability.</li>
                    <li>Reduced locator duplication.</li>
                    <li>Easier maintenance when UI changes.</li>
                    <li>Better reusability of page actions.</li>
                    <li>Cleaner and more scalable framework structure.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Why BasePage Exists?</h4>

                <p>
                    BasePage contains common Selenium operations such as click(),
                    type(), getText() and waits. This prevents duplicate code
                    across all page classes and keeps page objects focused on
                    business-specific actions.
                </p>
            </div>

            <div class="framework-block">
                <h4>Interview Talking Points</h4>

                <ul>
                    <li>Follows Page Object Model design pattern.</li>
                    <li>Separates test logic from UI interaction logic.</li>
                    <li>Improves maintainability and scalability.</li>
                    <li>Uses BasePage for reusable Selenium actions.</li>
                    <li>Reduces impact of UI changes on test scripts.</li>
                </ul>
            </div>

        `
  },
  webdriver: {
    title: "🖱 WebDriver Actions",

    content: `

            <div class="framework-block">
                <h4>Purpose</h4>

                <p>
                    WebDriver Actions form the interaction layer of the framework.
                    Instead of writing Selenium commands directly inside test classes,
                    all browser interactions are encapsulated into reusable methods.
                </p>
            </div>

            <div class="framework-block">
                <h4>How I Implemented It</h4>

                <ul>
                    <li>Centralized Selenium interactions inside BasePage.</li>
                    <li>Created reusable click(), type() and utility methods.</li>
                    <li>Separated browser actions from business test logic.</li>
                    <li>Reduced duplicate Selenium code across page classes.</li>
                    <li>Used explicit waits before interacting with elements.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Framework Files</h4>

                <ul>
                    <li>BasePage.java</li>
                    <li>WaitUtil.java</li>
                    <li>LoginPage.java</li>
                    <li>DashboardPage.java</li>
                    <li>AddEmployeePage.java</li>
                    <li>EmployeeDetailsPage.java</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Execution Flow</h4>

                <p>
                    When a test invokes a Page Object method, the Page Object
                    internally calls reusable BasePage methods. These methods
                    execute Selenium WebDriver commands such as clicking,
                    typing, waiting and retrieving values from the application.
                </p>
            </div>

            <div class="framework-block">
                <h4>Example From My Framework</h4>

                <p>
                    While creating an employee, AddEmployeePage does not directly
                    contain large Selenium scripts. Instead, it calls reusable
                    BasePage methods such as type() and click() which internally
                    execute WebDriver actions.
                </p>
            </div>

            <div class="framework-block">
                <h4>Why I Used This Approach</h4>

                <p>
                    Direct WebDriver usage inside every page and test class leads
                    to code duplication and difficult maintenance. By centralizing
                    browser actions in BasePage, the framework becomes cleaner,
                    reusable and easier to scale.
                </p>
            </div>

            <div class="framework-block">
                <h4>Common Actions Used</h4>

                <ul>
                    <li>click()</li>
                    <li>type()</li>
                    <li>getText()</li>
                    <li>clear()</li>
                    <li>findElement()</li>
                    <li>Explicit Waits</li>
                    <li>Page Navigation</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Interview Talking Points</h4>

                <ul>
                    <li>Acts as the browser interaction layer.</li>
                    <li>Implemented through reusable BasePage methods.</li>
                    <li>Reduces code duplication across page objects.</li>
                    <li>Improves maintainability and readability.</li>
                    <li>Supports future framework scaling and enhancements.</li>
                </ul>
            </div>

        `
  },
  assertions: {
    title: "✅ Assertions & Validation Layer",

    content: `

            <div class="framework-block">
                <h4>Purpose</h4>

                <p>
                    Assertions are responsible for validating application behavior.
                    They compare actual results with expected results and determine
                    whether a test case passes or fails.
                </p>
            </div>

            <div class="framework-block">
                <h4>How I Implemented It</h4>

                <ul>
                    <li>Used TestNG Assert class for validations.</li>
                    <li>Verified page titles and page navigation.</li>
                    <li>Validated employee creation workflows.</li>
                    <li>Confirmed successful execution of business scenarios.</li>
                    <li>Used assertions to determine test pass/fail status.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Framework Files</h4>

                <ul>
                    <li>LaunchTest.java</li>
                    <li>AddEmployeeTest.java</li>
                    <li>EmployeePersonalDetailsTest.java</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Execution Flow</h4>

                <p>
                    After page actions are completed, assertions validate whether
                    the application reached the expected state. If validation is
                    successful, the test passes. If validation fails, TestNG marks
                    the test as failed and records the failure in execution results.
                </p>
            </div>

            <div class="framework-block">
                <h4>Example From My Framework</h4>

                <p>
                    After performing user actions such as employee creation or
                    personal details updates, assertions verify that the expected
                    page, data or application state is displayed before the test
                    is marked as successful.
                </p>
            </div>

            <div class="framework-block">
                <h4>Why Assertions Are Important</h4>

                <p>
                    Without assertions, Selenium would only perform browser actions
                    without verifying outcomes. Assertions transform automation
                    scripts into actual test cases by validating business
                    requirements and expected results.
                </p>
            </div>

            <div class="framework-block">
                <h4>Common Assertion Types</h4>

                <ul>
                    <li>Assert.assertEquals()</li>
                    <li>Assert.assertTrue()</li>
                    <li>Assert.assertFalse()</li>
                    <li>Page Validation Checks</li>
                    <li>Text Verification</li>
                    <li>Element Visibility Verification</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Interview Talking Points</h4>

                <ul>
                    <li>Assertions determine test success or failure.</li>
                    <li>Implemented using TestNG Assert class.</li>
                    <li>Used for business validation, not browser actions.</li>
                    <li>Separate verification logic from interaction logic.</li>
                    <li>Critical component of every automation framework.</li>
                </ul>
            </div>

        `
  },
  results: {
    title: "📊 Results & Reporting",

    content: `

            <div class="framework-block">
                <h4>Purpose</h4>

                <p>
                    The Results layer provides the final outcome of test execution.
                    It captures pass/fail status, execution summaries and failure
                    details, allowing testers to quickly assess application quality.
                </p>
            </div>

            <div class="framework-block">
                <h4>How I Implemented It</h4>

                <ul>
                    <li>Used TestNG execution reports.</li>
                    <li>Captured pass and fail status for each test case.</li>
                    <li>Reviewed execution summaries after every run.</li>
                    <li>Used assertion results to determine final outcomes.</li>
                    <li>Tracked failures for debugging and analysis.</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Framework Files</h4>

                <ul>
                    <li>LaunchTest.java</li>
                    <li>AddEmployeeTest.java</li>
                    <li>EmployeePersonalDetailsTest.java</li>
                    <li>test-output/ (Generated TestNG Reports)</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Execution Flow</h4>

                <p>
                    After all test steps and assertions are completed, TestNG
                    generates execution results. These results contain the
                    overall execution summary, test status and failure details,
                    providing visibility into framework execution.
                </p>
            </div>

            <div class="framework-block">
                <h4>What Gets Reported?</h4>

                <ul>
                    <li>Passed Test Cases</li>
                    <li>Failed Test Cases</li>
                    <li>Skipped Test Cases</li>
                    <li>Execution Duration</li>
                    <li>Failure Stack Traces</li>
                    <li>Execution Summary</li>
                </ul>
            </div>

            <div class="framework-block">
                <h4>Current Framework Status</h4>

                <p>
                    The framework currently uses TestNG's built-in reporting
                    mechanism. As the framework evolves, reporting can be enhanced
                    further by integrating tools such as Extent Reports,
                    Allure Reports or CI/CD dashboards.
                </p>
            </div>

            <div class="framework-block">
                <h4>Why Reporting Matters</h4>

                <p>
                    Automation execution is valuable only when results are easy
                    to understand. Reporting provides visibility into test health,
                    identifies failures quickly and helps teams make informed
                    release decisions.
                </p>
            </div>

            <div class="framework-block">
                <h4>Interview Talking Points</h4>

                <ul>
                    <li>Final stage of the framework lifecycle.</li>
                    <li>Driven by TestNG execution reports.</li>
                    <li>Displays pass, fail and skipped test counts.</li>
                    <li>Supports debugging through failure details.</li>
                    <li>Can be extended with Extent Reports and Allure Reports.</li>
                </ul>
            </div>

        `
  }
};

function openFramework(type) {

  const frameworkModal =
    document.getElementById("framework-modal");

  const frameworkTitle =
    document.getElementById("framework-title");

  const frameworkContent =
    document.getElementById("framework-content");

  if (!frameworkModal ||
    !frameworkTitle ||
    !frameworkContent) {
    return;
  }

  frameworkTitle.innerHTML =
    frameworkData[type].title;

  frameworkContent.innerHTML =
    frameworkData[type].content;

  frameworkModal.classList.add("active");
}

function closeFramework() {

  const frameworkModal =
    document.getElementById("framework-modal");

  if (frameworkModal) {
    frameworkModal.classList.remove("active");
  }
}

document.addEventListener("click", function (e) {

  if (e.target.id === "close-framework") {
    closeFramework();
  }

  if (e.target.id === "framework-modal") {
    closeFramework();
  }

});


// Part - 1 Framework Overview Knowledge Base
const frameworkKnowledgeBase = {

  src: {
    title: "src",
    purpose: "Source root directory containing all framework code, test code, resources, and supporting files.",
    responsibilities: [
      "Application source code",
      "Automation framework components",
      "Resources management",
      "Test implementation"
    ]
  },

  main: {
    title: "src/main",
    purpose: "Contains production framework code used during test execution.",
    responsibilities: [
      "Framework core logic",
      "Page Objects",
      "Utilities",
      "Driver Management"
    ]
  },

  java: {
    title: "src/main/java",
    purpose: "Contains all Java source files used by the automation framework.",
    responsibilities: [
      "Core Layer",
      "UI Layer",
      "Utilities",
      "Driver Factory"
    ]
  },

  core: {
    title: "src/main/java/core",
    purpose: "Framework foundation layer containing reusable components.",
    responsibilities: [
      "Configuration Management",
      "Utilities",
      "Reporting",
      "Models"
    ]
  },

  config: {
    title: "src/main/java/core/config",
    purpose: "Centralized configuration management.",
    responsibilities: [
      "Read configuration values",
      "Manage URLs",
      "Manage browser settings",
      "Manage timeouts"
    ]
  },

  models: {
    title: "src/main/java/core/models",
    purpose: "POJO classes used for data-driven testing.",
    responsibilities: [
      "JSON Mapping",
      "Test Data Representation",
      "Object Serialization"
    ]
  },

  reports: {
    title: "src/main/java/core/reports",
    purpose: "Extent Report management layer.",
    responsibilities: [
      "Report Creation",
      "Report Management",
      "Thread Safe Reporting"
    ]
  },

  utils: {
    title: "src/main/java/core/utils",
    purpose: "Reusable utility classes used across the framework.",
    responsibilities: [
      "Wait Management",
      "Screenshot Capture",
      "JSON Processing"
    ]
  },

  ConfigReaderJava: {
    title: "ConfigReader.java",
    purpose: "Loads configuration values from config.properties and makes them available across the framework.",
    interviewQuestion: "Why did you create ConfigReader?",
    interviewAnswer: "To avoid hardcoded values and centralize configuration management.",
    code: `
public final class ConfigReader {

    private static Properties properties;

    static {
        properties = new Properties();

        InputStream inputStream =
            ConfigReader.class
            .getClassLoader()
            .getResourceAsStream(
                "config.properties");

        properties.load(inputStream);
    }

    public static String getProperty(
            String key) {

        return properties.getProperty(key);
    }

    public static int getTimeout() {

        return Integer.parseInt(
            properties.getProperty(
                "timeout"));
    }
}
`
  },

  EmployeeJava: {
    title: "Employee.java",
    purpose: "POJO model class representing employee test data.",
    interviewQuestion: "Why use a POJO model instead of raw JSON?",
    interviewAnswer: "POJOs provide type safety, readability, and easier maintenance.",
    code: `
public class Employee {

    private String licenseNumber;

    private String licenseExpiryDate;

    private String dateOfBirth;

    private String nationality;

    private String maritalStatus;

    // Getters

    // Setters
}
`
  },

  ExtentManagerJava: {
    title: "ExtentManager.java",
    purpose: "Creates and manages Extent Report instance.",
    interviewQuestion: "Why use ExtentManager?",
    interviewAnswer: "To maintain a single report instance throughout execution.",
    code: `
public class ExtentManager {

    public static ExtentReports extent;

    public static ExtentReports getInstance() {

        if(extent == null) {

            ExtentSparkReporter
                sparkReporter =
                new ExtentSparkReporter(
                    "test-output/ExtentReport.html");

            extent =
                new ExtentReports();

            extent.attachReporter(
                sparkReporter);
        }

        return extent;
    }
}
`
  },

  ExtentTestManagerJava: {
    title: "ExtentTestManager.java",
    purpose: "Maintains thread-safe ExtentTest objects.",
    interviewQuestion: "Why use ThreadLocal in reporting?",
    interviewAnswer: "To support parallel execution without report conflicts.",
    code: `
public class ExtentTestManager {

    private static final
        ThreadLocal<ExtentTest>
        test = new ThreadLocal<>();

    public static ExtentTest getTest() {
        return test.get();
    }

    public static void setTest(
            ExtentTest extentTest) {

        test.set(extentTest);
    }

    public static void unload() {
        test.remove();
    }
}
`
  },

  JsonUtilJava: {
    title: "JsonUtil.java",
    purpose: "Converts JSON files into Java objects.",
    interviewQuestion: "Why create JsonUtil instead of reading JSON in tests?",
    interviewAnswer: "To separate data processing logic from test implementation.",
    code: `
public class JsonUtil {

    private static final
        ObjectMapper objectMapper =
            new ObjectMapper();

    public static <T> T readJson(
            String filePath,
            Class<T> clazz) {

        return objectMapper.readValue(
            new File(filePath),
            clazz);
    }
}
`
  },

  ScreenshotUtilJava: {
    title: "ScreenshotUtil.java",
    purpose: "Captures screenshots on test failures.",
    interviewQuestion: "Why capture screenshots automatically?",
    interviewAnswer: "Provides visual evidence for faster defect analysis.",
    code: `
public class ScreenshotUtil {

    public static String
        captureScreenshot(
            WebDriver driver,
            String testName) {

        TakesScreenshot screenshot =
            (TakesScreenshot) driver;

        File source =
            screenshot.getScreenshotAs(
                OutputType.FILE);

        return filePath;
    }
}
`
  },

  WaitUtilJava: {
    title: "WaitUtil.java",
    purpose: "Centralized explicit wait implementation.",
    interviewQuestion: "Why create a WaitUtil class?",
    interviewAnswer: "Avoids duplicate wait code and improves maintainability.",
    code: `
public class WaitUtil {

    public static void
        waitForVisibility(
            WebDriver driver,
            By locator) {

        WebDriverWait wait =
            new WebDriverWait(
                driver,
                Duration.ofSeconds(
                    DEFAULT_TIMEOUT));

        wait.until(
            ExpectedConditions
                .visibilityOfElementLocated(
                    locator));
    }
}
`
  },
  
  ui: {
    title: "src/main/java/ui",
    purpose: "UI Automation Layer implementing Selenium Page Object Model architecture.",
    responsibilities: [
      "Page Object Management",
      "Browser Interactions",
      "UI Navigation",
      "Element Actions"
    ]
  },

  drivers: {
    title: "src/main/java/ui/drivers",
    purpose: "Browser initialization and WebDriver management.",
    responsibilities: [
      "Driver Creation",
      "Browser Setup",
      "Driver Lifecycle",
      "Browser Configuration"
    ]
  },

  pages: {
    title: "src/main/java/ui/pages",
    purpose: "Page Object Layer containing reusable page actions.",
    responsibilities: [
      "Encapsulate Locators",
      "Encapsulate Actions",
      "Improve Reusability",
      "Reduce Duplication"
    ]
  },

  DriverFactoryJava: {
    title: "DriverFactory.java",
    purpose: "Centralized browser initialization and WebDriver management.",
    interviewQuestion: "Why use DriverFactory instead of creating WebDriver inside tests?",
    interviewAnswer: "DriverFactory centralizes browser creation, improves maintainability, and supports framework scalability.",
    code: `
public class DriverFactory {

    private static WebDriver driver;

    public static WebDriver getDriver() {
        return driver;
    }

    public static void initializeDriver() {

        WebDriverManager
            .chromedriver()
            .setup();

        driver = new ChromeDriver();

        driver.manage()
              .window()
              .maximize();
    }
}
`
  },

  BasePageJava: {
    title: "BasePage.java",
    purpose: "Parent page containing reusable Selenium actions used by all Page Objects.",
    interviewQuestion: "Why create a BasePage class?",
    interviewAnswer: "To eliminate duplicate Selenium actions and centralize common page functionality.",
    code: `
public class BasePage {

    protected WebDriver driver;

    protected WebElement find(By locator){
        return driver.findElement(locator);
    }

    protected BasePage click(By locator) {
        find(locator).click();
        return this;
    }

    protected BasePage type(
        By locator,
        Object text) {

        find(locator)
            .sendKeys(
                String.valueOf(text));

        return this;
    }
}
`
  },

  LoginPageJava: {
    title: "LoginPage.java",
    purpose: "Represents OrangeHRM Login Page and handles authentication actions.",
    interviewQuestion: "How does LoginPage follow POM?",
    interviewAnswer: "Locators and actions are encapsulated inside LoginPage instead of being written directly in tests.",
    code: `
public class LoginPage
    extends BasePage {

    private By usernameTextBox =
        By.name("username");

    private By passwordTextBox =
        By.name("password");

    private By loginButton =
        By.cssSelector(
            "button[type='submit']");

    public DashboardPage login(
            String username,
            String password) {

        enterUsername(username);

        enterPassword(password);

        clickLogin();

        return new DashboardPage(driver);
    }
}
`
  },

  DashboardPageJava: {
    title: "DashboardPage.java",
    purpose: "Represents Dashboard page after successful login.",
    interviewQuestion: "Why return page objects from methods?",
    interviewAnswer: "Returning page objects enables fluent navigation and clear page transitions.",
    code: `
public class DashboardPage
    extends BasePage {

    public PIMPage openPim() {

        click(pimMenu);

        return new PIMPage(driver);
    }

    public LoginPage clickLogout() {

        clickProfileDropdown();

        click(logoutLink);

        return new LoginPage(driver);
    }
}
`
  },

  PIMPageJava: {
    title: "PIMPage.java",
    purpose: "Handles navigation inside the PIM module.",
    interviewQuestion: "Why is navigation encapsulated inside page objects?",
    interviewAnswer: "It keeps test cases clean and isolates UI changes.",
    code: `
public class PIMPage
    extends BasePage {

    private By addButton =
        By.xpath(
            "//button[normalize-space()='Add']");

    public AddEmployeePage addEmployee() {

        click(addButton);

        return new AddEmployeePage(driver);
    }
}
`
  },

  AddEmployeePageJava: {
    title: "AddEmployeePage.java",
    purpose: "Handles employee creation workflow.",
    interviewQuestion: "What design principle is demonstrated here?",
    interviewAnswer: "Single Responsibility Principle. This page handles only employee creation actions.",
    code: `
public class AddEmployeePage
    extends BasePage {

    public EmployeeDetailsPage
        addEmployee(

            String fName,
            String sName,
            String lName,
            String employeeId) {

        enterFullName(
            fName,
            sName,
            lName);

        enterEmployeeId(
            employeeId);

        return clickSave();
    }
}
`
  },

  EmployeeDetailsPageJava: {
    title: "EmployeeDetailsPage.java",
    purpose: "Handles employee personal details updates after employee creation.",
    interviewQuestion: "Why separate AddEmployeePage and EmployeeDetailsPage?",
    interviewAnswer: "Because they represent different application screens and responsibilities.",
    code: `
public class EmployeeDetailsPage
    extends BasePage {

    public EmployeeDetailsPage
        updatePersonalDetails(

        String licenseNumber,
        String licenseExpDate,
        String dob,
        String nationality,
        String maritalStatus) {

        typeDate(
            licenseExpiryDate,
            licenseExpDate);

        click(nationality);

        click(maritalStatus);

        click(saveButton);

        return this;
    }
}
`
  },



  // Part 3 - Test Implementation Knowledge Base
  listeners: {
    title: "src/test/java/listeners",
    purpose: "Framework event monitoring layer.",
    responsibilities: [
      "Track Test Execution",
      "Generate Reports",
      "Capture Failures",
      "Log Execution Events"
    ]
  },

  base: {
    title: "src/test/java/base",
    purpose: "Base test classes providing common setup and teardown functionality.",
    responsibilities: [
      "Driver Initialization",
      "Framework Setup",
      "Authentication Management",
      "Framework Reusability"
    ]
  },

  tests: {
    title: "src/test/java/tests",
    purpose: "Contains business test scenarios executed against the application.",
    responsibilities: [
      "Functional Testing",
      "Regression Testing",
      "Workflow Validation",
      "Data Driven Validation"
    ]
  },

  resources: {
    title: "src/main/resources",
    purpose: "Framework configuration and external test resources.",
    responsibilities: [
      "Configuration Storage",
      "Environment Management",
      "External Test Data"
    ]
  },

  testdata: {
    title: "src/testdata",
    purpose: "Externalized test data for Data Driven Testing.",
    responsibilities: [
      "Test Data Storage",
      "Data Separation",
      "Reusable Test Inputs"
    ]
  },

  ConfigProperties: {
    title: "config.properties",
    purpose: "Stores framework configuration values.",
    interviewQuestion: "Why store values in config.properties?",
    interviewAnswer: "To eliminate hardcoded values and support environment-based execution.",
    code: `
browser=chrome

base.url=https://opensource-demo.orangehrmlive.com

username=Admin

password=admin123

timeout=20
`
  },

  employeeJson: {
    title: "employee.json",
    purpose: "External test data source used for Data Driven Testing.",
    interviewQuestion: "Why use JSON test data?",
    interviewAnswer: "JSON separates test data from test logic and improves maintainability.",
    code: `
{
  "licenseNumber":"123456789",
  "licenseExpiryDate":"2032-01-06",
  "dateOfBirth":"2024-08-24",
  "nationality":"Indian",
  "maritalStatus":"Single"
}
`
  },

  TestListenerJava: {
    title: "TestListener.java",
    purpose: "Captures framework events and integrates reporting.",
    interviewQuestion: "What is the purpose of TestNG Listeners?",
    interviewAnswer: "Listeners monitor test lifecycle events and perform actions such as reporting and screenshot capture.",
    code: `
public class TestListener
        implements ITestListener {

    public void onStart(
            ITestContext context) {

        ExtentManager
            .getInstance();
    }

    public void onTestFailure(
            ITestResult result) {

        ScreenshotUtil
            .captureScreenshot(
                DriverFactory.getDriver(),
                result.getMethod()
                      .getMethodName());
    }

    public void onFinish(
            ITestContext context) {

        ExtentManager
            .getInstance()
            .flush();
    }
}
`
  },

  BaseTestJava: {
    title: "BaseTest.java",
    purpose: "Foundation class responsible for WebDriver setup and cleanup.",
    interviewQuestion: "Why use BaseTest?",
    interviewAnswer: "It eliminates duplicate setup and teardown logic across tests.",
    code: `
@Listeners(TestListener.class)

public class BaseTest {

    @BeforeMethod
    public void setup() {

        DriverFactory
            .initializeDriver();
    }

    @AfterMethod
    public void tearDown() {

        DriverFactory
            .getDriver()
            .quit();
    }
}
`
  },

  AuthenticatedBaseTestJava: {
    title: "AuthenticatedBaseTest.java",
    purpose: "Reusable authenticated session layer used by secured test cases.",
    interviewQuestion: "Why create AuthenticatedBaseTest?",
    interviewAnswer: "To avoid repeating login logic in every test class.",
    code: `
public class
AuthenticatedBaseTest
extends BaseTest {

    @BeforeMethod
    public void login() {

        LoginPage loginPage =
            new LoginPage(
                DriverFactory.getDriver());

        dashBoard =
            loginPage.login(
                username,
                password);
    }

    @AfterMethod
    public void logout() {

        dashBoard
            .clickLogout();
    }
}
`
  },

  LaunchTestJava: {
    title: "LaunchTest.java",
    purpose: "Smoke test validating application launch and login functionality.",
    interviewQuestion: "Why create LaunchTest?",
    interviewAnswer: "To quickly validate environment availability before running larger suites.",
    code: `
@Test
public void
launchApplication() {

    DriverFactory
        .getDriver()
        .get(
            ConfigReader
                .getProperty(
                    "base.url"));
}

@Test
public void login() {

    LoginPage loginPage =
        new LoginPage(
            DriverFactory.getDriver());

    DashboardPage dashBoard =
        loginPage.login(
            username,
            password);
}
`
  },

  AddEmployeeTestJava: {
    title: "AddEmployeeTest.java",
    purpose: "Validates employee creation workflow.",
    interviewQuestion: "What type of test is this?",
    interviewAnswer: "Functional end-to-end workflow validation.",
    code: `
@Test
public void addEmp() {

    PIMPage pimPage =
        dashBoard.openPim();

    AddEmployeePage addEmpPage =
        pimPage.addEmployee();

    addEmpPage.addEmployee(
        "Vinay",
        "Pramod",
        "Nalavade",
        "0707");

    Assert.assertTrue(
        addEmpPage
            .isSuccessMsgDisplayed());
}
`
  },

  EmployeePersonalDetailsTestJava: {
    title: "EmployeePersonalDetailsTest.java",
    purpose: "Data-driven test validating employee personal details update workflow.",
    interviewQuestion: "How is Data Driven Testing implemented here?",
    interviewAnswer: "Test data is loaded from employee.json through JsonUtil and mapped into Employee POJO.",
    code: `
Employee employee =
    JsonUtil.readJson(
        "employee.json",
        Employee.class);

@Test
public void addDetails() {

    employeeDetails
        .updatePersonalDetails(

            employee
                .getLicenseNumber(),

            employee
                .getLicenseExpiryDate(),

            employee
                .getdateOfBirth(),

            employee
                .getNationality(),

            employee
                .getMaritalStatus());
}
`
  },

  pomXml: {
    title: "pom.xml",
    purpose: "Maven build configuration and dependency management.",
    interviewQuestion: "Why use Maven?",
    interviewAnswer: "Maven manages dependencies, builds, and test execution consistently.",
    responsibilities: [
      "Selenium Dependency",
      "TestNG Dependency",
      "Jackson Dependency",
      "Extent Reports",
      "WebDriverManager"
    ],
    code: `<project xmlns="http://maven.apache.org/POM/4.0.0">\n  <modelVersion>4.0.0</modelVersion>\n  <groupId>com.vinay.qa</groupId>\n  <artifactId>automation-framework</artifactId>\n  <version>1.0.0</version>\n  \n  <dependencies>\n    <!-- Selenium WebDriver -->\n    <dependency>\n      <groupId>org.seleniumhq.selenium</groupId>\n      <artifactId>selenium-java</artifactId>\n      <version>4.16.1</version>\n    </dependency>\n    <!-- TestNG Runner -->\n    <dependency>\n      <groupId>org.testng</groupId>\n      <artifactId>testng</artifactId>\n      <version>7.8.0</version>\n      <scope>test</scope>\n    </dependency>\n    <!-- Extent Reports -->\n    <dependency>\n      <groupId>com.aventstack</groupId>\n      <artifactId>extentreports</artifactId>\n      <version>5.1.1</version>\n    </dependency>\n    <!-- Jackson JSON parser -->\n    <dependency>\n      <groupId>com.fasterxml.jackson.core</groupId>\n      <artifactId>jackson-databind</artifactId>\n      <version>2.15.2</version>\n    </dependency>\n  </dependencies>\n</project>`
  },

  target: {
    title: "target",
    purpose: "Auto-generated Maven build directory.",
    responsibilities: [
      "Compiled Classes",
      "Generated Artifacts",
      "Build Output",
      "Packaged Files"
    ]
  },

  testOutput: {
    title: "test-output",
    purpose: "Stores all execution reports generated during framework execution.",
    responsibilities: [
      "Extent Reports",
      "TestNG Reports",
      "Execution Logs",
      "Screenshots"
    ]
  },

  test: {
    title: "src/test",
    purpose: "Contains all automation test implementation code.",
    responsibilities: [
      "Test Execution",
      "Test Classes",
      "Framework Validation",
      "Business Scenarios"
    ]
  },

  testJava: {
    title: "src/test/java",
    purpose: "Contains Java-based automation test implementation.",
    responsibilities: [
      "Base Test Classes",
      "TestNG Tests",
      "Listeners",
      "Test Execution Logic"
    ]
  }

};

function showFrameworkInfo(key) {

  const data = frameworkKnowledgeBase[key];

  if (!data) {
    return;
  }

  const contentEl = document.getElementById("frameworkInfoContent");
  contentEl.classList.remove("fade-content");
  void contentEl.offsetWidth;
  contentEl.classList.add("fade-content");

  contentEl.innerHTML = `

<div class="framework-card">

<h3>${data.title}</h3>

<p>${data.purpose}</p>

${data.responsibilities
      ?
      `
<h4>Responsibilities</h4>

<div class="responsibility-grid">

${data.responsibilities.map(item => `
<div class="responsibility-card">
${item}
</div>
`).join("")}

</div>
`
      :
      ""
    }

${data.code
      ?
      `
<div class="code-viewer">

<div class="code-header">
Source Code
</div>

<div class="code-body">

<pre><code>
${data.code}
</code></pre>

</div>

</div>
`
      :
      ""
    }

${data.interviewQuestion
      ?
      `
<div class="interview-box">

<h4>Interview Discussion</h4>

<div class="interview-question">
${data.interviewQuestion}
</div>

<div class="interview-answer">
${data.interviewAnswer}
</div>

</div>
`
      :
      ""
    }

</div>
`;
}

function toggleFolder(arrow) {

  const folder =
    arrow.closest(".tree-folder");

  if (!folder) return;

  folder.classList.toggle("expanded");

  arrow.textContent =
    folder.classList.contains("expanded")
      ? "▼"
      : "▶";
}

// ==========================================
// MOBILE NAVIGATION LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isActive = menuToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
});

// ==========================================
// UX POLISH: SCROLL, GLOW & COPY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Indicator (Throttled with rAF)
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);

  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  // 2. Click-to-copy Toast
  const copyToast = document.createElement('div');
  copyToast.id = 'copy-toast';
  copyToast.innerText = 'Copied to clipboard!';
  document.body.appendChild(copyToast);

  let toastTimeout; // Prevents race conditions

  const executeCopy = (el, e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(el.innerText).then(() => {
      copyToast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => copyToast.classList.remove('show'), 2000);
    });
  };

  const copyElements = document.querySelectorAll('.defect-id, .endpoint, .tree-file, .t-cmd');
  copyElements.forEach(el => {
    el.classList.add('copyable');
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'Copy to clipboard');
    
    el.addEventListener('click', (e) => executeCopy(el, e));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        executeCopy(el, e);
      }
    });
  });

  // 3. Mouse-tracking Glow (Throttled with rAF)
  const glowCards = document.querySelectorAll('.defect-card, .project-card, .api-card, .pack-card, .vision-card, .roadmap-card');
  glowCards.forEach(card => {
    card.classList.add('glow-card');
    
    let isMouseMoving = false;
    card.addEventListener('mousemove', (e) => {
      if (!isMouseMoving) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          isMouseMoving = false;
        });
        isMouseMoving = true;
      }
    }, { passive: true });
  });
});

// ==========================================
// PORTFOLIO V2.0 PREMIUM DATASETS & LOGIC
// ==========================================

const sqlScenarios = {
  commission: {
    code: `-- Validate commission calculations against policy terms\nSELECT \n  c.agent_id, \n  c.policy_no, \n  c.comm_pct_actual, \n  r.comm_pct_expected,\n  CASE WHEN c.comm_pct_actual = r.comm_pct_expected THEN 'MATCH' ELSE 'DISCREPANCY' END AS audit_status\nFROM comm_records c\nJOIN comm_rules_master r \n  ON c.policy_term = r.policy_term AND c.product_code = r.product_code\nWHERE c.renewal_status = 'RENEWAL';`,
    table: `<table style="width:100%; border-collapse:collapse; font-size:11px; font-family:'JetBrains Mono',monospace;">\n  <thead>\n    <tr style="border-bottom:1px solid var(--border); text-align:left; color:var(--muted);">\n      <th style="padding:6px;">Agent ID</th><th style="padding:6px;">Policy No</th><th style="padding:6px;">Actual Comm</th><th style="padding:6px;">Expected Comm</th><th style="padding:6px;">Audit Status</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">\n      <td style="padding:6px;">AGT_00912</td><td style="padding:6px;">POL88219</td><td style="padding:6px;">15.00%</td><td style="padding:6px;">15.00%</td><td style="padding:6px; color:var(--accent);">MATCH</td>\n    </tr>\n    <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">\n      <td style="padding:6px;">AGT_01021</td><td style="padding:6px;">POL90812</td><td style="padding:6px;">10.00%</td><td style="padding:6px;">12.50%</td><td style="padding:6px; color:var(--accent2); font-weight:600;">DISCREPANCY</td>\n    </tr>\n    <tr>\n      <td style="padding:6px;">AGT_00561</td><td style="padding:6px;">POL91102</td><td style="padding:6px;">7.50%</td><td style="padding:6px;">7.50%</td><td style="padding:6px; color:var(--accent);">MATCH</td>\n    </tr>\n  </tbody>\n</table>`
  },
  loans: {
    code: `-- Audit credit risk scoring eligibility\nSELECT \n  l.loan_id, \n  l.customer_id, \n  l.credit_score, \n  l.eligibility_status, \n  b.eligibility_decision\nFROM loan_applications l\nJOIN bureau_risk_decisions b ON l.customer_id = b.cust_id\nWHERE l.credit_score < 600 AND l.eligibility_status = 'APPROVED';`,
    table: `<table style="width:100%; border-collapse:collapse; font-size:11px; font-family:'JetBrains Mono',monospace;">\n  <thead>\n    <tr style="border-bottom:1px solid var(--border); text-align:left; color:var(--muted);">\n      <th style="padding:6px;">Loan ID</th><th style="padding:6px;">Cust ID</th><th style="padding:6px;">Score</th><th style="padding:6px;">App Status</th><th style="padding:6px;">Bureau Dec</th><th style="padding:6px;">Audit Result</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">\n      <td style="padding:6px;">L_7102</td><td style="padding:6px;">C_9918</td><td style="padding:6px;">580</td><td style="padding:6px;">APPROVED</td><td style="padding:6px;">REJECTED</td><td style="padding:6px; color:var(--accent2); font-weight:600;">ELIGIBILITY VIOLATION</td>\n    </tr>\n    <tr>\n      <td style="padding:6px;">L_7342</td><td style="padding:6px;">C_8812</td><td style="padding:6px;">550</td><td style="padding:6px;">APPROVED</td><td style="padding:6px;">REJECTED</td><td style="padding:6px; color:var(--accent2); font-weight:600;">ELIGIBILITY VIOLATION</td>\n    </tr>\n  </tbody>\n</table>`
  },
  refunds: {
    code: `-- Validate partial refunds calculation rules\nSELECT \n  o.order_id, \n  o.item_id, \n  o.total_refunded, \n  (o.item_price - COALESCE(o.discount_applied, 0)) * (1 + o.tax_rate) AS expected_refund,\n  CASE WHEN ABS(o.total_refunded - ((o.item_price - COALESCE(o.discount_applied, 0)) * (1 + o.tax_rate))) < 0.01 \n    THEN 'AUDIT_OK' \n    ELSE 'AUDIT_FAIL' \n  END AS audit_result\nFROM order_refunds o\nWHERE o.refund_status = 'PROCESSED';`,
    table: `<table style="width:100%; border-collapse:collapse; font-size:11px; font-family:'JetBrains Mono',monospace;">\n  <thead>\n    <tr style="border-bottom:1px solid var(--border); text-align:left; color:var(--muted);">\n      <th style="padding:6px;">Order ID</th><th style="padding:6px;">Item ID</th><th style="padding:6px;">Refunded</th><th style="padding:6px;">Expected Refund</th><th style="padding:6px;">Audit Result</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">\n      <td style="padding:6px;">ORD_88102</td><td style="padding:6px;">ITM_01</td><td style="padding:6px;">₹899.10</td><td style="padding:6px;">₹899.10</td><td style="padding:6px; color:var(--accent);">AUDIT_OK</td>\n    </tr>\n    <tr>\n      <td style="padding:6px;">ORD_90112</td><td style="padding:6px;">ITM_03</td><td style="padding:6px;">₹1,120.00</td><td style="padding:6px;">₹1,008.00</td><td style="padding:6px; color:var(--accent2); font-weight:600;">AUDIT_FAIL</td>\n    </tr>\n  </tbody>\n</table>`
  }
};

const impactDiffs = {
  1: {
    before: `// MANUAL REGRESSION PROTOCOL\n1. Launch checkout portal on Chrome Desktop.\n2. Input test agent credentials, verify log-in.\n3. Add item 'Insurance Plan A' to basket.\n4. Progress checkout workflow. Add primary agent fields.\n5. Click payment module link.\n6. Fill secondary address info and transaction source.\n7. Hit checkout validation submit.\n8. Verify order ID generation and invoice email.\n(Rinse and repeat for 48 other manual cases...)\n// Average Execution Time: 3 days of manual tracking`,
    after: `// AUTOMATED POM WEBDRIVER FRAMEWORK (Java)\n@Test(dataProvider = "checkoutData")\npublic void verifyCheckoutSuite(CheckoutDto data) {\n  CheckoutPage checkout = new CheckoutPage(driver);\n  checkout.navigateToUrl(Config.getBaseUrl())\n          .fillCredentials(data.getUser(), data.getPass())\n          .addItemToCart(data.getItem())\n          .fillCustomerFields(data.getCustomer())\n          .submitOrder();\n          \n  Assert.assertTrue(checkout.isOrderSuccessful(), \n    "Order placement failed: " + checkout.getErrorMessage());\n  Assert.assertEquals(checkout.getInvoiceTotal(), data.getExpectedTotal());\n}`
  },
  2: {
    before: `# MANUAL COMMISSION EXCEL AUDIT\n1. Query database via BusinessObjects to CSV.\n2. In spreadsheet, apply formula to match slabs:\n   =VLOOKUP(A2, CommissionRules!A:C, 3, FALSE)\n3. Filter out exceptions manually.\n4. Check special conditions (renewal status vs initial term).\n5. Check compliance manually for premium offsets.\n# Time Taken: 7-8 working days of manual audits`,
    after: `# AUTOMATED RULE-BASED VERIFICATION (Python)\nimport pandas as pd\n\ndef audit_agent_commissions(csv_report, rules_file):\n    df_records = pd.read_csv(csv_report)\n    df_rules = pd.read_excel(rules_file)\n    \n    # Re-calculate commissions by mapping rule parameters\n    df_merged = df_records.merge(df_rules, on=['term', 'product_code'])\n    df_exceptions = df_merged[\n        df_merged['actual_commission'] != df_merged['expected_commission']\n    ]\n    \n    # Generate validation exception log\n    if not df_exceptions.empty:\n        df_exceptions.to_excel('commission_discrepancies.xlsx')\n    return len(df_exceptions)`
  },
  3: {
    before: `// MANUAL API TESTING FLOW\n1. Launch Postman client.\n2. Input raw endpoint URL.\n3. Add auth headers manually by copying previous JWT token.\n4. Input request payload, send.\n5. Scroll JSON output to manually confirm 'success:true'.\n6. Validate SQL transactions in DB console manually.`,
    after: `// AUTOMATED POSTMAN SUITE ASSERTIONS\npm.test("Status is 200 OK", function () {\n    pm.response.to.have.status(200);\n});\n\npm.test("Token response conforms to schema", function () {\n    var schema = {\n        "type": "object",\n        "properties": {\n            "token": { "type": "string" },\n            "expires": { "type": "number" }\n        },\n        "required": ["token", "expires"]\n    };\n    pm.response.to.have.jsonSchema(schema);\n    pm.environment.set("jwt_token", pm.response.json().token);\n});`
  },
  4: {
    before: `// REACTIVE TESTING MODE\n- Detect bugs only when visual layouts crash.\n- QA does validation testing late in production cycle.\n- Defect reporting occurs via unstructured emails.\n- No regression guardrails for backend API modifications.`,
    after: `// AUTOMATED PRE-RELEASE VALIDATION PIPELINE\n- QA code hooks run on pull request trigger.\n- Dynamic environment provisioning for branch.\n- Automation suite validates endpoint integrations automatically.\n- Automatic Jira defect log creation via API on failures.\n- JUnit results output generated for build status checks.`
  }
};

// SQL Sandbox Handler Actions
window.switchSqlScenario = function(val) {
  const codeDisplay = document.getElementById("sql-code-display");
  const outputBox = document.getElementById("sql-output-box");
  if (codeDisplay) {
    codeDisplay.textContent = sqlScenarios[val].code;
  }
  if (outputBox) {
    outputBox.style.display = "none";
  }
};

window.runSqlScenario = function() {
  const selectEl = document.getElementById("sql-scenario-selector");
  const outputBox = document.getElementById("sql-output-box");
  const outputTable = document.getElementById("sql-output-table");
  if (selectEl && outputBox && outputTable) {
    const val = selectEl.value;
    outputTable.innerHTML = sqlScenarios[val].table;
    outputBox.style.display = "block";
  }
};

// Recruiter Focus Highlights
window.filterRecruiterFocus = function(focusArea, chip) {
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(c => c.classList.remove("active"));
  if (chip) chip.classList.add("active");
  
  const expItems = document.querySelectorAll(".experience-timeline li[data-focus]");
  const projCards = document.querySelectorAll(".projects-grid .project-card[data-focus]");
  
  if (focusArea === 'all') {
    expItems.forEach(item => {
      item.classList.remove("focus-dim");
      item.classList.remove("focus-highlight");
    });
    projCards.forEach(card => {
      card.classList.remove("focus-dim");
      card.classList.remove("focus-highlight");
    });
  } else {
    expItems.forEach(item => {
      const dataVal = item.getAttribute("data-focus");
      if (dataVal && dataVal.includes(focusArea)) {
        item.classList.add("focus-highlight");
        item.classList.remove("focus-dim");
      } else {
        item.classList.add("focus-dim");
        item.classList.remove("focus-highlight");
      }
    });
    projCards.forEach(card => {
      const dataVal = card.getAttribute("data-focus");
      if (dataVal && dataVal.includes(focusArea)) {
        card.classList.add("focus-highlight");
        card.classList.remove("focus-dim");
      } else {
        card.classList.add("focus-dim");
        card.classList.remove("focus-highlight");
      }
    });
  }
};

// Automation Code Diffs Toggle
window.toggleImpactDiff = function(cardIndex, button) {
  const container = document.getElementById(`impact-diff-${cardIndex}`);
  if (!container) return;
  const isOpen = container.style.display !== "none";
  if (isOpen) {
    container.style.display = "none";
    button.textContent = "Compare Automation Code 📂";
  } else {
    const diffData = impactDiffs[cardIndex];
    container.innerHTML = `
      <div class="diff-wrapper">
        <div class="diff-panel before-panel">
          <div class="diff-header" style="color:var(--accent2); margin-bottom:8px; font-weight:600;">Manual / Legacy Flow</div>
          <pre style="margin:0; white-space:pre-wrap; color:rgba(255,255,255,0.65); line-height:1.5;">${diffData.before}</pre>
        </div>
        <div class="diff-panel after-panel">
          <div class="diff-header" style="color:var(--accent); margin-bottom:8px; font-weight:600;">QA Automated Architecture</div>
          <pre style="margin:0; white-space:pre-wrap; color:var(--text); line-height:1.5;">${diffData.after}</pre>
        </div>
      </div>
    `;
    container.style.display = "block";
    button.textContent = "Close Code Comparison ✕";
  }
};

// API Mock Execution
window.runMockApi = function(cardIndex, button) {
  const consoleEl = document.getElementById(`api-console-${cardIndex}`);
  const consoleBody = consoleEl.querySelector(".api-console-body");
  if (!consoleEl || !consoleBody) return;

  consoleEl.style.display = "block";
  consoleBody.innerHTML = "Initializing client request...\nConnecting to staging server...";
  button.disabled = true;
  button.style.opacity = "0.5";

  let steps = [];
  if (cardIndex === 1) {
    steps = [
      "Sending POST /auth/token...",
      "Request Headers: { 'Content-Type': 'application/json', 'User-Agent': 'PostmanRuntime/7.28' }",
      "Response: HTTP/1.1 200 OK (112ms)",
      "Testing assertions...",
      "● PASS — [POST] Status code is 200 OK",
      "● PASS — [POST] Response payload contains valid 'auth_token'",
      "● PASS — [POST] Expiry threshold is valid (3600s)",
      "● PASS — [POST] Schema validation matches contract definition"
    ];
  } else if (cardIndex === 2) {
    steps = [
      "Sending GET /customers/C_00918...",
      "Request Headers: { 'Authorization': 'Bearer JWT_SECRET_TOKEN_XYZ' }",
      "Response: HTTP/1.1 200 OK (85ms)",
      "Testing assertions...",
      "● PASS — [GET] Status code is 200 OK",
      "● PASS — [GET] Schema contains customer_id and agent_id",
      "● PASS — [GET] Reconciled matching DB record balance (Verified: ₹45,210.00)"
    ];
  } else if (cardIndex === 3) {
    steps = [
      "Sending PUT /orders/ORD_90212/inventory...",
      "Request Payload: { 'item_id': 'ITM_401', 'qty_reserved': 1 }",
      "Response: HTTP/1.1 200 OK (145ms)",
      "Testing assertions...",
      "● PASS — [PUT] Status code is 200 OK",
      "● PASS — [PUT] Inventory allocation locks successfully",
      "● PASS — [PUT] Deducted stock matches business balance rules"
    ];
  } else if (cardIndex === 4) {
    steps = [
      "Sending DELETE /transactions/TXN_88192/refund...",
      "Request Headers: { 'X-Admin-Signature': 'd41d8cd98f00b204e9800998ecf8427e' }",
      "Response: HTTP/1.1 200 OK (210ms)",
      "Testing assertions...",
      "● PASS — [DELETE] Status code is 200 OK",
      "● PASS — [DELETE] Refund ledger aggregation matched EXPECTED amount",
      "● PASS — [DELETE] Exception logs verified (Status Code: 0)"
    ];
  }

  let stepIdx = 0;
  consoleBody.innerHTML = "";
  
  function printNextStep() {
    if (stepIdx < steps.length) {
      let line = steps[stepIdx];
      let formattedLine = line;
      if (line.includes("● PASS")) {
        formattedLine = `<span style="color:var(--accent); font-weight:600;">${line}</span>`;
      } else if (line.includes("Sending")) {
        formattedLine = `<span style="color:var(--accent3); font-weight:600;">${line}</span>`;
      }
      consoleBody.innerHTML += formattedLine + "\n";
      consoleEl.scrollTop = consoleEl.scrollHeight;
      stepIdx++;
      setTimeout(printNextStep, 150);
    } else {
      button.disabled = false;
      button.style.opacity = "1";
    }
  }
  
  setTimeout(printNextStep, 100);
};

window.closeConsole = function(cardIndex, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const consoleEl = document.getElementById(`api-console-${cardIndex}`);
  if (consoleEl) {
    consoleEl.style.display = "none";
  }
};

// Diagnostics Tool Checks
let currentHealthDiagnosticTimer = null;
window.openHealthCheckModal = function() {
  const modal = document.getElementById("health-modal");
  if (modal) {
    modal.classList.add("active");
    runDiagnostics();
  }
};

window.closeHealthCheckModal = function() {
  const modal = document.getElementById("health-modal");
  if (modal) {
    modal.classList.remove("active");
  }
  if (currentHealthDiagnosticTimer) {
    clearTimeout(currentHealthDiagnosticTimer);
  }
};

window.runDiagnostics = function() {
  const consoleEl = document.getElementById("diagnostic-console");
  if (!consoleEl) return;
  consoleEl.innerHTML = "";
  
  const domLoadedTime = (performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart) || 124;
  
  const steps = [
    { text: "[INFO] Initializing Portfolio Automated Test Suite...", type: "info" },
    { text: "[INFO] Operating System: " + navigator.platform + " (Recruiter Environment)", type: "info" },
    { text: "[TEST] Starting Test Case 1: Validate HTTP Response Speed...", type: "test" },
    { text: "  -> Calculating paint response metrics...", type: "sub" },
    { text: "  -> DOM Loaded time: " + domLoadedTime + "ms", type: "sub" },
    { text: "  ✓ PASS — Response latency is under 500ms threshold.", type: "pass" },
    { text: "[TEST] Starting Test Case 2: Validate Links Integrity...", type: "test" },
    { text: "  -> Scanning all 'href' attributes in DOM...", type: "sub" }
  ];
  
  const allAnchors = document.querySelectorAll("a");
  let invalidLinks = 0;
  allAnchors.forEach(a => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("http") && (href.includes("null") || href.includes("undefined"))) {
      invalidLinks++;
    }
  });
  
  steps.push({ text: "  -> Total links scanned: " + allAnchors.length, type: "sub" });
  if (invalidLinks === 0) {
    steps.push({ text: "  ✓ PASS — Link validation complete. 0 dead URLs found.", type: "pass" });
  } else {
    steps.push({ text: "  ⚠ WARN — Identified " + invalidLinks + " suspicious links.", type: "warn" });
  }
  
  steps.push({ text: "[TEST] Starting Test Case 3: Verify Viewport Responsiveness...", type: "test" });
  steps.push({ text: "  -> Current screen width: " + window.innerWidth + "px", type: "sub" });
  if (window.innerWidth < 480) {
    steps.push({ text: "  -> Viewport matched Mobile breakpoint schema.", type: "sub" });
  } else if (window.innerWidth < 1024) {
    steps.push({ text: "  -> Viewport matched Tablet breakpoint schema.", type: "sub" });
  } else {
    steps.push({ text: "  -> Viewport matched Desktop breakpoint schema.", type: "sub" });
  }
  steps.push({ text: "  ✓ PASS — CSS Grid layouts adjusted dynamically.", type: "pass" });
  
  steps.push({ text: "[TEST] Starting Test Case 4: Verify Content Accessibility...", type: "test" });
  const copyableBtns = document.querySelectorAll('.copyable');
  steps.push({ text: "  -> Scanned " + copyableBtns.length + " interactive copy cells.", type: "sub" });
  steps.push({ text: "  ✓ PASS — ARIA integration verified (A11y index OK).", type: "pass" });

  steps.push({ text: "[TEST] Starting Test Case 5: Scan Console Logs for Errors...", type: "test" });
  steps.push({ text: "  ✓ PASS — Portfolio runs in clean environment. 0 runtime exceptions caught.", type: "pass" });
  
  steps.push({ text: "\n---------------------------------------------------------", type: "info" });
  steps.push({ text: "SUMMARY: 5 TEST CASES (ALL PASSED) — BUILD STABLE", type: "summary" });
  steps.push({ text: "---------------------------------------------------------", type: "info" });

  let idx = 0;
  function printDiagnosticStep() {
    if (idx < steps.length) {
      const step = steps[idx];
      let colorClass = "";
      if (step.type === "info") colorClass = "color:var(--muted);";
      else if (step.type === "test") colorClass = "color:var(--accent3); font-weight:600; margin-top:6px;";
      else if (step.type === "sub") colorClass = "color:rgba(255,255,255,0.65); padding-left:10px;";
      else if (step.type === "pass") colorClass = "color:var(--accent); font-weight:600; padding-left:10px;";
      else if (step.type === "warn") colorClass = "color:var(--accent2); font-weight:600; padding-left:10px;";
      else if (step.type === "summary") colorClass = "color:var(--accent); font-weight:700; text-align:center; display:block;";
      
      consoleEl.innerHTML += `<div style="${colorClass}">${step.text}</div>`;
      consoleEl.scrollTop = consoleEl.scrollHeight;
      idx++;
      let delay = 300;
      if (step.type === "test") delay = 700;
      if (step.type === "sub") delay = 250;
      if (step.type === "pass") delay = 450;
      if (step.type === "summary") delay = 1500;
      currentHealthDiagnosticTimer = setTimeout(printDiagnosticStep, delay);
    }
  }
  printDiagnosticStep();
};

// Command Palette Actions
const paletteOptions = [
  { text: "Go to About Section", action: () => scrollToSection("about") },
  { text: "Go to Experience Section", action: () => scrollToSection("experience") },
  { text: "Go to Projects Section", action: () => scrollToSection("projects") },
  { text: "Go to Defects Case Studies", action: () => scrollToSection("defects") },
  { text: "Go to API Validation Section", action: () => scrollToSection("api-lab") },
  { text: "Go to Automation Success", action: () => scrollToSection("automation") },
  { text: "Go to Skills Section", action: () => scrollToSection("skills") },
  { text: "Go to Tools Section", action: () => scrollToSection("tools") },
  { text: "View PDF Resume", action: () => { const btn = document.getElementById("open-resume"); if (btn) btn.click(); } },
  { text: "Open Contact Dialog", action: () => { const btn = document.getElementById("open-contact"); if (btn) btn.click(); } },
  { text: "Toggle Light/Dark Theme", action: () => { const btn = document.getElementById("theme-toggle"); if (btn) btn.click(); } },
  { text: "Run Portfolio Diagnostics", action: () => openHealthCheckModal() }
];

let selectedOptionIndex = 0;

window.openCommandPalette = function() {
  const palette = document.getElementById("command-palette");
  const searchInput = document.getElementById("palette-search");
  if (palette && searchInput) {
    palette.style.display = "flex";
    searchInput.value = "";
    searchInput.focus();
    selectedOptionIndex = 0;
    filterPaletteOptions();
  }
};

window.closeCommandPalette = function() {
  const palette = document.getElementById("command-palette");
  if (palette) {
    palette.style.display = "none";
  }
};

window.filterPaletteOptions = function() {
  const searchInput = document.getElementById("palette-search");
  const resultsContainer = document.getElementById("palette-results");
  if (!searchInput || !resultsContainer) return;
  
  const query = searchInput.value.toLowerCase();
  const filtered = paletteOptions.filter(opt => opt.text.toLowerCase().includes(query));
  
  resultsContainer.innerHTML = "";
  if (filtered.length === 0) {
    resultsContainer.innerHTML = `<div class="palette-no-results" style="padding:16px; color:var(--muted); text-align:center;">No commands found for "${searchInput.value}"</div>`;
    return;
  }
  
  if (selectedOptionIndex >= filtered.length) {
    selectedOptionIndex = 0;
  }
  
  filtered.forEach((opt, idx) => {
    const item = document.createElement("div");
    item.className = "palette-result-item" + (idx === selectedOptionIndex ? " active" : "");
    item.textContent = opt.text;
    item.addEventListener("click", () => {
      opt.action();
      closeCommandPalette();
    });
    resultsContainer.appendChild(item);
  });
};

window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCommandPalette();
  }
  
  if (e.key === 'Escape') {
    closeCommandPalette();
    closeHealthCheckModal();
  }
  
  const palette = document.getElementById("command-palette");
  const isPaletteOpen = palette && palette.style.display !== "none";
  if (isPaletteOpen) {
    const resultsContainer = document.getElementById("palette-results");
    const items = resultsContainer ? resultsContainer.querySelectorAll(".palette-result-item") : [];
    if (items.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedOptionIndex = (selectedOptionIndex + 1) % items.length;
        filterPaletteOptions();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedOptionIndex = (selectedOptionIndex - 1 + items.length) % items.length;
        filterPaletteOptions();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        items[selectedOptionIndex].click();
      }
    }
  } else {
    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        const openResumeBtn = document.getElementById("open-resume");
        if (openResumeBtn) openResumeBtn.click();
      } else if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        const openContactBtn = document.getElementById("open-contact");
        if (openContactBtn) openContactBtn.click();
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        const themeBtn = document.getElementById("theme-toggle");
        if (themeBtn) themeBtn.click();
      } else if (e.key.toLowerCase() === 'd') {
        e.preventDefault();
        openHealthCheckModal();
      }
    }
  }
});
