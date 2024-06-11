const { Command } = require("commander");
const { getPosts, getSinglePost } = require("./index");
const { parseSummary } = require("./openai-calls");

const cli = new Command();

cli.name("hn-cli").description("HackerNews Feed in your Terminal!").version("v0.0.1");

cli.option("-n , --num <number>", "Enter the number of articles you want to see");
cli.option("-s, --summary <index>", "Get summary of the article");

cli.parse(process.argv);

const options = cli.opts();
if (options.num) getPosts(options.num);
if (options.summary) parseSummary(options.summary);

// cli
// 	.command("c")
// 	.description("List the current top 30 articles on Hacker News")
// 	.option("-n", "--number", "enter the number of articles you want to return")
// 	.action((str, ) => {
// 		getPosts();
// 	});
