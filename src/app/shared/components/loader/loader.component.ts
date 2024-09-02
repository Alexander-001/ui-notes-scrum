import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  constructor() {}

  @Input()
  public serviceName!: string;
}
