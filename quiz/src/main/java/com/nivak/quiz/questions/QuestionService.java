package com.nivak.quiz.questions;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    
    @Autowired
    private QuestionRepo questionRepo;

    @Autowired
    public void MyMongoService(@Qualifier("question") QuestionRepo questionRepo) {
        this.questionRepo = questionRepo;
    }

    public List<Question> allQuestions(){
        return questionRepo.findAll();
    }
}
