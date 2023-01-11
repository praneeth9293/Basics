import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { LoginService } from 'src/app/services/login.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-add-food-item',
  templateUrl: './add-food-item.component.html',
  styleUrls: ['./add-food-item.component.css']
})
export class AddFoodItemComponent implements OnInit {
  foodItem = new Food();
  constructor(private foodService: FoodService, private router: Router, loginService: LoginService) {
    if (!loginService.isLoggedIn() || !loginService.IsAdmin()) {
      router.navigate(["/"])
    }
  }

  ngOnInit(): void {
  }

  handleStarRatingChange(e: any) {
    if (this.foodItem.stars > 5) {
      this.foodItem.stars = 5
    }
    else if (this.foodItem.stars < 1) {
      this.foodItem.stars = 0
    }
  }

  handleAdd() {
    this.foodService.addFoodItem(this.foodItem);
    this.router.navigate(["manage"])
  }
}
