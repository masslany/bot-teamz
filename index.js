const Discord = require('discord.js');
const prefix = "$";
const client = new Discord.Client();

client.once('ready', () => {
    console.log("Ready");
})

let team = [];

client.on('message', message => {
    if(message.content.startsWith(`${prefix}add`)) {
        let players = message.content.substring(4, message.content.length);
        team = players.split(";");
    }

    if(message.content.startsWith(`${prefix}clear`)) {
        team = [];
    }

    if(message.content.startsWith(`${prefix}shuffle`)) {
        if(team.length == 0) {
            message.channel.send("Brak graczy");
            return;
        }

        team = shuffle(team);
        teamCopy = [...team];
        let halfLenght = Math.ceil(teamCopy.length / 2);
        let teamOne = teamCopy.splice(0, halfLenght);
        let teamTwo = teamCopy;

        message.channel.send("Team 1:");
        message.channel.send(teamOne.join(" ").toString());
        message.channel.send("Team 2:");
        message.channel.send(teamTwo.join(" ").toString());

    }
})

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

client.login(process.env.BOT_TOKEN);