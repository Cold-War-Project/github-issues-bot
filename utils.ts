import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export const getModal = (title?: string, description?: string) => {
  const modal = new ModalBuilder()
    .setTitle("Create github issue")
    .setCustomId("AwesomeForm");

  const issueTitle = new TextInputBuilder()
    .setStyle(TextInputStyle.Short)
    .setCustomId("issueTitle")
    .setLabel("Issue title")
    .setValue(title || "")
    .setRequired(true)
    .setMinLength(12);

  const issueDescription = new TextInputBuilder()
    .setStyle(TextInputStyle.Paragraph)
    .setCustomId("issueDescription")
    .setLabel("Issue description")
    .setValue(description || "")
    .setRequired(true)
    .setMinLength(12);

  const rows = [issueTitle, issueDescription].map((component) =>
    new ActionRowBuilder<TextInputBuilder>().addComponents([component])
  );

  // Add action rows to form
  modal.addComponents(rows);

  return modal;
};
