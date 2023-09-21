import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function emailValidator(existingEmails: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string; // Assurez-vous que la valeur est de type string
  
      // Ajoutez votre logique de validation personnalisée ici
      // Vérifiez si l'email est présent dans la liste existingEmails
      if (existingEmails.includes(value)) {
        return { emailExists: true }; // Retourne une erreur si l'email existe déjà
      }
  
      return null; // L'email est valide
    };
  }
  
  