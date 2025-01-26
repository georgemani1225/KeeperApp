package com.geo.keeperapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.geo.keeperapp.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Integer> {

}
