module.exports={
     gameOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Кнопка 1', callback_data: '1' }, { text: 'Кнопка 8', callback_data: '8' }, { text: 'Кнопка 9', callback_data: '9' }],
                [{ text: 'Кнопка 4', callback_data: '4' }, { text: 'Кнопка 5', callback_data: '5' }, { text: 'Кнопка 6', callback_data: '6' }],
                [{ text: 'Кнопка 7', callback_data: '7' }, { text: 'Кнопка 2', callback_data: '2' }, { text: 'Кнопка 3', callback_data: '3' }],
                [{ text: 'Кнопка 0', callback_data: '0' }],
            ]
        })
    },
     newGameOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Новая игра', callback_data: '/game' }],
            ]
        })
    }
}