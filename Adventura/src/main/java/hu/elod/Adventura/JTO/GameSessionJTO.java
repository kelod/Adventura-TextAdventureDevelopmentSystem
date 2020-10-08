package hu.elod.Adventura.JTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class GameSessionJTO {
    private Integer id;

    private String name;

    private String description;

    private String gameGoal;

    private List<IGEnemyJTO> goalEnemies;

    private List<IGItemJTO> goalItems;

    private IGRoomJTO goalRoom;

    private List<IGItemJTO> items;

    private List<IGPassageJTO> passages;

    private IGPlayerJTO player;

    private List<IGRoomJTO> rooms;

    private List<IGEnemyJTO> enemies;

    public IGEnemyJTO getEnemyByName(String name){
        for(IGEnemyJTO e : enemies){
            if(e.getName().equals(name)){
                return e;
            }
        }
        return null;
    }

    public IGItemJTO getItemByName(String name){
        for(IGItemJTO e : items){
            if(e.getName().equals(name)){
                return e;
            }
        }
        return null;
    }

    public IGRoomJTO getRoomByName(String name){
        for(IGRoomJTO e : rooms){
            if(e.getName().equals(name)){
                return e;
            }
        }
        return null;
    }

    public IGPassageJTO getPassageByRooms(IGRoomJTO from, IGRoomJTO to){
        for(IGPassageJTO p : passages){
            if(p.getFrom() == from && p.getTo() == to){
                return p;
            }
        }
        return null;
    }
}
