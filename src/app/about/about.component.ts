import { Component, OnInit } from '@angular/core';
import {leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {flyInOut,expand} from '../animations/app.animation';
import { from } from 'rxjs';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[flyInOut(),expand()]
})
export class AboutComponent implements OnInit {

  Leaders:leader[];

  constructor(private leaderService:LeaderService, private route:ActivatedRoute,location:Location) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe((Leaders)=>this.Leaders = Leaders)
    
  }
 

}
