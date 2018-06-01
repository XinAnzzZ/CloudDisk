package com.java.myh.cloud.service.impl;

import com.google.common.collect.Lists;
import com.java.myh.cloud.common.utils.string.StringUtils;
import com.java.myh.cloud.core.entity.FilesDO_;
import com.java.myh.cloud.core.entity.ShareFiles;
import com.java.myh.cloud.core.entity.ShareFiles_;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.repository.BaseRepository;
import com.java.myh.cloud.repository.ShareFilesRepository;
import com.java.myh.cloud.service.ShareFilesService;
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
@Service("shareFilesService")
public class ShareFilesServiceImpl extends BaseServiceImpl<ShareFiles, Integer> implements ShareFilesService {
    @Resource
    private ShareFilesRepository shareFilesRepository;

    @Override
    protected BaseRepository<ShareFiles, Integer> getEntityRepository() {
        return shareFilesRepository;
    }

    @Override
    public void saveShareFiles(ShareFiles shareFiles) {
        shareFilesRepository.save(shareFiles);
    }

    @Override
    public ShareFiles findBySign(String sign) {
        return shareFilesRepository.findOne(((root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(root.get(ShareFiles_.sign), sign)));
    }

    @Override
    public Page<ShareFiles> findAllByCondition(User user, String filename, Date startDate, Date endDate, Pageable pageable) {
        return shareFilesRepository.findAll((root, cq, criteriaBuilder) -> {
            List<Predicate> predicateList = Lists.newArrayList();
            if (StringUtils.isNotEmpty(filename)) {
                predicateList.add(criteriaBuilder.and(criteriaBuilder.like(root.join(ShareFiles_.filesDO).get(FilesDO_.fileName), "%" + filename + "%")));
            }
            if (startDate != null) {
                predicateList.add(criteriaBuilder.greaterThanOrEqualTo(root.get(ShareFiles_.shareDate), startDate));
            }
            if (endDate != null) {
                predicateList.add(criteriaBuilder.lessThanOrEqualTo(root.get(ShareFiles_.shareDate), endDate));
            }
            predicateList.add(criteriaBuilder.equal(root.get(ShareFiles_.isCancel), ShareFiles.Whether.NO));
            predicateList.add(criteriaBuilder.equal(root.get(ShareFiles_.user), user));
            return criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
        }, pageable);
    }
}
