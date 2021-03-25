var memberNameArray = [];
var memberProfileArray = [];


// API Call for Legislators 
function apiStateCall(stateCodeInput){
  memberNameArray = []

    // need user input for two letter state code for first API call

        // first api call to retreive state legislators list
        $.ajax({
            url: `http://www.opensecrets.org/api/?method=getLegislators&id=${stateCodeInput}&output=json&apikey=20c6695ce98f31dce7ed360de7c4376d`,
            method: 'GET',
        })
        
        
    .then(function (unParsedCongressResponseObj){
        // store parsed JSON of state legislators object
        var congressResponseObj = JSON.parse(unParsedCongressResponseObj);

        // generate state legisators list 
        legislatorList(congressResponseObj);

        // call function to populate list on screen and wait for selection
        propagateRepList(memberNameArray)
    })    
}


function apiCidCall(cidUserInput, nameUserInput){

    // TEST CID NUMBER N00027500  // populate cid based on user selection of legislator from previous function

    // send second API call using user selected legislators CID number to gather financial networth data
    $.ajax({
        url: `http://www.opensecrets.org/api/?method=memPFDprofile&year=2016&cid=${cidUserInput}&output=xml&apikey=20c6695ce98f31dce7ed360de7c4376d`,
        method: 'GET',
    }).then(function(xml){
        // function to convert xml response data to jquery object
        var financeResponseObj = xmlToJson(xml);
        console.log(financeResponseObj)
        // send both response objects to function to compile data into a useable format
        compileData(financeResponseObj, nameUserInput);
        
        //console.log(financeResponseObj)
    })

}


// splits out the user selected state legislators into a list with name, cid, phone number
function legislatorList(congressResponseObj){
    // for loop that runs the length of the array of legislators in the response object
    for ( i = 0; i < congressResponseObj.response.legislator.length; i++ ){

        var legListName =   {
        
                                name: congressResponseObj.response.legislator[i]["@attributes"].firstlast,
                                cid: congressResponseObj.response.legislator[i]["@attributes"].cid,
                                phone: congressResponseObj.response.legislator[i]["@attributes"].phone

                            }   
        // push object into memberNameArray
        memberNameArray.push(legListName);

    }
}



// compiles response data from finance response object into name, cid, nethigh net low - congress response obj also passed into, incase we want other data 
function compileData(financeResponseObj, nameUserInput){

    //console.log(financeResponseObj, congressResponseObj);
    if (financeResponseObj.response.member_profile["@attributes"].net_high == "0" || financeResponseObj.response.member_profile["@attributes"].net_high == "" ) {
      $("#repStatus").empty()
      $("#repStatus").append($("<p>").text(`${nameUserInput} is not available for comparison.`))
      console.log()
      return
    }

    memberProfileObj =  {

                            name: nameUserInput,
                            cid: financeResponseObj.response.member_profile["@attributes"].member_id,
                            netHigh: financeResponseObj.response.member_profile["@attributes"].net_high,
                            netLow: financeResponseObj.response.member_profile["@attributes"].net_low,
                            stateName: chosenStateName, 
                            stateNetWorth: chosenStateNetWorth,
                        }
    
    memberProfileArray.push(memberProfileObj)
    $("#repStatus").empty()
    $("#repStatus").append($("<p>").text(`${nameUserInput} is available for comparison.`))
    pushToStorage(memberProfileObj)

}


/**
 * Changes XML to JSON
 * Modified version from here: http://davidwalsh.name/convert-xml-json
 * @param {string} xml XML DOM tree
 */
 function xmlToJson(xml) {
    // Create the return object
    var obj = {};
  
    if (xml.nodeType == 1) {
      // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      // text
      obj = xml.nodeValue;
    }
  
    // do children
    // If all text nodes inside, get concatenated text from them.
    var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
      return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
      obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
        return text + node.nodeValue;
      }, "");
    } else if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }

    return obj;
  };
  
  
  
//   Usage:
//   1. If you have an XML file URL:
//   const response = await fetch('file_url');
//   const xmlString = await response.text();
//   var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
//   xmlToJson(XmlNode);
//   2. If you have an XML as string:
//   var XmlNode = new DOMParser().parseFromString(yourXmlString, 'text/xml');
//   xmlToJson(XmlNode);
//   3. If you have the XML as a DOM Node:
//   xmlToJson(YourXmlNode)
