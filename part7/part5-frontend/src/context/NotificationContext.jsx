import { useReducer, createContext, useContext } from "react";

const NotificationContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "display":
      return {
        type: action.payload.type,
        message: action.payload.message,
      };
    case "hide":
      return { type: "", message: null };
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, {
    type: "",
    message: null,
  });

  const showNotification = (type, message, time = 4000) => {
    dispatch({
      type: "display",
      payload: { type, message },
    });

    setTimeout(() => {
      dispatch({ type: "hide" });
    }, time);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
