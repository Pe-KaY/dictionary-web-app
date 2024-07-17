import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { forApi } from '../my-interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (localStorage.getItem('darkMode')) {
      const toggle = document.querySelector('.toggle');
      toggle?.toggleAttribute('darkmode');
      this.isDarkMode = true;
    }
    this.getWord('keyboard');
  }

  getWord(word: string): void {
    this.http.get<forApi>(`${this.apiUrl}${word}`).subscribe({
      next: (data: forApi) => {
        if (data && data.length > 0) {
          const neededData = {
            word: data[0].word,
            phonetic: data[0].phonetic,
            audio: data[0].phonetics[0]?.audio || '',
            speech: data[0].meanings[0]?.partOfSpeech || '',
            definition1: data[0].meanings[0]?.definitions[0]?.definition || '',
            definition2: data[0].meanings[0]?.definitions[1]?.definition || '',
            definition3: data[0].meanings[0]?.definitions[2]?.definition || '',
            synonyms: data[0].meanings[0]?.synonyms[0] || '',
            speech2: data[0].meanings[1]?.partOfSpeech || '',
            definition4: data[0].meanings[1]?.definitions[0]?.definition || '',
            definition5: data[0].meanings[1]?.definitions[1]?.definition || '',
          };

          this.word = neededData.word;
          this.phonetic = neededData.phonetic;
          this.audio = neededData.audio;
          this.synonyms = neededData.synonyms;
          this.partofSpeech = neededData.speech;
          this.definition1 = neededData.definition1;
          this.definition2 = neededData.definition2;
          this.definition3 = neededData.definition3;
          this.partofSpeech2 = neededData.speech2;
          this.definition4 = neededData.definition4;
          this.definition5 = neededData.definition5;

          console.log(this.partofSpeech2);
        }
      },
      error: (error) => {
        console.log(`There was an error: ${error}`);
      },
    });
  }

  // Dictionary words
  apiUrl: string = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  word: string = '';
  phonetic: string = '';
  partofSpeech: string = '';
  audio: string = '';
  synonyms: string = '';
  definition1: string = '';
  definition2: string = '';
  definition3: string = '';
  partofSpeech2: string = '';
  definition4: string = '';
  definition5: string = '';

  // Or handle the error differently
  dictionary(word: string) {
    if (!word) {
      console.log('error');
      return;
    }
    this.getWord(word);
  }
  // darkmode boolean
  isDarkMode: boolean = false;
  // searchbar focused
  isFocused: boolean = false;

  // Darkmode toggle function
  darkMode() {
    const toggle = document.querySelector('.toggle');
    toggle?.toggleAttribute('darkmode');
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode)
      window.localStorage.setItem(
        'darkMode',
        this.isDarkMode ? 'true' : 'false'
      );
    else {
      window.localStorage.removeItem('darkMode');
    }
  }

  //search bar styling function
  onfocus() {
    this.isFocused = true;
  }
  onblur() {
    this.isFocused = false;
  }
}
