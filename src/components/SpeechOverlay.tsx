import React, { useState, useEffect } from "react";
import { MdOutlineRecordVoiceOver } from "react-icons/md"; // Icon resembling open mouth speaking

const SpeechOverlay: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string>(""); // Holds the transcript text
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

  const SpeechRecognition =
    window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.continuous = false; // Recognize single phrase per session
      recognition.lang = "en-US";
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const speechResult = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += speechResult + " ";
          } else {
            interimTranscript += speechResult;
          }
        }

        // Append the final transcript to the state (not clearing previously inputted text)
        setTranscript((prevTranscript) => prevTranscript + finalTranscript.trim());

        // Automatically input into the active input or textarea element
        if (
          activeElement instanceof HTMLInputElement ||
          activeElement instanceof HTMLTextAreaElement
        ) {
          activeElement.value = transcript + finalTranscript.trim(); // Append to the existing value
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    const handleFocus = (event: FocusEvent) => {
      setActiveElement(event.target as HTMLElement);
    };

    const inputs = document.querySelectorAll("textarea, input");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus as EventListener); // Explicitly cast to EventListener
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus as EventListener);
      });
    };
  }, [recognition, transcript]);

  const toggleSpeechRecognition = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  return (
    <div className="relative">
      <button
        className="fixed p-4 text-white transition duration-200 ease-in-out bg-teal-500 rounded-full shadow-lg bottom-10 right-10 focus:outline-none hover:bg-teal-600 active:bg-teal-700"
        onClick={toggleSpeechRecognition}
      >
        <MdOutlineRecordVoiceOver className="text-2xl" />
      </button>

      {isListening && (
        <div className="absolute top-0 p-2 mt-12 text-white transform -translate-x-1/2 bg-gray-800 rounded-md left-1/2">
          <p>Speak now...</p>
        </div>
      )}
      
      {/* Displaying the transcribed text */}
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={4}
        className="w-full p-2 mt-4 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SpeechOverlay;
