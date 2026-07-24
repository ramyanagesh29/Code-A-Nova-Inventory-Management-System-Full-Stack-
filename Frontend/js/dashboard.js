const token=localStorage.getItem("token");

if(!token){
    alert("Please login first.");
    window.location.href="login.html";
}

async function loadDashboard() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/dashboard",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();

        document.getElementById("totalProducts").innerText =
            data.totalProducts;

        document.getElementById("totalCategories").innerText =
            data.totalCategories;

        document.getElementById("totalSuppliers").innerText =
            data.totalSuppliers;

        document.getElementById("lowStock").innerText =
            data.lowStockProducts;

    } catch (error) {

        console.log(error);

    }

}

loadDashboard();

function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";

}