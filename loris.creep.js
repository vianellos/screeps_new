_.assign(Creep.prototype,{
    
   lorisTurn:function() {
        switch(this.memory.role) {
            case 'harvester':
                this.lorisHarvest();
            break;
            case 'upgrader':
                this.lorisHarvest();
            break;
            case 'builder':
                this.lorisHarvest();
            break;
       }
   },
   lorisHarvest: function() {
       if (this.memory.action==null) {
            this.memory.action=this.setNewTarget(true); 
       }
       this.say(this.memory.action)
       switch (this.memory.action) {
            case 'move':
                this.lorisMove()
            break;
            case 'stucked':
                this.memory.action=this.setNewTarget(false);
            break;
            case 'idle':
                this.memory.action=this.setNewTarget(false);
                if (this.memory.action=='idle') {
                    this.say('Going away...')
                    this.moveTo(41, 25)
                }
            break;
            case 'work':
                this.memory.action=this.work()
            break;
       }
   },
   setNewTarget: function (igncr) {
		var ret='idle'
		if (this.carry.energy<(this.carryCapacity/10)) {
		    
			var rtype=splist[this.memory.code].sourceType
			var rfilter=splist[this.memory.code].sourceFilter
			this.memory.destType=1
		}
		else {
			var rtype=splist[this.memory.code].destType
			var rfilter=splist[this.memory.code].destFilter
			this.memory.destType=2
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
				this.memory.target=res.id
				ret='move'
			}
		}
		return ret
	},
	setNewPath: function(res, range) {
		var path=this.pos.findPathTo(res)
		if (path) {
			this.memory.savedPath=Room.serializePath(path)
			this.memory.destId=res.id
			this.memory.destX=res.pos.x
			this.memory.destY=res.pos.y
			this.memory.lastX=0
			this.memory.lastY=0
			this.memory.lastFatigue=0
			this.memory.destR=range
			this.say("Set path")
			return true
		}
		return false
	},
    lorisMove: function () {
        if (this.hasArrived()){
            this.memory.action='work'
        }else if (this.memory.lastX!=this.pos.x || this.memory.lastY!=this.pos.y || this.memory.lastFatigue!=this.fatigue) {
            this.memory.lastX=this.pos.x
            this.memory.lastY=this.pos.y
            this.memory.lastFatigue=this.fatigue
            ret=this.moveByPath(Room.deserializePath(this.memory.savedPath))
        }
        else {
            this.memory.action='stucked'
        }
    },
	hasArrived: function () {
		if ( (this.pos.x<=this.memory.destX+this.memory.destR && this.pos.x>=this.memory.destX-this.memory.destR) && (this.pos.y<=this.memory.destY+this.memory.destR && this.pos.y>=this.memory.destY-this.memory.destR) ) {
			this.say('Arrived')
			return true;
		}
		else {
			return false
		}
	},
	work: function() {
	    ret ='stucked'
	    if (this.memory.destType==1 && this.carry.energy>=this.carryCapacity) {
	        ret=this.setNewTarget()
	    }
	    else if (this.memory.destType==2 && this.carry.energy==0) {
	        ret=this.setNewTarget()
	    }
	    else {
    	    obj=Game.getObjectById(this.memory.destId)
    	    switch (this.memory.destType) {
    	        case 1:
    	            var act=this[splist[this.memory.code].sourceAction](obj, splist[this.memory.code].sourceOption)
    	            this.say(splist[this.memory.code].sourceAction)
    	       break;
    	       case 2:
    	            var act=this[splist[this.memory.code].destAction](obj, splist[this.memory.code].destOption)
    	            this.say(splist[this.memory.code].destAction)
    	       break;
    	    }
    	    
    		if (act==ERR_NOT_IN_RANGE) {
                ret ='stucked'
    		}
    		else if (act==ERR_INVALID_TARGET || act==ERR_FULL) {
    		    ret ='stucked'
    		}
    		else if (act==0) {
    			ret='work'
    		}
    		else {
    			ret ='stucked'
    		}
	    }
		return ret
	}
});