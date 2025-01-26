package com.geo.keeperapp.controller;

import com.geo.keeperapp.entity.Note;
import com.geo.keeperapp.service.KeeperService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.Id;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todo")
@CrossOrigin("*")
public class KeeperController {

	private KeeperService keeperService;

	public KeeperController(KeeperService theKeeperService) {
		keeperService = theKeeperService;
	}

	@PostMapping("/save")
	private Note postNote(@RequestBody Note note) {
		return keeperService.saveNote(note);

	}

	@GetMapping("/notes")
	public List<Note> getAllNotes() {
		return keeperService.getNotes();
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteNote(@PathVariable int id) {
		try {
			keeperService.deleteNote(id);
			return new ResponseEntity<>("Note with id" + id + "Deleted Successfully", HttpStatus.OK);

		} catch (EntityNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}

	}

}
