var synaptic = require('synaptic');

var Architect = synaptic.Architect;
var Trainer = synaptic.Trainer;

var hopfield = new Architect.Hopfield(80);
var trainer = new Trainer(hopfield);


var ascii2bin = function(ascii)
{
  var bin = "00000000000000000000000000000000000000000000000000000000000000000000000000000000";
  for (var i = 0; i < ascii.length; i++)
  {
    var code = ascii.charCodeAt(i);
    bin += ('00000000' + code.toString(2)).slice(-8);
  }
  return bin.slice(-10 * 8).split('').reverse();
}



var trainingSet = [
  {
    input: ascii2bin("john"),
    output: ascii2bin("john")
  },
  {
    input: ascii2bin("Marco"),
    output: ascii2bin("john")
  },
  {
    input: ascii2bin("product-title"),
    output: ascii2bin("product")
  },
  {
    input: ascii2bin("product-description"),
    output: ascii2bin("product")
  }
]


function main() {

  var option = {
    iterations: 20000,
    error: .05,
    rate: .05
  };

  console.log("Training Neo....");
  trainer.train(trainingSet, option);
  console.log("Neo is done training !")

  var input = ascii2bin("product title");

  //console.log("output word in binary: " + input.join(''));

  var output = hopfield.feed(input);

  console.log(output);
  var key = output.join('');

  var myMap = {};

  myBin = ascii2bin("production");
  myBin = myBin.join('')

  console.log("input  : " + myBin);
  console.log("output : " + key);

  myMap[myBin] = ["product"];

  if (key in myMap) {
    console.log("pattern matched");
  }
  else {
    console.log("New Pattern");
  }

}

main();