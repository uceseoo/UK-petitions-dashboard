import {forwardRef} from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {Button} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AboutComponent = ({showAbout, setShowAbout}) => {
  const handleCloseAbout = () => {
    setShowAbout(false);
  };
  return (
    <Dialog
      open={showAbout}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseAbout}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="about-component-contents-container">
        <h1>About</h1>

        <div className="texts-container">
          <p>
            An exploratory analytics dashboard app of{" "}
            <a target="_blank" href="https://petition.parliament.uk/">
              UK e-petitions{" "}
            </a>{" "}
            data
          </p>

          <p>
            The map displays the spatial distribution of interest in various
            petition themes. The line chart, bar chart and donut charts explore
            the petitions further showing the proportions of the different
            themes and how they vary over time.
          </p>

          <p>
            Contains Ordnance Survey and Office of National Statistics data 
            © Crown copyright and Database right [2017]. Ordnance Survey data is covered
            by OS OpenData Licence.Petitions and ONS data is licensed under the
            terms of the Open Government Licence. 
          </p>

          <p>
            Use the filter buttons and time slider to toggle multiple views.
          </p>
        </div>
        <Button variant="contained" onClick={handleCloseAbout}>
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export default AboutComponent;
