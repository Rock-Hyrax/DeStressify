import { createContext, useContext, useEffect, useState } from "react";
import { CSVToArray } from "./CSVParser";
import { DataObject } from "./types";

const DataContext= createContext<DataObject[]>( [] );

export function DataContextProvider({ children }: any) {

  const [ data, setData ]= useState<DataObject[]>( [] );

  useEffect( ()=> {
    async function fetchData() {
      try {
        const res= await fetch( "../assets/out.csv" );
        const textData= await res.text();
        const parsedData: DataObject[]= CSVToArray( textData );
        setData( parsedData );
      } catch( e ) {
        console.error(" Error fetching CSV data:", e );
      }
    }
    fetchData();
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
