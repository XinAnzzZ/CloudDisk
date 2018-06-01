package com.java.myh.cloud.controller;

import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.service.UserService;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

/**
 * @author 心安 QWQ
 * @date 2018/5/18 17:19
 */
public class UserControllerTest {

    private UserService userService;

    @Before
    public void setUp() {
        ClassPathXmlApplicationContext applicationContext =
                new ClassPathXmlApplicationContext("classpath:spring.xml");
        userService = (UserService) applicationContext.getBean("userService");
    }

    @After
    public void tearDown() {
    }

    @Test
    public void registerPage() {
        List<User> userList = userService.findAll();
        Assert.assertNull(userList);
    }

    @Test
    public void register() {
    }
}