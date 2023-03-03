const loadAi = (dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayAi(data.data.tools, dataLimit))
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
                                <p class="m-0 text-secondary">
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
    });
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
    const {description, pricing, image_link, input_output_examples} = aiDetails;
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
                      <div class=" d-flex justify-content-center align-items-center modal-price-box rounded-4 bg-white text-success">${pricing[0] ? pricing[0].price : 'Free Of Cost'}</div>
                      <div class=" d-flex justify-content-center align-items-center modal-price-box rounded-4 bg-white text-warning">P2</div>
                      <div class=" d-flex justify-content-center align-items-center modal-price-box rounded-4 bg-white text-danger-emphasis">P3</div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <h2 class="fw-semibold fs-2 mb-3">Features</h2>
                        <ul>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </div>
                      <div class="col">
                        <h2 class="fw-semibold fs-2 mb-3">Integrations</h2>
                        <ul>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- AI Photo and MSG -->
                  <div class="col p-3 border border-secondary rounded-3">
                    <img src="${image_link[0]}" class="card-img-top rounded-3" alt="...">
                      <div class="card-body mt-3">
                        <p class="card-text text-center fs-2 fw-semibold">${input_output_examples[0].input}</p>
                        <p class="card-text text-center">${input_output_examples[0].output}</p>
                      </div>
                  </div>
                </div>
    `;
}
// loadAiDetails(id)

loadAi(6); 
