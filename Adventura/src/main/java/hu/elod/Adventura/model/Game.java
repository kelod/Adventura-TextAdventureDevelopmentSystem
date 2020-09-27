package hu.elod.Adventura.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "tbl_games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    private String gameGoal;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="goal_room_id", referencedColumnName = "id")
    private Room goalRoom;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="player_id", referencedColumnName = "id")
    private Player player;

    @OneToMany(
            mappedBy = "presentInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Room> rooms = new HashSet<>();

    @OneToMany(
            mappedBy = "goalInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Enemy> goalEnemies = new HashSet<>();

    @OneToMany(
            mappedBy = "goalInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Item> goalItems = new HashSet<>();

    @OneToMany(
            mappedBy = "presentInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Item> items = new HashSet<>();

    @OneToMany(
            mappedBy = "presentInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Passage> passages = new HashSet<>();
}
