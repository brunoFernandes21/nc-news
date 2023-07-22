import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
const NotFound = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`p-10 mt-60 font-bold block text-center m-auto ${theme === "dark" ? "text-white" : "text-red-500"}`}>
        <p className='text-8xl'>404</p>
        <p className='text-4xl'>Not Found: Page does not exist</p>
        <p className='text-xl'>Go to the <Link className='underline' to={'/'}>Homepage</Link>.</p>
    </main>
  )
}

export default NotFound;
