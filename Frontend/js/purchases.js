const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

const purchaseForm = document.getElementById("purchaseForm");
const productSelect = document.getElementById("product");
const supplierSelect = document.getElementById("supplier");
const purchasesTable = document.getElementById("purchasesTable");


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
                `${product.name} - Current Stock: ${product.stock}`;

            productSelect.appendChild(option);

        });

    } catch (error) {

        console.error(error);

    }

}


// LOAD SUPPLIERS
async function loadSuppliers() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/suppliers"
        );

        const suppliers = await response.json();

        supplierSelect.innerHTML =
            '<option value="">Select Supplier</option>';

        suppliers.forEach(supplier => {

            const option = document.createElement("option");

            option.value = supplier._id;
            option.textContent = supplier.name;

            supplierSelect.appendChild(option);

        });

    } catch (error) {

        console.error(error);

    }

}


// LOAD PURCHASE RECORDS
async function loadPurchases() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/purchases",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const purchases = await response.json();

        purchasesTable.innerHTML = "";

        purchases.forEach(purchase => {

            const row = document.createElement("tr");

            const date =
                new Date(purchase.createdAt).toLocaleDateString();

            row.innerHTML = `
                <td>${purchase.product?.name || "Product Deleted"}</td>
                <td>${purchase.supplier?.name || "Supplier Deleted"}</td>
                <td>${purchase.quantity}</td>
                <td>₹${Number(purchase.purchasePrice).toFixed(2)}</td>
                <td>₹${Number(purchase.totalAmount).toFixed(2)}</td>
                <td>${date}</td>
            `;

            purchasesTable.appendChild(row);

        });

    } catch (error) {

        console.error(error);

    }

}


// RECORD PURCHASE
purchaseForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const product = productSelect.value;
    const supplier = supplierSelect.value;

    const quantity =
        Number(document.getElementById("quantity").value);

    const purchasePrice =
        Number(document.getElementById("purchasePrice").value);

    try {

        const response = await fetch(
            "http://localhost:3000/api/purchases",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },

                body: JSON.stringify({
                    product,
                    supplier,
                    quantity,
                    purchasePrice
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Purchase Recorded Successfully!");

            purchaseForm.reset();

            await loadProducts();
            await loadPurchases();

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
loadSuppliers();
loadPurchases();