
const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
}
  return (
    <footer className="text-sm md:text-lg w-full lg:mt-0 py-5 flex justify-center items-center text-white bg-red-600 font-black">
        <p >Bruno Fernandes &copy; {getYear()} All Rights Reserved</p>
    </footer>
  )
}

export default Footer