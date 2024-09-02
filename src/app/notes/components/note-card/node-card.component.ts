import { Component, Input } from '@angular/core';

@Component({
  selector: 'notes-note-card',
  templateUrl: 'note-card.component.html',
})
export class NoteCardComponent {
  @Input()
  public noteMessage!: string;
}
