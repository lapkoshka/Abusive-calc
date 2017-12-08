export function getUrlState() {
    const hashByWords = document.location.hash.substr(1).split(';');
    const words = [];
    hashByWords.forEach( (word, index) => {
        if (!word) {
            return;
        }
        const newWord = {};
        newWord.id = index;
        newWord.name = word;
        newWord.isPlayingNow = false;
        words.push(newWord);
    });
    return words;
};

export function setUrlState(words) {
    let newState = '';
    words.forEach( (word, index) => {
        newState = `${newState}${word.name};`;
    });
    document.location.hash = newState;
}
