package hu.elod.Adventura.model;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "tbl_enemies")
public class Enemy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private int attack;

    private int battleEndHp;

    private String description;

    private String fightingType;

    private boolean gameOverPenalty;

    private int hp;

    private int hpGainReward;

    private String postBattleDescriptionLose;

    private String postBattleDescriptionWin;

    private String preBattleDescription;


    @ManyToOne(fetch = FetchType.LAZY)
    private Game goalInGame;

    @ManyToOne(fetch = FetchType.LAZY)
    private Room presentInRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    private Game presentInGame;

    @ManyToMany
    @JoinTable(
            name = "item_rewards_for_enemies",
            joinColumns = @JoinColumn(name = "enemy_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<Item> itemGainReward;

    @ManyToMany
    @JoinTable(
            name = "item_lose_penalty_for_enemies",
            joinColumns = @JoinColumn(name = "enemy_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<Item> itemLosePenalty;

    @ManyToMany
    @JoinTable(
            name = "passage_activation_reward_for_enemies",
            joinColumns = @JoinColumn(name = "enemy_id"),
            inverseJoinColumns = @JoinColumn(name = "passage_id"))
    private Set<Passage> passageActivationReward;

    public void addItemGainReward(Item item){
        if(itemGainReward == null){
            itemGainReward = new HashSet<>();
        }
        itemGainReward.add(item);
        item.getRewardForEnemies().add(this);
    }

    public void addItemLosePenalty(Item item){
        if(itemLosePenalty == null){
            itemLosePenalty = new HashSet<>();
        }
        itemLosePenalty.add(item);
        item.getLosePenaltyForEnemies().add(this);
    }
}
