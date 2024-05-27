const { Message, Client, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'membercount',
    aliases: ['mc'],
    category: 'info',
    premium: true,

    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`Members`)
            .setDescription(`${message.guild.memberCount}`)
            .setTimestamp()

        message.channel.send({ embeds: [embed] })
    }
}
