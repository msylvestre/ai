let synaptic    = require('synaptic');

let Architect   = synaptic.Architect;
let Trainer     = synaptic.Trainer;

let hopfield    = new Architect.Hopfield(80);
let trainer     = new Trainer(hopfield);



/////////////////////////////////////////////
// Helper
/////////////////////////////////////////////

function ascii2bin(ascii)
{
  var bin = "00000000000000000000000000000000000000000000000000000000000000000000000000000000";
  for (var i = 0; i < ascii.length; i++)
  {
    var code = ascii.charCodeAt(i);
    bin += ('00000000' + code.toString(2)).slice(-8);
  }
  return bin.slice(-10 * 8).split('').reverse();
}

function convertToBin(trainingSet) {

  let binTrainingSet = [];

  for (var i = 0; i < trainingSet.length; i++) {
    binTrainingSet[i] = {
                          input: ascii2bin(trainingSet[i].input),
                          output: ascii2bin(trainingSet[i].output)
                        }
  }

  return binTrainingSet;
}



/////////////////////////////////////////////
// Trainer
/////////////////////////////////////////////

function readTrainingSet() {

  let trainingSet = [
    {
      input: "john",
      output: "john"
    },
    {
      input: "Marco",
      output: "john"
    },
    {
      input: "Johnny",
      output: "john"
    },
    {
      input: "Product Title",
      output: "Product Name"
    },
    {
      input: "Item Title",
      output: "Product Name"
    },
    {
      input: "Name of Product",
      output: "Product Name"
    },
    {
      input: "Product Description",
      output: "Product Description"
    },
    {
      input: "Item Description",
      output: "Product Description"
    },
    {
      input: "Description",
      output: "Product Description"
    },

  ];

  return trainingSet;

}


function trainNetwork(trainingSet) {

  var option = {
    iterations: 50000,
    error: .5,
    rate: .05
  };

  trainer.train(trainingSet, option);

  // teach the network two different patterns
  //hopfield.learn([
  //  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  //  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
  //]);

}


function buildDictionnary(trainingSet, binTrainingSet) {

  let dictionnary = {};

  for (item in trainingSet) {

    console.log('item : ' + JSON.stringify(trainingSet[item].input));
    dictionnary[binTrainingSet[item].input.join('')] = [trainingSet[item].input];

  }

  return dictionnary;
}


function readCSVHeader(filename) {

  let csvHeader = ['Name of product'];

  return csvHeader;

}

function crunchData(csvHeader) {

  let proposedMapping = [];

  console.log('DEBUG >>>> ' + csvHeader[0]);

  let input   = ascii2bin(csvHeader[0]);
  let output  = hopfield.feed(input);
  
  proposedMapping.push(output.join(''));

  return proposedMapping;

}

function main() {

  let cmdLineArgs = [];

  process.argv.forEach(function (val, index, array) {
    
    if (index > 1) {

      console.log(index + ': ' + val);
      cmdLineArgs.push(val);  
    }
    
  });

  let csvfile = './csvfile.csv';

  console.log("\n>> Read Training set...")
  let trainingSet = readTrainingSet();

  console.log("\n>> Convert to binary...");
  let binTrainingSet = convertToBin(trainingSet);

  console.log("\n>> Build Dictionnary...");
  let dictionnary = buildDictionnary(trainingSet, binTrainingSet);

  console.log("\n>> Training AI...");
  trainNetwork(binTrainingSet);
  console.log(">> Neo is done training !")

  console.log('\n>> Read CSV file header...');
  csvHeader = readCSVHeader(csvfile);

  console.log('DEBUG 2 >>>> ' + csvHeader[0])
  let data = csvHeader;

  if (cmdLineArgs.length > 0) {
    data = [cmdLineArgs[0]];
  }
  
  console.log('\n>> Crunching data...');
  let proposedMapping = crunchData(data);

  var key = proposedMapping[0];


  console.log('\n>> Mapping proposed by AI:');

  console.log('- Input attribute    : ' + data);  
  console.log('- Input Binary       : ' + ascii2bin(data[0]).join(''));
  console.log('- Output Binary      : ' + proposedMapping);

  if (key in dictionnary) {
    console.log('- Proposed Mapping   : ' + dictionnary[proposedMapping] + '\n');
  }
  else {
    console.log("\nNo proposal, sorry.  Neo still need to learn ;-)");
    console.log(key + "\n");
  }

}



main();



