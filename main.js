utils=require('tool.utility')
settings=require('config.index')
require('loris.spawner')
require('loris.creep')

settings.startscript()

module.exports.loop = function () {
    settings.starttick()

    for (var r in Game.spawns) {
        Game.spawns[r].lorisTurn()
    }
    
    
    for (var r in Game.creeps) {
        Game.creeps[r].lorisTurn()
    }
    
   
    
    
    /*for (var r in Game.rooms) {
        //utils.log(Game.rooms[r], "room")
    }*/
    
}