import { Component, OnInit, Input,Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Comment} from '../shared/comment';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import {visibility,flyInOut,expand} from '../animations/app.animation';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[flyInOut(),visibility(),expand()]
})
export class DishDetailComponent implements OnInit {
  
  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;
  comment:Comment;
  feedback:Feedback;
  commentForm:FormGroup;
  visibility='shown';
  errMess:string;

  formError = {
    'author':'',
    'rating':'',
    'comment':''
  }

  validationMessages = {
    'author':{
      'required':'name is required',
      'minLength':'minimum length of 2 characters required',

    },
    'rating':{
      'required':'rating is required'
    },
    'comment':{
      'required':'comment is required',
      'minLength':'minimum length of 10 characters required',
      'maxLength':'maximum length of 140 characters allowed'
    }
  }

  constructor(private dishservice:DishService, private route:ActivatedRoute,
     private location:Location, private fb:FormBuilder,
     @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.createForm();


    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,
      errmess => this.errMess = <any>errmess);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden';return this.dishservice.getDish(params['id']);}))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); this.visibility='shown'; });
  }

  createForm(){
    this.commentForm = this.fb.group({
      author: ['',[Validators.required,Validators.minLength(2)]],
      rating:5,
      comment:['',[Validators.required,Validators.minLength(10),Validators.maxLength(140)]]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged()
  }


  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formError) {
      if (this.formError.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formError[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formError[field] += messages[key] + ' ';
            }
          }
        }

        if (this.commentForm.valid) {
          this.comment = this.commentForm.value;
        } else {
          this.comment = undefined;
        }
      }
    }
  }

  onSubmit(){
    
      console.log(this.comment);
      this.comment['date'] = new Date().toISOString();
      this.dish.comments.push(this.comment);
      this.commentForm.reset({
      name:'',
      ratings:5,
      comment:''
    });

  }

  setPrevNext(dishId:string)
  {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index-1)%this.dishIds.length]
    this.prev = this.dishIds[(this.dishIds.length + index+1)%this.dishIds.length]
  }

  goBack():void{
    this.location.back();
  }
}
