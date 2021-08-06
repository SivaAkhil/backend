const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

app.post("/api/calculate", (req, res) => {
  const { weight, BFP, AL } = req.body;

  console.log(req.body);

  //BMR: Basal Metabolic Rate
  //BFP: Body Fat Percentage
  //AL: Activity Level (btw 1 & 2)
  // 1.2 Sendentary
  // 1.375 Lightly Active
  // 1.55 Moderately active
  // 1.725 Very active
  // 1.9  extra active

  // Katch-McArdle Formula
  const BMR = Math.round(21.6 * (weight - (BFP / 100) * weight) + 370);
  const TDEE = Math.round(BMR * AL);

  // 7000 cal 1kg loss

  // 1m 2kgs or 4kg 14000 , 28000
  // per day (taken 30 days as month)
  const calperDayAt2kg = 466;
  const calperDayAt4kg = 933;

  const calforWgtLossAt2kg = Math.round(TDEE - 466);
  const calforWgtLossAt4kg = Math.round(TDEE - 933);
  const calforWgtGainAt2kg = Math.round(TDEE + 466);
  const calforWgtGainAt4kg = Math.round(TDEE + 933);

  res.status(200).json({
    BMR,
    TDEE,
    Loss2kg: calforWgtLossAt2kg,
    Loss4kg: calforWgtLossAt4kg,
    Gain2kg: calforWgtGainAt2kg,
    Gain4kg: calforWgtGainAt4kg,
  });
});

app.listen(5000, () => console.log("server up"));
