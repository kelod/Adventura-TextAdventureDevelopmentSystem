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
@Table(name = "tbl_items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String description;

    private String game;

    private int hp;

    private String name;

    private String type;

    private String usageDescription;

    private String usageType;

    @ManyToOne(fetch = FetchType.LAZY)
    private Game goalInGame;

    @ManyToOne(fetch = FetchType.LAZY)
    private Game presentInGame;

    @ManyToOne(fetch = FetchType.LAZY)
    private Player startingItemAtPlayer;

    @ManyToOne(fetch = FetchType.LAZY)
    private Room presentInRoom;

    @ManyToMany(mappedBy = "itemGainReward")
    private Set<Enemy> rewardForEnemies;

    @ManyToMany(mappedBy = "itemLosePenalty")
    private Set<Enemy> losePenaltyForEnemies;

    @ManyToMany(mappedBy = "requestedItems")
    private Set<Passage> requestedInPassages;

    public void addRequestedInPassage(Passage passage){
        if(requestedInPassages == null){
            requestedInPassages = new HashSet<>();
        }
        requestedInPassages.add(passage);
        passage.getRequestedItems().add(this);
    }
}
