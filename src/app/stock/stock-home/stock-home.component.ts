import { ProductResponse } from './../../models/product.model';
import { NetworkService } from './../../services/network.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.scss']
})
export class StockHomeComponent implements OnInit {

  displayedColumns = ['image', 'name', 'price', 'stock', 'action'];

  dataSource = new MatTableDataSource<Product>();

  textSearch: string | undefined;

  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;


  constructor(private networkService: NetworkService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.feedData();
  }

  feedData() {
    this.networkService.getProducts().subscribe({
      next: (v) => {
        this.dataSource.data = v.map(item => {
          item.image = this.networkService.getProductImageUrl(item.image)
          return item
        })
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  onClickDeleteProduct(product: ProductResponse) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to DELETE!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.networkService.deleteProduct(product.id).subscribe({
          next: (data) => Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ),
          error: (err) => {
            console.error(err);
          }
        })
        this.feedData()
      }
    })
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
