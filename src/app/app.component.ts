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

  optionCliked: string = 'task';
  result: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private clipboard: Clipboard,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    // formbuilder
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      branch: ['', Validators.required],
    });

    // subscribe in form for valuechanges
    this.form.valueChanges.subscribe((form) => {
      // show result
      this.result = `${this.optionCliked}/${form.id}-${form.branch
        .toLowerCase()
        .replace(/\s+/g, '-')}`;
    });
  }

  getOption(event: string) {
    // capture value from option clicked
    this.optionCliked = event;
  }

  copy() {
    this.clipboard.copy(`git checkout -b ${this.result}`);

    this.snackBar.showNofity(`Copiado com sucesso!`);
  }

  revealCopy() {
    return this.form.valid;
  }
}
