import { FormGroup } from '@angular/forms';

export class ComponentUtil {

  constructor() {}

  campoValidoUtil(campo: string, error: string, form: FormGroup): boolean {
    return form.controls[campo].touched && form.controls[campo].hasError(error);
  }

}
