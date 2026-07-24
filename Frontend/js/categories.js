const API = "http://localhost:3000/api/categories";

const token = localStorage.getItem("token");

loadCategories();

async function loadCategories() {

    try {

        const response = await fetch(API);

        const categories = await response.json();

        let output = "";

        categories.forEach(category => {

            output += `
            <tr>

            <td>${category.name}</td>

            <td>${category.description || ""}</td>

            <td>

            <button onclick="editCategory('${category._id}')">
            Edit
            </button>

            <button onclick="deleteCategory('${category._id}')">
            Delete
            </button>

            </td>

            </tr>
            `;

        });

        document.getElementById("categoryTable").innerHTML = output;

    }

    catch(error){

        console.log(error);

    }

}

async function addCategory(){

    const name=document.getElementById("name").value;

    const description=document.getElementById("description").value;

    const response=await fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        },

        body:JSON.stringify({
            name,
            description
        })

    });

    if(response.ok){

        alert("Category Added Successfully");

        document.getElementById("name").value="";

        document.getElementById("description").value="";

        loadCategories();

    }

    else{

        const data=await response.json();

        alert(data.message);

    }

}

async function deleteCategory(id){

    if(!confirm("Delete this Category?")){

        return;

    }

    const response=await fetch(API+"/"+id,{

        method:"DELETE",

        headers:{
            Authorization:"Bearer "+token
        }

    });

    if(response.ok){

        alert("Category Deleted");

        loadCategories();

    }

}

async function editCategory(id){

    const name=prompt("Enter New Category Name");

    const description=prompt("Enter Description");

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
            description

        })

    });

    if(response.ok){

        alert("Category Updated");

        loadCategories();

    }

}

function logout(){

    localStorage.removeItem("token");

    window.location.href="login.html";

}