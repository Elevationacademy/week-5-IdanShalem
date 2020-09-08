const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/SpaceDB', {useNewUrlParser: true})

const Schema = mongoose.Schema

const SolarSystemSchema = new Schema ({
    planets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }],
    starName: String
})

const planetSchema = new Schema ({
    name: String,
    system: { type: Schema.Types.ObjectId, ref: 'System' },
    visitors: [{ type: Schema.Types.ObjectId, ref: 'Visitor' }]
})

const visitorsSchema = new Schema ({
    name: String,
    homePlanet: { type: Schema.Types.ObjectId, ref: 'Planet' },
    visitedPlanets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }]
})

const System = mongoose.model("System", SolarSystemSchema)
const Planet = mongoose.model("Planet", planetSchema)
const Visitor = mongoose.model("Visitor", visitorsSchema)

const s1 = new System ({
    starName: 'Shemesh'
})

s1.save()

const p1 = new Planet ({
    name: 'Earth',
    system: s1    
})

const p2 = new Planet ({
    name: 'Venus',
    system: s1    
})

const p3 = new Planet ({
    name: 'Jupiter',
    system: s1    
})

const p4 = new Planet ({
    name: 'Mercury',
    system: s1    
})

const p5 = new Planet ({
    name: 'Mars',
    system: s1    
})

const p6 = new Planet ({
    name: 'Saturn',
    system: s1    
})

const planets = [p1, p2, p3, p4, p5, p6]
planets.forEach(p => {
    s1.planets.push(p)
    p.save()
})

const v1 = new Visitor ({
    name: 'Yoni',
    homePlanet: p4,
    visitedPlanets: [p6, p4, p3]    
})

const v2 = new Visitor ({
    name: 'Yoni',
    homePlanet: p2,
    visitedPlanets: [p5, p1]    
})

const v3 = new Visitor ({
    name: 'Yoni',
    homePlanet: p1,
    visitedPlanets: [p2, p3, p4, p5]    
})

const v4 = new Visitor ({
    name: 'Yoni',
    homePlanet: p6,
    visitedPlanets: [p3]    
})
 p1.visitors.push(v3)
 p2.visitors.push(v2, v3)
 p3.visitors.push(v1, v3, v4)
 p4.visitors.push(v1, v3)
 p5.visitors.push(v2, v3)
 p6.visitors.push(v4)

const visitors = [v1, v2, v3, v4]
visitors.forEach(v => v.save())

Visitor.find({}).populate('visitedPlanets').exec(function(err, visitors) {
    visitors.forEach(v => console.log(v.name + ": " + v.visitedPlanets))
})

Planet.find({}).populate('visitors').exec(function(err, planets) {
    planets.forEach(p => console.log(p.name + ": " + p.visitors))
})

System.findOne({})
    .populate({
        path: 'planets',
        populate: {
            path: 'visitors'
        }
    })
    .exec((err, result) => {
        const plt = result.planets
        plt.forEach(p => console.log(p.visitors))
    })

Visitor.findById('5f575b348a0f47061ca0bd86')
    .populate({
        path: 'homePlanet',
        populate: {
            path: 'system'
        }
    })
    .exec((err, visitor) => {
        console.log(visitor.homePlanet.system.starName)
        
    })