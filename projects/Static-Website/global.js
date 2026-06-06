const orderTotal = document.querySelector("#orderTotal");
const orderStatus = document.querySelector("#orderStatus");
const bookingStatus = document.querySelector("#bookingStatus");
const bookingCount = document.querySelector("#bookingCount");
const orderCount = document.querySelector("#orderCount");
const bookingForm = document.querySelector("#bookingForm");
const orderForm = document.querySelector("#orderForm");
const menuList = document.querySelector("#menuList");
const orderItems = document.querySelector("#orderItems");
const menuItems = window.MENU_ITEMS || [];
const adminLoginForm = document.querySelector("#adminLoginForm");
const adminLoginSection = document.querySelector("#adminLoginSection");
const adminDashboard = document.querySelector("#adminDashboard");
const adminLoginStatus = document.querySelector("#adminLoginStatus");
const adminLogoutButton = document.querySelector("#adminLogoutButton");
const adminProtected = document.querySelector("#adminProtected");
const adminAccessMessage = document.querySelector("#adminAccessMessage");
const adminEmail = "admin@harvest.com";
const adminPassword = "RedRed321!";

function updateTotal() {
  if (!orderTotal) {
    return;
  }

  const quantities = document.querySelectorAll(".quantity");
  const total = Array.from(quantities).reduce((sum, item) => {
    const quantity = Number(item.value) || 0;
    return sum + quantity * Number(item.dataset.price);
  }, 0);

  orderTotal.textContent = `R${total}`;
}

function renderMenu() {
  if (!menuList) {
    return;
  }

  menuList.innerHTML = "";

  menuItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = "menu-card";

    article.innerHTML = `
      <img src="${item.image}" alt="${item.imageAlt}">
      <div class="menu-meta">
        <h3>${item.name}</h3>
        <span class="price">R${item.price}</span>
      </div>
      <p>${item.description}</p>
    `;

    menuList.appendChild(article);
  });
}

function renderOrderItems() {
  if (!orderItems) {
    return;
  }

  orderItems.innerHTML = "";

  menuItems.forEach((item) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <label>
        ${item.name}
        <span>R${item.price} each</span>
      </label>
      <input class="quantity" data-price="${item.price}" type="number" min="0" value="${item.defaultQuantity}" aria-label="${item.name} quantity">
    `;

    orderItems.appendChild(listItem);
  });

  document.querySelectorAll(".quantity").forEach((item) => {
    item.addEventListener("input", updateTotal);
  });
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    bookingStatus.textContent = "Booking request received. The restaurant will confirm after deposit review.";

    if (bookingCount) {
      bookingCount.textContent = String(Number(bookingCount.textContent) + 1);
    }

    event.currentTarget.reset();
  });
}

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    orderStatus.textContent = "Order sent to the kitchen queue.";

    if (orderCount) {
      orderCount.textContent = String(Number(orderCount.textContent) + 1);
    }
  });
}

function showAdminDashboard() {
  if (!adminLoginSection || !adminDashboard) {
    return;
  }

  adminLoginSection.classList.add("hidden");
  adminDashboard.classList.remove("hidden");
}

function showAdminLogin() {
  if (!adminLoginSection || !adminDashboard) {
    return;
  }

  adminLoginSection.classList.remove("hidden");
  adminDashboard.classList.add("hidden");
}

if (adminLoginForm) {
  if (sessionStorage.getItem("harvestAdminLoggedIn") === "true") {
    showAdminDashboard();
  }

  adminLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === adminEmail && password === adminPassword) {
      sessionStorage.setItem("harvestAdminLoggedIn", "true");
      adminLoginStatus.textContent = "";
      event.currentTarget.reset();
      showAdminDashboard();
      return;
    }

    adminLoginStatus.textContent = "Incorrect email or password.";
  });
}

if (adminLogoutButton) {
  adminLogoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("harvestAdminLoggedIn");
    showAdminLogin();
  });
}

if (adminProtected && adminAccessMessage) {
  if (sessionStorage.getItem("harvestAdminLoggedIn") === "true") {
    adminProtected.classList.remove("hidden");
    adminAccessMessage.classList.add("hidden");
  } else {
    adminProtected.classList.add("hidden");
    adminAccessMessage.classList.remove("hidden");
  }
}

document.querySelectorAll(".confirm-button").forEach((button) => {
  button.addEventListener("click", () => {
    const record = button.closest(".admin-record");
    const status = record.querySelector(".record-status");

    status.textContent = "Confirmed";
    status.classList.add("confirmed");
    button.textContent = "Confirmed";
    button.disabled = true;
  });
});

renderMenu();
renderOrderItems();
updateTotal();
