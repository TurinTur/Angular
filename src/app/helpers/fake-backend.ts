import { HttpClient } from '@angular/common/http';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(
    backend: MockBackend,
    options: BaseRequestOptions) {

  //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';
  //let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTI3Mjg2NDUyLCJqdGkiOiJjYTU3YzEyNy01MjZkLTQ1MzctODA1Ni1lNTYzNmU2NjhjYWQiLCJpYXQiOjE1MjcyODI4NTJ9.m45hPRKSIOHofV9OPWJHQh9XdI4ULx9NF3N6R_Fovww';
  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTI3NjI4NjQ1MiwianRpIjoiY2E1N2MxMjctNTI2ZC00NTM3LTgwNTYtZTU2MzZlNjY4Y2FkIiwiaWF0IjoxNTI3MjY4Mjg1Mn0.zPkI83OCs1Itvr3ju2gd20h3XUBWCNRoPmgk065FyJE';
/* equivalente a:
{
  "alg": "HS256",
  "typ": "JWT"
}
{
  "sub": "1234567890",
  "name": "Mosh Hamedani",
  "admin": true
}
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),

your-256-bit-secret
)
*/
  backend.connections.subscribe((connection: MockConnection) => {     //se subscribe a toda conexión que pase por el backend.
    // We are using the setTimeout() function to simulate an
    // asynchronous call to the server that takes 1 second.
    setTimeout(() => {                                                //y hace que todo se ejecute y se devuelva 1 segundo mas tarde de forma asincrona
      //    
      // Fake implementation of /api/authenticate
      //
      if (connection.request.url.endsWith('/api/authenticate') &&     //si recibimos un http.post de la url adecuada...
        connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());

        if (body.email === 'mosh@domain.com' && body.password === '1234') { //con el nombry y password adecuado, devolvemos el token de arriba.
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
           })));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200 })
          ));
        }
      }



       //
       // Fake implementation of /api/orders
       //
       if (connection.request.url.endsWith('/api/orders') &&
           connection.request.method === RequestMethod.Get) {
         if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {   //api/orders necesita un token en el header. lo adjunto en order.service
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: [1, 2, 3] })
         ));
       } else {
           connection.mockRespond(new Response(
             new ResponseOptions({ status: 401 })
           ));
       }
    }



    }, 1000);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide:  Http,                  //intercepta toda llamada al servicio http y le da en cambio fakeBackendFactory. Esta usa los dos mismos objetos que se necesitan para
    useFactory: fakeBackendFactory,       //crear un objeto http nuevo normal y corriente, pero haciendo operaciones dentro del backend
    deps: [MockBackend, BaseRequestOptions]
};
