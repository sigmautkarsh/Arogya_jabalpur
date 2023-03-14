import React from 'react'

const Header = () => {
  return (
    <>
      <nav>
        <NavContent />

      </nav>
    </>
  )
}
const NavContent = ({ setMenuOpen }) => (
  <>
    <h2>Mohit.</h2>
    <div>
      <a onClick={() => setMenuOpen(false)} href="#Home">
        Home
      </a>
      <a onClick={() => setMenuOpen(false)} href="#work">
        Work
      </a>
      <a onClick={() => setMenuOpen(false)} href="#timeline">
        TimeLine
      </a>
      <a onClick={() => setMenuOpen(false)} href="#contact">
        Contact
      </a>
    </div>
    <a href="mailto:mohitdubey1322001@gmail.com">
      <button>Email</button>
    </a>
  </>
);

export default Header