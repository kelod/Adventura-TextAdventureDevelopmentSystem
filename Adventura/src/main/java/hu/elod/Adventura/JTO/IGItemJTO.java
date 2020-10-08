package hu.elod.Adventura.JTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class IGItemJTO {

    private  Integer id;

    private boolean used;

    private String description;

    private String game;

    private int hp;

    private String name;

    private List<IGPassageActivationJTO> passageActivations;

    private List<IGPassageJTO> requestedInPassages;

    private String type;

    private String usageDescription;

    private String usageType;

    private IGRoomJTO presentInRoom;
}
