const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const library = require("../library/star");
const config = require("../config.json");

module.exports = {
  name: "hide",
  description: "Hide categorys using NO-Roles",
  permissions: ["ADMINISTRATOR"],
  roles: "921858476685295746",
  rawPosition: true,
  execute(client, message) {
    //   CMD category mention time reason
    const messageArry = message.content.split(" ");
    const userMention = message.mentions.users.first();
    if (messageArry[4] && userMention) {
      if (
        !parseInt(messageArry[3]) ||
        parseInt(messageArry[3]) > 4 ||
        parseInt(messageArry[3]) < 1
      ) {
        const synEmbed = new MessageEmbed()
          .setColor(config.colors.main)
          .setDescription(
            `**SYNTAX** : ${config.bot.prefix}${this.name} [section] [mention] [time (1/2/3/4)] [reason]`
          );
        message.channel.send({ embeds: [synEmbed] });
        return;
      }

      const reason = message.content.replace(
        `${messageArry[0]} ${messageArry[1]} ${messageArry[2]} ${messageArry[3]}`,
        ""
      );
      const hideCategory = messageArry[1].toLowerCase();
      const availableHides = ["grate", "adult", "game", "mafia"];
      // If hide category is not any item is available in availableHides dont do anything else continue
      if (!availableHides.includes(hideCategory)) return;
      const now = new Date();
      now.setDate(now.getDate() + parseInt(messageArry[3]));
      // find role id for messagearry[1]
      const roleID = config.roles[hideCategory];
      // find user in server
      const findUser = message.guild.members.cache.get(userMention.id);

      // Create a variable called oldNoRoles and what this do is we can access to no-roles data before user get a new no-role
      const oldNoRoles = {}
      availableHides.forEach(category => {
        oldNoRoles[category] = db.has(`users.${userMention.id}.${category}.expire`) || false
      })
      
      // Set expire time to database
      db.set(`users.${userMention.id}.${hideCategory}.expire`, now);

      // Add No-Role to mentioned user
      findUser.roles.add([roleID]);

      // Create embed for response in same channel
      const embed = new MessageEmbed()
        .setColor(db.get("colors.main").toString())
        .setFooter(db.get("embeds.footer").toString())
        .setDescription(
          `User <@${userMention.id}> Tavasote <@${message.author.id}> No-${hideCategory} Shod Baraye **${messageArry[3]}** Rooz.\n\n**Reason** : ${reason}`
        );

      // Send No-Role-Add log
      library.log.noRoleAdd([client, message, userMention, roleID, reason]);

      // Delete message for user
      message.delete();

      // Send response
      message.channel.send({
        embeds: [embed],
      });
    }
  },
};
