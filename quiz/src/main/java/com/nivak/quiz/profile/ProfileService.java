package com.nivak.quiz.profile;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepo profileRepo;

    @Autowired
    public void MyMongoService(@Qualifier("profile") ProfileRepo profileRepo){
        this.profileRepo = profileRepo;
    }

    public void profileSave(List<Profile> data){
        profileRepo.saveAll(data);
    }

    public List<Profile> singleProfile(String email){
        return profileRepo.findByEmail(email);
    }
}
