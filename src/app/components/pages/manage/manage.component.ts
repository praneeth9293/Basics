import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { LoginService } from 'src/app/services/login.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  foodItems: Food[];
  constructor(router: Router, loginService: LoginService, private foodService: FoodService) {
    if (!loginService.isLoggedIn() || !loginService.IsAdmin()) {
      router.navigate(["/"])
    }
    this.foodItems = foodService.getAll()
  }

  ngOnInit(): void {
  }

  handleDelete(id: string) {
    this.foodService.deleteFoodItem(id)
  }


}
