const jsdom = require("jsdom");

// ACTUALLY FETCHING HN
// fetch("https://news.ycombinator.com")
// 	.then((res) => res.text())
// 	.then((res) => {
// 		let parsedHTML = new jsdom.JSDOM(res);
// 		console.log(parsedHTML.window.document.querySelector("html").innerHTML);
// 	});

// RETURNED RESPONSE FROM HN -> HN.HTML

// let testParsedHTML = new jsdom.JSDOM(fs.readFile("./hn.html"));
// console.log(testParsedHTML);

class hackerNewsPost {
	constructor(indexNumber, articleName, link) {
		indexNumber, articleName, link;
	}
}

const fs = require("fs");
const hnHTML = fs.readFileSync("./hn.html", "utf-8");
const testParsedHTML = new jsdom.JSDOM(hnHTML);

const hackerNewsPosts = [];

// Returns a NodeList
const tdElements = testParsedHTML.window.document.querySelectorAll(".athing");
tdElements.forEach((e) => {
	const articleInformation = parseArticleInformation(e.textContent);
	const articleLink = e.querySelector(".titleline a").href;
	hackerNewsPosts.push([...articleInformation, articleLink]);
});

function parseArticleInformation(str) {
	const regexPattern = /(\d+).(.+)/;
	const regexMatched = str.match(regexPattern);

	const index = regexMatched[1];
	const postTitle = regexMatched[2].trim();
	return [index, postTitle];
}

console.log(hackerNewsPosts);

function getPosts(hackerNewsPosts) {
	hackerNewsPosts.forEach((hackerNewsPost) => {
		console.log(`${hackerNewsPost[0]} ${hackerNewsPost[1]}`);
	});
}

getPosts(hackerNewsPosts);
