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
@Table(name = "tbl_players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int attack;

    private int hp;

    private String name;

    @OneToMany(
            mappedBy = "startingItemAtPlayer",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Item> startingItems;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "starting_room_id", referencedColumnName = "id")
    private Room startingRoom;

    @OneToOne(mappedBy = "player")
    private Game playerInGame;

    public void addStartingItem(Item item){
        if(startingItems == null){
            startingItems = new HashSet<>();
        }
        startingItems.add(item);
        item.setStartingItemAtPlayer(this);
    }
}
