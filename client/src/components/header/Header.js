import {useEffect, useState, useCallback} from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import {petitionApi} from "../../api";

const HeaderComponent = () => {
  const [openPetitions, setOpenPetitions] = useState({
    petitions: [],
    fetching: false,
  });
  const [closedPetitions, setClosedPetitions] = useState({
    petitions: [],
    fetching: false,
  });
  const [rejectedPetitions, setRejectedPetitons] = useState({
    petitions: [],
    fetching: false,
  });

  const fetchOpenedPetitions = useCallback(() => {
    setOpenPetitions({
      petitions: [],
      fetching: true,
    });
    axios
      .post(`${petitionApi}/fetch/petitions`, {query: "open"})
      .then(res => {
        setOpenPetitions({
          petitions: res.data,
          fetching: false,
        });
      })
      .catch(error => {
        setOpenPetitions({
          petitions: [],
          fetching: false,
        });
      });
  }, []);

  const fetchClosedPetitions = useCallback(() => {
    setClosedPetitions({
      petitions: [],
      fetching: true,
    });
    axios
      .post(`${petitionApi}/fetch/petitions`, {query: "closed"})
      .then(res => {
        setClosedPetitions({
          petitions: res.data,
          fetching: false,
        });
      })
      .catch(error => {
        setClosedPetitions({
          petitions: [],
          fetching: false,
        });
      });
  }, []);

  const fetchRejectedPetitions = useCallback(() => {
    setRejectedPetitons({
      petitions: [],
      fetching: true,
    });
    axios
      .post(`${petitionApi}/fetch/petitions`, {query: "rejected"})
      .then(res => {
        setRejectedPetitons({
          petitions: res.data,
          fetching: false,
        });
      })
      .catch(error => {
        setRejectedPetitons({
          petitions: [],
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
              <span>{openPetitions.petitions.length}</span>
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
              <span>{closedPetitions.petitions.length}</span>
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
              <span>{rejectedPetitions.petitions.length}</span>
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
