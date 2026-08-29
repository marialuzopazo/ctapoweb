/* ============================================================
   TEAM.JS — Modal de "contacto y redes" de cada integrante
   ============================================================
   Solo se usa en pages/equipo.html. Al hacer clic (o presionar
   Enter) en la foto de un integrante, se abre un modal con su
   foto grande, bio/aptitudes, botón de contacto y redes sociales.

   Los datos de cada integrante viven en los atributos data-* del
   <article class="team-member" ...> correspondiente en el HTML, así
   que para sumar un integrante nuevo NO hace falta tocar este archivo.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('memberModal');
  if (!modal) return; // esta página no tiene el modal de equipo

  const modalPhoto = document.getElementById('modalPhoto');
  const modalName = document.getElementById('modalName');
  const modalRole = document.getElementById('modalRole');
  const modalBio = document.getElementById('modalBio');
  const modalEmail = document.getElementById('modalEmail');
  const modalSocial = document.getElementById('modalSocial');

  let lastFocusedElement = null;

  // Íconos SVG reutilizables para las redes (sin archivos externos)
  const SOCIAL_ICONS = {
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.4.5.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.4-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.4-.5-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.4-.4-1.2-.5-2.4-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-2 .5-2.4.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2zm5.7 3.3a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 1.8a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.9a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.3z"/></svg>',
    portfolio: '<svg viewBox="0 0 24 24"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  };

  // Arma el bloque de íconos de redes según los data-* disponibles
  function buildSocialLinks(memberData) {
    const entries = [
      { key: 'instagram', label: 'Instagram' },
      { key: 'twitter', label: 'Twitter / X' },
      { key: 'portfolio', label: 'Portfolio' },
    ];

    modalSocial.innerHTML = '';
    entries.forEach(({ key, label }) => {
      const url = memberData[key];
      if (!url) return;
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', label);
      link.innerHTML = SOCIAL_ICONS[key];
      modalSocial.appendChild(link);
    });
  }

  function openModal(memberCard) {
    const data = memberCard.dataset;
    const photoSrc = memberCard.querySelector('img').getAttribute('src');

    modalPhoto.src = photoSrc;
    modalPhoto.alt = `Foto de ${data.nombre}`;
    modalName.textContent = data.nombre;
    modalRole.textContent = data.rol;
    modalBio.textContent = data.bio;
    modalEmail.href = `mailto:${data.email}`;
    buildSocialLinks(data);

    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden'; // evita el scroll de fondo
    modal.querySelector('.member-modal-close').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // Un click en cada foto abre el modal con los datos de ESE integrante
  document.querySelectorAll('.team-member').forEach((card) => {
    const photoBtn = card.querySelector('.member-image');
    photoBtn.addEventListener('click', () => openModal(card));
  });

  // Cerrar con el botón "×", clic en el fondo oscuro, o tecla Escape
  modal.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
});
