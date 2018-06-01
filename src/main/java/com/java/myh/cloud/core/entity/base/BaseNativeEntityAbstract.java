package com.java.myh.cloud.core.entity.base;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import javax.persistence.*;


/**
 * @author 心安
 */
@MappedSuperclass
public abstract class BaseNativeEntityAbstract extends BaseEntityAbstract<Integer> {
    private static final long serialVersionUID = -3955995788404980021L;

    private Integer id;


    /**
     * //    @GenericGenerator(name = "idGenerator", strategy = "uuid")
     * //    @GeneratedValue(generator = "idGenerator")
     */
    @Override
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this);
    }
}
