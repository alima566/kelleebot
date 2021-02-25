const fs = require("fs").promises;
const path = require("path");
const { log } = require("@utils/utils");

const registerCommands = async (client, ...dirs) => {
  for (const dir of dirs) {
    let files = await fs.readdir(path.join(__dirname, dir));
    for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        registerCommands(client, path.join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          try {
            let cmdModule = require(path.join(__dirname, dir, file));
            let { name, aliases, category, execute } = cmdModule;

            if (!name) {
              log(
                "WARNING",
                "./utils/registry.js",
                `The command '${path.join(
                  __dirname,
                  dir,
                  file
                )}' doesn't have a name.`
              );
              continue;
            }

            if (!execute) {
              log(
                "WARNING",
                "./utils/registry.js",
                `The command '${name}' doesn't have an execute function`
              );
              continue;
            }

            if (client.commands.has(name)) {
              log(
                "WARNING",
                "./utils/registry.js",
                `The command name '${name}' has already been added.`
              );
              continue;
            }

            client.commands.set(name, cmdModule);

            if (category) {
              let commands = client.categories.get(category.toLowerCase());
              if (!commands) commands = [category];
              commands.push(name);
              client.categories.set(category.toLowerCase(), commands);
            } else {
              log(
                "WARNING",
                "./utils//registry.js",
                `The command '${name}' doesn't have a category. It will default to 'No Category'.`
              );
              let commands = client.categories.get("No Category");
              if (!commands) commands = ["No Category"];
              commands.push(name);
              client.categories.set("No Category", commands);
            }

            if (aliases && aliases.length !== 0) {
              aliases.forEach((alias) => {
                if (client.commands.has(alias)) {
                  log(
                    "WARNING",
                    "./utils//registry.js",
                    `The command alias '${alias}' has already been added.`
                  );
                } else {
                  client.commands.set(alias, cmdModule);
                }
              });
            }
          } catch (e) {
            log(
              "ERROR",
              "./utils//registry.js",
              `Error loading commands: ${e.message}`
            );
          }
        }
      }
    }
  }
  // let files = await fs.readdir(path.join(__dirname, dir));
  // for (let file of files) {
  //   let stat = await fs.lstat(path.join(__dirname, dir, file));
  //   if (stat.isDirectory()) {
  //     registerCommands(client, path.join(dir, file));
  //   } else {
  //     if (file.endsWith(".js")) {
  //       try {
  //         let cmdModule = require(path.join(__dirname, dir, file));
  //         let { name, aliases, category } = cmdModule;

  //         if (!name) {
  //           log(
  //             "WARNING",
  //             "utils/registry.js",
  //             `The command '${path.join(
  //               __dirname,
  //               dir,
  //               file
  //             )} doesn't have a name.'`
  //           );
  //           continue;
  //         }

  //         if (!cmdModule.execute) {
  //           log(
  //             "WARNING",
  //             "utils/registry.js",
  //             `The command '${name}' doesn't have an execute function.`
  //           );
  //           contine;
  //         }

  //         client.commands.set(name, cmdModule);

  //         if (category) {
  //           let commands = client.categories.get(category.toLowerCase());
  //           if (!commands) {
  //             commands = [category];
  //           }
  //           commands.push(name);
  //           client.categories.set(category.toLowerCase(), commands);
  //         } else {
  //           log(
  //             "WARNING",
  //             "utils/registry.js",
  //             `The command '${name}' doesn't have a category. Defaulting to 'No Category'.`
  //           );
  //           let commands = client.categories.get("No Category");
  //           if (!commands) {
  //             commands = ["No Category"];
  //           }
  //           commands.push(name);
  //           client.categories.set("No Category", commands);
  //         }

  //         if (aliases && aliases.length !== 0) {
  //           aliases.forEach((alias) => client.commands.set(alias, cmdModule));
  //         }
  //       } catch (e) {
  //         log(
  //           "ERROR",
  //           "utils/registry.js",
  //           `Error loading commands: ${e.message}`
  //         );
  //       }
  //     }
  //   }
  // }
};

const registerEvents = async (client, dir = "../events") => {
  let files = await fs.readdir(path.join(__dirname, dir));
  for (let file of files) {
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      registerEvents(client, path.join(dir, file));
    } else {
      if (file.endsWith(".js")) {
        let eventName = file.substring(0, file.indexOf(".js"));
        try {
          let eventModule = require(path.join(__dirname, dir, file));
          client.on(eventName, eventModule.bind(null, client));
        } catch (e) {
          log(
            "ERROR",
            "utils/registry.js",
            `Error loading events: ${e.message}`
          );
        }
      }
    }
  }
};

module.exports = {
  registerCommands,
  registerEvents,
};
