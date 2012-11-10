exports.doit = function(name, callback) {
  callback("Hello " + name);
}


this.doit("simon", function(a,b,c,d){
  console.log(arguments);
})
