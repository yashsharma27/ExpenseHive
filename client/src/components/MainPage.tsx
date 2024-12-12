import NavBar from "./NavBar";
import mainpage from '../assets/mainpage.webp'


export default function MainPage() {
  return (
    <div className="min-h-screen bg-gray-900 font-mono text-white">
        <NavBar />
        <div className="relative text-white font-mono p-8 pt-40 ml-8 flex justify-between">
            <div className="flex items-center max-w-2xl text-3xl leading-relaxed 
                        animate-fadeInAndScale text-center">
                Take Control of Your Finances: Effortless Expense Tracking at Your Fingertips
            </div>
            <div className="">
                <img className="rounded-full" src={mainpage} alt="LinkedIn"></img>
            </div>
        </div>
    </div>
  )
}
