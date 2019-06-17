import { Injectable } from '@angular/core';
import {leader} from'../shared/leader';
import {LEADERS} from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():leader[]{
    return LEADERS;
  }
  getLeader(id:string):leader{
    return LEADERS.filter((Leader)=>(Leader.id===id))[0];
  }
  getFeaturedLeader():leader{
    return LEADERS.filter((Leader)=>(Leader.featured))[0];
  }

}
