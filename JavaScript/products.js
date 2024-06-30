const productsContainer = document.getElementById("products-grid");

// Function to fetch products from your API
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        // Display products dynamically
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to display products
function displayProducts(products) {
    productsContainer.innerHTML = ''; // Clear existing products

    if (products.length === 0) {
        productsContainer.innerHTML = '<h2>No se han agregado productos</h2>';
    } else {
        products.forEach(product => {
            const productCard = `
                <div class="card" data-product-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="card-container--info">
                        <p>${product.name}</p>
                        <div class="card-container--value">
                            <p>$${product.price}</p>
                            <img src="./img/Vector.png" alt="suprimir" class="delete-icon">
                        </div>
                    </div>
                </div>
            `;

            productsContainer.innerHTML += productCard;
        });
    }

    // Add event listeners to delete icons after displaying products
    const deleteIcons = document.querySelectorAll('.delete-icon');
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', handleDeleteProduct);
    });
}

// Function to handle product deletion
async function handleDeleteProduct(event) {
    const card = event.target.closest('.card');
    const productId = card.dataset.productId;

    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            card.remove();
        } else {
            console.error('Error deleting product:', response.status);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

// Call the function to fetch and display products on page load
fetchProducts();