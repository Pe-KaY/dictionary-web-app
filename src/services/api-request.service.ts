import { Injectable } from '@angular/core';
import { Welcome } from '../my-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  constructor() {}

}