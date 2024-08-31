import { createContext, useState } from "react";
import { PropTypes } from "prop-types";

// the UserContext
export const UserContext = createContext();

// the UserProvider component
export function UserProvider({ children }) {
  const [name, setName] = useState("");

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

// Prop Types
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};