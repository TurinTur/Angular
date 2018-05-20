import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'summary'                     // la pipe se llamara con | summary
})
export class SummaryPipe implements PipeTransform {
    transform(value: string, limit?:number) {       //limit es un parametro opcional que nos hemos inventado
        if (!value){
            return null;
        }
        let actualLimit = (limit) ? limit : 50;     //si limit existe, aplicarlo, si no aplicar 50
        return value.substr(0,actualLimit) + '...';
    }
}