package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.PassageIG;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassageIGRepository extends JpaRepository<PassageIG, Integer> {
    List<PassageIG> findByPresentInGameSessionId(Integer id);
}
