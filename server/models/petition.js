import mongoose from "mongoose";
import moment from "moment";

const petitionSchema = mongoose.Schema({
  id: Number,
  topic: String,
  self: String,
  action: String,
  state: String,
  background: String,
  signatures_by_constituency: [
    {
      name: String,
      ons_code: String,
      mp: String,
      signature_count: Number,
      importance: Number,
    },
  ],

  created_at: String,
  closed_at: String,

  uploaded_at: {
    type: Date,
    default: moment().format(),
  },
});

const Petition = mongoose.model("Petition", petitionSchema);

export default Petition;
