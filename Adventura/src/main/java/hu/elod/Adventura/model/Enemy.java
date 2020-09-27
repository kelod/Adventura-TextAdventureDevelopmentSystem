package hu.elod.Adventura.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
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

    @ManyToMany
    @JoinTable(
            name = "item_rewards_for_enemies",
            joinColumns = @JoinColumn(name = "enemy_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<Item> itemGainReward = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "item_lose_penalty_for_enemies",
            joinColumns = @JoinColumn(name = "enemy_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<Item> itemLosePenalty = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "passage_activation_reward_for_enemies",
            joinColumns = @JoinColumn(name = "enemy_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private Set<Passage> passageActivationReward = new HashSet<>();
}
