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
@Table(name = "tbl_rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    @OneToOne(mappedBy = "goalRoom")
    private Game goalInGame;

    @OneToOne(mappedBy = "startingRoom")
    private Player startingRoomAtPlayer;

    @ManyToOne(fetch = FetchType.LAZY)
    private Game presentInGame;

    @OneToMany(
            mappedBy = "presentInRoom",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Item> items = new HashSet<>();

    @OneToMany(
            mappedBy = "presentInRoom",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Enemy> enemies = new HashSet<>();

    @OneToMany(
            mappedBy = "from",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Passage> roomFromInPassages = new HashSet<>();

    @OneToMany(
            mappedBy = "to",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Passage> roomToInPassages = new HashSet<>();
}
