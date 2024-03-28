import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
   <nav className="navbar navbar-expand-lg  bg">
  <Link to="/" className="navbar-brand text-light" href="#">All Applicants</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link to={"/add-applicants"} className="nav-link text-light" href="#">Create Applicants</Link>
      </li>
    </ul>
  </div>
</nav>

  )
}

export default Header