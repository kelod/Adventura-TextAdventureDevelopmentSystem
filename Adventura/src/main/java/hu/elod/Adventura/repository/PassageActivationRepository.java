package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.PassageActivation;
import hu.elod.Adventura.model.PassageActivationKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PassageActivationRepository extends JpaRepository<PassageActivation, PassageActivationKey> {
}
