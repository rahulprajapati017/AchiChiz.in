import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const [usertoken,setusertoken]=useState(localStorage.getItem("token"))
  const [userdata,setuserdata]=useState()
    const settoken=(token)=>{
      setusertoken(token)
        localStorage.setItem("token",token)
    }
  
    const logoutuser=()=>{
      setusertoken("")
      return localStorage.removeItem("token")

    }
    const isloggedin= !! usertoken;

    const userauthentication=async ()=>{
      try {
        const response=await fetch("https://boleshop-project-mern.onrender.com/api/user",{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${usertoken}`
          }
        })
        if(response.ok){
          const mydata=await response.json()
          const {userdata}=mydata
          setuser(userdata)
         
          

        }
        
      } catch (error) {
        console.log(error)
      navigate("/errorpage")
        
      }
    }

  useEffect(()=>{
userauthentication()
  },[usertoken])
  
  const login = (name = "John Doe") => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
