import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export const getModal = (description: string) => {
  const modal = new ModalBuilder()
    .setTitle("Create github issue")
    .setCustomId("AwesomeForm");

  const issueTitle = new TextInputBuilder()
    .setStyle(TextInputStyle.Short)
    .setCustomId("issueTitle")
    .setLabel("Issue title")
    .setRequired(true)
    .setMinLength(12);

  const issueDescription = new TextInputBuilder()
    .setStyle(TextInputStyle.Paragraph)
    .setCustomId("issueDescription")
    .setLabel("Issue description")
    .setValue(description)
    .setRequired(true)
    .setMinLength(12);

  const stepsToReproduce = new TextInputBuilder()
    .setStyle(TextInputStyle.Paragraph)
    .setCustomId("stepsToReproduce")
    .setLabel("Steps to reproduce")
    .setPlaceholder("1. \n 2. \n 3. \n etc...")
    .setRequired(true)
    .setMinLength(12);

  const userOS = new TextInputBuilder()
    .setStyle(TextInputStyle.Short)
    .setCustomId("userEnvironment")
    .setPlaceholder("What operating system are you using?")
    .setRequired(true);

  const userVersion = new TextInputBuilder()
    .setStyle(TextInputStyle.Short)
    .setCustomId("userVersion")
    .setPlaceholder("What version of the mod are you using?")
    .setRequired(true);

  const userGPU = new TextInputBuilder()
    .setStyle(TextInputStyle.Short)
    .setCustomId("userGPU")
    .setPlaceholder("What GPU are you using?")
    .setRequired(true);

  const rows = [
    issueTitle,
    issueDescription,
    stepsToReproduce,
    userOS,
    userVersion,
    userGPU,
  ].map((component) =>
    new ActionRowBuilder<TextInputBuilder>().addComponents([component])
  );

  // Add action rows to form
  modal.addComponents(rows);

  return modal;
};
