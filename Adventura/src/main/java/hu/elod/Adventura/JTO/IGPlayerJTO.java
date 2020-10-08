package hu.elod.Adventura.JTO;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IGPlayerJTO {

    private Integer id;

    private int attack;

    private int hp;

    private String name;

    private List<IGItemJTO> inventory;

    private IGRoomJTO inRoom;
}
