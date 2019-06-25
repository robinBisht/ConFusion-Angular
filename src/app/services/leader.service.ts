import { Injectable } from '@angular/core';
import {leader} from'../shared/leader';
import {LEADERS} from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Promise<leader[]>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS),2000)
    });
  }
  getLeader(id:string):Promise<leader>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((Leader)=>(Leader.id===id))[0]),2000)
    });
  }
  getFeaturedLeader():Promise<leader>{
    return new Promise(resolve=>{
      setTimeout(()=>resolve(LEADERS.filter((Leader)=>(Leader.featured))[0]),2000)
    });
  }

}
