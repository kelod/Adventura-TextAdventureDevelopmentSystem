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
@Table(name="tbl_ingame_rooms")
public class RoomIG {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Lob
    @Column(name="description", length=1024)
    private String description;

    @OneToOne(mappedBy = "goalRoom")
    private GameSession goalInGameSession;

    @OneToOne(mappedBy = "inRoom")
    private PlayerIG playerInRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    private GameSession presentInGameSession;

    @OneToMany(
            mappedBy = "presentInRoom"
    )
    private Set<ItemIG> items;

    @OneToMany(
            mappedBy = "presentInRoom"
    )
    private Set<EnemyIG> enemies;

    @OneToMany(
            mappedBy = "from",
            cascade = CascadeType.ALL
    )
    private Set<PassageIG> roomFromInPassages;

    @OneToMany(
            mappedBy = "to",
            cascade = CascadeType.ALL
    )
    private Set<PassageIG> roomToInPassages;

    public void addItem(ItemIG item){
        if(items == null){
            items = new HashSet<>();
        }

        items.add(item);
        item.setPresentInRoom(this);
    }

    public void addEnemy(EnemyIG enemy){
        if(enemies == null){
            enemies = new HashSet<>();
        }

        enemies.add(enemy);
        enemy.setPresentInRoom(this);
    }

}
