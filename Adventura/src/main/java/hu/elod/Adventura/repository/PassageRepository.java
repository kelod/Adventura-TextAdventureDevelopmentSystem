package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.Passage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassageRepository extends JpaRepository<Passage, Integer> {
}
