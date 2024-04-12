var openAIKey = "none";

    window.onload = function() {
    var openAIKeyInput = document.getElementById('openAIKey');
    var setKeyButton = document.querySelector('button');

    function updateButtonColor() {
    if (openAIKeyInput.value.length < 50) {
    setKeyButton.style.backgroundColor = '#d73a49'; // Red color when less than 50 chars
    setKeyButton.style.borderColor = '#cb2431';
} else {
    setKeyButton.style.backgroundColor = '#238636'; // Original green color
    setKeyButton.style.borderColor = '#2ea043';
}
}

    // Initial check on page load
    updateButtonColor();

    // Attach event handler using traditional 'oninput' for older style
    openAIKeyInput.oninput = updateButtonColor;
};


async function setKey() {
    if (document.getElementById("openAIKey").value === "") {
        alert("Please enter the OpenAI API key");
        return;
    }
    this.openAIKey = document.getElementById("openAIKey").value;
}
async function getAvailableSpeakers() {
    let speakers = document.getElementById("speakers").value;
    return speakers.split('\n').map(speaker => speaker.trim()); // split by new lines and trim each line
}

async function getStudentChoices() {
    let studentChoices = document.getElementById("studentChoices").value;
    return studentChoices.split('\n').map(choice => choice.trim()); // split by new lines and trim each line
}

async function askGPTForRecommendation() {
    const OPENAI_API_KEY = this.openAIKey;
    const speakers = await getAvailableSpeakers();
    const speakerBlock = speakers.join('\n');
    const studentChoices = await getStudentChoices();
    const studentChoicesBlock = studentChoices.join('\n');
    console.log(speakerBlock);
    console.log(studentChoicesBlock);
    const query = `Available speakers -> \n${speakerBlock}\nStudent's favourite classes -> \n${studentChoicesBlock}`;
    const systemMessage = "The student needs a recommendation for a speaker. Please provide a one-word answer, selecting from the list of available speakers based on the student's interests.";
    const message = {
        model: "gpt-4-0125-preview",
        messages: [
            {
                role: "system",
                content: systemMessage
            },
            {
                role: "user",
                content: query
            },
            {
                role: "system",
                content: "Which speaker should the student see based on the...th the exact speaker from the Speaker_Data block."
            }
        ],
        temperature: 0.01
    };

    console.log(message);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify(message)
    });

    const responseData = await response.json();
    // Log the response data to the console
    console.log(responseData);

    // Check if choices is present in the response
    if (responseData.choices && responseData.choices.length > 0) {
        const recommendedSpeaker = responseData.choices[0].message.content.trim();
        return recommendedSpeaker;
    } else {
        // Handle the case where choices is not present in the response
        console.error("No choices found in response");
        return "Error: No choices found in response";
    }

    return recommendedSpeaker;
}

async function setResponseOnPage() {
    const recommendation = await askGPTForRecommendation();
    document.getElementById("response-field").textContent = recommendation;
}
