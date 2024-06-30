const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    const newProduct = {
        name: name,
        price: price,
        image: image
    };

    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            // Clear the form
            productForm.reset();

            // Fetch and display the updated products
            fetchProducts();
        } else {
            console.error('Error creating product:', response.status);
        }
    } catch (error) {
        console.error('Error creating product:', error);
    }
});