package hu.elod.Adventura.web;

import hu.elod.Adventura.JTO.GameSessionJTO;
import hu.elod.Adventura.JTO.IGEnemyJTO;
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

    @PutMapping("/player")
    public ResponseEntity<GameSessionJTO> updatePlayerState(@RequestBody GameSessionJTO gameSessionJTO){
        playService.updatePlayerState(gameSessionJTO);

        return new ResponseEntity<>(gameSessionJTO, HttpStatus.OK);
    }

    @PutMapping("/passages")
    public ResponseEntity<GameSessionJTO> updatePassages(@RequestBody GameSessionJTO gameSessionJTO){
        playService.updatePassages(gameSessionJTO);

        return new ResponseEntity<>(gameSessionJTO, HttpStatus.OK);
    }

    @PutMapping("/items")
    public ResponseEntity<GameSessionJTO> updateItems(@RequestBody GameSessionJTO gameSessionJTO){
        playService.updateItems(gameSessionJTO);

        return new ResponseEntity<>(gameSessionJTO, HttpStatus.OK);
    }

    @PostMapping("/new/{id}")
    public ResponseEntity<GameSessionJTO> startNewGame(@PathVariable Integer id) throws Exception{
        GameSessionJTO gameSessionJTO = playService.createGameFromDescription(id);

        return new ResponseEntity<>(gameSessionJTO, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameSessionJTO> loadGame(@PathVariable Integer id) throws Exception{
        GameSessionJTO gameSessionJTO = playService.loadGameFromDescription(id);

        return new ResponseEntity<>(gameSessionJTO, HttpStatus.OK);
    }

    @PutMapping("/game/over/{id}")
    public ResponseEntity<GameSessionJTO> gameOver(@PathVariable Integer id){
        GameSessionJTO gameSessionJTO = playService.gameOver(id);

        return new ResponseEntity<>(gameSessionJTO, HttpStatus.OK);
    }

    @PutMapping("/battle/lost/{id}")
    public ResponseEntity<GameSessionJTO> battleLost(@RequestBody GameSessionJTO gameSessionJTO, @PathVariable Integer id){
        playService.battleLost(gameSessionJTO, id);

        return new ResponseEntity<>(gameSessionJTO, HttpStatus.OK);
    }

    @PutMapping("/battle/won/{id}")
    public ResponseEntity<GameSessionJTO> battleWon(@RequestBody GameSessionJTO gameSessionJTO, @PathVariable Integer id){
        playService.battleWon(gameSessionJTO, id);

        return new ResponseEntity<>(gameSessionJTO, HttpStatus.OK);
    }

}
