var productname = document.getElementById("productname");
var productprice = document.getElementById("productprice");
var productlist = document.getElementById("productlist");
var productdescription = document.getElementById("productdescription");
var productimg = document.getElementById("productimg");
var table = document.getElementById("table");
var btnupdate = document.getElementById("updatebutton");
var btnadd = document.getElementById("addbutton");
var currentindex;
var productarray = [];



if (localStorage.getItem("list")) {
  productarray = JSON.parse(localStorage.getItem("list"));
  displayproducts(productarray);
}

function addproduct() {
  var products = {
    name: productname.value,
    price: productprice.value,
    type: productlist.value,
    description: productdescription.value,
    img: productimg.value,
  };
  productarray.push(products);
  localStorage.setItem("list", JSON.stringify(productarray));

  clear();

  displayproducts(productarray);


}

console.log(productarray)

function displayproducts(array, indexes) {
var cartona = "";
  if(array.length===0){
    cartona+=`<tr><td colspan="8" class="text-center fs-5 ">No Data to display </td></tr>`
  }
  

  if (!indexes) {
    indexes = [];
    for (var k = 0; k < array.length; k++) {
      indexes.push(k);
    }
  }
  for (var i = 0; i < array.length; i++) {
    cartona += `  <tr>
    <td>${i + 1}</td>
    <td><img src="avatar-4.jpg" alt=""></td>
    <td>${array[i].name}</td>
    <td>${array[i].price}</td>
    <td>${array[i].type}</td>
    <td>${array[i].description ? array[i].description : "-"}</td>
    <td><button class="btn btn-danger" onclick="deleteproducts(${
      indexes[i]
    })" >delete</button></td>
    <td><button class="btn btn-info" onclick="updateproducts(${
      indexes[i]
    })">update</button></td>
    <td></td>
  </tr>`;
  }
  document.getElementById("table").innerHTML = cartona;
}
function clear() {
  productname.value = "";
  productprice.value = "";
  productlist.value = "";
  productdescription.value = "";
  productimg.value = "";
}
function deleteproducts(index) {
  productarray.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(productarray));
  displayproducts(productarray);
}
function updateproducts(index) {
  currentindex = index;

  btnupdate.classList.remove("d-none");
  btnadd.classList.add("d-none");

  productname.value = productarray[index].name;
  productprice.value = productarray[index].price;
  productlist.value = productarray[index].type;
  productdescription.value = productarray[index].description;
  productimg.value = productarray[index].img;
}
function updateform() {
  var products = {
    name: productname.value,
    price: productprice.value,
    type: productlist.value,
    description: productdescription.value,
    img: productimg.value,
  };
  productarray.splice(currentindex, 1, products);
  btnupdate.classList.add("d-none");
  btnadd.classList.remove("d-none");
  localStorage.setItem("list", JSON.stringify(productarray));
  displayproducts(productarray);
  clear();
}
function search(search) {
  var foundedarray = [];
  var foundedIndexes = [];
  for (var i = 0; i < productarray.length; i++) {
    if (productarray[i].name.toLowerCase().includes(search.toLowerCase())) {
      foundedarray.push(productarray[i]);
      foundedIndexes.push(i);
    }
   
  }
 
  displayproducts(foundedarray, foundedIndexes);
}
