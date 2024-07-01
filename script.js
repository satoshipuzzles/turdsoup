const defaultNouns = ["dog", "car", "tree", "house", "book"];
const defaultVerbs = ["run", "jump", "swim", "read", "write", "sing", "dance", "eat", "drink", "sleep", "play", "work", "cook", "clean", "drive", "fly", "walk", "talk", "listen", "watch", "paint", "draw", "build", "climb", "dig", "sew", "knit", "shop", "buy", "sell", "teach", "learn", "study", "grow", "plant", "harvest", "hunt", "fish", "ride", "skate", "surf", "ski", "dive", "jog", "hike", "sail", "row", "bake", "fix", "mend", "code", "design", "invent", "discover", "explore", "create", "imagine", "dream", "plan", "organize", "manage", "lead", "follow", "support", "help", "assist", "guide", "protect", "save", "heal", "care", "nurture", "train", "coach", "advise", "consult", "develop", "improve", "enhance", "upgrade", "repair", "maintain", "build", "construct", "demolish", "destroy", "attack", "defend", "fight", "battle", "compete", "win", "lose", "draw", "tie", "score", "hit", "catch", "throw", "kick", "shoot", "pass", "dribble", "tackle", "block", "serve", "spike", "volley", "lift", "push", "pull", "carry", "hold", "grip", "grasp", "grab", "clutch", "release", "drop", "throw", "fling", "toss", "catch", "trap", "capture", "seize", "snatch", "pick", "pluck", "pull", "tug", "drag", "haul", "lift", "hoist", "raise", "lower", "descend", "climb", "scale", "ascend", "mount", "dismount", "jump", "leap", "spring", "bounce", "hop", "skip", "vault", "somersault", "roll", "tumble", "spin", "twist", "turn", "rotate", "revolve", "pivot", "swivel", "swing", "oscillate", "vibrate", "shake", "tremble", "shiver", "quake", "quiver", "rattle", "hum", "buzz", "whisper", "murmur", "mutter", "mumble", "speak", "talk", "chat", "converse", "discuss", "debate", "argue", "shout", "yell", "scream", "shriek", "bellow", "roar", "howl", "whine", "whimper", "cry", "sob", "weep", "laugh", "giggle", "chuckle", "snicker", "snort", "cough", "sneeze", "hiccup", "gasp", "pant", "breathe", "inhale", "exhale", "sigh", "yawn", "chew", "bite", "nibble", "lick", "sip", "gulp", "swallow", "choke", "spit", "drool", "slurp", "suck", "blow", "kiss", "hug", "embrace", "pat", "stroke", "caress", "tap", "knock", "pound", "thump", "slap", "punch", "kick", "stomp", "trample", "crush", "smash", "break", "shatter", "split", "crack", "tear", "rip", "slice", "cut", "chop", "hack", "saw", "carve", "whittle", "shave", "trim", "prune", "clip", "shear", "snip", "scrape", "scratch", "rub", "polish", "buff", "shine", "clean", "wash", "rinse", "scrub", "mop", "sweep", "dust", "wipe", "vacuum", "suck", "spray", "squirt", "drench", "soak", "wet", "damp", "moisten", "dry", "bake", "roast", "grill", "fry", "boil", "steam", "poach", "simmer", "stew", "broil", "toast", "microwave", "blend", "mix", "stir", "whisk", "beat", "knead", "roll", "flatten", "shape", "mold", "form", "press", "stuff", "fill", "cram", "pack", "load", "stack", "arrange", "organize", "sort", "classify", "categorize", "label", "tag", "mark", "brand", "stamp", "seal", "lock", "unlock", "open", "close", "shut", "latch", "bolt", "bar", "fasten", "secure", "tie", "bind", "wrap", "unwind", "untie", "loosen", "tighten", "fix", "repair", "mend", "patch", "restore", "renew", "revive", "refurbish", "renovate", "rebuild", "reconstruct", "remodel", "redesign", "redevelop", "revamp", "modernize", "update", "upgrade", "improve", "enhance", "boost", "increase", "expand", "extend", "broaden", "widen", "lengthen", "shorten", "narrow", "decrease", "reduce", "cut", "trim", "shrink", "compress", "compact", "condense", "simplify", "streamline", "revise", "edit", "alter", "change", "modify", "transform", "convert", "adapt", "adjust", "customize", "personalize", "tailor", "fit", "suit", "match", "complement", "contrast", "compare", "contrast", "distinguish", "differentiate", "identify", "recognize", "detect", "notice", "observe", "spot", "locate", "find", "discover", "uncover", "reveal", "expose", "disclose", "unveil", "announce", "declare", "proclaim", "pronounce", "state", "assert", "claim", "allege", "maintain", "affirm", "confirm", "verify", "validate", "certify", "attest", "prove", "demonstrate", "show", "illustrate", "explain", "clarify", "expound", "elaborate", "describe", "depict", "portray", "represent", "define", "outline", "summarize", "recap", "repeat", "reiterate", "echo", "emphasize", "highlight", "underline", "stress", "point", "indicate", "signal", "suggest", "imply", "hint", "insinuate", "insist", "urge", "advocate", "recommend", "advise", "counsel", "guide", "direct", "lead", "steer", "navigate", "pilot", "drive", "control", "operate", "handle", "manipulate", "maneuver", "move", "shift", "slide", "glide", "skid", "slip", "slither", "crawl", "creep", "walk", "march", "strut", "stroll", "saunter", "stride", "amble", "trudge", "plod", "tread", "climb", "scale", "ascend", "descend", "jump", "leap", "spring", "bounce", "hop", "skip", "vault", "somersault", "flip", "tumble", "roll", "spin", "twist", "turn", "rotate", "revolve", "pivot", "swivel", "swing", "oscillate", "vibrate", "shake", "tremble", "quiver", "shiver", "rattle", "hum", "buzz", "whisper", "murmur", "mutter", "mumble", "speak", "talk", "chat", "converse", "discuss", "debate", "argue", "shout", "yell", "scream", "shriek", "bellow", "roar", "howl", "whine", "whimper", "cry", "sob", "weep", "laugh", "giggle", "chuckle", "snicker", "snort", "cough", "sneeze", "hiccup", "gasp", "pant", "breathe", "inhale", "exhale", "sigh", "yawn", "chew", "bite", "nibble", "lick", "sip", "gulp", "swallow", "choke", "spit", "drool", "slurp", "suck", "blow", "kiss", "hug", "embrace", "pat", "stroke", "caress", "tap", "knock", "pound", "thump", "slap", "punch", "kick", "stomp", "trample", "crush", "smash", "break", "shatter", "split", "crack", "tear", "rip", "slice", "cut", "chop", "hack", "saw", "carve", "whittle", "shave", "trim", "prune", "clip", "shear", "snip", "scrape", "scratch", "rub", "polish", "buff", "shine", "clean", "wash", "rinse", "scrub", "mop", "sweep", "dust", "wipe", "vacuum", "suck", "spray", "squirt", "drench", "soak", "wet", "damp", "moisten", "dry", "bake", "roast", "grill", "fry", "boil", "steam", "poach", "simmer", "stew", "broil", "toast", "microwave", "blend", "mix", "stir", "whisk", "beat", "knead", "roll", "flatten", "shape", "mold", "form", "press", "stuff", "fill", "cram", "pack", "load", "stack", "arrange", "organize", "sort"];
const defaultAdjectives = ["happy", "sad", "fast", "slow", "bright"];

let customWordLists = JSON.parse(localStorage.getItem('customWordLists')) || [
    { name: 'Default Nouns', words: defaultNouns, color: '#6FEF65' },
    { name: 'Default Verbs', words: defaultVerbs, color: '#EE00F8' },
    { name: 'Default Adjectives', words: defaultAdjectives, color: '#3576F6' }
];

let selectedNumber = 0;
let selectedLists = [];
let currentWord = 0;
let selectedColor = '#6FEF65';  // Default color

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
                <div class="word-list" style="background-color: ${list.color};">
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
        customWordLists.push({ name: listName, words, color: selectedColor });
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

function selectColor(color) {
    selectedColor = color;
    alert(`Selected color: ${color}`);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
