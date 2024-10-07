import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RemoveSperatorService {
  constructor() {}

  remove_(s: string): string {
    return s?.replace(new RegExp('_', 'g'), ' ');
  }
}
