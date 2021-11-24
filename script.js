let searchBox = document.getElementById('searchBox')
let searchResults = document.getElementById('searchResults')
let spinner = document.getElementById('spinner')

function wikipediaSearchBox(result){
    spinner.classList.add('d-none')

    let {title , link , description } = result

    let titleEle = document.createElement('a')
    titleEle.href = link
    titleEle.target = "_blank"
    titleEle.classList.add('result-title')
    titleEle.textContent = title
    searchResults.appendChild(titleEle)

    let lineBreak = document.createElement('br')
    searchResults.appendChild(lineBreak)

    let linkEle = document.createElement('a')
    linkEle.href = link
    linkEle.target = "_blank"
    linkEle.classList.add('result-url')
    linkEle.textContent = link
    searchResults.appendChild(linkEle)

    let lineBreak1 = document.createElement('br')
    searchResults.appendChild(lineBreak1)

    let desc = document.createElement('p')
    desc.textContent = description
    desc.classList.add('link-description')
    searchResults.appendChild(desc)
}


function wikipediaSearch(event){
    if (event.key === "Enter"){
        searchResults.textContent = ""
        spinner.classList.remove('d-none')

        let url = "https://apis.ccbp.in/wiki-search?search="+searchBox.value

        let options = {
            method: "GET"
        }
        
        fetch(url,options)
        .then(function(response){
            return response.json()
        })
        .then(function(JsonData){

            let {search_results} = JsonData

            for (let result of search_results){
                wikipediaSearchBox(result)
            }
        })

    }
}

searchBox.addEventListener("keydown",wikipediaSearch)