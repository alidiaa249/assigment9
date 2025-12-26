var contactimg = document.getElementById("contactimg");
var contactname = document.getElementById("contactname");
var contactphone = document.getElementById("contactphone");
var contactemail = document.getElementById("contactemail");
var contactadrees = document.getElementById("contactadrees");
var contactgroup = document.getElementById("contactgroup");
var contactnotes = document.getElementById("contactnotes");
var contactfav = document.getElementById("contactfav");
var contactemer = document.getElementById("contactemer");
var allcontacts = [];
var emailicon = document.getElementById("emailicon");
var form = document.getElementById("form");
var cards = document.getElementById("cards");
var btnupdate = document.getElementById("updatebutton");
var btnadd = document.getElementById("addbutton");
var indexes = [];
var currentindex;
var color;
var total = (document.getElementById(
  "total"
).innerHTML = ` <div class=" fw-bold fs-4 text-gray-900" id="total">${allcontacts.length}</div>`);
var totalsearch = (document.getElementById("totalsearch").innerHTML =
  allcontacts.length);
calcfav();
calcemer();

function openform() {
  form.classList.remove("d-none");
}
function closeform() {
  form.classList.add("d-none");
  clearform();
}

if (localStorage.getItem("list")) {
  allcontacts = JSON.parse(localStorage.getItem("list"));
  displaycontacts(allcontacts);
  displayfavcontacts();
  displayemecontacts();
  calcfav();
  calcemer();
}

function addcontacts() {
  var contact = {
    img: contactimg.value,
    name: contactname.value,
    phone: contactphone.value,
    email: contactemail.value,
    adress: contactadrees.value,
    group: contactgroup.value,
    notes: contactnotes.value,
    fav: contactfav.checked,
    emer: contactemer.checked,
    color: randomcolor(),
  };
  if (!contactname.value) {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please enter a name for the contact!",
    });
  } else if (!validationname()) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
    });
  } else if (!contactphone.value) {
    Swal.fire({
      icon: "error",
      title: "Missing Phone",
      text: "Please enter a phone number!",
    });
  } else if (!validationnumber()) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    });
  } else if (!validationemail()) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
  } else {
    var exists = false;
    var indexofdupl 
    for (var i = 0; i < allcontacts.length; i++) {
      if (allcontacts[i].phone === contactphone.value) {
        exists = true;
        indexofdupl = i
        
      }
    }

    if (exists) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: `A contact with this phone number already exists :${allcontacts[indexofdupl].name} `,
      });
    } else {
Swal.fire({
  title: "Added!",
  text: " Contact has been added successfully!  ",
  icon: "success"
});
      allcontacts.push(contact);
      closeform();
      clearform();
    }
  }

  displaycontacts(allcontacts);
  displayfavcontacts();
  displayemecontacts();

  localStorage.setItem("list", JSON.stringify(allcontacts));
}

