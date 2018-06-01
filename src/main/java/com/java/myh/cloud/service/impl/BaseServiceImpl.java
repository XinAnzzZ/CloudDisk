package com.java.myh.cloud.service.impl;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.java.myh.cloud.common.data.AbstractPersistableEntity;
import com.java.myh.cloud.common.data.MetaData;
import com.java.myh.cloud.repository.BaseRepository;
import com.java.myh.cloud.service.BaseService;
import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.xiaoleilu.hutool.Log;
import com.xiaoleilu.hutool.log.LogWrapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.querydsl.SimpleEntityPathResolver;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.persistence.metamodel.SingularAttribute;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.*;

/**
 * 基础service,所有的service继承自此类
 * Date: 2015/6/2 Time: 14:45
 *
 * @author author
 */
@SuppressWarnings("unused")
@Transactional(rollbackFor = Exception.class)
public abstract class BaseServiceImpl<T extends AbstractPersistableEntity<? extends Serializable>, ID extends Serializable> implements BaseService<T, ID> {
    private LogWrapper logger = Log.get(getClass());

    @PersistenceContext
    private EntityManager entityManager;
    /**
     * 泛型对应的Class定义
     */
    private Class<T> entityClass;
    private CriteriaQuery<Tuple> tupleCriteriaQuery;
    private Root<T> root;
    private CriteriaBuilder criteriaBuilder;
    private EntityPath<T> path;
    private PathBuilder<T> builder;

    /**
     * getLogger
     *
     * @return logger
     */
    public LogWrapper getLogger() {
        return logger;
    }

    /**
     * 需在具体的类里复写
     *
     * @return dao
     */
    abstract protected BaseRepository<T, ID> getEntityRepository();

    protected Class<T> getEntityClass() {
        if (entityClass == null) {
            try {
                // 通过反射取得Entity的Class.
                Object genericClz = getClass().getGenericSuperclass();
                if (genericClz instanceof ParameterizedType) {
                    //noinspection unchecked
                    entityClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
                }
            } catch (Exception e) {
                logger.error("error detail:", e);
            }
        }
        return entityClass;
    }

    protected CriteriaQuery<Tuple> getTupleQuery() {
        if (tupleCriteriaQuery == null) {
            tupleCriteriaQuery = getEntityManager().getCriteriaBuilder().createTupleQuery();
        }
        return tupleCriteriaQuery;
    }

    protected Root<T> getRoot() {
        if (root == null) {
            root = getTupleQuery().from(getEntityClass());
        }
        return root;
    }

    protected CriteriaBuilder getCriteriaBuilder() {
        if (criteriaBuilder == null) {
            criteriaBuilder = getEntityManager().getCriteriaBuilder();
        }
        return criteriaBuilder;
    }

    protected EntityManager getEntityManager() {
        return entityManager;
    }


    protected EntityPath<T> getPath() {
        if (this.path == null) {
            this.path = SimpleEntityPathResolver.INSTANCE.createPath(getEntityClass());
        }
        return this.path;
    }

    protected PathBuilder<T> getBuilder() {
        if (this.builder == null) {
            EntityPath<T> path = getPath();
            this.builder = new PathBuilder<>(path.getType(), path.getMetadata());
        }
        return this.builder;
    }

    @Override
    public boolean exists(ID id) {
        return getEntityRepository().exists(id);
    }

    @Override
    public void delete(Iterable<? extends T> entities) {
        getEntityRepository().delete(entities);
    }

    @Override
    public void deleteAll() {
        getEntityRepository().deleteAll();
    }

    @Override
    public void preInsert(T entity) {
    }

    @Override
    public void preUpdate(T entity) {
    }

    @Modifying
    @Override
    public T save(T entity) {
        if (entity.isNew()) {
            preInsert(entity);
        } else {
            preUpdate(entity);
        }
        getEntityRepository().save(entity);
        return entity;
    }

    @Override
    public List<T> save(Iterable<T> entities) {
        List<T> result = new ArrayList<>();
        if (entities == null) {
            return result;
        }
        for (T entity : entities) {
            result.add(save(entity));
        }
        return result;
    }

