require('config.spgrid')

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config.index');
 * mod.thing == 'a thing'; // true
 */
 
module.exports = {
    startscript:function() {
        if (Memory.ticknumber>10) {
            Memory.ticknumber=0
        }
    },
    starttick: function() {
        Memory.ticknumber++
        this.setBodyList()
        this.setCreeoNumber()
        this.clearMemory()
    },
    setBodyList: function() {
        for (var ro in Game.rooms) {
            if (Game.rooms[ro].memory.lastEnergy==null || Game.rooms[ro].memory.lastEnergy!=Game.rooms[ro].energyCapacityAvailable) {
                Game.rooms[ro].memory.lastEnergy=Game.rooms[ro].energyCapacityAvailable
                Game.rooms[ro].memory.bodylist={}
                for (var r in bodylist) {
                    Game.rooms[ro].memory.bodylist[r]={'body':null, 'cost':0}
                    for (var l in bodylist[r]) {
                        bodycost=0
                        for (var b in bodylist[r][l].body) {
                            switch(bodylist[r][l].body[b]) {
                                case "move":
                                    bodycost+=50;    
                                break;
                                case "work":
                                    bodycost+=100;    
                                break;
                                case "carry":
                                    bodycost+=50;    
                                break;
                                case "attack":
                                    bodycost+=80;    
                                break;
                                case "ranged_attack":
                                    bodycost+=150;    
                                break;
                                case "heal":
                                    bodycost+=250;    
                                break;
                                case "claim":
                                    bodycost+=600;    
                                break;
                                case "tough":
                                    bodycost+=10;    
                                break;
                            }
                        }
                        
                        if (bodycost>Game.rooms[ro].memory.bodylist[r].cost && bodycost<Game.rooms[ro].energyCapacityAvailable) {
                            Game.rooms[ro].memory.bodylist[r]={'body':bodylist[r][l].body, 'cost':bodycost}
                        }
                    }
                }
            }
        }
        
    },
    setCreeoNumber: function() {
        for (var ro in Game.rooms) {
            Game.rooms[ro].memory.creepList=splist
            tc= _.sum(Game.creeps, c => true)
            utils.log(tc, "creeps")
            if (tc<4) {
                Game.rooms[ro].memory.creepList.ha01.max=4;
                console.log("carico v01")
                break
            }
            
            filter={ filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER); } }
            conta=Game.rooms[ro].find(FIND_MY_STRUCTURES,  filter)
            //utils.log(conta, "conta")
            if (conta.length==0 ) {
                Game.rooms[ro].memory.creepList.ha01.max=4;
                Game.rooms[ro].memory.creepList.bu01.max=4;
                console.log("carico v02")
                break
            }
            else {
                Game.rooms[ro].memory.creepList.ha02.max=11;
                Game.rooms[ro].memory.creepList.bu02.max=3;
                Game.rooms[ro].memory.creepList.up02.max=11;
                Game.rooms[ro].memory.creepList.re02.max=1;
                Game.rooms[ro].memory.creepList.co02.max=1;
                console.log("carico v03")
                break
            }
            
                        
            
            
        }
    },
    clearMemory: function() {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }
};