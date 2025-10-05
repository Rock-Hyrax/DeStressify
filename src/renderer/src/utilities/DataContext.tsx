import { createContext, useContext, useEffect, useState } from "react";
import { DataObject } from "./types";
import jsonData from "../../../../resources/data.json";

const DataContext= createContext<DataObject[]>( [] );

export function DataContextProvider({ children }: any) {

  const [ data, setData ]= useState<any>( [] );

  useEffect( ()=> {
    window.api.getRange( Date.now()- 3600* 1000, Date.now() );
    window.api.onReport( value=> {
      console.log( value );
      setData( value );
    });
  }, []);

  return (
    <DataContext.Provider value={ data }>
      { children }
    </DataContext.Provider>
  );
}

export function useAPI() {

  const context= useContext( DataContext );
  if( context=== undefined )
    throw new Error( "Context must be used within a Provider" );
  return context;
}
