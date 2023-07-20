import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'branch-maker';

  optionCliked: string = '';

  options = [
    { option: 'Task' },
    { option: 'Bug' },
    { option: 'Enhancement' },
    { option: 'Hotfix' },
  ];

  getOption(event: string) {
    this.optionCliked = event;
  }
}
