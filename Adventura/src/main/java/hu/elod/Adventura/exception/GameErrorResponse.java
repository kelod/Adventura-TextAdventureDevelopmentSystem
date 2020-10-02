package hu.elod.Adventura.exception;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameErrorResponse {

    public int status;

    public long timeStamp;

    public String message;
}
