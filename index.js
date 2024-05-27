const wait = require('wait')
require('dotenv').config()
require('module-alias/register')
const path = require('path')
const PreciX = require(`./structures/PreciX.js`)
const client = new PreciX()
this.config = require(`./config.json`);
(async () => {
    await client.initializeMongoose()
    await client.initializedata()
    await wait(3000);
    (await client.loadEvents()) - (await client.loadlogs())
    await client.loadMain()
    await client.login(this.config.TOKEN)

})()
