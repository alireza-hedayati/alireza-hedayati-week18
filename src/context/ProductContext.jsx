import { useContext, createContext, useReducer, useMemo } from "react";

const initialState = {
  searchValue: "",
};
const ProductContext = createContext(null);

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchValue: action.payload };
    default:
      return state;
  }
};

function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  //dispatch custom hooks
  const setSearchValue = (value) => {
    dispatch({ type: "SET_SEARCH", payload: value });
  };

  return (
    <ProductContext.Provider value={{ state, setSearchValue }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  return useContext(ProductContext);
};

export default ProductProvider;
