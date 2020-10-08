package hu.elod.Adventura.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class IGPassageActivationKey implements Serializable {

    @Column(name = "item_id")
    Integer itemId;

    @Column(name = "passage_id")
    Integer passageId;

    @Override
    public int hashCode() {
        return Objects.hash(itemId, passageId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        PassageActivationKey that = (PassageActivationKey) o;
        return Objects.equals(itemId, that.itemId) &&
                Objects.equals(passageId, that.passageId);
    }
}
