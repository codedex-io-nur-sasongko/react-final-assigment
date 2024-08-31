import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <h1>Which favorite dog are you ?</h1>
      <nav className="">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </nav>
    </header>
  )
}

export default Header