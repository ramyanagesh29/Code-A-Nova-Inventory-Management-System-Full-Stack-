const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

const saleForm = document.getElementById("saleForm");
const productSelect = document.getElementById("product");
const salesTable = document.getElementById("salesTable");


// LOAD PRODUCTS
async function loadProducts() {

    try {

        const response = await fetch(
            "http://localhost:3000/products"
        );

        const products = await response.json();

        productSelect.innerHTML =
            '<option value="">Select Product</option>';

        products.forEach(product => {

            const option = document.createElement("option");

            option.value = product._id;

            option.textContent =
                `${product.name} - Stock: ${product.stock}`;

            productSelect.appendChild(option);

        });

    } catch (error) {

        console.error(error);

    }

}


// LOAD SALES
async function loadSales() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/sales",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const sales = await response.json();

        salesTable.innerHTML = "";

        sales.forEach(sale => {

            const row = document.createElement("tr");

            const date =
                new Date(sale.createdAt).toLocaleDateString();

            row.innerHTML = `
                <td>${sale.product?.name || "Product Deleted"}</td>
                <td>${sale.quantity}</td>
                <td>₹${sale.totalAmount.toFixed(2)}</td>
                <td>${date}</td>
            `;

            salesTable.appendChild(row);

        });

    } catch (error) {

        console.error(error);

    }

}


// RECORD SALE
saleForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const product = productSelect.value;

    const quantity =
        Number(document.getElementById("quantity").value);

    try {

        const response = await fetch(
            "http://localhost:3000/api/sales",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },

                body: JSON.stringify({
                    product,
                    quantity
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Sale Recorded Successfully!");

            saleForm.reset();

            await loadProducts();
            await loadSales();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);
        alert("Server Error");

    }

});


function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}


loadProducts();
loadSales();