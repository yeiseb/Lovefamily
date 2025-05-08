document.addEventListener('DOMContentLoaded', function() {
    // Efecto smooth scroll para los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Cambiar navegación al hacer scroll
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Reserva enviada! Nos pondremos en contacto contigo pronto.');
            form.reset();
        });
    }
});
    // Sistema de pestañas del menú
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuContainer = document.querySelector('.menu-container');
    
    // Datos del menú (puedes reemplazar con tus productos reales)
    const menuData = {
        helados: [
            {
                nombre: "Vainilla Vintage",
                descripcion: "Vainilla de Madagascar con trozos de vaina",
                precio: "$4.99",
                imagen: "assets/images/helado-vainilla.jpg"
            },
            // ... más helados
        ],
        comida: [
            // ... items de comida
        ],
        bebidas: [
            // ... bebidas
        ]
    };
    
    // Generar contenido del menú
    function generarMenu(categoria) {
        const items = menuData[categoria];
        let html = '';
        
        items.forEach(item => {
            html += `
                <div class="menu-item">
                    <div class="item-image">
                        <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">
                    </div>
                    <div class="item-info">
                        <h3>${item.nombre}</h3>
                        <p>${item.descripcion}</p>
                        <span class="item-price">${item.precio}</span>
                    </div>
                </div>
            `;
        });
        
        menuContainer.innerHTML = html;
    }
    
    // Event listeners para las pestañas
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            // Generar el menú correspondiente
            generarMenu(this.dataset.tab);
        });
    });
    
    // Cargar el menú inicial (helados)
    generarMenu('helados');

    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-section, .history-section, .contact-section').forEach(section => {
        observer.observe(section);
    });
// ... (código anterior se mantiene)

// Animaciones al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.menu-item, .history-container, .contact-container');
    
    elements.forEach(el => {
        const elementPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Ejecutar al cargar la página

// Efecto hover para items del menú
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('img').style.transform = 'scale(1.1)';
    });
    item.addEventListener('mouseleave', () => {
        item.querySelector('img').style.transform = 'scale(1)';
    });
});


document.getElementById('reservaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const personas = document.getElementById('personas').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Formatear fecha (opcional)
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Crear mensaje para WhatsApp
    const textoWhatsApp = `
    *Nueva Reserva Sweet Cream*%0A
    %0A
    *Nombre:* ${nombre}%0A
    *Personas:* ${personas}%0A
    *Fecha:* ${fechaFormateada}%0A
    *Hora:* ${hora}%0A
    *Mensaje:* ${mensaje}
    `;
    
    // Reemplaza con tu número de WhatsApp (elimina los ceros iniciales y usa código de país)
    const telefonoWhatsApp = '(+57) 315 3474496'; // Ejemplo: México (+52) 11234567890
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${telefonoWhatsApp}?text=${textoWhatsApp}`, '_blank');
    
    // Opcional: Resetear formulario
    this.reset();
});
