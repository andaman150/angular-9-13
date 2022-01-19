import { Product } from 'src/app/models/product.model';
import { environment } from './../../environments/environment';
import { ProductResponse } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ProductResponse[]>{
    return this.httpClient.get<ProductResponse[]>(`product`)
  }

  getProduct(id: number): Observable<ProductResponse>{
    return this.httpClient.get<ProductResponse>(`product/${id}`)
  }

  getProductImageUrl(image: string): string{
    if(image){
      return `${environment.baseUrl}images/${image}`
    }
    return './assets/images/no_photo.jpg'
  }

  deleteProduct(id: number): Observable<any>{
    return this.httpClient.delete<any>(`product/${id}`)
  }

  addProduct(product: Product): Observable<ProductResponse>{
    return this.httpClient.post<ProductResponse>(`product`, this.makeForm(product))
  }

  editProduct(id: number, product: Product): Observable<ProductResponse>{
    return this.httpClient.put<ProductResponse>(`product/${id}`, this.makeForm(product))
  }

  makeForm(product: Product): FormData{
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', `${product.price}`)
    formData.append('stock', `${product.stock}`)
    formData.append('photo', product.image)

    return formData
  }
}
