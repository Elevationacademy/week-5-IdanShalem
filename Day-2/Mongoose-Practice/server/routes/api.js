const express = require('express')
const router = express.Router()

const Person = require('../models/Person')

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        res.send(people)
    })
})

router.post('/person', function(req, res) {
    let newPerson = req.body
    newPerson = new Person({
        firstName: newPerson.firstName,
        lastName: newPerson.lastName,
        age: newPerson.age
    })
    newPerson.save()
    res.end()
})

router.put('/person/:id', function(req, res) {
    const personId = req.params.id
    Person.findByIdAndUpdate(personId, { age: 80 }, { new: true }, function(err, person) {
        res.send(person)
    })
})

router.delete('/apocalypse', function(req, res) {
    Person.find({}, function(err, result) {
        result.forEach(p => p.remove())
    }).then(res.end())
})

module.exports = router