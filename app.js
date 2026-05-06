(() => {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;

  const openButtons = document.querySelectorAll("[data-open-booking]");
  const closeButtons = modal.querySelectorAll("[data-close-booking]");

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  const forms = document.querySelectorAll(".contact-form");
  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("https://formsubmit.co/ajax/netgop@mail.ru", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        form.reset();
        closeModal();
        alert("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
      } catch (error) {
        // Fallback to standard form submit if AJAX is blocked.
        form.submit();
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  });
})();
