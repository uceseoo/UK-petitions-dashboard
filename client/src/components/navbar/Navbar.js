import logo from "../../assets/logo.jpeg";

const NavbarComponent = () => {
  return (
    <nav className="navbar-component-container">
      <div className="navbar-component-inner-container">
        <div className="navbar-logo-container">
          <img src={logo} alt="logo" />
        </div>

        <div className="navbar-header-text-container">
          <div>DASHBOARD FOR UK PETITIONS DATA</div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
