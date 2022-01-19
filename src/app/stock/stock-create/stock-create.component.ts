import { NetworkService } from './../../services/network.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent implements OnInit {

  imagePreview!: string | ArrayBuffer | null;
  file!: File;

  constructor(private networkService: NetworkService, private location: Location) { }

  ngOnInit(): void {
  }

  onPreviewImage(event: any) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      this.file = metaImage;

      const reader = new FileReader();
      reader.readAsDataURL(metaImage)
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
    }
  }

  onSubmit(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    }

    const values = productForm.value;
    let product = new Product();
    product.name = values.name;
    product.price = values.price;
    product.stock = values.stock;
    product.image = this.file;

    this.networkService.addProduct(product).subscribe({
      next:()=>{this.location.back()}
    })
  }

}
