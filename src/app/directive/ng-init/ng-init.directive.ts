import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ngInit]'
})
export class NgInitDirective {

  @Input() ngInit;

  constructor() { }

  ngOnInit() {
    // this.ngInit;
  }
}
