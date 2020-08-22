// import * as db from "../db";
import * as faker from "faker";

export interface Subtext {
  subtexts: string[]
}

export interface SubtextResult {
  subtext: string,
  result: string
}

export interface SubtextSearchResult {
  text: string,
  subtext: Subtext,
  results: SubtextResult[]
}

export interface Result {
  candidate: string,
  text: string,
  results: SubtextResult
}

export const getText = async() => {
  return faker.lorem.text();
  // return await db.query("SELECT text_to_search  FROM search_text ORDER BY random() limit 1");
}

export const search = (textToSearch: string, subtextInput: Subtext): SubtextSearchResult => {
  const result: SubtextResult[] = [];
  const searchResult = subtextInput.subtexts.reduce((acc, sub) => {
    acc.push({
      subtext: sub,
      result: ([...textToSearch.matchAll(new RegExp(sub, 'gi'))].map(a => a.index)).toString()
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
