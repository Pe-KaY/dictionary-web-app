import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { final, forApi } from '../my-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
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
  }

  getWord(word: string): void {
    this.http.get<forApi>(`${this.apiUrl}${word}`).subscribe({
      next: (data: forApi) => {
        if (data && data.length > 0) {
          let audiofile: string = '';
          for (let i = 0; i < data[0].phonetics.length; i++) {
            if (data[0].phonetics[i]?.audio) {
              audiofile = data[0].phonetics[i]?.audio;
              break;
            }
          }
          // stores dictionary data into a local array
          this.meaning = data[0].meanings;

          //for the header
          const neededData = {
            word: data[0].word,
            phonetic: data[0].phonetic,
            audio: audiofile || '',
          };
          // assigns it to local variables to be used in the html template
          this.word = neededData.word;
          this.SourceUrl = `https://en.wiktionary.org/wiki/${neededData.word}`;
          this.phonetic = neededData.phonetic;
          this.audio = neededData.audio;
          // disables error screen if enabled
          this.noError = true;
          this.yesError = false;
          // show some elements(by defaults all is hidden on load)
          if (!this.show) {
            this.show = true;
          }
        }
      },
      error: (_error) => {
        // displays error screen
        this.noError = false;
        this.yesError = true;
        // setting error message
        this.title = 'No Definitions Found';
      },
    });
  }

  // Dictionary words
  meaning: final = [];
  apiUrl: string = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  word: string = '';
  phonetic: string = '';
  audio: string = '';
  SourceUrl: string = '';
  // WORD error handling Screen
  title: string = '';
  noError: boolean = true;
  yesError: boolean = false;
  show: boolean = false;

  // dictionary search function
  dictionary(word: string) {
    if (!word) {
      this.errorhandle();
      return;
    }
    this.isError = false;
    this.getWord(word);
    this.clearSearch();
  }
  // Enter key to search function
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.dictionary(this.input.nativeElement.value);
    }
  }
  // play audio function
  playAudio() {
    const audio = new Audio(this.audio);
    audio.play();
  }
  //  clear search word
  @ViewChild('input') input!: ElementRef;
  clearSearch() {
    this.input.nativeElement.value = '';
  }
  // choose font style
  fontMenu: boolean = true;
  fontstyle: string = 'sans-serif';
  selectedFont: string = 'Sans serif';
  // toggle font menu
  toggleFontMenu() {
    this.fontMenu = !this.fontMenu;
  }
  // choose font style
  chooseFont(font: string) {
    this.fontstyle = font;
    this.fontMenu = true;
    if (font === 'sans-serif') this.selectedFont = 'Sans serif';
    if (font === 'serif') this.selectedFont = 'Serif';
    if (font === 'monospace') this.selectedFont = 'Mono';
  }

  // darkmode
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
  isError: boolean = false;
  onfocus() {
    this.isFocused = true;
  }
  onblur() {
    this.isFocused = false;
  }
  errorhandle() {
    this.isFocused = false;
    this.isError = true;
  }
}
