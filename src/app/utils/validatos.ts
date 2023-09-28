import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';

export class MyValidatos{

  static isReservedPlanificion(control: AbstractControl){
    const value = control.value;
    //console.log(value);
    if ( value ===" Reserved"){
      return{estado_invalido: true};
    }
    return null;
  }

  static requireMatch(control: AbstractControl){
    const selection: any = control. value;
    if (typeof selection === 'string') {
        return {incorrect: true};
    }
    return null;
  }

  static autocomple(control: AbstractControl){
    if (control.value && control.value.length === 0) {
        return {valid: true};
    }
    return null;
  }


  static autocompleteObjectValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeof control.value === 'string') {
        return { 'invalidAutocompleteObject': { value: control.value } }
      }
      return null  /* valid option selected */
    }
  }

  static autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (validOptions.indexOf(control.value) !== -1) {
        return null  /* valid option selected */
      }
      return { 'invalidAutocompleteString': { value: control.value } }
    }
  }


}
