import getJSON from "get-json";

import Petition from "../models/petition.js";
import Page from "../models/page.js";
import moment from "moment";

var bulk = [];
let my_page;

export const updatePetitons = (req, res) => {
  Page.find()
    .then(page => {
      const firstfile = page[0].last_page;

      var handleError = function (err) {
        if (!err) return false;
        console.log(err);
        return true;
      };

      var processMany = function (petitions, callback) {
        for (var increment in petitions.data) {
          getJSON(
            "https://petition.parliament.uk/petitions/" +
              petitions.data[increment].id +
              ".json",
            function (error, response) {
              if (handleError(error)) {
                // handle errors here
              } else {
                var preCon =
                  response.data.attributes.signatures_by_constituency;

                if (preCon) {
                  for (var i = 0; i < preCon.length; i++) {
                    response.data.attributes.signatures_by_constituency[
                      i
                    ].importance =
                      response.data.attributes.signatures_by_constituency[i]
                        .signature_count /
                      response.data.attributes.signature_count;
                  }
                }

                var datetime = new Date();
                var indexbody = response.data.attributes;
                indexbody.tstamp = datetime;
                const topic =
                  response.data.attributes.departments.length > 0
                    ? response.data.attributes.departments[0].name
                        .replace("Department for ", "")
                        .replace("Department of ", "")
                    : "Unknown Topic";

                const petition = {
                  id: response.data.id,
                  self: response.links.self,
                  action: response.data.attributes.action,
                  state: response.data.attributes.state,
                  background: response.data.attributes.background,
                  signatures_by_constituency:
                    response.data.attributes.signatures_by_constituency,
                  signature_count: response.data.attributes.signature_count,
                  created_at: response.data.attributes.created_at,
                  closed_at: response.data.attributes.closed_at,
                  topic: topic,
                };

                bulk.push(petition);

                const newPetition = new Petition(petition);

                Petition.find({id: petition.id}).then(pet => {
                  if (pet) return;

                  newPetition
                    .save()
                    .then(() => {
                      console.log(
                        `Created Petition-${petition.id} succesfully`
                      );
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
              }
            }
          );
        }
        callback(bulk);
      };

      var processList = function (thisfile, callback) {
        getJSON(thisfile, function (error, response) {
          if (handleError(error)) {
          } else {
            //console.log("gathering: " + response.links.self);
            processMany(response, function (response) {});
            my_page = response.links.last;
            if (response.links.next) {
              processList(response.links.next, function (response) {
                callback(response);
              });
            } else {
              callback(bulk);
            }
          }
        });
      };

      processList(firstfile, function (response) {
        updtatePage(my_page);
        return res
          .status(200)
          .json({message: "Successfully Updated Petitions"});
      });
    })
    .catch(error => {
      res.status(404).json({error: error});
    });
};

export const updtatePage = page => {
  Page.findByIdAndUpdate(
    {_id: "630a639a5b8f1e29294223a9"},
    {last_page: page, updated_at: moment.now()},
    {new: true}
  )
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      throw error;
      //(error);
    });
};
