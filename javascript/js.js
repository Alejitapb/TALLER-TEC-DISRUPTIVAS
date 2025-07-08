
// Configuración inicial y variables globales
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// Función principal de inicialización
function initializeApp() {
  setupSmoothScrolling();
  setupInteractiveElements();
  setupAnimations();
  setupParallaxEffects();
  setupTechCardInteractions();
  setupWorkshopCardAnimations();
  setupNavigationHighlight();
  setupTypingEffect();
  setupCounterAnimations();
  setupImageLoadingEffects();
  createFloatingParticles();
  setupResponsiveNavigation();
  setupSearchFunctionality();
  setupThemeToggle();
}

// Smooth scrolling para los enlaces de navegación
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Función para scroll suave desde botones
function scrollToSection(sectionId) {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Configurar elementos interactivos
function setupInteractiveElements() {
  // Efecto hover en las tech cards
  const techCards = document.querySelectorAll('.tech-card');

  techCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 20px 60px rgba(248, 187, 217, 0.4)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 8px 25px rgba(248, 187, 217, 0.3)';
    });
  });

  // Efecto click en botones CTA
  const ctaButtons = document.querySelectorAll('.cta-button');

  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

// Configurar animaciones de entrada
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Animación especial para tech cards
        if (entry.target.classList.contains('tech-card')) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }

        // Animación especial para workshop cards
        if (entry.target.classList.contains('workshop-card')) {
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
      }
    });
  }, observerOptions);

  // Observar elementos animables
  const animatableElements = document.querySelectorAll('.tech-card, .workshop-card, .resource-category');
  animatableElements.forEach(el => {
    observer.observe(el);
  });
}

// Efectos de parallax sutil
function setupParallaxEffects() {
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Efecto parallax en iconos del hero
    const heroIcons = document.querySelector('.tech-icons');
    if (heroIcons) {
      heroIcons.style.transform = `translateY(${rate * 0.2}px)`;
    }

    // Efecto parallax en el header
    const header = document.querySelector('header');
    if (header) {
      header.style.transform = `translateY(${rate * 0.1}px)`;
    }
  });
}

// Interacciones especiales para tech cards
function setupTechCardInteractions() {
  const techCards = document.querySelectorAll('.tech-card');

  techCards.forEach((card, index) => {
    // Efecto de rotación sutil al hacer hover
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.tech-icon i');
      if (icon) {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'all 0.3s ease';
      }
    });

    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.tech-icon i');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });

    // Animación de aparición escalonada
    card.style.animationDelay = `${index * 0.1}s`;

    // Efecto de click
    card.addEventListener('click', function() {
      this.style.animation = 'pulse 0.6s ease-in-out';
      setTimeout(() => {
        this.style.animation = '';
      }, 600);
    });
  });
}

// Animaciones para workshop cards
function setupWorkshopCardAnimations() {
  const workshopCards = document.querySelectorAll('.workshop-card');

  workshopCards.forEach((card, index) => {
    // Efecto de expansión al hacer hover
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';

      // Efecto en el header
      const header = this.querySelector('.workshop-header');
      if (header) {
        header.style.background = 'linear-gradient(135deg, #e091b3, #b39ddb)';
      }
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';

      // Restaurar header
      const header = this.querySelector('.workshop-header');
      if (header) {
        header.style.background = 'linear-gradient(135deg, #f8bbd9, #d1c4e9)';
      }
    });

    // Animación de aparición
    card.style.animationDelay = `${index * 0.3}s`;
  });
}

// Resaltar navegación activa
function setupNavigationHighlight() {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function() {
    let current = '';
    const headerHeight = document.querySelector('header').offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Efecto de escritura para títulos
function setupTypingEffect() {
  const mainTitle = document.querySelector('.hero-content h2');
  if (mainTitle) {
    const text = mainTitle.textContent;
    mainTitle.textContent = '';

    let i = 0;
    const typeWriter = function() {
      if (i < text.length) {
        mainTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Iniciar el efecto después de un breve delay
    setTimeout(typeWriter, 500);
  }
}

// Contadores animados
function setupCounterAnimations() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const updateCounter = function() {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    // Iniciar contador cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(counter);
        }
      });
    });

    observer.observe(counter);
  });
}

