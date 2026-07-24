const API = "http://localhost:3000/api/suppliers";

const token = localStorage.getItem("token");

loadSuppliers();

async function loadSuppliers() {

    try {

        const response = await fetch(API);

        const suppliers = await response.json();

        let output = "";

        suppliers.forEach(supplier => {

            output += `
            <tr>

            <td>${supplier.name}</td>

            <td>${supplier.email || ""}</td>

            <td>${supplier.phone || ""}</td>

            <td>${supplier.address || ""}</td>

            <td>

            <button onclick="editSupplier('${supplier._id}')">

            Edit

            </button>

            <button onclick="deleteSupplier('${supplier._id}')">

            Delete

            </button>

            </td>

            </tr>
            `;

        });

        document.getElementById("supplierTable").innerHTML = output;

    }

    catch(error){

        console.log(error);

    }

}

async function addSupplier(){

    const name=document.getElementById("name").value;

    const email=document.getElementById("email").value;

    const phone=document.getElementById("phone").value;

    const address=document.getElementById("address").value;

    const response=await fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        },

        body:JSON.stringify({

            name,
            email,
            phone,
            address

        })

    });

    if(response.ok){

        alert("Supplier Added Successfully");

        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("phone").value="";
        document.getElementById("address").value="";

        loadSuppliers();

    }

    else{

        const data=await response.json();

        alert(data.message);

    }

}

async function deleteSupplier(id){

    if(!confirm("Delete this Supplier?")){

        return;

    }

    const response=await fetch(API+"/"+id,{

        method:"DELETE",

        headers:{
            Authorization:"Bearer "+token
        }

    });

    if(response.ok){

        alert("Supplier Deleted");

        loadSuppliers();

    }

}

async function editSupplier(id){

    const name=prompt("Supplier Name");

    const email=prompt("Email");

    const phone=prompt("Phone");

    const address=prompt("Address");

    if(name==null){

        return;

    }

    const response=await fetch(API+"/"+id,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json",
            Authorization:"Bearer "+token
        },

        body:JSON.stringify({

            name,
            email,
            phone,
            address

        })

    });

    if(response.ok){

        alert("Supplier Updated");

        loadSuppliers();

    }

}

function logout(){

    localStorage.removeItem("token");

    window.location.href="login.html";

}