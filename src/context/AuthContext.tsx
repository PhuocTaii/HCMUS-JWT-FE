import axios, { AxiosError } from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

interface User {
    id: String;
    username: String;
    email: String
}

interface AuthContextType {
    user: User | null;
    login: (email: String, password: String) => Promise<void>;
    logout: () => void;
    isAuthenticated: Boolean;
}

interface ErrorResponse {
  message: String;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(() => {
    const token = window.localStorage.getItem('access_token');
    if (token) {
      // Fetch user profile if token exists
      axios.get('/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setUser(response.data);
      }).catch(error => {
        console.error("Failed to fetch user profile", error);
      });
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!window.localStorage.getItem('access_token'));


  // const navigate = useNavigate();


  const login = async (email: String, password: String) => {
    try{
      const response = await axios.post(`/auth/login`, {
          email: email,
          password: password
      });
      // reset();
      window.localStorage.setItem('access_token', response.data.access_token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      // navigate("/");
    } catch (error) {
        const err = error as AxiosError<ErrorResponse>

        const errMessage =  err.response?.data.message || err.message || "An unexpected error occurred";

        alert(errMessage);
    }
  }

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  }

  // const profile = async () => {
  //   const token = window.localStorage.getItem('access_token');
  //   try {
  //       const response = await axios.get('/user/profile', {
  //           headers: {
  //               Authorization: `Bearer ${token}`
  //           }
  //       });
  //       setUser(response.data);
  //   } catch (error) {
  //     const err = error as AxiosError<ErrorResponse>

  //     const errMessage =  err.response?.data.message || err.message || "An unexpected error occurred";

  //     alert(errMessage);    
  //   }
  // }

  // return (
  //     <AuthContext.Provider value={{ user, login, logout, profile }}>
  //       {children}
  //     </AuthContext.Provider>
  // );
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
);
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}