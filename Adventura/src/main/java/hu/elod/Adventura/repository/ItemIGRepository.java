package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.ItemIG;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemIGRepository extends JpaRepository<ItemIG, Integer> {
    List<ItemIG> findByPresentInGameSessionId(Integer id);

    List<ItemIG> findByInPlayersInventoryId(Integer id);
}
