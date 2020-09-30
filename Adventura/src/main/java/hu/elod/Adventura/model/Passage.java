package hu.elod.Adventura.model;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "tbl_passages")
public class Passage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private boolean defaultEnabled;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private Room from;

    @ManyToOne(fetch = FetchType.LAZY)
    private Room to;

    @ManyToOne(fetch = FetchType.LAZY)
    private Game presentInGame;

    @ManyToMany(mappedBy = "passageActivationReward")
    private Set<Enemy> activationRewardForEnemies;

    @ManyToMany
    @JoinTable(
            name = "requested_items_passages",
            joinColumns = @JoinColumn(name = "passage_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<Item> requestedItems;

    public void setFrom(Room from){
        this.from = from;
        from.getRoomFromInPassages().add(this);
    }

    public void setTo(Room to){
        this.to = to;
        to.getRoomToInPassages().add(this);
    }

    public void addRequestedItem(Item item){
        if(requestedItems == null){
            requestedItems = new HashSet<>();
        }
        requestedItems.add(item);
        item.getRequestedInPassages().add(this);
    }

    /*public void addActivationRewardForEnemies(Enemy enemy){
        if(activationRewardForEnemies == null){
            activationRewardForEnemies = new HashSet<>();
        }
        activationRewardForEnemies.add(enemy);
        enemy.getPassageActivationReward().add(this);
    }*/
}
