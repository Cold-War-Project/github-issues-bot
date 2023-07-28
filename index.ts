import DiscordJS, { CommandInteraction } from "discord.js";
import dotenv from "dotenv";
import { Octokit } from "@octokit/rest";
import { getModal } from "./utils";
import report from "./report";
import express from "express";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Github issues bot!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const client = new DiscordJS.Client({
  intents: ["Guilds", "GuildMessages"],
});

client.on("ready", () => {
  console.log("issue bot ready");
  const guildId = process.env.GUILD_ID || "";

  const guild = client.guilds.cache.get(guildId);
  guild?.commands.create(report.data);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction
      .showModal(
        getModal(
          interaction.options.data[0].value as string, // ["issueTitle"]
          interaction.options.data[1].value as string // ["issueDescription"]
        )
      )
      .catch((err) => {
        console.log(err);
        interaction.ephemeral = true;
        interaction.reply(
          `DiscordJS API responded with an error.\nError: ${err}}\nAction: While showing modal`
        );
      });
  } else if (interaction.isModalSubmit()) {
    const { fields } = interaction;
    const issueTitle = fields.getTextInputValue("issueTitle");
    const issueDescription = fields.getTextInputValue("issueDescription");
    const octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN,
      baseUrl: "https://api.github.com",
    });

    await octokit.rest.issues
      .create({
        owner: process.env.GITHUB_USERNAME || "",
        repo: process.env.GITHUB_REPOSITORY || "",
        title: issueTitle,
        body: issueDescription,
      })
      .then((res) => {
        interaction.ephemeral = true;
        interaction.reply(`Issue created: ${res.data.html_url}`);
      })
      .catch((err) => {
        console.log(err);
        interaction.ephemeral = true;
        interaction.reply(
          `Octokit API responded with an error\nError: ${err}}\nAction: While creating issue in github`
        );
      });
  }
});

client.login(process.env.BOT_TOKEN).catch((err) => {
  console.log(err);
});
