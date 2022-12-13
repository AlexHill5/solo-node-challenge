const express = require('express');
const router = express.Router();
const { getAllPeople, sortByName, sortByMassOrHeight} = require('../services/peopleService')

router.get('/', async (req, res) => {
  const { sortBy } = req.query;

  let people = await getAllPeople();

  if (sortBy === 'name') {
    people = sortByName(people);
  } else if (sortBy === 'mass' || sortBy === 'height') {
    people = sortByMassOrHeight(people, sortBy);
  }

  res.status(200).send({ data: people });
});


module.exports = router;