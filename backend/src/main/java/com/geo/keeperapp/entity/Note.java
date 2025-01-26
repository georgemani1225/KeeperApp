package com.geo.keeperapp.entity;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name="todomst")
public class Note {

    // define fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="notettl")
    private String noteTitle;

    @Column(name="notecnt")
    private String noteContent;


    // define constructors
    public Note() {

    }

    public Note(String noteTitle, String noteContent) {
        this.noteTitle = noteTitle;
        this.noteContent = noteContent;
    }
    
    // define getter/setter

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNoteTitle() {
		return noteTitle;
	}

	public String getNoteContent() {
		return noteContent;
	}

        public void setNoteTitle(String noteTitle) {
		this.noteTitle = noteTitle;
	}

	public void setNoteContent(String noteContent) {
		this.noteContent = noteContent;
	}

	
    
}







