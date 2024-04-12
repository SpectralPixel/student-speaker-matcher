async function getAvailableSpeakers() {
    let speakers = [];
    const speakerElements = document.getElementById("speakers").children;
    Array.from(speakerElements).forEach(child => {
        speakers.push(child.textContent);
    });
    return speakers;
}

async function getStudentChoices() {
    let studentChoices = [];
    const choiceElements = document.getElementById("studentChoices").children;
    Array.from(choiceElements).forEach(child => {
        studentChoices.push(child.textContent);
    });
    return studentChoices;
}

async function askGPTForRecommendation() {
    const OPENAI_API_KEY = "classified";
    const speakers = await getAvailableSpeakers();
    const speakerBlock = speakers.join('\n');
    const studentChoices = await getStudentChoices();
    const studentChoicesBlock = studentChoices.join('\n');
    const query = `Available speakers -> \n${speakerBlock}\nStudent's favourite classes -> \n${studentChoicesBlock}`;
    const systemMessage = "\nWhich speaker should the student see based on their interests, answer in only one word with the exact speaker name.";
    const message = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant."
            },
            {
                role: "user",
                content: query
            },
            {
                role: "system",
                content: systemMessage
            }
        ]
    };

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
