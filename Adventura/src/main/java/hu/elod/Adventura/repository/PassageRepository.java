package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.Passage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassageRepository extends JpaRepository<Passage, Integer> {
    List<Passage> findByPresentInGameId(Integer id);
}
