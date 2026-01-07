window.toggleMenu = function () 
{
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("open");
};

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index)
 {
  if (slides.length === 0) return;
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;
  const slideWidth = slides[0].clientWidth;
  document.querySelector(".slides").style.transform = `translateX(${-slideIndex * slideWidth}px)`;
}

window.nextSlide = function () {
  slideIndex++;
  showSlide(slideIndex);
};

window.prevSlide = function () {
  slideIndex--;
  showSlide(slideIndex);
};

if (slides.length > 0) {
  setInterval(() => {
    nextSlide();
  }, 3000);
  showSlide(slideIndex);
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-inner');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
});

function startDealCountdown(endTime, displayId) {
  const display = document.getElementById(displayId);

  if (!display) {
    return;
  }

  function updateTimer() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      display.textContent = "Deal expired!";
      clearInterval(timerInterval);
      return;
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    display.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }
 
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

const dealEndTime = new Date().getTime() + 2 * 60 * 60 * 1000;
startDealCountdown(dealEndTime, "deal-timer");

function addToCart(itemName) {
  const btn = Array.from(document.querySelectorAll(".add-cart-btn"))
  .find(b => b.dataset.name === itemName);

  if (!btn) {
    console.error("Button not found for:", itemName);
    return;
  }

  const item = {
    name: btn.dataset.name,
    price: btn.dataset.price,
    img: btn.dataset.img
  };

  let cart = JSON.parse(localStorage.getItem("BHcart")) || [];

  cart.push(item);

  localStorage.setItem("BHcart", JSON.stringify(cart));

  window.location.href = "cart.html";
}

window.handlePlaceOrder = function (event) {
  event.preventDefault();

  const name = document.getElementById("orderName").value;
  const address = document.getElementById("orderAddress").value;

  if (!name || !address) {
    alert("Please fill in all fields");
    return false;
  }

  localStorage.removeItem("BHcart");

  alert("Thank you, " + name + "! Your order has been placed successfully.");

  window.location.href = "index.html";
  return false;
};

document.addEventListener("DOMContentLoaded", function () {

  const cartContainer = document.getElementById("cartItems");

  if (cartContainer) {
    const rawData = localStorage.getItem("BHcart");
    const cart = JSON.parse(rawData) || [];

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cartContainer.innerHTML = "";
      cart.forEach((item, index) => {
      const box = document.createElement("div");
      box.className = "cart-item-box";
      box.innerHTML = `
      <img src="${item.img}" class="cart-item-img" alt="${item.name}">
      <div class="cart-item-details">
      <h3>${item.name}</h3>
      <p>Price: ${item.price} PKR</p>
      </div>
      <button class="remove-btn">X</button>
      `;

      box.querySelector('.remove-btn').addEventListener('click', () => {
      let currentCart = JSON.parse(localStorage.getItem("BHcart")) || [];
      currentCart.splice(index, 1);
      localStorage.setItem("BHcart", JSON.stringify(currentCart));
      window.location.reload();
        });

        cartContainer.appendChild(box);
      });
    }
  }
});