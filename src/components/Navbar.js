import {Link} from "react-router-dom";
const Navbar = (props) => {
  const logout = () => {
    if(props.user){
      props.onLogout()
    }
  }
  return(
<nav className="bg-gray-800 border-gray-700">
  <div className="max-w-screen-xl mx-auto p-4">
    <div className="w-full flex justify-between items-center" id="navbar-solid-bg">
          <Link to="/" className="py-2 px-3 text-sky-500 rounded hover:bg-sky-900 hover:text-white flex font-medium mt-4 rtl:space-x-reverse flex-row border-gray-700" aria-current="page">Home</Link>
      <ul className="flex font-medium mt-4 rounded-lg rtl:space-x-reverse flex-rowbg-gray-800 border-gray-700">
        <li>
          <Link to={props.user? "/" : "/login"} onClick={logout} className="block py-2 px-3 rounded text-gray-300 hover:bg-gray-700 hover:text-white">{props.login}</Link>
        </li>
        <li>
          <Link to="/signup" className="block py-2 px-3 rounded text-gray-300 hover:bg-gray-700 hover:text-white">Sign Up</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
}
export default Navbar;