import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const HeaderComponent = () => {
  //N:B FETCH UNIQUE DATA OF PETITIONS FROM SERVER USING USEEFFECT....

  return (
    <div className="header-component-container">
      <div className="header-component-inner-container">
        <div className="petitions-datat-summary-container">
          <div className="each-data-summary-container">
            <div className="data-information">
              <span>1,330</span>
              <p>Opened Petitions</p>
            </div>
            <div className="data-icon">
              <LockOpenIcon />
            </div>
          </div>

          <div className="each-data-summary-container">
            <div className="data-information">
              <span>7,796</span>
              <p>Closed Petitions</p>
            </div>
            <div className="data-icon">
              <LockIcon />
            </div>
          </div>

          <div className="each-data-summary-container">
            <div className="data-information">
              <span>31,724</span>
              <p>Rejected Petitions</p>
            </div>
            <div className="data-icon">
              <ThumbDownIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
