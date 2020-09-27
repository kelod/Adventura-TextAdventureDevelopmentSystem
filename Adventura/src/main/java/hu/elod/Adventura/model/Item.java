package hu.elod.Adventura.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
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
    private Game presentInRoom;

    @ManyToMany(mappedBy = "itemGainReward")
    private Set<Enemy> rewardForEnemies = new HashSet<>();

    @ManyToMany(mappedBy = "itemLosePenalty")
    private Set<Enemy> losePenaltyForEnemies = new HashSet<>();

    @ManyToMany(mappedBy = "requestedItems")
    private Set<Passage> requestedInPassages = new HashSet<>();
}
