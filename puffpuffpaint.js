const { useState, useEffect, useRef } = React;
const { Card, CardContent } = {
    Card: ({ children, className }) => (
        <div className={`card ${className}`}>{children}</div>
    ),
    CardContent: ({ children, className }) => (
        <div className={`card-content ${className}`}>{children}</div>
    )
};

const Alert = ({ children, className }) => (
    <div className={`alert ${className}`}>{children}</div>
);

const AlertDescription = ({ children }) => (
    <div className="alert-description">{children}</div>
);

const PuffPuffPaint = () => {
    const [npub, setNpub] = useState(null);
    const [profile, setProfile] = useState(null);
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [replies, setReplies] = useState({});
    const [showReplyFor, setShowReplyFor] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [mentionSuggestions, setMentionSuggestions] = useState([]);
    const [showMentions, setShowMentions] = useState(false);
    const [contentWarning, setContentWarning] = useState(false);
    const [cwReason, setCwReason] = useState('');
    const mentionRef = useRef(null);

    const RELAYS = [
        'wss://relay.damus.io',
        'wss://art.nostrfreaks.com',
        'wss://relay.nostrfreaks.com'
    ];

    const SATS_API = 'https://nostur.com/zap/';

    useEffect(() => {
        checkLogin();
        fetchNotes();
    }, []);

    const checkLogin = async () => {
        const storedProfile = JSON.parse(localStorage.getItem('profile'));
        if (storedProfile) {
            setNpub(storedProfile.npub);
            setProfile(storedProfile);
        } else if (window.nostr && window.nostr.getPublicKey) {
            try {
                const userNpub = await window.nostr.getPublicKey();
                const userProfile = await fetchProfile(userNpub);
                if (userProfile) {
                    setNpub(userNpub);
                    setProfile(userProfile);
                    localStorage.setItem('profile', JSON.stringify({
                        npub: userNpub,
                        ...userProfile
                    }));
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        }
    };

    const fetchProfile = async (userNpub) => {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket('wss://relay.damus.io');
            ws.onopen = () => {
                ws.send(JSON.stringify(["REQ", "1", { kinds: [0], authors: [userNpub] }]));
            };
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data[0] === "EVENT" && data[2].content) {
                    const profile = JSON.parse(data[2].content);
                    ws.close();
                    resolve(profile);
                }
            };
            ws.onerror = (error) => reject(error);
        });
    };

    const fetchNotes = async () => {
        const fetchFromRelay = (relay) => {
            return new Promise((resolve) => {
                const ws = new WebSocket(relay);
                ws.onopen = () => {
                    ws.send(JSON.stringify([
                        "REQ",
                        "feed",
                        {
                            kinds: [1],
                            "#t": ["puffpuffpaint"],
                            limit: 50
                        }
                    ]));
                };
                ws.onmessage = async (event) => {
                    const data = JSON.parse(event.data);
                    if (data[0] === "EVENT") {
                        const note = data[2];
                        await fetchReplies(note.id);
                        setNotes(prev => {
                            const exists = prev.some(n => n.id === note.id);
                            if (!exists) {
                                return [...prev, note].sort((a, b) => b.created_at - a.created_at);
                            }
                            return prev;
                        });
                    }
                };
                setTimeout(() => {
                    ws.close();
                    resolve();
                }, 3000);
            });
        };

        await Promise.all(RELAYS.map(fetchFromRelay));
    };

    const fetchReplies = async (noteId) => {
        const fetchFromRelay = (relay) => {
            return new Promise((resolve) => {
                const ws = new WebSocket(relay);
                ws.onopen = () => {
                    ws.send(JSON.stringify([
                        "REQ",
                        `replies-${noteId}`,
                        {
                            kinds: [1],
                            "#e": [noteId],
                            limit: 10
                        }
                    ]));
                };
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data[0] === "EVENT") {
                        const reply = data[2];
                        setReplies(prev => ({
                            ...prev,
                            [noteId]: [...(prev[noteId] || []), reply].sort((a, b) => b.created_at - a.created_at)
                        }));
                    }
                };
                setTimeout(() => {
                    ws.close();
                    resolve();
                }, 2000);
            });
        };

        await Promise.all(RELAYS.map(fetchFromRelay));
    };

    const handleMention = async (searchTerm) => {
        if (searchTerm.length < 2) return;

        const ws = new WebSocket('wss://relay.damus.io');
        ws.onopen = () => {
            ws.send(JSON.stringify([
                "REQ",
                "search-users",
                {
                    kinds: [0],
                    search: searchTerm
                }
            ]));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data[0] === "EVENT" && data[2].content) {
                const profile = JSON.parse(data[2].content);
                setMentionSuggestions(prev => {
                    const exists = prev.some(p => p.pubkey === data[2].pubkey);
                    if (!exists) {
                        return [...prev, { ...profile, pubkey: data[2].pubkey }];
                    }
                    return prev;
                });
            }
        };
    };

    const insertMention = (user) => {
        const mention = `nostr:${user.pubkey}`;
        const beforeCursor = newNote.substring(0, mentionRef.current.selectionStart);
        const afterCursor = newNote.substring(mentionRef.current.selectionStart);
        const lastAtPos = beforeCursor.lastIndexOf('@');
        const newText = beforeCursor.substring(0, lastAtPos) +
            `@${user.name || user.pubkey.substring(0, 8)} ` +
            afterCursor;
        setNewNote(newText);
        setShowMentions(false);
        setMentionSuggestions([]);
    };

    const sendZap = async (noteId, amount = 1000) => {
        if (!window.webln) {
            alert('Please install a WebLN provider like Alby!');
            return;
        }

        try {
            await window.webln.enable();
            const response = await fetch(`${SATS_API}${noteId}/${amount}`);
            const { invoice } = await response.json();
            await window.webln.sendPayment(invoice);
            alert('Zap sent successfully!');
        } catch (error) {
            console.error('Error sending zap:', error);
            alert('Failed to send zap');
        }
    };

    const publishReply = async (parentId) => {
        if (!replyContent.trim()) return;

        const event = {
            kind: 1,
            content: replyContent,
            created_at: Math.floor(Date.now() / 1000),
            tags: [
                ["t", "puffpuffpaint"],
                ["e", parentId, "", "reply"]
            ]
        };

        try {
            const signedEvent = await window.nostr.signEvent(event);
            RELAYS.forEach(relay => {
                const ws = new WebSocket(relay);
                ws.onopen = () => {
                    ws.send(JSON.stringify(["EVENT", signedEvent]));
                    ws.close();
                };
            });
            setShowReplyFor(null);
            setReplyContent('');
            fetchReplies(parentId);
        } catch (error) {
            console.error('Error publishing reply:', error);
        }
    };

    const uploadImage = async (file) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const auth = await window.nostr.signEvent({
                kind: 27235,
                content: "",
                created_at: Math.floor(Date.now() / 1000),
                tags: [
                    ["u", "https://nostr.build/upload.php"],
                    ["method", "POST"]
                ]
            });

            const response = await fetch('https://nostr.build/upload.php', {
                method: 'POST',
                headers: {
                    'Authorization': `Nostr ${btoa(JSON.stringify(auth))}`
                },
                body: formData
            });

            const data = await response.json();
            setUploadedImages(prev => [...prev, data.url]);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setIsLoading(false);
        }
    };

    const publishNote = async () => {
        if (!newNote.trim() && uploadedImages.length === 0) return;

        const event = {
            kind: 1,
            content: contentWarning ? `[CW: ${cwReason}]\n\n${newNote}` : newNote,
            created_at: Math.floor(Date.now() / 1000),
            tags: [
                ["t", "puffpuffpaint"],
                ...uploadedImages.map(url => ["r", url]),
                ...(contentWarning ? [["content-warning", cwReason]] : [])
            ]
        };

        try {
            const signedEvent = await window.nostr.signEvent(event);
            RELAYS.forEach(relay => {
                const ws = new WebSocket(relay);
                ws.onopen = () => {
                    ws.send(JSON.stringify(["EVENT", signedEvent]));
                    ws.close();
                };
            });

            setNewNote('');
            setUploadedImages([]);
            setContentWarning(false);
            setCwReason('');
            fetchNotes();
        } catch (error) {
            console.error('Error publishing note:', error);
        }
    };

    const renderNote = (note) => {
        const hasContentWarning = note.tags.some(tag => tag[0] === 'content-warning');
        const [_, cwReason] = note.tags.find(tag => tag[0] === 'content-warning') || [];
        const images = note.tags.filter(tag => tag[0] === 'r').map(tag => tag[1]);

        return (
            <Card key={note.id} className="bg-white mb-4">
                <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        <img
                            src={profile?.picture}
                            alt="Author"
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                            <div className="font-bold text-black">
                                {profile?.name || note.pubkey.substring(0, 8)}
                            </div>

                            {hasContentWarning ? (
                                <Alert className="my-2">
                                    <lucide.AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>
                                        Content Warning: {cwReason}
                                        <button
                                            className="ml-2 text-blue-500 hover:underline"
                                            onClick={() => {
                                                const element = document.getElementById(`content-${note.id}`);
                                                element.classList.toggle('hidden');
                                            }}
                                        >
                                            Show/Hide
                                        </button>
                                    </AlertDescription>
                                </Alert>
                            ) : null}

                            <div id={`content-${note.id}`} className={hasContentWarning ? 'hidden' : ''}>
                                <p className="text-gray-700 mt-2 whitespace-pre-wrap">{note.content}</p>

                                {images.length > 0 && (
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {images.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt="Attached"
                                                className="rounded-lg max-w-full h-auto"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={() => setShowReplyFor(showReplyFor === note.id ? null : note.id)}
                                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                                >
                                    <lucide.MessageCircle className="w-4 h-4" />
                                    {replies[note.id]?.length || 0}
                                </button>

                                <button
                                    onClick={() => sendZap(note.id)}
                                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                                >
                                    <lucide.Zap className="w-4 h-4" />
                                    Zap
                                </button>
                            </div>

                            {showReplyFor === note.id && (
                                <div className="mt-4">
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="Write a reply..."
                                        className="w-full p-2 border rounded-lg resize-none"
                                        rows={2}
                                    />
                                    <button
                                        onClick={() => publishReply(note.id)}
                                        className="mt-2 bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover
                                          className="mt-2 bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#45a049]"
                                    >
                                        Reply
                                    </button>
                                </div>
                            )}

                            {replies[note.id]?.length > 0 && (
                                <div className="mt-4 pl-4 border-l-2 border-gray-200">
                                    {replies[note.id].map(reply => (
                                        <div key={reply.id} className="mt-2">
                                            <div className="flex items-start gap-2">
                                                <img
                                                    src={profile?.picture}
                                                    alt="Reply Author"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <div>
                                                    <div className="font-bold text-sm text-black">
                                                        {profile?.name || reply.pubkey.substring(0, 8)}
                                                    </div>
                                                    <p className="text-gray-700 text-sm">{reply.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    if (!npub) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#EF8C56] text-white">
                <h1 className="text-2xl font-bold mb-4">Puff Puff Paint</h1>
                <button
                    className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100"
                    onClick={() => window.nostr.getPublicKey()}
                >
                    Login with Nostr
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#EF8C56] text-white p-4">
            <div className="max-w-2xl mx-auto w-full">
                <Card className="mb-6 bg-white">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            {profile?.picture && (
                                <img
                                    src={profile.picture}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full"
                                />
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <button
                                        onClick={() => setContentWarning(!contentWarning)}
                                        className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                                            contentWarning ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        <lucide.AlertTriangle className="w-4 h-4" />
                                        CW
                                    </button>
                                </div>

                                {contentWarning && (
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            placeholder="Content warning reason..."
                                            value={cwReason}
                                            onChange={(e) => setCwReason(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                )}

                                <textarea
                                    ref={mentionRef}
                                    value={newNote}
                                    onChange={(e) => {
                                        setNewNote(e.target.value);
                                        const lastAtPos = e.target.value.lastIndexOf('@');
                                        if (lastAtPos !== -1) {
                                            const searchTerm = e.target.value.substring(lastAtPos + 1);
                                            if (searchTerm) {
                                                setShowMentions(true);
                                                handleMention(searchTerm);
                                            }
                                        }
                                    }}
                                    placeholder="What's on your mind?"
                                    className="w-full p-2 mb-2 border rounded-lg resize-none"
                                    rows={3}
                                />

                                {showMentions && mentionSuggestions.length > 0 && (
                                    <div className="absolute bg-white border rounded-lg shadow-lg p-2 max-h-40 overflow-y-auto">
                                        {mentionSuggestions.map(user => (
                                            <div
                                                key={user.pubkey}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => insertMention(user)}
                                            >
                                                {user.picture && (
                                                    <img src={user.picture} alt="" className="w-6 h-6 rounded-full" />
                                                )}
                                                <span>{user.name || user.pubkey.substring(0, 8)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {uploadedImages.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {uploadedImages.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt="Uploaded"
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => uploadImage(e.target.files[0])}
                                                disabled={isLoading}
                                            />
                                            <lucide.Upload className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                                        </label>
                                        <button onClick={() => mentionRef.current.focus()}>
                                            <lucide.AtSign className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={publishNote}
                                        disabled={isLoading}
                                        className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#45a049] disabled:opacity-50"
                                    >
                                        <lucide.Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {notes.map(renderNote)}
                </div>
            </div>
        </div>
    );
};

window.PuffPuffPaint = PuffPuffPaint;
