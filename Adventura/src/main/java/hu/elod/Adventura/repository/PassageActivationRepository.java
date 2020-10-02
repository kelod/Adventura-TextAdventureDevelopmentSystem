package hu.elod.Adventura.repository;

import hu.elod.Adventura.model.PassageActivation;
import hu.elod.Adventura.model.PassageActivationKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PassageActivationRepository extends JpaRepository<PassageActivation, PassageActivationKey> {
    List<PassageActivation> findByItemId(Integer id);

    List<PassageActivation> findByPassageId(Integer id);

    @Query(value="select p.item_id, p.passage_id, p.enable " +
            "from tbl_passage_activations p, tbl_items i " +
            "where p.item_id = i.id and i.present_in_game_id = ?1",
            nativeQuery = true)
    List<PassageActivation> findByPresentInGameId(Integer id);

    PassageActivation findByItemIdAndPassageId(Integer itemId, Integer passageId);
}
