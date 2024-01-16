const TelegramApi = require('node-telegram-bot-api')
const {gameOptions,newGameOptions} = require('./options')

const token = '6887504578:AAEHmJTsIJboaRogSNChST0DVj-EiLputQE'

let chats = {}



// const gameOptions = {
//     reply_markup: JSON.stringify({
//         inline_keyboard: [
//             [{ text: 'Кнопка 1', callback_data: '1' }, { text: 'Кнопка 8', callback_data: '8' }, { text: 'Кнопка 9', callback_data: '9' }],
//             [{ text: 'Кнопка 4', callback_data: '4' }, { text: 'Кнопка 5', callback_data: '5' }, { text: 'Кнопка 6', callback_data: '6' }],
//             [{ text: 'Кнопка 7', callback_data: '7' }, { text: 'Кнопка 2', callback_data: '2' }, { text: 'Кнопка 3', callback_data: '3' }],
//             [{ text: 'Кнопка 0', callback_data: '0' }],
//         ]
//     })
// }
// const newGameOptions = {
//     reply_markup: JSON.stringify({
//         inline_keyboard: [
//             [{ text: 'Новая игра', callback_data: '/game' }],
//         ]
//     })
// }

const bot = new TelegramApi(token, { polling: true })
// bot.on('message',

//     eve => console.log(eve))
const startGame = async (chatId) => {
   
            await bot.sendMessage(chatId, 'Я загадаю число от 0-9 , угадай его)')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = `${randomNumber}`
            await bot.sendMessage(chatId, `отгадывай`, gameOptions)
            // return bot.sendMessage(chatId, `отгадывай`, gameOptions)
            // text !== '/start' &&bot.sendMessage(chatId , `Ты написал ${text}`)
        
}

bot.setMyCommands([
    { command: '/start', description: 'Начало работы' },
    { command: '/game', description: 'игра' },
    { command: '/info', description: 'Получение информаци' }
])



const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        const userName = msg.from.first_name


        if (text === '/start') return bot.sendMessage(chatId, `Добро пожаловать в мир текстовых квестов!
         Тут ты сможешь поиграть или создать что то своё!`)

        if (text === '/info') return bot.sendMessage(chatId, `Тебя зовут ${userName}`)
        if (text === '/game') {
            return startGame(chatId)
            // await bot.sendMessage(chatId, 'Я загадаю число от 0-9 , угадай его)')
            // const randomNumber = Math.floor(Math.random() * 10)
            // chats[chatId] = `${randomNumber}`
            // return bot.sendMessage(chatId, `отгадывай`, gameOptions)
            // text !== '/start' &&bot.sendMessage(chatId , `Ты написал ${text}`)
        }
        return bot.sendMessage(chatId, 'я тебя не понимать')

    })
    bot.on('callback_query',
        async res => {
            const data = res.data
            // const text = res.text
            const chatId = res.message.chat.id
            console.log(data === chats[chatId], typeof data, typeof `${chats[chatId]}`)
            if (data === '/game') {
              return  startGame(chatId)
                // await bot.sendMessage(chatId, 'Я загадаю число от 0-9 , угадай его)')
                // const randomNumber = Math.floor(Math.random() * 10)
                // chats[chatId] = `${randomNumber}`
                // return bot.sendMessage(chatId, `отгадывай`, gameOptions)
                // text !== '/start' &&bot.sendMessage(chatId , `Ты написал ${text}`)
            }
            if (data === chats[chatId]) {
                return await bot.sendMessage(chatId, `Ухты угадал ${chats[chatId]}`, newGameOptions)
            } else {
                return await bot.sendMessage(chatId, `Ухты не угадал ${chats[chatId]}`, newGameOptions)

            }
            // bot.sendMessage(chatId, `Кнопка ${data} ${chats[chatId]}`)
        })
}
start()