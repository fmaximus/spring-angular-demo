package com.awakenedsoftware.demo.user;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class UserController {
    @GetMapping("/user")
    public Principal user(Principal user) {
        return user;
    }
}
