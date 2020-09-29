package hu.elod.Adventura;

import hu.elod.Adventura.model.Item;
import hu.elod.Adventura.repository.ItemRepository;
import hu.elod.Adventura.service.CreationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AdventuraApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdventuraApplication.class, args);
	}

}
