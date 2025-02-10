import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Session }  from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly apiUrl = 'http://localhost:5000/api';

  constructor(private http : HttpClient) { }

  getNextPlannedSession(): Observable<Session>{
    return this.http.get<Session>(this.apiUrl + '/nextsession');
  }

  isSessionActive(): Observable<Boolean>{
    return this.http.get<{isActive : boolean}>(this.apiUrl + '/activeSession').pipe(map((response) => response.isActive));
  }

  getSessionPlanifie(): Observable<Session>{
    return this.http.get<Session>(this.apiUrl + '/planified');
  }

  getSessionEnCours(): Observable<Session>{
    return this.http.get<Session>(this.apiUrl + '/encours');
  }

  addSession(session : Session): Observable<Session>{
    return this.http.post<Session>(this.apiUrl, session);
  }

  deleteSession(idSession : string): Observable<Session>{
    return this.http.delete<Session>(this.apiUrl + '/' + idSession)
  }

  getAllSession(): Observable<Session[]>{
    return this.http.get<Session[]>(this.apiUrl);
  }
}
