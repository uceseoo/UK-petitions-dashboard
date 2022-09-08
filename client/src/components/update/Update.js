import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

import {petitionApi} from "../../api";
import {Button} from "@mui/material";

export const UpdateAppComponent = ({setUpdatingApp}) => {
  const [page, setPage] = useState({});
  const [update, setUpdate] = useState(false);
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  const handleUpdatePetitons = () => {
    setUpdatingApp(true);
    axios
      .post(`${petitionApi}/update/petitions`)
      .then(() => {
        setUpdatingApp(false);
        console.log("page updated");
      })
      .catch(error => {
        setUpdatingApp(false);
        console.log(error);
        alert("Failed to update petitions");
      });
  };

  useEffect(() => {
    setCheckingUpdate(true);
    axios
      .get(`${petitionApi}/get/last/updated/page`)
      .then(res => {
        setPage(res.data);

        return axios
          .get(
            "https://petition.parliament.uk/petitions.json?page=832&state=all"
          )
          .then(resp => {
            const page = resp.data.links.last;

            const params = new URLSearchParams(page);

            const lastPageNumber = params.get(
              "https://petition.parliament.uk/petitions.json?page"
            );

            if (parseInt(lastPageNumber) - res.data.last_page_number > 0) {
              setUpdate(true);
            }
            setCheckingUpdate(false);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="update-application-container">
      <div className="update-info-container">
        <p>Last updated {moment(page?.updated_at).fromNow()}</p>
      </div>

      {update && (
        <div className="update-button-container">
          <Button variant="contained" onClick={handleUpdatePetitons}>
            <SystemUpdateAltIcon /> Update Data
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpdateAppComponent;
