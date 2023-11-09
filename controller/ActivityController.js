const Activity = require("../activities/activities")

const ActivityController = {
    all: async (req, res)=>{
        const result = await Activity.find({})
        res.send(result)
    },
    create: async(req, res)=>{
        const activity = new Activity(req.body)
        const resultat = await activity.save()
        res.send(resultat)
    }
}

module.exports = ActivityController