package hu.elod.Adventura.JTO;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class PassageJTO {

    private Integer id;

    private boolean defaultEnabled;

    private String description;

    private RoomJTO from;

    private RoomJTO to;

    //private List<ItemJTO> requestedItems;

    //private List<EnemyJTO> activationRewardForEnemies;
}
