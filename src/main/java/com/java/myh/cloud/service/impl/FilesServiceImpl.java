package com.java.myh.cloud.service.impl;

import com.java.myh.cloud.common.utils.FilesUtils;
import com.java.myh.cloud.core.entity.FilesDO;
import com.java.myh.cloud.core.entity.FilesDO_;
import com.java.myh.cloud.core.entity.User;
import com.java.myh.cloud.core.entity.User_;
import com.java.myh.cloud.repository.BaseRepository;
import com.java.myh.cloud.repository.FilesRepository;
import com.java.myh.cloud.service.FilesService;
import com.java.myh.cloud.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


/**
 * @author 心安 QWQ
 */
@Service("filesService")
public class FilesServiceImpl extends BaseServiceImpl<FilesDO, Integer> implements FilesService {
    @Resource
    private FilesRepository filesRepository;

    @Override
    protected BaseRepository<FilesDO, Integer> getEntityRepository() {
        return filesRepository;
    }

    @Override
    public Page<FilesDO> findAllFiles(User user, Integer fatherId, String searchContent, Pageable pageable) {
        return filesRepository.findAll((root, cq, criteriaBuilder) ->
                criteriaBuilder.and(criteriaBuilder.equal(root.get(FilesDO_.user), user),
                        criteriaBuilder.equal(root.get(FilesDO_.fatherId), fatherId),
                        criteriaBuilder.like(root.get(FilesDO_.fileName), "%" + searchContent + "%"),
                        criteriaBuilder.equal(root.get(FilesDO_.isDelete), FilesDO.Whether.NO)), pageable);
    }

    @Override
    public FilesDO findFileByFileName(Integer userId, Integer fatherId, FilesDO.Whether whether, String fileName) {
        return filesRepository.findOne((root, cq, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get(FilesDO_.fileName), fileName),
                        criteriaBuilder.equal(root.get(FilesDO_.user).get(User_.id), userId),
                        criteriaBuilder.equal(root.get(FilesDO_.fatherId), fatherId),
                        criteriaBuilder.equal(root.get(FilesDO_.isFolder), whether)
                ));
    }

    @Override
    public FilesDO findFileById(Integer fileId) {
        return filesRepository.findOne(fileId);
    }

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public void deleteFilesByFilesId(Integer fileId, UserService userService, User user) {
        FilesDO filesDO = findFileById(fileId);
        if (filesDO.getIsFolder() == FilesDO.Whether.NO) {
            FilesUtils.deleteFiles(filesRepository, filesDO);
            userService.changeCapacityWhenDelete(filesDO, user);
        } else {
            List<FilesDO> allFiles = findAllFilesByFatherId(fileId);
            filesRepository.delete(filesDO);
            for (FilesDO item : allFiles) {
                deleteFilesByFilesId(item.getId(), userService, user);
            }
        }
    }

    @Override
    public List<FilesDO> findAllFilesByFatherId(Integer fatherId) {
        return filesRepository.findAll(((root, cq, criteriaBuilder) ->
                criteriaBuilder.equal(root.get(FilesDO_.fatherId), fatherId)));
    }

    @Override
    public void moveFileByFilesId(Integer[] fileId, Integer fatherId) {
        filesRepository.batchUpdateFatherIdByFilesIds(fileId, fatherId);
    }

    @Override
    public List<FilesDO> getAllFolder(User user, Integer fatherId) {
        return filesRepository.findAll((root, cq, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get(FilesDO_.user), user),
                        criteriaBuilder.equal(root.get(FilesDO_.isFolder), FilesDO.Whether.YES),
                        criteriaBuilder.equal(root.get(FilesDO_.fatherId), fatherId),
                        criteriaBuilder.equal(root.get(FilesDO_.isDelete), FilesDO.Whether.NO)
                )
        );
    }

    @Override
    public List<FilesDO> getAllPicture(User user) {
        return filesRepository.findAll((root, cq, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get(FilesDO_.user), user),
                        criteriaBuilder.equal(root.get(FilesDO_.type), FilesDO.FileTypeEnum.Picture),
                        criteriaBuilder.equal(root.get(FilesDO_.isDelete), FilesDO.Whether.NO)
                )
        );
    }

    @Override
    public Page<FilesDO> getAllFilesByFileType(User user, FilesDO.FileTypeEnum fileTypeEnum, Pageable pageable) {
        return filesRepository.findAll((root, cq, criteriaBuilder) ->
                criteriaBuilder.and(
                        criteriaBuilder.equal(root.get(FilesDO_.user), user),
                        criteriaBuilder.equal(root.get(FilesDO_.type), fileTypeEnum),
                        criteriaBuilder.equal(root.get(FilesDO_.isDelete), FilesDO.Whether.NO)
                ), pageable
        );
    }
}
