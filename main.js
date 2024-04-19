function search(){
    const searchTerm = document.getElementById("searchInput").value
    const apiKey = "SUA_CHAVE"

    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&SUA_CHAVE_DE_BUSCA&q=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        displayResults(data.items)
    })
    .catch(error => {
        console.error("Error: " + error)
    })
}

function displayResults(results){
    const searchResultsDiv = document.getElementById("searchResults");

    results.forEach(result => {
        const resultAnchor = document.createElement("a");
        resultAnchor.textContent = result.title;
        resultAnchor.href = result.link;
        resultAnchor.target = "_blank";
        resultAnchor.classList.add("resultAnchor");

        resultAnchor.addEventListener("click", (event) => {
            event.preventDefault();
            const clickedURL = result.link;
            saveClickedURL(clickedURL);
            window.open(clickedURL, "_blank");
        });

        const resultContainer = document.createElement("div");
        resultContainer.classList.add("resultContainer");
        resultContainer.appendChild(resultAnchor);
        searchResultsDiv.appendChild(resultContainer);
    });
}


function clearResults(){
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = ""
}

function saveClickedURL(url) {
    const clickedURLs = localStorage.getItem("clickedURLs") ? JSON.parse(localStorage.getItem("clickedURLs")) : [];
    clickedURLs.push(url);  
    localStorage.setItem("clickedURLs", JSON.stringify(clickedURLs));
}

function showRecentLinks() {
    const recentLinksList = document.getElementById("recentLinksList");
    recentLinksList.innerHTML = ""; 

    const clickedURLs = JSON.parse(localStorage.getItem("clickedURLs")) || [];

    clickedURLs.slice().reverse().forEach(url => {
        const listItem = document.createElement("li");
        const link = document.createElement("a"); 
        link.textContent = url;
        link.href = url; 
        link.target = "_blank";
        listItem.appendChild(link);
        recentLinksList.appendChild(listItem); 
    });
}


showRecentLinks();