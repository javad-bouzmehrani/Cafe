/* ==========================================================
   L'Atelier du Café — Menu Filtering
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".menu-tab-btn");
  const sections = document.querySelectorAll(".menu-category-section");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove(
          "bg-gradient-to-r",
          "from-amber-gold",
          "to-amber-warm",
          "text-espresso-950",
          "font-semibold",
          "shadow-md",
        );
        t.classList.add(
          "bg-espresso-900/90",
          "text-warmBeige/80",
          "border",
          "border-amber-gold/20",
        );
      });
      tab.classList.remove(
        "bg-espresso-900/90",
        "text-warmBeige/80",
        "border",
        "border-amber-gold/20",
      );
      tab.classList.add(
        "bg-gradient-to-r",
        "from-amber-gold",
        "to-amber-warm",
        "text-espresso-950",
        "font-semibold",
        "shadow-md",
      );

      const category = tab.getAttribute("data-category");
      sections.forEach((sec) => {
        if (
          category === "all" ||
          sec.getAttribute("data-cat-section") === category
        ) {
          sec.style.display = "flex";
        } else {
          sec.style.display = "none";
        }
      });
    });
  });
});
