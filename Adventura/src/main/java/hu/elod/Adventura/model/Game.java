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

    private boolean anySessionStarted;

    private boolean deployed;

    private String name;

    @Lob
    @Column(name="description", length=1024)
    private String description;

    @Lob
    @Column(name="win_description", length=1024)
    private String winDescription;

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
    private Set<Room> rooms;

    @OneToMany(
            mappedBy = "goalInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Enemy> goalEnemies;

    @OneToMany(
            mappedBy = "goalInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Item> goalItems;

    @OneToMany(
            mappedBy = "presentInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Item> items;

    @OneToMany(
            mappedBy = "presentInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Enemy> enemies;

    @OneToMany(
            mappedBy = "presentInGame",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Passage> passages;

    @OneToMany(
            mappedBy = "gameDefinition",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<GameSession> gameSessions;


    public void addItem(Item item){
        if(items == null){
            items = new HashSet<>();
        }
        items.add(item);
        item.setPresentInGame(this);
    }

    public void addRoom(Room room){
        if(rooms == null){
            rooms = new HashSet<>();
        }
        rooms.add(room);
        room.setPresentInGame(this);
    }

    public void addEnemy(Enemy enemy){
        if(enemies == null){
            enemies = new HashSet<>();
        }
        enemies.add(enemy);
        enemy.setPresentInGame(this);
    }

    public void addPassage(Passage passage){
        if(passages == null){
            passages = new HashSet<>();
        }
        passages.add(passage);
        passage.setPresentInGame(this);
    }

    public void addGoalEnemy(Enemy enemy){
        if(goalEnemies == null){
            goalEnemies = new HashSet<>();
        }
        goalEnemies.add(enemy);
        enemy.setGoalInGame(this);
    }

    public void addGoalItem(Item item){
        if(goalItems == null){
            goalItems = new HashSet<>();
        }
        goalItems.add(item);
        item.setGoalInGame(this);
    }

    public Enemy getEnemyByName(String name){
        if(enemies != null) {
            for (Enemy enemy : enemies) {
                if (enemy.getName().equals(name)) {
                    return enemy;
                }
            }
        }

        return null;
    }

    public Item getItemByName(String name){
        if(items != null) {
            for (Item item : items) {
                if (item.getName().equals(name)) {
                    return item;
                }
            }
        }

        return null;
    }

    public Room getRoomByName(String name){
        if(rooms != null) {
            for (Room room : rooms) {
                if (room.getName().equals(name)) {
                    return room;
                }
            }
        }

        return null;
    }

    public Passage getPassageByRooms(Room roomFrom, Room roomTo){
        for(Passage passage : passages){
            if(passage.getFrom() == roomFrom && passage.getTo() == roomTo){
                return passage;
            }
        }
        return null;
    }
}
