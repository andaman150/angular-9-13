import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.scss']
})
export class StockHomeComponent implements OnInit {

  displayedColumns = ['image', 'name', 'price', 'stock', 'action']

  dataSource = new MatTableDataSource<Product>();

  textSearch: string | undefined;

  @ViewChild(MatSort, {static: true}) sort: MatSort | null = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null = null;


  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.feedData();
  }

  feedData() {
    const dummy: Product[] = [
      {
        name: "Eligendi qui exercitationem quidem. Id deserunt cumque. Non earum odio error dolores.",
        stock: 11244,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      },
      {
        name: "mac book",
        stock: 2222,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      },
      {
        name: "mac book",
        stock: 344,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      },
      {
        name: "mac book",
        stock: 4222,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      },
      {
        name: "mac book",
        stock: 5444,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      },
      {
        name: "Eligendi qui exercitationem quidem. Id deserunt cumque. Non earum odio error dolores.",
        stock: 11244,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      },
      {
        name: "mac book",
        stock: 2222,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      },
      {
        name: "mac book",
        stock: 344,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      },
      {
        name: "mac book",
        stock: 4222,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      },
      {
        name: "mac book",
        stock: 5444,
        price: 20000,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg"
      }
    ]

    this.dataSource.data = dummy
  }


  search(event: Event | null) {
    let fliterValue = '';
    if (event) {
      fliterValue = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = fliterValue.trim().toLowerCase();
  }

  clearSearch() {
    this.textSearch = '';
    this.search(null);
  }
}
