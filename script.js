const defaultNouns = ["dog", "car", "tree", "house", "book", "apple", "book", "car", "dog", "elephant", "flower", "guitar", "house", "island", "jacket", "kite", "lamp", "mountain", "notebook", "ocean", "pencil", "queen", "robot", "sandwich", "tree", "umbrella", "violin", "window", "xylophone", "yogurt", "zebra", "airplane", "balloon", "cat", "diamond", "egg", "fish", "gift", "hat", "igloo", "jungle", "key", "lemon", "monkey", "nest", "orange", "penguin", "quill", "rainbow", "sun", "train", "unicorn", "vase", "whale", "x-ray", "yo-yo", "zoo", "anchor", "bridge", "camera", "donut", "envelope", "flag", "globe", "hammer", "ice", "jelly", "koala", "lion", "moon", "needle", "octopus", "pizza", "quilt", "rocket", "star", "table", "urchin", "volcano", "wheel", "xerox", "yarn", "zipper", "artist", "baker", "chef", "doctor", "engineer", "farmer", "gardener", "hero", "inventor", "judge", "king", "lawyer", "magician", "nurse", "officer", "painter", "queen", "racer", "scientist", "teacher", "umpire", "violinist", "writer", "xylophonist", "yogi", "zoologist", "accordion", "banjo", "cello", "drum", "flute", "guitar", "harp", "instrument", "jukebox", "keyboard", "lute", "mandolin", "note", "organ", "piano", "quartet", "rhythm", "saxophone", "trumpet", "ukulele", "voice", "whistle", "xylophone", "yell", "zither", "algebra", "biology", "chemistry", "drama", "english", "french", "geography", "history", "italian", "journalism", "karate", "literature", "math", "nutrition", "orchestra", "physics", "quiz", "reading", "science", "technology", "underwater", "vocabulary", "writing", "xerox", "yoga", "zoology", "art", "biology", "chemistry", "dance", "english", "film", "geometry", "history", "italian", "jazz", "kindergarten", "linguistics", "math", "neuroscience", "opera", "philosophy", "quiz", "reading", "sculpture", "theater", "uniform", "video", "writing", "xerox", "yarn", "zoo", "apple", "banana", "cherry", "date", "eggplant", "fig", "grape", "honeydew", "ice", "jackfruit", "kiwi", "lemon", "mango", "nectarine", "olive", "peach", "quince", "raspberry", "strawberry", "tomato", "ugli", "vegetable", "watermelon", "xigua", "yam", "zucchini", "armchair", "bed", "chair", "desk", "easel", "fan", "grill", "hammock", "iron", "jug", "kettle", "lamp", "mirror", "nightstand", "ottoman", "pillow", "quilt", "rug", "sofa", "table", "umbrella", "vase", "wardrobe", "xylophone", "yarn", "zipper", "apricot", "blueberry", "cantaloupe", "durian", "elderberry", "feijoa", "guava", "huckleberry", "imbe", "jabuticaba", "kumquat", "lychee", "mulberry", "nance", "oroblanco", "papaya", "rambutan", "soursop", "tamarillo", "ugni", "voavanga", "wampee", "ximenia", "yellow", "zucchini", "attic", "basement", "closet", "door", "elevator", "floor", "garage", "hall", "island", "kitchen", "laundry", "mudroom", "nursery", "office", "pantry", "quilt", "roof", "staircase", "terrace", "utility", "veranda", "window", "xylophone", "yard", "zoo", "acorn", "branch", "cactus", "daffodil", "elm", "fern", "garden", "hedge", "ivy", "juniper", "kale", "lily", "moss", "nettle", "oak", "pine", "quince", "rose", "shrub", "tulip", "underbrush", "vine", "weed", "xylem", "yarrow", "zinnia", "airplane", "boat", "car", "drone", "elevator", "ferry", "glider", "helicopter", "icebreaker", "jet", "kayak", "limousine", "motorcycle", "navy", "oceanliner", "plane", "quadcopter", "rocket", "submarine", "train", "unicycle", "van", "wagon", "xebec", "yacht", "zeppelin", "artist", "banker", "chef", "dancer", "engineer", "firefighter", "gardener", "hairdresser", "inspector", "jockey", "locksmith", "musician", "nurse", "operator", "photographer", "quarterback", "realtor", "scientist", "teacher", "umpire", "veterinarian", "waiter", "x-ray", "yogi", "zookeeper", "apple", "book", "car", "dog", "elephant", "flower", "guitar", "house", "island", "jacket", "kite", "lamp", "mountain", "notebook", "ocean", "pencil", "queen", "robot", "sandwich", "tree", "umbrella", "violin", "window", "xylophone", "yogurt", "zebra", "airplane", "balloon", "cat", "diamond", "egg", "fish", "gift", "hat", "igloo", "jungle", "key", "lemon", "monkey", "nest", "orange", "penguin", "quill", "rainbow", "sun", "train", "unicorn", "vase", "whale", "x-ray", "yo-yo", "zoo", "anchor", "bridge", "camera", "donut", "envelope", "flag", "globe", "hammer", "ice", "jelly", "koala", "lion", "moon", "needle", "octopus", "pizza", "quilt", "rocket", "star", "table", "urchin", "volcano", "wheel", "xerox", "yarn", "zipper", "artist", "baker", "chef", "doctor", "engineer", "farmer", "gardener", "hero", "inventor", "judge", "king", "lawyer", "magician", "nurse", "officer", "painter", "queen", "racer", "scientist", "teacher", "umpire", "violinist", "writer", "xylophonist", "yogi", "zoologist", "accordion", "banjo", "cello", "drum", "flute", "guitar", "harp", "instrument", "jukebox", "keyboard", "lute", "mandolin", "note", "organ", "piano", "quartet", "rhythm", "saxophone", "trumpet", "ukulele", "voice", "whistle", "xylophone", "yell", "zither", "algebra", "biology", "chemistry", "drama", "english", "french", "geography", "history", "italian", "journalism", "karate", "literature", "math", "nutrition", "orchestra", "physics", "quiz", "reading", "science", "technology", "underwater", "vocabulary", "writing", "xerox", "yoga", "zoology", "art", "biology", "chemistry", "dance", "english", "film", "geometry", "history", "italian", "jazz", "kindergarten", "linguistics", "math", "neuroscience", "opera", "philosophy", "quiz", "reading", "sculpture", "theater", "uniform", "video", "writing", "xerox", "yarn", "zoo", "apple", "banana", "cherry", "date", "eggplant", "fig", "grape"];
const defaultVerbs = ["run", "jump", "swim", "read", "write", "sing", "dance", "eat", "drink", "sleep", "play", "work", "cook", "clean", "drive", "fly", "walk", "talk", "listen", "watch", "paint", "draw", "build", "climb", "dig", "sew", "knit", "shop", "buy", "sell", "teach", "learn", "study", "grow", "plant", "harvest", "hunt", "fish", "ride", "skate", "surf", "ski", "dive", "jog", "hike", "sail", "row", "bake", "fix", "mend", "code", "design", "invent", "discover", "explore", "create", "imagine", "dream", "plan", "organize", "manage", "lead", "follow", "support", "help", "assist", "guide", "protect", "save", "heal", "care", "nurture", "train", "coach", "advise", "consult", "develop", "improve", "enhance", "upgrade", "repair", "maintain", "build", "construct", "demolish", "destroy", "attack", "defend", "fight", "battle", "compete", "win", "lose", "draw", "tie", "score", "hit", "catch", "throw", "kick", "shoot", "pass", "dribble", "tackle", "block", "serve", "spike", "volley", "lift", "push", "pull", "carry", "hold", "grip", "grasp", "grab", "clutch", "release", "drop", "throw", "fling", "toss", "catch", "trap", "capture", "seize", "snatch", "pick", "pluck", "pull", "tug", "drag", "haul", "lift", "hoist", "raise", "lower", "descend", "climb", "scale", "ascend", "mount", "dismount", "jump", "leap", "spring", "bounce", "hop", "skip", "vault", "somersault", "roll", "tumble", "spin", "twist", "turn", "rotate", "revolve", "pivot", "swivel", "swing", "oscillate", "vibrate", "shake", "tremble", "shiver", "quake", "quiver", "rattle", "hum", "buzz", "whisper", "murmur", "mutter", "mumble", "speak", "talk", "chat", "converse", "discuss", "debate", "argue", "shout", "yell", "scream", "shriek", "bellow", "roar", "howl", "whine", "whimper", "cry", "sob", "weep", "laugh", "giggle", "chuckle", "snicker", "snort", "cough", "sneeze", "hiccup", "gasp", "pant", "breathe", "inhale", "exhale", "sigh", "yawn", "chew", "bite", "nibble", "lick", "sip", "gulp", "swallow", "choke", "spit", "drool", "slurp", "suck", "blow", "kiss", "hug", "embrace", "pat", "stroke", "caress", "tap", "knock", "pound", "thump", "slap", "punch", "kick", "stomp", "trample", "crush", "smash", "break", "shatter", "split", "crack", "tear", "rip", "slice", "cut", "chop", "hack", "saw", "carve", "whittle", "shave", "trim", "prune", "clip", "shear", "snip", "scrape", "scratch", "rub", "polish", "buff", "shine", "clean", "wash", "rinse", "scrub", "mop", "sweep", "dust", "wipe", "vacuum", "suck", "spray", "squirt", "drench", "soak", "wet", "damp", "moisten", "dry", "bake", "roast", "grill", "fry", "boil", "steam", "poach", "simmer", "stew", "broil", "toast", "microwave", "blend", "mix", "stir", "whisk", "beat", "knead", "roll", "flatten", "shape", "mold", "form", "press", "stuff", "fill", "cram", "pack", "load", "stack", "arrange", "organize", "sort", "classify", "categorize", "label", "tag", "mark", "brand", "stamp", "seal", "lock", "unlock", "open", "close", "shut", "latch", "bolt", "bar", "fasten", "secure", "tie", "bind", "wrap", "unwind", "untie", "loosen", "tighten", "fix", "repair", "mend", "patch", "restore", "renew", "revive", "refurbish", "renovate", "rebuild", "reconstruct", "remodel", "redesign", "redevelop", "revamp", "modernize", "update", "upgrade", "improve", "enhance", "boost", "increase", "expand", "extend", "broaden", "widen", "lengthen", "shorten", "narrow", "decrease", "reduce", "cut", "trim", "shrink", "compress", "compact", "condense", "simplify", "streamline", "revise", "edit", "alter", "change", "modify", "transform", "convert", "adapt", "adjust", "customize", "personalize", "tailor", "fit", "suit", "match", "complement", "contrast", "compare", "contrast", "distinguish", "differentiate", "identify", "recognize", "detect", "notice", "observe", "spot", "locate", "find", "discover", "uncover", "reveal", "expose", "disclose", "unveil", "announce", "declare", "proclaim", "pronounce", "state", "assert", "claim", "allege", "maintain", "affirm", "confirm", "verify", "validate", "certify", "attest", "prove", "demonstrate", "show", "illustrate", "explain", "clarify", "expound", "elaborate", "describe", "depict", "portray", "represent", "define", "outline", "summarize", "recap", "repeat", "reiterate", "echo", "emphasize", "highlight", "underline", "stress", "point", "indicate", "signal", "suggest", "imply", "hint", "insinuate", "insist", "urge", "advocate", "recommend", "advise", "counsel", "guide", "direct", "lead", "steer", "navigate", "pilot", "drive", "control", "operate", "handle", "manipulate", "maneuver", "move", "shift", "slide", "glide", "skid", "slip", "slither", "crawl", "creep", "walk", "march", "strut", "stroll", "saunter", "stride", "amble", "trudge", "plod", "tread", "climb", "scale", "ascend", "descend", "jump", "leap", "spring", "bounce", "hop", "skip", "vault", "somersault", "flip", "tumble", "roll", "spin", "twist", "turn", "rotate", "revolve", "pivot", "swivel", "swing", "oscillate", "vibrate", "shake", "tremble", "quiver", "shiver", "rattle", "hum", "buzz", "whisper", "murmur", "mutter", "mumble", "speak", "talk", "chat", "converse", "discuss", "debate", "argue", "shout", "yell", "scream", "shriek", "bellow", "roar", "howl", "whine", "whimper", "cry", "sob", "weep", "laugh", "giggle", "chuckle", "snicker", "snort", "cough", "sneeze", "hiccup", "gasp", "pant", "breathe", "inhale", "exhale", "sigh", "yawn", "chew", "bite", "nibble", "lick", "sip", "gulp", "swallow", "choke", "spit", "drool", "slurp", "suck", "blow", "kiss", "hug", "embrace", "pat", "stroke", "caress", "tap", "knock", "pound", "thump", "slap", "punch", "kick", "stomp", "trample", "crush", "smash", "break", "shatter", "split", "crack", "tear", "rip", "slice", "cut", "chop", "hack", "saw", "carve", "whittle", "shave", "trim", "prune", "clip", "shear", "snip", "scrape", "scratch", "rub", "polish", "buff", "shine", "clean", "wash", "rinse", "scrub", "mop", "sweep", "dust", "wipe", "vacuum", "suck", "spray", "squirt", "drench", "soak", "wet", "damp", "moisten", "dry", "bake", "roast", "grill", "fry", "boil", "steam", "poach", "simmer", "stew", "broil", "toast", "microwave", "blend", "mix", "stir", "whisk", "beat", "knead", "roll", "flatten", "shape", "mold", "form", "press", "stuff", "fill", "cram", "pack", "load", "stack", "arrange", "organize", "sort"];
const defaultAdjectives = ["happy", "sad", "angry", "excited", "nervous", "calm", "brave", "scared", "tall", "short", "big", "small", "fast", "slow", "loud", "quiet", "bright", "dark", "hot", "cold", "warm", "cool", "smooth", "rough", "soft", "hard", "wet", "dry", "clean", "dirty", "fresh", "stale", "old", "new", "young", "ancient", "modern", "rich", "poor", "strong", "weak", "smart", "dumb", "kind", "mean", "funny", "serious", "beautiful", "ugly", "handsome", "plain", "pretty", "lovely", "cute", "charming", "graceful", "elegant", "clumsy", "awkward", "polite", "rude", "friendly", "unfriendly", "honest", "dishonest", "trustworthy", "untrustworthy", "loyal", "disloyal", "faithful", "unfaithful", "brilliant", "dull", "creative", "uncreative", "talented", "untalented", "skillful", "unskillful", "experienced", "inexperienced", "wise", "foolish", "intelligent", "stupid", "genius", "idiotic", "humble", "arrogant", "modest", "boastful", "proud", "shy", "confident", "insecure", "brave", "cowardly", "courageous", "timid", "fearless", "afraid", "strong", "weak", "powerful", "powerless", "energetic", "lazy", "active", "inactive", "dynamic", "passive", "hardworking", "industrious", "diligent", "careless", "neat", "messy", "organized", "disorganized", "tidy", "untidy", "clean", "dirty", "bright", "dull", "colorful", "colorless", "vibrant", "lifeless", "shiny", "dull", "glossy", "matte", "sparkling", "dim", "radiant", "gloomy", "cheerful", "depressing", "joyful", "miserable", "happy", "sad", "elated", "downcast", "optimistic", "pessimistic", "hopeful", "hopeless", "enthusiastic", "apathetic", "excited", "bored", "interested", "disinterested", "curious", "indifferent", "passionate", "uninterested", "loving", "hateful", "caring", "uncaring", "compassionate", "heartless", "sympathetic", "unsympathetic", "generous", "selfish", "selfless", "greedy", "giving", "stingy", "thoughtful", "thoughtless", "considerate", "inconsiderate", "respectful", "disrespectful", "tactful", "tactless", "diplomatic", "undiplomatic", "patient", "impatient", "understanding", "unforgiving", "forgiving", "resentful", "bitter", "grateful", "ungrateful", "thankful", "unappreciative", "appreciative", "supportive", "unsupportive", "helpful", "unhelpful", "encouraging", "discouraging", "inspiring", "uninspiring", "motivating", "demotivating", "uplifting", "depressing", "positive", "negative", "optimistic", "pessimistic", "realistic", "unrealistic", "practical", "impractical", "sensible", "foolish", "logical", "illogical", "rational", "irrational", "reasonable", "unreasonable", "fair", "unfair", "just", "unjust", "equitable", "inequitable", "balanced", "unbalanced", "impartial", "partial", "biased", "unbiased", "neutral", "prejudiced", "open-minded", "closed-minded", "tolerant", "intolerant", "accepting", "unaccepting", "inclusive", "exclusive", "open", "secretive", "transparent", "opaque", "honest", "dishonest", "truthful", "deceitful", "frank", "evasive", "direct", "indirect", "clear", "unclear", "explicit", "ambiguous", "straightforward", "complex", "simple", "complicated", "easy", "difficult", "hard", "challenging", "effortless", "strenuous", "painful", "painless", "pleasant", "unpleasant", "agreeable", "disagreeable", "enjoyable", "unenjoyable", "fun", "boring", "exciting", "dull", "interesting", "uninteresting", "fascinating", "mundane", "thrilling", "monotonous", "entertaining", "tedious", "engaging", "disengaging", "stimulating", "unstimulating", "captivating", "uninspiring", "refreshing", "tiring", "invigorating", "draining", "energizing", "exhausting", "uplifting", "depressing", "joyful", "sorrowful", "cheerful", "melancholic", "happy", "sad", "elated", "dejected", "hopeful", "hopeless", "enthusiastic", "apathetic", "excited", "unenthusiastic", "curious", "indifferent", "interested", "uninterested", "passionate", "dispassionate", "intense", "mild", "serious", "lighthearted", "grave", "frivolous", "solemn", "playful", "earnest", "joking", "sincere", "insincere", "genuine", "fake", "authentic", "inauthentic", "real", "artificial", "true", "false", "accurate", "inaccurate", "exact", "inexact", "precise", "imprecise", "correct", "incorrect", "right", "wrong", "proper", "improper", "appropriate", "inappropriate", "suitable", "unsuitable", "fitting", "unfitting", "acceptable", "unacceptable", "admissible", "inadmissible", "permissible", "impermissible", "allowable", "unallowable", "valid", "invalid", "legitimate", "illegitimate", "legal", "illegal", "lawful", "unlawful", "authorized", "unauthorized", "permitted", "forbidden", "approved", "disapproved", "sanctioned", "unsanctioned", "certified", "uncertified", "qualified", "unqualified", "competent", "incompetent", "capable", "incapable", "able", "unable", "skilled", "unskilled", "experienced", "inexperienced", "knowledgeable", "unknowledgeable", "expert", "novice", "master", "apprentice", "professional", "amateur", "adept", "inept", "proficient", "unproficient", "talented", "untalented", "gifted", "ungifted", "creative", "uncreative", "innovative", "unoriginal", "original", "derivative", "inventive", "uninventive", "imaginative", "unimaginative", "resourceful", "unresourceful", "versatile", "inflexible", "adaptable", "rigid", "flexible", "stiff", "pliable", "brittle", "durable", "fragile", "sturdy", "weak", "robust", "frail", "strong", "feeble", "resilient", "unresilient", "tenacious", "yielding", "persistent", "unrelenting", "determined", "indecisive", "decisive", "uncertain", "sure", "confident", "unsure", "bold", "timid", "fearless", "fearful", "courageous", "cowardly", "brave", "scared", "valiant", "weak", "heroic", "unheroic", "daring", "cautious", "reckless", "prudent", "rash", "careful", "careless", "meticulous", "sloppy", "neat", "messy", "tidy", "untidy", "organized", "disorganized", "orderly", "chaotic", "methodical", "haphazard", "systematic", "unsystematic", "planned", "unplanned", "structured", "unstructured", "regulated", "unregulated", "controlled", "uncontrolled", "disciplined", "undisciplined", "focused", "unfocused", "concentrated", "distracted", "attentive", "inattentive", "alert"];
const bip39SeedWords = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","actor","actress","actual","adapt","add","addict","address","adjust","admit","adult","advance","advice","aerobic","affair","afford","afraid","again","age","agent","agree","ahead","aim","air","airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost","alone","alpha","already","also","alter","always","amateur","amazing","among","amount","amused","analyst","anchor","ancient","anger","angle","angry","animal","ankle","announce","annual","another","answer","antenna","antique","anxiety","any","apart","apology","appear","apple","approve","april","arch","arctic","area","arena","argue","arm","armed","armor","army","around","arrange","arrest","arrive","arrow","art","artefact","artist","artwork","ask","aspect","assault","asset","assist","assume","asthma","athlete","atom","attack","attend","attitude","attract","auction","audit","august","aunt","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","bag","balance","balcony","ball","bamboo","banana","banner","bar","barely","bargain","barrel","base","basic","basket","battle","beach","bean","beauty","because","become","beef","before","begin","behave","behind","believe","below","belt","bench","benefit","best","betray","better","between","beyond","bicycle","bid","bike","bind","biology","bird","birth","bitter","black","blade","blame","blanket","blast","bleak","bless","blind","blood","blossom","blouse","blue","blur","blush","board","boat","body","boil","bomb","bone","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","box","boy","bracket","brain","brand","brass","brave","bread","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","broken","bronze","broom","brother","brown","brush","bubble","buddy","budget","buffalo","build","bulb","bulk","bullet","bundle","bunker","burden","burger","burst","bus","business","busy","butter","buyer","buzz","cabbage","cabin","cable","cactus","cage","cake","call","calm","camera","camp","can","canal","cancel","candy","cannon","canoe","canvas","canyon","capable","capital","captain","car","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","ceiling","celery","cement","census","century","cereal","certain","chair","chalk","champion","change","chaos","chapter","charge","chase","chat","cheap","check","cheese","chef","cherry","chest","chicken","chief","child","chimney","choice","choose","chronic","chuckle","chunk","churn","cigar","cinnamon","circle","citizen","city","civil","claim","clap","clarify","claw","clay","clean","clerk","clever","click","client","cliff","climb","clinic","clip","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","coconut","code","coffee","coil","coin","collect","color","column","combine","come","comfort","comic","common","company","concert","conduct","confirm","congress","connect","consider","control","convince","cook","cool","copper","copy","coral","core","corn","correct","cost","cotton","couch","country","couple","course","cousin","cover","coyote","crack","cradle","craft","cram","crane","crash","crater","crawl","crazy","cream","credit","creek","crew","cricket","crime","crisp","critic","crop","cross","crouch","crowd","crucial","cruel","cruise","crumble","crunch","crush","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","dad","damage","damp","dance","danger","daring","dash","daughter","dawn","day","deal","debate","debris","decade","december","decide","decline","decorate","decrease","deer","defense","define","defy","degree","delay","deliver","demand","demise","denial","dentist","deny","depart","depend","deposit","depth","deputy","derive","describe","desert","design","desk","despair","destroy","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","disease","dish","dismiss","disorder","display","distance","divert","divide","divorce","dizzy","doctor","document","dog","doll","dolphin","domain","donate","donkey","donor","door","dose","double","dove","draft","dragon","drama","drastic","draw","dream","dress","drift","drill","drink","drip","drive","drop","drum","dry","duck","dumb","dune","during","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","else","embark","embody","embrace","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlist","enough","enrich","enroll","ensure","enter","entire","entry","envelope","episode","equal","equip","era","erase","erode","erosion","error","erupt","escape","essay","essence","estate","eternal","ethics","evidence","evil","evoke","evolve","exact","example","excess","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exile","exist","exit","exotic","expand","expect","expire","explain","expose","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","faith","fall","false","fame","family","famous","fan","fancy","fantasy","farm","fashion","fat","fatal","father","fatigue","fault","favorite","feature","february","federal","fee","feed","feel","female","fence","festival","fetch","fever","few","fiber","fiction","field","figure","file","film","filter","final","find","fine","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","flag","flame","flash","flat","flavor","flee","flight","flip","float","flock","floor","flower","fluid","flush","fly","foam","focus","fog","foil","fold","follow","food","foot","force","forest","forget","fork","fortune","forum","forward","fossil","foster","found","fox","fragile","frame","frequent","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","fury","future","gadget","gain","galaxy","gallery","game","gap","garage","garbage","garden","garlic","garment","gas","gasp","gate","gather","gauge","gaze","general","genius","genre","gentle","genuine","gesture","ghost","giant","gift","giggle","ginger","giraffe","girl","give","glad","glance","glare","glass","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goddess","gold","good","goose","gorilla","gospel","gossip","govern","gown","grab","grace","grain","grant","grape","grass","gravity","great","green","grid","grief","grit","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","gun","gym","habit","hair","half","hammer","hamster","hand","happy","harbor","hard","harsh","harvest","hat","have","hawk","hazard","head","health","heart","heavy","hedgehog","height","hello","helmet","help","hen","hero","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","honey","hood","hope","horn","horror","horse","hospital","host","hotel","hour","hover","hub","huge","human","humble","humor","hundred","hungry","hunt","hurdle","hurry","hurt","husband","hybrid","ice","icon","idea","identify","idle","ignore","ill","illegal","illness","image","imitate","immense","immune","impact","impose","improve","impulse","inch","include","income","increase","index","indicate","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","injury","inmate","inner","innocent","input","inquiry","insane","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","iron","island","isolate","issue","item","ivory","jacket","jaguar","jar","jazz","jealous","jeans","jelly","jewel","job","join","joke","journey","joy","judge","juice","jump","jungle","junior","junk","just","kangaroo","keen","keep","ketchup","key","kick","kid","kidney","kind","kingdom","kiss","kit","kitchen","kite","kitten","kiwi","knee","knife","knock","know","lab","label","labor","ladder","lady","lake","lamp","language","laptop","large","later","latin","laugh","laundry","lava","law","lawn","lawsuit","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legal","legend","leisure","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","life","lift","light","like","limb","limit","link","lion","liquid","list","little","live","lizard","load","loan","lobster","local","lock","logic","lonely","long","loop","lottery","loud","lounge","love","loyal","lucky","luggage","lumber","lunar","lunch","luxury","lyrics","machine","mad","magic","magnet","maid","mail","main","major","make","mall","mammal","man","manage","mandate","mango","mansion","manual","maple","marble","march","margin","marine","market","marriage","mask","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merry","mesh","message","metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor","minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile","model","modify","mom","moment","monitor","monkey","monster","month","moon","moral","more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mule","multiply","muscle","museum","mushroom","music","must","mutual","myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature","near","neck","need","negative","neglect","neither","nephew","nerve","nest","net","network","neutral","never","news","next","nice","night","noble","noise","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe","obtain","obvious","occur","ocean","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","one","onion","online","only","open","opera","opinion","oppose","option","orange","orbit","orchard","order","ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pair","palace","palm","panda","panel","panic","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen","penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo","phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pilot","pink","pioneer","pipe","pistol","pitch","pizza","place","planet","plastic","plate","play","please","pledge","pluck","plug","plunge","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","pottery","poverty","powder","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","prison","private","prize","problem","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","punch","pupil","puppy","purchase","purity","purpose","purse","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote","rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax","release","relief","rely","remain","remember","remind","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring","riot","ripple","risk","ritual","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","rough","round","route","royal","rubber","rude","rug","rule","run","runway","rural","sad","saddle","sadness","safe","sail","salad","salmon","salon","salt","salute","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare","scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen","script","scrub","sea","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","series","service","session","settle","setup","seven","shadow","shaft","shallow","share","shed","shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot","shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick","side","siege","sight","sign","silent","silk","silly","silver","similar","simple","since","sing","siren","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide","slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke","smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sorry","sort","soul","sound","soup","source","south","space","spare","spatial","spawn","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","square","squeeze","squirrel","stable","stadium","staff","stage","stairs","stamp","stand","start","state","stay","steak","steel","stem","step","stereo","stick","still","sting","stock","stomach","stone","stool","story","stove","strategy","street","strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway","success","such","sudden","suffer","sugar","suggest","suit","summer","sun","sunny","sunset","super","supply","supreme","sure","surface","surge","surprise","surround","survey","suspect","sustain","swallow","swamp","swap","swarm","swear","sweet","swift","swing","switch","sword","symbol","symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank","tape","target","task","taste","tattoo","taxi","teach","team","tell","ten","tenant","tennis","tent","term","test","text","thank","that","theme","then","theory","there","they","thing","this","thought","three","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","tobacco","today","toddler","toe","together","toilet","token","tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple","torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy","track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray","treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy","trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition","tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","unhappy","uniform","unique","unit","universe","unknown","unlock","until","unusual","unveil","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vacant","vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast","vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage","violin","virtual","virus","visa","visit","visual","vital","vivid","vocal","voice","void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall","walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave","way","wealth","weapon","wear","weasel","weather","web","wedding","weekend","weird","welcome","west","wet","whale","what","wheat","wheel","when","where","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wood","wool","word","work","world","worry","worth","wrap","wreck","wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"]

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