function displaycontacts(array, indexes) {
  var cartona = "";

  if (array.length === 0) {
    cartona += `<div  class="text-center fs-5 ">No Data to display </div>`;
  }

  if (!indexes) {
    indexes = [];
    for (var k = 0; k < array.length; k++) {
      indexes.push(k);
    }
  }
  for (var i = 0; i < array.length; i++) {
    cartona += ` <div class="col-sm-6 col-12 px-2 mt-2">
    <div class="inner-cards bg-white rounded-4 border overflow-hidden     ">
    <div class="d-flex gap-2 align-items-center mb-2 p-3 pb-0">
${
  array[i].img
  ? `<div class="position-relative img-contact "><img src="avatar/test" alt="${array[i].name}" class=" fs-8 rounded-3 border-0 W-100 h-100"> ${array[i].fav ? `<div class="d-flex justify-content-center align-items-center starbadge"><i class="fa-solid fa-star text-white "></i></div>`:""} ${array[i].emer ? `<div class="d-flex justify-content-center align-items-center heartbadge"><i class="fa-solid fa-heart-pulse text-white "></i></div>`:""}</div>`
  : `  <div class="${
        array[i].color
      } fs-6 fw-semibold img-card d-flex justify-content-center align-items-center text-white shadow-sm position-relative " >
    ${array[i].name.trim().charAt(0).toUpperCase()}
    ${array[i].fav ? `<div class="d-flex justify-content-center align-items-center starbadge"><i class="fa-solid fa-star "></i></div>`:""} ${array[i].emer ? `<div class="d-flex justify-content-center align-items-center heartbadge"><i class="fa-solid fa-heart-pulse "></i></div>`:""}
    </div>`
}

    <div>
    <h4 class="fs-6 fw-semibold mb-1 ">${array[i].name}</h4>
    <div class="d-flex align-items-center"  >
    <div class="phone-card d-flex align-items-center justify-content-center me-1 ">
    <i class="fa-solid fa-phone text-blue  "></i> 
</div>
<span class="fs-8 text-gray-500 ms-1">${array[i].phone}</span>
</div>
</div>
</div>
<div class="d-flex ps-3 flex-column">
<div >
${
  array[i].email
    ? `<div class="d-flex gap-2 align-items-center mb-2 ">
<div class="d-flex phone-card justify-content-center align-items-center"><i class="fa-solid fa-envelope text-blue"></i></div>
<span class="fs-8 text-gray-500 ms-1" >${array[i].email}</span>
</div>`
    : ""
}


</div>
${
  array[i].adress
    ? `<div class="d-flex gap-2 align-items-center mb-2 ">
<div class="d-flex phone-card justify-content-center align-items-center bg-success-subtle"><i class="fa-solid fa-location-dot text-success"></i></div>
<span class="fs-8 text-gray-500 ms-1" >${array[i].adress}</span>
</div>`
    : ""
}
<div class="d-flex ">


${
  group(array[i].group)
}





${
  array[i].emer
    ? `<div class="emergancy-icon align-self-start   " >
<i class="fa-solid fa-heart-pulse "></i><span class="ms-1">Emergency</span>
</div>`
    : ""
}



</div>


</div>











<div class="footer-card border-top border-1 mt-2  p-3 py-2  ">
<div class="d-flex justify-content-between ">
<div class="d-flex gap-1">
<a class="icons-footer-card d-flex justify-content-center align-items-center text-decoration-none phone-icon-footer-card fs-8  " href="tel:${
      array[i].phone
    }">
<i class="fa-solid fa-phone"></i>
</a>
<div id="emailicon">
${
  array[i].email
    ? `<a class="icons-footer-card d-flex justify-content-center align-items-center text-decoration-none text-blue message-icon fs-8 " href=mail:${array[i].email}>
  <i class="fa-solid fa-envelope"></i>
  </a>`
    : ""
}

</div>
  
</div>
<div class="d-flex gap-1">
${(array[i].fav)?  `<div class="icons-footer-card d-flex justify-content-center align-items-center text-decoration-none  star-icon fs-8 pointer-event " id="star-icon"  onclick=" reversefav(${indexes[i]}) ">
    <i class="fa-solid fa-star"></i>
  </div>` :`   <div class="icons-footer-card d-flex justify-content-center align-items-center text-decoration-none  star-hollow fs-8 pointer-event " id="star-hollow" onclick=" reversefav(${indexes[i]})">
    <i class="fa-regular fa-star"></i>
  </div>` }
${(array[i].emer)?  ` <div class="icons-footer-card d-flex justify-content-center align-items-center text-decoration-none  heart-icon fs-8 " onclick=" reverseemer(${indexes[i]})">
    <i class="fa-solid fa-heart-pulse"></i>
  </div>` :`     <div class="icons-footer-card d-flex justify-content-center align-items-center text-decoration-none  heart-hollow fs-8 " onclick=" reverseemer(${indexes[i]})">
    <i class="fa-regular fa-heart"></i>
  </div>` }
<button class="icons-footer-card d-flex justify-content-center align-items-center text-decoration-none  text-gray-500 fs-8 border-0 " onclick="updatecontacts(${
      indexes[i]
    })">
<i class="fa-solid fa-pen"></i>
</button>
<button class="icons-footer-card d-flex justify-content-center align-items-center   text-gray-500 fs-8 border-0" onclick="alertdelete(${
      indexes[i]
    })">
<i class="fa-solid fa-trash"></i>
</button>
</div>
</div>


</div>





</div>

</div>`;
  }

  total = document.getElementById(
    "total"
  ).innerHTML = ` <div class=" fw-bold fs-4 text-gray-900" id="total">${allcontacts.length}</div>`;
  totalsearch = document.getElementById("totalsearch").innerHTML =
    allcontacts.length;
  document.getElementById("cards").innerHTML = cartona;

  calcfav();
  calcemer();
}
function alertdelete(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${allcontacts[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deletecontacts(index);
      Swal.fire({
        title: "Deleted!",
        text: "contact has been deleted.",
        icon: "success",
      });
    }
  });
}
function deletecontacts(index) {
  allcontacts.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(allcontacts));
  displaycontacts(allcontacts);
  displayfavcontacts();
  displayemecontacts();
}

