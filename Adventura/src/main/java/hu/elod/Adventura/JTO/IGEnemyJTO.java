package hu.elod.Adventura.JTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class IGEnemyJTO {

    private Integer id;

    private boolean alive;

    private int attack;

    private int battleEndHp;

    private String description;

    private String fightingType;

    private boolean gameOverPenalty;

    private int hp;

    private int hpGainReward;

    private List<IGItemJTO> itemGainReward;

    private List<IGItemJTO> itemLosePenalty;

    private String name;

    private List<IGPassageJTO> passageActivationReward;

    private String postBattleDescriptionLose;

    private String postBattleDescriptionWin;

    private String preBattleDescription;

    private IGRoomJTO presentInRoom;
}
