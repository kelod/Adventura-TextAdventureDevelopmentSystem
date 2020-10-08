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
@Table(name="tbl_ingame_items")
public class ItemIG {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private boolean used;

    private String description;

    private String game;

    private int hp;

    private String name;

    private String type;

    private String usageDescription;

    private String usageType;

    @ManyToOne(fetch = FetchType.LAZY)
    private GameSession goalInGameSession;

    @ManyToOne(fetch = FetchType.LAZY)
    private GameSession presentInGameSession;

    @ManyToOne(fetch = FetchType.LAZY)
    private PlayerIG inPlayersInventory;

    @ManyToOne(fetch = FetchType.LAZY)
    private RoomIG presentInRoom;

    @ManyToMany(mappedBy = "itemGainReward")
    private Set<EnemyIG> rewardForEnemies;

    @ManyToMany(mappedBy = "itemLosePenalty")
    private Set<EnemyIG> losePenaltyForEnemies;

    @ManyToMany(mappedBy = "requestedItems")
    private Set<PassageIG> requestedInPassages;

    public void addRequestedInPassage(PassageIG passage){
        if(requestedInPassages == null){
            requestedInPassages = new HashSet<>();
        }
        requestedInPassages.add(passage);
        passage.getRequestedItems().add(this);
    }

    public void addPresentInRoom(RoomIG room){
        presentInRoom = room;
        room.getItems().add(this);
    }

}
