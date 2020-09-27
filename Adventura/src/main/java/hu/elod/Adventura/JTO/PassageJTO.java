package hu.elod.Adventura.JTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PassageJTO {

    private boolean defaultEnabled;

    private String description;

    private RoomJTO from;

    private RoomJTO to;

    private List<ItemJTO> requestedItems;
}
