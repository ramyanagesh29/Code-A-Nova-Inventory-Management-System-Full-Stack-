const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}


async function loadReports() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/reports",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Unable to load reports");
            return;
        }


        document.getElementById("totalProducts").innerText =
            data.totalProducts;

        document.getElementById("totalCategories").innerText =
            data.totalCategories;

        document.getElementById("totalSuppliers").innerText =
            data.totalSuppliers;

        document.getElementById("lowStockProducts").innerText =
            data.lowStockProducts;

        document.getElementById("totalSalesTransactions").innerText =
            data.totalSalesTransactions;

        document.getElementById("totalPurchaseTransactions").innerText =
            data.totalPurchaseTransactions;

        document.getElementById("totalSalesAmount").innerText =
            "₹" + Number(data.totalSalesAmount).toFixed(2);

        document.getElementById("totalPurchaseAmount").innerText =
            "₹" + Number(data.totalPurchaseAmount).toFixed(2);

    } catch (error) {

        console.error(error);

        alert("Unable to load report data");

    }

}


function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}


loadReports();