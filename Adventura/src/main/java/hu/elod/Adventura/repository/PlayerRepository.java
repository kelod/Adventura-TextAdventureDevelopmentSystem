package hu.elod.Adventura.repository;


import hu.elod.Adventura.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
}
