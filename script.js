const defaultNouns = ["dog", "car", "tree", "house", "book"];
const defaultVerbs = ["run", "jump", "swim", "read", "write"];
const defaultAdjectives = ["happy", "sad", "fast", "slow", "bright"];

let customWordLists = JSON.parse(localStorage.getItem('customWordLists')) || [
    { name: 'Default Nouns', words: defaultNouns },
    { name: 'Default Verbs', words: defaultVerbs },
    { name: 'Default Adjectives', words: defaultAdjectives }
];

let selectedNumber = 0;
let selectedLists = [];
let currentWord = 0;

function showWordListManager() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('wordListManager').classList.remove('hidden');
    displayUserWordLists();
}

function displayUserWordLists() {
    const userWordLists = document.getElementById('userWordLists');
    userWordLists.innerHTML = '';

    if (customWordLists.length === 0) {
        userWordLists.innerHTML = '<p>No custom lists available. Using default lists.</p>';
    } else {
        customWordLists.forEach((list, index) => {
            userWordLists.innerHTML += `
                <div class="word-list">
                    <strong>${list.name}</strong>
                    <p>${list.words.join(', ')}</p>
                    <button onclick="deleteWordList(${index})">Delete</button>
                </div>
            `;
        });
    }
}

function saveCustomWords() {
    const listName = document.getElementById('listName').value;
    const words = document.getElementById('customWords').value.split(',').map(word => word.trim());

    if (listName && words.length > 0) {
        customWordLists.push({ name: listName, words });
        localStorage.setItem('customWordLists', JSON.stringify(customWordLists));
        document.getElementById('listName').value = '';
        document.getElementById('customWords').value = '';
        displayUserWordLists();
        alert('Word list saved!');
    } else {
        alert('Please enter a list name and words.');
    }
}

function deleteWordList(index) {
    customWordLists.splice(index, 1);
    localStorage.setItem('customWordLists', JSON.stringify(customWordLists));
    displayUserWordLists();
}

function backToDashboard() {
    document.getElementById('wordListManager').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

function startInversePrompt() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
}

function selectNumber(number) {
    selectedNumber = number;
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    populateListOptions();
}

function populateListOptions() {
    const listOptions = document.getElementById('listOptions');
    listOptions.innerHTML = '';

    for (let i = 0; i < selectedNumber; i++) {
        listOptions.innerHTML += `<p>Select list for word ${i + 1}:</p>`;
        customWordLists.forEach((list, index) => {
            listOptions.innerHTML += `<button class="option" onclick="selectList(${index})">${list.name}</button>`;
        });
    }
}

function selectList(index) {
    selectedLists.push(customWordLists[index]);
    currentWord++;

    if (currentWord < selectedNumber) {
        populateListOptions();
    } else {
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step3').classList.remove('hidden');
    }
}

function getRandomWords(arr, count) {
    let result = [];
    for (let i = 0; i < count; i++) {
        result.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    return result;
}

function generateWords() {
    let words = [];

    selectedLists.forEach(list => {
        words.push(getRandomWords(list.words, 1)[0]);
    });

    document.getElementById('result').innerText = `Generated Words: ${words.join(', ')}`;
    document.getElementById('result').classList.remove('hidden');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
