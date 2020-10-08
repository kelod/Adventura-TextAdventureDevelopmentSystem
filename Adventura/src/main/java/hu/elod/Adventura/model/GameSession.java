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
@Table(name="tbl_game_sessions")
public class GameSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private boolean finished;

    @ManyToOne(fetch = FetchType.LAZY)
    private Game gameDefinition;

    private String name;

    private String description;

    private String gameGoal;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="goal_room_id", referencedColumnName = "id")
    private RoomIG goalRoom;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="player_id", referencedColumnName = "id")
    private PlayerIG player;

    @OneToMany(
            mappedBy = "presentInGameSession",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<RoomIG> rooms;

    @OneToMany(
            mappedBy = "goalInGameSession",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<EnemyIG> goalEnemies;

    @OneToMany(
            mappedBy = "goalInGameSession",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<ItemIG> goalItems;

    @OneToMany(
            mappedBy = "presentInGameSession",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<ItemIG> items;

    @OneToMany(
            mappedBy = "presentInGameSession",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<EnemyIG> enemies;

    @OneToMany(
            mappedBy = "presentInGameSession",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<PassageIG> passages;

    public void addItem(ItemIG item){
        if(items == null){
            items = new HashSet<>();
        }
        items.add(item);
        item.setPresentInGameSession(this);
    }

    public void addRoom(RoomIG room){
        if(rooms == null){
            rooms = new HashSet<>();
        }
        rooms.add(room);
        room.setPresentInGameSession(this);
    }

    public void addEnemy(EnemyIG enemy){
        if(enemies == null){
            enemies = new HashSet<>();
        }
        enemies.add(enemy);
        enemy.setPresentInGameSession(this);
    }

    public void addPassage(PassageIG passage){
        if(passages == null){
            passages = new HashSet<>();
        }
        passages.add(passage);
        passage.setPresentInGameSession(this);
    }

    public void addGoalEnemy(EnemyIG enemy){
        if(goalEnemies == null){
            goalEnemies = new HashSet<>();
        }
        goalEnemies.add(enemy);
        enemy.setGoalInGameSession(this);
    }

    public void addGoalItem(ItemIG item){
        if(goalItems == null){
            goalItems = new HashSet<>();
        }
        goalItems.add(item);
        item.setGoalInGameSession(this);
    }

    public EnemyIG getEnemyByName(String name){
        if(enemies != null) {
            for (EnemyIG enemy : enemies) {
                if (enemy.getName().equals(name)) {
                    return enemy;
                }
            }
        }

        return null;
    }

    public ItemIG getItemByName(String name){
        if(items != null) {
            for (ItemIG item : items) {
                if (item.getName().equals(name)) {
                    return item;
                }
            }
        }

        return null;
    }

    public RoomIG getRoomByName(String name){
        if(rooms != null) {
            for (RoomIG room : rooms) {
                if (room.getName().equals(name)) {
                    return room;
                }
            }
        }

        return null;
    }

    public PassageIG getPassageByRooms(RoomIG roomFrom, RoomIG roomTo){
        for(PassageIG passage : passages){
            if(passage.getFrom() == roomFrom && passage.getTo() == roomTo){
                return passage;
            }
        }
        return null;
    }

    public void setGameDefinition(Game gameDefinition){
        this.gameDefinition = gameDefinition;
        gameDefinition.getGameSessions().add(this);
    }

    public void setGoalRoom(RoomIG goalRoom){
        this.goalRoom = goalRoom;
        goalRoom.setGoalInGameSession(this);
    }

}
