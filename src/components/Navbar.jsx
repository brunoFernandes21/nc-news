import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { UserContext } from "../contexts/User";
const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [topics, setTopics] = useState(["coding", "cooking", "football"]);
  const { user } = useContext(UserContext);
  return (
    <nav
      className={`${
        theme === "dark" ? "bg-red-600 shadow-white" : "shadow-black bg-red-600"
      } shadow-md top-0 fixed z-50 w-full flex justify-between items-center text-white font-black p-5 h-14 md:h-20 md:px-24`}
    >
      <Link
        className="text-2xl md:text-3xl ease-in-out duration-300 hover:text-gray-300"
        to={"/"}
      >
        NC NEWS
      </Link>
      <ul className="flex justify-center items-center gap-2 md:gap-4 ">
        {topics.map((topic) => {
          return (
            <Link
              key={topic}
              className="capitalize p-2 ease-in-out duration-300 hover:text-gray-300 md:text-xl"
              to={`/articles?topic=${topic}`}
            >
              {topic}
            </Link>
          );
        })}
        <ul className="p-2 cursor-pointer md:text-xl">
          <ToggleTheme />
        </ul>
      </ul>
      <div className="p-1 text-center bg-white text-red-600 md:p-2 rounded">
        <p>Hello {user}</p>
      </div>
    </nav>
  );
};

export default Navbar;
