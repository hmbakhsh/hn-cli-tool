const jsdom = require("jsdom");

class hackerNewsPost {
	constructor(indexNumber, articleName, link) {
		this.indexNumber = indexNumber;
		this.articleName = articleName;
		this.link = link;
	}
}

const fs = require("fs");
const { log } = require("console");
const hnHTML = fs.readFileSync("./hn.html", "utf-8");
const syntheticDOM = new jsdom.JSDOM(hnHTML);

const parseHTMLElementTextContent = (articleItem) => {
	const regexPattern = /(\d+).(.+)/;
	const regexMatchResult = articleItem.match(regexPattern);

	const index = regexMatchResult[1];
	const postTitle = regexMatchResult[2].trim();
	return [index, postTitle];
};

const getArticles = (JSDOM) => {
	const output = [];
	const articleItems = syntheticDOM.window.document.querySelectorAll(".athing");
	articleItems.forEach((articleItem) => {
		const articleInformationArray = parseHTMLElementTextContent(articleItem.textContent);
		const articleLink = articleItem.querySelector(".titleline a").href;
		articleInformationArray.push(articleLink);
		output.push(articleInformationArray);
	});
};

console.log(getArticles(syntheticDOM));
