package hu.elod.Adventura.JTO;

import lombok.*;

@Getter
@Setter
@Builder
public class IGRoomJTO {

    private Integer id;

    private String description;

    private String name;
}
