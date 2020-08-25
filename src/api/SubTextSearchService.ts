// import * as db from "../db";
import fetch from "node-fetch";
import {RequestInit} from "node-fetch";
const textToSearchUrl = "https://run.mocky.io/v3/a0bebe23-7351-4ee8-a483-07db484de2f9";
const subtextUrl = "https://run.mocky.io/v3/068e3ffc-6a54-4dfa-8ada-4d2370d2f6c0";
const submitResultUrl = "https://run.mocky.io/v3/6bc98dc8-79f6-4f31-bbe1-f8bf60c93a79";

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

async function query(url: string, params: RequestInit = {}): Promise<any> {
  try {
    const res = await fetch(url, params);
    if(res.ok) return res.json();
  } catch(err) {
    return query(url, params);
  }
  return query(url, params);
}

export const search = async (): Promise<TextSearchResult> => {
  const [textToSearch, subtextInput] = await Promise.all([
    query(textToSearchUrl),
    query(subtextUrl)
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
  await query(submitResultUrl, {
    method: 'POST',
    body: JSON.stringify(result),
    headers: {'Content-Type': 'application/json'}
  });
  return true;
}
