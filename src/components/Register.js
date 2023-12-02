import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from './Axios';    

const Register = () => {
    const [registered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    
    const [userName, setUserName] = useState("");
    const [validUserName, setValidUserName] = useState(false);
    
    const [mail, setMail] = useState("");
    const [validMail, setValidMail] = useState(false);
    
    const [pass, setPass] = useState("");
    const [validPass, setValidPass] = useState(false);
    
    const [confirmPass, setConfirmPass] = useState("");
    const [validConfirmPass, setValidConfirmPass] = useState(false);
    
    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);

    let changeUserName = (event) => {
        setUserName(event.target.value);
    }
    let changeMail = (event) => {
        setMail(event.target.value);
    }
    let changePass = (event) => {
        setPass(event.target.value);
    }
    let changeConfirmPass = (event) => {
        setConfirmPass(event.target.value);
    }
    let changePhone = (event) => {
        setPhone(event.target.value);
    }
    
    const REGURL = '/user/newUser';

    let regexusername = /^[A-Za-z][A-Za-z0-9-_]{4,23}$/;
    let regexmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let regexpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let regexphone = /^\d{10}$/;

   useEffect(() => {
      setValidUserName(regexusername.test(userName));
    }, [userName])
    
    useEffect(() => {
      setValidMail(regexmail.test(mail));
    }, [mail])
    
    useEffect(() => {
      setValidPass(regexpass.test(pass));
      setValidConfirmPass(pass === confirmPass);
    }, [pass, confirmPass])
    
    useEffect(() => {
      setValidPhone(regexphone.test(phone));
    }, [phone])

    let checkRegister = async (event) => {
        event.preventDefault();
        if(validUserName && validMail && validPass && validConfirmPass && validPhone){
            setErrMsg("")
            setLoading(true);
            try{
                let res = await axios.post(REGURL, 
                    {username: userName, email: mail, password: pass, mobile: phone},
                    {headers: { 'Content-Type': 'application/json'}})
                console.log(res.data);
                setTimeout(() => {
                    setRegistered(true);
                }, 500);
            } catch(error) {
                if(error.response.data.message.includes("duplicate")){
                    setErrMsg("User already exists");
                } else {
                    setErrMsg("Registration Error");
                }
            } finally {
                setLoading(false);
            }
        } else {
            setErrMsg("Registration Failed!");
        }
    }


    document.title = "Sign Up Page";
    return(
        <>
       {
        registered ? (
            <section className="bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 text-center">
                        <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
                            <h1 className="text-xl font-bold leading-tight text-center tracking-tight md:text-2xl text-green-400">Sign Up Successful !</h1>
                            <Link to="/login" className="font-medium hover:underline text-blue-500">Login here</Link>
                        </div>
                    </div>
                </div>
            </section>
        ) : (
        <section className="bg-gray-900">
            <div id="registerForm" className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
                        <h1 id="heading" className="text-xl font-bold leading-tight text-center tracking-tight md:text-2xl text-white">Sign Up Now</h1>
                        <p className="text-yellow-300">{loading && <span>Registering...</span>}</p>
                        <p className="text-red-400">{errMsg}</p>
                        <form className="space-y-4 md:space-y-6" onSubmit={checkRegister}>
                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="userName" className="inline-block mb-1 text-sm font-medium text-white">User Name</label>
                                </div>
                                <input onChange={changeUserName} type="text" name="userName" id="userName" className="border sm:text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" autoFocus required />
                                <p className="text-sm inline-block text-red-400"><span className={userName && !validUserName ? "info" : "offscr"}>Please Enter Valid User Name</span></p>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-white">Email</label>
                               </div> 
                               <input onChange={changeMail} type="email" name="email" id="email" className="border sm:text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" required />
                               <p className="text-sm inline-block text-red-400"><span className={mail && !validMail ? "info" : "offscr"}>Incorrect Email Format</span></p>
                            </div>
                            <div> 
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-white">Password</label>
                               </div>
                               <input onChange={changePass} type="password" name="password" id="password" className="border sm:text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" required />
                               <p className="text-sm inline-block text-red-400"><span className={pass && !validPass ? "info" : "offscr"}>Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</span></p>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="confirm-password" className="block mb-1 text-sm font-medium text-white">Confirm password</label>
                                </div> 
                                <input onChange={changeConfirmPass} type="password" name="confirm-password" id="confirm-password" className="border sm:text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" required />
                                <p className="text-sm inline-block text-red-400"><span className={confirmPass && !validConfirmPass ? "info" : "offscr"}>Confirm Password should be same as Password</span></p>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="phone" className="block mb-1 text-sm font-medium text-white">Phone no.</label>
                                </div> 
                               <input onChange={changePhone} type="tel" name="phone" id="phone" className="border sm:text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" required />
                               <p className="text-sm inline-block text-red-400"><span className={phone && !validPhone ? "info" : "offscr"}>Phone no. must have 10 digits</span></p>
                            </div>
                            <div> 
                                <div className="flex justify-between">
                                    <h3 className="block mb-1 text-sm font-medium text-white">Gender</h3>
                                </div>
                                <ul className="items-center w-full text-sm font-medium border  rounded-lg sm:flex bg-gray-700 border-gray-600 text-white">
                                    <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
                                        <div className="flex items-center pl-3">
                                            <input id="male" type="radio" value="Male" name="gender"  className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500" required/>
                                            <label htmlFor="male" className="w-full py-3 ml-2 text-sm font-medium text-gray-300">Male </label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
                                        <div className="flex items-center pl-3">
                                            <input id="female" type="radio" value="Female" name="gender" className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500" required/>
                                            <label htmlFor="female" className="w-full py-3 ml-2 text-sm font-medium text-gray-300">Female</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="bdate" className="block mb-1 text-sm font-medium text-white">Birth Date</label>
                                </div>
                                <input type="date" name="bdate" id="bdate" className="border sm:text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" required />
                            </div>
                            <button className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" >Sign Up</button>
                            <p className="text-sm font-light text-gray-400">Already have an account? <Link to="/login" className="font-medium hover:underline text-blue-500">Login here</Link></p>
                         </form>
                    </div>
                </div>
            </div>
        </section>
    )}
    </>
    )
}

export default Register;