package com.nivak.quiz.user;


import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository("users")
public interface UserRepo extends MongoRepository<User,ObjectId> {
    Optional<User> findByEmail(String email);
}
