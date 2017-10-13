spgrid=require('config.spgrid')

_.assign(Spawn.prototype,{
    
   lorisTurn:function() {
       for (var cd in splist) {
            var list= _.filter(Game.creeps, (creep) => creep.memory.code == cd);
            if (list.length<splist[cd].max) {
                if (splist[cd].cost<=this.energy) {
                    this.spawnNew(cd, splist[cd])
                    break;
                }
            }
       }
   }, 
   spawnNew: function(cd, obj) {
        var newCreep =this.createCreep(obj.body, undefined, {role: obj.role, code:cd});
	    console.log("Spawning new "+obj.role+" ("+obj.body+") named "+newCreep+"")
   }
});