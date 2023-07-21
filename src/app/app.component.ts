import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

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

  xd: any;

  constructor(private formBuilder: FormBuilder, private clipboard: Clipboard) {}

  optionCliked: string = '';

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      branch: ['', Validators.required],
    });
  }

  getErrorInputForm(campo: string) {
    return !this.form.get(campo)?.valid;
  }

  validErrorInputForm(campo: string) {
    return {
      valid: this.getErrorInputForm(campo),
    };
  }

  getOption(event: string) {
    this.form.valueChanges.subscribe((valor) => {
      this.optionCliked = `${event}/${valor.id}-${valor.branch
        .toLowerCase()
        .replace(/\s+/g, '-')}`;
    });
  }

  copy() {
    this.clipboard.copy(this.optionCliked);

    console.log(this.optionCliked);

    alert(`Copiado ${this.optionCliked}`);
  }
}
