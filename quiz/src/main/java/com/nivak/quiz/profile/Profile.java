package com.nivak.quiz.profile;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "profile")
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    private ObjectId id;
    private String email;
    private String date;
    private String score;
}
