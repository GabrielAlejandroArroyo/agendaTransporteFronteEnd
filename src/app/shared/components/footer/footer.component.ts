import { Component, ElementRef, HostListener, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent  {
  public emailField: FormControl;
  public windowScroll: number;
  public version: string;

  constructor() {
      this.windowScroll = window.pageYOffset;
      this.version = VERSION.major;
      this.emailField = new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(10),
      ]);
      this.emailField.valueChanges.subscribe((value) => {
        //console.log(value);
      });
  }
  @HostListener('window:scroll', ['$event'])
  public handleScroll(): void {
      this.windowScroll = window.pageYOffset;
  }
}
