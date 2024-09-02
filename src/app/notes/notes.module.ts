import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CarouselComponent } from './components/Carousel/carousel.component';
import { NoteCardComponent } from './components/NoteCard/node-card.component';
import { NotesRoutingModule } from './notes.routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule, NotesRoutingModule],
  declarations: [HomePageComponent, NoteCardComponent, CarouselComponent],
})
export default class NotesModule {}
