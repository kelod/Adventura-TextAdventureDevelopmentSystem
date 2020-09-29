package hu.elod.Adventura.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "tbl_passage_activations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PassageActivation {

    @EmbeddedId
    PassageActivationKey id;

    private boolean enable;

    @ManyToOne
    @MapsId("itemId")
    @JoinColumn(name = "item_id")
    Item item;

    @ManyToOne
    @MapsId("passageId")
    @JoinColumn(name = "passage_id")
    Passage passage;
}
