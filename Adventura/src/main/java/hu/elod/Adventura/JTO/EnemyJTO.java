package hu.elod.Adventura.JTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class EnemyJTO {

    private int attack;

    private int battleEndHp;

    private String description;

    private String fightingType;

    private boolean gameOverPenalty;

    private int hp;

    private int hpGainReward;

    private List<ItemJTO> itemGainReward;

    private List<ItemJTO> itemLosePenalty;

    private String name;

    private List<PassageJTO> passageActivationReward;

    private String postBattleDescriptionLose;

    private String postBattleDescriptionWin;

    private String preBattleDescription;

}