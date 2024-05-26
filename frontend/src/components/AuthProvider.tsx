// import { useContext, createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext()

// export const AuthProvider = () => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(
//         localStorage.getItem("token") || ""
//     )
//     const navigate = useNavigate();

//     const[role, setRole] = useState("")
// const loginAction =async(data)=>{
//     try{

//         const response=await axios.post("",{...data})
//         if(response.data)
//             {
//                 setUser(data.username)
//                 setToken(response.data.token)
//                 localStorage.setItem("token",response.data.token)
//                 navigate(response.data.role==="admin"?'/admindashboard':'/customerdashboard')
//                 return;
//             }
//             throw new Error(response.message)

//     }
//     catch(error)
//     {
//         console.error(error);
//     }
//     const Logout=()=>{
//         setUser(null)
//         setToken("")
//         localStorage.removeItem("token")
//         navigate('/login')
//     }
// }

// return(
//     <AuthContext.Provider value={{user,token,role,loginAction,logout}}>
//         {children}
//     </AuthContext.Provider>
// )




// {/* export const useAuth =() => {
//     return useContext(AuthContext);
// } */}
