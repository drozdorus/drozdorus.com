// Theme Toggle Functionality
(function() {
    'use strict';
    
    // Theme configuration
    const THEME_KEY = 'theme-preference';
    const LIGHT_THEME = 'light';
    const DARK_THEME = 'dark';
    
    // Initialize theme system
    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (!themeToggle) {
            console.warn('Theme toggle button not found');
            return;
        }
        
        // Get initial theme preference
        const currentTheme = getThemePreference();
        
        // Apply theme immediately to prevent flash
        applyTheme(currentTheme);
        
        // Add click event listener
        themeToggle.addEventListener('click', function() {
            const currentTheme = getThemePreference();
            const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
            
            setThemePreference(newTheme);
            applyTheme(newTheme);
        });
    }
    
    // Get theme preference with system detection
    function getThemePreference() {
        // Check localStorage first
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === LIGHT_THEME || stored === DARK_THEME) {
            return stored;
        }
        
        // Fall back to system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_THEME;
        }
        
        return LIGHT_THEME;
    }
    
    // Set theme preference
    function setThemePreference(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }
    
    // Apply theme to document
    function applyTheme(theme) {
        if (theme === DARK_THEME) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        
        // Примусове оновлення SVG фільтрів для мобільних браузерів
        setTimeout(() => {
            const svgElements = document.querySelectorAll('svg, img[src$=".svg"]');
            svgElements.forEach(element => {
                // Тимчасово змінюємо display для примусового перерендеру
                const originalDisplay = element.style.display;
                element.style.display = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.display = originalDisplay;
            });
        }, 10);
    }
    
    // Listen for system theme changes
    function setupSystemThemeListener() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', function(e) {
                // Only apply system theme if no manual preference is set
                const stored = localStorage.getItem(THEME_KEY);
                if (!stored) {
                    const systemTheme = e.matches ? DARK_THEME : LIGHT_THEME;
                    applyTheme(systemTheme);
                }
            });
        }
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            setupSystemThemeListener();
        });
    } else {
        initTheme();
        setupSystemThemeListener();
    }
    
    // Apply theme immediately to prevent flash of wrong theme
    const currentTheme = getThemePreference();
    applyTheme(currentTheme);
    
})();