    @Modifying
    @Override
    public void delete(ID id) {
        getEntityRepository().delete(id);
    }

    @Modifying
    @Override
    public void delete(T entity) {
        getEntityRepository().delete(entity);
    }

    @Modifying
    @Override
    public Integer deleteIds(ID[] ids) {
        return deleteIds(Arrays.asList(ids));
    }

    @Modifying
    @Override
    public Integer deleteIds(Collection<ID> ids) {
        CriteriaDelete<T> delete = getCriteriaBuilder().createCriteriaDelete(getEntityClass());
        delete.where(delete.from(getEntityClass()).get("id").in(ids));
        return getEntityManager().createQuery(delete).executeUpdate();
    }

    @Modifying
    @Override
    public void deleteInBatch(Iterable<T> entities) {
        getEntityRepository().deleteInBatch(entities);
    }

    @Override
    public Number getColumnMaxValue(SingularAttribute<T, ? extends Number> column) {
        CriteriaBuilder builder = getCriteriaBuilder();
        CriteriaQuery<Number> criteriaQuery = builder.createQuery(Number.class);
        Root<T> root = criteriaQuery.from(getEntityClass());
        criteriaQuery.select(builder.max(root.get(column)));
        return getEntityManager().createQuery(criteriaQuery).getSingleResult();
    }

    @Override
    public Long count() {
        return getEntityRepository().count();
    }

    @Override
    public Long count(Specification<T> specification) {
        return getEntityRepository().count(specification);
    }

    @Override
    public T findById(ID id) {
        return getEntityRepository().findOne(id);
    }

    @Override
    public List<Map<String, Object>> getIdNames() {
        return findAllByProperties("id", "name");
    }

    @Override
    public T findOne(Specification<T> specification) {
        return getEntityRepository().findOne(specification);
    }

    @Override
    public List<T> findAll() {
        return getEntityRepository().findAll();
    }

    @Override
    public List<T> findAll(Iterable<ID> ids) {
        return getEntityRepository().findAll(ids);
    }

    @Override
    public List<T> findAll(Sort sort) {
        return getEntityRepository().findAll(sort);
    }

    @Override
    public List<T> findAll(Specification<T> specification) {
        return getEntityRepository().findAll(specification);
    }

    @Override
    public List<T> findAll(Specification<T> specification, Sort sort) {
        return getEntityRepository().findAll(specification, sort);
    }

    @Override
    public Page<T> findAll(Pageable pageable) {
        return getEntityRepository().findAll(pageable);
    }

    @Override
    public Page<T> findAll(Specification<T> specification, Pageable pageable) {
        return getEntityRepository().findAll(specification, pageable);
    }


    @Override
    public List<Map<String, Object>> findAllByProperties(String... properties) {
        JPAQueryFactory jpaQueryFactory = new JPAQueryFactory(entityManager);
        List<com.querydsl.core.types.Expression> expressions = Lists.newArrayList();
        for (String property : properties) {
            expressions.add(getBuilder().get(property));
        }
        List<com.querydsl.core.Tuple> tuples = jpaQueryFactory
                .from(getPath())
                .select(expressions.toArray(new com.querydsl.core.types.Expression[0]))
                .fetch();

        List<Map<String, Object>> result = Lists.newArrayList();

        tuples.forEach(tuple -> {
            int columnSize = tuple.size();
            Map<String, Object> singleResult = Maps.newHashMap();
            for (int i = 0; i < columnSize; i++) {
                singleResult.put(properties[i], tuple.get(i, Object.class));
            }
            result.add(singleResult);
        });
        return result;
    }

    @Override
    public List<Map<String, Object>> findAllByProperties(Specification<T> specification, String... properties) {
        return findAllByProperties(specification, null, properties).getContent();
    }

