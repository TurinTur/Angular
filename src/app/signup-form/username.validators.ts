import { AbstractControl, ValidationErrors } from "@angular/forms";

//custom validator

export class UsernameValidators {

    static cannotContainSpace(control: AbstractControl) : ValidationErrors{         //static, para no tener que hacer una instancia de esta clase

        if ((control.value as string).indexOf(' ') >= 0 ) {
            return { cannotContainSpace: true};                  // se tiene que devolver un key/value, de cualquier tipo
            /*return { minlength: {                             // Puedes tener objetos mas complejos dentro del value
                                requiredLength: 10,
                                 actualLength: control.value.length}
            }*/
        }
        return null;
    }

    //Async validator
    static shouldBeUnique (control: AbstractControl) : Promise<ValidationErrors | null> {  // simularemos la llamada a http con setTimeout,
        let promise= new Promise((resolve,reject)=>{
            setTimeout(() => {                                  // JS: setTiemout es algo asincrono, como un http real, por eso nos sirve para simular...
                console.log('timeout') ;
                if (control.value === 'mosh')
                    resolve({ shouldBeUnique: true });        //las promesas dan una resolución , o un reject con un mensaje si han fallado. no usan return
                else 
                    reject (null);
             }, 2000);
         })
         promise.catch((err) => console.error(err));;
         return promise;

    }
}