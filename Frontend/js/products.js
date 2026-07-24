const token=localStorage.getItem("token");

if(!token){
    alert("Please login first.");
    window.location.href="login.html";
}
async function loadProducts() {
    try {
        const search = document.getElementById("search").value;

        const response = await fetch(
            `http://localhost:3000/products?search=${search}`
        );

        console.log("Status:", response.status);

        const products = await response.json();

        console.log("Products:", products);

        const container = document.getElementById("productContainer");
        container.innerHTML = "";

        let totalStock = 0;
        let lowStock = 0;

        products.forEach(product => {

            totalStock += product.stock;

            if (product.stock < 10) {
                lowStock++;
            }
        container.innerHTML += `
        <div class="product">

            <h2>${product.name}</h2>

            <p>Price : ₹${product.price}</p>

            <p>Stock : ${product.stock}</p>

            <button onclick="editProduct('${product._id}','${product.name}',${product.price},${product.stock})">
                Edit
            </button>

            <button onclick="deleteProduct('${product._id}')">
                Delete
            </button>

        </div>
        `;
        });

        document.getElementById("totalProducts").innerText = products.length;
        document.getElementById("totalStock").innerText = totalStock;
        document.getElementById("lowStock").innerText = lowStock;

    } catch (error) {
        console.error("Error:", error);
    }
}
loadProducts();
async function addProduct() {

    const token = localStorage.getItem("token");

    const product = {
        name: document.getElementById("name").value,
        price: Number(document.getElementById("price").value),
        stock: Number(document.getElementById("stock").value)
    };

    const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    const data = await response.json();

    console.log("Add Product Response:", data);

    loadProducts();
    alert("Product Added Successfully!");
}
async function deleteProduct(id) {

    if (!confirm("Are you sure you want to delete?")) return;

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    console.log("Delete Response:", data);

    loadProducts();
    alert("Product Deleted Successfully!");
}
async function editProduct(id, name, price, stock) {

    const newName = prompt("Enter Product Name", name);
    const newPrice = prompt("Enter Price", price);
    const newStock = prompt("Enter Stock", stock);

    if (newName === null || newPrice === null || newStock === null) {
        return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: newName,
            price: Number(newPrice),
            stock: Number(newStock)
        })
    });

    const data = await response.json();

    console.log(data);
    alert("Product Updated Successfully!");
    loadProducts();
}
