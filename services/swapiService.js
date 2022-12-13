let axios = require('axios');
module.exports = {
    fetchPeopleFromPages: async (page = 1) => {
        try {
            const res = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
            return formatAPIData(res);
        } catch (err) {
            console.log('Error getting data', err.message)
            return [];
        }
    },

    fetchPlanetsFromPages: async (page = 1) => {
        try {
            const res = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
            return formatAPIData(res)
        } catch (err) {
            console.log('Error getting data', err.message)
            return [];
        }
    }
}

const formatAPIData = res => {
    const formattedData = {
        totalPages: Math.ceil(res.data.count / 10),
        results: res.data.results
    }
    return formattedData.results.length > 0 ? formattedData : []
}