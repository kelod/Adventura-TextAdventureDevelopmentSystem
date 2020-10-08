package hu.elod.Adventura.web;

import hu.elod.Adventura.JTO.GameToCreateJTO;
import hu.elod.Adventura.exception.GameNotFoundExeption;
import hu.elod.Adventura.model.Game;
import hu.elod.Adventura.model.Item;
import hu.elod.Adventura.model.Room;
import hu.elod.Adventura.repository.GameRepository;
import hu.elod.Adventura.repository.ItemRepository;
import hu.elod.Adventura.service.CreationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;


@RestController
@RequestMapping("/create")
public class CreationController {

    @Autowired
    CreationService creationService;

    @Autowired
    GameRepository gameRepository;

    @PostMapping("")
    public ResponseEntity<Integer> createNewGame(@RequestBody GameToCreateJTO gameToCreate) throws URISyntaxException {

        Game result = creationService.saveGameFromJTO(gameToCreate);

        return ResponseEntity.created(new URI("/games/" + result.getId() )).body(result.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameToCreateJTO> getGameDescription(@PathVariable Integer id){

        GameToCreateJTO gameToCreateJTO = creationService.getGameDescriptionById(id);

        if(gameToCreateJTO == null){
            throw new GameNotFoundExeption("Student not found with ID: " + id);
        }

        return ResponseEntity.ok().body(gameToCreateJTO);
        //Optional<Game> result = gameRepository.findById(id);


        /*return result.map(response -> {
            return ResponseEntity.ok().body(response);
        }).orElse(ResponseEntity.notFound().build());*/

    }

    @PutMapping("")
    public ResponseEntity<GameToCreateJTO> updateGameToCreate(@RequestBody GameToCreateJTO gameToCreate){
        creationService.updateGameFromJTO(gameToCreate);

        return new ResponseEntity<>(gameToCreate, HttpStatus.OK);
    }

}
