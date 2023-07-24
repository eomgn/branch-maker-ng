import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnackBarService } from './snack-bar.service';

const options = [
  { option: 'task' },
  { option: 'bug' },
  { option: 'enhancement' },
  { option: 'hotfix' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Branch Maker';

  options = options;

  form!: FormGroup;

  optionCliked: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private clipboard: Clipboard,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      branch: ['', Validators.required],
    });
  }

  getOption(event: string) {
    this.form.valueChanges.subscribe((form) => {
      this.optionCliked = `${event}/${form.id}-${form.branch
        .toLowerCase()
        .replace(/\s+/g, '-')}`;
    });
  }

  copy() {
    this.clipboard.copy(`git checkout -b ${this.optionCliked}`);

    // alert(`Copiado ${this.optionCliked}`);

    this.snackBar.showNofity(`Copiado ${this.optionCliked}`);
  }
}
