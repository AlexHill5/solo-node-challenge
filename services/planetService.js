const { fetchPlanetsFromPages } = require("./swapiService");

const getAllPlanets = async () => {
    const requests = [];
    const { totalPages, results } = await fetchPlanetsFromPages();
  
    for (let i = 2; i <= totalPages; i++) { // starting at index 2 because we already got page 1
      requests.push(fetchPlanetsFromPages(i));
    }
  
    let promiseResponses = await Promise.all(requests);
    let formattedResults = promiseResponses.map(response => response.results).flat()
    return [...results, ...formattedResults];
}

module.exports = getAllPlanets;