// Efectos de carga de imágenes
function setupImageLoadingEffects() {
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '0';
      this.style.transform = 'scale(0.8)';
      this.style.transition = 'all 0.5s ease';

      setTimeout(() => {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
      }, 100);
    });
  });
}

// Función para crear partículas flotantes
function createFloatingParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'floating-particles';
  particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(248, 187, 217, 0.6);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;

    particlesContainer.appendChild(particle);
  }

  // Agregar estilos CSS para la animación de partículas
  const style = document.createElement('style');
  style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }

        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }

        nav a.active {
            color: #e091b3;
            font-weight: bold;
            text-shadow: 0 0 10px rgba(224, 145, 179, 0.5);
        }
    `;
  document.head.appendChild(style);
}

// Navegación responsiva
function setupResponsiveNavigation() {
  // Crear botón de menú hamburguesa si no existe
  const navContainer = document.querySelector('.nav-container');
  if (navContainer && !document.querySelector('.menu-toggle')) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #fff;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;

    navContainer.appendChild(menuToggle);

    // Manejar click del menú
    menuToggle.addEventListener('click', function() {
      const navUl = document.querySelector('nav ul');
      if (navUl) {
        navUl.classList.toggle('nav-open');
      }
    });
  }

  // Agregar estilos responsivos
  const responsiveStyle = document.createElement('style');
  responsiveStyle.textContent = `
        @media (max-width: 768px) {
            .menu-toggle {
                display: block !important;
            }

            nav ul {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(46, 125, 50, 0.95);
                flex-direction: column;
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            }

            nav ul.nav-open {
                transform: translateY(0);
                opacity: 1;
                pointer-events: auto;
            }

            nav ul li {
                margin: 0;
                padding: 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
        }
    `;
  document.head.appendChild(responsiveStyle);
}

// Funcionalidad de búsqueda
function setupSearchFunctionality() {
  // Crear barra de búsqueda si no existe
  const header = document.querySelector('header');
  if (header && !document.querySelector('.search-container')) {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
            <input type="text" id="searchInput" placeholder="Buscar tecnología...">
            <button id="searchButton"><i class="fas fa-search"></i></button>
        `;
    searchContainer.style.cssText = `
            position: absolute;
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;

    header.appendChild(searchContainer);

    // Funcionalidad de búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function performSearch() {
      const searchTerm = searchInput.value.toLowerCase();
      const techCards = document.querySelectorAll('.tech-card');

      techCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
          card.style.animation = 'pulse 0.5s ease-in-out';
        } else {
          card.style.display = searchTerm === '' ? 'block' : 'none';
        }
      });
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    // Limpiar búsqueda cuando esté vacía
    searchInput.addEventListener('input', function() {
      if (this.value === '') {
        const techCards = document.querySelectorAll('.tech-card');
        techCards.forEach(card => {
          card.style.display = 'block';
        });
      }
    });
  }
}

// Toggle de tema oscuro/claro
function setupThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: rgba(248, 187, 217, 0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 1.2rem;
        color: #2e7d32;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;

  document.body.appendChild(themeToggle);

  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const icon = this.querySelector('i');

    if (document.body.classList.contains('dark-theme')) {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });

  // Estilos para tema oscuro
  const darkThemeStyle = document.createElement('style');
  darkThemeStyle.textContent = `
        .dark-theme {
            background: #121212;
            color: #ffffff;
        }

        .dark-theme header {
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
        }

        .dark-theme .tech-card {
            background: rgba(30, 30, 30, 0.9);
            border: 1px solid rgba(248, 187, 217, 0.3);
        }

        .dark-theme .workshop-card {
            background: rgba(30, 30, 30, 0.9);
            border: 1px solid rgba(248, 187, 217, 0.3);
        }

        .dark-theme .workshop-header {
            background: linear-gradient(135deg, #404040, #606060);
        }

        .dark-theme footer {
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
        }
    `;
  document.head.appendChild(darkThemeStyle);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 1001;
        animation: slideInDown 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutUp 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Función para manejar errores
function handleError(error) {
  console.error('Error:', error);
  showNotification('Ocurrió un error. Por favor, intenta nuevamente.', 'error');
}

// Función para validar formularios (si se agregan)
function validateForm(formData) {
  const errors = [];

  // Validaciones básicas
  if (!formData.name || formData.name.trim() === '') {
    errors.push('El nombre es requerido');
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.push('El email es requerido y debe ser válido');
  }

  return errors;
}

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para formatear fechas
function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(date).toLocaleDateString('es-ES', options);
}

// Función para debounce (optimización de rendimiento)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimización del scroll con debounce
const optimizedScrollHandler = debounce(() => {
  // Código de scroll optimizado aquí
  console.log('Scroll optimizado');
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Función para lazy loading de imágenes
function setupLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
setupLazyLoading();

// Función para guardar preferencias del usuario
function saveUserPreferences() {
  const preferences = {
    theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
    lastVisit: new Date().toISOString()
  };

  // Nota: No usar localStorage en Claude.ai - solo para demostración
  console.log('Preferencias del usuario:', preferences);
}

// Función para cargar preferencias del usuario
function loadUserPreferences() {
  // Nota: No usar localStorage en Claude.ai - solo para demostración
  console.log('Cargando preferencias del usuario');
}

// Función para analytics básico
function trackUserInteraction(action, element) {
  const eventData = {
    action: action,
    element: element,
    timestamp: new Date().toISOString(),
    url: window.location.href
  };

  console.log('Evento rastreado:', eventData);
}

// Agregar event listeners para tracking
document.addEventListener('click', function(e) {
  if (e.target.closest('.tech-card')) {
    trackUserInteraction('click', 'tech-card');
  }

  if (e.target.closest('.workshop-card')) {
    trackUserInteraction('click', 'workshop-card');
  }

  if (e.target.closest('.cta-button')) {
    trackUserInteraction('click', 'cta-button');
  }
});

// Función para exportar datos (simulada)
function exportData(format = 'json') {
  const data = {
    timestamp: new Date().toISOString(),
    technologies: [
      'IoT', 'AI', 'Crowdsourcing', 'Voice to Text',
      'Geolocation', '3D Printing', 'Blockchain',
      'Knowledge Base', 'Robotics', 'Visual Tech'
    ],
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };

  console.log(`Exportando datos en formato ${format}:`, data);
  showNotification(`Datos exportados en formato ${format}`, 'success');
}

// Función para imprimir página
function printPage() {
  window.print();
}

// Función para compartir contenido
function shareContent(platform) {
  const url = window.location.href;
  const title = document.title;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
}

// Función para gestionar el rendimiento
function performanceMonitor() {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0];
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;

    console.log(`Tiempo de carga: ${loadTime}ms`);

    if (loadTime > 3000) {
      console.warn('Tiempo de carga lento detectado');
    }
  }
}

// Ejecutar monitor de rendimiento
performanceMonitor();

// Función para cleanup al salir de la página
window.addEventListener('beforeunload', function() {
  saveUserPreferences();
  // Limpiar timers y event listeners si es necesario
  console.log('Limpiando recursos antes de salir');
});

// Función para manejar errores globales
window.addEventListener('error', function(e) {
  handleError(e.error);
});

// Función para manejar promesas rechazadas
window.addEventListener('unhandledrejection', function(e) {
  handleError(e.reason);
});

console.log('JavaScript inicializado correctamente para Tecnologías Emergentes y Disruptivas');
