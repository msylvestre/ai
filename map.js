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
  let binTrainingSetRead = [];

  for (var i = 0; i < trainingSet.length; i++) {
    binTrainingSet[i] = {
                          input: ascii2bin(trainingSet[i].input),
                          output: ascii2bin(trainingSet[i].output)
                        }

    binTrainingSetRead[i] = {
                          input: ascii2bin(trainingSet[i].input).join(''),
                          output: ascii2bin(trainingSet[i].output).join('')
                         }
  }


  //console.log(binTrainingSetRead);

  return binTrainingSet;
}



/////////////////////////////////////////////
// Trainer
/////////////////////////////////////////////

function buildTrainingSet() {

  let trainingSet = [];

  let templateTest = {
    "widgets":{
      "sku":{
        "type":"concat",
        "params":{
          "data":{
            "type":"concat",
            "value":[
              {
                "type":"column",
                "value":"sku"
              }
            ]
          }
        }
      },
      "title":{
        "type":"concat",
        "params":{
          "data":{
            "type":"concat",
            "value":[
              {
                "type":"column",
                "value":"name"
              }
            ]
          }
        }
      }
    }
  };

  let template = {
    "widgets":{"sku":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"sku"}]}}},"title":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"title"}]}}},"product_type":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"type"}]}}},"body_html":{"type":"concat","params":{"data":{"type":"concat","value":["<P>",{"type":"column","value":"marketing description"},"</P>","\n","<P>"," ","</P>"]}}},"handle":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"option1_name":{"type":"concat","params":{"data":{"type":"concat","value":["Dimensions"]}}},"option1_value":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"product dimensions (inch)"}]}}},"option2_name":{"type":"concat","params":{"data":{"type":"concat","value":["Color"]}}},"option2_value":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"finish"}]}}},"option3_name":{"type":"concat","params":{"data":{"type":"concat","value":["Material"]}}},"option3_value":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"material"}]}}},"tags":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_1":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"main images"}]}}},"alt_image_1":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_2":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"images 1"}]}}},"alt_image_2":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_3":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"images 3"}]}}},"alt_image_3":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_4":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"images 4"}]}}},"alt_image_4":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_5":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"images 5"}]}}},"alt_image_5":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_6":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_6":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_7":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_7":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_8":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_8":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_9":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_9":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_10":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_10":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_11":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_11":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_12":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_12":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_13":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_13":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_14":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_14":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_15":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_15":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_16":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_16":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_17":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_17":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_18":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_18":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_19":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_19":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_20":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_20":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_21":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_21":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_22":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_22":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_23":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_23":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_24":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_24":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_25":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_25":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_26":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_26":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_27":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_27":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_28":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_28":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_29":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_29":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"image_30":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"alt_image_30":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"price":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"wholesale"}]}}},"compare_at_price":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"taxable":{"type":"concat","params":{"data":{"type":"concat","value":["true"]}}},"vendor":{"type":"concat","params":{"data":{"type":"concat","value":["Bromi Design"]}}},"position":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"published_scope":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"template_suffix":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"weight":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"lb."}]}}},"weight_unit":{"type":"concat","params":{"data":{"type":"concat","value":["lb"]}}},"grams":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"inventory_management":{"type":"concat","params":{"data":{"type":"concat","value":["shopify"]}}},"inventory_quantity":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"inventory"}]}}},"inventory_policy":{"type":"concat","params":{"data":{"type":"concat","value":["continue"]}}},"requires_shipping":{"type":"concat","params":{"data":{"type":"concat","value":["true"]}}},"metafields_global_title_tag":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"metafields_global_description_tag":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"fulfillment_service":{"type":"concat","params":{"data":{"type":"concat","value":[]}}},"barcode":{"type":"concat","params":{"data":{"type":"concat","value":[{"type":"column","value":"upc"}]}}}},"columns":{"sku":{"name":"sku","type":"text","limit":null,"tooltip":"","required":false,"unique":false,"html":false,"value":"sku"},"title":{"name":"title","type":"text","limit":null,"tooltip":null,"required":true,"unique":false,"html":false,"value":"title"},"product_type":{"name":"product_type","type":"text","limit":null,"tooltip":"categorization commonly used for filtering and searching.","required":true,"unique":false,"html":false,"value":"product_type"},"body_html":{"name":"body_html","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":true,"value":"body_html"},"handle":{"name":"handle","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"handle"},"option1_name":{"name":"option1_name","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"option1_name"},"option1_value":{"name":"option1_value","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"option1_value"},"option2_name":{"name":"option2_name","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"option2_name"},"option2_value":{"name":"option2_value","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"option2_value"},"option3_name":{"name":"option3_name","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"option3_name"},"option3_value":{"name":"option3_value","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"option3_value"},"tags":{"name":"tags","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"tags"},"image_1":{"name":"image_1","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_1"},"alt_image_1":{"name":"alt_image_1","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_1"},"image_2":{"name":"image_2","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_2"},"alt_image_2":{"name":"alt_image_2","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_2"},"image_3":{"name":"image_3","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_3"},"alt_image_3":{"name":"alt_image_3","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_3"},"image_4":{"name":"image_4","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_4"},"alt_image_4":{"name":"alt_image_4","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_4"},"image_5":{"name":"image_5","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_5"},"alt_image_5":{"name":"alt_image_5","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_5"},"image_6":{"name":"image_6","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_6"},"alt_image_6":{"name":"alt_image_6","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_6"},"image_7":{"name":"image_7","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_7"},"alt_image_7":{"name":"alt_image_7","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_7"},"image_8":{"name":"image_8","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_8"},"alt_image_8":{"name":"alt_image_8","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_8"},"image_9":{"name":"image_9","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_9"},"alt_image_9":{"name":"alt_image_9","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_9"},"image_10":{"name":"image_10","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_10"},"alt_image_10":{"name":"alt_image_10","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_10"},"image_11":{"name":"image_11","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_11"},"alt_image_11":{"name":"alt_image_11","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_11"},"image_12":{"name":"image_12","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_12"},"alt_image_12":{"name":"alt_image_12","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_12"},"image_13":{"name":"image_13","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_13"},"alt_image_13":{"name":"alt_image_13","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_13"},"image_14":{"name":"image_14","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_14"},"alt_image_14":{"name":"alt_image_14","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_14"},"image_15":{"name":"image_15","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_15"},"alt_image_15":{"name":"alt_image_15","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_15"},"image_16":{"name":"image_16","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_16"},"alt_image_16":{"name":"alt_image_16","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_16"},"image_17":{"name":"image_17","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_17"},"alt_image_17":{"name":"alt_image_17","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_17"},"image_18":{"name":"image_18","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_18"},"alt_image_18":{"name":"alt_image_18","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_18"},"image_19":{"name":"image_19","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_19"},"alt_image_19":{"name":"alt_image_19","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_19"},"image_20":{"name":"image_20","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_20"},"alt_image_20":{"name":"alt_image_20","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_20"},"image_21":{"name":"image_21","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_21"},"alt_image_21":{"name":"alt_image_21","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_21"},"image_22":{"name":"image_22","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_22"},"alt_image_22":{"name":"alt_image_22","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_22"},"image_23":{"name":"image_23","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_23"},"alt_image_23":{"name":"alt_image_23","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_23"},"image_24":{"name":"image_24","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_24"},"alt_image_24":{"name":"alt_image_24","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_24"},"image_25":{"name":"image_25","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_25"},"alt_image_25":{"name":"alt_image_25","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_25"},"image_26":{"name":"image_26","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_26"},"alt_image_26":{"name":"alt_image_26","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_26"},"image_27":{"name":"image_27","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_27"},"alt_image_27":{"name":"alt_image_27","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_27"},"image_28":{"name":"image_28","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_28"},"alt_image_28":{"name":"alt_image_28","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_28"},"image_29":{"name":"image_29","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_29"},"alt_image_29":{"name":"alt_image_29","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_29"},"image_30":{"name":"image_30","type":"imagesURL","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"image_30"},"alt_image_30":{"name":"alt_image_30","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"alt_image_30"},"price":{"name":"price","type":"price","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"casing":null,"date_format":null,"value":"price"},"compare_at_price":{"name":"compare_at_price","type":"price","limit":null,"tooltip":"","required":false,"unique":false,"html":false,"casing":null,"date_format":null,"value":"compare_at_price"},"taxable":{"name":"taxable","type":"text","limit":null,"tooltip":"true or false","required":false,"unique":false,"html":false,"value":"taxable"},"vendor":{"name":"vendor","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"vendor"},"position":{"name":"position","type":"integer","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"position"},"published_scope":{"name":"published_scope","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"published_scope"},"template_suffix":{"name":"template_suffix","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"template_suffix"},"weight":{"name":"weight","type":"float","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"weight"},"weight_unit":{"name":"weight_unit","type":"text","limit":null,"tooltip":"the weight_unit can be either \"g\", \"kg, \"oz\", or \"lb\".","required":false,"unique":false,"html":false,"value":"weight_unit"},"grams":{"name":"grams","type":"float","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"grams"},"inventory_management":{"name":"inventory_management","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"inventory_management"},"inventory_quantity":{"name":"inventory_quantity","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"inventory_quantity"},"inventory_policy":{"name":"inventory_policy","type":"text","limit":null,"tooltip":"continue or deny","required":false,"unique":false,"html":false,"value":"inventory_policy"},"requires_shipping":{"name":"requires_shipping","type":"text","limit":null,"tooltip":"true or false","required":false,"unique":false,"html":false,"value":"requires_shipping"},"metafields_global_title_tag":{"name":"metafields_global_title_tag","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"metafields_global_title_tag"},"metafields_global_description_tag":{"name":"metafields_global_description_tag","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"metafields_global_description_tag"},"fulfillment_service":{"name":"fulfillment_service","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"fulfillment_service"},"barcode":{"name":"barcode","type":"text","limit":null,"tooltip":null,"required":false,"unique":false,"html":false,"value":"barcode"}},"transformImages":true
  };

  // Loop in all the template field
  for (var key in template.widgets) {

    let templateField;
    let mappedField;

    templateField = key;


    // Check at first if the template field has been mapped
    if (typeof template.widgets[key].params.data.value[0] == 'undefined') {
      mappedField = 'null';
    }
    else {

      // Depending if the mapping is a field or a manual entry, the structure is different a bit.
      if (template.widgets[key].params.data.value[0].value == null) {


        if (typeof template.widgets[key].params.data.value[1] == 'undefined') {
          // This field is mapped with manual entry
          mappedField = template.widgets[key].params.data.value[0];
        }
        else {
          // This one handle "body_html" which seem to be on the 2 value of the array.  1st value is '<p>'
          mappedField = template.widgets[key].params.data.value[1].value;
        }
        
      }
      else {
        // This field is mapped with a field
        mappedField = template.widgets[key].params.data.value[0].value;
      }
    }

    // Save / Print only the mapped field
    if (mappedField !== 'null') {
      //console.log('templateField : ' + templateField + '\t\t --> ' + mappedField);  
      trainingSet.push({input: mappedField, output: templateField});
    }
  }

  return trainingSet;

}

