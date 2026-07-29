package com.princearyan.studentmanagementsystem.controller;

import com.princearyan.studentmanagementsystem.entity.Student;
import com.princearyan.studentmanagementsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/")
    public String home(Model model) {

        model.addAttribute("students", studentService.getAllStudents());

        return "index";
    }


}