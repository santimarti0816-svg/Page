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

    // Cierra el modal al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            cerrarModal();
        }
    });

    // ========================================================
    // 2. Funcionalidad para el Modal "Radicar Caso Técnico"
    // ========================================================
    const botonesCaso = document.querySelectorAll('a[href="#formulario-caso"]');
    const modalCaso = document.getElementById('modal-caso');
    const btnCerrarCaso = document.getElementById('cerrar-modal-caso-btn');
    const bgCerrarCaso = document.getElementById('cerrar-modal-caso-bg');
    const modalCasoContent = document.getElementById('modal-caso-content');

    const abrirModalCaso = (e) => {
        e.preventDefault();
        modalCaso.classList.remove('hidden');
        setTimeout(() => {
            modalCaso.classList.remove('opacity-0');
            modalCasoContent.classList.remove('scale-95');
            modalCasoContent.classList.add('scale-100');
        }, 10);
    };

    const cerrarModalCaso = () => {
        modalCaso.classList.add('opacity-0');
        modalCasoContent.classList.remove('scale-100');
        modalCasoContent.classList.add('scale-95');
        setTimeout(() => {
            modalCaso.classList.add('hidden');
        }, 300);
    };

    botonesCaso.forEach(boton => boton.addEventListener('click', abrirModalCaso));
    if (btnCerrarCaso) btnCerrarCaso.addEventListener('click', cerrarModalCaso);
    if (bgCerrarCaso) bgCerrarCaso.addEventListener('click', cerrarModalCaso);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalCaso && !modalCaso.classList.contains('hidden')) {
            cerrarModalCaso();
        }
    });

    // ========================================================
    // 2.1 Validación y lógica del campo "Otro"
    // ========================================================
    const selectEquipo = document.getElementById('tipo-equipo');
    const campoOtro = document.getElementById('campo-otro');
    const inputOtro = campoOtro.querySelector('input');
    const formRadicarCaso = document.getElementById('form-radicar-caso');
    const btnSubmitCaso = formRadicarCaso.querySelector('button[type="submit"]');
    const errorOtro = document.getElementById('error-otro');
    const inputEmailCaso = document.getElementById('email-caso');
    const errorEmailCaso = document.getElementById('error-email-caso');

    // Lista de palabras que bloquearán el envío del formulario
    const palabrasInvalidas = ['casa', 'arbol', 'árbol', 'comida', 'pc', 'laptop', 'portatil', 'portátil', 'celular', 'smartphone', 'computador', 'computadora', 'ordenador'];

    let emailTieneError = false;
    let otroTieneError = false;

    // Función maestra que decide si el botón se apaga o se enciende
    const actualizarBotonSubmit = () => {
        if (emailTieneError || otroTieneError) {
            btnSubmitCaso.disabled = true;
            btnSubmitCaso.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            btnSubmitCaso.disabled = false;
            btnSubmitCaso.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    };

    // Validación estricta de Correo Electrónico
    const validarEmail = () => {
        const valor = inputEmailCaso.value.trim();
        // Exige algo@algo.dominio (con al menos 2 letras al final)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        
        if (valor.length > 0 && !emailRegex.test(valor)) {
            emailTieneError = true;
            errorEmailCaso.classList.remove('hidden');
            inputEmailCaso.classList.remove('border-slate-700', 'focus:border-cyan-500');
            inputEmailCaso.classList.add('border-red-500', 'focus:border-red-500');
        } else {
            emailTieneError = false;
            errorEmailCaso.classList.add('hidden');
            inputEmailCaso.classList.remove('border-red-500', 'focus:border-red-500');
            inputEmailCaso.classList.add('border-slate-700', 'focus:border-cyan-500');
        }
        actualizarBotonSubmit();
    };

    const validarCampoOtro = () => {
        const valor = inputOtro.value.trim().toLowerCase();
        const palabrasUsuario = valor.split(/\s+/);
        
        // Comprobar si alguna palabra del usuario coincide con la lista negra
        const esInvalido = palabrasUsuario.some(palabra => palabrasInvalidas.includes(palabra));

        if (esInvalido && selectEquipo.value === 'otro') {
            otroTieneError = true;
            errorOtro.textContent = 'Por favor, ingresa un dispositivo tecnológico válido que podamos reparar.';
            errorOtro.classList.remove('hidden');
            inputOtro.classList.remove('border-slate-700', 'focus:border-cyan-500');
            inputOtro.classList.add('border-red-500', 'focus:border-red-500');
        } else {
            otroTieneError = false;
            errorOtro.classList.add('hidden');
            inputOtro.classList.remove('border-red-500', 'focus:border-red-500');
            inputOtro.classList.add('border-slate-700', 'focus:border-cyan-500');
        }
        actualizarBotonSubmit();
    };

    // Validar en tiempo real mientras el usuario escribe
    inputEmailCaso.addEventListener('input', validarEmail);
    inputOtro.addEventListener('input', validarCampoOtro);

    // Mostrar u ocultar el campo dependiendo de lo que seleccione el usuario
    selectEquipo.addEventListener('change', (e) => {
        if (e.target.value === 'otro') {
            campoOtro.classList.remove('hidden');
            inputOtro.setAttribute('required', 'true');
        } else {
            campoOtro.classList.add('hidden');
            inputOtro.removeAttribute('required');
            inputOtro.value = ''; // Limpiamos el texto al ocultarlo
            validarCampoOtro();   // Restablecemos el estado visual del botón
        }
    });

    // ========================================================
    // 2.2 Simular envío de Caso Técnico
    // ========================================================
    if (formRadicarCaso) {
        formRadicarCaso.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita recargar la página
            const btnSubmit = formRadicarCaso.querySelector('button[type="submit"]');
            const textoOriginal = btnSubmit.innerHTML;
            
            // 1. Animación de carga (Spinner)
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Enviando...`;
            btnSubmit.classList.add('opacity-80', 'cursor-not-allowed');
            
            // 2. Estado de éxito tras 1.5s
            setTimeout(() => {
                btnSubmit.innerHTML = '¡Reporte Enviado!';
                btnSubmit.classList.remove('opacity-80', 'cursor-not-allowed');
                btnSubmit.classList.replace('bg-cyan-600', 'bg-green-600');
                btnSubmit.classList.replace('hover:bg-cyan-500', 'hover:bg-green-500');
                
                // 3. Cerrar modal y limpiar todo tras otros 1.5s
                setTimeout(() => {
                    cerrarModalCaso();
                    formRadicarCaso.reset();
                    campoOtro.classList.add('hidden'); // Ocultar input condicional
                    inputOtro.removeAttribute('required'); // Quitar obligatoriedad
                    
                    setTimeout(() => {
                        btnSubmit.disabled = false;
                        btnSubmit.innerHTML = textoOriginal;
                        btnSubmit.classList.replace('bg-green-600', 'bg-cyan-600');
                        btnSubmit.classList.replace('hover:bg-green-500', 'hover:bg-cyan-500');
                    }, 300);
                }, 1500);   
            }, 1500);   
        });
    }

    // Simular el envío del formulario
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página recargue
            const btnSubmit = formulario.querySelector('button[type="submit"]');
            const textoOriginal = btnSubmit.innerHTML;
            
            // 1. Animación de estado de carga (Spinner)
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Enviando...`;
            btnSubmit.classList.add('opacity-80', 'cursor-not-allowed');
            
            // 2. Esperar 1.5s simulando envío, luego cambiar a estado de éxito
            setTimeout(() => {
                btnSubmit.innerHTML = '¡Mensaje Enviado!';
                btnSubmit.classList.remove('opacity-80', 'cursor-not-allowed');
                btnSubmit.classList.replace('bg-cyan-600', 'bg-green-600');
                btnSubmit.classList.replace('hover:bg-cyan-500', 'hover:bg-green-500');
                
                // 3. Esperar 1.5s más, cerrar modal y reiniciar formulario
                setTimeout(() => {
                    cerrarModal();
                    formulario.reset();
                    // Devolver el botón a su estado original para la próxima vez
                    setTimeout(() => {
                        btnSubmit.disabled = false;
                        btnSubmit.innerHTML = textoOriginal;
                        btnSubmit.classList.replace('bg-green-600', 'bg-cyan-600');
                        btnSubmit.classList.replace('hover:bg-green-500', 'hover:bg-cyan-500');
                    }, 300);
                }, 1500);   
            }, 1500);   
        });
    }

    // 2. Animaciones al hacer scroll (Intersection Observer)
    // Hace que las tarjetas de servicios aparezcan suavemente al bajar la página.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10', 'scale-95');
                entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
                observer.unobserve(entry.target); // Dejamos de observar una vez animado
            }
        });
    }, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible

    // Seleccionamos las tarjetas dentro de la sección de servicios
    const tarjetasServicios = document.querySelectorAll('#servicios .grid > div');
    tarjetasServicios.forEach((tarjeta, index) => {
        // Agregamos clases iniciales (Tailwind) para ocultarlas y un retraso escalonado
        tarjeta.classList.add('opacity-0', 'translate-y-10', 'scale-95', 'transition-all', 'duration-700');
        tarjeta.style.transitionDelay = `${index * 150}ms`; // Efecto cascada (una tras otra)
        observer.observe(tarjeta);
    });

    // También animamos las nuevas tarjetas de la sección de información de contacto
    const tarjetasContacto = document.querySelectorAll('#informacion-contacto .grid > div');
    tarjetasContacto.forEach((tarjeta, index) => {
        tarjeta.classList.add('opacity-0', 'translate-y-10', 'scale-95', 'transition-all', 'duration-700');
        tarjeta.style.transitionDelay = `${index * 150}ms`;
        observer.observe(tarjeta);
    });

    // 3. Efecto Ripple (Onda) para los botones Neon interactivos
    const botonesNeon = document.querySelectorAll('.btn-neon');
    botonesNeon.forEach(boton => {
        boton.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});