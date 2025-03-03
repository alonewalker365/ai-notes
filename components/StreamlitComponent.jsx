'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NotesCraftPro() {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoId, setVideoId] = useState(null);
    const [subject, setSubject] = useState('');
    const [prompt, setPrompt] = useState('');
    const [language, setLanguage] = useState('English');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    // Subjects with corresponding default prompts
    const subjects = {
        "Biology": "As a biology expert, analyze the YouTube video transcript, providing detailed notes like a student. Cover key concepts like complex biological processes and their implications.",
        "Chemistry": "Summarize the chemistry video, explaining key concepts, chemical reactions, and real-world applications in a simple manner.",
        "Computer Science": "Extract the main points of the computer science lecture, focusing on algorithms, data structures, and programming best practices.",
        "Mathematics": "Break down the mathematical problem-solving techniques shown in the video with step-by-step explanations.",
        "Philosophy": "Provide a detailed summary of the philosophical discussion in the video, highlighting key theories and their implications.",
        "History": "Summarize the historical events discussed in the video, emphasizing important dates, figures, and their impact.",
        "Literature": "Analyze the literary themes, characters, and narrative techniques in the video discussion.",
        "Psychology": "Extract key psychological concepts from the video, explaining theories, case studies, and real-world applications."
    };

    const languages = ["English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil"];

    // Extract YouTube video ID
    const extractVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleVideoChange = (e) => {
        const url = e.target.value;
        setVideoUrl(url);
        const id = extractVideoId(url);
        setVideoId(id);
    };

    const handleSubjectChange = (e) => {
        const selectedSubject = e.target.value;
        setSubject(selectedSubject);
        setPrompt(subjects[selectedSubject] || ""); // Auto-fill prompt
    };

    const handleGenerateNotes = async () => {
        if (!videoUrl || !prompt) {
            alert("Please enter both Video URL and Prompt");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/generate_notes/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ video_url: videoUrl, prompt_text: prompt, language })
            });
            const data = await response.json();
            if (data.notes) {
                setNotes(data.notes);
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="bg-gray-800 p-6 min-h-screen">
                <label className="block text-sm mb-2">Select Subject:</label>
                <select value={subject} onChange={handleSubjectChange} className="mb-4 w-full bg-gray-700 text-white p-2 rounded">
                    <option value="">Select Subject</option>
                    {Object.keys(subjects).map((subj) => (
                        <option key={subj} value={subj}>{subj}</option>
                    ))}
                </select>

                <label className="block text-sm mb-2">Write your text prompt:</label>
                <Textarea 
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mb-4 w-full bg-gray-700 text-white p-2 rounded" 
                />

                <label className="block text-sm mb-2">Select Language:</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mb-4 w-full bg-gray-700 text-white p-2 rounded">
                    {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                </select>

                <Button onClick={handleGenerateNotes} className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                    {loading ? "Generating..." : "📝 Get Detailed Notes"}
                </Button>
            </div>

            {/* Main Content */}
            <div className="col-span-2 flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold">Notes Craft Pro</h1>
                <p className="text-gray-400 mb-6">An application that effortlessly transcribes your YouTube videos into detailed notes.</p>

                <label className="block text-sm mb-2">Enter YouTube Video Link:</label>
                <Input 
                    placeholder="Enter YouTube Video URL" 
                    value={videoUrl} 
                    onChange={handleVideoChange}
                    className="w-full bg-gray-800 border-red-600 text-white mb-4 p-2 rounded"
                />

                {videoId && (
                    <div className="mt-4">
                        <iframe 
                            className="rounded-lg border border-gray-600"
                            width="560" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${videoId}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                {notes && (
                    <div className="mt-6 p-4 bg-gray-800 border border-gray-600 rounded">
                        <h2 className="text-xl font-bold">Generated Notes:</h2>
                        <p>{notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
