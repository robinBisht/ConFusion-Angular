import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';
import {DishService} from '../services/dish.service';
import { from } from 'rxjs';
import {flyInOut,expand} from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[flyInOut(),expand()]
})
export class MenuComponent implements OnInit {

  dishes:Dish[];

  selectedDish:Dish;

  constructor(private dishService:DishService) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe((dishes)=>this.dishes = dishes)
  }

  onSelect(dish:Dish)
  {
    this.selectedDish = dish;
  }

}
