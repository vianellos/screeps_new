
_.assign(Spawn.prototype,{
    
   lorisTurn:function() {
       for (var cd in splist) {
            var list= _.filter(Game.creeps, (creep) => creep.memory.code == cd);
            if (list.length<this.room.memory.creepList[cd].max) {
                crbody=this.room.memory.bodylist[this.room.memory.creepList[cd].body]
                
                if (crbody.cost<=this.room.energyAvailable) {
                    this.spawnNew(cd, this.room.memory.creepList[cd], crbody)
                    break;
                }
            }
       }
   }, 
   spawnNew: function(cd, obj, body) {
        if (!(this.spawning)) {
            var newCreep =this.createCreep(body.body, undefined, {role: obj.role, code:cd});
            //utils.log(obj, "obj")
	        console.log("Spawning new "+obj.role+" ("+obj.body+") named "+newCreep+"")
        }
   }
});