function readTrainingSet() {

  let trainingSet = [
    {
      input: "john",
      output: "john"
    },
    {
      input: "Marco",
      output: "marco"
    },
    {
      input: "Johnny",
      output: "john"
    },
    {
      input: "marc",
      output: "marco"
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
    iterations: 100000,
    error: .04,  // Seems to reduce the error result when you compare to trainer.test.  At .03 it seems the for taks too long and should use async
    rate: .1
  };

  trainer.train(trainingSet, option);

  console.log(trainer.test(trainingSet, option));

  // teach the network two different patterns
  //hopfield.learn([
  //  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  //  [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
  //]);

}


function buildDictionnary(trainingSet, binTrainingSet) {

  //console.log('trainingSet');
  //console.log(trainingSet);

  let dictionnary = {};

  for (item in trainingSet) {

    //console.log('item : ' + JSON.stringify(trainingSet[item].input));
    dictionnary[binTrainingSet[item].output.join('')] = [trainingSet[item].output];

  }

  return dictionnary;
}


function readCSVHeader(filename) {

  let csvHeader = ['Name of product'];

  return csvHeader;

}

function crunchData(csvHeader) {

  let proposedMapping = [];

  console.log('in  =======>>>> ' + csvHeader[0]);
  let input   = ascii2bin(csvHeader[0]);
  let output  = hopfield.feed(input);
  
  console.log('out =======>>>> ' + output.join(''));

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
  //let trainingSet = readTrainingSet();
  let trainingSet = buildTrainingSet();
  //console.log(trainingSet);

  console.log("\n>> Convert to binary...");
  let binTrainingSet = convertToBin(trainingSet);

  console.log("\n>> Build Dictionnary...");
  let dictionnary = buildDictionnary(trainingSet, binTrainingSet);
  //console.log(dictionnary);

  console.log("\n>> Training AI...");
  trainNetwork(binTrainingSet);
  console.log(">> Neo is done training !")

  console.log('\n>> Read CSV file header...');
  csvHeader = readCSVHeader(csvfile);

  console.log('\n>> Process command line arguments...')
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


function main2() {

  async = require('async');


  async.auto({
    
    foo: function (next) { next(null, 'foo'); },
    

    bar: function (next) { next(null, 'man'); },
    

    buildMyTrainingSet: function (cb) {

      console.log("\n>> Build Training set...")
      //let trainingSet = readTrainingSet();
      let trainingSet = buildTrainingSet();
      
      cb(null, trainingSet);      
    },

    convert2Bin: ['buildMyTrainingSet', function (result, cb) {

      console.log("\n>> Convert to binary...");
      //console.log(result);
      let trainingSet = result.buildMyTrainingSet;
      let binTrainingSet = convertToBin(result.buildMyTrainingSet);

      let response = {
        trainingSet: trainingSet,
        binTrainingSet: binTrainingSet
      };

      cb(null, response);

    }],

    buildMyDictionnary: ['convert2Bin', function (result, cb) {

      console.log("\n>> Build Dictionnary...");
      let dictionnary = buildDictionnary(result.convert2Bin.trainingSet, result.convert2Bin.binTrainingSet);

      let response = {
        binTrainingSet: result.convert2Bin.binTrainingSet,
        dictionnary: dictionnary
      }

      cb(null, response);

    }],

    trainNeo: ['buildMyDictionnary', function (result, cb) {

      //console.log(result);

      console.log("\n>> Training AI...");
      trainNetwork(result.buildMyDictionnary.binTrainingSet);
      console.log(">> Neo is done training !")

      cb(null, "SUCCESS");

    }],

    readCSVHeader: ['trainNeo', function(result, cb) {
      
      let csvfile = './csvfile.csv';

      console.log('\n>> Read CSV file header...');
      csvHeader = readCSVHeader(csvfile);

      cb(null, csvHeader);

    }],

    crunchData: ['readCSVHeader', function (result, cb) {

      console.log('\n>> Crunching data...');

      console.log(result.readCSVHeader);

      let proposedMapping = crunchData(result.readCSVHeader);

      var key = proposedMapping[0];

      cb(null, key);

    }]
/*
    run: ['buildMyTrainingSet', function(result, next) {
      next(null, result.buildMyTrainingSet);
    }],

    wat: ['foo', 'bar', function (result, cb) {
      //console.log(result);
      cb(null, result.foo + result.bar);
    }]
*/
  }, (err, results)=> {

    if (err) {
      console.log('ERROR : ' + err);
    }

    //const { tx, details } = results.wat;
    let test = results.buildMyDictionnary.dictionnary;
    console.log(test);

    //const loadedTrainingSet = results.run;
    //console.log(loadedTrainingSet.buildMyTrainingSet);

  });


}



main2();

//let trainingSet = buildTrainingSet();

//console.log('\n===================== TRAINING SET =========================\n');
//console.log(JSON.stringify(trainingSet, null, 2));

