package com.geo.keeperapp.service;

import com.geo.keeperapp.dao.NoteRepository;
import com.geo.keeperapp.entity.Note;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KeeperServiceImpl implements KeeperService {
	
	private NoteRepository noteRepository;
	
    @Autowired
    public KeeperServiceImpl(NoteRepository theNoteRepository) {
    	noteRepository = theNoteRepository;
    }

	@Override
	public Note saveNote(Note theNote) {
		return noteRepository.save(theNote);
	}
	
	@Override
	public List<Note> getNotes() {
		return noteRepository.findAll();
	}

	@Override
	public void deleteNote(int id) {
		noteRepository.deleteById(id);
	}

   
}






