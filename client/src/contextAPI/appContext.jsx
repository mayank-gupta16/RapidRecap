import { createContext, useReducer } from "react";
import { Reducer } from "../reducer/useReducer";
import axios from "axios";

async function showState() {
  try {
    const response = await axios.get(`/api/user/loginCheck`);
    console.log(response.data);
    if (response.status === 201) {
      return false;
    } else return true;
  } catch (error) {
    console.log(error.message);
    return true;
  }
}

const initialState = {
  // Define your initial state properties here
  show: await showState(),
  modal: false,
  news: {},
  forgotPassword: false,
  verifyEmail: false,
  user: {},
  // ...
};
// async function init() {
//   initialState.show = ;
// }
// init();
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
