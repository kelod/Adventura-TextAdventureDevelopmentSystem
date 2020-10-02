package hu.elod.Adventura.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CreationExceptionHandler {

   /* @ExceptionHandler
    public ResponseEntity<GameErrorResponse> handleGameNotFound(GameNotFoundExeption ex){
        return new ResponseEntity<>(GameErrorResponse.builder()
                .message(ex.getMessage())
                .timeStamp(System.currentTimeMillis())
                .status(HttpStatus.NOT_FOUND.value())
                .build(), HttpStatus.NOT_FOUND) ;
    }

    @ExceptionHandler
    public ResponseEntity<GameErrorResponse> badRequest(Exception ex){
        return new ResponseEntity<>(GameErrorResponse.builder()
                .message("You probably gave a not acceptable ID, please try again!")
                .timeStamp(System.currentTimeMillis())
                .status(HttpStatus.BAD_REQUEST.value())
                .build(), HttpStatus.BAD_REQUEST) ;
    }*/
}
