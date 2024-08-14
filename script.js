
const menuItems = {
    burgers: [
        { name: 'Cheeseburger', description: 'Hambúrguer com queijo e molho especial.', price: 15.00, img: 'Imagens/Hambúrgueres/cheeseburger1.jpg' },
        { name: 'Bacon Burger', description: 'Hambúrguer com bacon crocante.', price: 18.00, img: 'Imagens/Hambúrgueres/burgerbacon1.jpg' },
        { name: 'Veggie Burger ', description: 'Hambúrguer feito com ingredientes frescos e naturais. ', price: 16.00, img: 'Imagens/Hambúrgueres/veggieburger.jpg' }
    ],
    acompanhamentos: [
        { name: 'Batata Frita', description: 'Porção de batata frita crocante.', price: 10.00, img: 'Imagens/Acompanhamentos/french-fries.jpg' },
        { name: 'Nuggets', description: 'Nuggets de frango com molho barbecue.', price: 12.00, img: 'Imagens/Acompanhamentos/nuggets.jpg' },
        { name: 'Onion Rings', description: 'Anéis de cebola empanados.', price: 11.00, img: 'Imagens/Acompanhamentos/onion rings.jpg' }
    ],
    bebidas: [
        { name: 'Refrigerante', description: 'Refrigerante de cola, 350ml.', price: 5.00, img: 'Imagens/Bebidas/refrigerante.jpg' },
        { name: 'Suco de Laranja', description: 'Suco natural de laranja, 350ml.', price: 7.00, img: 'Imagens/Bebidas/suco de laranja.jpg' },
        { name: 'Milkshake', description: ' Milksheke cremoso de bounilha, 500ml.', price: 12.00, img: 'Imagens/Bebidas/milkshake.jpg' }
      
        
    ],
    sanduiches: [
        { name: 'Club Sandwich', description: 'Sanduíche recheado com peito de peru, bacon, alface e tomate em pão tostado.', price: 8.00, img: 'imagens/Sanduíches/club sanduich.jpg' },
        { name: 'Sanduíche de Frango', description: 'Sanduíche de frango grelhado com alface e maionese.', price: 9.00, img: 'Imagens/Sanduíches/sanduiche de frango.jpg' },
        { name: 'Sanduíche vegano', description: 'Sanduíche vegano com alface, tomate, pepino e molho tahine em pão integral.', price: 6.00, img: 'Imagens/Sanduíches/sanduich vegan.jpg' }
    ],
    sobremesas: [
        { name: 'Sorvete de casquinha', description: 'Sorvete cremoso servido em uma casquinha crocante.', price: 12.00, img: 'Imagens/Sobremesas/sorvete com casquinha.jpg' },
        { name: 'Brownie com sorvete', description: 'Brownie de chocolate quente acompanhado de uma bola de sorvete de baunilha.', price: 13.00, img: 'Imagens/Sobremesas/brownie com sorvete.jpg' },
        { name: 'Torta de maçã', description: 'Torta de maçã quentinha, com massa crocante e recheio doce.', price: 11.00, img: 'Imagens/Sobremesas/Torta de maça.jpg' }
    ],
    saladas: [
        { name: 'Salada Caesar', description: 'Salada fresca com alface, croutons, parmesão e molho Caesar.', price: 25.00, img: 'Imagens/Saladas/salada_caesar.jpg' },
        { name: 'Salada de Frango Grelhado', description: 'Salada saudável com frango grelhado, alface, tomate e molho leve.', price: 20.00, img: 'Imagens/Saladas/salada de frango grelhado.jpg' },
        { name: 'Salada vegetariana.jpg', description: 'Salada colorida com uma mistura de vegetais frescos e molho vinagrete.', price: 17.00, img: 'Imagens/Saladas/salada vegetariana.jpg' }
    ]
};


let cart = {};


function showCategory(category) {
    const menuDiv = document.getElementById('menu-items');
    menuDiv.innerHTML = '';

    menuItems[category].forEach(item => {
        menuDiv.innerHTML += `
            <div class="menu-item">
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Preço: R$${item.price.toFixed(2)}</p>
                <input type="checkbox" id="${item.name}" name="item" value="${item.name}" data-price="${item.price}" onchange="updateCart('${item.name}', ${item.price})">
                <label for="${item.name}">Selecionar</label>
            </div>
        `;
    });
}


function updateCart(itemName, itemPrice) {
    const checkbox = document.getElementById(itemName);

    if (checkbox.checked) {
        if (!cart[itemName]) {
            cart[itemName] = { price: itemPrice, quantity: 1 };
        }
    } else {
        delete cart[itemName];
    }
    updateCartDisplay();
}


function updateCartDisplay() {
    const cartDiv = document.getElementById('cart-items');
    cartDiv.innerHTML = '';

    let total = 0;

    for (const [itemName, itemDetails] of Object.entries(cart)) {
        const itemTotal = itemDetails.price * itemDetails.quantity;
        total += itemTotal;
        cartDiv.innerHTML += `
            <div class="cart-item">
                <h4>${itemName}</h4>
                <p>Preço Unitário: R$${itemDetails.price.toFixed(2)}</p>
                <label for="${itemName}-quantity">Quantidade:</label>
                <input type="number" id="${itemName}-quantity" name="${itemName}-quantity" min="1" value="${itemDetails.quantity}" onchange="updateQuantity('${itemName}', this.value)">
                <p>Total: R$${itemTotal.toFixed(2)}</p>
            </div>
        `;
    }

    cartDiv.innerHTML += `<h3>Total do Pedido: R$${total.toFixed(2)}</h3>`;
}


function updateQuantity(itemName, quantity) {
    if (cart[itemName]) {
        cart[itemName].quantity = parseInt(quantity) || 1;
        updateCartDisplay();
    }
}


function finalizeOrder() {
    if (Object.keys(cart).length === 0) {
        alert('Por favor, selecione pelo menos um item antes de finalizar o pedido.');
        return;
    }

    let total = 0;
    const orderDetails = Object.entries(cart).map(([itemName, itemDetails]) => {
        const itemTotal = itemDetails.price * itemDetails.quantity;
        total += itemTotal;
        return `${itemName} - Quantidade: ${itemDetails.quantity} - Total: R$${itemTotal.toFixed(2)}`;
    }).join('<br>');

    document.getElementById('order-details').innerHTML = `
        <p><strong>Detalhes do Pedido:</strong></p>
        <p>${orderDetails}</p>
        <p><strong>Total: R$${total.toFixed(2)}</strong></p>
    `;

    document.getElementById('order-summary').style.display = 'flex';
}

function confirmOrder() {
    const fullName = document.getElementById('full-name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked');

    if (!fullName || !address || !phone || !paymentMethod) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    alert('Pedido confirmado! Obrigado pela sua compra.');
    cancelOrder();
}

function cancelOrder() {
    document.getElementById('order-summary').style.display = 'none';
    cart = {};
    updateCartDisplay();
}

function closeModal() {
    document.getElementById('order-summary').style.display = 'none';
}

