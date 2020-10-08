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
@Table(name="tbl_ingame_players")
public class PlayerIG {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int attack;

    private int hp;

    private String name;

    @OneToMany(
            mappedBy = "inPlayersInventory"
    )
    private Set<ItemIG> inventory;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "in_room_id", referencedColumnName = "id")
    private RoomIG inRoom;

    @OneToOne(mappedBy = "player")
    private GameSession playerInGameSession;

    public void addItemToInventory(ItemIG item){
        if(inventory == null){
            inventory = new HashSet<>();
        }
        inventory.add(item);
        item.setInPlayersInventory(this);
    }

    public void setInRoom(RoomIG room){
        if(this.inRoom != null) {
            this.inRoom.setPlayerInRoom(null); // null for previous room
        }

        this.inRoom = room;
        room.setPlayerInRoom(this);
    }
}
