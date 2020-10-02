package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.Game;
import hu.elod.Adventura.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    List<Item> findByPresentInGameId(Integer id);

}
