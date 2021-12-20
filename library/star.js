const fs = require("fs");
const { Collection } = require("discord.js");
const { exec } = require("child_process");
const functions = new Collection();

const functionsDir = fs
  .readdirSync("./library")
  .filter((file) => file.endsWith(".js") && file !== "star.js");

for (const func of functionsDir) {
  const requiredFunction = require(`./${func}`);
  functions.set(func.replace(".js", ""), requiredFunction);
}

let db = {
  config() {
    functions.get("config").set();
  },
};

// Log
let log = {
  noRolesLog(client, executor, user, roleID) {
    if (!client)
      throw new Error(
        "Enter client for noRolesLog\nRequired : client , executor , username , roleID"
      );

    if (!executor)
      throw new Error(
        "Enter executor for noRolesLog\nRequired : client , executor , username , roleID"
      );

    if (!user)
      throw new Error(
        "Enter user for noRolesLog\nRequired : client , executor , username , roleID"
      );

    if (!roleID)
      throw new Error(
        "Enter roleID for noRolesLog\nRequired : client , executor , username , roleID"
      );

    functions.get("log").noRolesLog({ client, executor, user, roleID });
  },

  noRoleAdd([client, executor, user, roleID, reason]) {
    if (!client)
      throw new Error(
        "Enter client for noRoleAdd\nRequired : client , executor , username , roleID"
      );

    if (!executor)
      throw new Error(
        "Enter executor for noRoleAdd\nRequired : client , executor , username , roleID"
      );

    if (!user)
      throw new Error(
        "Enter user for noRoleAdd\nRequired : client , executor , username , roleID"
      );

    if (!roleID)
      throw new Error(
        "Enter roleID for noRoleAdd\nRequired : client , executor , username , roleID"
      );

    if (!reason)
      throw new Error(
        "Enter reason for noRoleAdd\nRequired : client , executor , username , roleID"
      );

    functions.get("log").noRoleAdd(client, executor, user, roleID, reason);
  },

  hideExpired({ client, user, roleID, categoryName }) {
    if (!client) console.log("client");
    if (!user) console.log("user");
    if (!roleID) console.log("roleID");
    if (!categoryName) console.log("categoryName");
    if (!client || !user || !roleID || !categoryName)
      throw new Error(`Enter a correct value for hideExpired`);
  },
};

// Permission
let permissions = {
  check(message, permissions) {
    if (!message || !permissions)
      throw new Error("Enter message and permission for checking permissions");
    functions.get("permission").check(message, permissions);
  },
};

let noRoles = {
  expiredUsers() {
    return functions.get("expiredUsers").check();
  },
};

module.exports.db = db;
module.exports.log = log;
module.exports.permissions = permissions;
module.exports.noRoles = noRoles;
