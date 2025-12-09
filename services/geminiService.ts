import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
const getClient = () => {
    const apiKey = process.env.API_KEY || '';
    // if(!apiKey) console.warn("Missing API Key");
    return new GoogleGenAI({ apiKey });
};

// Hardcoded expert knowledge base for the "Big Bang Hoax" theme
const KNOWLEDGE_BASE: Record<string, string> = {
    "red shift": "**Analysis of Red Shift Anomalies:**\n\nStandard cosmology interprets redshift (z) strictly as a Doppler effect caused by recession velocity. However, recent data from the James Webb Space Telescope (JWST) shows high-z galaxies (z > 10) that are surprisingly mature and massive.\n\n**Contradiction Found:**\nIf the Big Bang model were correct, these galaxies shouldn't have had time to form metallic structures. \n\n**Alternative Hypothesis:**\nHalton Arp's 'Intrinsic Redshift' theory suggests that redshift is a function of age, not distance. This aligns with the new data from Sector 7.",
    "tired light": "**Tired Light Hypothesis Investigation:**\n\nFritz Zwicky's 1929 theory proposes that photons lose energy over vast distances due to interaction with matter/fields, not because space is expanding.\n\n**Deep Search Results:**\nRecent studies on 'Dark Matter' halos around galaxy clusters show a friction coefficient that matches Zwicky's predictions.\n\n**Conclusion:**\nThe 'expansion' might be an optical illusion caused by energy decay over light-years.",
    "cosmic egg": "**The Cosmic Egg & Cyclical Models:**\n\nAncient Sumerian and Vedic texts describe the universe as a 'Cosmic Egg' (Brahmanda) that expands and collapses in eternal cycles.\n\n**Scientific Correlation:**\nPenrose's Conformal Cyclic Cosmology (CCC) mirrors this. The 'Big Bang' wasn't the beginning, but merely the transition point from a previous eon. The CMB cold spots might be 'scars' from previous black hole collisions.",
    "funding": "**Grant Funding Bias Report:**\n\nScanning 45,000 academic grants from 2014-2024...\n\n**Findings:**\n- **98.4%** of funding went to Lambda-CDM (Standard Model) research.\n- **1.2%** went to String Theory variants.\n- **< 0.4%** went to alternative static universe models.\n\nThis suggests a systemic 'confirmation bias' in the academic pipeline rather than a consensus based purely on observation.",
    "default": "I have analyzed the documents and cross-referenced with the latest astrophysical pre-prints. \n\nThere is significant divergence between the observed data and the theoretical predictions of the standard Big Bang model in this area. Would you like me to break down the specific mathematical discrepancies?"
};

export const generateRAGResponse = async (
    prompt: string, 
    contextDocs: string[],
    onStatusChange: (status: 'searching_pdf' | 'searching_web' | 'generating') => void
): Promise<string> => {
    
    const ai = getClient();
    const lowerPrompt = prompt.toLowerCase();
    
    // Simulate RAG Latency for UX
    onStatusChange('searching_pdf');
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate vector DB search
    
    onStatusChange('searching_web');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate Web Search
    
    onStatusChange('generating');
    await new Promise(resolve => setTimeout(resolve, 600));

    // Check for hardcoded "Hoax" themes first to ensure high-quality demo responses
    if (lowerPrompt.includes("red shift")) return KNOWLEDGE_BASE["red shift"];
    if (lowerPrompt.includes("tired light")) return KNOWLEDGE_BASE["tired light"];
    if (lowerPrompt.includes("egg") || lowerPrompt.includes("sumerian")) return KNOWLEDGE_BASE["cosmic egg"];
    if (lowerPrompt.includes("fund") || lowerPrompt.includes("grant")) return KNOWLEDGE_BASE["funding"];

    const systemInstruction = `
    You are the 'Big Bang Hoax' research assistant. 
    Tone: Objective, analytical, open to alternative cosmological models, professional.
    
    You have access to the following context from the user's uploaded PDF documents (Simulated):
    ${contextDocs.join('\n')}
    
    If the answer isn't in the docs, use your general knowledge but mention that it's general knowledge.
    Format your response with clear paragraphs. Use markdown for bolding key terms.
    `;

    try {
        // Attempt actual API call if key exists
        if (process.env.API_KEY) {
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                }
            });
            return response.text || KNOWLEDGE_BASE["default"];
        } else {
            return KNOWLEDGE_BASE["default"];
        }
    } catch (error) {
        console.warn("Gemini API Error (using fallback):", error);
        return KNOWLEDGE_BASE["default"];
    }
};

export const summarizePost = async (content: string): Promise<string> => {
    return "Community insight.";
};