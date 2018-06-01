package com.java.myh.cloud.repository;

import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.core.entity.User_;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

/**
 * @author 心安 QWQ
 * @date 2018/5/12 22:06
 */
public class UserRepositoryTest {
    private ClassPathXmlApplicationContext applicationContext =
            new ClassPathXmlApplicationContext("classpath*:spring.xml");

    private UserRepository userRepository;

    @Before
    public void setUp() {
        userRepository = applicationContext.getBean(UserRepository.class);
    }

    @Test
    public void testUserRepository() {
        List<User> userList = userRepository.findAll((root, criteriaQuery, criteriaBuilder)
                -> criteriaBuilder.gt(root.get(User_.id), 2));
        System.out.println(userList);
    }
}
