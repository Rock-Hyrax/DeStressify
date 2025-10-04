export function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ",";

  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  var arrData = [[]];

  var arrMatches = null;

  while ((arrMatches = objPattern.exec(strData))) {
    var strMatchedDelimiter = arrMatches[1];

    if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
      arrData.push([]);
    }

    if (arrMatches[2]) {
      var strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      var strMatchedValue = arrMatches[3];
    }

    arrData[arrData.length - 1].push(strMatchedValue);
  }

  if (arrData.length < 2) return [];
  
  const headers = arrData[0];
  const rows = arrData.slice(1);
  
  return rows
    .filter(row => row.length === headers.length) // Filter out incomplete rows
    .map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        const value = row[index];
        // Convert numeric values
        if (value && !isNaN(value) && value !== '') {
          obj[header] = parseFloat(value);
        } else {
          obj[header] = value || '';
        }
      });
      return obj;
    });
}