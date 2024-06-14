const { OpenAI } = require("openai");
const jsdom = require("jsdom");
const { Readability } = require("@mozilla/readability");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getSummary(article) {
	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content: "You are an article summarizer. I will provide you with content from an article. Your job is to provide a succinct, concise summary. Keep it as short as possible.",
				},
				{ role: "user", content: `here is the article, make sure to keep your summary very concise: ${article}` },
			],
			model: "gpt-4o",
		});

		return completion.choices[0].message.content;
	} catch (error) {
		console.error("Error in callOpenAI:", error);
		throw error;
	}
}

async function getArticleContent(link) {
	try {
		const res = await fetch(link);
		if (!res.ok) {
			throw new Error("Response Error");
		}
		const resText = await res.text();
		const parsedHTML = new jsdom.JSDOM(resText);
		const parsedContent = new Readability(parsedHTML.window.document).parse();
		return parsedContent.textContent;
	} catch (error) {
		console.error("Error in getArticleContent:", error);
		throw error;
	}
}

async function parseSummary(link) {
	try {
		const articleContent = await getArticleContent(link);
		const summary = await callOpenAI(articleContent);
		console.log(summary);
	} catch (error) {
		console.error("Error in getSummary:", error);
		throw error;
	}
}

module.exports = { getSummary };
