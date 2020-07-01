package hu.elod.Adventura.web;

import hu.elod.Adventura.model.Game;
import hu.elod.Adventura.model.Room;
import hu.elod.Adventura.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;


@RestController
@RequestMapping("/create")
public class CreationController {

    @Autowired
    GameRepository gameRepository;

    @PostMapping("")
    public ResponseEntity<Game> createNewGame(@RequestBody Game game) throws URISyntaxException {
        Game result = gameRepository.save(game);
        return ResponseEntity.created(new URI("/games/" + result.getId())).body(result);
    }

}