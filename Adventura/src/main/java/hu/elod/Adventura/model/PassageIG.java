package hu.elod.Adventura.model;


import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="tbl_ingame_passages")
public class PassageIG {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private boolean enabled;

    private String preDescription;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private RoomIG from;

    @ManyToOne(fetch = FetchType.LAZY)
    private RoomIG to;

    @ManyToOne(fetch = FetchType.LAZY)
    private GameSession presentInGameSession;

    @ManyToMany(mappedBy = "passageActivationReward")
    private Set<EnemyIG> activationRewardForEnemies;

    @ManyToMany
    @JoinTable(
            name = "in_game_requested_items_passages",
            joinColumns = @JoinColumn(name = "passage_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<ItemIG> requestedItems;

    public void setFrom(RoomIG from){
        this.from = from;
        from.getRoomFromInPassages().add(this);
    }

    public void setTo(RoomIG to){
        this.to = to;
        to.getRoomToInPassages().add(this);
    }

    public void addRequestedItem(ItemIG item){
        if(requestedItems == null){
            requestedItems = new HashSet<>();
        }
        requestedItems.add(item);
        item.getRequestedInPassages().add(this);
    }
}
