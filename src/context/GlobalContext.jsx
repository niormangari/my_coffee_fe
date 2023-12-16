import { createContext, useReducer } from "react";
// import Login from "../pages/Login";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalContext.Provider value={[state, dispatch]}>{props.children}</GlobalContext.Provider>;
};

let isLogin = false;
if (localStorage.getItem("token") !== null) {
  isLogin = localStorage.getItem("token");
} else {
  isLogin = false;
}

const initialState = {
  isLogin: isLogin,
  dataUser: [],
  dataCarts: [],
  dataDetails: [],
};

const reducer = (state, action) => {
  if (action.type === "PROCESS_LOGIN") {
    return {
      ...state,
      isLogin: true,
      dataUser: action.data,
    };
  } else if (action.type === "PROCESS_LOGOUT") {
    return {
      ...state,
      islogin,
    };
  } else if (action.type === "PROCCESS_GET_DATA_CART") {
    return {
      ...state,
      dataCarts: action.data,
    };
  } else if (action.type === "DATA_DETAILS") {
    return {
      ...state,
      dataDetails: action.payload,
    };
  } else if (action.type === "ADD_PRODUCT_TO_CART") {
    const checkProductAlReadyExist = state.dataCarts.filter((item) => item.id === action.payload.id);
    if (checkProductAlReadyExist.length > 0) {
      return {
        ...state,
        dataCarts: state.dataCarts.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        ),
      };
    }
    return {
      ...state,
      dataCarts: [
        ...state.dataCarts,
        {
          ...action.payload,
          qty: 1,
        },
      ],
    };
  }
};

// else if (action.type === "REDUCE_PRODUCT") {
//   const AlreadyExist = data.dataCarts.find((item) => item.id === action.pilot.id);
//   if (AlreadyExist.qty > 1) {
//     return {
//       ...data,
//       dataCarts: data.dataCarts.map((item) =>
//         item.id === action.pilot.id
//           ? {
//               ...item,
//               qty: item.qty - 1,
//             }
//           : item
//       ),
//     };
//   }
//   return {
//     ...data,
//     dataCarts: data.dataCarts.filter((item) => item.id !== action.pilot.id),
//   };
// } else if (action.type === "DELETE_PRODUCT") {
//   return {
//     ...data,
//     dataCarts: data.dataCarts.filter((item) => item.id !== action.pilot.id),
//   };
// }
