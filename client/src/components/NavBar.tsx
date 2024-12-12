import { Link } from "react-router-dom"


export default function NavBar() {
  return (
    <div className="flex py-3 rounded-full font-mono relative">
        <a className="ml-4" href="/" >Logo</a>
        <div className="flex ml-auto space-x-6 mr-2">
            <div>Dashboard</div>
            <div>Pricing</div>
            <div>About Us</div>
            <Link to="/signin" className="hover:text-blue-500 transition-colors duration-300">
                SignIn
            </Link>
            <Link to="/signup" className="hover:text-blue-500 transition-colors duration-300">
                SignUp
            </Link>
        </div>
    </div>
  )
}
