package hu.elod.Adventura.exception;

public class GameNotFoundExeption extends RuntimeException {

    public GameNotFoundExeption(String message) {
        super(message);
    }

    public GameNotFoundExeption(String message, Throwable cause) {
        super(message, cause);
    }

    public GameNotFoundExeption(Throwable cause) {
        super(cause);
    }
}
