import Page from "../models/page.js";

export const getLastUpdatedPage = (req, res) => {
  Page.findById({_id: "630a639a5b8f1e29294223a9"})
    .then(page => {
      // lastPage = pages[0].last_page;
      return res.status(200).json(page);
    })
    .catch(error => {
      return res.status(404).json({message: "Error getting last page", error});
    });
};
