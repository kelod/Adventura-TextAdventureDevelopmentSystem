package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}
