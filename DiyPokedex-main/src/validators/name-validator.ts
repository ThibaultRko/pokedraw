import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function nameValidator(existingNames: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string; // Assurez-vous que la valeur est de type string
  
      // Ajoutez votre logique de validation personnalisée ici
      // Vérifiez si le nom est présent dans la liste existingNames
      if (existingNames.includes(value)) {
        return { nameExists: true }; // Retourne une erreur si l'email existe déjà
      }
  
      return null; // Le nom est valide
    };
  }