function calcfav() {
  var favcontacts = 0;
  for (var i = 0; i < allcontacts.length; i++) {
    if (allcontacts[i].fav === true) {
      favcontacts++;
    }
  }

  var totalfav = (document.getElementById(
    "totalfav"
  ).innerHTML = ` <div class=" fw-bold fs-4 text-gray-900" id="totalfav">${favcontacts}</div>`);
}
function calcemer() {
  var emercontacts = 0;
  for (var i = 0; i < allcontacts.length; i++) {
    if (allcontacts[i].emer === true) {
      emercontacts++;
    }
  }

  var totalfav = (document.getElementById(
    "totalemer"
  ).innerHTML = ` <div class=" fw-bold fs-4 text-gray-900" id="totalfav">${emercontacts}</div>`);
}
function clearform() {
  contactimg.value = "";
  contactname.value = "";
  contactphone.value = "";
  contactemail.value = "";
  contactadrees.value = "";
  contactgroup.value = "";
  contactnotes.value = "";
  contactfav.checked = false;
  contactemer.checked = false;
}

function updatecontacts(index) {
  currentindex = index;
  openform();
  btnupdate.classList.remove("d-none");
  btnadd.classList.add("d-none");
  contactimg = allcontacts[index].img;
  contactname.value = allcontacts[index].name;
  contactphone.value = allcontacts[index].phone;
  contactemail.value = allcontacts[index].email;
  contactadrees.value = allcontacts[index].adress;
  contactgroup.value = allcontacts[index].group;
  contactnotes.value = allcontacts[index].notes;
  contactfav.checked = allcontacts[index].fav;
  contactemer.checked = allcontacts[index].emer;
  color = allcontacts[index].color;

  console.log(allcontacts[index].fav);
}

function updateform() {
  var contact = {
    img: contactimg.value,
    name: contactname.value,
    phone: contactphone.value,
    email: contactemail.value,
    adress: contactadrees.value,
    group: contactgroup.value,
    notes: contactnotes.value,
    fav: contactfav.checked,
    emer: contactemer.checked,
    color: allcontacts[currentindex].color,
  };
  Swal.fire({
    title: "Updated!",
    text: "contact has been updated.",
    icon: "success",
  });
  allcontacts.splice(currentindex, 1, contact);
  btnupdate.classList.add("d-none");
  btnadd.classList.remove("d-none");
  closeform();
  localStorage.setItem("list", JSON.stringify(allcontacts));
  displaycontacts(allcontacts);
  displayfavcontacts();
  displayemecontacts();
  clearform();
}

