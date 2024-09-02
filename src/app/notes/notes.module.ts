import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { NoteCardComponent } from './components/note-card/node-card.component';
import { NotesRoutingModule } from './notes.routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule, NotesRoutingModule],
  declarations: [HomePageComponent, NoteCardComponent],
})
export default class NotesModule {}
