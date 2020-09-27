package hu.elod.Adventura.JTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RoomJTO {

    private String description;

    private List<EnemyJTO> enemies;

    private List<ItemJTO> items;

    private String name;
}
