package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.GameSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameSessionRepository extends JpaRepository<GameSession, Integer> {
}
