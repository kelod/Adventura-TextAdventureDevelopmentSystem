package hu.elod.Adventura.JTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PassageActivationJTO {

    private boolean enable;

    private PassageJTO passage;
}
