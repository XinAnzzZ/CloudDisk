package com.java.myh.cloud.service.impl;

import com.google.common.collect.Lists;
import com.java.myh.cloud.common.utils.FilesUtils;
import com.java.myh.cloud.common.utils.PasswordHelper;
import com.java.myh.cloud.common.utils.string.StringUtils;
import com.java.myh.cloud.core.entity.FilesDO;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.core.entity.User_;
import com.java.myh.cloud.core.entity.enumeration.AbstractStatusEntity;
import com.java.myh.cloud.repository.BaseRepository;
import com.java.myh.cloud.repository.UserRepository;
import com.java.myh.cloud.service.UserService;
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
@Service("userService")
public class UserServiceImpl extends BaseServiceImpl<User, Integer> implements UserService {

    @Resource
    private UserRepository userRepository;

    @Override
    protected BaseRepository<User, Integer> getEntityRepository() {
        return userRepository;
    }


    @Override
    public User findByUserName(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void registerUser(String username, String password, String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(PasswordHelper.encodePassword(password));
        user.setEmail(email);
        user.setUserType(User.UserType.USER);
        user.setTotalCapacity(FilesUtils.INITIAL_CAPACITY);
        user.setAvailableCapacity(FilesUtils.INITIAL_CAPACITY);
        user.setUsedCapacity("0B");
        user.setCreateDate(new Date());
        userRepository.save(user);
    }

    @Override
    public void changeCapacityWhenUpload(Integer userId, long size) {
        User user = userRepository.findOne(userId);
        String availableCapacity = user.getAvailableCapacity();
        String usedCapacity = user.getUsedCapacity();
        String newAvailableCapacity = FilesUtils.subtractCapacity(availableCapacity, size);
        String newUsedCapacity = FilesUtils.sumCapacity(usedCapacity, size);
        user.setUsedCapacity(newUsedCapacity);
        user.setAvailableCapacity(newAvailableCapacity);
        userRepository.save(user);
    }

    @Override
    public boolean checkUserCapacity(User user, long size) {
        String availableCapacity = user.getAvailableCapacity();
        Long capacityByByte = Long.valueOf(availableCapacity.substring(0, availableCapacity.indexOf("B")));
        return capacityByByte > size;
    }

    @Override
    public void changeCapacityWhenDelete(FilesDO filesDO, User user) {
        String fileSize = filesDO.getFileSize();
        Long size = Long.valueOf(fileSize.substring(0, fileSize.indexOf("B")));
        String availableCapacity = user.getAvailableCapacity();
        String usedCapacity = user.getUsedCapacity();
        String newAvailableCapacity = FilesUtils.sumCapacity(availableCapacity, size);
        String newUsedCapacity = FilesUtils.subtractCapacity(usedCapacity, size);
        user.setUsedCapacity(newUsedCapacity);
        user.setAvailableCapacity(newAvailableCapacity);
        userRepository.save(user);
    }

    @Override
    public boolean checkPassword(String username, String password) {
        User user = findByUserName(username);
        if (user == null) {
            return false;
        }
        return user.getPassword().equalsIgnoreCase(PasswordHelper.encodePassword(password));
    }

    @Override
    public Page<User> findAllUserByCondition(
            String username,
            AbstractStatusEntity.Status status,
            Date startDate,
            Date endDate,
            Pageable pageable) {
        return userRepository.findAll((root, cq, criteriaBuilder) -> {
            List<Predicate> predicateList = Lists.newArrayList();
            if (StringUtils.isNotEmpty(username)) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.like(root.get(User_.username), "%" + username + "%")));
            }
            if (status != null) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.equal(root.get(User_.status), status)));
            }
            if (startDate != null) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.greaterThanOrEqualTo(root.get(User_.createDate), startDate)));
            }
            if (endDate != null) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get(User_.createDate), endDate)));
            }
            predicateList.add(criteriaBuilder.and(criteriaBuilder.equal(root.get(User_.userType), User.UserType.USER)));
            return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
        }, pageable);
    }

    @Override
    public void changeUserStatusByUserIds(Integer[] userIds, User.Status status) {
        userRepository.updateUserStatusByUserIds(userIds, status);
    }
}
