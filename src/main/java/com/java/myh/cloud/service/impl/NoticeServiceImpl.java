package com.java.myh.cloud.service.impl;

import com.google.common.collect.Lists;
import com.java.myh.cloud.common.utils.string.StringUtils;
import com.java.myh.cloud.core.entity.Notice;
import com.java.myh.cloud.core.entity.Notice_;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.repository.BaseRepository;
import com.java.myh.cloud.repository.NoticeRepository;
import com.java.myh.cloud.service.NoticeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.criteria.Predicate;
import java.util.Date;
import java.util.List;

/**
 * @author 心安 QWQ
 */
@Service("noticeService")
public class NoticeServiceImpl extends BaseServiceImpl<Notice, Integer> implements NoticeService {
    @Resource
    private NoticeRepository noticeRepository;

    @Override
    protected BaseRepository<Notice, Integer> getEntityRepository() {
        return noticeRepository;
    }

    @Override
    public Page<Notice> getAllNoticeByCondition(String noticeName, Date startDate, Date endDate, Pageable pageable) {
        return noticeRepository.findAll((root, cq, criteriaBuilder) -> {
            List<Predicate> predicateList = Lists.newArrayList();
            if (StringUtils.isNotEmpty(noticeName)) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.like(root.get(Notice_.noticeName), "%" + noticeName + "%")));
            }
            if (startDate != null) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.greaterThanOrEqualTo(root.get(Notice_.createDate), startDate)));
            }
            if (endDate != null) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get(Notice_.createDate), endDate)));
            }
            return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
        }, pageable);
    }

    @Override
    public Page<Notice> getNotDeleteNoticeByCondition(String noticeName, Date startDate, Date endDate, Pageable pageable) {
        return noticeRepository.findAll((root, cq, criteriaBuilder) -> {
            List<Predicate> predicateList = Lists.newArrayList();
            if (StringUtils.isNotEmpty(noticeName)) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.like(root.get(Notice_.noticeName), "%" + noticeName + "%")));
            }
            if (startDate != null) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.greaterThanOrEqualTo(root.get(Notice_.createDate), startDate)));
            }
            if (endDate != null) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get(Notice_.createDate), endDate)));
            }
            predicateList.add(criteriaBuilder.and(criteriaBuilder.equal(root.get(Notice_.isDelete), Notice.Whether.NO)));
            return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
        }, pageable);
    }

    @Override
    public void addNotice(String title, String content, User user) {
        Notice notice = new Notice();
        notice.setNoticeName(title);
        notice.setContent(content);
        notice.setCreateDate(new Date());
        notice.setIsDelete(Notice.Whether.NO);
        notice.setUser(user);
        noticeRepository.save(notice);
    }
}
