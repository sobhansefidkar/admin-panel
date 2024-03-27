import React, { useContext, useState } from "react";


const AppContext = React.createContext()


const AppProvider = ({ children }) => {

    const [openSidebar , setOpenSidebar] = useState(false)
    const [searchUser , setSearchUser] = useState("")
    const [searchProduct , setSearchProduct] = useState("")
    const [filtering , setFiltering] = useState("all")
    const [filterOrders , setFilterOrders] = useState("qlastDay")
    const [total , setTotal] = useState(0)


    return <AppContext.Provider value={{
        //SIDEBAR
        openSidebar,
        setOpenSidebar,
        //SEARCHUSER
        searchUser,
        setSearchUser,
        //SEARCHPRODUCT
        searchProduct,
        setSearchProduct,
        //FILTERING
        filtering,
        setFiltering,
        //ORDERFILTERING
        filterOrders,
        setFilterOrders,
        //TOTALPRICE
        total,
        setTotal,
    }}>{children}</AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }