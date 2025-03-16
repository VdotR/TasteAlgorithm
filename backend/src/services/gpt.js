// A wrapper class that enables GPT calls

require('dotenv').config(); // Only need it during testing
const OpenAI = require("openai")

class GPT {
    constructor(){
        this.client = new OpenAI();
    }

    async ask(prompt, model="gpt-4o", options={}) {
        try {
            const response = await this.client.chat.completions.create({
              model: model,
              messages: [
                {
                  role: "user",
                  content: prompt,
                },
              ],
              response_format: { type: "json_object" },
              ...options, // Allow passing additional options
            });
            
            return response.choices[0].message.content;
          } catch (error) {
            console.error("Error making OpenAI request:", error);
            throw error;
          }
    }
}

module.exports = GPT;