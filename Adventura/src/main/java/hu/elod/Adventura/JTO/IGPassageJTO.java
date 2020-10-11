package hu.elod.Adventura.JTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class IGPassageJTO {

    private Integer id;

    private boolean enabled;

    private String preDescription;

    private String description;

    private IGRoomJTO from;

    private IGRoomJTO to;
}
