let quoteContainer = document.getElementById('quote-container');
let quoteText = document.getElementById('quote');
let quoteAuthor = document.getElementById('quote-author');
let newQuoteBtn = document.getElementById('new-quote');
let twitterBtn = document.getElementById('twitter');
let loader = document.getElementById('loader');

// Loader Function
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Hide Loader animation
hideLoader();

// Array for quotes to be stored
let apiQuotes = [];

// Fetch Quote from API
async function fetchQuotes() {

    showLoader();

    const  quoteURL = 'https://type.fit/api/quotes';
    try {
        let response = await fetch(quoteURL);
        apiQuotes  = await response.json();

        newQuotes();
        hideLoader();

    } catch (error) {
        for(i= 0; i < 10; i++) {
            fetchQuotes();
        };
        }

};

// Get new random quotes from Array of quotes
function newQuotes() {

    // Generating a random number
    randomIndex = Math.floor(Math.random() * apiQuotes.length);

    // Display quotes and their Authors
    quoteText.innerHTML = apiQuotes[randomIndex]['text'];
    quoteAuthor.innerHTML = apiQuotes[randomIndex]['author'];

    // Fixing anonymous Authors to 'Unknown'
    if (!apiQuotes[randomIndex]['author']) {
        quoteAuthor.innerHTML = 'Unknown';
    }else{
        quoteAuthor.innerHTML = apiQuotes[randomIndex]['author'];
        };
}

// Share Quote via Twitter.
let tweetThis = function() {
    let tweetURL = `https://twitter.com/intent/tweet?text=${apiQuotes[randomIndex]['text']} - ${apiQuotes[randomIndex]['author']}`;
    window.open(tweetURL, '_blank');
}

// Event
newQuoteBtn.addEventListener('click', fetchQuotes);
twitterBtn.addEventListener('click', tweetThis);





