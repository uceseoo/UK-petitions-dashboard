let petition_api = "";

//CHECK IF IN DEVELOPMENT MODE OR PRODUCTOION MODE TO USE LOCAL SEVER OR HOSTED SERVER
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  petition_api = "http://localhost:5000/petition";
} else {
  petition_api = process.env.REACT_APP_PETITION_API;
}

export const petitionApi = petition_api;
