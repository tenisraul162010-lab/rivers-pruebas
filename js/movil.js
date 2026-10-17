// En el móvil, los bloques de texto largos muestran el primer párrafo y un botón "Leer más".
(function () {
  if (!window.matchMedia('(max-width: 767px)').matches) return;
  var grupos = document.querySelectorAll(
    '.prose-rivers:not(.legal), [data-purpose="intro-statement"] .space-y-5, [data-purpose="company-experience"] .space-y-5'
  );
  grupos.forEach(function (grupo) {
    var parrafos = Array.prototype.filter.call(grupo.children, function (el) { return el.tagName === 'P'; });
    // Solo se pliegan los párrafos largos que van detrás del primero (teléfonos, emails y direcciones quedan siempre a la vista)
    var plegables = parrafos.slice(1).filter(function (p) { return p.textContent.trim().length > 120; });
    if (!plegables.length) return;
    plegables.forEach(function (p) { p.classList.add('leer-mas-oculto'); });
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'btn-leer-mas';
    boton.setAttribute('aria-expanded', 'false');
    boton.textContent = 'Leer más';
    plegables[plegables.length - 1].insertAdjacentElement('afterend', boton);
    boton.addEventListener('click', function () {
      var abierto = boton.getAttribute('aria-expanded') === 'true';
      plegables.forEach(function (p) { p.classList.toggle('leer-mas-oculto', abierto); });
      boton.setAttribute('aria-expanded', String(!abierto));
      boton.textContent = abierto ? 'Leer más' : 'Leer menos';
    });
  });
})();
