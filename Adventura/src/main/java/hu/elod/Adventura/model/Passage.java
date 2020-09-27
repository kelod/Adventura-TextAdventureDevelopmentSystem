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
    private Set<Enemy> activationRewardForEnemies = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "requested_items_passages",
            joinColumns = @JoinColumn(name = "passage_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<Item> requestedItems = new HashSet<>();
}
