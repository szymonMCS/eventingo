import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

import qs from "qs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = "https://app.ticketmaster.com/discovery/v2/events";
const API_KEY = "A7ufJi5HAAwkNH2iMbslaWeIF5jAmcXo";

app.get("/", (req, res) => {
  res.render("index.ejs", { events: [], error: null });
});

app.post("/submit", async (req, res) => {
  const location = req.body.location;

  const getFormattedDate = (date) => {
    const pad = (number) => String(number).padStart(2, '0');
  
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
  
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = "00Z";
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };


  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 7);
  
  const formattedStartDate = getFormattedDate(startDate);
  const formattedEndDate = getFormattedDate(endDate);

  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        startDateTime: formattedStartDate,
        endDateTime: formattedEndDate,
        city: location,
      },
    });
    console.log(response);
    const eventsArray = response.data._embedded?.events || [];

    const events = eventsArray.map((event) => ({
      eventName: event.name,
      eventDate: event.dates.start.localDate,
      eventLocation: event._embedded.venues[0].name,
      eventUrl: event.url
    }));

    res.render("index.ejs", { events: events, error: null});
  } catch (error) {
    console.error("Failed to make request: ", error.message);
    res.render("index.ejs", {
      events: [],
      error: "No events found for this criteria."
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
