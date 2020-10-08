package hu.elod.Adventura.web;

import hu.elod.Adventura.JTO.GameSessionJTO;
import hu.elod.Adventura.model.GameSession;
import hu.elod.Adventura.service.PlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/play")
public class GameController {

    @Autowired
    PlayService playService;

    @PostMapping("/new/{id}")
    public ResponseEntity<GameSessionJTO> startNewGame(@PathVariable Integer id){
        GameSessionJTO gameSessionJTO = playService.createGameFromDescription(id);

        return new ResponseEntity<>(gameSessionJTO, HttpStatus.OK);
    }
    {

    }

}
