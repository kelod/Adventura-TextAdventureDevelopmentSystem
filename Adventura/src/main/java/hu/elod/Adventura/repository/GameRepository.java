package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Integer> {

}
