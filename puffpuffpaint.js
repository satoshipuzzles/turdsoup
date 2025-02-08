const { useState, useEffect, useRef } = React;
const { AlertTriangle, MessageCircle, Send, Upload, Zap, AtSign } = lucide;

// Component wrappers
const Card = ({ children, className }) => (
    <div className={`card ${className || ''}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
    <div className={`card-content ${className || ''}`}>{children}</div>
);

const Alert = ({ children, className }) => (
    <div className={`alert ${className || ''}`}>{children}</div>
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
        return () => {
            // Cleanup WebSocket connections if needed
            RELAYS.forEach(relay => {
                const ws = new WebSocket(relay);
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            });
        };
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
                    setProfile({ ...userProfile, npub: userNpub });
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
            let timeoutId;

            ws.onopen = () => {
                ws.send(JSON.stringify(["REQ", "1", { kinds: [0], authors: [userNpub] }]));
                timeoutId = setTimeout(() => {
                    ws.close();
                    reject(new Error('Profile fetch timeout'));
                }, 5000);
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data[0] === "EVENT" && data[2].content) {
                    clearTimeout(timeoutId);
                    try {
                        const profile = JSON.parse(data[2].content);
                        ws.close();
                        resolve(profile);
                    } catch (error) {
                        reject(error);
                    }
                }
            };

            ws.onerror = (error) => {
                clearTimeout(timeoutId);
                reject(error);
            };
        });
    };

    const fetchNotes = async () => {
        const fetchFromRelay = (relay) => {
            return new Promise((resolve) => {
                const ws = new WebSocket(relay);
                const timeoutId = setTimeout(() => {
                    ws.close();
                    resolve();
                }, 5000);

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
                                const newNotes = [...prev, note];
                                return newNotes.sort((a, b) => b.created_at - a.created_at);
                            }
                            return prev;
                        });
                    }
                    if (data[0] === "EOSE") {
                        clearTimeout(timeoutId);
                        ws.close();
                        resolve();
                    }
                };

                ws.onerror = () => {
                    clearTimeout(timeoutId);
                    ws.close();
                    resolve();
                };
            });
        };

        await Promise.all(RELAYS.map(fetchFromRelay));
    };

    const fetchReplies = async (noteId) => {
        const fetchFromRelay = (relay) => {
            return new Promise((resolve) => {
                const ws = new WebSocket(relay);
                const timeoutId = setTimeout(() => {
                    ws.close();
                    resolve();
                }, 3000);

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
                    if (data[0] === "EOSE") {
                        clearTimeout(timeoutId);
                        ws.close();
                        resolve();
                    }
                };

                ws.onerror = () => {
                    clearTimeout(timeoutId);
                    ws.close();
                    resolve();
                };
            });
        };

        await Promise.all(RELAYS.map(fetchFromRelay));
    };

    const handleMention = async (searchTerm) => {
        if (!searchTerm || searchTerm.length < 2) return;

        const ws = new WebSocket('wss://relay.damus.io');
        const timeoutId = setTimeout(() => ws.close(), 3000);

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
                try {
                    const profile = JSON.parse(data[2].content);
                    setMentionSuggestions(prev => {
                        const exists = prev.some(p => p.pubkey === data[2].pubkey);
                        if (!exists) {
                            return [...prev, { ...profile, pubkey: data[2].pubkey }];
                        }
                        return prev;
                    });
                } catch (error) {
                    console.error('Error parsing profile:', error);
                }
            }
            if (data[0] === "EOSE") {
                clearTimeout(timeoutId);
                ws.close();
            }
        };

        ws.onerror = () => {
            clearTimeout(timeoutId);
            ws.close();
        };
    };

    const insertMention = (user) => {
        if (!mentionRef.current) return;

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
        if (!replyContent.trim() || !npub) return;

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
            const publishPromises = RELAYS.map(relay => {
                return new Promise((resolve) => {
                    const ws = new WebSocket(relay);
                    ws.onopen = () => {
                        ws.send(JSON.stringify(["EVENT", signedEvent]));
                        setTimeout(() => {
                            ws.close();
                            resolve();
                        }, 1000);
                    };
                    ws.onerror = () => resolve();
                });
            });

            await Promise.all(publishPromises);
            setShowReplyFor(null);
            setReplyContent('');
            await fetchReplies(parentId);
        } catch (error) {
            console.error('Error publishing reply:', error);
            alert('Failed to publish reply');
        }
    };

    const uploadImage = async (file) => {
        if (!file || !npub) return;

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

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.url) {
                setUploadedImages(prev => [...prev, data.url]);
            } else {
                throw new Error('No URL in response');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setIsLoading(false);
        }
    };

    const publishNote = async () => {
        if ((!newNote.trim() && uploadedImages.length === 0) || !npub) return;

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
            const publishPromises = RELAYS.map(relay => {
                return new Promise((resolve) => {
                    const ws = new WebSocket(relay);
                    ws.onopen = () => {
                        ws.send(JSON.stringify(["EVENT", signedEvent]));
                        setTimeout(() => {
                            ws.close();
                            resolve();
                        }, 1000);
                    };
                    ws.onerror = () => resolve();
                });
            });

            await Promise.all(publishPromises);
            setNewNote('');
            setUploadedImages([]);
            setContentWarning(false);
            setCwReason('');
            await fetchNotes();
        } catch (error) {
            console.error('Error publishing note:', error);
            alert('Failed to publish note');
        }
    };

    const renderNote = (note) => {
        const hasContentWarning = note.tags.some(tag => tag[0] === 'content-warning');
        const cwTag = note.tags.find(tag => tag[0] === 'content-warning');
        const cwReason = cwTag ? cwTag[1] : '';
        const images = note.tags.filter(tag => tag[0] === 'r').map(tag => tag[1]);
        const authorProfile = note.pubkey === npub ? profile : null;

        return (
            <Card key={note.id} className="bg-white mb-4">
                <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        {authorProfile && authorProfile.picture && (
                            <img
                                src={authorProfile.picture}
                                alt="Author"
                                className="w-12 h-12 rounded-full"
                            />
                        )}
                        <div className="flex-1">
                            <div className="font-bold text-black">
                                {authorProfile && authorProfile.name || note.pubkey.substring(0, 8)}
                            </div>

                            {hasContentWarning ? (
                                <Alert className="my-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>
                                        Content Warning: {cwReason}
                                        <button
                                            className="ml-2 text-blue-500 hover:underline"
                                            onClick={() => {
                                                const element = document.getElementById(`content-${note.id}`);
                                                if (element) {
                                                    element.classList.toggle('hidden');
                                                }
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
                                    <MessageCircle className="w-4 h-4" />
                                    {(replies[note.id] || []).length}
                                </button>

                                <button
                                    onClick={() => sendZap(note.id)}
                                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                                >
                                    <Zap className="w-4 h-4" />
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
                                        className="mt-2 bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#45a049]"
                                        disabled={!replyContent.trim()}
                                    >
                                        Reply
                                    </button>
                                </div>
                            )}

                            {(replies[note.id] || []).length > 0 && (
                                <div className="mt-4 pl-4 border-l-2 border-gray-200">
                                    {replies[note.id].map(reply => (
                                        <div key={reply.id} className="mt-2">
                                            <div className="flex items-start gap-2">
                                                {authorProfile && authorProfile.picture && (
                                                    <img
                                                        src={authorProfile.picture}
                                                        alt="Reply Author"
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                )}
                                                <div>
                                                    <div className="font-bold text-sm text-black">
                                                        {authorProfile && authorProfile.name || reply.pubkey.substring(0, 8)}
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
                            {profile && profile.picture && (
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
                                        <AlertTriangle className="w-4 h-4" />
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
                                    <div className="mention-suggestions">
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
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        uploadImage(e.target.files[0]);
                                                    }
                                                }}
                                                disabled={isLoading}
                                            />
                                            <Upload className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                                        </label>
                                        <button 
                                            onClick={() => mentionRef.current && mentionRef.current.focus()}
                                            type="button"
                                        >
                                            <AtSign className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={publishNote}
                                        disabled={isLoading || (!newNote.trim() && uploadedImages.length === 0)}
                                        className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#45a049] disabled:opacity-50"
                                    >
                                        <Send className="w-5 h-5" />
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

// Make the component available globally
window.PuffPuffPaint = PuffPuffPaint;
