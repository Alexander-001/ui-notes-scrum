import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CarouselComponent } from './components/Carousel/carousel.component';
import { LoaderComponent } from './components/Loader/loader.component';
import { NavbarComponent } from './components/Navbar/navbar.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    Error404PageComponent,
    LoaderComponent,
    NavbarComponent,
    CarouselComponent,
  ],
  declarations: [
    Error404PageComponent,
    LoaderComponent,
    NavbarComponent,
    CarouselComponent,
  ],
})
export class SharedModule {}
