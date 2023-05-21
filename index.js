require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

app.post(URI, async (req, res) => {
    console.log(req.body)

    const chatId = req.body.message.chat.id
    const text = req.body.message.text
    let message = '';
    message = 'HI!!! how are you? My name is Alger and I provide professional software development services. What would you like to avail? Tap or Click the options. \n1. /WebsiteDevelopment\n2. /MobileAppDevelopment\n3. /UIDesign'

    if (text === `/WebsiteDevelopment`) {
        message = 'Fully functional, a stunning website for everyone. My service delivers exactly what you need for your business. It provides credibility, accessibility, and showcasing your products and services.';
    }else if (text === `/MobileAppDevelopment`) {
        message = 'Using up to date technologies for mobile app development. I help companies reach customers on smaller devices and utilize mobile features to keep your customers engaged.';
    }else if (text === `/UIDesign`) {
        message = 'Fresh ideas and countless resources for inspiration. I create designs with a customer mindset. I will make sure that your website will not only look great but is also convertible.';
    }
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: message, 
    })
    return res.send()
})

app.listen(process.env.PORT || 3000, async () => {
    console.log('🚀 app running on port', process.env.PORT || 5000)
    await init()
})