package hu.elod.Adventura.JTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class GameToCreateJTO {

    private Integer id;

    private boolean anySessionStarted;

    private boolean deployed;

    private String name;

    private String description;

    private String winDescription;

    private String gameGoal;

    private List<EnemyJTO> goalEnemies;

    private List<ItemJTO> goalItems;

    private RoomJTO goalRoom;

    private List<ItemJTO> items;

    private List<PassageJTO> passages;

    private PlayerJTO player;

    private List<RoomJTO> rooms;

    private List<EnemyJTO> enemies;

    public EnemyJTO getEnemyByName(String name){
        for(EnemyJTO e : enemies){
            if(e.getName().equals(name)){
                return e;
            }
        }
        return null;
    }

    public ItemJTO getItemByName(String name){
        for(ItemJTO e : items){
            if(e.getName().equals(name)){
                return e;
            }
        }
        return null;
    }

    public RoomJTO getRoomByName(String name){
        for(RoomJTO e : rooms){
            if(e.getName().equals(name)){
                return e;
            }
        }
        return null;
    }

    public PassageJTO getPassageByRooms(RoomJTO from, RoomJTO to){
        for(PassageJTO p : passages){
            if(p.getFrom() == from && p.getTo() == to){
                return p;
            }
        }
        return null;
    }


}
