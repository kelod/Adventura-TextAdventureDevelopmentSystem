package hu.elod.Adventura.service;

import hu.elod.Adventura.JTO.*;
import hu.elod.Adventura.model.*;
import hu.elod.Adventura.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CreationService {

    @Autowired
    private EnemyRepository enemyRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private PassageActivationRepository passageActivationRepository;

    @Autowired
    private PassageRepository passageRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private RoomRepository roomRepository;


    public boolean saveGameFromJTO(GameToCreateJTO gameToCreate){

        //Setting up newGame
        Game newGame =  Game.builder()
                        .name(gameToCreate.getName())
                        .description(gameToCreate.getDescription())
                        .gameGoal(gameToCreate.getGameGoal())
                        .enemies(new HashSet<>())
                        .goalEnemies(new HashSet<>())
                        .goalItems(new HashSet<>())
                        .items(new HashSet<>())
                        .passages(new HashSet<>())
                        .rooms(new HashSet<>())
                        .build();

        gameToCreate.getItems().forEach(itemJTO -> {
            newGame.addItem(Item.builder()
                            .name(itemJTO.getName())
                            .description(itemJTO.getDescription())
                            .game(itemJTO.getGame())
                            .hp(itemJTO.getHp())
                            .usageDescription(itemJTO.getUsageDescription())
                            .type(itemJTO.getType())
                            .usageType(itemJTO.getUsageType())
                            .losePenaltyForEnemies(new HashSet<>())
                            .requestedInPassages(new HashSet<>())
                            .rewardForEnemies(new HashSet<>())
                            .build());
        });

        gameToCreate.getRooms().forEach(roomJTO -> {
            newGame.addRoom(Room.builder()
                            .name(roomJTO.getName())
                            .description(roomJTO.getDescription())
                            .items(new HashSet<>())
                            .enemies(new HashSet<>())
                            .roomFromInPassages(new HashSet<>())
                            .roomToInPassages(new HashSet<>())
                            .build());
        });

        gameToCreate.getEnemies().forEach(enemyJTO -> {
            newGame.addEnemy(Enemy.builder()
                            .name(enemyJTO.getName())
                            .description(enemyJTO.getDescription())
                            .attack(enemyJTO.getAttack())
                            .battleEndHp(enemyJTO.getBattleEndHp())
                            .fightingType(enemyJTO.getFightingType())
                            .gameOverPenalty(enemyJTO.isGameOverPenalty())
                            .hp(enemyJTO.getHp())
                            .hpGainReward(enemyJTO.getHpGainReward())
                            .postBattleDescriptionLose(enemyJTO.getPostBattleDescriptionLose())
                            .postBattleDescriptionWin(enemyJTO.getPostBattleDescriptionWin())
                            .preBattleDescription(enemyJTO.getPreBattleDescription())
                            .itemGainReward(new HashSet<>())
                            .itemLosePenalty(new HashSet<>())
                            .passageActivationReward(new HashSet<>())
                            .build());
        });

        gameToCreate.getPassages().forEach(passageJTO -> {
            Passage passageToAdd = Passage.builder()
                    .defaultEnabled(passageJTO.isDefaultEnabled())
                    .description(passageJTO.getDescription())
                    .activationRewardForEnemies(new HashSet<>())
                    .requestedItems(new HashSet<>())
                    .build();
            passageToAdd.setFrom(newGame.getRoomByName(passageJTO.getFrom().getName()));
            passageToAdd.setTo(newGame.getRoomByName(passageJTO.getTo().getName()));
            newGame.addPassage(passageToAdd);
        });

        gameToCreate.getGoalEnemies().forEach(enemyJTO -> {
            newGame.addGoalEnemy(newGame.getEnemyByName(enemyJTO.getName()));
        });

        gameToCreate.getGoalItems().forEach(itemJTO -> {
            newGame.addGoalItem(newGame.getItemByName(itemJTO.getName()));
        });

        if(gameToCreate.getGoalRoom() != null) {
            newGame.setGoalRoom(newGame.getRoomByName(gameToCreate.getGoalRoom().getName()));
        }

        newGame.setPlayer(Player.builder()
                            .name(gameToCreate.getPlayer().getName())
                            .hp(gameToCreate.getPlayer().getHp())
                            .attack(gameToCreate.getPlayer().getAttack())
                            .startingItems(new HashSet<>())
                            .build());

        //==================================================================================
        // Setting up enemies
        gameToCreate.getEnemies().forEach(enemyJTO -> {
            for(ItemJTO itemReward : enemyJTO.getItemGainReward()) {
                newGame.getEnemyByName(enemyJTO.getName()).addItemGainReward(newGame.getItemByName(itemReward.getName()));
            }
            for(ItemJTO itemPenalty : enemyJTO.getItemLosePenalty()) {
                newGame.getEnemyByName(enemyJTO.getName()).addItemLosePenalty(newGame.getItemByName(itemPenalty.getName()));
            }
           /* for(PassageJTO passageReward : enemyJTO.getPassageActivationReward()) {
                newGame.getEnemyByName(enemyJTO.getName()).addPassageActivationReward(newGame.getPassageByRooms(newGame.getRoomByName(passageReward.getFrom().getName()), newGame.getRoomByName(passageReward.getTo().getName())));
            }*/
        });

        //==================================================================================
        // Setting up items

        gameToCreate.getItems().forEach(itemJTO -> {
            for(PassageJTO requested : itemJTO.getRequestedInPassages()) {
                Room roomFrom = newGame.getRoomByName(requested.getFrom().getName());
                Room roomTo = newGame.getRoomByName(requested.getTo().getName());
                newGame.getItemByName(itemJTO.getName()).addRequestedInPassage(newGame.getPassageByRooms(roomFrom, roomTo));
            }
        });

        //==================================================================================
        // Setting up passages - no need for that

        gameToCreate.getPassages().forEach(passageJTO -> {
            Room roomFrom = newGame.getRoomByName(passageJTO.getFrom().getName());
            Room roomTo = newGame.getRoomByName(passageJTO.getTo().getName());
            Passage passage = newGame.getPassageByRooms(roomFrom, roomTo);



            for(EnemyJTO enemyJTO : passageJTO.getActivationRewardForEnemies()) {
                newGame.getPassageByRooms(roomFrom, roomTo).addActivationRewardForEnemies(newGame.getEnemyByName(enemyJTO.getName()));
            }
        });

        //==================================================================================
        // Setting up passage activations

        Set<PassageActivation> passageActivations = new HashSet<>();

        gameToCreate.getItems().forEach(itemJTO -> {
            for(PassageActivationJTO passageActivationJTO : itemJTO.getPassageActivations()){
                passageActivations.add(PassageActivation.builder()
                                        .enable(passageActivationJTO.isEnable())
                                        .passage(newGame.getPassageByRooms(newGame.getRoomByName(passageActivationJTO.getPassage().getFrom().getName()), newGame.getRoomByName(passageActivationJTO.getPassage().getTo().getName())))
                                        .id(new PassageActivationKey())
                                        .build());
            }
        });

        //==================================================================================
        // Setting up player

        gameToCreate.getPlayer().getStartingItems().forEach(itemJTO -> {
            newGame.getPlayer().addStartingItem(newGame.getItemByName(itemJTO.getName()));
        });

        newGame.getPlayer().setStartingRoom(newGame.getRoomByName(gameToCreate.getPlayer().getStartingRoom().getName()));

        //==================================================================================
        // Setting up rooms

        gameToCreate.getRooms().forEach(roomJTO -> {
            for(ItemJTO itemJTO : roomJTO.getItems()) {
                newGame.getRoomByName(roomJTO.getName()).addItem(newGame.getItemByName(itemJTO.getName()));
            }

            for(EnemyJTO enemyJTO : roomJTO.getEnemies()) {
                newGame.getRoomByName(roomJTO.getName()).addEnemy(newGame.getEnemyByName(enemyJTO.getName()));
            }
        });

        //==================================================================================
        // Saving to database

        gameRepository.save(newGame);
        itemRepository.saveAll(newGame.getItems());
        enemyRepository.saveAll(newGame.getEnemies());
        roomRepository.saveAll(newGame.getRooms());
        passageActivationRepository.saveAll(passageActivations);
        passageRepository.saveAll(newGame.getPassages());
        playerRepository.save(newGame.getPlayer());

        return true;
    }
}
