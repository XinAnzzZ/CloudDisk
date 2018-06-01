package com.java.myh.cloud.core.entity;

import com.java.myh.cloud.core.entity.base.BaseNativeEntityAbstract;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author 心安 QWQ
 */
@Entity
@Table(name = "safety")
@DynamicUpdate
@DynamicInsert
public class Safety extends BaseNativeEntityAbstract implements Serializable {
    private static final long serialVersionUID = 6390335433247468240L;
    private User user;
    private String question;
    private String answer;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "question")
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    @Column(name = "answer")
    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public String toString() {
        return "Safety{" +
                "user=" + user +
                ", question='" + question + '\'' +
                ", answer='" + answer + '\'' +
                '}';
    }
}
