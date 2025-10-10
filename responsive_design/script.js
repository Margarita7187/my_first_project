// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    // Адаптация меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.textContent = 'Открыть меню';
            }
        }
    });
});