import { Component, OnInit } from '@angular/core';
import {leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { from } from 'rxjs';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  Leaders:leader[];

  constructor(private leaderService:LeaderService, private route:ActivatedRoute,location:Location) { }

  ngOnInit() {
    this.Leaders = this.leaderService.getLeaders();
    
  }
 

}
