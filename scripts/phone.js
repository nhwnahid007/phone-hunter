const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

//phone gulo dekhaite chai ejonno ei function create korlam
const displayPhones = (phones, isShowAll) => {
  // console.log(phones);

  //# step:1 kothai bosabo setaar jonno loop er baire create kori

  const phoneContainer = document.getElementById("phone-container");

  //clear container cards before adding new cards

  phoneContainer.textContent = "";

  //display show button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log("is show all", isShowAll);
  //display only first 12 phones if not show all

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);

    //# STEP:2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    //# Step:3 set inner
    phoneCard.innerHTML = `<figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show details</button>
              </div>
            </div>`;

    //#step:4 append

    phoneContainer.appendChild(phoneCard);
  });
  //hide loading spinner
  toggleLoadingSpinner(false);
};

//handle search button

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);

  // console.log("Clicked");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value; //input field so value
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};
//handle search recap
// const handleSearch2 = () => {
//   toggleLoadingSpinner(true);
//   const searchField = document.getElementById("search-field2");
//   const searchText = searchField.value;
//   loadPhone(searchText);
//   console.log("hooise");
// };

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// Handle show all

const handleShowAll = () => {
  handleSearch(true);
};

const handleShowDetail = async (id) => {
  console.log("Clicked show details", id);
  //load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();

  const phone = data.data;

  showPhoneDetails(phone);
};

//display \

const showPhoneDetails = (phone) => {
  console.log(phone);
  //show the modal
  show_details_modal.showModal();
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText=phone.name;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `

  <img src="${phone.image}">
  <p><span>Brand: </span>${phone?.brand}</p>

  <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span>Processor: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>Sensor: </span>${phone?.mainFeatures?.sensors}</p>
  <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span>Display: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>Release Date: </span>${phone?.releaseDate}</p>
  <p><span>Model: </span>${phone?.slug}</p>



  `;
};

loadPhone();