function displayfavcontacts() {
  var cartona = "";
  for (var i = 0; i < allcontacts.length; i++) {
    if (allcontacts[i].fav === true) {
      cartona += `<div class=" p-2 card-fav rounded-3 d-flex justify-content-between align-items-center  gap-3 col-6 col-lg-12 mb-2 ">
  
${
  allcontacts[i].img
    ? `<img src="avatar/test" alt="${allcontacts[i].name}" class="fs-8 img-contact rounded-3 border-0 ">`
    : `  <div class="  ${
        allcontacts[i].color
      }   fw-semibold fs-8 text-white icon-card-fav d-flex justify-content-center align-items-center rounded-3   ">  ${allcontacts[
        i
      ].name
        .charAt(0)
        .toUpperCase()}</div>`
}


  
 


  <div class="flex-grow-1">
    <h2 class="fw-medium fs-8 mb-1">${allcontacts[i].name} </h2>
    <p class="fs-7 text-gray-500 m-0">${allcontacts[i].phone}</p>
  </div>
  <a class="phone-icon text-decoration-none d-flex justify-content-center align-items-center" href="tel:${
    allcontacts[i].phone
  }"><i class="fa-solid fa-phone"></i></a>
</div> `;
    }
  }
  document.getElementById("favcards").innerHTML = cartona;
}
function displayemecontacts() {
  var cartona = "";
  for (var i = 0; i < allcontacts.length; i++) {
    if (allcontacts[i].emer === true) {
      cartona += `<div class="p-2    card-emer rounded-3 d-flex justify-content-between align-items-center  gap-3 col-6 col-lg-12 ">
  
  
${
  allcontacts[i].img
    ? `<img src="avatar/test" alt="${allcontacts[i].name}" class="fs-8 img-contact rounded-3 border-0 ">`
    : `  <div class="  ${
        allcontacts[i].color
      }   fw-semibold fs-8 text-white icon-card-fav d-flex justify-content-center align-items-center rounded-3   ">  ${allcontacts[
        i
      ].name
        .charAt(0)
        .toUpperCase()}</div>`
}


  <div class="flex-grow-1">
    <h2 class="fw-medium fs-8 mb-1">${allcontacts[i].name} </h2>
    <p class="fs-7 text-gray-500 m-0">${allcontacts[i].phone}</p>
  </div>
  <a class="emergancyphone text-decoration-none  d-flex justify-content-center align-items-center " href="tel:${
    allcontacts[i].phone
  }"><i class="fa-solid fa-phone"></i></a>
</div> `;
    }
  }
  document.getElementById("emercards").innerHTML = cartona;
}
function search(search) {
  var foundedarray = [];
  var foundedIndexes = [];
  for (var i = 0; i < allcontacts.length; i++) {
    if (
      allcontacts[i].name.toLowerCase().includes(search.toLowerCase()) ||
      allcontacts[i].phone.toLowerCase().includes(search.toLowerCase()) ||
      allcontacts[i].email.toLowerCase().includes(search.toLowerCase())
    ) {
      foundedarray.push(allcontacts[i]);
      foundedIndexes.push(i);
    }
  }

  displaycontacts(foundedarray, foundedIndexes);
}

function randomcolor() {
  var random = [
    "random-bg-red",
    "random-bg-blue",
    "random-bg-green",
    "random-bg-yellow",
    "random-bg-violet",
    "random-bg-orange",
  ];

  var e = Math.floor(Math.random() * random.length);

  return random[e];
}

function validationname() {
  var regaxname = /^[A-Za-z ]{2,50}$/;
  if (regaxname.test(contactname.value)) {
    document.getElementById("valdname").classList.add("d-none");
    return true;
  } else {
    document.getElementById("valdname").classList.remove("d-none");

    return false;
  }
}
function validationnumber() {
  var regaxnumber = /^01[0125][0-9]{8}$/;
  if (regaxnumber.test(contactphone.value)) {
    document.getElementById("valdnumber").classList.add("d-none");
    return true;
  } else {
    document.getElementById("valdnumber").classList.remove("d-none");

    return false;
  }
}
function validationemail() {
  var regaxemail = /^(?:[\w\-.]+@([\w-]+\.)+[\w-]{2,})?$/;
  if (regaxemail.test(contactemail.value)) {
    document.getElementById("valdemail").classList.add("d-none");
    return true;
  } else {
    document.getElementById("valdemail").classList.remove("d-none");
  }
  return false;
}

function reversefav(index){
  allcontacts[index].fav = !allcontacts[index].fav
  displaycontacts(allcontacts)
  displayemecontacts()
  displayfavcontacts()
}
function reverseemer(index){
  allcontacts[index].emer = !allcontacts[index].emer
  displaycontacts(allcontacts)
  displayemecontacts()
  displayfavcontacts()
}




function group(groupvalue){
switch (groupvalue) {
  case "Work":
    return  ` <div class="group work"> Work</div>`
    
    break
    case "Family" : 
    return  `  <div class="group work">  Family</div>`
    break
    case  "Friends": 
    return  `    <div class="group friends">  Friends</div>`
    break
    case "School" : 
    return  ` <div class="group school">  School</div>`
    break
    case "Other" : 
    return  `<div class="group other">  Other</div>`
    break

   
  default: 
  return ""
    break;
}



}