const {
    Message,
    Client,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    MessageSelectMenu
} = require('discord.js')

module.exports = {
    name: 'unhideall',
    category: 'mod',
    premium: true,

    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            let error = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(
                    `You must have \`Manage Channels\` permission to use this command.`
                )
            return message.channel.send({ embeds: [error] })
        }
        if (client.util.hasHigher(message.member) == false) {
            let error = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(
                    `Your highest role must be higher than my highest role to use this command.`
                )
            return message.channel.send({ embeds: [error] })
        }
        let hided = 0
        const channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]) ||
            message.channel
        message.guild.channels.cache
            .filter((c) => c.name)
            .forEach((channel) => {
                if (channel.manageable) {
                    setTimeout(() => {
                        channel.permissionOverwrites.edit(message.guild.id, {
                            VIEW_CHANNEL: true,
                            reason: `UNHIDEALL BY ${message.author.tag} (${message.author.id})`
                        })
                    }, 5000)

                    hided++
                }
            })
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(
                        `Successfully **unhidden** ${hided} channels from this server.`
                    )
            ]
        })
    }
}
