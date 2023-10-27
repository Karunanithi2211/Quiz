package com.nivak.quiz.questions;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "questions")
public class Question {
    @Id
    private ObjectId id;
    private String question;
    private List<String> options;
    private String answer;
}