    @Override
    public Page<Map<String, Object>> findAllByProperties(Specification<T> specification, Pageable pageable, String... properties) {
        List<GroupAggregateProperty> groupAggregateProperties = Lists.newArrayList();
        for (String property : properties) {
            GroupAggregateProperty groupAggregateProperty = new GroupAggregateProperty();
            groupAggregateProperty.setAlias(property);
            groupAggregateProperty.setLabel(property);
            groupAggregateProperty.setName(property);
            groupAggregateProperties.add(groupAggregateProperty);
        }
        Expression<?>[] expressions = buildExpressions(groupAggregateProperties);
        CriteriaQuery<Tuple> select = getTupleQuery().multiselect(expressions);

        if (specification != null) {
            Predicate where = specification.toPredicate(getRoot(), getTupleQuery(), getCriteriaBuilder());
            select.where(where);
        }

        // 排序处理
        if (pageable != null && pageable.getSort() != null) {
            Iterator<Sort.Order> orders = pageable.getSort().iterator();
            List<javax.persistence.criteria.Order> jpaOrders = Lists.newArrayList();
            while (orders.hasNext()) {
                Sort.Order order = orders.next();
                String alias = order.getProperty();
                //目前发现JPA不支持传入alias作为排序属性，因此只能基于alias找到匹配的Expression表达式作为排序参数
                List<Selection<?>> selections = select.getSelection().getCompoundSelectionItems();
                for (Selection<?> selection : selections) {
                    if (selection.getAlias().equals(alias)) {
                        if (order.isAscending()) {
                            jpaOrders.add(getCriteriaBuilder().asc((Expression<?>) selection));
                        } else {
                            jpaOrders.add(getCriteriaBuilder().desc((Expression<?>) selection));
                        }
                        break;
                    }
                }
            }
            select.orderBy(jpaOrders);
        }


        TypedQuery<Tuple> typedQuery = getEntityManager().createQuery(select);
        //动态追加分页参数
        if (pageable != null) {
            typedQuery.setFirstResult(pageable.getOffset());
            typedQuery.setMaxResults(pageable.getPageSize());
        }
        List<Tuple> tuples = typedQuery.getResultList();
        List<Map<String, Object>> dataList = Lists.newArrayList();
        for (Tuple tuple : tuples) {
            Map<String, Object> map = Maps.newHashMap();
            groupAggregateProperties.forEach(groupAggregateProperty ->
                    map.put(groupAggregateProperty.getLabel(),
                            tuple.get(groupAggregateProperty.getAlias())));
            dataList.add(map);
        }

        if (pageable != null) {
            // 加上过滤条件后的总数量
            Long count = count(specification);
            return new PageImpl<>(dataList, pageable, count);
        } else {
            return new PageImpl<>(dataList);
        }
    }

    private Expression<?> buildExpression(String name, String alias) {
        Root<T> root = getRoot();
        Path<?> item;
        CharSequence c = ".";
        if (name.contains(c)) {
            String[] props = StringUtils.split(name, ".");
            item = root.get(props[0]);
            for (int j = 1; j < props.length; j++) {
                item = item.get(props[j]);
            }
        } else {
            item = root.get(name);
        }
        Expression<?> expression = item;
        if (alias != null) {
            expression.alias(alias);
        }
        return expression;
    }

    private Expression<?>[] buildExpressions(List<GroupAggregateProperty> groupAggregateProperties) {
        Expression<?>[] parsed = new Expression<?>[groupAggregateProperties.size()];
        int i = 0;
        for (GroupAggregateProperty groupAggregateProperty : groupAggregateProperties) {
            parsed[i++] = buildExpression(groupAggregateProperty.getName(), groupAggregateProperty.getAlias());
        }
        return parsed;
    }

    private class GroupAggregateProperty {
        @MetaData(value = "字面属性", comments = "最后用于前端JSON输出的key")
        private String label;
        @MetaData(value = "JPA表达式", comments = "传入JPA CriteriaBuilder组装的内容")
        private String name;
        @MetaData(value = "JPA表达式alias", comments = "用于获取聚合值的别名")
        private String alias;

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getAlias() {
            return alias;
        }

        public void setAlias(String alias) {
            this.alias = alias;
        }
    }
}
