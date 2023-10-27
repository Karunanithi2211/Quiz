package com.nivak.quiz.profile;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository("profile")
public interface ProfileRepo extends MongoRepository<Profile,ObjectId>{

    List<Profile> findByEmail(String email);
    
}
