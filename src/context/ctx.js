import {createContext, useState} from "react"

const Data = createContext(undefined)
const DataDispatch = createContext(undefined)

const DataProvider = ({children}) => {
  const [data, setData] = useState({selected: -1, data: [], name: "", status: false})

  return (
    <Data.Provider value={data}>
      <DataDispatch.Provider value ={setData}>
        {children}
      </DataDispatch.Provider>
    </Data.Provider>
  )
}

export {Data, DataDispatch, DataProvider}