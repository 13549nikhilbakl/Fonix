const {
    EmbedBuilder,
    Message,
    ActionRowBuilder,
    ButtonBuilder,
    MessageSelectMenu,
    Client
} = require('discord.js')

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    premium: true,
    run: async (client, message, args) => {
        let prefix = await client.db.get(`prefix_${message.guild.id}`)
        const row = new ActionRowBuilder().addComponents(
            new MessageSelectMenu()
                .setCustomId('helpop')
                .setPlaceholder(`❯ ${client.user.username} Help Menu!`)
                .addOptions([
                    {
                        label: ' AntiNuke',
                        description: 'Get All AntiNuke Command List',
                        value: 'first',
                        emoji: '🛡️'
                    },
                    {
                        label: ' Moderation',
                        description: 'Get All Moderation Command List',
                        value: 'second',
                        emoji: '⚖️'
                    },
                    {
                        label: 'Utility',
                        description: 'Get All Utility Command List',
                        value: 'third',
                        emoji: '🔧'
                    },
                    {
                        label: 'Welcomer',
                        description: 'Get All Welcomer Command List',
                        value: 'fourth',
                        emoji: '👋'
                    },
                    {
                        label: 'Voice',
                        description: 'Get All Voice Command List',
                        value: 'fifth',
                        emoji: '🎙️'
                    },
                    {
                        label: 'Report',
                        description: 'Get All Report Command List',
                        value: 'sixth',
                        emoji: '📝'
                    }
                ])
        )
        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`${client.user.username} Help Menu`)
            .setDescription(
                `**Prefix for this server:** \`${prefix}\`\n**Total Commands:** \`${client.commands.size}\`\n\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/zFtprCNv)`
            )
            .addFields(
                {
                    name: '🛡️ AntiNuke',
                    value: 'Get all AntiNuke commands'
                },
                {
                    name: '⚖️ Moderation',
                    value: 'Get all Moderation commands'
                },
                {
                    name: '🔧 Utility',
                    value: 'Get all Utility commands'
                },
                {
                    name: '👋 Welcomer',
                    value: 'Get all Welcomer commands'
                },
                {
                    name: '🎙️ Voice',
                    value: 'Get all Voice commands'
                },
                {
                    name: '📝 Report',
                    value: 'Get all Report commands'
                }
            )
            .addField(
                '🤖 Client Info',
                `**Ping:** \`${client.ws.ping}ms\`\n**Servers:** \`${client.guilds.cache.size}\`\n**Users:** \`${client.users.cache.size}\`\n**Commands:** \`${client.commands.size}\``
            )
            .setFooter({
                text: 'I like ur mom',
                iconURL: client.user.displayAvatarURL()
            })

        message.channel.send({ embeds: [embed], components: [row] })
    }
}