import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodItems: BehaviorSubject<Food[]> = new BehaviorSubject([] as Food[]);
  constructor() {
    this.foodItems.subscribe((_foods) => {
      this.saveFoodItemsToLocalStorage(_foods)
    });
    this.initializeFoodItems();
  }

  getAll(): Food[] {
    return this.foodItems.getValue();
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Food[] {
    return tag === "All" ?
      this.getAll() :
      this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId: string): Food {
    return this.getAll().find(food => food.id == foodId) ?? new Food();
  }

  addFoodItem(item: Food): void {
    const _foodItems = this.foodItems.getValue();
    let nextId = (+_foodItems[_foodItems.length - 1].id) + 1;

    _foodItems.push(
      {
        ...item,
        id: nextId.toString(),

        // name: 'Hamburger',
        // price: 5,
        // cookTime: '10-15',
        // favorite: false,
        // origins: ['germany', 'us'],
        // stars: 3.5,
        // imageUrl: 'assets/food-3.jpg',
        // tags: ['FastFood', 'Hamburger'],
      });
    this.foodItems.next(_foodItems);
  }


  deleteFoodItem(id: string): void {
    const _foodItems = this.foodItems.getValue();
    let nextId = (+_foodItems[_foodItems.length - 1].id) + 1;
    const deleteIndex = _foodItems.findIndex(item => item.id === id)
    _foodItems.splice(deleteIndex, 1);
    this.foodItems.next(_foodItems);
  }

  private initializeFoodItems(): void {
    const foods = localStorage.getItem('foodItems');
    const parsedFoods = foods ? JSON.parse(foods) : sample_foods;
    this.foodItems.next(parsedFoods?.length ? parsedFoods : sample_foods)
  }

  private saveFoodItemsToLocalStorage(_foods: Food[]): void {
    if (_foods?.length) {
      const foods = JSON.stringify(_foods);
      localStorage.setItem('foodItems', foods);
    }
  }
}
