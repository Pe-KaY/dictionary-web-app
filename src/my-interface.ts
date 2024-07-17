export interface Welcome {
  word:      string;
  phonetic:  string;
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
  origin:    string;
  meanings:  Meaning[];
}

export interface Meaning {
  partOfSpeech: string;
  synonyms:     string[];
  definitions:  Definition[];
}

export interface Definition {
  definition: string;
  example:    string;
  synonyms:   string[];
  antonyms:   string[];
}

export interface Phonetic {
  text:   string;
  audio: string;
}

export type forApi = Welcome[]



