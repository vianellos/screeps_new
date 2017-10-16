/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('config.spgrid');
 * mod.thing == 'a thing'; // true
 */
 
 
bodylist={}
bodylist.basic={'1':{'body':[WORK,CARRY,MOVE]} }
bodylist.worker={'1':{'body':[WORK,CARRY,CARRY,MOVE]}, '2':{'body':[WORK,WORK,CARRY,CARRY,MOVE,MOVE]}, '3':{'body':[WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]} }

splist={}
splist.ha01={'role':'harvester','max':0, 'body':'basic', "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_STRUCTURES, 'destFilter': { filter: (structure) => { return ( ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity) || (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy<structure.storeCapacity)); } }, destAction:'transfer', 'destOptions':RESOURCE_ENERGY}
splist.up01={'role':'upgrader','max':0,  'body':'worker', "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_STRUCTURES, 'destFilter': { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTROLLER) } }, destAction:'upgradeController', 'destOptions':false}
splist.bu01={'role':'builder','max':0,  'body':'worker', "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_CONSTRUCTION_SITES, 'destFilter': { }, destAction:'build', 'destOptions':false}
splist.ha02={'role':'harvester','max':0, 'body':'worker', "sourceType":FIND_SOURCES, "sourceFilter": { filter: (resource) => { return (resource.energy > 0); } }, 'sourceAction':'harvest', 'sourceOptions':false, 'destType':FIND_STRUCTURES, 'destFilter': { filter: (structure) => { return ( ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity) || (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy<structure.storeCapacity)); } }, destAction:'transfer', 'destOptions':RESOURCE_ENERGY}
splist.bu02={'role':'builder','max':0, 'body':'worker', "sourceType":FIND_STRUCTURES, "sourceFilter": { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy>0); } }, 'sourceAction':'withdraw', 'sourceOptions':RESOURCE_ENERGY, 'destType':FIND_CONSTRUCTION_SITES, 'destFilter': { }, destAction:'build', 'destOptions':false}
splist.up02={'role':'upgrader','max':0, 'body':'worker', "sourceType":FIND_STRUCTURES, "sourceFilter": { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy>0); } }, 'sourceAction':'withdraw', 'sourceOptions':RESOURCE_ENERGY, 'destType':FIND_STRUCTURES, 'destFilter': { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTROLLER) } }, destAction:'upgradeController', 'destOptions':false}
splist.re02={'role':'repairer','max':0,  'body':'worker', "sourceType":FIND_STRUCTURES, "sourceFilter": { filter: (structure) => { return (structure.structureType == STRUCTURE_CONTAINER && structure.store.energy>0); } }, 'sourceAction':'withdraw', 'sourceOptions':RESOURCE_ENERGY, 'destType':FIND_STRUCTURES, 'destFilter': {  filter: object => object.hits < object.hitsMax}, destAction:'repair', 'destOptions':false}