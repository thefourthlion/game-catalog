const axios = require("axios");
require("dotenv").config();

const starting = 7;
const ending = 88096;

// ------------------------------- connect to ai api -------------------------------
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generate = async () => {
  for (let num = starting; num <= ending; num++) {
    // ------------------------------- get data from db -------------------------------
    const res = await axios.get(
      `https://api.games.everettdeleon.com/api/games/read/game/${num}`
    );

    const apiData = res.data;
    const title = apiData.title;
    let platform = apiData.console;

    if (platform == "Nintendo") {
      platform = "NES";
    } else if (platform == "Playstation") {
      platform = "Playstation 1";
    }

    console.log(`🎮 -------- #${num}`);
    console.log(
      `------------------------------${title} - ${platform} -------------------------`
    );
    // ------------------------------- get ai to generate data -------------------------------
    if (title != null || title != undefined || title != "") {
      const prompt = `Write me a one paragraph description, similar to what you would see in a game manual or on the back of a game. For the game ${title} on ${platform}`;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      const data = response.data.choices;
      const aiData = data[0].text;

      // ------------------------------- post data -------------------------------

      await axios
        .post(
          `https://api.games.everettdeleon.com/api/games/update/game/${num}`,
          {
            description: aiData,
          }
        )
        .then(() => {
          console.log(`✅ CHANGED DESCRIPTION ${aiData}`);
        })
        .catch((error) => {
          console.log("🛑 COULDN'T CHANGE DESCRIPTION");
        });
    }
  }
};

generate();
