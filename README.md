# Activité Pratique N°3 — Angular 19 : Gestion de Produits

Deux projets :

- `inset-app/` — frontend Angular 19 Standalone (Bootstrap 5 + Bootstrap Icons), port 4200
- `backend-products/` — API REST Spring Boot 3 (JPA + H2), port 8083, `@CrossOrigin("*")`

## Lancer

```bash
# 1) Backend
cd backend-products
mvn spring-boot:run          # http://localhost:8083/products

# 2) Frontend
cd inset-app
npm install
ng serve                     # http://localhost:4200
```

## Contenu

| Étape | Où |
|---|---|
| Standalone (sans NgModule) | `main.ts` → `bootstrapApplication`, `app.config.ts` |
| Bootstrap 5 + Icons | `src/styles.css` |
| Routage (`routerLink`, `<router-outlet>`) | `app.routes.ts`, `app.component.html` |
| `@if` / `@for` / `@else` | `products.component.html` |
| Service + injection de dépendances | `services/product.service.ts` |
| HttpClient + Observables RxJS | `provideHttpClient()` + `subscribe({next, error})` |
| CORS | `ProductRestController` → `@CrossOrigin("*")` |

### Exercices d'approfondissement

1. **Formulaire d'ajout** — `new-product/` (Reactive Forms + validation) → `POST /products`
2. **Toggle Selection** — clic sur le badge → `PATCH /products/{id}` `{ "selected": ... }`
3. **Filtre dynamique** — barre de recherche `[(ngModel)]="keyword"` + getter `filteredProducts`

## API

| Méthode | URL | Rôle |
|---|---|---|
| GET | `/products` | liste |
| GET | `/products/{id}` | un produit |
| POST | `/products` | création |
| PATCH | `/products/{id}` | mise à jour partielle |
| DELETE | `/products/{id}` | suppression |

Console H2 : http://localhost:8083/h2-console (JDBC URL `jdbc:h2:mem:products-db`).
