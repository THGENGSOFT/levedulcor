/* ==========================================================================
   Scripts da Home - Leve Dulçor
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Rolagem Suave para links internos (ex: #sobre, #contato)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log("Site Leve Dulçor carregado com sucesso!");
});