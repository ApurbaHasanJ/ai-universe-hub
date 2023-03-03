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
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        console.log(ai)
        aiDiv.innerHTML= `
        <div class="card p-3 shadow">
                    <img src="${ai.image}" class="card-img-top mb-3 rounded-3 img-fluid" alt="..." style="height: 300px; width: 437px;">
                    <div class="card-body">
                        <div>
                            <h5 class=" my-2 fs-3 fw-semibold">Features</h5>
                            <ol class="text-secondary ps-4">
                                <li>${ai.features[0]}</li>
                                <li>${ai.features[1]}</li>
                                <li>${ai.features[2]}</li>
                            </ol>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="">
                                <h5 class=" my-2 fs-3 fw-semibold">${ai.name}</h5>
                                <p class="m-0 text-secondary">
                                    <i class="fa-regular fa-calendar-days"></i>
                                    ${ai.published_in}
                                </p>
                            </div>
                            <div>
                                <i id="ai-detail-btn" class="fa-solid fa-arrow-right bg-danger-subtle p-3 text-danger rounded-circle"></i>
                            </div>
                        </div>      
                    </div>
                  </div>
        `;
        aiContainer.appendChild(aiDiv);
    });
}

loadAi(6); // You can pass any number to limit the data
