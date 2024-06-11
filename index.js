const jsdom = require("jsdom");

class hackerNewsPost {
	constructor(indexNumber, articleName, link) {
		indexNumber, articleName, link;
	}
}

// HTML DATA FROM NEWS.YCOMBINATOR.COM (STATIC TO PREVENT SPAMMING NETWORK REQUESTS WHILE TESTING)
const fs = require("fs");
const hnHTML = fs.readFileSync("./hn.html", "utf-8");
const testParsedHTML = new jsdom.JSDOM(hnHTML);

const hackerNewsPostsArray = [];

function parseArticleData(str) {
	const regexPattern = /(\d+).(.+)/;
	const regexMatched = str.match(regexPattern);

	const index = regexMatched[1];
	const postTitle = regexMatched[2].trim();
	return [index, postTitle];
}

// <TD> ELEMENTS FROM HN HTML FILE, RETURNS A NODELIS
const tdElements = testParsedHTML.window.document.querySelectorAll(".athing");

// Parses NodeList & pushes individual articles to hackerNewsPostsArray
tdElements.forEach((e) => {
	const articleInformation = parseArticleData(e.textContent);
	const articleLink = e.querySelector(".titleline a").href;
	hackerNewsPostsArray.push([...articleInformation, articleLink]);
});

function getPosts(number = 30) {
	console.log("");
	const filteredHackerNewsPostsList = hackerNewsPostsArray.filter((e, index) => {
		return index < number;
	});
	filteredHackerNewsPostsList.forEach((hackerNewsPost) => {
		console.log(`[${hackerNewsPost[0]}] ${hackerNewsPost[1]}`);
		console.log(`${hackerNewsPost[2]}`);
		console.log("");
	});
}

function getSinglePost(postIndex) {
	return hackerNewsPosts[postIndex];
}

// ! Add Link Summary -> Call OpenAI API for link summary (some link validation shit? youtube videos? don't send this maybe?)

module.exports = { getPosts, getSinglePost };
