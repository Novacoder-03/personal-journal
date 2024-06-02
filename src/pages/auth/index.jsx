import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate ,Navigate} from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css";
export const Auth = ()=>{
    const navigate  = useNavigate();
    // const {isAuth} =useGetUserInfo();

    const signInWithGoogle = async() =>{
        const results = await signInWithPopup(auth,provider);
        // console.log(results);
        const authInfo ={
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth:true,
        };
        localStorage.setItem("auth",JSON.stringify(authInfo));
        navigate("/journal");
    };
    
    // if(isAuth){
    //     return <navigate to="/journal"/>
    // }


    return(
        <div className="login-page">
           <p>Sign In With Google to Continue</p>
           <button className="login-with-google-btn" onClick={signInWithGoogle}>
            {" "}
            Sign In With Google
           </button>
        </div>
    ) ;
}