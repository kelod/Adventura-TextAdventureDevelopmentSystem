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
    private Set<Item> startingItems = new HashSet<>();

    @OneToOne(mappedBy = "startingRoomAtPlayer")
    private Room startingRoom;

    @OneToOne(mappedBy = "player")
    private Game playerInGame;
}
