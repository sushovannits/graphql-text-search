// import * as db from "../db";
import fetch from "node-fetch";
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

async function query(url: string): Promise<any> {
  return fetch(url).then(res => {
    if(res.ok) return res.json();
    return query(url);
  }).catch(_ => query(url));
}

export const search = async (): Promise<TextSearchResult> => {
  const [textToSearch, subtextInput] = await Promise.all([
    query("https://run.mocky.io/v3/a0bebe23-7351-4ee8-a483-07db484de2f9"),
    query("https://run.mocky.io/v3/068e3ffc-6a54-4dfa-8ada-4d2370d2f6c0")
  ]);
  const result: SubtextResult[] = [];
  const searchResult = subtextInput.subtexts.reduce((acc: {subtext: string; result: string}[], sub: string) => {
    const res = ([...textToSearch.text.matchAll(new RegExp(sub, 'gi'))].map(a => a.index)).toString();
    acc.push({
      subtext: sub,
      result: res.length === 0 ? "<No Output>" : res
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
