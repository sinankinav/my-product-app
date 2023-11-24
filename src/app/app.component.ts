import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,DragDropModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent implements OnInit {
  title = 'Products';
  products: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const apiUrl = 'https://dummyjson.com/products';
    this.http.get(apiUrl).subscribe(
      (data: any) => {

        if (data && Array.isArray(data.products)) {
          this.products = data.products;
          this.totalItems = this.products.length;
        } else {
          console.error('Hatalı veri yapısı:', data);
        }
      },
      (error) => {
        console.error('API veri çekme hatası:', error);
      }
      
    );
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
  getPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  
}