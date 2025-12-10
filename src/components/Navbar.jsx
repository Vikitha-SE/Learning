import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null); 

   useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
  useEffect(() => {                                                                 
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.hamburger}`) 
      ) {
        setMenuOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  
return (
  <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <img src="log.jpg" alt="My Logo" />
      </div>

      <ul className={styles.navLinks}>
        <li>Home</li>
        <li>Tasks</li>
        <li>Analytics</li>
        <li>Settings</li>
      </ul>

      <div className={styles.avatar}>👤</div>

      <div
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>

       </div>
      

      {menuOpen && (
        <ul ref={menuRef} className={styles.mobileMenu}>
          <li>Home</li>
          <li>Tasks</li>
          <li>Analytics</li>
          <li>Settings</li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
