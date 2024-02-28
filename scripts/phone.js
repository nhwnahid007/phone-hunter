const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
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
  phones.forEach((phone) => {
    console.log(phone);

    //# STEP:2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
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
loadPhone();
