/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config.spgrid');
 * mod.thing == 'a thing'; // true
 */

splist={}
splist.ha01={'role':'harvester','max':4, 'body':[WORK,CARRY,CARRY,MOVE], "cost":250, "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_STRUCTURES, 'destFilter': { filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity; } }, destAction:'transfer', destOption:RESOURCE_ENERGY}
splist.up01={'role':'upgrader','max':5, 'body':[WORK,CARRY,CARRY,MOVE], "cost":250, "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_STRUCTURES, 'destFilter': { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTROLLER) } }, destAction:'upgradeController', destOption:false}
splist.bu01={'role':'builder','max':5, 'body':[WORK,CARRY,CARRY,MOVE], "cost":250, "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_CONSTRUCTION_SITES, 'destFilter': { }, destAction:'build', destOption:false}