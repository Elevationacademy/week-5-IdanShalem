$.get('/randomWord', function (word) {
    $.get(`/synonyms/${word}`, function (synonyms) {
        $.get(`/sentiment/${word}`, function (sentiment) {
            console.log(`
            The word ${word} has a 
            ${sentiment === 1 ? "Positive" : sentiment === -1 ? "Negative" : "Neutral"} sentiment,
            its synonyms are: ${synonyms}`)
        })
    })
})

$.get('/randomWord') 
    .then(function(word){
        console.log(word)
    })

$.get('/sentiment/Ploy')
    .then(function(sent){
        console.log(sent)
    })

$.get('/randomWord')
    .then(function (word) {
        return $.get(`/synonyms/${word}`)
    })
    .then(function (synonyms) {
        console.log(synonyms)
    })
const printResults = function (word, synonyms, sentiment) {
    console.log(`
        The word ${word} has a 
        ${sentiment === 1 ? "Positive" : sentiment === -1 ? "Negative" : "Neutral"} sentiment,
        its synonyms are: ${synonyms}`
    )
}

$.get('/randomWord')
    .then(function (word) {
        let synonymsPromise = $.get(`/synonyms/${word}`)
        let sentimentPromise = $.get(`/sentiment/${word}`)
        Promise.all([synonymsPromise, sentimentPromise])
            .then(function (results) {
                printResults(word, results[0], results[1])
            })
    })

$.get('randomWord')
    .then(function(word) {
        let giphyPromise = $.get(`https://api.giphy.com/v1/gifs/search?api_key=GBYLPaC6wi5ewmHAkiKK2MYraKvHpYa5&q=terms:${word}`)
        let bookPromise = $.get(`https://www.googleapis.com/books/v1/volumes?q=title:${word}`)
        Promise.all([giphyPromise, bookPromise])
            .then(function(results){
                $('body').append(`<h1>${results[1].items[Math.floor(Math.random() * 10)].volumeInfo.title}</h1>
                <iframe src=${results[0].data[Math.floor(Math.random() * 50)].embed_url}></iframe>`)
            })
    })
