package hu.elod.Adventura.JTO;

import hu.elod.Adventura.model.Enemy;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PassageActivationJTO {

    private boolean enable;

    private PassageJTO passage;
}
