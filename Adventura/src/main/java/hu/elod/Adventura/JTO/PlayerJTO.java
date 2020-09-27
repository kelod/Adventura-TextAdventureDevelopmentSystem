package hu.elod.Adventura.JTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlayerJTO {

    private int attack;

    private int hp;

    private String name;

    private List<ItemJTO> startingItems;

    private RoomJTO startingRoom;
}
