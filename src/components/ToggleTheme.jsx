import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { BsFillMoonStarsFill } from "react-icons/bs";

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const ToggleTheme = () => {
    setTheme((currentTheme) => {
      return currentTheme === "light" ? "dark" : "light";
    });
  };
  return (
    <li>
      <BsFillMoonStarsFill onClick={ToggleTheme} className={`${theme === "dark" ? "text-white" : "text-black"}`} aria-label="click to change theme"/>
    </li>
  );
};

export default ToggleTheme;
