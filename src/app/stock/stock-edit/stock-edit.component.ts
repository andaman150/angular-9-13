import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {

  product: Product = new Product;

  @ViewChild('productForm', {static: true}) productForm!: NgForm

  imagePreview!: string | ArrayBuffer | null;
  file!: File;

  constructor(
    private activatedRoute: ActivatedRoute,
    private networkService: NetworkService,
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next:(data)=>{
        this.feedProduct(data['id'])
      }
    })
  }

  feedProduct(id: number){
    this.networkService.getProduct(id).subscribe({
      next: (data) => {
        const {id, name, price, stock, image} = {...data}
        this.productForm.setValue({id, name, price, stock})
        this.imagePreview = this.networkService.getProductImageUrl(image);
      }
    })
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

    this.networkService.editProduct(values.id, product).subscribe({
      next:()=>{this.location.back()}
    })
  }


}
