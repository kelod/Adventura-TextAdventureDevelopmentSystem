package hu.elod.Adventura.JTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GameToCreateJTO {

    private String name;

    private String description;

    private String gameGoal;

    private List<EnemyJTO> goalEnemies;

    private List<ItemJTO> goalItems;

    private RoomJTO goalRoom;

    private List<ItemJTO> items;

    private List<PassageJTO> passages;

    private PlayerJTO player;

    private List<RoomJTO> rooms;

    private List<EnemyJTO> enemies;

}
