spgrid=require('config.spgrid')

_.assign(Spawn.prototype,{
    
   lorisTurn:function(msg) {
       
       utils.log(spgrid.varditest[spgrid.last], spgrid.last)
       spgrid.last++
       if (spgrid.last>spgrid.varditest.length) {
           spgrid.last=0
       }
       
       //utils.log(this)
   } 
});