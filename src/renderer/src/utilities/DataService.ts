import { DataObject } from "./types";

export function lastStressLevel( data: DataObject[] ): number {
  const lastObj= data.pop();
  if( lastObj )
    return Math.floor( +lastObj.Stress );
  return 0;
}
