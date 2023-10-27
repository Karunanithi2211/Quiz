package com.nivak.quiz.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    public void MyMongoService(@Qualifier("users") UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    public Optional<User> singleUser(String email){
        return userRepo.findByEmail(email);
    }

    public void saveUser(List<User> data){
        userRepo.saveAll(data);
    }

    public List<User> allUser(){
        return userRepo.findAll();
    }
}
