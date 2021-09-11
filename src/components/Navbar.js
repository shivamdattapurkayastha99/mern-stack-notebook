import React from 'react'
import { useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom'

  
const Navbar = () => {
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);
    return (
        
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">Shivam Notebook Portal </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
        <Link className={`nav-link ${location.pathname==='/'?"active":""}`} to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
      </li>
      
      
    </ul>
    
  </div>
</nav>
        
    )
}

export default Navbar
