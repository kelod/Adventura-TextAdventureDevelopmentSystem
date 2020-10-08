package hu.elod.Adventura.JTO;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomJTO {

    private Integer id;

    private String description;

    //private List<EnemyJTO> enemies;

    //private List<ItemJTO> items;

    private String name;
}
