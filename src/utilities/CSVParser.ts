import { DataObject } from "../types";

export function CSVToArray(strData: string, strDelimiter: string= "," ): DataObject[] {

  const objPattern: RegExp= new RegExp(
    "(\\"+
      strDelimiter+
      "|\\r?\\n|\\r|^)"+
      '(?:"([^"]*(?:""[^"]*)*)"|'+
      '([^"\\'+
      strDelimiter+
      "\\r\\n]*))",
    "gi"
  );

  var arrData: any= [ [] ];
  var arrMatches= null;

  while(( arrMatches= objPattern.exec( strData ))) {

    const strMatchedDelimiter = arrMatches[1];
    let strMatchedValue: string;

    if( strMatchedDelimiter.length&& strMatchedDelimiter!== strDelimiter )
      arrData.push( [] );

    if( arrMatches[ 2 ])
      strMatchedValue= arrMatches[ 2 ].replace( new RegExp( '""', "g" ), '"' );
    else
      strMatchedValue= arrMatches[ 3 ];

    arrData[ arrData.length- 1 ].push( strMatchedValue );
  }

  if( arrData.length< 2 )
    return [];

  const headers= arrData[ 0 ];
  const rows= arrData.slice( 1 );

  return rows
    .filter(( row: string )=> row.length=== headers.length )
    .map(( row: string )=> {
      const obj: any= {};
      headers.forEach(( header: string, index: number ) => {
        const value: string= row[ index ];
        if ( value&& !isNaN( +value )&& value!== "" ) {
          obj[ header ]= parseFloat( value );
        } else {
          obj[ header ]= value|| "";
        }
      });
      return obj;
    });
}
