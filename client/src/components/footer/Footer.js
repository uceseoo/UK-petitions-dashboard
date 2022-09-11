import CopyrightIcon from "@mui/icons-material/Copyright";

export const FooterComponent = () => {
  return (
    <div className="footer-component-container">
      <div className="footer-component-inner-container">
        <p>Built with React, SCSS and Material-UI </p>
        <span>➡</span>
        <p>
          <CopyrightIcon /> Elias Omondi 2022
        </p>
      </div>
    </div>
  );
};

export default FooterComponent;
