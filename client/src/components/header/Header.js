import {useEffect, useState, useCallback} from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import {petitionApi} from "../../api";

const HeaderComponent = () => {
  const [openPetitions, setOpenPetitions] = useState({
    count: 0,
    fetching: false,
  });
  const [closedPetitions, setClosedPetitions] = useState({
    count: 0,
    fetching: false,
  });
  const [rejectedPetitions, setRejectedPetitons] = useState({
    count: 0,
    fetching: false,
  });

  const fetchOpenedPetitions = useCallback(() => {
    setOpenPetitions({
      count: 0,
      fetching: true,
    });
    axios
      .get(`${petitionApi}/get/petition/count/open`)
      .then(res => {
        setOpenPetitions({
          count: res.data.count,
          fetching: false,
        });
      })
      .catch(error => {
        setOpenPetitions({
          count: 0,
          fetching: false,
        });
      });
  }, []);

  const fetchClosedPetitions = useCallback(() => {
    setClosedPetitions({
      count: 0,
      fetching: true,
    });
    axios
      .get(`${petitionApi}/get/petition/count/closed`)
      .then(res => {
        setClosedPetitions({
          count: res.data.count,
          fetching: false,
        });
      })
      .catch(error => {
        setClosedPetitions({
          count: 0,
          fetching: false,
        });
      });
  }, []);

  const fetchRejectedPetitions = useCallback(() => {
    setRejectedPetitons({
      count: 0,
      fetching: true,
    });
    axios
      .get(`${petitionApi}/get/petition/count/rejected`)
      .then(res => {
        setRejectedPetitons({
          count: res.data.count,
          fetching: false,
        });
      })
      .catch(error => {
        setRejectedPetitons({
          count: 0,
          fetching: false,
        });
      });
  }, []);

  useEffect(() => {
    fetchOpenedPetitions();
    fetchClosedPetitions();
    fetchRejectedPetitions();
  }, [fetchOpenedPetitions, fetchClosedPetitions, fetchRejectedPetitions]);

  return (
    <div className="header-component-container">
      <div className="header-component-inner-container">
        <div className="petitions-data-summary-container">
          <div className="each-data-summary-container">
            {openPetitions.fetching && (
              <div className="data-summary-loading-container">
                <CircularProgress />
              </div>
            )}
            <div className="data-information">
              <span>{openPetitions.count}</span>
              <p>Open Petitions</p>
            </div>
            <div className="data-icon">
              <LockOpenIcon />
            </div>
          </div>

          <div className="each-data-summary-container">
            {closedPetitions.fetching && (
              <div className="data-summary-loading-container">
                <CircularProgress />
              </div>
            )}
            <div className="data-information">
              <span>{closedPetitions.count}</span>
              <p>Closed Petitions</p>
            </div>
            <div className="data-icon">
              <LockIcon />
            </div>
          </div>

          <div className="each-data-summary-container">
            {rejectedPetitions.fetching && (
              <div className="data-summary-loading-container">
                <CircularProgress />
              </div>
            )}
            <div className="data-information">
              <span>{rejectedPetitions.count}</span>
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
