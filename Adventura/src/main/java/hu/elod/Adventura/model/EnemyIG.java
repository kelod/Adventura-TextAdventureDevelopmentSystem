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
@Table(name="tbl_ingame_enemies")
public class EnemyIG {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private int attack;

    private int battleEndHp;

    private String description;

    private String fightingType;

    private boolean gameOverPenalty;

    private boolean alive;

    private int hp;

    private int hpGainReward;

    private String postBattleDescriptionLose;

    private String postBattleDescriptionWin;

    private String preBattleDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    private GameSession goalInGameSession;

    @ManyToOne(fetch = FetchType.LAZY)
    private RoomIG presentInRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    private GameSession presentInGameSession;

    @ManyToMany
    @JoinTable(
            name = "in_game_item_rewards_for_enemies",
            joinColumns = @JoinColumn(name = "enemy_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<ItemIG> itemGainReward;

    @ManyToMany
    @JoinTable(
            name = "in_game_item_lose_penalty_for_enemies",
            joinColumns = @JoinColumn(name = "enemy_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<ItemIG> itemLosePenalty;

    @ManyToMany
    @JoinTable(
            name = "in_game_passage_activation_reward_for_enemies",
            joinColumns = @JoinColumn(name = "enemy_id"),
            inverseJoinColumns = @JoinColumn(name = "passage_id"))
    private Set<PassageIG> passageActivationReward;

    public void addItemGainReward(ItemIG item){
        if(itemGainReward == null){
            itemGainReward = new HashSet<>();
        }
        itemGainReward.add(item);
        item.getRewardForEnemies().add(this);
    }

    public void addItemLosePenalty(ItemIG item){
        if(itemLosePenalty == null){
            itemLosePenalty = new HashSet<>();
        }
        itemLosePenalty.add(item);
        item.getLosePenaltyForEnemies().add(this);
    }

    public void addPresentInRoom(RoomIG room){
        presentInRoom = room;
        room.getEnemies().add(this);
    }

    public void addPassageActivationReward(PassageIG passage){
        if(passageActivationReward == null){
            passageActivationReward = new HashSet<>();
        }
        passageActivationReward.add(passage);
        passage.getActivationRewardForEnemies().add(this);
    }
}
