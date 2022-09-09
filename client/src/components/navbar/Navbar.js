import {Button} from "@mui/material";
import logo from "../../assets/logo.jpeg";
import InfoIcon from "@mui/icons-material/Info";

const NavbarComponent = ({setShowAbout}) => {
  return (
    <nav className="navbar-component-container">
      <div className="navbar-component-inner-container">
        <div className="navbar-logo-container">
          <img src={logo} alt="logo" />
        </div>

        <div className="navbar-header-text-container">
          <div>DASHBOARD FOR UK PETITIONS DATA</div>
        </div>

        <Button variant="contained" onClick={() => setShowAbout(true)}>
          <InfoIcon />
          About
        </Button>
      </div>
    </nav>
  );
};

export default NavbarComponent;
