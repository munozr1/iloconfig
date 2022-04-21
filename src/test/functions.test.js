import {
	validateFile,
	validateConfig,
	validateFlags,
	parseCSV,
} from "../functions";

describe("Return an array of the servers within a csv file", () => {
	it("parseCSV takes in a filename and returns the server configs", async () => {
		await parseCSV("testServerData.csv");
	});
});
