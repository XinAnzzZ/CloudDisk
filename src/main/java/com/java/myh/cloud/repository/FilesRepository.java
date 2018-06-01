package com.java.myh.cloud.repository;


import com.java.myh.cloud.core.entity.FilesDO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


/**
 * @author 心安 QWQ
 */
public interface FilesRepository extends BaseRepository<FilesDO, Integer> {
    /**
     * 批量修改文件的父目录
     *
     * @param fileId   文件id
     * @param fatherId 父目录id
     */
    @Modifying
    @Query("update FilesDO f set f.fatherId = :fatherId where f.id in :fileId")
    void batchUpdateFatherIdByFilesIds(Integer[] fileId, Integer fatherId);

    /**
     * 删除文件，不建议直接删除，而是将文件设置为已删除。
     *
     * @param id fileId
     */
    @Modifying
    @Query("update FilesDO f set f.isDelete = 'YES' where f.id  = :id")
    void deleteById(@Param("id") Integer id);
}
