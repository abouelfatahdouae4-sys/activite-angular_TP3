import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] | undefined;
  keyword: string = '';
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
        this.errorMessage = 'Impossible de joindre le backend (http://localhost:8083).';
      }
    });
  }

  // Exercice 3 : filtre dynamique en temps réel
  get filteredProducts(): Product[] {
    const kw = this.keyword.trim().toLowerCase();
    if (!this.products) return [];
    return kw ? this.products.filter(p => p.name.toLowerCase().includes(kw)) : this.products;
  }

  handleDelete(p: Product) {
    const conf = confirm('Voulez-vous vraiment supprimer ' + p.name + ' ?');
    if (conf) {
      this.productService.deleteProduct(p).subscribe({
        next: () => this.getProducts(),
        error: (err) => console.error('Erreur de suppression :', err)
      });
    }
  }

  // Exercice 2 : clic sur le badge -> PATCH
  handleToggle(p: Product) {
    this.productService.toggleSelection(p).subscribe({
      next: (updated) => (p.selected = updated.selected),
      error: (err) => console.error('Erreur de mise à jour :', err)
    });
  }
}
