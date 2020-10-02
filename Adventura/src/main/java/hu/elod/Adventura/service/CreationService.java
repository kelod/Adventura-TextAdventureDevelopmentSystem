package hu.elod.Adventura.service;

import hu.elod.Adventura.JTO.*;
import hu.elod.Adventura.model.*;
import hu.elod.Adventura.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

    private Game jtoToEntityTransform(GameToCreateJTO gameToCreate){
        //Setting up newGame
        final Game newGame =  Game.builder()
                .id(gameToCreate.getId())
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
                    .id(itemJTO.getId())
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
                    .id(roomJTO.getId())
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
                    .id(enemyJTO.getId())
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
                    .id(passageJTO.getId())
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
                .id(gameToCreate.getPlayer().getId())
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

            if(enemyJTO.getPresentInRoom() != null) {
                newGame.getEnemyByName(enemyJTO.getName()).addPresentInRoom(newGame.getRoomByName(enemyJTO.getPresentInRoom().getName()));
            }
            for(PassageJTO passageReward : enemyJTO.getPassageActivationReward()) {
                newGame.getEnemyByName(enemyJTO.getName()).addPassageActivationReward(newGame.getPassageByRooms(newGame.getRoomByName(passageReward.getFrom().getName()), newGame.getRoomByName(passageReward.getTo().getName())));
            }
        });

        //==================================================================================
        // Setting up items

        gameToCreate.getItems().forEach(itemJTO -> {
            for(PassageJTO requested : itemJTO.getRequestedInPassages()) {
                Room roomFrom = newGame.getRoomByName(requested.getFrom().getName());
                Room roomTo = newGame.getRoomByName(requested.getTo().getName());
                newGame.getItemByName(itemJTO.getName()).addRequestedInPassage(newGame.getPassageByRooms(roomFrom, roomTo));
            }
            if(itemJTO.getPresentInRoom() != null) {
                newGame.getItemByName(itemJTO.getName()).addPresentInRoom(newGame.getRoomByName(itemJTO.getPresentInRoom().getName()));
            }

        });

        //==================================================================================
        // Setting up passages - no need for that

        /*gameToCreate.getPassages().forEach(passageJTO -> {
            Room roomFrom = newGame.getRoomByName(passageJTO.getFrom().getName());
            Room roomTo = newGame.getRoomByName(passageJTO.getTo().getName());
            Passage passage = newGame.getPassageByRooms(roomFrom, roomTo);



            for(EnemyJTO enemyJTO : passageJTO.getActivationRewardForEnemies()) {
                newGame.getPassageByRooms(roomFrom, roomTo).addActivationRewardForEnemies(newGame.getEnemyByName(enemyJTO.getName()));
            }
        });*/

        //==================================================================================
        // Setting up passage activations

        /*Set<PassageActivation> passageActivations = new HashSet<>();

        gameToCreate.getItems().forEach(itemJTO -> {
            for(PassageActivationJTO passageActivationJTO : itemJTO.getPassageActivations()){
                PassageActivationKey passageActivationKey = new PassageActivationKey();
                passageActivationKey.setItemId(itemJTO.getId());
                passageActivationKey.setPassageId(passageActivationJTO.getPassage().getId());
                passageActivations.add(PassageActivation.builder()
                        .id(passageActivationKey)
                        .enable(passageActivationJTO.isEnable())
                        .passage(newGame.getPassageByRooms(newGame.getRoomByName(passageActivationJTO.getPassage().getFrom().getName()), newGame.getRoomByName(passageActivationJTO.getPassage().getTo().getName())))
                        .item(newGame.getItemByName(itemJTO.getName()))
                        .id(new PassageActivationKey())
                        .build());
            }
        });*/

        //==================================================================================
        // Setting up player

        gameToCreate.getPlayer().getStartingItems().forEach(itemJTO -> {
            newGame.getPlayer().addStartingItem(newGame.getItemByName(itemJTO.getName()));
        });

        if(gameToCreate.getPlayer().getStartingRoom() != null) {
            newGame.getPlayer().setStartingRoom(newGame.getRoomByName(gameToCreate.getPlayer().getStartingRoom().getName()));
        }
        //==================================================================================
        // Setting up rooms - no need for that

        /*gameToCreate.getRooms().forEach(roomJTO -> {
            for(ItemJTO itemJTO : roomJTO.getItems()) {
                newGame.getRoomByName(roomJTO.getName()).addItem(newGame.getItemByName(itemJTO.getName()));
            }

            for(EnemyJTO enemyJTO : roomJTO.getEnemies()) {
                newGame.getRoomByName(roomJTO.getName()).addEnemy(newGame.getEnemyByName(enemyJTO.getName()));
            }
        });*/

        return newGame;
    }


    public Game saveGameFromJTO(GameToCreateJTO gameToCreate){
        Game newGame = this.jtoToEntityTransform(gameToCreate);

        // Setting up passage activations

        Set<PassageActivation> passageActivations = new HashSet<>();

        gameToCreate.getItems().forEach(itemJTO -> {
            for(PassageActivationJTO passageActivationJTO : itemJTO.getPassageActivations()){
                /*PassageActivationKey passageActivationKey = new PassageActivationKey();
                passageActivationKey.setItemId(itemJTO.getId());
                passageActivationKey.setPassageId(passageActivationJTO.getPassage().getId());*/
                passageActivations.add(PassageActivation.builder()
                        //.id(passageActivationKey)
                        .enable(passageActivationJTO.isEnable())
                        .passage(newGame.getPassageByRooms(newGame.getRoomByName(passageActivationJTO.getPassage().getFrom().getName()), newGame.getRoomByName(passageActivationJTO.getPassage().getTo().getName())))
                        .item(newGame.getItemByName(itemJTO.getName()))
                        .id(new PassageActivationKey())
                        .build());
            }
        });

        //==================================================================================
        // Saving to database

        Game savedGame = gameRepository.save(newGame);
        itemRepository.saveAll(newGame.getItems());
        enemyRepository.saveAll(newGame.getEnemies());
        roomRepository.saveAll(newGame.getRooms());
        passageActivationRepository.saveAll(passageActivations);
        passageRepository.saveAll(newGame.getPassages());
        playerRepository.save(newGame.getPlayer());

        return savedGame;
    }

    public GameToCreateJTO getGameDescriptionById(Integer id){
        Game game = null;
        Optional<Game> optGame = gameRepository.findById(id);
        if(optGame.isPresent()){
            game = optGame.get();
        }
        else{
            return null;
        }

        GameToCreateJTO gameToCreate = GameToCreateJTO.builder()
                                        .id(game.getId())
                                        .gameGoal(game.getGameGoal())
                                        .description(game.getDescription())
                                        .name(game.getName())
                                        .enemies(new ArrayList<>())
                                        .goalEnemies(new ArrayList<>())
                                        .goalItems(new ArrayList<>())
                                        //.goalRoom(new RoomJTO())
                                        .items(new ArrayList<>())
                                        .passages(new ArrayList<>())
                                        .player(new PlayerJTO())
                                        .rooms(new ArrayList<>())
                                        .build();

        game.getItems().forEach(item -> {
            gameToCreate.getItems().add(ItemJTO.builder()
                                        .id(item.getId())
                                        .game(item.getGame())
                                        .name(item.getName())
                                        .description(item.getDescription())
                                        .hp(item.getHp())
                                        .type(item.getType())
                                        .usageDescription(item.getUsageDescription())
                                        .usageType(item.getUsageType())
                                        .passageActivations(new ArrayList<>())
                                        .requestedInPassages(new ArrayList<>())
                                        .build());
        });

        game.getEnemies().forEach(enemy -> {
            gameToCreate.getEnemies().add(EnemyJTO.builder()
                                            .id(enemy.getId())
                                            .name(enemy.getName())
                                            .fightingType(enemy.getFightingType())
                                            .postBattleDescriptionLose(enemy.getPostBattleDescriptionLose())
                                            .attack(enemy.getAttack())
                                            .battleEndHp(enemy.getBattleEndHp())
                                            .description(enemy.getDescription())
                                            .gameOverPenalty(enemy.isGameOverPenalty())
                                            .hp(enemy.getHp())
                                            .hpGainReward(enemy.getHpGainReward())
                                            .postBattleDescriptionWin(enemy.getPostBattleDescriptionWin())
                                            .preBattleDescription(enemy.getPreBattleDescription())
                                            .itemGainReward(new ArrayList<>())
                                            .itemLosePenalty(new ArrayList<>())
                                            .passageActivationReward(new ArrayList<>())
                                            .build());
        });

        game.getRooms().forEach(room -> {
            gameToCreate.getRooms().add(RoomJTO.builder()
                                        .id(room.getId())
                                        .description(room.getDescription())
                                        .name(room.getName())
                                        //.enemies(new ArrayList<>())
                                        //.items(new ArrayList<>())
                                        .build());
        });

        game.getPassages().forEach(passage -> {
            PassageJTO passageToAdd = PassageJTO.builder()
                    .id(passage.getId())
                    .defaultEnabled(passage.isDefaultEnabled())
                    .description(passage.getDescription())
                    .build();

            passageToAdd.setFrom(gameToCreate.getRoomByName(passage.getFrom().getName()));
            passageToAdd.setTo(gameToCreate.getRoomByName(passage.getTo().getName()));

            gameToCreate.getPassages().add(passageToAdd);
        });

        game.getGoalEnemies().forEach(enemy -> {
            gameToCreate.getGoalEnemies().add(gameToCreate.getEnemyByName(enemy.getName()));
        });

        game.getGoalItems().forEach(item -> {
            gameToCreate.getGoalItems().add(gameToCreate.getItemByName(item.getName()));
        });

        if(game.getGoalRoom() != null) {
            gameToCreate.setGoalRoom(gameToCreate.getRoomByName(game.getGoalRoom().getName()));
        }

        gameToCreate.setPlayer(PlayerJTO.builder()
                                .id(game.getPlayer().getId())
                                .attack(game.getPlayer().getAttack())
                                .hp(game.getPlayer().getHp())
                                .name(game.getPlayer().getName())
                                .startingItems(new ArrayList<>())
                                .build());

        //==================================================================================
        // Setting up enemies

        game.getEnemies().forEach(enemy -> {
            EnemyJTO enemyJTO = gameToCreate.getEnemyByName(enemy.getName());
            for(Item item : enemy.getItemGainReward()){
                enemyJTO.getItemGainReward().add(gameToCreate.getItemByName(item.getName()));
            }

            for(Item item : enemy.getItemLosePenalty()){
                enemyJTO.getItemLosePenalty().add(gameToCreate.getItemByName(item.getName()));
            }

            for(Passage passage : enemy.getPassageActivationReward()){
                enemyJTO.getPassageActivationReward().add(gameToCreate.getPassageByRooms(gameToCreate.getRoomByName(passage.getFrom().getName()),gameToCreate.getRoomByName(passage.getTo().getName())));
            }

            if(enemy.getPresentInRoom() != null) {
                enemyJTO.setPresentInRoom(gameToCreate.getRoomByName(enemy.getPresentInRoom().getName()));
            }
        });

        //==================================================================================
        // Setting up items

        game.getItems().forEach(item -> {
            ItemJTO itemJTO = gameToCreate.getItemByName(item.getName());
            for(Passage passage : item.getRequestedInPassages()){
                itemJTO.getRequestedInPassages().add(gameToCreate.getPassageByRooms(gameToCreate.getRoomByName(passage.getFrom().getName()),gameToCreate.getRoomByName(passage.getTo().getName())));
            }

            List<PassageActivation> passageActivations = passageActivationRepository.findByItemId(item.getId());
            for(PassageActivation passageActivation : passageActivations){
                itemJTO.getPassageActivations().add(PassageActivationJTO.builder()
                                                    .passage(gameToCreate.getPassageByRooms(gameToCreate.getRoomByName(passageActivation.getPassage().getFrom().getName()),
                                                            gameToCreate.getRoomByName(passageActivation.getPassage().getTo().getName())))
                                                    .enable(passageActivation.isEnable())
                                                    .build());
            }

            if(item.getPresentInRoom() != null) {
                itemJTO.setPresentInRoom(gameToCreate.getRoomByName(item.getPresentInRoom().getName()));
            }
        });

        //==================================================================================
        // Setting up passages - no need for that

        /*game.getPassages().forEach(passage -> {
            RoomJTO roomFrom = gameToCreate.getRoomByName(passage.getFrom().getName());
            RoomJTO roomTo = gameToCreate.getRoomByName(passage.getTo().getName());
            PassageJTO passageJTO = gameToCreate.getPassageByRooms(roomFrom, roomTo);

            for(Enemy enemy : passage.getActivationRewardForEnemies()){
                passageJTO.getActivationRewardForEnemies().add(gameToCreate.getEnemyByName(enemy.getName()));
            }

        });*/

        //==================================================================================
        // Setting up player
        if(game.getPlayer().getStartingRoom() != null) {
            gameToCreate.getPlayer().setStartingRoom(gameToCreate.getRoomByName(game.getPlayer().getStartingRoom().getName()));
        }

        game.getPlayer().getStartingItems().forEach(item -> {
            gameToCreate.getPlayer().getStartingItems().add(gameToCreate.getItemByName(item.getName()));
        });

        //==================================================================================
        // Setting up rooms - no need for that

        /*game.getRooms().forEach(room -> {
            RoomJTO roomJTO = gameToCreate.getRoomByName(room.getName());

            for(Enemy enemy : room.getEnemies()) {
                roomJTO.getEnemies().add(gameToCreate.getEnemyByName(enemy.getName()));
            }

            for(Item item : room.getItems()) {
                roomJTO.getItems().add(gameToCreate.getItemByName(item.getName()));
            }
        });*/

        return gameToCreate;
    }

    public void updateGameFromJTO(GameToCreateJTO gameToCreate){
        Game newGame = jtoToEntityTransform(gameToCreate);



        //==================================================================================
        // Saving to database
        List<Item> allItemsInGame = itemRepository.findByPresentInGameId(newGame.getId());
        allItemsInGame.forEach(potentialDirtyItem -> {
            boolean found = false;
            for(Item item : newGame.getItems()){
                if(potentialDirtyItem.getName().equals(item.getName())){
                    found = true;
                    break;
                }
            }
            if(!found){
                passageActivationRepository.deleteAll(passageActivationRepository.findByItemId(potentialDirtyItem.getId()));
            }
        });

        List<Passage> allPassagesInGame = passageRepository.findByPresentInGameId(newGame.getId());
        allPassagesInGame.forEach(potentialDirtyPassage -> {
            boolean found = false;
            for(Passage passage : newGame.getPassages()){
                if(     potentialDirtyPassage.getFrom().getName().equals(passage.getFrom().getName()) &&
                        potentialDirtyPassage.getTo().getName().equals(passage.getTo().getName()) ){
                    found = true;
                    break;
                }
            }
            if(!found){
                passageActivationRepository.deleteAll(passageActivationRepository.findByPassageId(potentialDirtyPassage.getId()));
            }
        });
        Game savedGame = gameRepository.save(newGame);
        // Setting up passage activations

        Set<PassageActivation> passageActivations = new HashSet<>();
        gameToCreate.getItems().forEach(itemJTO -> {
            for(PassageActivationJTO passageActivationJTO : itemJTO.getPassageActivations()){
                PassageActivation passageActivation = passageActivationRepository.findByItemIdAndPassageId(savedGame.getItemByName(itemJTO.getName()).getId(),
                                                                savedGame.getPassageByRooms(savedGame.getRoomByName(passageActivationJTO.getPassage().getFrom().getName()),
                                                                                            savedGame.getRoomByName(passageActivationJTO.getPassage().getTo().getName())).getId());

                if(passageActivation == null){
                    passageActivations.add(PassageActivation.builder()
                            .enable(passageActivationJTO.isEnable())
                            .passage(savedGame.getPassageByRooms(savedGame.getRoomByName(passageActivationJTO.getPassage().getFrom().getName()), savedGame.getRoomByName(passageActivationJTO.getPassage().getTo().getName())))
                            .item(savedGame.getItemByName(itemJTO.getName()))
                            .id(new PassageActivationKey())
                            .build());
                }
                else{
                    PassageActivationKey pak = new PassageActivationKey();
                    pak.setPassageId(savedGame.getPassageByRooms(savedGame.getRoomByName(passageActivationJTO.getPassage().getFrom().getName()), savedGame.getRoomByName(passageActivationJTO.getPassage().getTo().getName())).getId());
                    pak.setItemId(savedGame.getItemByName(itemJTO.getName()).getId());
                    passageActivations.add(PassageActivation.builder()
                            .enable(passageActivationJTO.isEnable())
                            .passage(savedGame.getPassageByRooms(savedGame.getRoomByName(passageActivationJTO.getPassage().getFrom().getName()), savedGame.getRoomByName(passageActivationJTO.getPassage().getTo().getName())))
                            .item(savedGame.getItemByName(itemJTO.getName()))
                            .id(pak)
                            .build());
                }
            }
        });

        // Saving incoming PAs, then searching for potential ones which should be deleted

        List<PassageActivation>  result = passageActivationRepository.saveAll(passageActivations);

        List<PassageActivation> pas = passageActivationRepository.findByPresentInGameId(savedGame.getId());

        pas.forEach(passageActivation -> {
            boolean found = false;
            for(PassageActivation resultPa : result){
                if(     resultPa.getId().getItemId().equals(passageActivation.getId().getItemId()) &&
                        resultPa.getId().getPassageId().equals(passageActivation.getId().getPassageId())){
                    found = true;
                    break;
                }
            }
            if(!found){
                passageActivationRepository.delete(passageActivation);
            }
        });
    }
}
