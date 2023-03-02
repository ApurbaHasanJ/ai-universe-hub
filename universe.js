const loadAi = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayAi(data.data.tools))
}

const displayAi = (data) =>{
    const aiContainer = document.getElementById('ai-container');
    data.forEach( ai => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        console.log(ai.image)
        aiDiv.innerHTML= `
        <div class="card p-3 shadow">
                    <img class="img-fluid" src="${ai.image}" class="card-img-top mb-3" alt="..." style="height: 300px; width: 437px;">
                    <div class="card-body">
                        <div>
                            <h5 class=" my-2 fs-3 fw-semibold">Features</h5>
                            <ol class="text-secondary ps-4">
                                <li> </li>
                                <li> </li>
                                <li> </li>
                            </ol>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="">
                                <h5 class=" my-2 fs-3 fw-semibold">AI Name</h5>
                                <p class="m-0 text-secondary">
                                    <i class="fa-regular fa-calendar-days"></i>
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
    // console.log(data)
}