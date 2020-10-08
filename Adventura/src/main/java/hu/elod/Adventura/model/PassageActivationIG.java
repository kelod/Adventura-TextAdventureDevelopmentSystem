package hu.elod.Adventura.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "tbl_ingame_passage_activations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PassageActivationIG {

    @EmbeddedId
    IGPassageActivationKey id;

    private boolean enable;

    @ManyToOne
    @MapsId("itemId")
    @JoinColumn(name = "item_id")
    ItemIG item;

    @ManyToOne
    @MapsId("passageId")
    @JoinColumn(name = "passage_id")
    PassageIG passage;
}
