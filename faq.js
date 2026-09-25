document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    const setOpen = open => {
      item.classList.toggle("active", open);
      question.setAttribute("aria-expanded", String(open));
      answer.hidden = !open;
      const icon = question.querySelector(".faq-icon, .faq-toggle, .plus, .icon-plus");
      if (icon) icon.textContent = open ? "−" : "+";
    };

    setOpen(false);
    question.addEventListener("click", () => setOpen(!item.classList.contains("active")));
  });
});
