export interface Welcome {
  word: string;
  phonetic: string;
  audio: string;
  speech: string;
  definition1: string;
  definition2: string;
  definition3: string;
  partofSpeech2: string;
  definition4: string;
  definition5: string;
  synonyms: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: words[];
}

export interface Meaning {
  partOfSpeech: string;
  synonyms: string[];
  definitions: Definition[];
}

export interface Definition {
  partOfSpeech: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

export interface Phonetic {
  text: string;
  audio: string;
}

export type forApi = Welcome[];

export type meanings = Definitions[];

export interface Definitions {
  definition: string;
  example: string;
  synonyms: any[];
  antonyms: any[];
}

interface definitions {
  definition: string;
  synonyms: any[];
  antonyms: any[];
  example?: string;
}

interface words {
  partOfSpeech: string;
  definitions: definitions[];
  synonyms: any[];
  antonyms: any[];
  example?: string;
}

export interface error {
  title: string;
  message: string;
  resolution: string;
}

export type final = words[];
