import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Session }  from '../models/session';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

private readonly apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  getNextPlannedSession(): Observable<Session>{
    return this.http.get<Session>(this.apiUrl + '/api/nextsession');
  }

  isSessionActive(): Observable<Boolean>{
    return this.http.get<{isActive : boolean}>(this.apiUrl + '/api/activeSession').pipe(map((response) => response.isActive));
  }

  getSessionPlanifie(): Observable<Session>{
    return this.http.get<Session>(this.apiUrl + '/api/planified');
  }

  getSessionEnCours(): Observable<Session>{
    return this.http.get<Session>(this.apiUrl + '/api/encours');
  }

  addSession(session : Session): Observable<Session>{
    return this.http.post<Session>(this.apiUrl, session);
  }

  deleteSession(idSession : string): Observable<Session>{
    return this.http.delete<Session>(this.apiUrl + '/api/' + idSession)
  }

  getAllSession(): Observable<Session[]>{
    return this.http.get<Session[]>(this.apiUrl + '/api/');
  }
}
