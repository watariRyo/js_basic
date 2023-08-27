const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
const toggleButton = () => {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
    VoiceRSS.speech({
        key: '<API Key>',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

const getJokes = async() => {
    let joke = '';

    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try {
        // Disable Button
        toggleButton();
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
    } catch (error) {
        // Catch Errors Here
        console.log('whoops', error)
        // Enabled Button
        toggleButton();
    }
}

// Event Listners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
