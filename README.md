# Isa Crochet - Plataforma de E-commerce

Plataforma de comercio electrónico moderna y elegante diseñada para la venta de arreglos florales y productos tejidos a mano (crochet). 

## Tecnologías

*   **Frontend**: React, Tailwind CSS, Vite
*   **Iconos**: Lucide React
*   **Gestión de Estado**: React Context API
*   **Backend / Base de Datos**: Supabase (Integración preparada)

## Características

*   **Diseño Premium**: Interfaz minimalista y elegante con paleta de colores personalizada.
# Isa Crochet Shop Platform 🌸

Una plataforma de comercio electrónico elegante y moderna diseñada para la venta de productos artesanales de crochet. Este proyecto combina un diseño visualmente atractivo con una funcionalidad robusta para ofrecer una experiencia de compra fluida.

## 🚀 Tecnologías Utilizadas

Este proyecto utiliza un stack moderno y eficiente:

*   **Frontend**:
    *   [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) - Para una experiencia de usuario rápida y reactiva.
    *   [Tailwind CSS](https://tailwindcss.com/) - Framework de utilidad para un diseño responsivo y personalizado.
    *   **CSS Vanilla** - Animaciones personalizadas y efectos visuales avanzados.
    *   [Lucide React](https://lucide.dev/) - Iconografía moderna y ligera.

*   **Backend & Base de Datos**:
    *   [Supabase](https://supabase.com/) - Base de datos PostgreSQL, Autenticación y Almacenamiento de imágenes.

*   **Infraestructura y Automatización**:
    *   **n8n** - Automatización de flujos de trabajo y procesos de negocio.
    *   **Hugging Face Spaces** - Utilizado como infraestructura en la nube (contenedor tipo Docker) para alojar y ejecutar la instancia de **n8n** de forma continua 24/7.

## ✨ Características Principales

*   **Catálogo Dinámico**: Visualización de productos en cuadrícula (Masonry Layout) y carruseles interactivos.
*   **Carrusel Infinito**: Sistema de navegación manual con efecto de "loop infinito" suave y control por gestos.
*   **Gestión de Stock en Tiempo Real**: Validación inteligente de inventario, variantes de productos y estados visuales de "Agotado".
*   **Filtrado Avanzado**: Exploración por categorías dinámicas cargadas desde la base de datos.
*   **Carrito de Compras Completo**: Gestión de pedidos, cálculo de totales y validación de usuarios.
*   **Autenticación Segura**: Sistema de registro e inicio de sesión para usuarios y gestión de historial de pedidos.
*   **Diseño Totalmente Responsivo**: Adaptado perfectamente a móviles, tablets y escritorio.

## 🛠️ Instalación y Ejecución

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/Isa-Crochet-shop-platform.git
    cd Isa-Crochet-shop-platform
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Supabase:
    ```env
    VITE_SUPABASE_URL=tu_url_de_supabase
    VITE_SUPABASE_ANON_KEY=tu_clave_anonima
    ```

4.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

## 📸 Capturas

(Puedes agregar capturas de pantalla de tu aplicación aquí)

## Estructura del Proyecto

*   `/src/components`: Componentes reutilizables (Navbar, Footer, Cards).
*   `/src/pages`: Vistas principales (Inicio, Catálogo, Login, Carrito).
*   `/src/context`: Manejo de estado global (Auth, Cart).
*   `/src/lib`: Configuraciones de servicios externos (Supabase).
*   `/public/images`: Recursos estáticos y fotografías de productos.


Diseñado y desarrollado por **Ángel Muñoz**.
