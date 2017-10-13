/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config.spgrid');
 * mod.thing == 'a thing'; // true
 */

splist={}
splist.ha01={'role':'harvester','max':10, 'body':[WORK,CARRY,CARRY,MOVE], "cost":250, "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_STRUCTURES, 'destFilter': { filter: (structure) => { return ( ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity) || (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy<structure.storeCapacity)); } }, destAction:'transfer', 'destOptions':RESOURCE_ENERGY}
splist.up01={'role':'upgrader','max':0, 'body':[WORK,CARRY,CARRY,MOVE], "cost":250, "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_STRUCTURES, 'destFilter': { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTROLLER) } }, destAction:'upgradeController', 'destOptions':false}
splist.bu01={'role':'builder','max':0, 'body':[WORK,CARRY,CARRY,MOVE], "cost":250, "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_CONSTRUCTION_SITES, 'destFilter': { }, destAction:'build', 'destOptions':false}
splist.bu02={'role':'builder','max':3, 'body':[WORK,CARRY,CARRY,MOVE], "cost":250, "sourceType":FIND_STRUCTURES, "sourceFilter": { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy>0); } }, 'sourceAction':'withdraw', 'sourceOptions':RESOURCE_ENERGY, 'destType':FIND_CONSTRUCTION_SITES, 'destFilter': { }, destAction:'build', 'destOptions':false}
splist.up02={'role':'upgrader','max':3, 'body':[WORK,CARRY,CARRY,MOVE], "cost":250,"sourceType":FIND_STRUCTURES, "sourceFilter": { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy>0); } }, 'sourceAction':'withdraw', 'sourceOptions':RESOURCE_ENERGY, 'destType':FIND_STRUCTURES, 'destFilter': { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTROLLER) } }, destAction:'upgradeController', 'destOptions':false}