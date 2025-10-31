// === Nav Highlight ===
document.querySelectorAll("nav a").forEach(link => {
  if (link.href === window.location.href) link.classList.add("active");
});

// === Packages Data ===
const packages = [
  { id: 1, destination: "Bali", durationDays: 7, basePrice: 1200, season: "peak" },
  { id: 2, destination: "Paris", durationDays: 5, basePrice: 1500, season: "off" },
  { id: 3, destination: "Tokyo", durationDays: 6, basePrice: 1800, season: "regular" },
  { id: 4, destination: "New York", durationDays: 4, basePrice: 1000, season: "peak" }
];

// === Render Packages ===
const packageTable = document.querySelector("#packageTable tbody");
if (packageTable) {
  packages.forEach(pkg => {
    let multiplier;
    switch (pkg.season) {
      case "peak": multiplier = 1.3; break;
      case "off": multiplier = 0.9; break;
      default: multiplier = 1;
    }
    const finalPrice = pkg.basePrice * multiplier + (pkg.durationDays > 5 ? 100 : 0);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pkg.id}</td>
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays} Days</td>
      <td>$${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td>$${finalPrice.toFixed(2)}</td>
    `;
    packageTable.appendChild(row);
  });
}

// === Booking Form Logic ===
const form = document.getElementById("bookingForm");
if (form) {
  const totalDisplay = document.getElementById("totalPrice");
  const button = form.querySelector("button");

  form.addEventListener("input", calculateTotal);

  function calculateTotal() {
    const checkIn = new Date(document.getElementById("checkIn").value);
    const checkOut = new Date(document.getElementById("checkOut").value);
    const guests = +document.getElementById("guests").value;
    const packageName = document.getElementById("packageSelect").value;
    const promo = document.getElementById("promoCode").value.trim().toUpperCase();

    if (!checkIn || !checkOut || !packageName || isNaN(guests)) {
      button.disabled = true;
      return;
    }

    const nights = Math.max((checkOut - checkIn) / (1000 * 60 * 60 * 24), 0);
    if (nights <= 0) {
      totalDisplay.textContent = "0";
      button.disabled = true;
      return;
    }

    const pkg = packages.find(p => p.destination === packageName);
    if (!pkg) return;

    let total = pkg.basePrice * (nights / pkg.durationDays);
    if (guests > 2) total *= 1.2;

    switch (promo) {
      case "EARLYBIRD": total *= 0.9; break;
      case "VIP": total *= 0.8; break;
      default: break;
    }

    totalDisplay.textContent = total.toFixed(2);
    button.disabled = false;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    alert(`Booking Confirmed! Total Price: $${document.getElementById("totalPrice").textContent}`);
  });
}

// === Gallery Modal ===
const gallery = document.querySelector(".gallery");
if (gallery) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const closeModal = document.getElementById("closeModal");

  gallery.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
      const large = e.target.dataset.large;
      modalImg.src = large;
      modalImg.alt = e.target.alt;
      modalCaption.textContent = e.target.alt;
      modal.style.display = "flex";
    }
  });

  closeModal.addEventListener("click", () => modal.style.display = "none");
}
