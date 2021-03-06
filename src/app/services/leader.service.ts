import { Injectable } from '@angular/core';
import {leader} from'../shared/leader';
import {LEADERS} from '../shared/leaders';
import { Observable,of } from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Observable<leader[]>{
    return of(LEADERS).pipe(delay(2000));
  }
  getLeader(id:string):Observable<leader>{
    return of(LEADERS.filter((Leader)=>(Leader.id===id))[0]).pipe(delay(2000));
  }
  getFeaturedLeader():Observable<leader>{
    return of(LEADERS.filter((Leader)=>(Leader.featured))[0]).pipe(delay(2000));
  }

}
