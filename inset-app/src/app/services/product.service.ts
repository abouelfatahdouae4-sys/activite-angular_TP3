import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host: string = 'http://localhost:8083';

  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products`);
  }

  public deleteProduct(p: Product): Observable<void> {
    return this.http.delete<void>(`${this.host}/products/${p.id}`);
  }

  // Exercice 1 : ajout d'un produit
  public saveProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`, p);
  }

  // Exercice 2 : bascule de l'état "selected" (PATCH)
  public toggleSelection(p: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.host}/products/${p.id}`, { selected: !p.selected });
  }
}
