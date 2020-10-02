package hu.elod.Adventura.JTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayerJTO {

    private Integer id;

    private int attack;

    private int hp;

    private String name;

    private List<ItemJTO> startingItems;

    private RoomJTO startingRoom;
}
