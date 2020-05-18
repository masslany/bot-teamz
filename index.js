const Discord = require('discord.js');
const prefix = "$";
const client = new Discord.Client();

client.once('ready', () => {
    console.log("Ready");
})


client.on('message', message => {

    if(message.content.startsWith(`${prefix}shuffle`)) {

        let usersVoiceChannel = message.member.voice.channel;
        if(usersVoiceChannel === null || usersVoiceChannel === undefined) {
            message.channel.send("Aby użyć tej komendy musisz być podłączony do kanału głosowego");
            return;
        }

        let team = collectionToArray(usersVoiceChannel.members)

        if(team.length == 0) {
            message.channel.send("Brak graczy");
            return;
        }

        team = shuffle(team);
        teamCopy = [...team];
        let halfLenght = Math.ceil(teamCopy.length / 2);
        let teamOne = teamCopy.splice(0, halfLenght);
        let teamTwo = teamCopy;

        message.channel.send("Attackers:");
        message.channel.send(teamOne.join(" ").toString());
        message.channel.send("Defenders:");
        message.channel.send(teamTwo.join(" ").toString());

        const secondVoiceChannel = message.guild.channels.cache.filter(c => c.name === 'ściernisko' && c.type === 'voice').first();
        
        teamTwo.forEach(m => {
             m.voice.setChannel(secondVoiceChannel);
        });

    }
})

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const collectionToArray = (collection) => {
    let resultArray = [];
    for (const [key, value] of collection.entries()) {
        resultArray.push(value);
      }
    return resultArray;
}

client.login(process.env.BOT_TOKEN);

