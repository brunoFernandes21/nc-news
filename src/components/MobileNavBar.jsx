import { useState } from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { BiFootball } from "react-icons/bi"
import { GiCampCookingPot } from "react-icons/gi"
import { IoLogoReact } from "react-icons/io5"
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";

const MobileNavBar = ({ showNav, toggleShowNav }) => {
  const { theme } = useContext(ThemeContext);
  const [topics, setTopics] = useState([
    {topic: "coding", icon: <BiFootball/>},
    {topic: "cooking", icon: <GiCampCookingPot/>},
    {topic: "football", icon: <IoLogoReact/>}
  ]);
  const { user } = useContext(UserContext);

  return (
    <nav className={` ${showNav ? "show__nav" : ""} mobile__nav `}>
      <ul
        className={`links ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        {topics.map(({topic, icon}) => {
          return (
            <li
              key={topic}
              className={`link capitalize `}
            >
              <Link onClick={toggleShowNav} to={`/articles?topic=${topic}  `} className={`flex gap-4 justify-center items-center flex-row`}>{topic} {icon}</Link>
            </li>
          );
        })}
      </ul>

      <ul className="socials flex flex-col">
        <p className={` ${theme === "dark" ? "bg-white text-red-500" : "bg-red-500 text-white"} bg-red font-bold text-xl rounded p-2 `}>Hello {user}</p>
        <li className="text-3xl flex justify-center items-center mt-4 gap-10 text-white">
          <Link to="https://github.com/brunoFernandes21" target="_blank">
            <AiFillGithub
              className={`flex hover:text-gray-300 hover:cursor-pointer ${
                theme === "dark"
                  ? "text-white hover:cursor-pointer ease-in-out duration-300"
                  : "text-slate-800"
              }  `}
            />
          </Link>
          <Link
            to="https://linkedin.com/in/bruno-fernandes-879b0725a"
            target="_blank"
          >
            <AiFillLinkedin
              className={`hover:text-gray-300 hover:cursor-pointer ease-in-out duration-300 ${
                theme === "dark" ? "" : "text-slate-800"
              }`}
            />
          </Link>
          <button className=" flex p-2 cursor-pointer text-xl md:text-2xl">
            <ToggleTheme />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavBar;
