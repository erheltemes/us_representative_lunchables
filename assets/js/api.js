


apiCall();

// API Call for Legislators 
function apiCall(stateCodeInput){

    

    $.when(
        
        $.ajax({
            url: `http://www.opensecrets.org/api/?method=getLegislators&id=MN&output=json&apikey=20c6695ce98f31dce7ed360de7c4376d`,
            method: 'GET',
        })
        
        
    ).then(function (unParsedlegRespObj){
        
        var legRespObj = JSON.parse(unParsedlegRespObj);

        //console.log(legRespObj.response.legislator[0]["@attributes"].firstlast);
        
        $.ajax({
            url: `http://www.opensecrets.org/api/?method=memPFDprofile&year=2016&cid=N00027500&output=xml&apikey=20c6695ce98f31dce7ed360de7c4376d`,
            method: 'GET',
        }).then(function(xml){
            
            var financeObj = xmlToJson(xml);

            compileData(legRespObj, financeObj);
            
            //console.log(financeObj)
        })

       
    })    
}

function compileData(legRespObj, financeObj){

    

    console.log(financeObj);


    legislatorObj = {

       name: legRespObj.response.legislator[0]["@attributes"].firstlast


    }

    console.log(legislatorObj);



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

    //console.log(obj);
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
