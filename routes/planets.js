const express = require('express');
const router = express.Router();
const getAllPlanets = require('../services/planetService');
const { getAllPeople } = require('../services/peopleService')

/* GET users listing. */
router.get('/', async (req, res) => {
    const planets = await getAllPlanets();
    const allPeople = await getAllPeople();
    const planetUrlsWithResidents = getPlanetUrlWithResidentNames(allPeople);

    for (const planet of planets) {
      planet.residents = planetUrlsWithResidents[planet.url];
    }
    res.status(200).send({ data: planets });
});

const getPlanetUrlWithResidentNames = (allPeople) => {
    const planetWithResidents = {};
    
    for (const person of allPeople) {
        if (person.homeworld in planetWithResidents) {
            planetWithResidents[person.homeworld].push(person.name);
        } else {
            planetWithResidents[person.homeworld] = [person.name];
        }   
    }
    
    return planetWithResidents;
}

module.exports = router;
