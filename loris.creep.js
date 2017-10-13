_.assign(Creep.prototype,{
    
   lorisTurn:function() {
       //utils.log(this, "creep")
        switch(this.memory.role) {
            case 'harvester':
                this.lorisHarvest();
            break;
       }
   },
   lorisHarvest: function(igncr) {
       if (this.memory.target==null) {
            this.setNewTarget(true);   
       }
   },
   setNewTarget: function (igncr) {
		var ret=false
		if (this.carry.energy<(this.carryCapacity/10)) {
			var rtype=FIND_SOURCES
			var rfilter={ filter: (resource) => { return (resource.energy > 0); } }
		}
		else {
			var rtype=FIND_STRUCTURES
			var rfilter={ filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity; } }
		}
		if (igncr) {
			rfilter.ignoreCreeps=true
		}
		else {
			rfilter.ignoreCreeps=false
		}
		var res=this.pos.findClosestByPath(rtype, rfilter)
		if (res) {
			if (this.setNewPath(res, 1)) {
				this.memory.action='move'
				this.memory.target=res.id
				ret=true
			}
		}
		return ret
	},
	setNewPath: function(res, range) {
		var path=this.pos.findPathTo(res)
		utils.log(path, "path")
		if (path) {
			this.memory.savedPath=Room.serializePath(path)
			this.memory.destId=res.id
			this.memory.destX=res.pos.x
			this.memory.destX=res.pos.y
			this.memory.destR=range
			this.say("Set path")
			return true
		}
		return false
	}
});