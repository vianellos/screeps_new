/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tool.utility');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    log: function(vr, msg=false) {
        cl="";
        if (msg) {
            cl+=msg+": "
        }
        cl+=JSON.stringify(vr)
        console.log( cl )
    }
};

