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
        Memory.ticknumber=0
    },
    starttick: function() {
        Memory.ticknumber++
        //console.log('Tick number '+Memory.ticknumber)
    }
};