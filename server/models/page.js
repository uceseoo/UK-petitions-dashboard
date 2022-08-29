import mongoose from "mongoose";
import moment from "moment";

const pageSchema = mongoose.Schema({
  last_page: String,
  updated_at: {
    type: Date,
    default: moment().format(),
  },
});

const Page = mongoose.model("Page", pageSchema);

export default Page;
