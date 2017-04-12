import { Injectable } from '@angular/core';


@Injectable()
export class ValidatorService {
    constructor() { }

    //Validar email
    emailValido(email : string) : boolean {
        var resultado = false;
        let regexpEmail = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if ((email != undefined) && (email.length > 0) && (regexpEmail.test(email)))
        {
            resultado = true;
        }
        return resultado;
    }

    //Validar texto
    textoValido(texto : string) : boolean {
        var resultado = false;

        if ((texto != undefined) && (texto.length > 5))
        {
            return true;
        }

        return resultado;
    }

    textoValidoCorto(texto : string) : boolean {
        var resultado = false;

        if ((texto != undefined) && (texto.length > 2))
        {
            return true;
        }

        return resultado;
    }    
}