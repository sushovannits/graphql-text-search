// import * as db from "../db";
export interface Subtext {
  subtexts: string[]
}

export interface SubtextResult {
  subtext: string,
  result: string
}
export interface TextToSearch {
  text: string
}
export interface TextSearchResult {
  text: TextToSearch,
  subtext: Subtext,
  results: SubtextResult[]
}

export interface Result {
  candidate: string,
  text: string,
  results: SubtextResult
}

export const search = (): TextSearchResult => {
  const textToSearch = {
    text: "hello world He"
  }; // This will be replaced by the rest api call
  const subtextInput = {
    "subtexts": ["tt", "lt"]
  };
  const result: SubtextResult[] = [];
  const searchResult = subtextInput.subtexts.reduce((acc, sub) => {
    acc.push({
      subtext: sub,
      result: ([...textToSearch.text.matchAll(new RegExp(sub, 'gi'))].map(a => a.index)).toString()
    });
    return acc;
  }, result);
  return {
    text: textToSearch,
    subtext: subtextInput,
    results: searchResult
  };
}

export const submitResult = async(result: Result) => {
  console.log("Submitted input " + JSON.stringify(result))
  return true; 
}
