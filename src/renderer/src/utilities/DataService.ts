import { DataObject } from "./types";

export function lastStressLevel( data: DataObject[] ): number {
  const lastObj= data.pop();
  if( lastObj ) {
    return Math.floor( +lastObj.Stress );
  }
  return 0;
}

export function transformTimestampToString( value: number| null ): string {
  if( value ) {
    const date= new Date( value );
    const hour= String( date.getHours()).padStart( 2, "0" );
    const minute= String( date.getMinutes()).padStart( 2, "0" );
    return `${ hour }:${ minute }`;
  }
  return "0";
}

export function getTimestampFromTodayMidnight( timestamp: number ): number {
  const date= new Date( timestamp ).toLocaleDateString();
  const dateArr= date.split( "." );
  const newDate= new Date( +dateArr[ 2 ], +dateArr[ 1 ]- 1, +dateArr[ 0 ]);
  newDate.setHours( 0, 0, 0, 0 );
  return newDate.getTime();
}

export function getTimestampWithoutSeconds( timestamp: number ): number {
  const date= new Date( timestamp ).toLocaleDateString();
  const dateArr= date.split( "." );
  const dateTime= new Date( timestamp ).toLocaleTimeString();
  const dateTimeArr= dateTime.split( ":" );
  const newDate= new Date( +dateArr[ 2 ], +dateArr[ 1 ]- 1, +dateArr[ 0 ]);
  newDate.setHours( +dateTimeArr[ 0 ]);
  return newDate.getTime();
}
