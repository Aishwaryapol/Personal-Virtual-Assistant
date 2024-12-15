let startBtn = document.querySelector("#startBtn"); // Button to activate assistant
let btn = document.querySelector("#btn");
let content=document.querySelector("#content");
let voice=document.querySelector("#voice");
function speak(text) {
    if (!window.speechSynthesis) {
        console.error("Speech Synthesis not supported in this browser.");
        return;
    }

    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // You can change this to "en-IN" for Indian English if needed

    // Select the Indian Female Voice
    const voices = window.speechSynthesis.getVoices();
    const indianFemaleVoice = voices.find(
        (voice) =>
            (voice.lang === "hi-IN" || voice.lang === "en-IN") &&
            voice.name.toLowerCase().includes("female")
    );

    if (indianFemaleVoice) {
        text_speak.voice = indianFemaleVoice;
    } else {
        console.warn("Indian female voice not found. Using default voice.");
    }

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good Morining  Sir"); 
    } else if (hours >= 12 && hours < 17) {
        speak("Good Afternoon  Sir");
    } else {
        speak(" Good Evening Sir ");
    }
}

// Attach event listener to the Activate button
startBtn.addEventListener("click", () => {
    // Call wishMe only after user clicks the button
    wishMe();
   // alert("Antara is now active. Enjoy your assistant!");
    startBtn.style.display = "none"; // Hide the activate button after interaction
});



  
 
  

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();


recognition.onresult = (event) => {

    let currentIndex=event.resultIndex;
  let transcript =event.results[currentIndex][0].transcript;
  content.innerText=transcript;
 takeCommand(transcript);
     
    
};


// Add functionality to the additional button
btn.addEventListener("click", () => {
   // speak("मैं आपकी सहायता के लिए यहां हूँ। बताइये क्या मदद कर सकती हूँ?"); // "I am here to help. How can I assist you?" in Hindi
   
   recognition.start();
   btn.style.display="none";
   voice.style.display="block";
});

function takeCommand(message) {
    // Normalize input to handle case-insensitive matching
    btn.style.display="flex";
    voice.style.display="none";
    message = message.toLowerCase().trim();

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am Antara, created by Ansh Pol.");
    } else if (message.includes("who is ansh")) {
        speak("He is my boyfriend.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
        
    } 
    else if (message.includes("open calculator")) {
        speak("opening calculator");
        window.open("calculator://");
        
    } 
    else if (message.includes("time")) {
        try {
            // Get the current time in a user-friendly format
            let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric", hour12: true });
    
            // Speak the time with context
            speak(`The current time is ${time}`);
        } catch (error) {
            console.error("Error retrieving time:", error);
            speak("Sorry, I couldn't fetch the current time.");
        }
    }
    
    
    else {
        // Remove "antara" from the message, ignoring case
        const cleanedMessage = message.replace("antara", "").trim();
    
        // Provide feedback to the user
        speak(`This is what I found on the internet regarding ${cleanedMessage}`);
    
        // Encode the query for safe URL usage
        const query = encodeURIComponent(cleanedMessage);
    
        // Open the search in a new tab
        window.open(`https://www.bing.com/search?q=${query}`, "_blank");
    }
    
}

