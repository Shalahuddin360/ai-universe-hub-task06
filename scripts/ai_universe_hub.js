const loadTools = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    try {
        const res = await fetch(url)
        const data = await (res.json())
        displayTools(data.data.tools, dataLimit);
    }
    catch (error) {
        console.log(error);
    }


}

    // display all tools
     const displayTools = (tools, dataLimit) => {
    //  console.log(data)
    // capture tools container to append all the tool 

    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.textContent = ''
    
    //   display 6 tools only 
    const showAll = document.getElementById('show-all');
    if (dataLimit && tools.length > 6) {
        tools = tools.slice(0, 6);

        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    

    tools.forEach(tool => {
    // console.log(tool);
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('col');
     toolDiv.innerHTML = `
    <div class="card h-100">
       <img src="${tool.image}" class="card-img-top img-fluid p-3 rounded-5" alt="...">
        <div class="card-body">

            <div class="card-title"> 
            <h3>Feature</h3>
            </div>

            <div>
                <ol class="list-group list-group-numbered">
                <li class="list-group-item">${tool.features[0]}</li>
                <li class="list-group-item">${tool.features[1]}</li>
                <li class="list-group-item">${tool.features[2]}</li>
                </ol>
            </div>
        
        </div>
            <div class="card-footer">

                <div class="d-flex justify-content-between align-items-center">
                    <div class="card-title"> 
                        <h5>${tool.name}</h5>
                        <p id="date" class="text-muted"><i class="fa-regular fa-calendar-days"></i>${tool.published_in}</p>
                    </div>

                  <a onclick="loadToolDetails('${tool.id}')" href="#"  data-bs-toggle="modal" data-bs-target="#toolDetails"><i  class=" bg-danger bg-gradient p-2 text-white rounded fas fa-arrow-right" style="--bs-bg-opacity: .5;" ></i></a>
               </div>
           
            <div>
     </div> 
    `
        toolsContainer.appendChild(toolDiv);
    });

// stop loader or spinner
    toggleSpinner(false);
}

//display show more cards using common function 
  const processSearch = (dataLimit) => {
    toggleSpinner(true);
    loadTools(dataLimit);

}
// handle onload event  

const loadData = () => {
    processSearch(6);
}
// start loader or spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
// not the best way to load Show More 
 document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
    // sort  by date empty value set 
    loadSortDate();
})
// fetch all tools available in a id
// modal section starts 
const loadToolDetails = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayToolDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }

}
const displayToolDetails = (tool) => {
    // console.log(tool.features['1'].feature_name)
    const toolDescription = document.getElementById('toolDetailsLabel');
    toolDescription.innerText = tool.description;
    const toolImage = document.getElementById('tool-image');
    toolImage.innerHTML = `<img class="img-fluid rounded-5" src="${tool.image_link[0]}" alt="">
    `

    const toolPrice = document.getElementById('tool-price');
    toolPrice.innerHTML = `
    <div class="shadow text-center p-lg-3 p-sm-2 m-0 rounded text-success">
    <p>${tool.pricing[0].price ? tool.pricing[0].price : "Free Of Cost"}</p>
    <p>${tool.pricing[0].plane ? tool.pricing[0].plane : "No Data Found"}</p>

    </div>

    <div class="shadow  text-center p-lg-3 p-sm-2 m-0 rounded text-warning-emphasis">
        <p>${tool.pricing[1].price ? tool.pricing[1].price : "Free Of Cost"}</p>
        <p>${tool.pricing[1].plane ? tool.pricing[1].plane : "No Data Found"}</p>
    </div>


    <div class="shadow  text-center p-lg-3  p-sm-2 m-0 rounded text-danger">
        <p>${tool.pricing[2].price ? tool.pricing[2].price : "Free Of Cost"}</p>
        <p>${tool.pricing[2].plane ? tool.pricing[2].plane : "No Data Found"}</p>

    </div>
    
    `
    const toolFeatures = document.getElementById('tool-features');
    toolFeatures.innerHTML = `

  <div class="text-muted">

  <p class="fw-bold text-dark fs-3">Features</p>
  <ul>
    <li>${tool.features['1'].feature_name ? tool.features['1'].feature_name : 'No Data Found'}</li>
    <li>${tool.features['2'].feature_name ? tool.features['2'].feature_name : 'No Data Found'}</li>
    <li>${tool.features['3'].feature_name ? tool.features['3'].feature_name : 'No Data Found'}</li>
  </ul>
 </div>

 <div class="text-muted ">
  <p class="fw-bold text-dark fs-3">Integrations</p>
  <ul>
    <li>${tool.integrations[0] ? tool.integrations[0] : "No Data Found"}</li>
    <li>${tool.integrations[1] ? tool.integrations[1] : "No Data Found"}</li>
    <li>${tool.integrations[2] ? tool.integrations[2] : "No Data Found"}</li>
  </ul>
 </div>
`
    document.getElementById('tool-input').innerHTML = `${tool.input_output_examples[0].input ? tool.input_output_examples[0].input : 'Can you give any example?'} `
    document.getElementById('tool-output').innerHTML = `${tool.input_output_examples[0].output ? tool.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'} `

    const btnShow = document.getElementById('btn');
    btnShow.innerHTML = ` ${tool.accuracy.score ? (tool.accuracy.score * 100) : 'No Found'} <span>% accuracy</span>`
    
    const btnAll = document.getElementById('btn');
    if ( (tool.accuracy.score * 100)) {
        btnAll.classList.remove('d-none');
    }
    else{
        btnAll.classList.add('d-none');
    }
}

//sort by date starts
const loadSortDate = async (dataLimit) => {

    const url = `https://openapi.programming-hero.com/api/ai/tools`
    try {
        const res = await fetch(url)
        const data = await (res.json())
        // sort by date an object of array date property from API 
        const sortedData = [...data.data.tools].sort((a, b) => {

            return new Date(b.published_in) - new Date(a.published_in);

        });

        displayTools(sortedData, dataLimit);
    }
    catch (error) {
        console.log(error);
    }

}