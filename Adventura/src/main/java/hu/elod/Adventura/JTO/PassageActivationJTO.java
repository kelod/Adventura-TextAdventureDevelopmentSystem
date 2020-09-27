package hu.elod.Adventura.JTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PassageActivationJTO {

    private boolean enable;

    private PassageJTO passage;
}
