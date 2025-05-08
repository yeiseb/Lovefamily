document.addEventListener('DOMContentLoaded', () => {
    // Cargar menú desde JSON
    fetch('data/menu.json')
      .then(response => response.json())
      .then(data => {
        generarMenu('carta_dulce', data.carta_dulce);
        generarMenu('carta_salada', data.carta_salada);
        
        // Sistema de pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            // Cambiar pestaña activa
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.menu-container').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
          });
        });
      });
  
    // Generar HTML para cada producto
    function generarMenu(seccionId, productos) {
      const seccion = document.getElementById(seccionId);
      let html = '';
  
      productos.forEach(producto => {
        html += `
          <div class="menu-item">
            <div class="item-image">
              <img src="assets/images/${producto.imagen}" alt="${producto.nombre}" loading="lazy">
            </div>
            <div class="item-info">
              <h3>${producto.nombre}</h3>
              <p>${producto.descripcion}</p>
              <span class="item-price">${producto.precio}</span>
            </div>
          </div>
        `;
      });
  
      seccion.innerHTML = html;
    }
  }); 