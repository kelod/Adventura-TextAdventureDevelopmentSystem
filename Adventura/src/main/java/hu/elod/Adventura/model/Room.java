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
            mappedBy = "presentInRoom"
    )
    private Set<Item> items;

    @OneToMany(
            mappedBy = "presentInRoom"
    )
    private Set<Enemy> enemies;

    @OneToMany(
            mappedBy = "from",
            cascade = CascadeType.ALL
    )
    private Set<Passage> roomFromInPassages;

    @OneToMany(
            mappedBy = "to",
            cascade = CascadeType.ALL
    )
    private Set<Passage> roomToInPassages;

    public void addItem(Item item){
        if(items == null){
            items = new HashSet<>();
        }

        items.add(item);
        item.setPresentInRoom(this);
    }

    public void addEnemy(Enemy enemy){
        if(enemies == null){
            enemies = new HashSet<>();
        }

        enemies.add(enemy);
        enemy.setPresentInRoom(this);
    }
}
