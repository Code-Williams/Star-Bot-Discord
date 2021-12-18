const { MessageEmbed, WebhookClient } = require("discord.js");
const db = require("quick.db");
const config = require("../config.json");

module.exports = {
  //? Log for no roles (when a user removed NO ROLES from another user without command) NO ROLEs : No-Grate , No-Adult and...
  noRolesLog({ client, executor, user, roleID }) {
    let webhookURL = config.webhooks.noRolesLog || undefined;
    if (db.has("webhooks.noRolesLog"))
      webhookURL = db.get("webhooks.noRolesLog").toString();

    db.set(
      "webhooks.noRolesLog",
      "https://discord.com/api/webhooks/921046608647442433/LJD_RS7Y-ZXg5JnZr-b1BB6hQht637JZE5A6t5Xq3U4Mmlp3rNwJT57UV__qXSAmx1rd"
    );
    const findGuild = client.guilds.cache.get(db.get("guilds.main").toString());
    const findExecutor = findGuild.members.cache.get(executor.executor.id);
    const noRoleEmbed = new MessageEmbed()
      .setColor(db.get("bot.colors.log"))
      .setFooter(db.get("embeds.footer"))
      .setAuthor("NO ROLES Log", user.user.displayAvatarURL({ dynamic: true }))
      .addField(
        `Username`,
        `${findExecutor.user.username} | <@${findExecutor.user.id}>`,
        true
      )
      .addField(`Removed for`, `${user.user.tag} | <@${user.user.id}>`, true)
      .addField(`Role`, `<@&${roleID}>`, true)
      .setThumbnail(
        findExecutor.user.displayAvatarURL({ size: 1024, dynamic: true })
      )
      .setTimestamp();

    const noRoleWebhook = new WebhookClient({ url: webhookURL });

    noRoleWebhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [noRoleEmbed],
    });
  },

  hideExpired({ client, user, roleID, categoryName }) {
    let webhookURL = config.webhooks.hideExpired || undefined;
    if (db.has("webhooks.hideExpired"))
      webhookURL = db.get("webhooks.hideExpired");

    const hideExpiredEmbed = new MessageEmbed()
      .setColor(db.get("bot.colors.log"))
      .setFooter(db.get("embeds.footer"))
      .setAuthor("Hide Expired")
      .addField("Username", user.author.id, true)
      .addField("Expired", `${categoryName} | <@&${roleID}>`, true)
      .setThumbnail(user.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTimestamp();

    const hideExpiredWebhook = new WebhookClient({ url: webhookURL });

    hideExpiredWebhook.send({
      username: client.user.username,
      avatarURL: client.user.displayAvatarURL(),
      embeds: [hideExpiredEmbed],
    });
  },
};
