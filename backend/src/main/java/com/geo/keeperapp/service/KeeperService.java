package com.geo.keeperapp.service;

import java.util.List;

import com.geo.keeperapp.entity.Note;

public interface KeeperService {

    List<Note> getNotes();

    Note saveNote(Note theNote);
    
    void deleteNote(int id);

}
