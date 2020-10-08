package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.PassageActivationIG;
import hu.elod.Adventura.model.PassageActivationKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassageActivationIGRepository extends JpaRepository<PassageActivationIG, PassageActivationKey> {
    List<PassageActivationIG> findByItemId(Integer id);
}
