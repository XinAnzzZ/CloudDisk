package com.java.myh.cloud.service.impl;

import com.google.common.collect.Lists;
import com.java.myh.cloud.common.utils.IpAddrUtils;
import com.java.myh.cloud.core.entity.LoginLog;
import com.java.myh.cloud.core.entity.LoginLog_;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.repository.BaseRepository;
import com.java.myh.cloud.repository.LoginLogRepository;
import com.java.myh.cloud.service.LoginLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.criteria.Predicate;
import java.util.Date;
import java.util.List;

@Service("loginLogService")
public class LoginLogServiceImpl extends BaseServiceImpl<LoginLog, Integer> implements LoginLogService {
    @Resource
    private LoginLogRepository loginLogRepository;

    @Override
    protected BaseRepository<LoginLog, Integer> getEntityRepository() {
        return loginLogRepository;
    }

    @Override
    public void saveLoginLog(User user, String ip) {
        LoginLog loginLog = new LoginLog();
        loginLog.setIp(ip);
        loginLog.setUser(user);
        loginLog.setLoginDate(new Date());
        loginLog.setLoginLocation(IpAddrUtils.getAddrByIp(ip));
        loginLogRepository.save(loginLog);
    }

    @Override
    public Page<LoginLog> findAllLoginLog(User user, Date loginDateStart, Date loginDateEnd, Pageable pageable) {
        return loginLogRepository.findAll((root, cq, criteriaBuilder) -> {
            List<Predicate> predicates = Lists.newArrayList();
            if (loginDateStart != null) {
                predicates.add(criteriaBuilder.and(criteriaBuilder.greaterThanOrEqualTo(root.get(LoginLog_.loginDate), loginDateStart)));
            }
            if (loginDateEnd != null) {
                predicates.add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get(LoginLog_.loginDate), loginDateEnd)));
            }
            predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get(LoginLog_.user), user)));
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }
}
