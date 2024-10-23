const Discord = require('discord.js')
const token = require('./meutoken').token
const fs = require('fs')
const { ActivityType } = require('discord.js')

const client = new Discord.Client({ 
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildModeration
    ]
})

client.on('interactionCreate', (interaction) => {
    if (interaction.type !== Discord.InteractionType.ApplicationCommand) {
        return
    } else {
        if (!client.slashCommands.get(interaction.commandName)) {
            interaction.reply({ ephemeral: true, content: 'Houve um erro no comando selecinado.' })
        } else {
            client.slashCommands.get(interaction.commandName).run(client, interaction)
        }
    }
})

client.on("ready", () => {

    setInterval(() => {

        let list = ['https://bio.site/kaellexe']
        
        let status = list[Math.floor(Math.random() * list.length)]
        
        client.user.setPresence({
        activities: [{
        name: status,
        type: ActivityType.Streaming,
        url: 'https://www.twitch.tv/kaelmosconi_'
        }],
        status: 'idle'
        })      
        }, 15000)


})

client.slashCommands = new Discord.Collection()
module.exports = client

fs.readdir('./events', (err, file) => {
    for(let evento of file) {
        require(`./events/${evento}`)
    }
})

fs.readdir('./handler', (err, file) => {
    for(let main of file) {
        require(`./handler/${main}`)
    }
})

client.login(token)