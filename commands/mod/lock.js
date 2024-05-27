const {
    Message,
    Client,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    MessageSelectMenu
} = require('discord.js')

module.exports = {
    name: 'lock',
    category: 'mod',
    premium: true,

    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            const error = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(
                    `You must have \`Manage Channels\` permission to use this command.`
                )
            return message.channel.send({ embeds: [error] })
        }
        const channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]) ||
            message.channel
        if (channel.manageable) {
            channel.permissionOverwrites.edit(message.guild.id, {
                SEND_MESSAGES: false,
                reason: `${message.author.tag} (${message.author.id})`
            })
            const emb = new EmbedBuilder()
                .setDescription(`${channel} has been locked for @everyone role`)
                .setColor(client.color)
            return message.channel.send({ embeds: [emb] })
        } else {
            const embi = new EmbedBuilder()
                .setDescription(
                    `I don't have adequate permissions to lock this channel.`
                )
                .setColor(client.color)
            return message.channel.send({ embeds: [embi] })
        }
    }
}
