import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  Leader:leader;
  constructor(private dishservice:DishService,private promotionservice:PromotionService,private leaderservice:LeaderService) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe((dish)=>this.dish=dish)
    this.promotionservice.getFeatuedPromotion()
    .subscribe((promotion)=>this.promotion=promotion)
    this.leaderservice.getFeaturedLeader()
    .subscribe((Leader)=>this.Leader=Leader)
  }

}
