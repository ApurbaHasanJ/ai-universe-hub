let fetchData = [];
console.log(fetchData)
const loadAi = (dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      fetchData = data.data.tools;
      displayAi(data.data.tools, dataLimit)
    })
}

const displayAi = (data , dataLimit) =>{
    const aiContainer = document.getElementById('ai-container');

    // Clear previous AI data
    aiContainer.innerHTML = ''; 
    
    // See More AI
    if(dataLimit && data.length > dataLimit){
        data = data.slice(0, dataLimit);
    }

    const seeMoreButton = document.getElementById('see-more-btn');
    seeMoreButton.addEventListener('click', () => {
    loadAi(1000); // Set dataLimit to a high value to display all AI
    seeMoreButton.classList.add('d-none')
});


    data.forEach( ai => {
        const {published_in,image,name, features, id} = ai;
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        // console.log(ai)
        aiDiv.innerHTML= `
        <div class="card p-3 shadow">
                    <img src="${image}" class="card-img-top mb-3 rounded-3 img-fluid" alt="..." style="height: 300px; width: 437px;">
                    <div class="card-body">
                        <div>
                            <h5 class=" my-2 fs-3 fw-semibold">Features</h5>
                            <ol class="text-secondary ps-4">
                                <li>${features[0]}</li>
                                <li>${features[1]}</li>
                                <li>${features[2]}</li>
                            </ol>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="">
                                <h5 class=" my-2 fs-3 fw-semibold">${name}</h5>
                                <p id="published-date" class="m-0 text-secondary">
                                    <i class="fa-regular fa-calendar-days"></i>
                                    ${published_in}
                                </p>
                            </div>
                            <div>
                                <i id="ai-detail-btn" class="fa-solid fa-arrow-right bg-danger-subtle p-3 text-danger rounded-circle" onclick="loadAiDetails('${id}')" data-bs-toggle="modal" data-bs-target="#aiDetails"></i>
                            </div>
                        </div>      
                    </div>
                  </div>
        `;
        aiContainer.appendChild(aiDiv);
    })
    toggleSpinner(false)
}

// toggle Spinner
const toggleSpinner = isLoading =>{
  const loaderSection =document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
}


const loadAiDetails = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => showAiDetails(data.data))
}

const showAiDetails = aiDetails =>{
    const modalAiDiv = document.getElementById('modal-ai-details');
    
    console.log(aiDetails)
    const {description, pricing, image_link, input_output_examples, features, integrations, accuracy
    } = aiDetails;


    const aiAccuracy = () =>{
      if(aiDetails.accuracy.score > 0){
        return aiDetails.accuracy.score * 100 + '% accuracy';
        
      }
      else{
        return '';
      }
    } 
      
    
    
    modalAiDiv.innerHTML = `
    <div class="modal-header">
                  <button type="button" class="btn-close bg-danger text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="row modal-body m-3 grid gap-4">
                  <!-- AI Description -->
                  <div class="col p-3  bg-danger-subtle border border-danger rounded-3">
                    <h2 class="card-title fw-semibold mb-4">${description}</h2>
                    <!-- Payment Price -->
                    <div class="d-flex justify-content-around align-items-center mb-4">
                      <div class=" d-flex fs-5 p-2 fw-semibold justify-content-center align-items-center modal-price-box rounded-4 bg-white text-success">${pricing? pricing[0].price : 'free of cost'}<br>${pricing? pricing[0].plan : 'Basic'}</div>

                      <div class=" d-flex fs-5 p-2 fw-semibold justify-content-center align-items-center modal-price-box rounded-4 bg-white text-warning">${pricing? pricing[1].price : 'free of cost'}<br>${pricing? pricing[1].plan : 'Basic'}</div>
                      <div class=" d-flex fs-5 p-2 fw-semibold justify-content-center align-items-center modal-price-box rounded-4 bg-white text-danger-emphasis">${pricing? pricing[2].price : 'free of cost'}<br>${pricing? pricing[2].plan : 'Basic'}</div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <h2 class="fw-semibold fs-2 mb-3">Features</h2>
                        <ul>
                          <li>${features[1].feature_name}</li>
                          <li>${features[2].feature_name}</li>
                          <li>${features[1].feature_name}</li>
                        </ul>
                      </div>
                      <div class="col">
                        <h2 class="fw-semibold fs-2 mb-3">Integrations</h2>
                        <ul>
                          <li>${integrations? integrations?.[0] : 'No Data Found'}</li>
                          <li>${integrations? integrations?.[1] : 'No Data Found'}</li>
                          <li>${integrations? integrations?.[2] : 'No Data Found'}</li>

                          

                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- AI Photo and MSG -->
                  <div class="col p-3 border border-secondary rounded-3">
                    <div class="position-relative">
                      <img src="${image_link[0]}" class="card-img-top rounded-4" alt="...">
                      
                      <button class="btn btn-danger accuracy-btn position-absolute ">${aiAccuracy()}</button>

                    </div>
                      <div class="card-body mt-3">
                        <p class="card-text text-center fs-2 fw-semibold">${input_output_examples === null ? 'Can you give any example?' : input_output_examples[0].input}</p>
                        <p class="card-text text-center">${input_output_examples === null ? 'No! Not Yet! Take a break!!!' : input_output_examples[0].output}</p>


                      

                      </div>
                  </div>
                </div>
    `;
}



// const textEl = document.getElementById('short-by-date-btn');

// const date = new Date(`${aiContainer. published_in}`);
// const date2 = new Date(1998, 3, 25);
// const date3 = new Date(2003, 3, 25);
// const date4 = new Date(2007, 3, 25);
// console.log(date)

// const dateArr = [date, date2, date3, date4];

// // Descending order
// const sortedArrDes = dateArr.sort((a, b) => b.getTime() - a.getTime()); // Descending order
// const sortedDates = sortedArrDes.map((a) => new Date(a));
// sortedDates.forEach((a) => (textEl.textContent += `${a} |****| `));

// function sortByDate() {
//   const cardList = document.getElementById('published-date'); // get the card list element
//   const cards = cardList.children; // get all the card elements
  
//   // convert HTML collection to an array and sort it by date attribute
//   const sortedCards = Array.from(cards).sort((a, b) => {
//     const aDate = new Date(a.getAttribute('data-date'));
//     const bDate = new Date(b.getAttribute('data-date'));
//     return aDate - bDate;
//   });

//   // clear card list and append sorted cards to it
//   cardList.innerHTML = '';
//   sortedCards.forEach(card => cardList.appendChild(card));
// }

// const sortByDateBtn = document.getElementById('short-by-date-btn');
// sortByDateBtn.addEventListener('click', sortByDate);

// loadAiDetails(id)

loadAi(6); 
