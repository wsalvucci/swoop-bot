const bot = require('../bot')
const fetch = require('node-fetch')
const Discord = require('discord.js')
const moment = require('moment')

function getRLSchedule(game, team, loveHonor) {
    return new Promise(function(resolve, reject) {
        //Implement backend for getting schedule
        var url = new URL('http://127.0.0.1:5000/schedules/rl')
        var params = {
            team: team,
            subteam: loveHonor
        }
        url.search = new URLSearchParams(params)
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            resolve(data['data'])
        })
    })
}

bot.on('message', msg => {
    var msgParts = msg.content.split(' ')
    if (msgParts[0] === '!!schedule') {
        switch(msgParts[1]) {
            case 'rl':
                switch(msgParts[2]) {
                    case 'varsity':
                        switch(msgParts[3]) {
                            case 'love':
                                getRLSchedule('rl', 'varsity', 'love').then((data) => {
                                    var embedData = {
                                        'title': 'Rocket League Varsity Love Schedule',
                                        'author': 'Swoop Bot',
                                        'fields': []
                                    }
                                    var embedResponse = new Discord.RichEmbed(embedData)
                                    data.forEach(game => {
                                        embedResponse.addField(moment.unix(game['date_time']).format('ddd MMM Do hh:mma'), game['opponent'], false)
                                    });
                                    msg.reply(embedResponse).catch((e) => {console.error(e)})
                                }).catch((e) => {console.error(e)})
                                break;
                            case 'honor':
                                getRLSchedule('rl', 'varsity', 'honor').then((data) => {
                                    var embedData = {
                                        'title': 'Rocket League Varsity Honor Schedule',
                                        'author': 'Swoop Bot',
                                        'fields': []
                                    }
                                    var embedResponse = new Discord.RichEmbed(embedData)
                                    data.forEach(game => {
                                        embedResponse.addField(moment.unix(game['date_time']).format('ddd MMM Do hh:mma'), game['opponent'], false)
                                    });
                                    msg.reply(embedResponse).catch((e) => {console.error(e)})
                                }).catch((e) => {console.error(e)})
                                break;
                            default:
                                msg.reply('Pick either `love` or `honor`').catch((e) => {console.error(e)})
                        }
                        break;
                    case 'jv':
                        switch(msgParts[3]) {
                            case 'love':
                                getRLSchedule('rl', 'jv', 'love').then(msg.reply('(Varsity Love RL Schedule Here)').catch((e) => {console.error(e)}))
                                break;
                            case 'honor':
                                getRLSchedule('rl', 'jv', 'honor').then(msg.reply('(Varsity Honor RL Schedule Here)').catch((e) => {console.error(e)}))
                                break;
                            default:
                                msg.reply('Pick either `love` or `honor`').catch((e) => {console.error(e)})
                        }
                        break;
                    default:
                        msg.reply('Team not specified or recognized').catch((e) => {console.error(e)})
                        break;
                }
                break;
            default:
                msg.reply('Game not specified or recognized').catch((e) => {console.error(e)})
                break;
        }
    }
})