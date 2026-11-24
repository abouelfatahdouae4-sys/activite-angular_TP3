package ma.emsi.backend;

import ma.emsi.backend.entities.Product;
import ma.emsi.backend.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendProductsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendProductsApplication.class, args);
    }

    @Bean
    CommandLineRunner init(ProductRepository repository) {
        return args -> {
            repository.save(new Product(null, "Ordinateur Portable", 1300, true));
            repository.save(new Product(null, "Imprimante Multifonction", 300, false));
            repository.save(new Product(null, "Smartphone 5G", 800, true));
        };
    }
}
