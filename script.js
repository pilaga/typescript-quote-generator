const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loaderContainer = document.getElementById('loader');

let apiQuotes = [];

//show loading
function dataLoading() {
    loaderContainer.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function dataComplete() {
    loaderContainer.hidden = true;
    quoteContainer.hidden = false;
}

//show new quote
function showNewQuote() {
    dataLoading();
    
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //handle author text
    if(!quote.author){
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }    

    //handle quote text 
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;

    dataComplete();
}

//get quotes from API
async function getQuotes() {
    dataLoading();
    const apiUrl = 'https:/type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
    } catch (error) {}
}

//tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', showNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onload
getQuotes();


