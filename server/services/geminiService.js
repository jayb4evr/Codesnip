const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async explainCode(code, language, mode = 'explain') {
    try {
      let prompt = '';
      
      if (mode === 'cp') {
        prompt = `Analyze this ${language} code from a competitive programming perspective for an ECE 2nd year student:

Code:
\`\`\`${language}
${code}
\`\`\`

Provide:
1. **Problem Type**: Identify if it's a LeetCode-style problem (Array, String, DP, Graph, etc.)
2. **Algorithm Analysis**: What algorithm/approach is used?
3. **Time Complexity**: Big O analysis with explanation
4. **Space Complexity**: Memory usage analysis
5. **Optimization Opportunities**: How can this be improved?
6. **Similar Problems**: Suggest 3-5 similar LeetCode/competitive programming problems
7. **Interview Tips**: What interviewers look for in this type of problem
8. **Edge Cases**: What edge cases should be considered?

Make it beginner-friendly and practical for competitive programming preparation.`;
      } else {
        prompt = `Explain this ${language} code for an ECE 2nd year student interested in competitive programming:

Code:
\`\`\`${language}
${code}
\`\`\`

Provide a comprehensive explanation:
1. **Overview**: What does this code do? (2-3 sentences)
2. **Step-by-Step Breakdown**: Explain each section of code line by line
3. **Key Concepts**: What programming concepts are used? (loops, recursion, data structures, etc.)
4. **Time Complexity**: Big O notation with explanation
5. **Space Complexity**: Memory usage analysis
6. **Optimizations**: How can this code be improved?
7. **Example Input/Output**: Provide sample test cases
8. **Interview Tips**: What would an interviewer ask about this code?

Use simple language, analogies, and be beginner-friendly. Format with markdown for readability.`;
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate explanation from Gemini API');
    }
  }

  async streamExplainCode(code, language, mode = 'explain', onChunk) {
    try {
      let prompt = mode === 'cp' 
        ? this.buildCPPrompt(code, language)
        : this.buildExplainPrompt(code, language);

      const result = await this.model.generateContentStream(prompt);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (onChunk) {
          onChunk(chunkText);
        }
      }
      
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Stream Error:', error);
      throw new Error('Failed to stream explanation from Gemini API');
    }
  }

  buildExplainPrompt(code, language) {
    return `Explain this ${language} code for an ECE 2nd year student interested in competitive programming:

Code:
\`\`\`${language}
${code}
\`\`\`

Provide a comprehensive explanation with markdown formatting.`;
  }

  buildCPPrompt(code, language) {
    return `Analyze this ${language} code from a competitive programming perspective for an ECE 2nd year student. Focus on algorithms, complexity, and similar problems.`;
  }
}

module.exports = new GeminiService();
