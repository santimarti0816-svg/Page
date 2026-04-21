/*
  Archivo principal de JavaScript
  Aquí puedes colocar tu lógica personalizada, llamadas a APIs (como el envío de tu formulario de contacto)
  o configuraciones adicionales de Alpine.js si lo requieres.
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('TechService: Página cargada correctamente.');

    // 1. Funcionalidad para los botones de "Contacto" y "Agendar ahora"
    // Como aún no existe la sección #contacto en el HTML, mostramos una alerta amigable.
    const botonesContacto = document.querySelectorAll('a[href="#contacto"]');
    
    // Elementos del Modal
    const modal = document.getElementById('modal-contacto');
    const btnCerrar = document.getElementById('cerrar-modal-btn');
    const bgCerrar = document.getElementById('cerrar-modal-bg');
    const modalContent = document.getElementById('modal-content');
    const formulario = document.getElementById('formulario-contacto');

    // Función para abrir el modal con animación
    const abrirModal = (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
    };

    // Función para cerrar el modal con animación
    const cerrarModal = () => {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    botonesContacto.forEach(boton => {
        boton.addEventListener('click', abrirModal);
    });

    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    if (bgCerrar) bgCerrar.addEventListener('click', cerrarModal); // Cierra al hacer clic en el fondo oscuro

    // Simular el envío del formulario
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página recargue
            const btnSubmit = formulario.querySelector('button[type="submit"]');
            const textoOriginal = btnSubmit.innerHTML;
            
            // Animación de botón de éxito
            btnSubmit.innerHTML = '¡Mensaje Enviado!';
            btnSubmit.classList.replace('bg-cyan-600', 'bg-green-600');
            btnSubmit.classList.replace('hover:bg-cyan-500', 'hover:bg-green-500');
            
            // Esperar 1.5s, cerrar modal y reiniciar formulario
            setTimeout(() => {
                cerrarModal();
                formulario.reset();
                // Devolver el botón a su estado original para la próxima vez
                setTimeout(() => {
                    btnSubmit.innerHTML = textoOriginal;
                    btnSubmit.classList.replace('bg-green-600', 'bg-cyan-600');
                    btnSubmit.classList.replace('hover:bg-green-500', 'hover:bg-cyan-500');
                }, 300);
            }, 1500);
        });
    }

    // 2. Animaciones al hacer scroll (Intersection Observer)
    // Hace que las tarjetas de servicios aparezcan suavemente al bajar la página.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target); // Dejamos de observar una vez animado
            }
        });
    }, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible

    // Seleccionamos las tarjetas dentro de la sección de servicios
    const tarjetasServicios = document.querySelectorAll('#servicios .grid > div');
    tarjetasServicios.forEach((tarjeta, index) => {
        // Agregamos clases iniciales (Tailwind) para ocultarlas y un retraso escalonado
        tarjeta.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        tarjeta.style.transitionDelay = `${index * 150}ms`; // Efecto cascada (una tras otra)
        observer.observe(tarjeta);
    });

    // También animamos las nuevas tarjetas de la sección de información de contacto
    const tarjetasContacto = document.querySelectorAll('#informacion-contacto .grid > div');
    tarjetasContacto.forEach((tarjeta, index) => {
        tarjeta.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        tarjeta.style.transitionDelay = `${index * 150}ms`;
        observer.observe(tarjeta);
    });
});