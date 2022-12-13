const { fetchPeopleFromPages } = require("./swapiService");

const getAllPeople = async () => {
    const requests = [];
    const { totalPages, results } = await fetchPeopleFromPages();
  
    for (let i = 2; i <= totalPages; i++) { // starting at index 2 because we already got page 1
      requests.push(fetchPeopleFromPages(i));
    }
  
    let promiseResponses = await Promise.all(requests);
    let formattedResults = promiseResponses.map(response => response.results).flat()
    return [...results, ...formattedResults];
}

const sortByName = (data) => data ? data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) : []

const sortByMassOrHeight = (data, key) => {
  if (!data || !key) return []
  let unknowns = data.filter(person => person[key] === 'unknown');
  let sortedWithoutUnknowns = data.filter(person => person[key] !== 'unknown').sort((a, b) => (parseFloat(a[key].replace(/,/g, '')) > parseFloat(b[key].replace(/,/g, ''))) ? 1 : ((parseFloat(b[key].replace(/,/g, '')) > parseFloat(a[key].replace(/,/g, ''))) ? -1 : 0))
  return [...sortedWithoutUnknowns, ...unknowns]
}

module.exports = {getAllPeople, sortByName, sortByMassOrHeight};