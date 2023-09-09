import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// const config = {
//   headers: { Authorization: `Bearer ${yourBearerToken}` },
// };

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function getParameters(data){
  if (data.cust === "Any") {
    return "Any"
  }
  else {
    var res = ""
    for (let i = 0; i < data.arr.length; i++){
      res += data.arr[i];
      if (i != data.arr.length - 1) {
        res += ",";
      }  
    }
    return res;
  }
}
function getFlag(data) {
  var res = "&blacklistFlags="
  if(searchId.hasOwnProperty('flag'))
    for (let i = 0; i < data.length; i++){
      res += data[i];
      if (i != data.length - 1) {
        res += ",";
      }  
    }
    return res;
}
app.post("/get-jokes", async (req, res) => {
  const searchId = req.body;
  console.log(searchId);
  var Flag = "";
  console.log(typeof Flag);
  if (searchId.hasOwnProperty('flag')) {
    var temp = searchId.flag;
    temp = temp.toString();
    console.log(typeof temp);
    Flag = temp;
    console.log(Flag);
  }
  const custmon = getParameters(searchId);
  try {
    const result = await axios.get(API_URL + "/" + custmon + "?" , {
      params: {
        lang: searchId.lang,
        blacklistFlags: Flag,
      },
    });
    console.log(result.data);
    if (result.data.type === "single") {
      res.render("index.ejs", {
        setup: JSON.stringify(result.data.joke)
      });
    } else {
      res.render("index.ejs", {
        setup: JSON.stringify(result.data.setup),
        delivery: JSON.stringify(result.data.delivery)
      });
    }
    // res.render("index.ejs", {  });
  } catch (error) {
    res.render("index.ejs", { setup: JSON.stringify(error) });
  }
});
