package com.nivak.quiz;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nivak.quiz.profile.Profile;
import com.nivak.quiz.profile.ProfileService;
import com.nivak.quiz.questions.Question;
import com.nivak.quiz.questions.QuestionService;
import com.nivak.quiz.user.User;
import com.nivak.quiz.user.UserService;

@Controller
@RequestMapping("/quiz")
@CrossOrigin(origins = "http://localhost:3000")
public class quizController {
    @Autowired
    private UserService userService;

    @Autowired
    private QuestionService questionService;

    @Autowired
    private ProfileService profileService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> allusers(){
        return new ResponseEntity<List<User>>(userService.allUser(),HttpStatus.OK);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<Optional<User>> getSingleDetail(@PathVariable String email){
        return new ResponseEntity<Optional<User>>(userService.singleUser(email),HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody List<User> data){
        userService.saveUser(data);
        return ResponseEntity.ok("successfully registered");
    }

    @GetMapping("/question")
    public ResponseEntity<List<Question>> allquestion(){
        return new ResponseEntity<List<Question>>(questionService.allQuestions(),HttpStatus.OK);
    }

    @PostMapping("/profile")
    public ResponseEntity<String> saveProfile(@RequestBody List<Profile> data){
        profileService.profileSave(data);
        return ResponseEntity.ok("profile saved successfully");
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<List<Profile>> singleProfile(@PathVariable String email){
        return new ResponseEntity<List<Profile>>(profileService.singleProfile(email),HttpStatus.OK);
    }

}
