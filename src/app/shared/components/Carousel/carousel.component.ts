import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'shared-carousel',
  templateUrl: 'carousel.component.html',
  styleUrls: ['carousel.component.css'],
})
export class CarouselComponent {
  @Input() numberCarousel: number = 0;
  public currentSlide: number = 0;
  private startX: number = 0;
  private isDragging: boolean = false;

  nextSlide(): void {
    if (this.currentSlide < 2) {
      this.currentSlide = (this.currentSlide + 1) % 3;
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide = (this.currentSlide - 1 + 3) % 3;
    }
  }

  isCurrentSlide(slideIndex: number): boolean {
    return this.currentSlide === slideIndex;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.clientX;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.handleSwipe(event.clientX);
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.handleSwipe(event.touches[0].clientX);
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    this.isDragging = false;
  }

  handleSwipe(endX: number): void {
    const deltaX = endX - this.startX;
    const SWIPE_THRESHOLD = 150;
    if (deltaX > SWIPE_THRESHOLD) {
      this.prevSlide();
      this.isDragging = false;
    } else if (deltaX < -SWIPE_THRESHOLD) {
      this.nextSlide();
      this.isDragging = false;
    }
  }
}
