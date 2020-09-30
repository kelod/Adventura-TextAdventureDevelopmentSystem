package hu.elod.Adventura.JTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ItemJTO {

    private String description;

    private String game;

    private int hp;

    private String name;

    private List<PassageActivationJTO> passageActivations;

    private List<PassageJTO> requestedInPassages;

    private String type;

    private String usageDescription;

    private String usageType;

    private RoomJTO presentInRoom;
}
