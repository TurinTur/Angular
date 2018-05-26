import { Directive, HostListener, ElementRef, Input } from '@angular/core';  // vamos a manejar dos eventos de dos, Host y Blur

@Directive({
  selector: '[appInputFormat]'    // directivas usan []. cualquier elemento que tenga este selector será aplicado la directiva
})
export class InputFormatDirective {

  @Input('format') format2;
  @Input('appInputFormat') format;
  constructor(private el: ElementRef) { }             // servicio de Angular que nos da acceso a DOM object

  @HostListener('focus') onFocus(){
    console.log("on focus");
  }
  @HostListener('blur') onBlur(){
    
    let value:string =this.el.nativeElement.value;  
    console.log(value, this.format);
    if (this.format == 'lowercase') {
      this.el.nativeElement.value = value.toLowerCase();              //dom element nativo
    }
    else{
      this.el.nativeElement.value = value.toUpperCase();
    }

  }

}
