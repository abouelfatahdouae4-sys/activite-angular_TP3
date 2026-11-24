package ma.emsi.backend.web;

import ma.emsi.backend.entities.Product;
import ma.emsi.backend.repositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/products")
public class ProductRestController {

    private final ProductRepository repository;

    public ProductRestController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Product> products() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> product(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Exercice 1 : création
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product save(@RequestBody Product product) {
        product.setId(null);
        return repository.save(product);
    }

    // Exercice 2 : mise à jour partielle de "selected"
    @PatchMapping("/{id}")
    public ResponseEntity<Product> patch(@PathVariable Long id, @RequestBody Map<String, Object> fields) {
        return repository.findById(id).map(p -> {
            if (fields.containsKey("selected")) p.setSelected((Boolean) fields.get("selected"));
            if (fields.containsKey("name")) p.setName((String) fields.get("name"));
            if (fields.containsKey("price")) p.setPrice(((Number) fields.get("price")).doubleValue());
            return ResponseEntity.ok(repository.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
