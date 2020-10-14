package hu.elod.Adventura.service;

import hu.elod.Adventura.JTO.*;
import hu.elod.Adventura.model.*;
import hu.elod.Adventura.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PlayService {

    @Autowired
    GameRepository gameRepository;

    @Autowired
    PassageActivationRepository passageActivationRepository;

    @Autowired
    EnemyIGRepository enemyIGRepository;

    @Autowired
    GameSessionRepository gameSessionRepository;

    @Autowired
    ItemIGRepository itemIGRepository;

    @Autowired
    PassageActivationIGRepository passageActivationIGRepository;

    @Autowired
    PassageIGRepository passageIGRepository;

    @Autowired
    PlayerIGRepository playerIGRepository;

    @Autowired
    RoomIGRepository roomIGRepository;

    public GameSessionJTO createGameFromDescription(Integer id) throws Exception {
        Game gameDefinition = gameRepository.findById(id).get();
        if(!gameDefinition.isDeployed()){
            throw new Exception("Game is not deployed");
        }

        // Creating a new game session and saving it to database
        GameSession gameSession =   GameSession.builder()
                                    .description(gameDefinition.getDescription())
                                    .gameGoal(gameDefinition.getGameGoal())
                                    .finished(false)
                                    .name(gameDefinition.getName())
                                    .gameDefinition(gameDefinition)
                                    .enemies(new HashSet<>())
                                    .goalEnemies(new HashSet<>())
                                    .goalItems(new HashSet<>())
                                    .items(new HashSet<>())
                                    .passages(new HashSet<>())
                                    .rooms(new HashSet<>())
                                    .build();

        gameDefinition.getItems().forEach(item -> {
            gameSession.addItem( ItemIG.builder()
                                        .name(item.getName())
                                        .game(item.getGame())
                                        .type(item.getType())
                                        .usageType(item.getUsageType())
                                        .description(item.getDescription())
                                        .hp(item.getHp())
                                        .used(false)
                                        .usageDescription(item.getUsageDescription())
                                        .losePenaltyForEnemies(new HashSet<>())
                                        .requestedInPassages(new HashSet<>())
                                        .rewardForEnemies(new HashSet<>())
                                        .build());

        });

        gameDefinition.getRooms().forEach(room -> {
            gameSession.addRoom( RoomIG.builder()
                                        .description(room.getDescription())
                                        .name(room.getName())
                                        .enemies(new HashSet<>())
                                        .items(new HashSet<>())
                                        .roomFromInPassages(new HashSet<>())
                                        .roomToInPassages(new HashSet<>())
                                        .build());
        });

        gameDefinition.getEnemies().forEach(enemy -> {
            gameSession.addEnemy(EnemyIG.builder()
                                        .alive(true)
                                        .attack(enemy.getAttack())
                                        .battleEndHp(enemy.getBattleEndHp())
                                        .description(enemy.getDescription())
                                        .fightingType(enemy.getFightingType())
                                        .gameOverPenalty(enemy.isGameOverPenalty())
                                        .hp(enemy.getHp())
                                        .hpGainReward(enemy.getHpGainReward())
                                        .name(enemy.getName())
                                        .postBattleDescriptionLose(enemy.getPostBattleDescriptionLose())
                                        .postBattleDescriptionWin(enemy.getPostBattleDescriptionWin())
                                        .preBattleDescription(enemy.getPreBattleDescription())
                                        .itemGainReward(new HashSet<>())
                                        .itemLosePenalty(new HashSet<>())
                                        .passageActivationReward(new HashSet<>())
                                        .build());
        });

        gameDefinition.getPassages().forEach(passage -> {
            PassageIG passageToAdd = PassageIG.builder()
                                            .description(passage.getDescription())
                                            .preDescription(passage.getPreDescription())
                                            .enabled(passage.isDefaultEnabled())
                                            .activationRewardForEnemies(new HashSet<>())
                                            .requestedItems(new HashSet<>())
                                            .build();

            RoomIG roomFrom = gameSession.getRoomByName(passage.getFrom().getName());
            RoomIG roomTo = gameSession.getRoomByName(passage.getTo().getName());
            passageToAdd.setFrom(roomFrom);
            passageToAdd.setTo(roomTo);

            gameSession.addPassage(passageToAdd);
        });

        gameDefinition.getGoalEnemies().forEach(enemy -> {
            gameSession.addGoalEnemy(gameSession.getEnemyByName(enemy.getName()));
        });

        gameDefinition.getGoalItems().forEach(item -> {
            gameSession.addGoalItem(gameSession.getItemByName(item.getName()));
        });

        if(gameDefinition.getGoalRoom() != null){
            gameSession.setGoalRoom(gameSession.getRoomByName(gameDefinition.getGoalRoom().getName()));
        }

        gameSession.setPlayer(PlayerIG.builder()
                                .attack(gameDefinition.getPlayer().getAttack())
                                .hp(gameDefinition.getPlayer().getHp())
                                .name(gameDefinition.getPlayer().getName())
                                .inventory(new HashSet<>())
                                .build());

        //==================================================================================
        // Setting up enemies

        gameDefinition.getEnemies().forEach(enemy -> {
            EnemyIG enemyIG = gameSession.getEnemyByName(enemy.getName());
            for(Item item : enemy.getItemGainReward()){
                enemyIG.addItemGainReward(gameSession.getItemByName(item.getName()));
            }

            for(Item item : enemy.getItemLosePenalty()){
                enemyIG.addItemLosePenalty(gameSession.getItemByName(item.getName()));
            }

            for(Passage passage : enemy.getPassageActivationReward()){
                enemyIG.addPassageActivationReward(gameSession.getPassageByRooms(gameSession.getRoomByName(passage.getFrom().getName()),
                                                                                gameSession.getRoomByName(passage.getTo().getName())));
            }
        });

        //==================================================================================
        // Setting up items - no need for that

        /*gameDefinition.getItems().forEach(item -> {
            ItemIG itemIG = gameSession.getItemByName(item.getName());

        });*/

        //==================================================================================
        // Setting up passages

        gameDefinition.getPassages().forEach(passage -> {
            PassageIG passageIG = gameSession.getPassageByRooms(gameSession.getRoomByName(passage.getFrom().getName()),
                                                                gameSession.getRoomByName(passage.getTo().getName()));

            for(Item item : passage.getRequestedItems()) {
                passageIG.addRequestedItem(gameSession.getItemByName(item.getName()));
            }
        });

        //==================================================================================
        // Setting up player

        for(Item item : gameDefinition.getPlayer().getStartingItems()){
            gameSession.getPlayer().addItemToInventory(gameSession.getItemByName(item.getName()));
        }

        gameSession.getPlayer().setInRoom(gameSession.getRoomByName(gameDefinition.getPlayer().getStartingRoom().getName()));

        //==================================================================================
        // Setting up rooms

        gameDefinition.getRooms().forEach(room -> {
            RoomIG roomIG = gameSession.getRoomByName(room.getName());

            for(Enemy enemy : room.getEnemies()){
                roomIG.addEnemy(gameSession.getEnemyByName(enemy.getName()));
            }

            for(Item item : room.getItems()){
                roomIG.addItem(gameSession.getItemByName(item.getName()));
            }
        });

        //==================================================================================
        // Setting up passage activations

        Set<PassageActivationIG> passageActivationsIG = new HashSet<>();

        gameDefinition.getItems().forEach(item -> {
            List<PassageActivation> passageActivations = passageActivationRepository.findByItemId(item.getId());
            for(PassageActivation pa : passageActivations) {
                passageActivationsIG.add(PassageActivationIG.builder()
                                            .enable(pa.isEnable())
                                            .passage(gameSession.getPassageByRooms(gameSession.getRoomByName(pa.getPassage().getFrom().getName()),
                                                                                    gameSession.getRoomByName(pa.getPassage().getTo().getName())))
                                            .item(gameSession.getItemByName(pa.getItem().getName()))
                                            .id(new IGPassageActivationKey())
                                            .build());
            }
        });

        // saving to database

        GameSession savedSession = gameSessionRepository.save(gameSession);
        itemIGRepository.saveAll(gameSession.getItems());
        enemyIGRepository.saveAll(gameSession.getEnemies());
        roomIGRepository.saveAll(gameSession.getRooms());
        passageActivationIGRepository.saveAll(passageActivationsIG);
        passageIGRepository.saveAll(gameSession.getPassages());
        playerIGRepository.save(gameSession.getPlayer());


        // Creating JTO-s to send to React App
        GameSessionJTO gameSessionJTO = GameSessionJTO.builder()
                                        .gameGoal(gameSession.getGameGoal())
                                        .description(gameSession.getDescription())
                                        .id(savedSession.getId())
                                        .name(gameSession.getName())
                                        .enemies(new ArrayList<>())
                                        .goalEnemies(new ArrayList<>())
                                        .goalItems(new ArrayList<>())
                                        .items(new ArrayList<>())
                                        .passages(new ArrayList<>())
                                        .rooms(new ArrayList<>())
                                        .player(new IGPlayerJTO())
                                        .build();

        savedSession.getItems().forEach(itemIG -> {
            gameSessionJTO.getItems().add(IGItemJTO.builder()
                                            .id(itemIG.getId())
                                            .description(itemIG.getDescription())
                                            .game(itemIG.getGame())
                                            .hp(itemIG.getHp())
                                            .name(itemIG.getName())
                                            .type(itemIG.getType())
                                            .usageDescription(itemIG.getUsageDescription())
                                            .usageType(itemIG.getUsageType())
                                            .used(itemIG.isUsed())
                                            .passageActivations(new ArrayList<>())
                                            .requestedInPassages(new ArrayList<>())
                                            .build());
        });

        savedSession.getEnemies().forEach(enemyIG -> {
            gameSessionJTO.getEnemies().add(IGEnemyJTO.builder()
                                            .alive(enemyIG.isAlive())
                                            .attack(enemyIG.getAttack())
                                            .battleEndHp(enemyIG.getBattleEndHp())
                                            .description(enemyIG.getDescription())
                                            .fightingType(enemyIG.getFightingType())
                                            .gameOverPenalty(enemyIG.isGameOverPenalty())
                                            .hp(enemyIG.getHp())
                                            .hpGainReward(enemyIG.getHpGainReward())
                                            .id(enemyIG.getId())
                                            .name(enemyIG.getName())
                                            .postBattleDescriptionLose(enemyIG.getPostBattleDescriptionLose())
                                            .postBattleDescriptionWin(enemyIG.getPostBattleDescriptionWin())
                                            .preBattleDescription(enemyIG.getPreBattleDescription())
                                            .itemGainReward(new ArrayList<>())
                                            .itemLosePenalty(new ArrayList<>())
                                            .passageActivationReward(new ArrayList<>())
                                            .build());
        });

        savedSession.getRooms().forEach(roomIG -> {
            gameSessionJTO.getRooms().add(IGRoomJTO.builder()
                                            .description(roomIG.getDescription())
                                            .id(roomIG.getId())
                                            .name(roomIG.getName())
                                            .build());
        });

        savedSession.getPassages().forEach(passageIG -> {
            IGPassageJTO passageToAdd = IGPassageJTO.builder()
                                        .description(passageIG.getDescription())
                                        .preDescription(passageIG.getPreDescription())
                                        .enabled(passageIG.isEnabled())
                                        .id(passageIG.getId())
                                        .build();

            passageToAdd.setFrom(gameSessionJTO.getRoomByName(passageIG.getFrom().getName()));
            passageToAdd.setTo(gameSessionJTO.getRoomByName(passageIG.getTo().getName()));

            gameSessionJTO.getPassages().add(passageToAdd);
        });

        savedSession.getGoalEnemies().forEach(enemyIG -> {
            gameSessionJTO.getGoalEnemies().add(gameSessionJTO.getEnemyByName(enemyIG.getName()));
        });

        savedSession.getGoalItems().forEach(itemIG -> {
            gameSessionJTO.getGoalItems().add(gameSessionJTO.getItemByName(itemIG.getName()));
        });

        if(savedSession.getGoalRoom() != null){
            gameSessionJTO.setGoalRoom(gameSessionJTO.getRoomByName(savedSession.getGoalRoom().getName()));
        }

        gameSessionJTO.setPlayer(IGPlayerJTO.builder()
                                .attack(savedSession.getPlayer().getAttack())
                                .hp(savedSession.getPlayer().getHp())
                                .id(savedSession.getPlayer().getId())
                                .name(savedSession.getPlayer().getName())
                                .inventory(new ArrayList<>())
                                .build());

        //==================================================================================
        // Setting up enemies

        savedSession.getEnemies().forEach(enemyIG -> {
            IGEnemyJTO enemyJTO = gameSessionJTO.getEnemyByName(enemyIG.getName());

            for(ItemIG itemIG : enemyIG.getItemGainReward()){
                enemyJTO.getItemGainReward().add(gameSessionJTO.getItemByName(itemIG.getName()));
            }

            for(ItemIG itemIG : enemyIG.getItemLosePenalty()){
                enemyJTO.getItemLosePenalty().add(gameSessionJTO.getItemByName(itemIG.getName()));
            }

            for(PassageIG passageIG : enemyIG.getPassageActivationReward()){
                enemyJTO.getPassageActivationReward().add(gameSessionJTO.getPassageByRooms(gameSessionJTO.getRoomByName(passageIG.getFrom().getName()),
                                                                                            gameSessionJTO.getRoomByName(passageIG.getTo().getName())));
            }

            if(enemyIG.getPresentInRoom() != null){
                enemyJTO.setPresentInRoom(gameSessionJTO.getRoomByName(enemyIG.getPresentInRoom().getName()));
            }
        });

        //==================================================================================
        // Setting up items

        savedSession.getItems().forEach(itemIG -> {
            IGItemJTO itemJTO = gameSessionJTO.getItemByName(itemIG.getName());

            for(PassageIG p : itemIG.getRequestedInPassages()){
                itemJTO.getRequestedInPassages().add(gameSessionJTO.getPassageByRooms(gameSessionJTO.getRoomByName(p.getFrom().getName()),
                                                                                        gameSessionJTO.getRoomByName(p.getTo().getName())));
            }

            List<PassageActivationIG> passageActivationIGs = passageActivationIGRepository.findByItemId(itemIG.getId());
            for(PassageActivationIG pa : passageActivationIGs){
                itemJTO.getPassageActivations().add(IGPassageActivationJTO.builder()
                                                    .enable(pa.isEnable())
                                                    .passage(gameSessionJTO.getPassageByRooms(gameSessionJTO.getRoomByName(pa.getPassage().getFrom().getName()),
                                                                                                gameSessionJTO.getRoomByName(pa.getPassage().getTo().getName()))).build());
            }

            if(itemIG.getPresentInRoom() != null){
                itemJTO.setPresentInRoom(gameSessionJTO.getRoomByName(itemIG.getPresentInRoom().getName()));
            }
        });

        //==================================================================================
        // Setting up passages - no need for that


        //==================================================================================
        // Setting up player

        gameSessionJTO.getPlayer().setInRoom(gameSessionJTO.getRoomByName(savedSession.getPlayer().getInRoom().getName()));

        savedSession.getPlayer().getInventory().forEach(itemIG -> {
            gameSessionJTO.getPlayer().getInventory().add(gameSessionJTO.getItemByName(itemIG.getName()));
        });

        //==================================================================================
        // Setting up rooms - no need for that

        // Setting session started
        gameDefinition.setAnySessionStarted(true);
        gameRepository.save(gameDefinition);

        return gameSessionJTO;
    }

    public GameSessionJTO loadGameFromDescription(Integer id) throws Exception {
        GameSession savedSession = gameSessionRepository.findById(id).get();

        if(savedSession.isFinished()){
            throw new Exception();
        }

        // Creating JTO-s to send to React App
        GameSessionJTO gameSessionJTO = GameSessionJTO.builder()
                .gameGoal(savedSession.getGameGoal())
                .description(savedSession.getDescription())
                .id(savedSession.getId())
                .name(savedSession.getName())
                .enemies(new ArrayList<>())
                .goalEnemies(new ArrayList<>())
                .goalItems(new ArrayList<>())
                .items(new ArrayList<>())
                .passages(new ArrayList<>())
                .rooms(new ArrayList<>())
                .player(new IGPlayerJTO())
                .build();

        savedSession.getItems().forEach(itemIG -> {
            gameSessionJTO.getItems().add(IGItemJTO.builder()
                    .id(itemIG.getId())
                    .description(itemIG.getDescription())
                    .game(itemIG.getGame())
                    .hp(itemIG.getHp())
                    .name(itemIG.getName())
                    .type(itemIG.getType())
                    .usageDescription(itemIG.getUsageDescription())
                    .usageType(itemIG.getUsageType())
                    .used(itemIG.isUsed())
                    .passageActivations(new ArrayList<>())
                    .requestedInPassages(new ArrayList<>())
                    .build());
        });

        savedSession.getEnemies().forEach(enemyIG -> {
            gameSessionJTO.getEnemies().add(IGEnemyJTO.builder()
                    .alive(enemyIG.isAlive())
                    .attack(enemyIG.getAttack())
                    .battleEndHp(enemyIG.getBattleEndHp())
                    .description(enemyIG.getDescription())
                    .fightingType(enemyIG.getFightingType())
                    .gameOverPenalty(enemyIG.isGameOverPenalty())
                    .hp(enemyIG.getHp())
                    .hpGainReward(enemyIG.getHpGainReward())
                    .id(enemyIG.getId())
                    .name(enemyIG.getName())
                    .postBattleDescriptionLose(enemyIG.getPostBattleDescriptionLose())
                    .postBattleDescriptionWin(enemyIG.getPostBattleDescriptionWin())
                    .preBattleDescription(enemyIG.getPreBattleDescription())
                    .itemGainReward(new ArrayList<>())
                    .itemLosePenalty(new ArrayList<>())
                    .passageActivationReward(new ArrayList<>())
                    .build());
        });

        savedSession.getRooms().forEach(roomIG -> {
            gameSessionJTO.getRooms().add(IGRoomJTO.builder()
                    .description(roomIG.getDescription())
                    .id(roomIG.getId())
                    .name(roomIG.getName())
                    .build());
        });

        savedSession.getPassages().forEach(passageIG -> {
            IGPassageJTO passageToAdd = IGPassageJTO.builder()
                    .description(passageIG.getDescription())
                    .preDescription(passageIG.getPreDescription())
                    .enabled(passageIG.isEnabled())
                    .id(passageIG.getId())
                    .build();

            passageToAdd.setFrom(gameSessionJTO.getRoomByName(passageIG.getFrom().getName()));
            passageToAdd.setTo(gameSessionJTO.getRoomByName(passageIG.getTo().getName()));

            gameSessionJTO.getPassages().add(passageToAdd);
        });

        savedSession.getGoalEnemies().forEach(enemyIG -> {
            gameSessionJTO.getGoalEnemies().add(gameSessionJTO.getEnemyByName(enemyIG.getName()));
        });

        savedSession.getGoalItems().forEach(itemIG -> {
            gameSessionJTO.getGoalItems().add(gameSessionJTO.getItemByName(itemIG.getName()));
        });

        if(savedSession.getGoalRoom() != null){
            gameSessionJTO.setGoalRoom(gameSessionJTO.getRoomByName(savedSession.getGoalRoom().getName()));
        }

        gameSessionJTO.setPlayer(IGPlayerJTO.builder()
                .attack(savedSession.getPlayer().getAttack())
                .hp(savedSession.getPlayer().getHp())
                .id(savedSession.getPlayer().getId())
                .name(savedSession.getPlayer().getName())
                .inventory(new ArrayList<>())
                .build());

        //==================================================================================
        // Setting up enemies

        savedSession.getEnemies().forEach(enemyIG -> {
            IGEnemyJTO enemyJTO = gameSessionJTO.getEnemyByName(enemyIG.getName());

            for(ItemIG itemIG : enemyIG.getItemGainReward()){
                enemyJTO.getItemGainReward().add(gameSessionJTO.getItemByName(itemIG.getName()));
            }

            for(ItemIG itemIG : enemyIG.getItemLosePenalty()){
                enemyJTO.getItemLosePenalty().add(gameSessionJTO.getItemByName(itemIG.getName()));
            }

            for(PassageIG passageIG : enemyIG.getPassageActivationReward()){
                enemyJTO.getPassageActivationReward().add(gameSessionJTO.getPassageByRooms(gameSessionJTO.getRoomByName(passageIG.getFrom().getName()),
                        gameSessionJTO.getRoomByName(passageIG.getTo().getName())));
            }

            if(enemyIG.getPresentInRoom() != null){
                enemyJTO.setPresentInRoom(gameSessionJTO.getRoomByName(enemyIG.getPresentInRoom().getName()));
            }
        });

        //==================================================================================
        // Setting up items

        savedSession.getItems().forEach(itemIG -> {
            IGItemJTO itemJTO = gameSessionJTO.getItemByName(itemIG.getName());

            for(PassageIG p : itemIG.getRequestedInPassages()){
                itemJTO.getRequestedInPassages().add(gameSessionJTO.getPassageByRooms(gameSessionJTO.getRoomByName(p.getFrom().getName()),
                        gameSessionJTO.getRoomByName(p.getTo().getName())));
            }

            List<PassageActivationIG> passageActivationIGs = passageActivationIGRepository.findByItemId(itemIG.getId());
            for(PassageActivationIG pa : passageActivationIGs){
                itemJTO.getPassageActivations().add(IGPassageActivationJTO.builder()
                        .enable(pa.isEnable())
                        .passage(gameSessionJTO.getPassageByRooms(gameSessionJTO.getRoomByName(pa.getPassage().getFrom().getName()),
                                gameSessionJTO.getRoomByName(pa.getPassage().getTo().getName()))).build());
            }

            if(itemIG.getPresentInRoom() != null){
                itemJTO.setPresentInRoom(gameSessionJTO.getRoomByName(itemIG.getPresentInRoom().getName()));
            }
        });

        //==================================================================================
        // Setting up passages - no need for that


        //==================================================================================
        // Setting up player

        gameSessionJTO.getPlayer().setInRoom(gameSessionJTO.getRoomByName(savedSession.getPlayer().getInRoom().getName()));

        savedSession.getPlayer().getInventory().forEach(itemIG -> {
            gameSessionJTO.getPlayer().getInventory().add(gameSessionJTO.getItemByName(itemIG.getName()));
        });

        //==================================================================================
        // Setting up rooms - no need for that


        return gameSessionJTO;
    }

    public void updatePlayerState(GameSessionJTO gameSessionJTO){
        PlayerIG playerIG = playerIGRepository.findById(gameSessionJTO.getPlayer().getId()).get();
        List<ItemIG> items = itemIGRepository.findByPresentInGameSessionId(gameSessionJTO.getId());

        playerIG.getInventory().clear();
        gameSessionJTO.getPlayer().getInventory().forEach(igItemJTO -> {
            for(ItemIG itemIG : items){
                if(itemIG.getId().equals(igItemJTO.getId())){
                    playerIG.addItemToInventory(itemIG);
                    itemIG.setPresentInRoom(null);
                }
            }

        });

        List<ItemIG> potentialUsedItems = itemIGRepository.findByInPlayersInventoryId(gameSessionJTO.getPlayer().getId());
        potentialUsedItems.forEach(itemIG -> {
            boolean found = false;
            for(ItemIG inventoryItem : playerIG.getInventory()){
                if(inventoryItem.getId().equals(itemIG.getId())){
                    found = true;
                    break;
                }
            }
            if(!found){
                itemIG.setUsed(true);
                itemIG.setInPlayersInventory(null);
            }
        });

        playerIG.setInRoom(roomIGRepository.findById(gameSessionJTO.getPlayer().getInRoom().getId()).get());
        playerIG.setHp(gameSessionJTO.getPlayer().getHp());

        playerIGRepository.save(playerIG);

    }

    public void updatePassages(GameSessionJTO gameSessionJTO){
        //TODO: Egyelore csak az enabled attributum valtozik/update-elodik
        List<PassageIG> passages = passageIGRepository.findByPresentInGameSessionId(gameSessionJTO.getId());

        gameSessionJTO.getPassages().forEach(igPassageJTO -> {
            for(PassageIG passageIG : passages){
                if(passageIG.getId().equals(igPassageJTO.getId())){
                    passageIG.setEnabled(igPassageJTO.isEnabled());
                }
            }
        });

        passageIGRepository.saveAll(passages);
    }

    public void updateItems(GameSessionJTO gameSessionJTO){ // This is for usable items
        List<ItemIG> items = itemIGRepository.findByPresentInGameSessionId(gameSessionJTO.getId());

        gameSessionJTO.getItems().forEach(igItemJTO -> {
            for(ItemIG itemIG : items){
                if(itemIG.getId().equals(igItemJTO.getId())){
                    itemIG.setUsed(igItemJTO.isUsed());
                }
            }
        });

        itemIGRepository.saveAll(items);
    }

    public GameSessionJTO gameOver(Integer id){
        GameSession gameSession = gameSessionRepository.findById(id).get();

        gameSession.setFinished(true);

        gameSessionRepository.save(gameSession);

        return null;
    }

    public void battleLost(GameSessionJTO gameSessionJTO, Integer id){
        // Check if penalties are executed
        EnemyIG enemyIG = enemyIGRepository.findById(id).get();
        PlayerIG playerIG = playerIGRepository.findById(gameSessionJTO.getPlayer().getId()).get();

        enemyIG.setAlive(false);
        enemyIG.setPresentInRoom(null); // Enemy disappears

        playerIG.setHp(gameSessionJTO.getPlayer().getHp());

        enemyIGRepository.save(enemyIG);
        playerIGRepository.save(playerIG);
    }

    public void battleWon(GameSessionJTO gameSessionJTO, Integer id){
        // TODO: Jutalmak meg nincsenek benne
        EnemyIG enemyIG = enemyIGRepository.findById(id).get();
        PlayerIG playerIG = playerIGRepository.findById(gameSessionJTO.getPlayer().getId()).get();
        List<ItemIG> items = itemIGRepository.findByPresentInGameSessionId(gameSessionJTO.getId());
        List<PassageIG> passages = passageIGRepository.findByPresentInGameSessionId(gameSessionJTO.getId());

        enemyIG.setAlive(false);

        playerIG.setHp(gameSessionJTO.getPlayer().getHp());

        gameSessionJTO.getPlayer().getInventory().forEach(igItemJTO -> {
            for(ItemIG item : items){
                if(item.getId().equals(igItemJTO.getId())){
                    item.setInPlayersInventory(playerIG);
                }
            }
        });

        gameSessionJTO.getPassages().forEach(igPassageJTO -> {
            for(PassageIG passageIG : passages){
                if(passageIG.getId().equals(igPassageJTO.getId())){
                    passageIG.setEnabled(igPassageJTO.isEnabled());
                }
            }
        });

        enemyIGRepository.save(enemyIG);
        playerIGRepository.save(playerIG);
    }
}
