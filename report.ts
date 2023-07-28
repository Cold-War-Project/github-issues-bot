import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { getModal } from "./utils";

export default {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Send a report directly to our github repository")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The title of the issue")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("The description of the issue")
        .setRequired(true)
    ),
};
