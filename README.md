# KelleeBot

What started off as a bot for just one channel (see this [repo](https://github.com/alima566/twitch-bot)), due to it's popularity within the Twitch streaming community, I expanded and improved upon the original bot to be included in multiple Twitch channels.

The bot comes with a feature that allows any Twitch streamer to have the bot automatically join their channel by executing a simple `!join` command in the bot's Twitch channel. Once joined, the bot comes with two built in commands, a `!ty` command and a `!cd` command.

The `!ty` command is a very popular command that allows viewers in chat to thank another viewer by having the bot give them a random compliment. The `!cd` command does a simple countdown in chat that allows for viewers to snipe a Tetris lobby, for example.

Once the bot has joined a channel, that information is stored and saved to a MongoDB database, so that in the event the bot restarts, it can automatically re-join those channels by retrieving the information from the database. Any channel specific details (i.e., command prefix, any disabled commands) are also stored in the database.

The bot is also highly customizable in the sense that I can add commands to only specific channels without it effecting the other channels that the bot is in.
