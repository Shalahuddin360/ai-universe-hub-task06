const loadTools = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url)
    const data = await (res.json())
    displayTools(data.data.tools);
}
const displayTools = (tools) => {
    //  console.log(data)
    const toolsContainer = document.getElementById('tools-container');
    tools.forEach(tool => {
        // console.log(tool);
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML = `
    <div class="card h-100">
       <img src="${tool.image}" class="card-img-top img-fluid" alt="...">
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
                        <p class="text-muted">${tool.published_in}</p>
                    </div>

                  <a href="#"><i class="c fas fa-arrow-right"></i></a>
               </div>
                
                        
                
            <div>
  </div> 
    `
        toolsContainer.appendChild(toolDiv);
    });
}
loadTools();