package hu.elod.Adventura.web;

import hu.elod.Adventura.model.Game;
import hu.elod.Adventura.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    GameRepository gameRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> findGameById(@PathVariable Integer id) {
        Optional<Game> result = gameRepository.findById(id);
        return result.map(response -> {
            return ResponseEntity.ok().body(response);
        }).orElse(ResponseEntity.notFound().build());
    }
}
