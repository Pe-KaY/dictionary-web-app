import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // darkmode boolean
  isDarkMode: boolean = false;
  // searchbar focused
  isFocused: boolean = false;

  // Darkmode toggle function
  darkMode() {
    const toggle = document.querySelector('.toggle');
    toggle?.toggleAttribute('darkmode');
    this.isDarkMode = !this.isDarkMode;
  }

  //search bar styling function
  onfocus() {
    this.isFocused = true;
  }
  onblur() {
    this.isFocused = false;
  }
}
