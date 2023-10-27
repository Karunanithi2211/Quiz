package com.nivak.quiz.questions;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository("question")
public interface QuestionRepo extends MongoRepository<Question, ObjectId> {
    
}
