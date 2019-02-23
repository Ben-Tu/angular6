import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt'




@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/register',user,{headers: headers})
      .map(res=>res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/authenticate',user,{headers: headers})
      .map(res=>res.json());    
  }

  getProfile(){
    //const headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.authToekn});
    //const options = new RequestOptions({ headers: headers }); 
    
    const headers = new Headers();
    this.loadToken();
    headers.append('Content-Type','application/json');
    headers.append('Authorization',this.authToken);
    return this.http.get('users/profile',{headers: headers})
      .map(res=>res.json());
  }

  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
