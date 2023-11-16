let searchText = "13";
function searchHandler(isShowAll) {
  const searchField = document.getElementById("searchField");
  searchText = searchField.value;
  loadPhone(searchText, isShowAll);
}

// function searchHandler2(){
//     const searchField=document.getElementById("searchField2");
//     searchText=searchField.value;
//     loadPhone(searchText);
// }
const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};
loadPhone(searchText);
const displayPhones = (phones, isShowAll) => {
  //console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  const showAll = document.getElementById("showALLBtn");
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  //display first 12
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    //console.log(phone);
    //1 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList.add("card");
    phoneCard.innerHTML = `
                    <img
                      src="${phone.image}"
                    />
                    <h3>${phone.phone_name}</h3>
                    <span
                      >There are many variations of passages of <br />
                      available, but the majority have suffered</span
                    >
                    <button onclick="showDetailsHandler('${phone.slug}')">Show Details</button>`;
    phoneContainer.appendChild(phoneCard);
  });
  //hide loading spinner

  // function noItem(isNoItem)
  // {
  //     if(isNoItem){
  //         const noItemContainer=document.getElementById("noItem");
  //         noItemContainer.classList.remove('hidden');
  //     }
  //     else{
  //         noItemContainer.classList.add('hidden');
  //     }
  // }
};

// show All Button
function showBtn() {
  searchHandler(true);
}
// Show Details
const showDetailsHandler = async (id) => {
  //console.log(id);
  // load data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();

  const phone = data.data;
  showPhoneDetails(phone);
  //console.log(phone);
};
const showDetail = document.getElementById("details");
const showPhoneDetails = (details) => {
  my_modal.showModal();
  const modelName = document.getElementById("detailsPhoneName");
  const brandName = document.getElementById("detailsBrand");
  const detailsSpec = document.getElementById("detailsSpec");
  const releaseDate = document.getElementById("releaseDate");
  const imageDiv = document.getElementById("imgContainer");

  imageDiv.innerHTML = `<img src="${details.image}" alt="">`;
  modelName.innerText = details.name;
  brandName.innerText = `Brand: ${details.brand}`;
  const features = details.mainFeatures;
  //console.log(features.storage);
  console.log(details.image);
  let string = "";
  for (const key in features) {
    //detailsSpec.innerHTML=`${features[key]} <br>`;

    //detailsSpec.innerText=`${features[key]} <br>`;
    //console.log(`${key}:${features[key]}`);
    string = string + `${key}: ${features[key]} \n`;
  }
  detailsSpec.innerText = string;
  releaseDate.innerText = `${details.releaseDate}`;
  showDetail.style.display = "block";
};

function closeCard() {
  showDetail.style.display = "none";
}