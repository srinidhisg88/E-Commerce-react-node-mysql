// // import logo from "./logo.svg";
// import "./LoginRegisterContainer.scss";
// import Login from "../Login/Login"
// import logo from "../../E-Cart.png"
// import Register from "../Register/Register";
// import { useState } from "react";

// function LoginRegisterContainer(props) {
//     const [isRegisterUser, setRegisteredUser] = useState(true)
//     const navigateToLoginPage = () => {
//         setRegisteredUser(true);
//     };

//     const navigateToRegisterPage = () => {
//         setRegisteredUser(false);
//     };
//     return (
//         <div className="login-Register-container">
//             <div className="form-container">
//                 <div className="logo">
//                     <img src={logo} alt="Logo" />
//                 </div>
//                 {isRegisterUser ? (
//                     <Login navigateToRegisterPage={navigateToRegisterPage} setUserAuthenticatedStatus={props.setUserAuthenticatedStatus} />
//                 ) : (
//                     <Register navigateToLoginPage={navigateToLoginPage} />
//                 )}
//             </div>
//         </div>
//     );
// }

// export default LoginRegisterContainer;
// LoginRegisterContainer.jsx
import "./LoginRegisterContainer.scss";
import Login from "../Login/Login";
import logo from "../../E-Cart.png";
import Register from "../Register/Register";
import { useState } from "react";

function LoginRegisterContainer(props) {
    const [isRegisterUser, setRegisteredUser] = useState(true);
    const navigateToLoginPage = () => {
        setRegisteredUser(true);
    };

    const navigateToRegisterPage = () => {
        setRegisteredUser(false);
    };

    return (
        <div className="login-Register-container">
            <div className="form-container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <h2>{isRegisterUser ? "Welcome Back! Please Log In" : "Join Us! Please Register"}</h2>
                <p className="instruction-text">
                    {isRegisterUser 
                        ? "Enter your details below to access your account." 
                        : "Fill in the details to create a new account."}
                </p>
                {isRegisterUser ? (
                    <Login navigateToRegisterPage={navigateToRegisterPage} setUserAuthenticatedStatus={props.setUserAuthenticatedStatus} />
                ) : (
                    <Register navigateToLoginPage={navigateToLoginPage} />
                )}
                <div className="switch-link">
                    <span onClick={isRegisterUser ? navigateToRegisterPage : navigateToLoginPage}>
                        {isRegisterUser ? "New to us? Register now!" : "Already have an account? Log in!"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterContainer;
