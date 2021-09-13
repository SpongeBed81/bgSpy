const discord = require("discord.js")
const client = new discord.Client()
const config = require("./bgSpyConfig.json")
const puppeteer = require("puppeteer")

client.on("ready", () => {
    console.log("bgSpy is now ACTIVATED!")
    client.user.setPresence({activity: {name: "you!", type: "WATCHING"}, status: "dnd"})
})

var firecount = 0
client.on('presenceUpdate', async(oldPresence, newPresence) => {
    //presence update is firing twice for some reason this code will handle this
    if(firecount == 1) {
        firecount = 0
    } else {
        firecount++
        if(newPresence.user.id == config.targetId) {
            if(config.allowChromium == true) {
                client.user.setPresence({activity: {name: "Launching Puppeteer...", type: "WATCHING"}, status: "dnd"})
                 await puppeteer.launch({headless: false}) //launch chromium 
            }
            if(config.allowDirectMessages == true) {


                var currentdate = new Date(); 
                var datetime = currentdate.getDate() + "/"
                                + (currentdate.getMonth()+1)  + "/" 
                                + currentdate.getFullYear() + " | "  
                                + currentdate.getHours() + ":"  
                                + currentdate.getMinutes() + ":" 
                                + currentdate.getSeconds();

                const alertembed = new discord.MessageEmbed()
                .setAuthor("⚠ Alert!")
                .setDescription(`**The Target Became Online!**
                
                Target ID: ${config.targetId}
                Time: ${datetime}
                `)
                .setColor("YELLOW")

           

                client.users.cache.get(config.yourDiscordId).send(alertembed).catch(() => {
                    console.log("I couldn't send messages to your Discord account. That's because you've probably turned off your DM's")
                })
            }
              async function sarbasa() {
                await client.user.setPresence({activity: {name: "Puppeteer is opened!", type: "WATCHING"}, status: "dnd"})
                setTimeout(async () => {
                    await client.user.setPresence({activity: {name: "I am starring at you ಠ_ಠ", type: "WATCHING"}, status: "dnd"}) 
                    setTimeout(async () => {
                        await client.user.setPresence({activity: {name: "I don't think this part type something that make sense lmao", type: "WATCHING"}, status: "dnd"})       
                        setTimeout(async () => {
                            sarbasa() //calling the function inside it aka "recursive"
                        }, 5000);                  
                    }, 5000);                   
                }, 5000);
              }
              sarbasa()
        }
    }
});




client.login(config.token)
