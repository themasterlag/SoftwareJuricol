import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AutenticadorService } from './autenticador.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService {

  constructor() { }
}


@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(public servicioAutenticar: AutenticadorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `${this.servicioAutenticar.GetToken()}`
      }
    });
    return next.handle(request);
  }
}