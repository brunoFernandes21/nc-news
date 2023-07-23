import { useState } from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { UserContext } from "../contexts/User";
import { FaBars } from "react-icons/fa";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import MobileNavBar from "./MobileNavBar";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [topics, setTopics] = useState(["coding", "cooking", "football"]);
  const { user } = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);

  const toggleShowNav = () => {
    setShowNav(!showNav);
  };
  return (
    <div>
      <nav
        className={`${
          theme === "dark"
            ? "bg-red-600 shadow-white"
            : "shadow-black bg-red-600"
        } shadow-md top-0 fixed z-50 w-full flex justify-between items-center flex-wrap text-white font-black p-2 px-4 md:p-4 md:px-10 lg:p-6 lg:px-14 `}
      >
        <Link
          onClick={() => setShowNav(false)}
          className="text-2xl md:text-3xl ease-in-out duration-300 hover:text-gray-300"
          to={"/"}
        >
          NC NEWS
        </Link>
        <ul className=" desktop__links flex md:text-xl md:gap-4 justify-center items-center md:m-auto">
          {topics.map((topic) => {
            return (
              <li
                key={topic}
                className=" desktop-link capitalize p-2 ease-in-out duration-300 hover:text-gray-300 md:text-xl"
              >
                <Link to={`/articles?topic=${topic} `}>{topic}</Link>
              </li>
            );
          })}
        </ul>
        <ul className="desktop__socials justify-center items-center">
          <div className="text-3xl flex justify-center items-center gap-8 text-white">
            <p className="text-base">Hello {user}</p>
            <Link to="https://github.com/brunoFernandes21" target="_blank">
              <AiFillGithub className=" hover:text-gray-300 hover:cursor-pointer ease-in-out duration-300" />
            </Link>
            <Link
              to="https://linkedin.com/in/bruno-fernandes-879b0725a"
              target="_blank"
            >
              <AiFillLinkedin className="hover:text-gray-300 hover:cursor-pointer ease-in-out duration-300" />
            </Link>
            <button className="darkMode flex p-2 cursor-pointer text-xl md:text-2xl">
              <ToggleTheme />
            </button>
          </div>
        </ul>

        <button className="mobile__icon">
          <FaBars onClick={toggleShowNav} className="nav__icon" />
        </button>
      </nav>
      <MobileNavBar showNav={showNav} setShowNav={setShowNav} />
    </div>
  );
};

export default Navbar;
