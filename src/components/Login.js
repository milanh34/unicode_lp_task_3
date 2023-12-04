import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from './Axios';

const Login = (props) => {

  const [loggedin, setLoggedin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [mail, setMail] = useState("");
  const [validMail, setValidMail] = useState(false);
    
  const [pass, setPass] = useState("");
  const [validPass, setValidPass] = useState(false);

  let changeMail = (event) => {
    setMail(event.target.value);
  }

  let changePass = (event) => {
      setPass(event.target.value);
  }
    
  const LOGURL = '/user/userLogin';

  let regexmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;  
  let regexpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}/;
    
  useEffect(() => {
    setValidMail(regexmail.test(mail));
  }, [mail])

  useEffect(() => {
    setValidPass(regexpass.test(pass));
  }, [pass])

    let checkAuth = async (event) => {
        event.preventDefault();
        if(validMail && validPass){
          setErrMsg("");
          setLoading(true);
          try{
            let res = await axios.post(LOGURL,
              {email: mail, password: pass},
              {headers: {'Content-Type': 'application/json'}});
              console.log(res.data);
              props.onSubmit(res.data);
                setTimeout(() => {
                    setLoggedin(true);
                }, 500);
          } catch (error) {
            if(error.response.data.error.includes("Invalid credentials")){
              setErrMsg("Wrong Password");
            } else if(error.response.data.error.includes("User not found")){
              setErrMsg("User not found");
            } else {
              setErrMsg("Login Error");
            }
          } finally{
            setLoading(false);
          }
            console.log("good");
            console.log("good");
        }else{
          setErrMsg("Login Unsuccessful!")
        }
    }   

    document.title = "Login Page";

    return(
      <>
       {
        loggedin ? (
          <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 text-center">
                    <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight md:text-2xl text-green-400">Login Successful !
            </h1>
            <Link to="/home" className="font-medium hover:underline text-blue-500">Go to Home Page</Link>
            </div></div></div>
          </section>
        ) : (
        <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
                        <h1 id="heading" className="text-xl font-bold leading-tight text-center tracking-tight md:text-2xl text-white">Login Page</h1>
                        <p className="text-yellow-300">{loading && <span>Logging in...</span>}</p>
                        <p className="text-red-400">{errMsg}</p>
                        <form className="space-y-4 md:space-y-6" onSubmit={checkAuth}>
                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-white">Email</label>
                                </div>
                                <input onChange={changeMail} type="email" id="email" className="border sm:text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" autoFocus required />
                                <p className="text-sm inline-block text-red-400"><span className={mail && !validMail ? "info" : "offscr"}>Incorrect Email Format</span></p>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-white">Password</label>
                                </div>
                                <input onChange={changePass} type="password" id="password" className="border sm:text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" required />
                                <p className="text-sm inline-block text-red-400"><span className={pass && !validPass ? "info" : "offscr"}>Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</span></p>
                            </div>
                            <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Login</button>
                            <p className="text-sm font-light text-gray-400">Don’t have an account yet? <Link to="/signup" className="font-medium hover:underline text-blue-500">Sign Up here</Link></p>
                        </form>
                    </div>
                </div>  
            </div>
        </section>
        )}
        </>
    );
}

export default Login;