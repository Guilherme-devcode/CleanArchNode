import { validateSync } from "class-validator";
import { FieldsErrors, ValidatorsFieldsInterface } from "./validator-fields.interface";

export abstract class ClassValidatorFields<PropsValidated> implements ValidatorsFieldsInterface<PropsValidated>{
  errors: FieldsErrors = null;
  validatedData?: PropsValidated = null;

  public validate(data: any): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      this.errors = {}
      errors.forEach(error => {
        const field = error.property
        this.errors[field] = Object.values(error.constraints)
      });
    } else {
      this.validatedData = data;
    }
    return !errors.length
  }
}
