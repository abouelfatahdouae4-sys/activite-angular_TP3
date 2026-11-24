import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';

// Exercice 1 : formulaire d'ajout (Reactive Forms)
@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  productForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private router: Router) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(1)]],
      selected: [false]
    });
  }

  saveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.productService.saveProduct(this.productForm.value).subscribe({
      next: () => this.router.navigateByUrl('/products'),
      error: (err) => {
        console.error(err);
        this.errorMessage = "Erreur lors de l'enregistrement du produit.";
      }
    });
  }

  invalid(field: string): boolean {
    const c = this.productForm.get(field);
    return !!c && c.invalid && c.touched;
  }
}
