/* ==========================================================================
   Lógica do Cardápio - Leve Dulçor
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIÁVEIS DO SISTEMA ---
    const cart = [];
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const cartNoteElement = document.getElementById('cart-note');
    
    // Configurações
    const WHATSAPP_NUMBER = "5541992355813"; // Seu número
    
    // --- 1. FILTRO DE CATEGORIAS ---
    const categoryBtns = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.item');
    const categoryTitles = document.querySelectorAll('.category-title');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove classe ativa de todos e adiciona no clicado
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            // Filtra os produtos
            products.forEach(product => {
                if (category === 'all' || product.getAttribute('data-category') === category) {
                    product.style.display = 'flex'; // Mostra (flex para manter layout)
                } else {
                    product.style.display = 'none'; // Esconde
                }
            });

            // Gerencia os títulos das seções
            if (category === 'all') {
                categoryTitles.forEach(title => title.style.display = 'block');
            } else {
                categoryTitles.forEach(title => title.style.display = 'none');
                // Tenta mostrar o título da categoria selecionada se existir
                const activeTitle = document.getElementById(`cat-${category}`);
                if (activeTitle) activeTitle.style.display = 'block';
            }
        });
    });

    // --- 2. ADICIONAR AO CARRINHO ---
    const addButtons = document.querySelectorAll('.add-btn');

    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Pega o elemento pai (.item) para extrair os dados
            const itemElement = e.target.closest('.item');
            
            const product = {
                id: itemElement.getAttribute('data-id'),
                name: itemElement.getAttribute('data-name'),
                price: parseFloat(itemElement.getAttribute('data-price')),
                weight: itemElement.getAttribute('data-weight'),
                qty: 1
            };

            addToCart(product);
            openCart(); // Abre o carrinho automaticamente ao adicionar
        });
    });

    function addToCart(product) {
        // Verifica se o produto já está no carrinho
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push(product);
        }

        updateCartUI();
    }

    // --- 3. ATUALIZAR INTERFACE DO CARRINHO ---
    function updateCartUI() {
        cartItemsContainer.innerHTML = ''; // Limpa lista atual
        let total = 0;
        let totalQty = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Seu carrinho está vazio.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.qty;
                totalQty += item.qty;

                const itemHTML = document.createElement('div');
                itemHTML.classList.add('cart-item');
                itemHTML.innerHTML = `
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <small>${formatMoney(item.price)} x ${item.qty}</small>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemHTML);
            });
        }

        cartTotalElement.innerText = formatMoney(total);
        cartCountElement.innerText = totalQty;
    }

    // --- 4. FUNÇÕES GLOBAIS (acessíveis pelo HTML) ---
    // Precisamos anexar ao objeto window para funcionar no onclick="..."
    window.changeQty = function(index, delta) {
        if (cart[index].qty + delta <= 0) {
            // Remove item se quantidade for zero
            cart.splice(index, 1);
        } else {
            cart[index].qty += delta;
        }
        updateCartUI();
    };

    function formatMoney(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // --- 5. ABRIR E FECHAR CARRINHO ---
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');

    function openCart() {
        cartSidebar.classList.add('open');
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
    }

    cartToggle.addEventListener('click', () => {
        // Se já estiver aberto, fecha. Se fechado, abre.
        if (cartSidebar.classList.contains('open')) {
            closeCart();
        } else {
            openCart();
        }
    });
    
    cartClose.addEventListener('click', closeCart);

    // --- 6. ENVIAR PEDIDO (WHATSAPP) ---
    const sendBtn = document.getElementById('send-whatsapp');

    sendBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio! Adicione algumas delícias primeiro.');
            return;
        }

        let message = "*Olá! Gostaria de fazer um pedido pelo site:*\n\n";
        
        cart.forEach(item => {
            message += `▪️ ${item.qty}x ${item.name} (${item.weight})\n`;
        });

        const totalValue = cartTotalElement.innerText;
        const obs = cartNoteElement.value;

        message += `\n*Total: ${totalValue}*\n`;
        
        if (obs) {
            message += `\n📝 *Observações:* ${obs}`;
        }

        message += `\n\n------------------------------\nAguardo confirmação!`;

        // Codifica a mensagem para URL
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(url, '_blank');
    });

    // --- 7. SISTEMA DE ZOOM (LIGHTBOX) ---
    
    // 1. Criar o elemento do modal dinamicamente (se não existir)
    if (!document.querySelector('.lightbox-overlay')) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = '<img src="" class="lightbox-content" alt="Zoom Produto">';
        document.body.appendChild(lightbox);
        
        // Fechar ao clicar
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxImg = document.querySelector('.lightbox-content');

    // 2. Adicionar evento de clique em TODAS as imagens de produtos
    const productImages = document.querySelectorAll('.img-container img');

    productImages.forEach(img => {
        img.style.cursor = 'zoom-in'; // Mostra lupa ao passar o mouse
        
        img.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamento padrão se tiver link
            const src = img.getAttribute('src');
            lightboxImg.setAttribute('src', src);
            lightboxOverlay.classList.add('active');
        });
    });

});