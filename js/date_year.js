const year = document.querySelectorAll(".year");

let today = new Date();

for (const currentYear of year) {
  currentYear.textContent = today.getFullYear();
}
