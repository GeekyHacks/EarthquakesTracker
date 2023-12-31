import { NavLink } from 'react-router-dom';
import React from 'react';

const NavBar = () => {
  const result = (
    <>
      <nav>
        <NavLink className="navItem" to="/EarthquakesTracker/">
          Select Magnitude
        </NavLink>
        <NavLink className="navItem" to="/EarthquakesTracker/DynamicMagnitude">
          Dynamic Magnitude
        </NavLink>
        <NavLink className="navItem" to="/EarthquakesTracker/Contact">
          Contact
        </NavLink>
      </nav>
    </>
  );

  return result;
};

export default NavBar;
