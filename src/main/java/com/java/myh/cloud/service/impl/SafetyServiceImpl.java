package com.java.myh.cloud.service.impl;

import com.java.myh.cloud.common.utils.PasswordHelper;
import com.java.myh.cloud.core.entity.Safety;
import com.java.myh.cloud.core.entity.Safety_;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.repository.BaseRepository;
import com.java.myh.cloud.repository.SafetyRepository;
import com.java.myh.cloud.service.SafetyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;

/**
 * @author 心安 QWQ
 */
@Service("safetyService")
public class SafetyServiceImpl extends BaseServiceImpl<Safety, Integer> implements SafetyService {
    @Resource
    private SafetyRepository safetyRepository;

    @Override
    protected BaseRepository<Safety, Integer> getEntityRepository() {
        return safetyRepository;
    }

    @Override
    public boolean checkSecurityQuestion(User user, String question, String answer) {
        Safety safety = safetyRepository.findOne((root, cq, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get(Safety_.question), question),
                        criteriaBuilder.equal(root.get(Safety_.user), user)
                )
        );
        if (safety == null) {
            return true;
        }
        return safety.getAnswer().equalsIgnoreCase(PasswordHelper.encodePassword(answer));
    }

    @Override
    public List<Safety> findByUserId(User user) {
        return safetyRepository.findAll((root, cq, criteriaBuilder) ->
                criteriaBuilder.equal(root.get(Safety_.user), user));
    }

    @Override
    public void saveAllSecurityQuestion(Safety[] arr) {
        safetyRepository.save(Arrays.asList(arr));
    }
}
