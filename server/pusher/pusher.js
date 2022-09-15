import Pusher from "pusher";
import dotnev from "dotenv";

dotnev.config();

const {PUSHER_SECRET, PUSHER_KEY, PUSHER_APP_ID} = process.env;

export const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});
