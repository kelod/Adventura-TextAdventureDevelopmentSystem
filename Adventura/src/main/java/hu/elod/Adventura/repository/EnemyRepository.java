package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.Enemy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnemyRepository extends JpaRepository<Enemy, Integer> {
}
