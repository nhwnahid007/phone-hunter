const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

//phone gulo dekhaite chai ejonno ei function create korlam
const displayPhones = (phones) => {
  // console.log(phones);

  //# step:1 kothai bosabo setaar jonno loop er baire create kori

  const phoneContainer = document.getElementById("phone-container");

  //clear container cards before adding new cards

  phoneContainer.textContent = "";

  //display show button if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length>12) {
    showAllContainer.classList.remove('hidden');

  }
  else{
        showAllContainer.classList.add("hidden");

  }
  //display only first 12 phones
  phones = phones.slice(0, 12);


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
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>`;

    //#step:4 append

    phoneContainer.appendChild(phoneCard);
  });
};
// loadPhone();

//handle search button

const handleSearch = () => {
  console.log("Clicked");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value; //input field so value
  console.log(searchText);
  loadPhone(searchText);
};

const handleSearch2 = () => {
  const searchField = document.getElementById("search-field2");
  const searchText = searchField.value;
  loadPhone(searchText);
  console.log("hooise");
};
